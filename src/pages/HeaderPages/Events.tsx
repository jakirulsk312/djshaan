import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import api from "@/lib/api";

type Event = {
  _id?: string;
  date: string;
  venue: string;
};

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await api.get("/events");
      const eventList: Event[] = res.data.data || res.data.events || res.data || [];

      // Sort events by date (earliest first)
      eventList.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

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

  return (
    <div className="flex flex-col min-h-screen">
      {/* Background + Overlay */}
      <div className="relative flex-1">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('/background.jpeg')" }}
        />
        <div className="absolute inset-0 bg-[hsl(230_20%_8%_/_0.85)]"></div>

        {/* Main Content */}
        <div className="relative z-10">
          <Header/> {/* Assuming your Header component supports a "transparent" prop */}

          <main className="pt-36 pb-16">
            <div className="max-w-5xl mx-auto px-4">
              <h1 className="text-5xl font-extrabold text-center mb-12 text-neon animate-glow">
                DJ Events Schedule
              </h1>

              {loading ? (
                <p className="text-center text-muted-foreground">Loading events...</p>
              ) : error ? (
                <p className="text-center text-red-500">{error}</p>
              ) : events.length === 0 ? (
                <p className="text-center text-muted-foreground">No events found.</p>
              ) : (
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary/50 h-full"></div>

                  {/* Events */}
                  <div className="space-y-10">
                    {events.map((event, index) => {
                      const isLeft = index % 2 === 0;
                      const date = event.date || "TBA";
                      const venue = event.venue || "TBA";

                      return (
                        <div
                          key={event._id || index}
                          className={`flex items-center ${isLeft ? "justify-start" : "justify-end"} relative`}
                        >
                          <div
                            className={`w-1/2 p-6 bg-card/50 backdrop-blur-md border border-primary/30 rounded-2xl shadow-lg transform transition hover:scale-105 animate-float ${
                              isLeft ? "ml-0 text-left" : "ml-auto text-right"
                            }`}
                          >
                            <p className="text-lg font-semibold text-muted-foreground">{date}</p>
                            <p className="text-xl font-bold text-foreground">{venue}</p>
                          </div>

                          <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-primary rounded-full z-20 shadow-lg"></div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-background text-foreground">
        <Footer />
      </footer>
    </div>
  );
};

export default Events;
