import prisma from "@/lib/db";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/authCookie";
import { verifySession } from "@/lib/session";
import { ShoppingCart, ClipboardList, CheckCircle, Mail, CalendarDays, Users } from "lucide-react";

export default async function DashboardPage() {
  const newSession = await getAuthSession();
  const legacySession = await verifySession();
  const session = newSession ?? legacySession;

  if (!session?.id) {
    redirect("/auth/signin");
  }

  const userId = session.id as string;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, collegeName: true },
  });

  if (!user) redirect("/auth/signin");

  const [cartCount, activeOrderCount, registrationCount, pendingInviteCount] =
    await Promise.all([
      prisma.cartItem.count({ where: { userId } }),
      prisma.order.count({
        where: {
          userId,
          status: { in: ["PENDING_PAYMENT", "PAYMENT_SUBMITTED"] },
        },
      }),
      prisma.registration.count({ where: { userId } }),
      prisma.teamInvite.count({
        where: { invitedUserId: userId, status: "PENDING" },
      }),
    ]);

  const cards = [
    {
      label: "Events Registered",
      count: registrationCount,
      href: null,
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
    },
    {
      label: "Cart Items",
      count: cartCount,
      href: "/cart",
      icon: ShoppingCart,
      color: "text-gat-blue",
      bg: "bg-gat-blue/5",
      border: "border-gat-blue/20",
    },
    {
      label: "Active Orders",
      count: activeOrderCount,
      href: "/orders",
      icon: ClipboardList,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
    },
    {
      label: "Pending Invites",
      count: pendingInviteCount,
      href: "/invites",
      icon: Mail,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-200",
    },
  ];

  return (
    <div className="min-h-screen bg-gat-off-white pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Welcome header */}
        <div className="mb-10">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-gat-steel mb-1">
            Dashboard
          </p>
          <h1 className="text-3xl md:text-4xl font-heading font-black text-gat-midnight">
            Welcome back, {user.name.split(" ")[0]}!
          </h1>
          <p className="text-sm text-gat-steel mt-1">{user.collegeName}</p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {cards.map(({ label, count, href, icon: Icon, color, bg, border }) => {
            const inner = (
              <div
                className={`rounded-xl border ${border} ${bg} p-5 flex flex-col gap-3 h-full transition-all hover:shadow-md`}
              >
                <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center border ${border}`}>
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>
                <div>
                  <p className="text-3xl font-heading font-black text-gat-midnight">
                    {count}
                  </p>
                  <p className="text-xs font-semibold text-gat-steel mt-0.5 uppercase tracking-widest">
                    {label}
                  </p>
                </div>
                {href && (
                  <p className={`text-xs font-bold ${color} mt-auto`}>
                    View →
                  </p>
                )}
              </div>
            );
            return href ? (
              <Link key={label} href={href} className="block">
                {inner}
              </Link>
            ) : (
              <div key={label}>{inner}</div>
            );
          })}
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-xl border border-gat-blue/10 shadow-sm p-6">
          <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-gat-steel mb-4">
            Quick Links
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/events"
              className="flex items-center gap-4 rounded-xl border border-gat-blue/20 bg-gat-blue/5 hover:bg-gat-blue/10 px-5 py-4 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-gat-blue/10 flex items-center justify-center shrink-0">
                <CalendarDays className="h-5 w-5 text-gat-blue" />
              </div>
              <div>
                <p className="font-heading font-bold text-gat-midnight group-hover:text-gat-blue transition-colors">
                  Browse Events
                </p>
                <p className="text-xs text-gat-steel mt-0.5">
                  Add events to your cart
                </p>
              </div>
            </Link>

            <Link
              href="/teams"
              className="flex items-center gap-4 rounded-xl border border-gat-blue/20 bg-gat-blue/5 hover:bg-gat-blue/10 px-5 py-4 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-gat-blue/10 flex items-center justify-center shrink-0">
                <Users className="h-5 w-5 text-gat-blue" />
              </div>
              <div>
                <p className="font-heading font-bold text-gat-midnight group-hover:text-gat-blue transition-colors">
                  Manage Teams
                </p>
                <p className="text-xs text-gat-steel mt-0.5">
                  Create or join a team
                </p>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}


