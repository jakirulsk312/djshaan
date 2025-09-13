import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Videos from "./pages/HeaderPages/Videos";
import About from "./pages/HeaderPages/About";
import Contact from "./pages/HeaderPages/Contact";
import Admin from "./pages/Login/Admin";
import NotFound from "./pages/NotFound";
// import UpdateSong from "./pages/AdminDashboard/UpdateSong";
import Dashboard from "./pages/AdminDashboard/Dashboard";
// import Login from "./pages/Login/Login";
// import Register from "./pages/Login/Register";
import Albums from "./pages/HeaderPages/Albums";
import TermsOfService from "@/pages/FooterPages/TermsCondition";
import PrivacyPolicy from "@/pages/FooterPages/PrivacyPolicy";
import ScrollToTop from "@/components/ScrollToTop";
import Events from "./pages/HeaderPages/Events";
import Gallery from "./pages/HeaderPages/Gallery";
import Community from "./pages/FooterPages/Community";
import Licensing from "./pages/FooterPages/Licensing";
import Feedback from "./pages/FooterPages/Feedback";
import ReportIssue from "./pages/FooterPages/ReportIssue";
import Checkout from "./pages/Payment/Checkout";
import PaymentSuccess from "./pages/Payment/PaymentSuccess";
import PaymentFailure from "./pages/Payment/PaymentFailure";
import ProtectedRoute from "./components/ProtectedRoute";



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<Index />} />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />

          {/* Header Routes */}
          <Route path="/videos" element={<Videos />} />
          <Route path="/about" element={<About />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />

          {/* Payment */}
          <Route path="/checkout/:albumId" element={<Checkout />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failure" element={<PaymentFailure />} />

          {/* User Authentication & Albums */}
          {/* <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> */}


          {/* Admin */}
          <Route path="/admin" element={<Admin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* <Route path="/admin/update-song" element={<UpdateSong />} /> */}


          {/* Footer Route */}
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/community" element={<Community />} />
          <Route path="/licensing" element={<Licensing />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/reportissue" element={<ReportIssue />} />

        </Routes>

      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
