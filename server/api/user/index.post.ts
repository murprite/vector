import prisma from "~/lib/prisma";

async function POST(event: any) {
    const data = await readBody(event);
    console.log(data );
    const user = await prisma.user.create( { data: JSON.parse(data) } );
    return user.id;
}

export default defineEventHandler(async (event) => POST(event));