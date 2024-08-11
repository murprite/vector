import prisma from "@/lib/prisma";

async function GET() {
    const users = await prisma.user.findMany();

    return JSON.stringify(users);
}

export default defineEventHandler( async (event) => GET())