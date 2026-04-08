"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Invite = {
  id: string;
  team: {
    id: string;
    name: string;
    memberCount: number;
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
  };
  invitedBy: {
    id: string;
    name: string;
    email: string;
  };
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  createdAt: string;
};

type InvitesResponse = {
  success: boolean;
  data?: {
    invites: {
      PENDING: Invite[];
      ACCEPTED: Invite[];
      REJECTED: Invite[];
    };
  };
  error?: { message?: string };
};

export default function InvitesPage() {
  const router = useRouter();
  const [invites, setInvites] = useState<InvitesResponse["data"] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadInvites = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/invites");
      const data: InvitesResponse = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          toast.error("Please sign in to continue.");
          router.push("/auth/signin");
          return;
        }
        toast.error(data.error?.message || "Failed to load invites.");
        return;
      }

      setInvites(data.data);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load invites.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvites();
  }, []);

  const handleRespond = async (
    inviteId: string,
    action: "accept" | "reject",
  ) => {
    try {
      const res = await fetch(`/api/invites/${inviteId}/${action}`, {
        method: "POST",
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error?.message || "Unable to update invite.");
        return;
      }

      toast.success(
        action === "accept" ? "Invite accepted." : "Invite rejected.",
      );
      loadInvites();
    } catch (error) {
      console.error(error);
      toast.error("Unable to update invite.");
    }
  };

  const renderInvites = (list: Invite[], showActions: boolean) => {
    if (list.length === 0) {
      return <p className="text-sm text-gat-steel">No invites.</p>;
    }

    return (
      <div className="space-y-4">
        {list.map((invite) => (
          <div
            key={invite.id}
            className="bg-white border border-gat-blue/10 rounded-xl p-5 shadow-sm"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <p className="text-lg font-heading font-bold text-gat-midnight">
                  {invite.team.name}
                </p>
                <p className="text-sm text-gat-steel">
                  {invite.team.event.name} • {invite.team.event.category}
                </p>
              </div>
              {showActions ? (
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleRespond(invite.id, "accept")}
                    className="bg-gat-blue text-white hover:bg-gat-midnight"
                  >
                    Accept
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleRespond(invite.id, "reject")}
                  >
                    Reject
                  </Button>
                </div>
              ) : (
                <span className="text-xs font-bold uppercase tracking-widest text-gat-steel">
                  {invite.status}
                </span>
              )}
            </div>
            <div className="mt-3 text-sm text-gat-steel">
              Invited by: {invite.invitedBy.name} ({invite.invitedBy.email})
            </div>
            <div className="text-sm text-gat-steel">
              Members: {invite.team.memberCount}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gat-off-white pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-gat-steel">
            Invites
          </p>
          <h1 className="text-3xl md:text-4xl font-heading font-black text-gat-midnight">
            Team Invites
          </h1>
        </div>

        {loading ? (
          <div className="rounded-xl bg-white p-6 border border-gat-blue/10 shadow-sm">
            Loading invites...
          </div>
        ) : (
          <div className="space-y-8">
            <section>
              <h2 className="text-lg font-heading font-bold text-gat-midnight mb-4">
                Pending
              </h2>
              {renderInvites(invites?.invites.PENDING ?? [], true)}
            </section>
            <section>
              <h2 className="text-lg font-heading font-bold text-gat-midnight mb-4">
                Accepted
              </h2>
              {renderInvites(invites?.invites.ACCEPTED ?? [], false)}
            </section>
            <section>
              <h2 className="text-lg font-heading font-bold text-gat-midnight mb-4">
                Rejected
              </h2>
              {renderInvites(invites?.invites.REJECTED ?? [], false)}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
