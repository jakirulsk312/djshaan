import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const FAQSection = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "What kind of tracks does VDJ Shaan drop?",
      answer:
        "High-energy Bolly Fusion and Afro House sounds inspired by India and Mirage signature style crafted to blend classic melodies with modern global beats.",
    },
    {
      question: "How often do you release new mixes?",
      answer: "Fresh vibes every week! Subscribe to catch the latest mashups.",
    },
    {
      question: "Can I request a track?",
      answer:
        "Absolutely! Send requests via the contact page and it might be in the next mix.",
    },
    {
      question: "Are tracks available for download?",
      answer:
        "Right now only on YouTube. More platforms coming soon—stay tuned!",
    },
    {
      question: "Do you collaborate with other DJs or artists?",
      answer:
        "Yes! If you’re a DJ, producer, or artist, drop a message and let’s collab.",
    },
    {
      question: "What makes VDJ Shaan’s mashups stand out?",
      answer:
        "Blending genres, languages, and styles while keeping energy high and adding a signature spin.",
    },
  ];

  return (
    <section className="py-12 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background"></div>

      <div className="container mx-auto px-3 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-3xl font-bold mb-3">
            <span className="text-foreground">Frequently Asked</span>{" "}
            <span className="text-neon animate-glow">Questions</span>
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Got questions? Find everything you need about VDJ Shaan.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card/30 backdrop-blur-sm border border-primary/20 rounded-md px-4 hover:border-primary/50 transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-base font-medium text-foreground hover:text-primary transition-colors duration-300 py-3">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-3">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {faq.answer}
                  </motion.div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-8">
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-md p-4 border border-primary/30 max-w-md mx-auto">
            <h3 className="text-base font-semibold mb-1 text-foreground">
              Still have questions?
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              Can’t find the answer? Reach out or join the party!
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <button
                onClick={() => navigate("/contact")}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors duration-300 glow text-xs"
              >
                Hit Me Up
              </button>
              <button
                onClick={() => navigate("/events")}
                className="px-4 py-2 border border-primary text-primary rounded-md font-medium hover:bg-primary/10 transition-colors duration-300 text-xs"
              >
                Join the Party
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
