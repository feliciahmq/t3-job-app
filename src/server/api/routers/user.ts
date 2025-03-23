import { initTRPC } from '@trpc/server';
import { db } from '~/server/db';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { registerSchema, loginSchema, updateUserSchema, changePasswordSchema, changePasswordByEmailSchema } from "~/app/lib/zod";
import { protectedProcedure, publicProcedure } from '../trpc';
import { appRouter } from '../root';

const t = initTRPC.create();

export const userRouter = t.router({
  getUser: publicProcedure.query(({ ctx }) => {
    return ctx.user ?? null;
  }),

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
			}),

    updateUser: protectedProcedure
      .input(updateUserSchema)
      .mutation(async ({ ctx, input }) => {
        const { name, email } = input;
        const userId = ctx.user?.id;

        if (!userId) {
          throw new Error("Unauthorized");
        }

        if (email) {
          const emailExists = await db.user.findUnique({ where: { email } });
          if (emailExists && emailExists.id !== userId) {
            throw new Error("Email already in use");
          }
        }

        let updateData: { name?: string; email?: string; password?: string } = {};

        if (name) updateData.name = name;
        if (email) updateData.email = email;

        const updatedUser = await db.user.update({
          where: { id: userId },
          data: updateData,
        });

        return {
          message: "Profile updated successfully",
          user: {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
          },
        };
      }),
    changePassword: protectedProcedure
    .input(changePasswordSchema)
    .mutation(async ({ ctx, input }) => {
    const { currentPassword, newPassword, confirmPassword } = input;

    if (newPassword !== confirmPassword) {
        throw new Error("New passwords do not match");
    }

    const user = await db.user.findUnique({ where: { id: ctx.user!.id } });

    if (!user) {
        throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
        throw new Error("Incorrect current password");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.user.update({
        where: { id: ctx.user!.id },
        data: { password: hashedPassword },
    });

    return { message: "Password changed successfully" };
    }),
    changePasswordByEmail: publicProcedure
    .input(changePasswordByEmailSchema)
    .mutation(async ({ input }) => {
        const { email, newPassword, confirmPassword } = input;
    
        if (newPassword !== confirmPassword) {
            throw new Error("New passwords do not match");
        }
    
        const user = await db.user.findUnique({ where: { email } });
    
        if (!user) {
            throw new Error("User not found");
        }
    
    
        const hashedPassword = await bcrypt.hash(newPassword, 10);
    
        await db.user.update({
            where: { email },
            data: { password: hashedPassword },
        });
    
        return { message: "Password changed successfully" };
        }),
    deleteAccount: protectedProcedure
      .mutation(async ({ ctx }) => {
        const userId = ctx.user?.id;

        await db.user.delete({
          where: { id: userId },
        });

        return { message: "Account deleted successfully" };
      })
});

export type UserRouter = typeof appRouter;
