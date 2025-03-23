"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import type { JobApplication } from "./job-applications-table"
import { api } from "~/trpc/react"

interface DeleteApplicationDialogProps {
  application: JobApplication
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeleteApplicationDialog({ application, open, onOpenChange }: DeleteApplicationDialogProps) {
  const [isLoading, setIsLoading] = useState(false)

  const utils = api.useUtils();
  const deleteJobApp = api.jobApplication.deleteJobApp.useMutation({
    onSuccess: async () => {
      await utils.jobApplication.getJobApps.invalidate(); 

      toast.success("Your job application has been created successfully!");
    },
    onError: () => {
      toast.error("Failed to create job application. Please try again.");
    },
  });

  const handleDelete = async () => {
    setIsLoading(true)

    await deleteJobApp.mutateAsync({
      id: application.id,
    })

    // Close dialog
    setIsLoading(false)
    onOpenChange(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the application for{" "}
            <span className="font-semibold">{application.position}</span> at{" "}
            <span className="font-semibold">{application.company}</span>. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

