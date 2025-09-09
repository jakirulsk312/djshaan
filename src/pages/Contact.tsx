import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORM_API_KEY,
          subject: formData.subject,
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message
        })

      });

      const data = await res.json();

      if (data.success) {
        setSuccess("Your message has been sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

const contactInfo = [
  { 
    icon: Mail, 
    title: "Email", 
    detail: "vdjshaanofficial@gmal.com", 
    color: "text-primary" 
  },
{ 
    icon: Phone, 
    title: "Name | Phone", 
    detail: <>Mohammmed Nabi Mansoor - VDJ store digital media<br />+91 8777014993</>, 
    color: "text-secondary" 
  },
  { 
    icon: MapPin, 
    title: "Address", 
    detail: "KIRIT CHS A6, Ramachandra Lane-Extn, Near Movie Time, Malad West, Mumbai - 400064", 
    color: "text-accent" 
  }
];


  return (
    <div className="flex flex-col min-h-screen">
      {/* Background + Overlay */}
      <div className="relative flex-1">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('/background.jpg')" }}
        />
        <div className="absolute inset-0 bg-[hsl(230_20%_8%_/_0.85)]"></div>

        {/* Main Content */}
        <div className="relative z-10">
          <Header />
          <main className="pt-36 pb-16">
            <div className="container mx-auto px-4">
              {/* Page Header */}
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="text-foreground">Get In</span>{" "}
                  <span className="text-neon animate-glow">Touch</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Have a question, suggestion, or want to collaborate? We'd love to hear from you!
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
                {/* Contact Form */}
                <Card className="bg-card/30 backdrop-blur-sm border-primary/20 transform transition-all duration-500 hover:scale-105 animate-float">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-3 mb-8">
                      <MessageCircle className="h-8 w-8 text-primary glow" />
                      <h2 className="text-2xl font-bold text-foreground">Send us a message</h2>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Name *</label>
                          <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your full name"
                            className="bg-input border-border focus:border-primary transition-colors duration-300"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your.email@example.com"
                            className="bg-input border-border focus:border-primary transition-colors duration-300"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Subject *</label>
                        <Input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="What's this about?"
                          className="bg-input border-border focus:border-primary transition-colors duration-300"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Message *</label>
                        <Textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell us more about your inquiry..."
                          rows={6}
                          className="bg-input border-border focus:border-primary transition-colors duration-300 resize-none"
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        size="lg"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 animate-pulse-glow"
                      >
                        {loading ? "Sending..." : (
                          <>
                            <Send className="mr-2 h-5 w-5" />
                            Send Message
                          </>
                        )}
                      </Button>

                      {/* Success / Error messages */}
                      {success && <p className="text-green-500 text-center">{success}</p>}
                      {error && <p className="text-red-500 text-center">{error}</p>}
                    </form>
                  </CardContent>
                </Card>

                {/* Contact Info & Quick Links */}
                <div className="space-y-8">
                  <Card className="bg-card/30 backdrop-blur-sm border-primary/20 transform transition-all duration-500 hover:scale-105 animate-float">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold text-foreground mb-8">Contact Information</h2>
                      <div className="space-y-6">
                        {contactInfo.map((info, index) => {
                          const Icon = info.icon;
                          return (
                            <div
                              key={index}
                              className="flex items-start space-x-4 animate-float"
                              style={{ animationDelay: `${index * 0.2}s` }}
                            >
                              <div
                                className={`w-12 h-12 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center ${info.color} glow`}
                              >
                                <Icon className="h-6 w-6" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                                <p className="text-muted-foreground">{info.detail}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Response Time Notice */}
              <div className="text-center mt-16">
                <Card className="max-w-2xl mx-auto bg-muted/20 border-border transform transition-all duration-500 hover:scale-105 animate-float">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground">
                      <strong className="text-foreground">Response Time:</strong> We typically respond to all inquiries within 24-48 hours.
                      For urgent matters, please mention "URGENT" in your subject line.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-background text-foreground">
        <Footer />
      </footer>
    </div>
  );
};

export default Contact;
