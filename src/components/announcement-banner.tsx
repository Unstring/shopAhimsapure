import { Megaphone } from 'lucide-react';

export function AnnouncementBanner() {
  return (
    <div className="bg-accent text-accent-foreground py-2 text-center text-sm font-medium">
      <div className="container mx-auto flex items-center justify-center gap-2">
        <Megaphone className="h-4 w-4" />
        <span>Free delivery on all orders above ₹500!</span>
      </div>
    </div>
  );
}
