
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import api from "@/lib/api";

type Song = {
  _id: string;
  title: string;
  duration: string;
  lang: string;
  link: string;
};

const ManageSongs = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState<Partial<Song>>({});
  const [editSongId, setEditSongId] = useState<string | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const songsPerPage = 10;

  const fetchSongs = async () => {
    try {
      setLoading(true);
      const res = await api.get("/songs");
      setSongs(res.data.data || []);
    } catch {
      setError("Failed to fetch songs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.duration || !formData.lang || !formData.link) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      if (editSongId) {
        await api.put(`/songs/${editSongId}`, formData);
        setSuccess("Song updated successfully!");
      } else {
        await api.post("/songs", formData);
        setSuccess("Song added successfully!");
      }

      setFormData({});
      setEditSongId(null);
      fetchSongs();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to save song.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (song: Song) => {
    setEditSongId(song._id);
    setFormData(song);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this song?")) return;
    try {
      await api.delete(`/songs/${id}`);
      setSongs((prev) => prev.filter((s) => s._id !== id));
    } catch {
      alert("Failed to delete song.");
    }
  };

  // Pagination logic
  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong);
  const totalPages = Math.ceil(songs.length / songsPerPage);

  return (
    <Card className="bg-card/40 backdrop-blur-sm border-primary/20 shadow-lg">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">{editSongId ? "Edit Song" : "Add New Song"}</h2>

        {success && <p className="text-green-500 mb-2">{success}</p>}
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
          <Input name="title" placeholder="Title" value={formData.title || ""} onChange={handleChange} />
          <Input name="duration" placeholder="Duration" value={formData.duration || ""} onChange={handleChange} />
          <Input name="lang" placeholder="Language" value={formData.lang || ""} onChange={handleChange} />
          <Input name="link" placeholder="YouTube Link" value={formData.link || ""} onChange={handleChange} />

          <Button type="submit" disabled={loading}>
            {loading ? (editSongId ? "Updating..." : "Uploading...") : editSongId ? "Update Song" : "Add Song"}
          </Button>
        </form>

        <h3 className="text-lg font-bold mb-2">All Songs</h3>
        {loading ? (
          <p>Loading songs...</p>
        ) : currentSongs.length === 0 ? (
          <p>No songs found.</p>
        ) : (
          <>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-2 border-b">Title</th>
                  <th className="p-2 border-b">Duration</th>
                  <th className="p-2 border-b">Language</th>
                  <th className="p-2 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentSongs.map((song) => (
                  <tr key={song._id} className="hover:bg-primary/5">
                    <td className="p-2 border-b">{song.title}</td>
                    <td className="p-2 border-b">{song.duration}</td>
                    <td className="p-2 border-b">{song.lang}</td>
                    <td className="p-2 border-b flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(song)}>
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

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-4">
              <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>
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
      </CardContent>
    </Card>
  );
};

export default ManageSongs;
