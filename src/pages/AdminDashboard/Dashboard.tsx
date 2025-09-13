
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  Edit,
  Trash2,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { motion } from "framer-motion";
// import AddSong from "./AddSong";
import UpdateSong from "./UpdateSong";
// import DeleteSong from "./DeleteSong";
import ManageAlbums from "./AlbumManagement"; 
import EventsManagement from "./EventsManagement";
import GalleryManagement from "./GalleryManagement";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(""); // 🔹 default blank
  const navigate = useNavigate();

  const tabs = [
    { key: "update", label: "Update Song", icon: <Edit className="h-5 w-5 mr-2" /> },
    { key: "managealbums", label: "Manage Albums", icon: <PlusCircle className="h-5 w-5 mr-2" /> },    
    { key: "eventsmanagement", label: "Events Management", icon: <Edit className="h-5 w-5 mr-2" /> },
    { key: "gallerymanagement", label: "Gallery Management", icon: <Edit className="h-5 w-5 mr-2" /> },
    // { key: "addSong", label: "Add Song", icon: <PlusCircle className="h-5 w-5 mr-2" /> },
    // { key: "delete", label: "Delete Song", icon: <Trash2 className="h-5 w-5 mr-2" /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-36 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                <span className="text-neon">Admin</span>{" "}
                <span className="text-foreground">Dashboard</span>
              </h1>
              <p className="text-muted-foreground">
                Manage all your songs and albums here — add, update, delete, or view.
              </p>
            </div>
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="flex items-center"
            >
              <LogOut className="h-5 w-5 mr-2" /> Logout
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-4 mb-10">
            {tabs.map((tab) => (
              <Button
                key={tab.key}
                variant={activeTab === tab.key ? "default" : "outline"}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center ${
                  activeTab === tab.key
                    ? "bg-primary text-primary-foreground"
                    : "border-primary/30 text-foreground hover:bg-primary/10"
                }`}
              >
                {tab.icon}
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Panel */}
          <Card className="bg-card/40 backdrop-blur-sm border-primary/20 shadow-lg">
            <CardContent className="p-6">
              {activeTab === "" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center py-24 text-center rounded-xl bg-gradient-to-br from-primary/5 via-background to-secondary/10"
                >
                  <LayoutDashboard className="h-14 w-14 mb-4 text-primary" />
                  <h2 className="text-2xl font-semibold mb-2 text-foreground">
                    Welcome to your Admin Dashboard
                  </h2>
                  <p className="text-muted-foreground">
                    Select a tab above to get started.
                  </p>
                </motion.div>
              )}

            
               {activeTab === "update" && <UpdateSong />}            
              {activeTab === "managealbums" && <ManageAlbums />}
              {activeTab === "eventsmanagement" && <EventsManagement />}
              {activeTab === "gallerymanagement" && <GalleryManagement />}


            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
