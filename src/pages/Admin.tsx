import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, User, Shield } from "lucide-react";
import api from "@/lib/api";

const Admin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  // Clear token on page refresh
  useEffect(() => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/admin/login", {
        email: credentials.email,
        password: credentials.password,
      });

      if (res.data.success && res.data.token) {
        localStorage.setItem("token", res.data.token);
        setIsLoggedIn(true);
        setError("");
        navigate("/admin/dashboard");
      } else {
        setError(res.data.message || "Invalid credentials");
        setCredentials({ email: "", password: "" });
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/admin");
  };

  // If logged in, show dashboard
  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  <span className="text-neon">Admin</span>{" "}
                  <span className="text-foreground">Dashboard</span>
                </h1>
                <p className="text-muted-foreground mt-2">
                  Welcome back! Manage your music content here.
                </p>
              </div>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-destructive text-destructive hover:bg-destructive/10"
              >
                Logout
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Otherwise show login form
  return (
    <div className="flex flex-col min-h-screen">
      {/* Background Image + Overlay */}
      <div className="relative flex-1">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('/background.jpeg')" }}
        ></div>
        <div className="absolute inset-0 bg-[hsl(230_20%_8%_/_0.85)]"></div>

        {/* Content */}
        <div className="relative z-10">
          <Header />
          <main className="pt-36 pb-16 flex items-center justify-center">
            <Card className="max-w-md w-full bg-card/30 backdrop-blur-sm border-primary/20 animate-float transform transition-all duration-500 hover:scale-105">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Shield className="h-10 w-10 text-primary" />
                  </div>
                  <h1 className="text-3xl font-bold mb-2">
                    <span className="text-neon">Admin</span>{" "}
                    <span className="text-foreground">Login</span>
                  </h1>
                  <p className="text-muted-foreground">Secure access to admin panel</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                  {error && (
                    <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                      <p className="text-destructive text-sm font-medium">{error}</p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full flex justify-center items-center"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary mr-2"></div>
                    ) : (
                      <Shield className="mr-2 h-5 w-5" />
                    )}
                    {loading ? "Logging in..." : "Login to Admin Panel"}
                  </Button>
                </form>
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

export default Admin;
