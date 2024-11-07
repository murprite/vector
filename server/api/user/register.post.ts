import prisma from "~/lib/prisma";
import crypto from "crypto";
import { SECRET_KEY, IUserRegisterData } from "~/assets/constants/constants";

function HS256(payload: string, secretKey: string) {
  return crypto.createHmac('sha256', secretKey).update(payload).digest('base64url');
}

function base64URLencode(str: string) {
  return Buffer.from(str).toString('base64url');
}

export default defineEventHandler(async (event) => {
  let body: IUserRegisterData = await readBody(event);
  
  // check if user exists
  const userCount = await prisma.user.count({where: {
    email: body.email,    
    fullName: body.login
  }});

  if(userCount !== 0) {
    return {"error": "Пользователь с таким логином или почтой уже существует"};
  }
  const userId = crypto.randomUUID();
  // if not, continue register
  const header = JSON.stringify({ "alg": "HS256", "typ": "JWT" })
  const payload = JSON.stringify({ "userId": userId, "iss": "luxflowers" })
  
  const unsigned = `${base64URLencode(header)}.${base64URLencode(payload)}`;
  const signature = HS256(unsigned, SECRET_KEY);

  const jwt = base64URLencode(header) + '.' + base64URLencode(payload) + '.' + signature;

  const user = await prisma.user.create({
    data: {
      id: userId,
      email: body.email,
      fullName: body.login,
      pass: crypto.hash('sha512', body.pass),
      isAdmin: false,
      jwt,
    }
  });

  return { "jwt": jwt, "expire": (Date.now() + 60 * 5) - Date.now() };
})
