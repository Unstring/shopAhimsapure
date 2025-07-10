"use client";

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Gift } from 'lucide-react';

export function PhoneNumberPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const popupDismissed = localStorage.getItem('phoneNumberPopupDismissed');
    // Assuming no auth state for now, this will trigger for all new visitors.
    // In a real app, you'd also check for user authentication status.
    if (popupDismissed !== 'true') {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000); // Open after 3 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('phoneNumberPopupDismissed', 'true');
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = (e.target as HTMLFormElement).phone.value;
    console.log("Phone number submitted:", phone);
    toast({
        title: "Thanks for subscribing!",
        description: "We've sent a special discount code to your number.",
    });
    handleClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-center items-center">
            <div className="bg-primary/10 rounded-full p-3 w-fit mb-2">
                <Gift className="h-8 w-8 text-primary" />
            </div>
          <DialogTitle className="font-headline text-2xl">Get Exclusive Offers!</DialogTitle>
          <DialogDescription>
            Join our SMS list to get 15% off your next order and be the first to know about new products.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              className="col-span-4"
              required
            />
          </div>
          <Button type="submit">Get My Discount</Button>
           <Button type="button" variant="link" size="sm" onClick={handleClose} className="text-muted-foreground">
                No, thanks
            </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
