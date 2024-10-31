import prisma from "~/lib/prisma";

interface Query {
  jwt: string
}

async function POST(event: any) {
    let body: Query = await readBody(event);
    let user = await prisma.user.deleteMany({
      where: {
        jwt: body.jwt
      }
    });
    if(user.count === 0) {
      return { status: "failed" };
    }
    return { status: "success" };
}

export default defineEventHandler(async (event) => POST(event));