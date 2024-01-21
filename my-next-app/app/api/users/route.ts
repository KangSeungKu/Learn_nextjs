import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const user = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
        }
    });

    return NextResponse.json(user);
}