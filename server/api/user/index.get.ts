import prisma from "~/lib/prisma";
import { IUserJWT } from "~/assets/constants/constants";

export default defineEventHandler(async (event) => {
  const params = getQuery<IUserJWT>(event);

  return await prisma.user.findFirst({
    where: {
      jwt: params.jwt
    }
  });
})
