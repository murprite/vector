import prisma from "~/lib/prisma";
import { ERRORS, IUserJWT } from "~/assets/constants/constants";

export default defineEventHandler(async (event) => {
  const params = getQuery<IUserJWT>(event);

  console.log(params)
  
  if(!params.jwt) return ERRORS.NO_BODY;

  // check if jwt is admin's one
  const user = await prisma.user.findFirst({where: {
    jwt: params.jwt
  }});

  if(!user) return ERRORS.WRONG_JWT;
  console.log('response')
  const products = await prisma.product.findMany();
  return products ? products : ERRORS.UNKNOWN;
})
