import { PenTool } from 'lucide-react';

export default function ComingSoonPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="p-6 bg-primary/10 rounded-full mb-6">
            <PenTool className="h-12 w-12 text-primary" />
        </div>
      <h1 className="text-4xl font-headline font-bold text-foreground">Our Blog is Coming Soon!</h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">
        We're busy cultivating fresh ideas and stories from the farm. Soon, you'll find delicious recipes, farming insights, and wellness tips right here. Stay tuned!
      </p>
    </div>
  );
}
