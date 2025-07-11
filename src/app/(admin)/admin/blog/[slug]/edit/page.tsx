
"use client";

import { useBlog } from "../../../../_context/blog-context";
import { PageHeader } from "../../../_components/page-header";
import { BlogPostForm } from "../../_components/blog-post-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Post } from "@/lib/blog";
import postsData from '@/content/blog-posts.json';

// Generate static paths for Next.js to export
export async function generateStaticParams() {
  return postsData.map((post) => ({
    slug: post.slug,
  }));
}

export default function EditPostPage({ params }: { params: { slug: string } }) {
    const { getPostBySlug, posts } = useBlog();
    const [post, setPost] = useState<Post | undefined | null>(undefined);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    
    useEffect(() => {
        // We check posts length to ensure context is loaded
        if (posts.length > 0) {
            const foundPost = getPostBySlug(params.slug);
            setPost(foundPost);
            setLoading(false);
        }
    }, [params.slug, getPostBySlug, posts]);


    if (loading) {
        return <PageHeader>Loading...</PageHeader>
    }
    
    if (!post) {
       // Using a timeout to give state updates time to propagate before navigating
       setTimeout(() => router.push('/404'), 0);
       return null;
    }
    
    return (
        <>
            <PageHeader>Edit Post</PageHeader>
            <BlogPostForm post={post} />
        </>
    )
}
