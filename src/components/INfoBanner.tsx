"use client";

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Gift } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export function INfoBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const popupDismissed = localStorage.getItem('whatsappphoneNumberPopupDismissed');
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
    localStorage.setItem('whatsappphoneNumberPopupDismissed', 'true');
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

  const Whref = "https://wa.me/919026557723";
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-center items-center">
            <div className="bg-primary/10 rounded-full p-3 w-fit mb-2">
                <FaWhatsapp className="h-8 w-8 text-primary" />
            </div>
          <DialogTitle className="font-headline text-2xl">Notice!</DialogTitle>
          <DialogDescription>
            We are not currently accepting orders on our website.
            Please place you orders through our WhatsApp.
          </DialogDescription>
        </DialogHeader>
          <Button type="submit" className='items-center text-center'>
            <a
              href={Whref}
              target={Whref.startsWith('http') ? '_blank' : undefined}
              rel={Whref.startsWith('http') ? 'noopener noreferrer' : undefined}
              style={{ animationDelay: `${60}ms` }}
              className='text-center'
            >
              Whatsapp Support
            </a>
          </Button>
           {/* <Button type="button" variant="link" size="sm" onClick={handleClose} className="text-muted-foreground">
                No, thanks
            </Button> */}
      </DialogContent>
    </Dialog>
  );
}
