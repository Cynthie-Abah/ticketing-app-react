import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Ticket as TicketIcon, TrendingUp, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import Spinner from '../../components/Spinner'
import { useTickets } from '../../hooks/useTickets';
import { StatCard } from '../../components/StatCard';

export default function Home() {
  const { user } = useAuth();
  const {tickets, isPending, error} = useTickets();

  if (!user) return null;
  if (isPending) return <div className="min-h-screen w-full flex items-center justify-center py-20"> <Spinner /> </div>
  if (error) return <div className="min-h-screen w-full flex items-center justify-center py-20"> <h2>Failed to load tickets. Please reload.</h2> </div>

  const totalTickets = tickets.length;
  const openTickets = tickets.filter((t) => t.status === 'open').length;
  const inProgressTickets = tickets.filter((t) => t.status === 'in_progress').length;
  const closedTickets = tickets.filter((t) => t.status === 'closed').length;

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-gray-50 to-blue-50 overflow-y-scroll">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's an overview of your tickets.</p>
        </div>

          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <StatCard
                icon={<TicketIcon className="w-8 h-8 text-blue-600" />}
                title="Total Tickets"
                value={totalTickets}
                bgColor="bg-blue-50"
                borderColor="border-blue-200"
              />
              <StatCard
                icon={<Clock className="w-8 h-8 text-green-600" />}
                title="Open Tickets"
                value={openTickets}
                bgColor="bg-green-50"
                borderColor="border-green-200"
              />
              <StatCard
                icon={<TrendingUp className="w-8 h-8 text-amber-600" />}
                title="In Progress"
                value={inProgressTickets}
                bgColor="bg-amber-50"
                borderColor="border-amber-200"
              />
              <StatCard
                icon={<CheckCircle2 className="w-8 h-8 text-gray-600" />}
                title="Resolved"
                value={closedTickets}
                bgColor="bg-gray-50"
                borderColor="border-gray-200"
              />
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link
                  to="/dashboard/tickets"
                  className="group bg-linear-to-br from-blue-500 to-blue-700 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">Manage Tickets</h3>
                      <p className="text-blue-100">View, create, edit, and delete tickets</p>
                    </div>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>

                <Link
                  to="/dashboard/tickets?action=create"
                  className="group bg-linear-to-br from-green-500 to-green-700 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">Create New Ticket</h3>
                      <p className="text-green-100">Start tracking a new issue</p>
                    </div>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>
            </div>

            {tickets.length > 0 && (
              <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Tickets</h2>
                <div className="space-y-4">
                  {tickets.slice(0, 5).map((ticket) => (
                    <div
                      key={ticket.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{ticket.title}</h3>
                        <p className="text-sm text-gray-600">
                          {new Date(ticket.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          ticket.status === 'open'
                            ? 'bg-green-100 text-green-800'
                            : ticket.status === 'in_progress'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {ticket.status.replace('_', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/dashboard/tickets"
                  className="mt-6 inline-block text-blue-600 hover:text-blue-700 font-semibold"
                >
                  View all tickets →
                </Link>
              </div>
            )} 
          </>
      </div>
    </div>
  );
}
