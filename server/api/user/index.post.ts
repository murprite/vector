import prisma from "~/lib/prisma";

async function POST(event: any) {
    const data = await readBody(event);
    const user = await prisma.user.create( { data: JSON.parse(data) } );
    return user;
}

export default defineEventHandler(async (event) => POST(event));