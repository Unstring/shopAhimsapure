
import { PageHeader } from "../../../_components/page-header";
import postsData from '@/content/blog-posts.json';
import type { Post } from "@/lib/blog";
import { notFound } from "next/navigation";
import { EditForm } from "./edit-form";


// Generate static paths for Next.js to export
export async function generateStaticParams() {
  return postsData.map((post) => ({
    slug: post.slug,
  }));
}

function getPostBySlug(slug: string): Post | undefined {
    return postsData.find(p => p.slug === slug) as Post | undefined;
}

export default function EditPostPage({ params }: { params: { slug: string } }) {
    const post = getPostBySlug(params.slug);
    
    if (!post) {
       notFound();
    }
    
    return (
        <>
            <PageHeader>Edit Post</PageHeader>
            <EditForm post={post} />
        </>
    )
}
