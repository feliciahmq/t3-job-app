"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { api } from "~/trpc/react";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { EyeIcon, EyeOffIcon } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { toast } from "sonner";
import { queryClient } from "~/trpc/react";

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

	const loginMutation = api.user.login.useMutation({
		onSuccess: async (res) => {
			if (res?.token) {
				localStorage.setItem("token", res.token);
				setTimeout(() => {
					router.push("/dashboard");
				}, 100);
			} else {
				setError("Please reload and try again.");
			}
		},
		onError: (error) => {
				setError(error.message);
		},
	})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
			await loginMutation.mutateAsync({
				email,
				password,
			});
      
    } catch {
      setError("Wrong email or password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const changePassword = api.user.changePasswordByEmail.useMutation({
    onSuccess: async () => {
      toast.success("Password changed successfully!");
      try {
        const res = await loginMutation.mutateAsync({
          email: formData.email,
          password: formData.newPassword,
        });
    
        if (res.token) {
          localStorage.setItem("token", res.token);
          router.push("/dashboard");
        }
      } catch {
        toast.error("Password changed, but auto-login failed. Please log in manually.");
      }
      setFormData({ ...formData, currentPassword: "", newPassword: "", confirmPassword: "" });
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
        toast.error(error.message ?? "Failed to update password.");
      }
    },
  });

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords do not match.");
      setIsLoading(false);
      return;
    }
  
    try {
      await changePassword.mutateAsync(formData);
      
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Enter your email and password to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Dialog>
                <DialogTrigger className="text-xs text-primary hover:underline">
                  Forgot password?
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogDescription>
                      Enter your current password and choose a new one.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handlePasswordSubmit} className="space-y-4 pt-2">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          type={showPassword ? "text" : "password"}
                          value={formData.newPassword}
                          onChange={(e) =>
                            setFormData({ ...formData, newPassword: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                          id="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={(e) =>
                            setFormData({ ...formData, confirmPassword: e.target.value })
                          }
                        />
                      </div>
                      <DialogFooter className="pt-4">
                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? "Updating..." : "Update Password"}
                        </Button>
                      </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-12" // Ensures input does not overlap with the button
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center"
                >
                  {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-sm text-muted-foreground mt-2">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
          <div className="text-xs text-muted-foreground mt-4">
            <p>Demo credentials:</p>
            <p>Email: demo@example.com</p>
            <p>Password: password</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

