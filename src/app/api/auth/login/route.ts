/* eslint-disable */
import bcrypt from "bcryptjs";
import { db } from "~/server/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";


export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        const user = await db.user.findUnique({
					where: { email },
        });

        if (!user) {
					return NextResponse.json(
						{ error: "User does not exist" },
						{ status: 401 }
					)
        };

        const isMatch = await bcrypt.compare(password, user.password);
				if (!isMatch) {
					return NextResponse.json(
						{ error: "Invalid password" },
						{ status: 401 }
					)
				}

				const tokenData: { id: string, name: string | null, email: string | null } = {
					id: user.id,
					name: user.name,
					email: user.email,
				}

				const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

        const response = NextResponse.json({
					message: "Login successful",
					token,
					success: true,
				})

				return response;
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}