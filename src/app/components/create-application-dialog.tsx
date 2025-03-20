"use client"

import type React from "react"

import { useState } from "react"
import { api } from "~/trpc/react"
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
import { JobStatus } from "@prisma/client"

interface CreateApplicationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateApplicationDialog({ open, onOpenChange }: CreateApplicationDialogProps) {
  const [company, setCompany] = useState("")
  const [position, setPosition] = useState("")
  const [location, setLocation] = useState("")
  const [status, setStatus] = useState<JobStatus>("APPLIED")
  const [dateApplied, setDateApplied] = useState<Date>(new Date()) 
  const [notes, setNotes] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const utils = api.useUtils();

  const createJobApp = api.jobApplication.createJobApp.useMutation({
    onSuccess: (newJob) => {
      utils.jobApplication.getJobApps.invalidate(); 
      utils.jobApplication.getJobApp.invalidate({ id: newJob.data.jobApp.id }); 

      toast.success("Your job application has been created successfully!");
    },
    onError: () => {
      toast.error("Failed to create job application. Please try again.");
    },
  });
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await createJobApp.mutateAsync({
        company: company.trim(),
        notes: notes.trim(),
        position: position.trim(),
        location: location.trim(),
        status,
        dateApplied,
      })

      // Show success toast
      toast("Your job application has been created successfully.")

      // Reset form and close dialog
      setCompany("")
      setPosition("")
      setLocation("")
      setStatus(JobStatus.APPLIED)
      setDateApplied(new Date())
      setNotes("")
      onOpenChange(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add New Application</DialogTitle>
          <DialogDescription>Enter the details of your new job application.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="company" className="text-right" >
                Company
              </Label>
              <Input 
                id="company" 
                placeholder="Company name" 
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
                placeholder="Job title" 
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
                placeholder="City, State or Remote" 
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
                defaultValue="APPLIED"
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
                defaultValue={new Date().toISOString().split("T")[0]}
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
              {isLoading ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

