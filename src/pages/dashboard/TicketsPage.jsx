import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTickets } from '../../hooks/useTickets';
import Spinner from '../../components/Spinner';
import { TicketModal } from '../../components/tickets/TicketModal';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import DeleteModal from '../../components/DeleteModal';

export default function TicketsPage() {

    const [deleteModal, setDeleteModal] = useState(false);
    const [ticketToDelete, setTicketToDelete] = useState(false)
    const { user } = useAuth();
    const {tickets, isPending, error} = useTickets();
    const navigate = useNavigate()

    // const [searchTerm, setSearchTerm] = useState('');
    // const [filterStatus, setFilterStatus] = useState('all');

    const [searchParams] = useSearchParams();
    const action = searchParams.get("action");

    const handleEdit =(ticketId)=> {
    navigate(`/dashboard/tickets?action=edit&id=${ticketId}`);
    }

    if (isPending) return <div className="min-h-screen w-full flex items-center justify-center py-20"> <Spinner /> </div>
    if (error) return <div className="min-h-screen w-full flex items-center justify-center py-20"> <h2>Failed to load tickets. Please reload.</h2> </div>

  const handleDelete = (ticket) => {
    setTicketToDelete(ticket)
    setDeleteModal(true)
  };

  // const filteredTickets = tickets.filter((ticket) => {
  //   const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesFilter = filterStatus === 'all' || ticket.status === filterStatus;
  //   return matchesSearch && matchesFilter;
  // });

  if (!user) {
    return null;
  }

  return (
    <section className="min-h-screen overflow-y-scroll w-full bg-linear-to-br from-gray-50 to-blue-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-start sm:items-center justify-between gap-4 mb-8">

          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Ticket Management</h1>
            <p className="text-gray-600">Create, view, edit, and manage all your tickets</p>
          </div>

          <Link
            to={'/dashboard/tickets?action=create'}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            Create Ticket
          </Link>
        </div>

        {/* <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label="Search tickets"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Filter by status"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div> */}

        { tickets.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
            <p className="text-gray-500 text-lg">
              {/* {searchTerm || filterStatus !== 'all' ? 'No tickets match your search.' : 'No tickets yet. Create your first ticket to get started!'} */}
              No tickets yet. Create your first ticket to get started!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                onEdit={()=>handleEdit(ticket.id)}
                onDelete={()=>handleDelete(ticket)}
              />
            ))}
          </div>
        )} 
      </div>

      {action  &&  <TicketModal/> } 
      {deleteModal  &&  <DeleteModal ticket={ticketToDelete} setDeleteModal={setDeleteModal} /> } 
    </section>
  );
}

function TicketCard({ ticket, onEdit, onDelete }) {
  const statusColors = {
    open: 'bg-green-100 text-green-800',
    in_progress: 'bg-amber-100 text-amber-800',
    closed: 'bg-gray-100 text-gray-800',
  };

  const priorityColors = {
    low: 'text-gray-600',
    medium: 'text-blue-600',
    high: 'text-red-600',
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[ticket.status]}`}
        >
          {ticket.status.replace('_', ' ').toUpperCase()}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(ticket)}
            className="text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-colors"
            aria-label="Edit ticket"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(ticket)}
            className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="Delete ticket"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{ticket.title}</h3>

      {ticket.description && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{ticket.description}</p>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span className={`text-sm font-medium ${priorityColors[ticket.priority]}`}>
          {ticket.priority.toUpperCase()} Priority
        </span>
        <span className="text-xs text-gray-500">
          {new Date(ticket.created_at).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}


