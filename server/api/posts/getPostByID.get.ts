import prisma from "~/lib/prisma"
import { IGetPosts } from "~/assets/constants/constants";

export default defineEventHandler(async (event) => {
  const body = getQuery<IGetPosts>(event);

  return await prisma.post.findUnique({ where: {id: Number(body.id)}});
});
