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
import { KeyIcon, MailIcon } from "lucide-react"
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
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { api } from "~/trpc/react"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false)

  const changePassword = api.user.changePassword.useMutation({
    onSuccess: () => {
      toast.success("Password changed successfully!");
      setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    },
    onError: (error) => {
      if (error.data?.zodError) {
        const messages = Object.entries(error.data.zodError.fieldErrors)
          .map(([field, errors]) => `${field}: ${errors?.join(", ")}`)
          .join("\n");
  
          toast.error(
            <div>
              {messages.split("\n").map((msg, i) => (
                <p key={i}>{msg}</p>
              ))}
            </div>
          );
      } else {
        toast.error(error.message|| "Failed to update password.");
      }
    },
  });

  const router = useRouter();

  const deleteAccount = api.user.deleteAccount.useMutation({
    onSuccess: () => {
			toast.success("Account deleted successfully.");
			router.push("/");
    },
    onError: (err) => {
        toast.error(err.message || "Failed to delete account.");
    }
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await changePassword.mutateAsync(formData);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Settings" text="Manage your account settings" />

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:w-fit">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-4">
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
                    <AlertDialogAction 
											className="bg-destructive text-destructive-foreground"
											onClick={() => deleteAccount.mutate()}
                    >
                      Delete Account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <KeyIcon className="mr-2 h-5 w-5" />
                Password 
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-4"
                >
                  {showPassword ? <EyeOffIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
                </Button>
              </CardTitle>
              <CardDescription>Change your password and manage your account security</CardDescription>
            </CardHeader>
            <CardContent>
              <form id="password-form" onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input 
                      id="currentPassword" 
                      type={showPassword ? "text" : "password"}
                      value={formData.currentPassword}
                      onChange={handleChange}
                    />

                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input 
                      id="newPassword" 
                      type={showPassword ? "text" : "password"}
                      value={formData.newPassword}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input 
                      id="confirmPassword" 
                      type={showPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button type="button" 
                disabled={isLoading}
                onClick={() => {
                  const form = document.getElementById("password-form") as HTMLFormElement | null;
                  if (form) {
                    form.requestSubmit();
                  }
                }}
              >
                {isLoading ? "Updating..." : "Update Password"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

