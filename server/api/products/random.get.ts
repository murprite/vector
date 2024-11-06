import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
  const productsCount = await prisma.product.count();
  const skip = Math.floor(Math.random() * productsCount);
  return await prisma.product.findMany({
      take: 5,
      skip: skip,
  });
})
