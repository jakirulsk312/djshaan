
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "@/lib/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Music, Download, CheckCircle } from "lucide-react";

type Album = {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
};

export default function Checkout() {
  const { albumId } = useParams();
  const [album, setAlbum] = useState<Album | null>(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<{
    message: string;
    downloadUrl: string;
  } | null>(null);

  useEffect(() => {
    if (albumId) {
      api.get(`/albums/${albumId}`).then((res) => setAlbum(res.data.data));
    }
  }, [albumId]);

  // Simple email validator
  const validateEmail = (value: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (!value) {
      setEmailError("Email is required");
    } else if (!validateEmail(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePay = async () => {
    console.log("Pay button clicked!");
    
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email before proceeding");
      return;
    }

    setLoading(true);
    console.log("About to make API call");
    
    try {
      const res = await api.post("/orders/create", { albumId, email });
      const payuData = res.data.data;
      console.log('PayU Data from backend:', payuData);

      // Store email and albumId for success page
      window.localStorage.setItem("checkout_email", email);
      window.localStorage.setItem("checkout_albumId", albumId || "");

      const form = document.createElement("form");
      form.method = "POST";
      form.action = import.meta.env.VITE_PAYU_BASE_URL;

      Object.keys(payuData).forEach((key) => {
        console.log(`${key}: ${payuData[key]}`);
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = payuData[key];
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Failed to start payment");
      setLoading(false);
    }
  };

  // Check for payment success when component loads
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("payment") === "success") {
      const storedEmail = window.localStorage.getItem("checkout_email");
      const storedAlbumId = window.localStorage.getItem("checkout_albumId");
      
      if (storedEmail && storedAlbumId) {
        api
          .get(`/download/${storedAlbumId}?email=${storedEmail}`)
          .then((res) => {
            setSuccessData(res.data);
            // Clear stored data after successful fetch
            window.localStorage.removeItem("checkout_email");
            window.localStorage.removeItem("checkout_albumId");
          })
          .catch(() => {
            setSuccessData({ 
              message: "Payment successful!", 
              downloadUrl: "" 
            });
          });
      }
    }
  }, []);

  const handleDownload = () => {
    if (successData?.downloadUrl) {
      window.open(successData.downloadUrl, '_blank');
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
          <main className="pt-36 pb-16 flex items-center justify-center px-4">
            {successData ? (
              // Success State
              <Card className="max-w-lg w-full bg-card/30 backdrop-blur-sm border-primary/20 animate-float">
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-green-500 mb-2">
                      {successData.message}
                    </h2>
                  </div>
                  
                  {successData.downloadUrl ? (
                    <div className="space-y-4">
                      <Button 
                        onClick={handleDownload}
                        size="lg" 
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        <Download className="mr-2 h-5 w-5" />
                        Download Album
                      </Button>
                      <p className="text-sm text-muted-foreground">
                        Your download will start automatically
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Check your email for the download link.
                      </p>
                      <Button 
                        onClick={() => window.location.href = '/'}
                        variant="outline"
                        size="lg"
                        className="w-full"
                      >
                        Back to Home
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : album ? (
              // Checkout State
              <Card className="max-w-lg w-full bg-card/30 backdrop-blur-sm border-primary/20 animate-float">
                <CardContent className="p-0">
                  <img
                    src={album.image}
                    alt={album.title}
                    className="w-full h-56 object-cover rounded-t-2xl"
                  />
                  <div className="p-8">
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      {album.title}
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      {album.description}
                    </p>
                    <p className="text-lg font-semibold text-foreground mb-6">
                      Price: ₹{album.price}
                    </p>

                    <label className="block text-sm font-medium text-foreground mb-2">
                      Your Email
                    </label>
                    <div className="relative mb-2">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleEmailChange}
                        className="pl-10"
                        required
                      />
                    </div>
                    {emailError && (
                      <p className="text-sm text-destructive mb-4">
                        {emailError}
                      </p>
                    )}

                    <Button
                      onClick={handlePay}
                      size="lg"
                      className="w-full flex justify-center items-center"
                      disabled={!email || !!emailError || loading}
                    >
                      <Music className="mr-2 h-5 w-5" />
                      {loading ? "Processing..." : "Pay Now"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              // Loading State
              <Card className="max-w-lg w-full bg-card/30 backdrop-blur-sm border-primary/20">
                <CardContent className="p-8 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading album...</p>
                </CardContent>
              </Card>
            )}
          </main>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-card p-6 rounded-lg text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-foreground">Processing Payment...</p>
            <p className="text-sm text-muted-foreground">Please wait while we redirect you to PayU</p>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 bg-background text-foreground">
        <Footer />
      </footer>
    </div>
  );
}


























// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "@/lib/api";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Mail, Music, Download, CheckCircle } from "lucide-react";

// type Album = {
//   _id: string;
//   title: string;
//   description: string;
//   price: number;
//   image: string;
// };

// export default function Checkout() {
//   const { albumId } = useParams<{ albumId: string }>();
//   const navigate = useNavigate();
//   const [album, setAlbum] = useState<Album | null>(null);
//   const [email, setEmail] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [successData, setSuccessData] = useState<{ message: string; downloadUrl: string } | null>(null);

//   // Fetch album details
//   useEffect(() => {
//     if (!albumId) return; // Prevent undefined requests
//     api.get(`/albums/${albumId}`)
//       .then(res => setAlbum(res.data.data))
//       .catch(err => console.error("Failed to fetch album:", err));
//   }, [albumId]);

//   // Email validation
//   const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setEmail(value);
//     setEmailError(!value ? "Email is required" : !validateEmail(value) ? "Enter a valid email" : "");
//   };

//   // Handle payment
//   const handlePay = async () => {
//     if (!albumId) return alert("Album ID is missing");
//     if (!validateEmail(email)) return setEmailError("Enter a valid email");

//     setLoading(true);
//     try {
//       const res = await api.post("/orders/create", { albumId, email });
//       const payuData = res.data.data;

//       // Store for success page
//       localStorage.setItem("checkout_email", email);
//       localStorage.setItem("checkout_albumId", albumId);

//       // Redirect to PayU
//       const form = document.createElement("form");
//       form.method = "POST";
//       form.action = import.meta.env.VITE_PAYU_BASE_URL;

//       Object.keys(payuData).forEach(key => {
//         const input = document.createElement("input");
//         input.type = "hidden";
//         input.name = key;
//         input.value = payuData[key];
//         form.appendChild(input);
//       });

//       document.body.appendChild(form);
//       form.submit();
//     } catch (err) {
//       console.error("Payment error:", err);
//       alert("Failed to start payment");
//       setLoading(false);
//     }
//   };

//   // Check payment success
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     if (params.get("payment") === "success") {
//       const storedEmail = localStorage.getItem("checkout_email");
//       const storedAlbumId = localStorage.getItem("checkout_albumId");
//       if (storedEmail && storedAlbumId) {
//         api.get(`/download/${storedAlbumId}?email=${storedEmail}`)
//           .then(res => {
//             setSuccessData(res.data);
//             localStorage.removeItem("checkout_email");
//             localStorage.removeItem("checkout_albumId");
//           })
//           .catch(() => setSuccessData({ message: "Payment successful!", downloadUrl: "" }));
//       }
//     }
//   }, []);

//   const handleDownload = () => {
//     if (successData?.downloadUrl) window.open(successData.downloadUrl, "_blank");
//   };

//   if (!albumId) return <p className="text-center mt-10 text-red-500">Album not found.</p>;

//   return (
//     <div className="flex flex-col min-h-screen">
//       <div className="relative flex-1">
//         <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/background.jpeg')" }} />
//         <div className="absolute inset-0 bg-[hsl(230_20%_8%_/_0.85)]" />

//         <div className="relative z-10">
//           <Header />
//           <main className="pt-36 pb-16 flex items-center justify-center px-4">
//             {successData ? (
//               <Card className="max-w-lg w-full bg-card/30 backdrop-blur-sm border-primary/20 animate-float">
//                 <CardContent className="p-8 text-center">
//                   <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
//                   <h2 className="text-2xl font-bold text-green-500 mb-2">{successData.message}</h2>
//                   {successData.downloadUrl ? (
//                     <Button onClick={handleDownload} className="w-full bg-green-600 hover:bg-green-700 mt-4">Download Album</Button>
//                   ) : (
//                     <Button onClick={() => navigate("/")} variant="outline" className="w-full mt-4">Back to Home</Button>
//                   )}
//                 </CardContent>
//               </Card>
//             ) : album ? (
//               <Card className="max-w-lg w-full bg-card/30 backdrop-blur-sm border-primary/20 animate-float">
//                 <CardContent className="p-0">
//                   <img src={album.image} alt={album.title} className="w-full h-56 object-cover rounded-t-2xl" />
//                   <div className="p-8">
//                     <h2 className="text-2xl font-bold text-foreground mb-2">{album.title}</h2>
//                     <p className="text-muted-foreground mb-4">{album.description}</p>
//                     <p className="text-lg font-semibold text-foreground mb-6">Price: ₹{album.price}</p>

//                     <label className="block text-sm font-medium text-foreground mb-2">Your Email</label>
//                     <Input type="email" placeholder="Enter your email" value={email} onChange={handleEmailChange} required className="mb-2" />
//                     {emailError && <p className="text-sm text-destructive mb-4">{emailError}</p>}

//                     <Button onClick={handlePay} disabled={!email || !!emailError || loading} className="w-full">
//                       {loading ? "Processing..." : "Pay Now"}
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             ) : (
//               <p className="text-center text-muted-foreground">Loading album...</p>
//             )}
//           </main>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }
