import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await registerUser(formData);
      if (response.success) {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("user", JSON.stringify(response.data.user));

        toast({ title: "Success", description: "Registration successful! Welcome!" });
        navigate("/albums");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || "Registration failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Background + overlay */}
      <div className="relative flex-1">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('/background.jpeg')" }}
        />
        <div className="absolute inset-0 bg-[hsl(230_20%_8%_/_0.85)]" />

        {/* Content */}
        <div className="relative z-10">
          <Header />
          <main className="pt-36 pb-16 flex items-center justify-center">
            <Card className="w-full max-w-md bg-card/30 backdrop-blur-sm border-primary/20 animate-float transform transition-all duration-500 hover:scale-105">
              {/* Logo + Heading */}
              <div className="text-center mt-4 mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-10 w-10 text-primary" />
                </div>
                <h1 className="text-3xl font-bold mb-2">
                  <span className="text-neon">User</span>{" "}
                  <span className="text-foreground">Register</span>
                </h1>
                <p className="text-muted-foreground">Create an account to purchase albums</p>
              </div>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Choose a password (min 6 characters)"
                      value={formData.password}
                      onChange={handleChange}
                      minLength={6}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full flex justify-center items-center" disabled={loading}>
                    {loading ? "Creating account..." : "Register"}
                  </Button>
                </form>

                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline">
                    Login here
                  </Link>
                </div>
              </CardContent>
            </Card>
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

export default Register;
