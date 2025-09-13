import { useEffect, useState } from "react";
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
import { motion } from "framer-motion";
import api from "@/lib/api";

type Image = {
  _id?: string;
  title: string;
  description?: string;
  imageUrl: string;
};

const GalleryManagement = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState<Partial<Image>>({});
  const [editId, setEditId] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  // Dialog state
  const [showDialog, setShowDialog] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await api.get("/gallery");
      setImages(res.data.data || []);
    } catch {
      setError("Failed to fetch images.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // Auto-close dialog after 3s
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
    if (!formData.title) {
      setError("Title is required.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      let imageUrl = formData.imageUrl;

      if (file) {
        const formDataCloud = new FormData();
        formDataCloud.append("file", file);

        const res = await api.post("/upload?folder=gallery", formDataCloud, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        imageUrl = res.data.url;
      }

      if (editId) {
        await api.put(`/gallery/${editId}`, { ...formData, imageUrl });
        setSuccess("✅ Image updated successfully!");
      } else {
        await api.post("/gallery", { ...formData, imageUrl });
        setSuccess("✅ Image added successfully!");
      }

      setShowDialog(true);

      // Reset form
      setFormData({});
      setFile(null);
      setEditId(null);
      fetchGallery();
    } catch {
      setError("❌ Failed to save image.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (img: Image) => {
    setEditId(img._id!);
    setFormData(img);
    setFile(null);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm("Are you sure?")) return;
    try {
      await api.delete(`/gallery/${id}`);
      setImages(images.filter((i) => i._id !== id));
    } catch {
      alert("Failed to delete image.");
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(images.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentImages = images.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Card className="bg-card/40 backdrop-blur-sm border-primary/20 shadow-lg p-6">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">
          {editId ? "Edit Image" : "Add New Image"}
        </h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
          <Input
            name="title"
            placeholder="Title"
            value={formData.title || ""}
            onChange={handleChange}
          />
          <Input
            name="description"
            placeholder="Description"
            value={formData.description || ""}
            onChange={handleChange}
          />
          <Input type="file" accept="image/*" onChange={handleFileChange} />

          {(file || formData.imageUrl) && (
            <img
              src={file ? URL.createObjectURL(file) : formData.imageUrl}
              alt="Preview"
              className="h-32 w-32 object-cover rounded-md border"
            />
          )}

          <Button type="submit" disabled={loading} className="flex items-center justify-center">
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                {editId ? "Updating..." : "Uploading..."}
              </div>
            ) : editId ? (
              "Update Image"
            ) : (
              "Add Image"
            )}
          </Button>
        </form>

        <h3 className="text-lg font-bold mb-2">All Images</h3>
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : images.length === 0 ? (
          <p>No images found.</p>
        ) : (
          <>
            {/* Image grid with animation */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15 },
                },
              }}
            >
              {currentImages.map((img) => (
                <motion.div
                  key={img._id}
                  className="bg-card/50 p-2 rounded-lg shadow-lg relative"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <img
                    src={img.imageUrl}
                    alt={img.title}
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <h4 className="font-bold text-foreground mt-2">{img.title}</h4>
                  <div className="flex gap-2 mt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(img)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(img._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-6">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  Previous
                </Button>

                <span className="px-3 py-1 rounded-md bg-primary text-primary-foreground text-sm font-medium">
                  {currentPage}
                </span>

                <Button
                  size="sm"
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            )}
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

export default GalleryManagement;
