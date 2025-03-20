import { initTRPC } from '@trpc/server';
import { publicProcedure, protectedProcedure } from '../trpc';
import { appRouter } from '../root';
import { z } from "zod";
import {
  createJobApplication,
  updateJobApplication,
  deleteJobApplication,
  getJobApplications,
  getJobApplication
} from "~/server/controllers/jobApplicationController"
import { jobApplicationSchema } from '~/app/lib/zod';

const t = initTRPC.create();

export const jobApplicationRouter = t.router({
  createJobApp: protectedProcedure
    .input(jobApplicationSchema.omit({ userId: true }))
    .mutation(async ({ ctx, input}) => {
      return await createJobApplication({
        ...input,
        userId: ctx.user!.id,
      })
    }),

  updateJobApp: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: jobApplicationSchema.partial(),
      })
    )
    .mutation(({ input }) => updateJobApplication(input)),

  deleteJobApp: protectedProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .mutation(({ input }) => deleteJobApplication(input)),

  getJobApps: publicProcedure
    .query(async ({ ctx }) => 
      getJobApplications({ userId: ctx.user!.id})
  ),

  getJobApp: protectedProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .query(({ input }) => getJobApplication(input)),

  getStats: protectedProcedure
    .query(async ({ ctx }) => {
      const userId = ctx.user!.id; 

      const total = await ctx.prisma.jobApplication.count({
        where: { userId },
      });
      const inProgress = await ctx.prisma.jobApplication.count({
        where: { userId, status: { in: ["APPLIED", "INTERVIEW"] } },
      });
      const interviews = await ctx.prisma.jobApplication.count({
        where: { userId, status: "INTERVIEW" },
      });
      const offers = await ctx.prisma.jobApplication.count({
        where: { userId, status: "OFFER" },
      });
  
      return {
        total,
        inProgress,
        interviews,
        offers,
      };
    })
});

export type JobAppRouter = typeof appRouter;