import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Music } from "lucide-react";
import api from "@/lib/api";

interface SongForm {
  title: string;
  link: string;
  lang: string;
  duration: string;
}

const AddSong = () => {
  const [form, setForm] = useState<SongForm>({
    title: "",
    link: "",
    lang: "",
    duration: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      await api.post("/songs", form);
      setSuccess("✅ Song added successfully!");
      setForm({ title: "", link: "", lang: "", duration: "" });
    } catch (err) {
      setError("❌ Failed to add song.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <Card className="w-full max-w-lg bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8">
        <CardContent>
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
              <Music className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">🎶 Add New Song</h1>
            <p className="text-muted-foreground">Add a new track to your collection</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && <p className="text-red-400 text-center">{error}</p>}
            {success && <p className="text-green-400 text-center animate-pulse">{success}</p>}

            <Input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Song Title"
              className="bg-gray-900 text-white"
              required
            />
            <Input
              type="url"
              name="link"
              value={form.link}
              onChange={handleChange}
              placeholder="YouTube Link"
              className="bg-gray-900 text-white"
              required
            />
            <select
              name="lang"
              value={form.lang}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-900 text-white focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="">Select language</option>
              <option value="English">English</option>
              <option value="Bangla">Bangla</option>
              <option value="Hindi">Hindi</option>
              <option value="Other">Other</option>
            </select>
            <Input
              type="text"
              name="duration"
              value={form.duration}
              onChange={handleChange}
              placeholder="Duration e.g. 3:45"
              className="bg-gray-900 text-white"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-lg font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Adding..." : "Add Song"}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddSong;
