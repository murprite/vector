import prisma from "@/lib/prisma";

async function GET(event: any) {
    const body = await readBody(event);
    const authorization = getRequestHeader(event, 'authorization');

    const users = await prisma.user.findMany();

    return users;
}

export default defineEventHandler( async (event) => GET(event))