"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PencilIcon, Upload } from "lucide-react"

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Show success toast
    toast("Your profile has been updated successfully.")

    setIsLoading(false)
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Profile" text="Manage your personal information and resume" />

      <div className="grid gap-6">
        <Card>
          <CardHeader className="relative pb-8">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-primary/20 to-primary/40 rounded-t-lg" />
            <div className="relative flex items-center gap-4 pt-12">
              <Avatar className="h-20 w-20 border-4 border-background">
                <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile picture" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>John Doe</CardTitle>
                <CardDescription>Frontend Developer</CardDescription>
              </div>
              <Button size="sm" variant="outline" className="ml-auto">
                <PencilIcon className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="professional">Professional</TabsTrigger>
                <TabsTrigger value="resume">Resume</TabsTrigger>
              </TabsList>
              <TabsContent value="personal" className="space-y-4 pt-4">
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="john.doe@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" defaultValue="(555) 123-4567" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" defaultValue="123 Main St, Anytown, CA 12345" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="professional" className="space-y-4 pt-4">
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Professional Title</Label>
                      <Input id="title" defaultValue="Frontend Developer" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Current/Last Company</Label>
                      <Input id="company" defaultValue="Acme Inc" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Input id="experience" type="number" defaultValue="5" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="skills">Skills</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge>JavaScript</Badge>
                        <Badge>React</Badge>
                        <Badge>TypeScript</Badge>
                        <Badge>HTML/CSS</Badge>
                        <Badge>Node.js</Badge>
                        <Badge>Git</Badge>
                        <Badge>UI/UX</Badge>
                      </div>
                      <Input id="skills" placeholder="Add a skill and press Enter" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Professional Summary</Label>
                      <Textarea
                        id="bio"
                        rows={4}
                        defaultValue="Frontend developer with 5 years of experience building responsive web applications using React, TypeScript, and modern JavaScript frameworks. Passionate about creating intuitive user interfaces and optimizing web performance."
                      />
                    </div>
                    <div>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="resume" className="space-y-4 pt-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label>Current Resume</Label>
                    <Card className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="bg-muted p-2 rounded">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6"
                          >
                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                            <polyline points="14 2 14 8 20 8" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">John_Doe_Resume.pdf</p>
                          <p className="text-sm text-muted-foreground">Uploaded on March 15, 2025</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </div>
                    </Card>
                  </div>
                  <div className="space-y-2">
                    <Label>Upload New Resume</Label>
                    <Card className="p-6 border-dashed flex flex-col items-center justify-center text-center">
                      <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="mb-1 font-medium">Drag and drop your resume here</p>
                      <p className="text-sm text-muted-foreground mb-4">Supports PDF, DOCX, up to 5MB</p>
                      <Button>Browse Files</Button>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Online Presence</CardTitle>
            <CardDescription>Connect your online profiles and portfolios</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input id="linkedin" type="url" defaultValue="https://linkedin.com/in/johndoe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub</Label>
                  <Input id="github" type="url" defaultValue="https://github.com/johndoe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="portfolio">Portfolio Website</Label>
                  <Input id="portfolio" type="url" defaultValue="https://johndoe.dev" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input id="twitter" type="url" defaultValue="https://twitter.com/johndoe" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardShell>
  )
}

