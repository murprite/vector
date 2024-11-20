import { IProductAddAPI, IProductAdd } from "~/assets/constants/constants"
import prisma from "~/lib/prisma";
import { ERRORS } from "~/assets/constants/constants";

export default defineEventHandler(async (event) => {
  const body = await readBody<IProductAddAPI>(event);
  console.log(body)
  if(!body.item || body.item === undefined) return ERRORS.NO_BODY;

  // check if jwt is admin's one
  const user = await prisma.user.findFirst({where: {
    jwt: body.jwt
  }});

  if(!user) return ERRORS.WRONG_JWT;
  const item: IProductAdd = body.item;
  return await prisma.product.create({
    data: {
      images: item.images,
      cardImageUrl: item.cardImageUrl,
      name: item.name,
      price: item.price,
      flowersType: item.flowersType,
      count: item.count,
      description: item.description
    }
  })
})