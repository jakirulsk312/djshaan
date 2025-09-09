
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Search } from "lucide-react";
import api from "@/lib/api";

type Song = {
  _id: string;
  title: string;
  lang: string;
  duration: string;
  link: string;
};

const Songs = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const songsPerPage = 10; // change to 15 if you want

  // Fetch songs from API
  const fetchSongs = async () => {
    try {
      setLoading(true);
      const res = await api.get("/songs"); // adjust if needed
      console.log("API response:", res.data);

      // Make sure you pick the correct key
      const songsData = res.data.data || res.data.songs || [];
      setSongs(songsData);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load songs.");
    } finally {
      setLoading(false);
    }
  };

  // Delete song
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this song?")) return;
    try {
      await api.delete(`/songs/${id}`); // adjust path if needed
      setSongs((prev) => prev.filter((song) => song._id !== id));
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to delete song.");
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  // Filter songs by search term
  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(search.toLowerCase()) ||
      song.lang.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = filteredSongs.slice(indexOfFirstSong, indexOfLastSong);
  const totalPages = Math.ceil(filteredSongs.length / songsPerPage);

  if (loading) return <p className="text-muted-foreground">Loading songs...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">🎵 All Songs</h2>

        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by title or language..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // reset page
            }}
            className="pl-10"
          />
        </div>
      </div>

      {currentSongs.length === 0 ? (
        <p className="text-muted-foreground">No songs found.</p>
      ) : (
        <>
          <Card className="overflow-hidden border border-primary/20">
            <CardContent className="p-0">
              <table className="w-full text-left border-collapse">
                <thead className="bg-primary/10 text-foreground">
                  <tr>
                    <th className="p-3 border-b">Title</th>
                    <th className="p-3 border-b">Language</th>
                    <th className="p-3 border-b">Duration</th>
                    <th className="p-3 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSongs.map((song) => (
                    <tr key={song._id} className="hover:bg-primary/5 transition-colors">
                      <td className="p-3 border-b">{song.title}</td>
                      <td className="p-3 border-b">{song.lang}</td>
                      <td className="p-3 border-b">{song.duration}</td>
                      <td className="p-3 border-b flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => alert(`Open UpdateSong form for ID: ${song._id}`)}
                        >
                          <Pencil className="h-4 w-4 mr-1" /> Edit
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(song._id)}>
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          <div className="flex justify-center items-center gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                size="sm"
                variant={currentPage === i + 1 ? "default" : "outline"}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Songs;
