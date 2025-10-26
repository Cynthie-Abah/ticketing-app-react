import toast from "react-hot-toast";
import useDeleteTicket from "../hooks/useDeleteTicket";

export default function DeleteModal({ticket, setDeleteModal}) {
    const {deleteTicket} = useDeleteTicket();

    const onClose  =()=>{
        setDeleteModal(false)
    }

    const onConfirm =()=>{
        deleteTicket(
        { id: ticket.id },
        {
        onSuccess: () => {
            toast.success(`Successfully deleted ${ticket.title}`)
            onClose()
        },
        }
    );
    }

return (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-md border border-gray-200">
    {/* Header */}
    <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Delete Ticket</h2>
        <button
        onClick={onClose}
        className="text-gray-500 cursor-pointer hover:text-gray-700 transition-colors"
        >
        ✕
        </button>
    </div>

    {/* Body */}
    <div className="p-6 text-gray-700">
        Are you sure you want to delete <span className="font-semibold">{ticket.title}</span>? This action cannot be undone.
    </div>

    {/* Footer */}
    <div className="flex justify-end gap-4 p-6 border-t border-gray-200">
        <button
        onClick={onClose}
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
        >
        Cancel
        </button>
        <button
        onClick={onConfirm}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
        Delete
        </button>
    </div>
    </div>
</div>
);
};

