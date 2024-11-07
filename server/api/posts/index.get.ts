import prisma from "~/lib/prisma"
import { IGetPosts } from "~/assets/constants/constants";

export default defineEventHandler(async (event) => {
  const body = getQuery<IGetPosts>(event);

  return await body.id ? prisma.post.findMany({ where: {
    id: body.id,
  }}) : prisma.post.findMany();
})
