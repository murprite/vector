import prisma from "~/lib/prisma";
import crypto from "crypto";

const SECRET_KEY = "example"; // as6UG54qsg kinda test key, y'know?
const NO_USER = { error: "There's no such user" };
const NO_BODY = { error: "No payload" };
const BAD_JSON = { error: "Bad JSON" };

export default defineEventHandler(async (event) => {
  let body: JSONUser = await readBody(event);
  
  if(!body) return NO_USER;
  if(!body.username || !body.pass) return BAD_JSON;

  const users = await prisma.user.findMany({ where: {
    fullName: body.username,
    pass: body.pass,
  }});
  if(users.length === 0) {
    return NO_USER;
  }
  
  const header = JSON.stringify({ "alg": "HS256", "typ": "JWT" })
  const payload = JSON.stringify({ "userId": users[0].id, "iss": "luxflowers" })

  const unsigned = `${base64URLencode(header)}.${base64URLencode(payload)}`;
  const signature = HS256(unsigned, SECRET_KEY);
  
  return { "jwt": base64URLencode(header) + '.' + base64URLencode(payload) + '.' + signature, "expire": (Date.now() + 60 * 5) - Date.now()};
});

function HS256(payload: string, secretKey: string) {
  return crypto.createHmac('sha256', secretKey).update(payload).digest('base64url');
}

function base64URLencode(str: string) {
  return Buffer.from(str).toString('base64url');
}

function getValidJSON(body: string): JSONUser {
  let json: JSONUser = JSON.parse(body);
  console.log(json)

 if(!json.username || !json.pass) {
  throw new TypeError();
 }

 return json;
}

interface JSONUser extends JSON {
  username: string;
  pass: string;
}
