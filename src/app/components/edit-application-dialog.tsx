"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import type { JobApplication } from "./job-applications-table"
import { api } from "~/trpc/react"
import { JobStatus } from "@prisma/client"

interface EditApplicationDialogProps {
  application: JobApplication
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditApplicationDialog({ application, open, onOpenChange }: EditApplicationDialogProps) {
  const [company, setCompany] = useState(application.company)
  const [position, setPosition] = useState(application.position)
  const [location, setLocation] = useState(application.location)
  const [status, setStatus] = useState(application.status)
  const [dateApplied, setDateApplied] = useState<Date>(application.dateApplied)
  const [notes, setNotes] = useState(application.notes ?? "")
  const [isLoading, setIsLoading] = useState(false)

  const utils = api.useUtils();
    const updateJobApp = api.jobApplication.updateJobApp.useMutation({
      onSuccess: (newJob) => {
        utils.jobApplication.getJobApps.invalidate(); 
        utils.jobApplication.getJobApp.invalidate({ id: newJob.data.id }); 

        toast.success("Your job application has been updated successfully!");
      },
      onError: () => {
        toast.error("Failed to edit job application. Please try again.");
      },
    });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    await updateJobApp.mutateAsync({
      id: application.id,
      data: {
        company: company.trim(),
        notes: notes.trim(),
        position: position.trim(),
        location: location.trim(),
        status,
        dateApplied: dateApplied,
      }
    })

    // Reset form and close dialog
    setIsLoading(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Edit Application</DialogTitle>
          <DialogDescription>Update the details of your job application.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="company" className="text-right">
                Company
              </Label>
              <Input 
                id="company" 
                defaultValue={application.company} 
                className="col-span-3" 
                onChange={(e) => setCompany(e.target.value)}
                required 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="position" className="text-right">
                Position
              </Label>
              <Input 
                id="position"
                defaultValue={application.position} 
                className="col-span-3" 
                onChange={(e) => setPosition(e.target.value)} 
                required 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input 
                id="location" 
                defaultValue={application.location} 
                className="col-span-3" 
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select 
                defaultValue={application.status}
                onValueChange={(e) => setStatus(e as JobStatus)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="APPLIED">Applied</SelectItem>
                  <SelectItem value="INTERVIEW">Interview</SelectItem>
                  <SelectItem value="OFFER">Offer</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                  <SelectItem value="WITHDRAWN">Withdrawn</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dateApplied" className="text-right">
                Date Applied
              </Label>
              <Input
                id="dateApplied"
                type="date"
                className="col-span-3"
                defaultValue={dateApplied.toISOString().split("T")[0]}
                onChange={(e) => setDateApplied(new Date(e.target.value))}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <Textarea 
                id="notes" 
                placeholder="Add any notes about this application" 
                className="col-span-3" 
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

