import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const FAQSection = () => {
  const faqs = [
    {
      question: "What kind of tracks does VDJ Shaan drop?",
      answer: "VDJ Shaan spins high-energy mashups across multiple languages—Bengali, Hindi, English, and Bhojpuri. Each track is crafted to make you dance while blending classic melodies with modern beats."
    },
    {
      question: "How often do you release new mixes?",
      answer: "Fresh vibes every week! Subscribe to catch the latest mashups and exclusive edits before anyone else."
    },
    {
      question: "Can I request a track to be mashed up?",
      answer: "Absolutely! Hit us up through the contact page with your song ideas and your request might just appear in the next mix."
    },
    {
      question: "Are your tracks available for download?",
      answer: "Right now, you can stream all tracks on YouTube. We’re cooking up options on other platforms too—stay tuned for updates!"
    },
    {
      question: "Do you collaborate with other DJs or artists?",
      answer: "Yes! VDJ Shaan loves collabs. If you’re a DJ, producer, or artist, drop a message through the contact page and let’s make magic together."
    },
    {
      question: "What makes VDJ Shaan’s mashups stand out?",
      answer: "It’s all about the vibe. Smoothly blending multiple genres, languages, and styles, every mashup keeps the energy high and respects the original tracks while adding a signature spin."
    }
  ];

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Frequently Asked</span>{" "}
            <span className="text-neon animate-glow">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Got questions? We've got answers! Find everything you need to know about VDJ Shaan.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card/30 backdrop-blur-sm border border-primary/20 rounded-lg px-6 hover:border-primary/50 transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-lg font-medium text-foreground hover:text-primary transition-colors duration-300 py-6">
                  {faq.question}
                </AccordionTrigger>

                {/* Animated content */}
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                  >
                    {faq.answer}
                  </motion.div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-8 border border-primary/30">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Still have questions?
            </h3>
            <p className="text-muted-foreground mb-6">
              Can't find the answer you're looking for? Reach out or join the party!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-300 glow">
                Hit Me Up
              </button>
              <button className="px-8 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors duration-300">
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
