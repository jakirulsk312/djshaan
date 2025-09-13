
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { loginUser } from "@/lib/api";
// import { useToast } from "@/hooks/use-toast";
// import { Link, useNavigate } from "react-router-dom";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { User, Lock, Shield } from "lucide-react";

// const Login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await loginUser(formData);
//       if (response.success) {
//         sessionStorage.setItem("token", response.data.token);
//         sessionStorage.setItem("user", JSON.stringify(response.data.user));

//         toast({ title: "Success", description: "Login successful!" });
//         navigate("/albums");
//       }
//     } catch (error) {
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: error.response?.data?.message || "Login failed",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Background + overlay */}
//       <div className="relative flex-1">
//         <div
//           className="absolute inset-0 bg-cover bg-center bg-fixed"
//           style={{ backgroundImage: "url('/background.jpeg')" }}
//         />
//         <div className="absolute inset-0 bg-[hsl(230_20%_8%_/_0.85)]" />

//         {/* Content */}
//         <div className="relative z-10">
//           <Header />
//           <main className="pt-36 pb-16 flex items-center justify-center">
//             <Card className="max-w-md w-full bg-card/30 backdrop-blur-sm border-primary/20 animate-float transform transition-all duration-500 hover:scale-105">
//               <CardContent className="p-8">
//                 {/* Logo + Heading */}
//                 <div className="text-center mb-8">
//                   <div className="w-20 h-20 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
//                     <Shield className="h-10 w-10 text-primary" />
//                   </div>
//                   <h1 className="text-3xl font-bold mb-2">
//                     <span className="text-neon">User</span>{" "}
//                     <span className="text-foreground">Login</span>
//                   </h1>
//                   <p className="text-muted-foreground">Enter your credentials to access your account</p>
//                 </div>

//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   <div>
//                     <label className="block text-sm font-medium text-foreground mb-2">Email</label>
//                     <div className="relative">
//                       <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
//                       <Input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         placeholder="Enter your email"
//                         className="pl-10"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-foreground mb-2">Password</label>
//                     <div className="relative">
//                       <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
//                       <Input
//                         type="password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         placeholder="Enter your password"
//                         className="pl-10"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <Button type="submit" size="lg" className="w-full flex justify-center items-center">
//                     {loading ? (
//                       <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary mr-2"></div>
//                     ) : (
//                       <Shield className="mr-2 h-5 w-5" />
//                     )}
//                     {loading ? "Logging in..." : "Login"}
//                   </Button>
//                 </form>

//                 <div className="mt-4 text-center text-sm">
//                   Don't have an account?{" "}
//                   <Link to="/register" className="text-primary hover:underline">
//                     Register here
//                   </Link>
//                 </div>
//               </CardContent>
//             </Card>
//           </main>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="relative z-10 bg-background text-foreground">
//         <Footer />
//       </footer>
//     </div>
//   );
// };

// export default Login;
