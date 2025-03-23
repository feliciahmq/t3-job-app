"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { BarChart3Icon, CalendarIcon, LineChartIcon, PieChartIcon } from "lucide-react"

// Sample data for charts
const applicationsByMonth = [
  { name: "Jan", applications: 4 },
  { name: "Feb", applications: 7 },
  { name: "Mar", applications: 12 },
  { name: "Apr", applications: 9 },
  { name: "May", applications: 15 },
  { name: "Jun", applications: 8 },
  { name: "Jul", applications: 10 },
  { name: "Aug", applications: 6 },
  { name: "Sep", applications: 14 },
  { name: "Oct", applications: 11 },
  { name: "Nov", applications: 9 },
  { name: "Dec", applications: 5 },
]

const responseRateData = [
  { name: "Week 1", rate: 10 },
  { name: "Week 2", rate: 15 },
  { name: "Week 3", rate: 25 },
  { name: "Week 4", rate: 20 },
  { name: "Week 5", rate: 30 },
  { name: "Week 6", rate: 22 },
  { name: "Week 7", rate: 35 },
  { name: "Week 8", rate: 28 },
  { name: "Week 9", rate: 40 },
  { name: "Week 10", rate: 45 },
  { name: "Week 11", rate: 38 },
  { name: "Week 12", rate: 50 },
]

const applicationStatusData = [
  { name: "Applied", value: 65 },
  { name: "Interview", value: 15 },
  { name: "Offer", value: 5 },
  { name: "Rejected", value: 10 },
  { name: "Withdrawn", value: 5 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

const applicationsByJobType = [
  { name: "Full-time", value: 45 },
  { name: "Contract", value: 20 },
  { name: "Part-time", value: 15 },
  { name: "Freelance", value: 10 },
  { name: "Internship", value: 10 },
]

const applicationsByIndustry = [
  { name: "Technology", value: 40 },
  { name: "Finance", value: 15 },
  { name: "Healthcare", value: 10 },
  { name: "Education", value: 10 },
  { name: "Retail", value: 5 },
  { name: "Manufacturing", value: 5 },
  { name: "Other", value: 15 },
]

export default function AnalyticsPage() {
  return (
    <div>
      <div className="bg-red-500 text-white text-center py-2 font-semibold">
        This dashboard uses mock data for demonstration purposes only.
      </div>
      <DashboardShell>
        <DashboardHeader heading="Analytics" text="Track your job application metrics and insights">
          <div className="flex items-center gap-2">
            <Select defaultValue="last6months">
              <SelectTrigger className="w-[180px]">
                <CalendarIcon className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last30days">Last 30 days</SelectItem>
                <SelectItem value="last3months">Last 3 months</SelectItem>
                <SelectItem value="last6months">Last 6 months</SelectItem>
                <SelectItem value="lastyear">Last year</SelectItem>
                <SelectItem value="alltime">All time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </DashboardHeader>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">124</div>
              <p className="text-xs text-muted-foreground">+28% from last period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32%</div>
              <p className="text-xs text-muted-foreground">+5% from last period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Interview Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18%</div>
              <p className="text-xs text-muted-foreground">+2% from last period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Offer Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5%</div>
              <p className="text-xs text-muted-foreground">+1% from last period</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview" className="flex items-center">
              <BarChart3Icon className="mr-2 h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="applications" className="flex items-center">
              <LineChartIcon className="mr-2 h-4 w-4" />
              Applications
            </TabsTrigger>
            <TabsTrigger value="breakdown" className="flex items-center">
              <PieChartIcon className="mr-2 h-4 w-4" />
              Breakdown
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Applications Over Time</CardTitle>
                  <CardDescription>Number of job applications submitted per month</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={applicationsByMonth}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="applications" fill="#8884d8" name="Applications" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Response Rate Trend</CardTitle>
                  <CardDescription>Percentage of applications that received a response</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={responseRateData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="rate"
                        stroke="#8884d8"
                        name="Response Rate (%)"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Application Status</CardTitle>
                  <CardDescription>Distribution of applications by current status</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={applicationStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {applicationStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Time to Response</CardTitle>
                  <CardDescription>Average days until first response by company</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={[
                        { name: "Google", days: 7 },
                        { name: "Microsoft", days: 10 },
                        { name: "Amazon", days: 14 },
                        { name: "Apple", days: 12 },
                        { name: "Meta", days: 9 },
                        { name: "Netflix", days: 8 },
                        { name: "Startups", days: 5 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="days" fill="#82ca9d" name="Days to Response" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="applications" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Application Success Rate</CardTitle>
                  <CardDescription>Percentage of applications that led to interviews and offers</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "Applied", total: 100, interviews: 25, offers: 8 },
                        { name: "Referrals", total: 20, interviews: 12, offers: 5 },
                        { name: "Direct", total: 15, interviews: 8, offers: 3 },
                        { name: "Recruiters", total: 10, interviews: 6, offers: 2 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="total" fill="#8884d8" name="Total Applications" />
                      <Bar dataKey="interviews" fill="#82ca9d" name="Interviews" />
                      <Bar dataKey="offers" fill="#ffc658" name="Offers" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Application Sources</CardTitle>
                  <CardDescription>Where your applications are coming from</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "LinkedIn", value: 45 },
                          { name: "Indeed", value: 25 },
                          { name: "Company Website", value: 15 },
                          { name: "Referrals", value: 10 },
                          { name: "Other", value: 5 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {applicationStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Weekly Application Activity</CardTitle>
                  <CardDescription>Number of applications submitted per week</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { week: "Week 1", applications: 5 },
                        { week: "Week 2", applications: 8 },
                        { week: "Week 3", applications: 12 },
                        { week: "Week 4", applications: 10 },
                        { week: "Week 5", applications: 15 },
                        { week: "Week 6", applications: 9 },
                        { week: "Week 7", applications: 14 },
                        { week: "Week 8", applications: 11 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="applications"
                        stroke="#8884d8"
                        name="Applications"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Response Time Analysis</CardTitle>
                  <CardDescription>Average days to response by application source</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { source: "LinkedIn", days: 12 },
                        { source: "Indeed", days: 15 },
                        { source: "Company Website", days: 8 },
                        { source: "Referrals", days: 5 },
                        { source: "Recruiters", days: 3 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="source" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="days" fill="#82ca9d" name="Average Days to Response" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="breakdown" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Applications by Job Type</CardTitle>
                  <CardDescription>Distribution of applications by employment type</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={applicationsByJobType}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {applicationsByJobType.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Applications by Industry</CardTitle>
                  <CardDescription>Distribution of applications by industry sector</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={applicationsByIndustry}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {applicationsByIndustry.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Applications by Experience Level</CardTitle>
                  <CardDescription>Distribution of applications by required experience</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { level: "Entry Level", applications: 35 },
                        { level: "Mid Level", applications: 55 },
                        { level: "Senior Level", applications: 25 },
                        { level: "Executive", applications: 5 },
                        { level: "Internship", applications: 10 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="level" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="applications" fill="#8884d8" name="Applications" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Salary Range Analysis</CardTitle>
                  <CardDescription>Applications by salary range</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { range: "$0-50K", applications: 15 },
                        { range: "$50-75K", applications: 30 },
                        { range: "$75-100K", applications: 45 },
                        { range: "$100-125K", applications: 25 },
                        { range: "$125K+", applications: 10 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="applications" fill="#82ca9d" name="Applications" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DashboardShell>
    </div>
  )
}

