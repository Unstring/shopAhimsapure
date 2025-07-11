
"use client";

import { useBlog } from "../../../../_context/blog-context";
import { BlogPostForm } from "../../_components/blog-post-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { Post } from "@/lib/blog";

interface EditFormProps {
    post: Post;
}

export function EditForm({ post }: EditFormProps) {
    const { getPostBySlug } = useBlog();
    const router = useRouter();
    
    // This effect ensures that if the post data from the context is not yet available,
    // or if the slug is invalid in the context's state, we handle it gracefully.
    useEffect(() => {
        const postInContext = getPostBySlug(post.slug);
        if (!postInContext) {
            // Using a timeout to give state updates time to propagate before navigating
            setTimeout(() => router.push('/404'), 0);
        }
    }, [post.slug, getPostBySlug, router]);
    
    return (
        <BlogPostForm post={post} />
    )
}
