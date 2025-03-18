"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import {
  DownloadIcon,
  FileIcon,
  FileTextIcon,
  FolderIcon,
  MoreHorizontal,
  PencilIcon,
  PlusIcon,
  Share2Icon,
  Trash2Icon,
  UploadIcon,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"

// Sample document data
const resumes = [
  {
    id: "1",
    name: "Software_Engineer_Resume.pdf",
    type: "PDF",
    size: "1.2 MB",
    lastModified: "2025-03-01",
    tags: ["tech", "software"],
  },
  {
    id: "2",
    name: "Frontend_Developer_Resume.docx",
    type: "DOCX",
    size: "890 KB",
    lastModified: "2025-02-15",
    tags: ["tech", "frontend"],
  },
]

const coverLetters = [
  {
    id: "1",
    name: "Google_Cover_Letter.pdf",
    type: "PDF",
    size: "450 KB",
    lastModified: "2025-03-05",
    tags: ["tech", "google"],
  },
  {
    id: "2",
    name: "Startup_Cover_Letter.docx",
    type: "DOCX",
    size: "520 KB",
    lastModified: "2025-02-20",
    tags: ["startup"],
  },
  {
    id: "3",
    name: "General_Cover_Letter_Template.docx",
    type: "DOCX",
    size: "480 KB",
    lastModified: "2025-01-10",
    tags: ["template"],
  },
]

const portfolioItems = [
  {
    id: "1",
    name: "Portfolio_Website_Screenshots.zip",
    type: "ZIP",
    size: "5.4 MB",
    lastModified: "2025-02-28",
    tags: ["portfolio", "screenshots"],
  },
  {
    id: "2",
    name: "Project_Case_Study.pdf",
    type: "PDF",
    size: "2.1 MB",
    lastModified: "2025-01-15",
    tags: ["case study", "project"],
  },
]

export default function DocumentsPage() {
  const [isUploading, setIsUploading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleUpload = async () => {
    setIsUploading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Show success toast
    toast("Your document has been uploaded successfully.")

    setIsUploading(false)
  }

  const filterDocuments = (documents: any[]) => {
    if (!searchQuery) return documents
    return documents.filter(
      (doc) =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
    )
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Documents" text="Manage your resumes, cover letters, and other documents">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UploadIcon className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Upload Document</DialogTitle>
              <DialogDescription>Upload a new document to your collection</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="file">File</Label>
                <Card className="p-6 border-dashed flex flex-col items-center justify-center text-center">
                  <UploadIcon className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="mb-1 font-medium">Drag and drop your file here</p>
                  <p className="text-sm text-muted-foreground mb-4">Supports PDF, DOCX, RTF, TXT, up to 10MB</p>
                  <Button>Browse Files</Button>
                </Card>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="document-type">Document Type</Label>
                <Tabs defaultValue="resume" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="resume">Resume</TabsTrigger>
                    <TabsTrigger value="cover-letter">Cover Letter</TabsTrigger>
                    <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input id="tags" placeholder="tech, software, template" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Add notes about this document" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {}}>
                Cancel
              </Button>
              <Button onClick={handleUpload} disabled={isUploading}>
                {isUploading ? "Uploading..." : "Upload"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardHeader>

      <div className="mb-4">
        <Input
          placeholder="Search documents by name or tag..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      <Tabs defaultValue="resumes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="resumes" className="flex items-center">
            <FileTextIcon className="mr-2 h-4 w-4" />
            Resumes
          </TabsTrigger>
          <TabsTrigger value="cover-letters" className="flex items-center">
            <FileIcon className="mr-2 h-4 w-4" />
            Cover Letters
          </TabsTrigger>
          <TabsTrigger value="portfolio" className="flex items-center">
            <FolderIcon className="mr-2 h-4 w-4" />
            Portfolio
          </TabsTrigger>
        </TabsList>

        <TabsContent value="resumes" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filterDocuments(resumes).map((resume) => (
              <Card key={resume.id} className="overflow-hidden">
                <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-y-0">
                  <div className="space-y-1">
                    <CardTitle className="text-base flex items-center">
                      <FileTextIcon className="mr-2 h-4 w-4" />
                      {resume.name}
                    </CardTitle>
                    <CardDescription>
                      {resume.type} • {resume.size}
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <DownloadIcon className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share2Icon className="mr-2 h-4 w-4" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <PencilIcon className="mr-2 h-4 w-4" />
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2Icon className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex flex-wrap gap-1 mt-2">
                    {resume.tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <span className="text-xs text-muted-foreground">Last modified: {resume.lastModified}</span>
                  <Button variant="ghost" size="sm" className="h-7 px-2">
                    <DownloadIcon className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}

            <Card className="flex flex-col items-center justify-center p-6 border-dashed h-[200px]">
              <PlusIcon className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="font-medium text-center">Add New Resume</p>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Upload a new resume or create from template
              </p>
              <Button>
                <UploadIcon className="mr-2 h-4 w-4" />
                Upload Resume
              </Button>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cover-letters" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filterDocuments(coverLetters).map((letter) => (
              <Card key={letter.id} className="overflow-hidden">
                <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-y-0">
                  <div className="space-y-1">
                    <CardTitle className="text-base flex items-center">
                      <FileIcon className="mr-2 h-4 w-4" />
                      {letter.name}
                    </CardTitle>
                    <CardDescription>
                      {letter.type} • {letter.size}
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <DownloadIcon className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share2Icon className="mr-2 h-4 w-4" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <PencilIcon className="mr-2 h-4 w-4" />
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2Icon className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex flex-wrap gap-1 mt-2">
                    {letter.tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <span className="text-xs text-muted-foreground">Last modified: {letter.lastModified}</span>
                  <Button variant="ghost" size="sm" className="h-7 px-2">
                    <DownloadIcon className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}

            <Card className="flex flex-col items-center justify-center p-6 border-dashed h-[200px]">
              <PlusIcon className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="font-medium text-center">Add New Cover Letter</p>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Upload a new cover letter or create from template
              </p>
              <Button>
                <UploadIcon className="mr-2 h-4 w-4" />
                Upload Cover Letter
              </Button>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filterDocuments(portfolioItems).map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-y-0">
                  <div className="space-y-1">
                    <CardTitle className="text-base flex items-center">
                      <FolderIcon className="mr-2 h-4 w-4" />
                      {item.name}
                    </CardTitle>
                    <CardDescription>
                      {item.type} • {item.size}
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <DownloadIcon className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share2Icon className="mr-2 h-4 w-4" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <PencilIcon className="mr-2 h-4 w-4" />
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2Icon className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <span className="text-xs text-muted-foreground">Last modified: {item.lastModified}</span>
                  <Button variant="ghost" size="sm" className="h-7 px-2">
                    <DownloadIcon className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}

            <Card className="flex flex-col items-center justify-center p-6 border-dashed h-[200px]">
              <PlusIcon className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="font-medium text-center">Add Portfolio Item</p>
              <p className="text-sm text-muted-foreground text-center mb-4">Upload a new portfolio item or project</p>
              <Button>
                <UploadIcon className="mr-2 h-4 w-4" />
                Upload Item
              </Button>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

