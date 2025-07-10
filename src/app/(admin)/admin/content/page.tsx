
"use client";

import { PageHeader } from "../_components/page-header";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useContent } from "../../_context/content-context";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Trash2, PlusCircle } from "lucide-react";

const faqSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
});

const whyChooseUsSchema = z.object({
  icon: z.string().min(1, "Icon name is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

const testimonialSchema = z.object({
  name: z.string().min(1, "Name is required"),
  location: z.string().min(1, "Location is required"),
  quote: z.string().min(1, "Quote is required"),
  avatar: z.string().url("Must be a valid URL"),
});

const contentSchema = z.object({
  faqs: z.array(faqSchema),
  whyChooseUsItems: z.array(whyChooseUsSchema),
  testimonials: z.array(testimonialSchema),
});

type ContentFormValues = z.infer<typeof contentSchema>;

export default function ContentPage() {
  const { content, updateContent } = useContent();

  const form = useForm<ContentFormValues>({
    resolver: zodResolver(contentSchema),
    defaultValues: content,
  });

  const { fields: faqFields, append: appendFaq, remove: removeFaq } = useFieldArray({
    control: form.control,
    name: "faqs",
  });

  const { fields: whyChooseUsFields, append: appendWhy, remove: removeWhy } = useFieldArray({
    control: form.control,
    name: "whyChooseUsItems",
  });
  
  const { fields: testimonialFields, append: appendTestimonial, remove: removeTestimonial } = useFieldArray({
    control: form.control,
    name: "testimonials",
  });

  const onSubmit = (data: ContentFormValues) => {
    updateContent(data);
  };

  return (
    <>
      <PageHeader>Website Content Management</PageHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          <Card>
            <CardHeader>
              <CardTitle>Why Choose Us Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {whyChooseUsFields.map((field, index) => (
                <div key={field.id} className="p-4 border rounded-md space-y-2 relative">
                  <FormField name={`whyChooseUsItems.${index}.title`} render={({field}) => <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage/></FormItem>} />
                  <FormField name={`whyChooseUsItems.${index}.description`} render={({field}) => <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage/></FormItem>} />
                  <FormField name={`whyChooseUsItems.${index}.icon`} render={({field}) => <FormItem><FormLabel>Icon Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage/></FormItem>} />
                  <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeWhy(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
              ))}
               <Button type="button" variant="outline" size="sm" onClick={() => appendWhy({ title: "", description: "", icon: "" })}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Item
                </Button>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle>Testimonials Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {testimonialFields.map((field, index) => (
                <div key={field.id} className="p-4 border rounded-md space-y-2 relative">
                  <FormField name={`testimonials.${index}.name`} render={({field}) => <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage/></FormItem>} />
                  <FormField name={`testimonials.${index}.location`} render={({field}) => <FormItem><FormLabel>Location</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage/></FormItem>} />
                   <FormField name={`testimonials.${index}.quote`} render={({field}) => <FormItem><FormLabel>Quote</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage/></FormItem>} />
                  <FormField name={`testimonials.${index}.avatar`} render={({field}) => <FormItem><FormLabel>Avatar URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage/></FormItem>} />
                  <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeTestimonial(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
              ))}
               <Button type="button" variant="outline" size="sm" onClick={() => appendTestimonial({ name: "", location: "", quote: "", avatar: "" })}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Testimonial
                </Button>
            </CardContent>
          </Card>


          <Card>
            <CardHeader>
              <CardTitle>FAQ Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {faqFields.map((field, index) => (
                <div key={field.id} className="p-4 border rounded-md space-y-2 relative">
                  <FormField name={`faqs.${index}.question`} render={({field}) => <FormItem><FormLabel>Question</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage/></FormItem>} />
                  <FormField name={`faqs.${index}.answer`} render={({field}) => <FormItem><FormLabel>Answer</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage/></FormItem>} />
                  <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeFaq(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
              ))}
               <Button type="button" variant="outline" size="sm" onClick={() => appendFaq({ question: "", answer: "" })}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add FAQ
                </Button>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit">Save Content Changes</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
