"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BellIcon, KeyIcon, MailIcon, MoonIcon, PaletteIcon, ShieldIcon, SunIcon, UserIcon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Show success toast
    toast("Your settings have been updated successfully.")

    setIsLoading(false)
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Settings" text="Manage your account settings and preferences" />

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList className="grid grid-cols-4 md:w-fit">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserIcon className="mr-2 h-5 w-5" />
                Account Information
              </CardTitle>
              <CardDescription>Update your account details and personal information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="johndoe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="America/Los_Angeles">
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/Los_Angeles">Pacific Time (US & Canada)</SelectItem>
                        <SelectItem value="America/New_York">Eastern Time (US & Canada)</SelectItem>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="Europe/London">London</SelectItem>
                        <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                      </SelectContent>
                    </Select>
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

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MailIcon className="mr-2 h-5 w-5" />
                Email Preferences
              </CardTitle>
              <CardDescription>Manage your email notifications and subscriptions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="marketing-emails" className="flex flex-col space-y-1">
                  <span>Marketing emails</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Receive emails about new features, job tips, and promotions
                  </span>
                </Label>
                <Switch id="marketing-emails" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="product-emails" className="flex flex-col space-y-1">
                  <span>Product updates</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Receive emails about product updates and new features
                  </span>
                </Label>
                <Switch id="product-emails" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="digest-emails" className="flex flex-col space-y-1">
                  <span>Weekly digest</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Receive a weekly summary of your job application activity
                  </span>
                </Label>
                <Switch id="digest-emails" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-destructive flex items-center">Delete Account</CardTitle>
              <CardDescription>Permanently delete your account and all of your data</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Once you delete your account, there is no going back. This action cannot be undone. All of your data
                will be permanently removed from our servers.
              </p>
            </CardContent>
            <CardFooter>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete Account</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your account and remove your data from
                      our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-destructive text-destructive-foreground">
                      Delete Account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BellIcon className="mr-2 h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>Configure how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Application Updates</h3>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="application-status" className="flex flex-col space-y-1">
                      <span>Status changes</span>
                      <span className="font-normal text-sm text-muted-foreground">
                        Get notified when an application status changes
                      </span>
                    </Label>
                    <Switch id="application-status" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="application-reminder" className="flex flex-col space-y-1">
                      <span>Interview reminders</span>
                      <span className="font-normal text-sm text-muted-foreground">
                        Get reminders before scheduled interviews
                      </span>
                    </Label>
                    <Switch id="application-reminder" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="application-deadline" className="flex flex-col space-y-1">
                      <span>Application deadlines</span>
                      <span className="font-normal text-sm text-muted-foreground">
                        Get notified about upcoming application deadlines
                      </span>
                    </Label>
                    <Switch id="application-deadline" defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Delivery</h3>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
                      <span>Email notifications</span>
                      <span className="font-normal text-sm text-muted-foreground">Receive notifications via email</span>
                    </Label>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="browser-notifications" className="flex flex-col space-y-1">
                      <span>Browser notifications</span>
                      <span className="font-normal text-sm text-muted-foreground">
                        Receive notifications in your browser
                      </span>
                    </Label>
                    <Switch id="browser-notifications" />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="mobile-notifications" className="flex flex-col space-y-1">
                      <span>Mobile notifications</span>
                      <span className="font-normal text-sm text-muted-foreground">
                        Receive notifications on your mobile device
                      </span>
                    </Label>
                    <Switch id="mobile-notifications" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PaletteIcon className="mr-2 h-5 w-5" />
                Appearance
              </CardTitle>
              <CardDescription>Customize the look and feel of the application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" className="justify-start p-4 h-auto">
                    <SunIcon className="mr-2 h-5 w-5" />
                    <div className="text-left">
                      <p className="font-medium">Light</p>
                      <p className="text-xs text-muted-foreground">Light mode theme</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start p-4 h-auto">
                    <MoonIcon className="mr-2 h-5 w-5" />
                    <div className="text-left">
                      <p className="font-medium">Dark</p>
                      <p className="text-xs text-muted-foreground">Dark mode theme</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start p-4 h-auto border-primary">
                    <div className="mr-2 h-5 w-5 rounded-full bg-gradient-to-r from-sky-400 to-blue-500" />
                    <div className="text-left">
                      <p className="font-medium">System</p>
                      <p className="text-xs text-muted-foreground">Follow system theme</p>
                    </div>
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Accent Color</Label>
                <div className="grid grid-cols-6 gap-2">
                  <div className="flex items-center justify-center">
                    <Button className="h-8 w-8 rounded-full bg-primary" variant="outline" />
                  </div>
                  <div className="flex items-center justify-center">
                    <Button className="h-8 w-8 rounded-full bg-blue-500" variant="outline" />
                  </div>
                  <div className="flex items-center justify-center">
                    <Button className="h-8 w-8 rounded-full bg-green-500" variant="outline" />
                  </div>
                  <div className="flex items-center justify-center">
                    <Button className="h-8 w-8 rounded-full bg-purple-500" variant="outline" />
                  </div>
                  <div className="flex items-center justify-center">
                    <Button className="h-8 w-8 rounded-full bg-orange-500" variant="outline" />
                  </div>
                  <div className="flex items-center justify-center">
                    <Button className="h-8 w-8 rounded-full bg-pink-500" variant="outline" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Font Size</Label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue placeholder="Select font size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="animations" className="flex flex-col space-y-1">
                  <span>Animations</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Enable animations throughout the interface
                  </span>
                </Label>
                <Switch id="animations" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <KeyIcon className="mr-2 h-5 w-5" />
                Password
              </CardTitle>
              <CardDescription>Change your password and manage your account security</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Password"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShieldIcon className="mr-2 h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Manage your account security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="two-factor" className="flex flex-col space-y-1">
                  <span>Two-factor authentication</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </span>
                </Label>
                <Switch id="two-factor" />
              </div>
              <Separator />
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="session-timeout" className="flex flex-col space-y-1">
                  <span>Session timeout</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Automatically log out after a period of inactivity
                  </span>
                </Label>
                <Switch id="session-timeout" defaultChecked />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Active Sessions</Label>
                <Card className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Chrome on Windows</p>
                        <p className="text-sm text-muted-foreground">Last active: Today at 2:30 PM</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Logout
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Safari on macOS</p>
                        <p className="text-sm text-muted-foreground">Last active: Yesterday at 6:45 PM</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Logout
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Mobile App on iPhone</p>
                        <p className="text-sm text-muted-foreground">Last active: March 12, 2025</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Logout
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Logout of All Sessions
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

