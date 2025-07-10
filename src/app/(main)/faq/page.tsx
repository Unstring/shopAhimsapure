import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQPage() {
  const faqs = [
    {
      question: "What does 'organic' mean for AhimsaPure?",
      answer: "For us, organic means growing food in a way that respects nature. We don't use any synthetic pesticides, fertilizers, or genetically modified organisms (GMOs). Our farming practices focus on building healthy soil, conserving water, and promoting biodiversity.",
    },
    {
      question: "Where do you source your products from?",
      answer: "All our products are sourced directly from our own network of partner farms located in the countryside around Bengaluru. We work closely with farmers who share our commitment to sustainable and ethical agriculture.",
    },
    {
      question: "What is A2 milk and why is it special?",
      answer: "A2 milk comes from traditional Indian breeds of cows that naturally produce milk containing only the A2 beta-casein protein. Many people find A2 milk easier to digest than regular A1 milk. Our cows are grass-fed and treated with care, ensuring the milk is both nutritious and ethically produced.",
    },
    {
      question: "How do you ensure the freshness of your products?",
      answer: "We have a very short farm-to-table cycle. Produce is harvested based on orders, minimally processed, and packed with care. Our efficient delivery system ensures that you receive your groceries at their peak freshness, often within 24 hours of harvest.",
    },
    {
      question: "What is your delivery area?",
      answer: "Currently, we deliver across all major areas in Bengaluru. We are constantly expanding our reach, so please enter your pin code at checkout to see if we deliver to your location.",
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is confirmed, you will receive an email with a tracking link. You can also visit the 'Track Order' page on our website and enter your order ID to see the latest status of your delivery.",
    },
    {
      question: "What is your return policy?",
      answer: "We stand by the quality of our products. If you are not satisfied with any item you receive, please contact our customer support within 24 hours of delivery. We will be happy to offer a replacement or a refund.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-headline font-bold">Frequently Asked Questions</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Have questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger className="text-left text-lg hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
