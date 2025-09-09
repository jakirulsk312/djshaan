// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { PlusCircle, Edit, Trash2, LogOut, Pencil, List } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import api from "@/lib/api";
// import AddSong from "./AddSong";
// import UpdateSong from "./UpdateSong";
// import DeleteSong from "./DeleteSong";
// import ManageAlbums from "./AlbumManagement"; // Combined Upload + Manage Albums

// type Song = { _id: string; title: string; lang: string; duration: string; link: string };

// const Dashboard = () => {
//   const [activeTab, setActiveTab] = useState(""); // 🔹 default blank
//   const [songs, setSongs] = useState<Song[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const songsPerPage = 10;
//   const navigate = useNavigate();

//   const tabs = [
//     { key: "songs", label: "All Songs", icon: <List className="h-5 w-5 mr-2" /> },
//     { key: "update", label: "Update Song", icon: <Edit className="h-5 w-5 mr-2" /> },
//     { key: "managealbums", label: "Manage Albums", icon: <PlusCircle className="h-5 w-5 mr-2" /> },
//     { key: "addSong", label: "Add Song", icon: <PlusCircle className="h-5 w-5 mr-2" /> },
//     { key: "delete", label: "Delete Song", icon: <Trash2 className="h-5 w-5 mr-2" /> },
//   ];

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/admin");
//   };

//   const fetchSongs = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/songs");
//       setSongs(res.data.data || []);
//     } catch {
//       setError("Failed to load songs.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (activeTab === "songs") fetchSongs();
//   }, [activeTab]);

//   const handleDelete = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this song?")) return;
//     try {
//       await api.delete(`/songs/${id}`);
//       setSongs((prev) => prev.filter((song) => song._id !== id));
//     } catch {
//       alert("Failed to delete song");
//     }
//   };

//   const filteredSongs = songs.filter(
//     (song) =>
//       song.title.toLowerCase().includes(search.toLowerCase()) ||
//       song.lang.toLowerCase().includes(search.toLowerCase())
//   );

//   const indexOfLastSong = currentPage * songsPerPage;
//   const indexOfFirstSong = indexOfLastSong - songsPerPage;
//   const currentSongs = filteredSongs.slice(indexOfFirstSong, indexOfLastSong);
//   const totalPages = Math.ceil(filteredSongs.length / songsPerPage);

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />

//       <main className="pt-20 pb-16">
//         <div className="container mx-auto px-4">
//           <div className="flex items-center justify-between mb-10">
//             <div>
//               <h1 className="text-3xl md:text-4xl font-bold mb-2">
//                 <span className="text-neon">Admin</span>{" "}
//                 <span className="text-foreground">Dashboard</span>
//               </h1>
//               <p className="text-muted-foreground">
//                 Manage all your songs and albums here — add, update, delete, or view.
//               </p>
//             </div>
//             <Button
//               variant="destructive"
//               onClick={handleLogout}
//               className="flex items-center"
//             >
//               <LogOut className="h-5 w-5 mr-2" /> Logout
//             </Button>
//           </div>

//           {/* Tabs */}
//           <div className="flex flex-wrap gap-4 mb-10">
//             {tabs.map((tab) => (
//               <Button
//                 key={tab.key}
//                 variant={activeTab === tab.key ? "default" : "outline"}
//                 onClick={() => setActiveTab(tab.key)}
//                 className={`flex items-center ${
//                   activeTab === tab.key
//                     ? "bg-primary text-primary-foreground"
//                     : "border-primary/30 text-foreground hover:bg-primary/10"
//                 }`}
//               >
//                 {tab.icon}
//                 {tab.label}
//               </Button>
//             ))}
//           </div>

//           {/* Panel */}
//           <Card className="bg-card/40 backdrop-blur-sm border-primary/20 shadow-lg">
//             <CardContent className="p-6">
//               {activeTab === "" && (
//                 <p className="text-muted-foreground text-center">
//                   Please select a tab to continue.
//                 </p>
//               )}

//               {activeTab === "songs" && (
//                 <>
//                   <div className="flex justify-between mb-4">
//                     <Input
//                       placeholder="Search by title or language..."
//                       value={search}
//                       onChange={(e) => {
//                         setSearch(e.target.value);
//                         setCurrentPage(1);
//                       }}
//                       className="max-w-sm"
//                     />
//                   </div>

//                   {loading ? (
//                     <p className="text-muted-foreground">Loading songs...</p>
//                   ) : error ? (
//                     <p className="text-red-500">{error}</p>
//                   ) : currentSongs.length === 0 ? (
//                     <p className="text-muted-foreground">No songs found.</p>
//                   ) : (
//                     <>
//                       <table className="w-full text-left border-collapse mb-4">
//                         <thead className="bg-primary/10 text-foreground">
//                           <tr>
//                             <th className="p-2 border-b">Title</th>
//                             <th className="p-2 border-b">Language</th>
//                             <th className="p-2 border-b">Duration</th>
//                             <th className="p-2 border-b">Actions</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {currentSongs.map((song) => (
//                             <tr key={song._id} className="hover:bg-primary/5">
//                               <td className="p-2 border-b">{song.title}</td>
//                               <td className="p-2 border-b">{song.lang}</td>
//                               <td className="p-2 border-b">{song.duration}</td>
//                               <td className="p-2 border-b flex gap-2">
//                                 <Button
//                                   size="sm"
//                                   variant="outline"
//                                   onClick={() => alert(`Edit song ID: ${song._id}`)}
//                                 >
//                                   <Pencil className="h-4 w-4 mr-1" /> Edit
//                                 </Button>
//                                 <Button
//                                   size="sm"
//                                   variant="destructive"
//                                   onClick={() => handleDelete(song._id)}
//                                 >
//                                   <Trash2 className="h-4 w-4 mr-1" /> Delete
//                                 </Button>
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>

//                       <div className="flex gap-2">
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           disabled={currentPage === 1}
//                           onClick={() => setCurrentPage((prev) => prev - 1)}
//                         >
//                           Previous
//                         </Button>
//                         {Array.from({ length: totalPages }, (_, i) => (
//                           <Button
//                             key={i + 1}
//                             size="sm"
//                             variant={currentPage === i + 1 ? "default" : "outline"}
//                             onClick={() => setCurrentPage(i + 1)}
//                           >
//                             {i + 1}
//                           </Button>
//                         ))}
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           disabled={currentPage === totalPages}
//                           onClick={() => setCurrentPage((prev) => prev + 1)}
//                         >
//                           Next
//                         </Button>
//                       </div>
//                     </>
//                   )}
//                 </>
//               )}

//               {activeTab === "addSong" && <AddSong />}
//               {activeTab === "update" && <UpdateSong />}
//               {activeTab === "delete" && <DeleteSong />}
//               {activeTab === "managealbums" && <ManageAlbums />}
//             </CardContent>
//           </Card>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Dashboard;




////======================================================================================



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
import AddSong from "./AddSong";
import UpdateSong from "./UpdateSong";
import DeleteSong from "./DeleteSong";
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

              {activeTab === "addSong" && <AddSong />}
              {activeTab === "update" && <UpdateSong />}
              {activeTab === "delete" && <DeleteSong />}
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
