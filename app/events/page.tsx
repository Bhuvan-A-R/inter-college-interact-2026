"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type EventItem = {
  id: string;
  name: string;
  description?: string | null;
  type: "SOLO" | "TEAM";
  category: string;
  price: number | string;
  isActive: boolean;
};

type Team = {
  id: string;
  name: string;
  event: { id: string; name: string };
  myRole: "LEADER" | "MEMBER";
};

type EventsResponse = {
  success: boolean;
  data?: { items: EventItem[] };
  error?: { message?: string };
};

type TeamsResponse = {
  success: boolean;
  data?: { items: Team[] };
  error?: { message?: string };
};

const getCategoryTone = (category: string) => {
  const map: Record<string, string> = {
    THEATRE: "text-gat-blue",
    DANCE: "text-gat-gold",
    MUSIC: "text-gat-navy",
    FASHION: "text-gat-cobalt",
    LITERARY: "text-gat-dark-gold",
    FINE_ARTS: "text-gat-blue",
    GENERAL_EVENTS: "text-gat-gold",
  };
  return map[category] ?? "text-gat-steel";
};

export default function EventPage() {
  const router = useRouter();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTeam, setSelectedTeam] = useState<Record<string, string>>({});

  const leaderTeamsByEvent = useMemo(() => {
    const map = new Map<string, Team[]>();
    teams.forEach((team) => {
      if (team.myRole !== "LEADER") return;
      const list = map.get(team.event.id) ?? [];
      list.push(team);
      map.set(team.event.id, list);
    });
    return map;
  }, [teams]);

  const filteredEvents = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return events.filter((event) => event.name.toLowerCase().includes(query));
  }, [events, searchQuery]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [eventsRes, teamsRes] = await Promise.all([
        fetch("/api/events"),
        fetch("/api/teams"),
      ]);

      const eventsData: EventsResponse = await eventsRes.json();
      const teamsData: TeamsResponse = await teamsRes.json();

      if (!eventsRes.ok || !teamsRes.ok) {
        if (eventsRes.status === 401 || teamsRes.status === 401) {
          toast.error("Please sign in to continue.");
          router.push("/auth/signin");
          return;
        }
        toast.error(
          eventsData.error?.message ||
            teamsData.error?.message ||
            "Unable to load events.",
        );
        return;
      }

      setEvents(eventsData.data?.items ?? []);
      setTeams(teamsData.data?.items ?? []);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddToCart = async (event: EventItem) => {
    const teamId = event.type === "TEAM" ? selectedTeam[event.id] : null;

    if (event.type === "TEAM" && !teamId) {
      toast.error("Select a team before adding this event.");
      return;
    }

    try {
      const res = await fetch("/api/cart/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: event.id, teamId }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error?.message || "Unable to add event to cart.");
        return;
      }

      toast.success("Added to cart.");
      router.push("/cart");
    } catch (error) {
      console.error(error);
      toast.error("Unable to add event to cart.");
    }
  };

  return (
    <div className="min-h-screen bg-gat-off-white pt-16 pb-20">
      <header className="bg-white border-b border-gat-blue/10 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-gat-steel mb-2">
            Events
          </p>
          <h1 className="text-4xl md:text-5xl font-heading font-black text-gat-midnight mb-6">
            Pick Events
          </h1>

          <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gat-steel" />
            </div>
            <input
              type="text"
              placeholder="Search events"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="block w-full pl-11 pr-4 py-4 rounded-xl border border-gat-blue/20 bg-gat-off-white focus:bg-white focus:ring-2 focus:ring-gat-blue focus:border-transparent transition-all outline-none text-gat-charcoal font-medium"
            />
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="rounded-xl bg-white p-6 border border-gat-blue/10 shadow-sm">
            Loading events...
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="rounded-xl bg-white p-10 border border-gat-blue/10 text-center">
            <p className="text-gat-steel">No events found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => {
              const leaderTeams = leaderTeamsByEvent.get(event.id) ?? [];
              return (
                <div
                  key={event.id}
                  className="bg-white border border-gat-blue/10 rounded-xl p-5 shadow-sm flex flex-col"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-bold uppercase tracking-widest ${getCategoryTone(event.category)}`}
                    >
                      {event.category.replace(/_/g, " ")}
                    </span>
                    <span className="text-xs font-bold text-gat-steel">
                      {event.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-heading font-bold text-gat-midnight mb-2">
                    {event.name}
                  </h3>
                  {event.description && (
                    <p className="text-sm text-gat-steel line-clamp-2 mb-4">
                      {event.description}
                    </p>
                  )}

                  <div className="mt-auto space-y-3">
                    <div className="flex items-center justify-between text-sm text-gat-steel">
                      <span>Price</span>
                      <span className="font-mono text-gat-dark-gold font-bold">
                        ₹{Number(event.price).toFixed(2)}
                      </span>
                    </div>

                    {event.type === "TEAM" && (
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gat-steel">
                          Select team
                        </label>
                        <select
                          value={selectedTeam[event.id] ?? ""}
                          onChange={(e) =>
                            setSelectedTeam((prev) => ({
                              ...prev,
                              [event.id]: e.target.value,
                            }))
                          }
                          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                        >
                          <option value="">Choose team</option>
                          {leaderTeams.map((team) => (
                            <option key={team.id} value={team.id}>
                              {team.name}
                            </option>
                          ))}
                        </select>
                        {leaderTeams.length === 0 && (
                          <p className="text-xs text-gat-steel">
                            No teams for this event.{" "}
                            <Link
                              href="/teams"
                              className="text-gat-blue font-semibold underline hover:text-gat-midnight"
                            >
                              Create one →
                            </Link>
                          </p>
                        )}
                      </div>
                    )}

                    <Button
                      onClick={() => handleAddToCart(event)}
                      disabled={
                        event.type === "TEAM" &&
                        !selectedTeam[event.id]
                      }
                      className="w-full bg-gat-blue text-white hover:bg-gat-midnight disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {event.type === "TEAM" && !selectedTeam[event.id]
                        ? "Select a team first"
                        : "Add to cart"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
