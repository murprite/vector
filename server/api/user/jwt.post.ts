import prisma from "~/lib/prisma";
import { IUserJWT } from "~/assets/constants/constants";

export default defineEventHandler(async (event) => {
  const body = await readBody<IUserJWT>(event);
  if(!body.jwt) body.jwt = '';

  const user = await prisma.user.findFirst({
    where: {
      jwt: body.jwt
    }
  });
  
  return user;
})
