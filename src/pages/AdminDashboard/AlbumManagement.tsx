import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import api from "@/lib/api";

type Album = {
  _id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  image: string; // Cloudinary URL
  driveFileId: string; // Google Drive File ID
};

const ManageAlbums = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState<Partial<Album>>({});
  const [editAlbumId, setEditAlbumId] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const albumsPerPage = 5;

  // Dialog state
  const [showDialog, setShowDialog] = useState(false);

  const fetchAlbums = async () => {
    try {
      setLoading(true);
      const res = await api.get("/albums");
      setAlbums(res.data.data || []);
    } catch {
      setError("Failed to fetch albums");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  // Auto-close dialog after 3 seconds
  useEffect(() => {
    if (showDialog) {
      const timer = setTimeout(() => setShowDialog(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showDialog]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.duration ||
      !formData.price ||
      !formData.driveFileId
    ) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      let imageUrl = formData.image;

      // Upload file if a new one is selected
      if (file) {
        const formDataCloud = new FormData();
        formDataCloud.append("file", file);

        const uploadRes = await api.post("/upload?folder=albums", formDataCloud, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        imageUrl = uploadRes.data.url;
      }

      const albumData = {
        title: formData.title,
        description: formData.description,
        duration: formData.duration,
        price: Number(formData.price),
        image: imageUrl,
        driveFileId: formData.driveFileId,
      };

      if (editAlbumId) {
        await api.put(`/albums/${editAlbumId}`, albumData);
        setSuccess("Album updated successfully!");
      } else {
        await api.post("/albums", albumData);
        setSuccess("Album created successfully!");
      }

      // Show success dialog
      setShowDialog(true);

      // Reset form
      setFormData({});
      setEditAlbumId(null);
      setFile(null);
      fetchAlbums();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to save album.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (album: Album) => {
    setEditAlbumId(album._id);
    setFormData(album);
    setFile(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this album?")) return;
    try {
      setLoading(true);
      await api.delete(`/albums/${id}`);
      setAlbums((prev) => prev.filter((a) => a._id !== id));
    } catch {
      alert("Failed to delete album");
    } finally {
      setLoading(false);
    }
  };

  // Pagination logic
  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = albums.slice(indexOfFirstAlbum, indexOfLastAlbum);
  const totalPages = Math.ceil(albums.length / albumsPerPage);

  return (
    <Card className="bg-card/40 backdrop-blur-sm border-primary/20 shadow-lg relative">
      {/* Loader Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}

      <CardContent>
        <h2 className="text-xl font-bold mb-4">
          {editAlbumId ? "Edit Album" : "Add New Album"}
        </h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
          <Input
            name="title"
            placeholder="Album Title"
            value={formData.title || ""}
            onChange={handleChange}
          />
          <Input
            name="description"
            placeholder="Description"
            value={formData.description || ""}
            onChange={handleChange}
          />
          <Input
            name="duration"
            placeholder="Duration (e.g., 45:30)"
            value={formData.duration || ""}
            onChange={handleChange}
          />
          <Input
            name="price"
            type="number"
            placeholder="Price (INR)"
            value={formData.price || ""}
            onChange={handleChange}
          />
          <Input
            name="driveFileId"
            placeholder="Google Drive File ID"
            value={formData.driveFileId || ""}
            onChange={handleChange}
          />

          <Input type="file" accept="image/*" onChange={handleFileChange} />

          {(file || formData.image) && (
            <img
              src={file ? URL.createObjectURL(file) : formData.image}
              alt="Preview"
              className="h-32 w-32 object-cover rounded-md border"
            />
          )}

          <Button type="submit" disabled={loading}>
            {editAlbumId ? "Update Album" : "Upload Album"}
          </Button>
        </form>

        <h3 className="text-lg font-bold mb-2">All Albums</h3>
        {currentAlbums.length === 0 ? (
          <p>No albums found.</p>
        ) : (
          <>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-2 border-b">Cover</th>
                  <th className="p-2 border-b">Title</th>
                  <th className="p-2 border-b">Duration</th>
                  <th className="p-2 border-b">Price</th>
                  <th className="p-2 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentAlbums.map((album) => (
                  <tr key={album._id} className="hover:bg-primary/5">
                    <td className="p-2 border-b">
                      <img
                        src={album.image}
                        alt={album.title}
                        className="h-16 w-16 object-cover rounded-md"
                      />
                    </td>
                    <td className="p-2 border-b">{album.title}</td>
                    <td className="p-2 border-b">{album.duration}</td>
                    <td className="p-2 border-b">₹{album.price}</td>
                    <td className="p-2 border-b flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(album)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(album._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

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
      </CardContent>

      {/* Success Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Success</DialogTitle>
          </DialogHeader>
          <p>{success}</p>
          <DialogFooter>
            <Button onClick={() => setShowDialog(false)}>OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ManageAlbums;
