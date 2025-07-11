
"use client";

import { PageHeader } from "../_components/page-header";
import { Button } from "@/components/ui/button";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useBlog } from "../../_context/blog-context";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React from "react";
import type { Post } from "@/lib/blog";

export default function BlogAdminPage() {
  const router = useRouter();
  const { posts, deletePost } = useBlog();
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [postToDelete, setPostToDelete] = React.useState<Post | null>(null);

  return (
    <>
      <div className="flex justify-between items-center">
        <PageHeader>Blog Posts</PageHeader>
        <Button asChild>
          <Link href="/admin/blog/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Post
          </Link>
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Date</TableHead>
              <TableHead><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.slug}>
                <TableCell className="font-medium">{post.frontmatter.title}</TableCell>
                <TableCell>{post.frontmatter.author}</TableCell>
                <TableCell>{new Date(post.frontmatter.date).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                   <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => router.push(`/admin/blog/${post.slug}/edit`)}>Edit</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                          onClick={() => {
                            setPostToDelete(post);
                            setShowDeleteDialog(true);
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
       <AlertDialogContent>
         <AlertDialogHeader>
           <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
           <AlertDialogDescription>
             This action cannot be undone. This will permanently delete the
             blog post "{postToDelete?.frontmatter.title}".
           </AlertDialogDescription>
         </AlertDialogHeader>
         <AlertDialogFooter>
           <AlertDialogCancel>Cancel</AlertDialogCancel>
           <AlertDialogAction
             variant="destructive"
             onClick={() => {
               if (postToDelete) {
                 deletePost(postToDelete.slug);
               }
               setShowDeleteDialog(false);
             }}
           >
             Delete
           </AlertDialogAction>
         </AlertDialogFooter>
       </AlertDialogContent>
     </AlertDialog>
    </>
  );
}
