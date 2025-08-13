"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit: SubmitHandler<ContactFormValues> = (data) => {
    console.log("Contact form submitted:", data);
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We will get back to you shortly.",
    });
    form.reset();
  };

  return (
    <div className="space-y-12">
        <div className="text-center">
            <h1 className="text-5xl font-headline font-bold">Get in Touch</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                We'd love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="you@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="subject"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Subject</FormLabel>
                                        <FormControl>
                                            <Input placeholder="What can we help with?" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Message</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Your message..." {...field} rows={5} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" size="lg" className="w-full">Send Message</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <div className="space-y-8">
                <Card className="bg-primary/5">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-lg">
                        <div className="flex items-center gap-4">
                            <MapPin className="h-6 w-6 text-primary min-w-[25px]" />
                            <span>Survey No- 94/3, Koralur Village, Kasaba Hubli
Post, Hoskote Taluq, Bengaluru, Karnataka-
560067, Bangalore Urban, Karnataka-560067</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Mail className="h-6 w-6 text-primary min-w-[25px]" />
                            <a href="mailto:contact@ahimsapure.com" className="hover:underline">contact@ahimsapure.com</a>
                        </div>
                        <div className="flex items-center gap-4">
                            <Phone className="h-6 w-6 text-primary min-w-[25px]" />
                            <a href="tel:+919876543210" className="hover:underline">+ 91 9260557723</a>
                        </div>
                    </CardContent>
                </Card>
                <div>
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124416.74944114757!2d77.49449892578553!3d12.95304659755455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1721832262973!5m2!1sen!2sin" 
                    width="100%" 
                    height="300" 
                    style={{border:0}} 
                    allowFullScreen={false} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                  ></iframe>
                </div>
            </div>
        </div>
    </div>
  );
}
