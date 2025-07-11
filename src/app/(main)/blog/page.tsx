
"use client";

import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ManagedImage } from '@/components/managed-image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useBlog, BlogProvider } from '@/app/(admin)/_context/blog-context';

function BlogPageComponent() {
  const { posts } = useBlog();

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-5xl font-headline font-bold">From the Farmstead</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Stories of purity, tradition, and the goodness of A2 dairy.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Card key={post.slug} className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <Link
              href={`/blog/${post.slug}`}
              className="flex flex-col flex-grow"
              legacyBehavior>
              <CardHeader className="p-0 border-b">
                <div className="relative aspect-video w-full">
                  <ManagedImage
                    src={post.frontmatter.image}
                    alt={post.frontmatter.title}
                    fill
                    className="object-cover"
                    data-ai-hint="blog lifestyle"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6 flex flex-col flex-grow">
                <p className="text-sm text-primary font-semibold">{post.frontmatter.category}</p>
                <h2 className="text-xl font-headline font-bold mt-2">{post.frontmatter.title}</h2>
                <p className="mt-2 text-muted-foreground flex-grow">{post.frontmatter.excerpt}</p>
                <div className="flex items-center mt-6 pt-4 border-t">
                  <Avatar className="h-10 w-10">
                     <ManagedImage src={post.frontmatter.authorAvatar} alt={post.frontmatter.author} width={40} height={40} />
                     <AvatarFallback>{post.frontmatter.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                     <p className="font-semibold text-sm">{post.frontmatter.author}</p>
                     <p className="text-xs text-muted-foreground">{new Date(post.frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function BlogPage() {
    return (
        <BlogProvider>
            <BlogPageComponent />
        </BlogProvider>
    );
}
