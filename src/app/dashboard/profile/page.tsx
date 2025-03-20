"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PencilIcon } from "lucide-react"
import { api } from "~/trpc/react"

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
 
  const { data: user } = api.user.getUser.useQuery();
  const [name, setName] = useState(user?.name || "");
  const utils = api.useUtils();

  const updateUser = api.user.updateUser.useMutation({
    onSuccess: (updatedUser) => {
      if (updatedUser?.user?.id) {
        utils.user.getUser.invalidate();
        setName(updatedUser.user.name || "");
      }
  
      toast.success("Profile updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update profile.");
    },
  })

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
      });
      setName(user.name || "");
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await updateUser.mutateAsync(formData)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Profile" text="Manage your personal information" />

      <div className="grid gap-6">
        <Card>
          <CardHeader className="relative pb-8">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-primary/20 to-primary/40 rounded-t-lg" />
            <div className="relative flex items-center gap-4 pt-12">
              <Avatar className="h-20 w-20 border-4 border-background">
                <AvatarFallback>{name ? name.substring(0, 2).toUpperCase() : "JD"}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{name || "User"}</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Name</Label>
                  <Input id="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        
      </div>
    </DashboardShell>
  )
}

