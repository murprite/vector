import { IBlogAPI } from "~/assets/constants/constants"
import prisma from "~/lib/prisma";
import { ERRORS } from "~/assets/constants/constants";

export default defineEventHandler(async (event) => {
  const body = await readBody<IBlogAPI>(event);

  console.log("MARK blogs/update body:", body)

  if(!body) return ERRORS.NO_BODY;

  // check if jwt is admin's one
  const user = await prisma.user.findFirst({where: {
    jwt: body.jwt
  }});

  if(!user) return ERRORS.WRONG_JWT;

  return await prisma.post.update({
    where: {
      id: body.post.id,
    },
    data: body.post
  })
})
