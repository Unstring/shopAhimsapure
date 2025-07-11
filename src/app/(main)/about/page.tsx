
import { Leaf, Heart, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import aboutData from '@/content/about-page.json';
import { ManagedImage } from '@/components/managed-image';

export default function AboutPage() {
  const { teamMembers } = aboutData;

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-5xl font-headline font-bold">Our Story</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          AhimsaPure was born from a simple desire: to bring the purest dairy products from our happy cows to your family's table.
        </p>
      </section>

      {/* Mission & Vision Section */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative h-96 w-full rounded-lg overflow-hidden">
          <ManagedImage
            src="https://images.unsplash.com/photo-1596726137604-8a7605f24853?q=80&w=1974&auto=format&fit=crop"
            alt="A farmer with a cow"
            fill
            className="object-cover"
            data-ai-hint="farmer cow"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-headline font-bold">Our Mission</h2>
          <p className="text-muted-foreground">
            To produce and deliver the purest, most nutritious dairy products possible, using practices that honor the earth, our cows, and our community. We believe in the principle of 'Ahimsa' - non-violence - which extends to our soil, our animals, and our customers.
          </p>
          <div className="flex items-center gap-4">
            <Leaf className="h-8 w-8 text-primary" />
            <p><strong>Ethical & Sustainable:</strong> Caring for our cows and our land.</p>
          </div>
          <div className="flex items-center gap-4">
            <Heart className="h-8 w-8 text-primary" />
            <p><strong>A2 Goodness:</strong> Pure milk from traditional Indian cow breeds.</p>
          </div>
          <div className="flex items-center gap-4">
            <Users className="h-8 w-8 text-primary" />
            <p><strong>Community Focused:</strong> Connecting you directly to the source of your food.</p>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="bg-primary/5 rounded-2xl p-8 md:p-12">
        <h2 className="text-3xl font-headline font-bold text-center mb-8">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-headline font-semibold">Purity</h3>
            <p className="mt-2 text-muted-foreground">No hormones, no antibiotics, no compromises. Just pure, natural goodness.</p>
          </div>
          <div>
            <h3 className="text-xl font-headline font-semibold">Transparency</h3>
            <p className="mt-2 text-muted-foreground">Know our farms, know your food. We believe in complete transparency from farm to table.</p>
          </div>
          <div>
            <h3 className="text-xl font-headline font-semibold">Respect</h3>
            <p className="mt-2 text-muted-foreground">For the land, for our animals, and for your health. It's at the heart of everything we do.</p>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section>
        <h2 className="text-3xl font-headline font-bold text-center mb-8">Meet the Founders</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          {teamMembers.map(member => (
            <Card key={member.name} className="text-center w-full max-w-sm">
              <CardContent className="p-6">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <ManagedImage src={member.avatar} alt={member.name} className="aspect-square h-full w-full" width={96} height={96} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-headline font-semibold">{member.name}</h3>
                <p className="text-primary">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
