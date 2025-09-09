// import { useState, useEffect } from "react";
// import { supabase } from "@/supabaseClient";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// interface Song {
//   id: number;
//   title: string;
//   views: string;
//   duration: string;
//   lang: string;
//   thumbnail: string;
//   link: string;
// }

// const SongManager = () => {
//   const [songs, setSongs] = useState<Song[]>([]);
//   const [newSong, setNewSong] = useState<Omit<Song, "id">>({
//     title: "",
//     views: "",
//     duration: "",
//     lang: "",
//     thumbnail: "",
//     link: ""
//   });

//   // fetch songs
//   useEffect(() => {
//     fetchSongs();
//   }, []);

//   const fetchSongs = async () => {
//     const { data, error } = await supabase.from("songs").select("*").order("id", { ascending: false });
//     if (error) {
//       console.error(error);
//       return;
//     }
//     setSongs((data as Song[]) || []);
//   };

//   const addSong = async () => {
//     if (!newSong.title || !newSong.link) return;
//     const { error } = await supabase.from("songs").insert([newSong]);
//     if (error) {
//       console.error(error);
//       return;
//     }
//     setNewSong({ title: "", views: "", duration: "", lang: "", thumbnail: "", link: "" });
//     fetchSongs();
//   };

//   const deleteSong = async (id: number) => {
//     const { error } = await supabase.from("songs").delete().eq("id", id);
//     if (error) {
//       console.error(error);
//       return;
//     }
//     fetchSongs();
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">Manage Songs</h2>

//       {/* Add Song Form */}
//       <div className="grid gap-2 mb-6">
//         <Input placeholder="Title" value={newSong.title}
//           onChange={e => setNewSong({ ...newSong, title: e.target.value })} />
//         <Input placeholder="Views" value={newSong.views}
//           onChange={e => setNewSong({ ...newSong, views: e.target.value })} />
//         <Input placeholder="Duration" value={newSong.duration}
//           onChange={e => setNewSong({ ...newSong, duration: e.target.value })} />
//         <Input placeholder="Language" value={newSong.lang}
//           onChange={e => setNewSong({ ...newSong, lang: e.target.value })} />
//         <Input placeholder="Thumbnail URL" value={newSong.thumbnail}
//           onChange={e => setNewSong({ ...newSong, thumbnail: e.target.value })} />
//         <Input placeholder="YouTube Link" value={newSong.link}
//           onChange={e => setNewSong({ ...newSong, link: e.target.value })} />

//         <Button onClick={addSong}>Add Song</Button>
//       </div>

//       {/* Song List */}
//       <ul className="space-y-3">
//         {songs.map(song => (
//           <li key={song.id} className="p-3 border rounded flex justify-between items-center">
//             <div>
//               <p className="font-semibold">{song.title}</p>
//               <p className="text-sm text-gray-500">{song.duration} | {song.lang}</p>
//             </div>
//             <Button variant="destructive" onClick={() => deleteSong(song.id)}>
//               Delete
//             </Button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SongManager;
