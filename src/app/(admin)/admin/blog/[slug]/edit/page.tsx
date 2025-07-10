
"use client";

import { useBlog } from "../../../../_context/blog-context";
import { PageHeader } from "../../../_components/page-header";
import { BlogPostForm } from "../../_components/blog-post-form";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import type { Post } from "@/lib/blog";

export default function EditPostPage({ params }: { params: { slug: string } }) {
    const { getPostBySlug } = useBlog();
    const [post, setPost] = useState<Post | undefined>();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const foundPost = getPostBySlug(params.slug);
        setPost(foundPost);
        setLoading(false);
    }, [params.slug, getPostBySlug]);


    if (loading) {
        return <PageHeader>Loading...</PageHeader>
    }
    
    if (!post) {
       return notFound();
    }
    
    return (
        <>
            <PageHeader>Edit Post</PageHeader>
            <BlogPostForm post={post} />
        </>
    )
}
