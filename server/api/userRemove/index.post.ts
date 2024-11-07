import prisma from "~/lib/prisma";
import { IUserJWT, ERRORS } from "~/assets/constants/constants";

async function POST(event: any) {
    let body = await readBody<IUserJWT>(event);
    let user = await prisma.user.deleteMany({
      where: {
        jwt: body.jwt
      }
    });
    if(user.count === 0) {
      return ERRORS.NO_USER;
    }
    return { status: "success" };
}

export default defineEventHandler(async (event) => POST(event));