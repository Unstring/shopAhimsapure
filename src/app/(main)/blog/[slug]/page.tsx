import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { ManagedImage } from '@/components/managed-image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
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
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />

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
