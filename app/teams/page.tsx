"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type EventOption = {
  id: string;
  name: string;
  type: "SOLO" | "TEAM";
  category: string;
  isActive: boolean;
};

type Team = {
  id: string;
  name: string;
  event: {
    id: string;
    name: string;
    type: "SOLO" | "TEAM";
    category: string;
  };
  leader: {
    id: string;
    name: string;
    email: string;
  };
  members: Array<{
    id: string;
    user: { id: string; name: string; email: string };
  }>;
  myRole: "LEADER" | "MEMBER";
};

type TeamsResponse = {
  success: boolean;
  data?: { teams: Team[] };
  error?: { message?: string };
};

type EventsResponse = {
  success: boolean;
  data?: { events: EventOption[] };
  error?: { message?: string };
};

export default function TeamsPage() {
  const router = useRouter();
  const [teams, setTeams] = useState<Team[]>([]);
  const [events, setEvents] = useState<EventOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [teamName, setTeamName] = useState<string>("");
  const [eventId, setEventId] = useState<string>("");

  const teamEvents = useMemo(
    () => events.filter((event) => event.type === "TEAM" && event.isActive),
    [events],
  );

  const loadData = async () => {
    setLoading(true);
    try {
      const [teamsRes, eventsRes] = await Promise.all([
        fetch("/api/teams"),
        fetch("/api/events"),
      ]);

      const teamsData: TeamsResponse = await teamsRes.json();
      const eventsData: EventsResponse = await eventsRes.json();

      if (!teamsRes.ok || !eventsRes.ok) {
        const errorMessage =
          teamsData.error?.message ||
          eventsData.error?.message ||
          "Unable to load teams.";
        if (teamsRes.status === 401 || eventsRes.status === 401) {
          toast.error("Please sign in to continue.");
          router.push("/auth/signin");
          return;
        }
        toast.error(errorMessage);
        return;
      }

      setTeams(teamsData.data?.teams ?? []);
      setEvents(eventsData.data?.events ?? []);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load teams.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateTeam = async () => {
    if (!teamName.trim() || !eventId) {
      toast.error("Team name and event are required.");
      return;
    }

    try {
      const res = await fetch("/api/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: teamName.trim(), eventId }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error?.message || "Failed to create team.");
        return;
      }

      toast.success("Team created successfully.");
      setTeamName("");
      setEventId("");
      loadData();
    } catch (error) {
      console.error(error);
      toast.error("Unable to create team.");
    }
  };

  return (
    <div className="min-h-screen bg-gat-off-white pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-gat-steel">
            Teams
          </p>
          <h1 className="text-3xl md:text-4xl font-heading font-black text-gat-midnight">
            Manage Teams
          </h1>
        </div>

        <div className="bg-white border border-gat-blue/10 rounded-xl p-5 shadow-sm mb-8">
          <h2 className="text-lg font-heading font-bold text-gat-midnight mb-4">
            Create a Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_auto] gap-4">
            <Input
              value={teamName}
              onChange={(event) => setTeamName(event.target.value)}
              placeholder="Team name"
            />
            <select
              value={eventId}
              onChange={(event) => setEventId(event.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="">Select team event</option>
              {teamEvents.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.name} • {event.category}
                </option>
              ))}
            </select>
            <Button onClick={handleCreateTeam}>Create</Button>
          </div>
        </div>

        {loading ? (
          <div className="rounded-xl bg-white p-6 border border-gat-blue/10 shadow-sm">
            Loading teams...
          </div>
        ) : teams.length === 0 ? (
          <div className="rounded-xl bg-white p-10 border border-gat-blue/10 text-center">
            <p className="text-gat-steel">No teams yet. Create one above.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {teams.map((team) => (
              <div
                key={team.id}
                className="bg-white border border-gat-blue/10 rounded-xl p-5 shadow-sm"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <p className="text-lg font-heading font-bold text-gat-midnight">
                      {team.name}
                    </p>
                    <p className="text-sm text-gat-steel">
                      {team.event.name} • {team.event.category}
                    </p>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gat-blue bg-gat-blue/10 px-3 py-1 rounded-full">
                    {team.myRole}
                  </span>
                </div>
                <div className="mt-4 text-sm text-gat-steel">
                  Leader: {team.leader.name} ({team.leader.email})
                </div>
                <div className="mt-3 text-sm text-gat-steel">
                  Members: {team.members.length}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
