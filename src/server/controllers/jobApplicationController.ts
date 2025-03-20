import { Prisma } from '@prisma/client';
import { db } from '~/server/db';

export const createJobApplication = async (input: {
  company: string;
  notes?: string;
  position: string;
  location: string;
  status: "APPLIED" | "INTERVIEW" | "OFFER" | "REJECTED" | "WITHDRAWN";
  dateApplied?: Date;
  lastUpdated?: Date;
  userId: string;
}) => {
  try {
    const jobApp = await db.jobApplication.create({
      data: {
        company: input.company,
        notes: input.notes ?? "",
        position: input.position,
        location: input.location,
        status: input.status ?? "APPLIED",
        dateApplied: input.dateApplied  
          ? new Date(input.dateApplied) 
          : new Date(),
        lastUpdated: new Date(),
        user: {
          connect: { id: input.userId }, 
        },
      },
    });
  
    return {
      status: "sucess",
      data: {
        jobApp,
      },
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Database Error:", error.message);
    }
    throw error;
  }
};

export const updateJobApplication = async (input: {
  id: string;
  data: Partial<{
    company: string;
    notes?: string;
    position: string;
    location: string;
    status: "APPLIED" | "INTERVIEW" | "OFFER" | "REJECTED" | "WITHDRAWN";
    dateApplied?: Date;
    lastUpdated?: Date;
  }>;
}) => {
  try {
    const updatedJobApp = await db.jobApplication.update({
      where: { id: input.id },
      data: {
        ...input.data,
        lastUpdated: new Date(),
      },
    });

    return {
      status: "success",
      data: updatedJobApp,
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Database Error:", error.message);
    }
    throw error;
  };
};

export const deleteJobApplication = async (input: {
  id: string;
}) => {
  try {
    await db.jobApplication.delete({
      where: { id: input.id },
    });
  
    return {
      status: "success",
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Database Error:", error.message);
    }
    throw error;
  }
};

export const getJobApplications = async () => {
  try {
    const apps = await db.jobApplication.findMany({
      orderBy: { lastUpdated: "desc" },
    });
  
    /* eslint-disable */
    return {
      status: "success",
      data: apps.map(app => ({
        ...app,
        lastUpdated: app.lastUpdated, 
        dateApplied: app.dateApplied, 
        notes: app.notes ?? undefined 
      })),
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Database Error:", error.message);
    }
    throw error;
  };
};

export const getJobApplication = async (input: {
  id: string
}) => {
  try {
    const app = await db.jobApplication.findUnique({
      where: { id: input.id },
    });
    
    if (!app) {
      return {
        status: "error",
      };
    }

    return {
      status: "success",
      data: app,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Database Error:", error.message);
    }
    throw error;
  };
};
