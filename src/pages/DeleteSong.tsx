import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import api from "@/lib/api";

const DeleteSong = () => {
  const [songId, setSongId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.delete(`/songs/${songId}`, { withCredentials: true });
      if (res.data.success) {
        setSuccess("🗑️ Song deleted successfully!");
        setError("");
        setSongId("");
      } else {
        setError(res.data.message || "Failed to delete song.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-background">

      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="min-h-[80vh] flex items-center justify-center">
            <Card className="max-w-md w-full bg-card/30 backdrop-blur-sm border-primary/20">
              <CardContent className="p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-destructive/20 to-red-400/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                    <Trash2 className="h-10 w-10 text-destructive" />
                  </div>
                  <h1 className="text-3xl font-bold mb-2">
                    <span className="text-neon animate-glow">Delete</span>{" "}
                    <span className="text-foreground">Song</span>
                  </h1>
                  <p className="text-muted-foreground">Remove a song permanently</p>
                </div>

                {/* Form */}
                <form onSubmit={handleDelete} className="space-y-6">
                  {error && <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg"><p className="text-destructive">{error}</p></div>}
                  {success && <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg"><p className="text-green-600">{success}</p></div>}

                  <Input
                    type="text"
                    name="songId"
                    value={songId}
                    onChange={(e) => setSongId(e.target.value)}
                    placeholder="Song ID"
                    required
                  />

                  <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-red-500 to-destructive hover:from-red-600 hover:to-red-500 animate-pulse-glow">
                    Delete Song
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

    </div>
  );
};

export default DeleteSong;
