import { initTRPC } from '@trpc/server';
import { db } from '~/server/db';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { registerSchema, loginSchema } from "~/app/lib/zod";
import { publicProcedure } from '../trpc';

const t = initTRPC.create();

export const userRouter = t.router({
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ input }) => {
			const { name, email, password } = input;

			/* eslint-disable */
			const currUser = await db.user.findUnique({ where: { email }});
			if (currUser) {
				throw new Error("User already exists");
			}

			const salt = await bcrypt.genSalt(10)
			const hashedPassword = await bcrypt.hash(password, salt);
			
			const user = await db.user.create({
				data: {
					name,
					email,
					password: hashedPassword,
				},
			});

			return {
				message: "User registered successfully",
				userId: user.id,
			}
    }),

		login: publicProcedure
			.input(loginSchema)
			.mutation(async ({ input }) => {
				const { email, password } = input;
	
				const user = await db.user.findUnique({
					where: { email },
				});

				if (!user) {
					throw new Error("User already exists")
				};

				const isMatch = await bcrypt.compare(password, user.password);
				if (!isMatch) {
					throw new Error("Wrong password")
				}

				const tokenData: { id: string, name: string | null, email: string | null } = {
					id: user.id,
					name: user.name,
					email: user.email,
				}

				const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });
				
				return {
					message: "Login successful",
					token
				}
			})
});