import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Videos from "./pages/Videos";
import About from "./pages/About";
import Audio from "./pages/Audio";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import AddSong from "./pages/AddSong";
import UpdateSong from "./pages/UpdateSong";
import DeleteSong from "./pages/DeleteSong";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Albums from "./pages/Albums";
import Purchases from "./pages/Purchases";
import TermsOfService from "@/pages/TermsCondition";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import ScrollToTop from "@/components/ScrollToTop";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
// import Copyright from "./pages/Copyright";
import Community from "./pages/Community";
import Licensing from "./pages/Licensing";
import Feedback from "./pages/Feedback";
import ReportIssue from "./pages/ReportIssue";



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/about" element={<About />} />
          <Route path="/audio" element={<Audio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />


          {/* User Authentication & Albums */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/purchases" element={<Purchases />} />

          {/* Admin */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/add-song" element={<AddSong />} />
          <Route path="/admin/update-song" element={<UpdateSong />} />
          <Route path="/admin/delete-song" element={<DeleteSong />} />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
          {/* Footer Route */}
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
           {/* <Route path="/copyright" element={<Copyright />} /> */}
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
