import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import api from "@/lib/api";

type Event = {
  _id: string;
  date: string;
  venue: string;
};

const EventManagement = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState<Partial<Event>>({ date: "", venue: "" });
  const [editEventId, setEditEventId] = useState<string | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 5;

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/events");
      const eventList = res.data.data || res.data.events || res.data || [];
      setEvents(eventList);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.date || !formData.venue) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      if (editEventId) {
        await api.put(`/events/${editEventId}`, formData);
        setSuccess("Event updated successfully!");
      } else {
        await api.post("/events", formData);
        setSuccess("Event created successfully!");
      }

      setFormData({ date: "", venue: "" });
      setEditEventId(null);
      fetchEvents();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to save event.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event: Event) => {
    setEditEventId(event._id);
    setFormData({ date: event.date, venue: event.venue });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      await api.delete(`/events/${id}`);
      setEvents((prev) => prev.filter((e) => e._id !== id));
    } catch {
      alert("Failed to delete event");
    }
  };

  const filteredEvents = events.filter(
    (event) =>
      (event.date || "").toLowerCase().includes(search.toLowerCase()) ||
      (event.venue || "").toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-10">
            <span className="text-foreground">Event</span>{" "}
            <span className="text-neon animate-glow">Management</span>
          </h1>

          {/* Add / Edit Form */}
          <Card className="bg-card/40 backdrop-blur-sm border-primary/20 shadow-lg mb-10">
            <CardContent>
              <h2 className="text-xl font-bold mb-4">
                {editEventId ? "Edit Event" : "Add New Event"}
              </h2>

              {success && <p className="text-green-500 mb-2">{success}</p>}
              {error && <p className="text-red-500 mb-2">{error}</p>}

              <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
                <Input
                  name="date"
                  placeholder="Date"
                  value={formData.date || ""}
                  onChange={handleChange}
                />
                <Input
                  name="venue"
                  placeholder="Venue"
                  value={formData.venue || ""}
                  onChange={handleChange}
                />
                <Button type="submit" disabled={loading}>
                  {loading ? (editEventId ? "Updating..." : "Saving...") : editEventId ? "Update" : "Add"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Search */}
          <div className="flex justify-end mb-6">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by date or venue..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1); // reset to first page on search
                }}
                className="pl-10"
              />
            </div>
          </div>

          {/* Events List */}
          {loading ? (
            <p className="text-muted-foreground">Loading events...</p>
          ) : currentEvents.length === 0 ? (
            <p className="text-muted-foreground">No events found.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentEvents.map((event) => (
                  <Card key={event._id} className="border border-primary/20 hover:shadow-lg transition">
                    <CardContent className="p-4">
                      <p className="text-lg font-semibold">{event.date}</p>
                      <p className="text-xl font-bold mb-4">{event.venue}</p>
                      <div className="flex gap-3">
                        <Button size="sm" onClick={() => handleEdit(event)}>Edit</Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(event._id)}>Delete</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-2 mt-6">
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
      </main>

      <Footer />
    </div>
  );
};

export default EventManagement;
