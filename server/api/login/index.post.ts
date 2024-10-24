import prisma from "~/lib/prisma";
import crypto from "crypto";

const SECRET_KEY = "example"; //as6UG54qsg
const NO_USER = { error: "There's no such user" };
const NO_BODY = { error: "No payload" };

export default defineEventHandler(async (event) => {
  let body: any = await readBody(event);
  if(!body) {
    return NO_BODY;
  }

  const user = await prisma.user.findMany({ where: {
    fullName: body.username,
    pass: body.pass,
  }})
  
  const header = JSON.stringify({ "alg": "HS256", "typ": "JWT" })
  const payload = JSON.stringify({ "userId": "abebdecb-3f09-47f5-8386-4a5ad9572029", "iss": "luxflowers" })

  const unsigned = `${base64URLencode(header)}.${base64URLencode(payload)}`;
  const signature = HS256(unsigned, SECRET_KEY);
  
  const jwt = base64URLencode(header) + '.' + base64URLencode(payload) + '.' + base64URLencode(signature);

  if(user.length !== 0) {
    return await jwt;
  } else {
    return NO_USER;
  }
});

function HS256(payload: string, secretKey: string) {
  return crypto.createHmac('sha256', secretKey).update(payload).digest('hex');
}

function base64URLencode(str: string) {
  const utf8Arr: any = new TextEncoder().encode(str);
  const base64Encoded = btoa(utf8Arr);
  return base64Encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
