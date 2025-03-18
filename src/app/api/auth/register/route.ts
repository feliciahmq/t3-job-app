import bcrypt from "bcryptjs";
import { registerSchema } from "~/app/lib/zod";
import { db } from "~/server/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { name, email, password } = registerSchema.parse(await req.json());

		const currUser = await db.user.findUnique({
			where: { email },
		});

		if (currUser) {
			return NextResponse.json(
				{ error: "User already exists" },
				{ status: 400 }
			)
		};

		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(password, salt);

		await db.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
			},
		});

		return new Response(JSON.stringify({ message: "User registered successfully" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
	} catch (err) {
		return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
	}
}