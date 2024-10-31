import prisma from "@/lib/prisma";
interface Query {
    jwt: string
}
async function GET(event: any) {
    const body = getQuery<Query>(event);
    const users = await prisma.user.findMany({where: {
        jwt: body.jwt
    }});
    if(users[0]) {
        return users[0];
    } else {
        throw createError("There's no such user")
    }
}

export default defineEventHandler( async (event) => GET(event))