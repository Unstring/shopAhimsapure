
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Post } from "@/lib/blog";
import { useBlog } from "../../../_context/blog-context";
import ReactMarkdown from 'react-markdown';

const blogPostSchema = z.object({
  title: z.string().min(2, "Title is required"),
  date: z.string().min(1, "Date is required"),
  author: z.string().min(2, "Author is required"),
  authorAvatar: z.string().url("Must be a valid URL"),
  authorRole: z.string().min(2, "Author role is required"),
  category: z.string().min(2, "Category is required"),
  image: z.string().url("Must be a valid URL"),
  excerpt: z.string().min(10, "Excerpt is required"),
  content: z.string().min(50, "Content must be at least 50 characters"),
});

type BlogPostFormValues = z.infer<typeof blogPostSchema>;

interface BlogPostFormProps {
  post?: Post;
}

export function BlogPostForm({ post }: BlogPostFormProps) {
  const router = useRouter();
  const { addPost, updatePost } = useBlog();
  const isEditMode = !!post;

  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: isEditMode ? {
        ...post.frontmatter,
        content: post.content,
    } : {
      title: "",
      date: new Date().toISOString().split('T')[0], // Defaults to today
      author: "",
      authorAvatar: "",
      authorRole: "",
      category: "",
      image: "",
      excerpt: "",
      content: "",
    },
  });

  const onSubmit = (data: BlogPostFormValues) => {
    const { content, ...frontmatter } = data;
    if (isEditMode && post.slug) {
      updatePost(post.slug, frontmatter, content);
    } else {
      addPost(frontmatter, content);
    }
    router.push("/admin/blog");
    router.refresh(); // Force a refresh to reflect changes
  };

  const contentPreview = form.watch('content');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader><CardTitle>Post Metadata</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.control} name="title" render={({ field }) => <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage/></FormItem>} />
            <FormField control={form.control} name="category" render={({ field }) => <FormItem><FormLabel>Category</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage/></FormItem>} />
            <FormField control={form.control} name="author" render={({ field }) => <FormItem><FormLabel>Author</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage/></FormItem>} />
            <FormField control={form.control} name="authorRole" render={({ field }) => <FormItem><FormLabel>Author Role</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage/></FormItem>} />
            <FormField control={form.control} name="date" render={({ field }) => <FormItem><FormLabel>Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage/></FormItem>} />
            <FormField control={form.control} name="image" render={({ field }) => <FormItem><FormLabel>Header Image URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage/></FormItem>} />
            <FormField control={form.control} name="authorAvatar" render={({ field }) => <FormItem><FormLabel>Author Avatar URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage/></FormItem>} />
            <FormField control={form.control} name="excerpt" render={({ field }) => <FormItem className="md:col-span-2"><FormLabel>Excerpt</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage/></FormItem>} />
          </CardContent>
        </Card>

        <Card>
            <CardHeader><CardTitle>Post Content (Markdown)</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Markdown</FormLabel>
                        <FormControl>
                            <Textarea
                            placeholder="Write your blog post content here using Markdown..."
                            className="min-h-[400px] font-mono"
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                 />
                 <div>
                    <FormLabel>Preview</FormLabel>
                    <div className="prose prose-sm max-w-none mt-2 rounded-md border p-4 h-[400px] overflow-auto bg-background">
                        <ReactMarkdown>{contentPreview}</ReactMarkdown>
                    </div>
                 </div>
            </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
          <Button type="submit">{isEditMode ? "Save Changes" : "Publish Post"}</Button>
        </div>
      </form>
    </Form>
  );
}
