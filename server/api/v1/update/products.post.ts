import { IProductAPI } from "~/assets/constants/constants"
import prisma from "~/lib/prisma";
import { ERRORS } from "~/assets/constants/constants";

export default defineEventHandler(async (event) => {
  const body = await readBody<IProductAPI>(event);
  console.log(body)
  if(!body) return ERRORS.NO_BODY;

  // check if jwt is admin's one
  const user = await prisma.user.findFirst({where: {
    jwt: body.jwt
  }});

  if(!user) return ERRORS.WRONG_JWT;

  return await prisma.product.update({
    where: {
      id: body.item.id,
    },
    data: body.item
  })
})
