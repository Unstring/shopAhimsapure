
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Post, PostFrontmatter } from '@/lib/blog';
import { useToast } from '@/hooks/use-toast';
import initialPosts from '@/content/blog-posts.json';

// Helper to create a URL-friendly slug
const slugify = (text: string) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-'); // Replace multiple - with single -

interface BlogContextType {
  posts: Post[];
  addPost: (frontmatter: PostFrontmatter, content: string) => void;
  updatePost: (slug: string, frontmatter: PostFrontmatter, content: string) => void;
  deletePost: (slug: string) => void;
  getPostBySlug: (slug: string) => Post | undefined;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts as Post[]);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, you might fetch this from an API, but for now we load from JSON.
    const sortedPosts = [...initialPosts].sort((a,b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
    setPosts(sortedPosts as Post[]);
  }, []);

  const addPost = (frontmatter: PostFrontmatter, content: string) => {
    const slug = slugify(frontmatter.title);
    const newPost: Post = {
      slug,
      frontmatter,
      content,
    };
    setPosts(prev => [newPost, ...prev].sort((a,b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()));
    toast({ title: "Blog Post Created", description: `"${frontmatter.title}" has been published.` });
  };

  const updatePost = (slug: string, frontmatter: PostFrontmatter, content: string) => {
    const newSlug = slugify(frontmatter.title);
    setPosts(prev =>
      prev.map(p => p.slug === slug ? { ...p, slug: newSlug, frontmatter, content } : p)
       .sort((a,b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
    );
     toast({ title: "Blog Post Updated", description: `"${frontmatter.title}" has been saved.` });
  };

  const deletePost = (slug: string) => {
    setPosts(prev => prev.filter(p => p.slug !== slug));
    toast({ variant: "destructive", title: "Blog Post Deleted", description: "The post has been removed." });
  };
  
  const getPostBySlug = (slug: string) => {
    return posts.find(p => p.slug === slug);
  }

  return (
    <BlogContext.Provider value={{ posts, addPost, updatePost, deletePost, getPostBySlug }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};
