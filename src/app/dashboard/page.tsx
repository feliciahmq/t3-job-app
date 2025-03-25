"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { JobApplicationsTable } from "@/components/job-applications-table"
import { CreateApplicationDialog } from "@/components/create-application-dialog"
import { BarChart3, BriefcaseIcon, CheckCircle2, Clock, FileText, PlusCircle } from "lucide-react"
import { api } from "~/trpc/react"

export default function DashboardPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const { data: statsData } = api.jobApplication.getStats.useQuery(undefined, {
    refetchOnMount: true,
    refetchOnWindowFocus: true,
	})

	const utils = api.useUtils(); 
	useEffect(() => {
		/* eslint-disable */
		utils.jobApplication.getStats.invalidate(); // force refetch
	}, []);

  const stats = [
    {
      name: "Total Applications",
      value: statsData?.total ?? 0,
      icon: BriefcaseIcon,
      description: "Applications submitted",
    },
    {
      name: "In Progress",
      value: statsData?.inProgress ?? 0,
      icon: Clock,
      description: "Waiting for response",
    },
    {
      name: "Interviews",
      value: statsData?.interviews ?? 0,
      icon: FileText,
      description: "Scheduled interviews",
    },
    {
      name: "Offers",
      value: statsData?.offers ?? 0,
      icon: CheckCircle2,
      description: "Job offers received",
    },
  ]

  return (
		<div>
			<DashboardShell>
				<DashboardHeader heading="Dashboard" text="Manage your job applications">
					<Button onClick={() => setIsCreateDialogOpen(true)}>
						<PlusCircle className="mr-2 h-4 w-4" />
						Add Application
					</Button>
				</DashboardHeader>
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					{stats.map((stat) => (
						<Card key={stat.name}>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
								<stat.icon className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">{stat.value}</div>
								<p className="text-xs text-muted-foreground">{stat.description}</p>
							</CardContent>
						</Card>
					))}
				</div>
				<Tabs defaultValue="all" className="space-y-4">
					<div className="flex items-center">
						<TabsList>
							<TabsTrigger value="all">All Applications</TabsTrigger>
							<TabsTrigger value="active">Active</TabsTrigger>
							<TabsTrigger value="archived">Archived</TabsTrigger>
						</TabsList>
						<div className="ml-auto flex items-center gap-2">
							<Link href="/dashboard/analytics">
								<Button variant="outline" size="sm">
									<BarChart3 className="mr-2 h-4 w-4" />
									Analytics
								</Button>
							</Link>
						</div>
					</div>
					<TabsContent value="all" className="space-y-4">
						<JobApplicationsTable />
					</TabsContent>
					<TabsContent value="active" className="space-y-4">
						<JobApplicationsTable filterStatus={["APPLIED", "INTERVIEW", "OFFER"]} />
					</TabsContent>
					<TabsContent value="archived" className="space-y-4">
						<JobApplicationsTable filterStatus={["REJECTED", "WITHDRAWN"]} />
					</TabsContent>
				</Tabs>
				<CreateApplicationDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} />
			</DashboardShell>
		</div>
  )
}

