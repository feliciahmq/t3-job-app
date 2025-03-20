import { initTRPC, TRPCError } from '@trpc/server';
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
    .query(() => getJobApplications()),

  getJobApp: protectedProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .query(({ input }) => getJobApplication(input)),
});

export type AppRouter = typeof appRouter;