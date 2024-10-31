import prisma from "~/lib/prisma";

interface Query {
  jwt: string
}

export default defineEventHandler(async (event) => {
  const params = getQuery<Query>(event);

  return await prisma.user.findFirst({
    where: {
      jwt: params.jwt
    }
  });
})
