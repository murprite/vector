import prisma from "~/lib/prisma";
import { ERRORS } from "~/assets/constants/constants";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  console.log("mark", body)
  
  if(!body.jwt) return ERRORS.NO_BODY;

  // check if jwt is admin's one
  const user = await prisma.user.findFirst({where: {
    jwt: body.jwt
  }});

  if(!user) return ERRORS.WRONG_JWT;
  
  return await prisma.product.delete({where: {id: body.id}});
})
