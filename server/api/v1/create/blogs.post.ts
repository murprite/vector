import { IBlogAPI, ERRORS } from "~/assets/constants/constants"
import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody<IBlogAPI>(event);

  if(!body || !body.post) return ERRORS.NO_BODY;

  console.log("Mark create blog", body);

  // check if jwt is admin's one
  const user = await prisma.user.findFirst({where: {
    jwt: body.jwt
  }});

  if(!user) return ERRORS.WRONG_JWT;

  return await prisma.post.create({
    data: {
      text: body.post.text,
      annotation: body.post.annotation,
      title: body.post.title,
      mainImageUrl: body.post.mainImageUrl,
      imagesUrl: body.post.imagesUrl,
    }
  })
})