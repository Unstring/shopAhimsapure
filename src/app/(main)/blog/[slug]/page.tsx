
"use client";

import { notFound, useParams, useRouter } from 'next/navigation';
import { ManagedImage } from '@/components/managed-image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useBlog, BlogProvider } from '@/app/(admin)/_context/blog-context';
import { useEffect, useState } from 'react';
import { Post } from '@/lib/blog';
import ReactMarkdown from 'react-markdown';
import postsData from '@/content/blog-posts.json';

export async function generateStaticParams() {
  return postsData.map((post) => ({
    slug: post.slug,
  }));
}

function BlogPostPageComponent() {
  const params = useParams();
  const router = useRouter();
  const { getPostBySlug, posts } = useBlog();
  const [post, setPost] = useState<Post | undefined | null>(undefined);
  
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  useEffect(() => {
    // We check posts.length to ensure context is loaded
    if (slug && posts.length > 0) {
        const foundPost = getPostBySlug(slug);
        setPost(foundPost);
    }
  }, [slug, getPostBySlug, posts]);


  if (post === undefined) {
    // Loading state
    return <div className="text-center py-20">Loading post...</div>;
  }
  
  if (post === null || !post) {
    // Using a timeout to give state updates time to propagate before navigating
    setTimeout(() => router.push('/404'), 0);
    return null;
  }

  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <p className="text-primary font-semibold mb-2">{post.frontmatter.category}</p>
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">{post.frontmatter.title}</h1>
        <div className="flex items-center justify-center gap-4 text-muted-foreground">
             <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                    <ManagedImage src={post.frontmatter.authorAvatar} alt={post.frontmatter.author} width={32} height={32} />
                    <AvatarFallback>{post.frontmatter.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{post.frontmatter.author}</span>
            </div>
            <span>•</span>
            <time dateTime={post.frontmatter.date}>
                {new Date(post.frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
        </div>
      </header>
      
      <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-8">
        <ManagedImage 
            src={post.frontmatter.image} 
            alt={post.frontmatter.title}
            fill
            className="object-cover"
            priority
        />
      </div>

      <div 
        className="prose prose-lg max-w-none prose-p:text-muted-foreground prose-headings:font-headline prose-a:text-primary hover:prose-a:underline"
      >
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

       <footer className="mt-12 pt-8 border-t">
            <h3 className="text-xl font-headline font-semibold mb-4">About the Author</h3>
            <div className="flex items-center gap-4">
                 <Avatar className="h-16 w-16">
                    <ManagedImage src={post.frontmatter.authorAvatar} alt={post.frontmatter.author} width={64} height={64} />
                    <AvatarFallback>{post.frontmatter.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-bold text-lg">{post.frontmatter.author}</p>
                    <p className="text-muted-foreground">{post.frontmatter.authorRole}</p>
                </div>
            </div>
       </footer>

    </article>
  );
}


export default function BlogPostPage() {
    return (
        <BlogProvider>
            <BlogPostPageComponent />
        </BlogProvider>
    )
}
