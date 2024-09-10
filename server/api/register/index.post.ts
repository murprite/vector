import prisma from "~/lib/prisma";

interface Login {
    email: String,
    password: String
}

export default defineEventHandler(async (event) => {
    const body: Login = await useBody(event);
    const user = await prisma.user.findMany({ where: body.email });

    return !user ? {"error": "User doesn't exist"} : 
})