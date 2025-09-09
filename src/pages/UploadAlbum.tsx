// import { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import api from "@/lib/api";

// const UploadAlbum = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [duration, setDuration] = useState("");
//   const [price, setPrice] = useState("");
//   const [image, setImage] = useState("");
//   const [driveFileId, setDriveFileId] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!title || !description || !duration || !price || !image || !driveFileId) {
//       setError("All fields are required.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");
//       setSuccess("");

//       const res = await api.post("/albums", {
//         title,
//         description,
//         duration,
//         price: Number(price),
//         image,
//         driveFileId,
//       });

//       if (res.data.success) {
//         setSuccess("Album created successfully!");
//         setTitle("");
//         setDescription("");
//         setDuration("");
//         setPrice("");
//         setImage("");
//         setDriveFileId("");
//       }
//     } catch (err) {
//       console.error(err);
//       setError(err?.response?.data?.message || "Failed to create album.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Card className="bg-card/40 backdrop-blur-sm border-primary/20 shadow-lg">
//       <CardContent className="p-6">
//         <h2 className="text-xl font-bold mb-4">Upload New Album</h2>
//         {success && <p className="text-green-500 mb-2">{success}</p>}
//         {error && <p className="text-red-500 mb-2">{error}</p>}
//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <Input
//             placeholder="Album Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//           <Input
//             placeholder="Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//           <Input
//             placeholder="Duration (e.g., 30:10)"
//             value={duration}
//             onChange={(e) => setDuration(e.target.value)}
//           />
//           <Input
//             type="number"
//             placeholder="Price (₹)"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//           />
//           <Input
//             placeholder="Image URL"
//             value={image}
//             onChange={(e) => setImage(e.target.value)}
//           />
//           <Input
//             placeholder="Google Drive File ID"
//             value={driveFileId}
//             onChange={(e) => setDriveFileId(e.target.value)}
//           />
//           <Button type="submit" disabled={loading}>
//             {loading ? "Uploading..." : "Upload Album"}
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// };

// export default UploadAlbum;
