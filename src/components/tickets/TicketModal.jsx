import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { useCreateTicket } from "../../hooks/useCreateTicket";
import { useEditTicket } from "../../hooks/useEditTicket";
import { useSingleTicket } from "../../hooks/useSingleTicket";
import Spinner from "../Spinner";
import { useEffect } from "react";

export function TicketModal() {
const [ searchParams, setSearchParams ] = useSearchParams();
const action = searchParams.get("action");
const id = searchParams.get("id");

const { createTicket } = useCreateTicket();
const { editTicket } = useEditTicket();
const { ticket, isPending } = useSingleTicket(id);

const form = useForm({ defaultValues: ticket || {} });
const { handleSubmit, formState: { errors, isSubmitting }, register, reset } = form;

useEffect(() => {
  if (ticket) {
    reset(ticket);
  }
}, [ticket, reset]);

if (isPending) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center py-20">
      <Spinner />
    </div>
  );
}
    const onSubmit = async (data)=> {
      console.log(data, 'in onsubmit');

      if (action === 'edit') {
        if (!ticket.id) throw new Error('Invalid/No ID available')

        editTicket(
        { newTicketData: data, id: ticket.id },
        {
          onSuccess: () => {
            reset()
            handleClose();
          },
        }
      );
      } else {

          createTicket(
        { data },
        {
          onSuccess: () => {
            reset()
            handleClose();
          },
        }
      );

      }
      
    }

    const handleClose = () => {
    searchParams.delete("action");
    searchParams.delete("id");
    setSearchParams(searchParams);

  };

  return (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-xl border border-gray-200">
    {/* Header */}
    <div className="flex items-center justify-between p-6 border-b border-gray-200">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
        {ticket ? "Edit Ticket" : "Create Ticket"}
      </h2>
      <button
        onClick={handleClose}
        className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition"
        aria-label="Close modal"
      >
        <X className="w-5 h-5" />
      </button>
    </div>

    {/* Form */}
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Title <span className="text-red-600">*</span>
        </label>
        <input
          id="title"
          type="text"
          {...register('title', { required: 'this field is required'})}
          className={`w-full px-4 py-3 border ${
            errors.title ? "border-red-500" : "border-gray-300"
          } rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition`}
          placeholder="Enter ticket title"
          aria-invalid={errors.title ? "true" : "false"}
          aria-describedby={errors.title ? "title-error" : undefined}
        />
        {errors.title && (
          <div
            className="flex items-center gap-1 mt-2 text-red-600 text-sm"
            id="title-error"
            role="alert"
          >
            <AlertCircle className="w-4 h-4" />
            <span>{errors.title.message}</span>
          </div>
        )}
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          {...register('description')}
          rows={4}
          maxLength={90}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          placeholder="Enter ticket description (optional)"
        />
      </div>

      {/* Status & Priority */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Status <span className="text-red-600">*</span>
          </label>
          <select
            id="status"
            {...register('status', {required: 'This field is required'})}
            className={`w-full px-4 py-3 border ${
              errors.status ? "border-red-500" : "border-gray-300"
            } rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition`}
            aria-invalid={errors.status ? "true" : "false"}
            aria-describedby={errors.status ? "status-error" : undefined}
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
          {errors.status && (
            <div
              className="flex items-center gap-1 mt-2 text-red-600 text-sm"
              id="status-error"
              role="alert"
            >
              <AlertCircle className="w-4 h-4" />
              <span>{errors.status.message}</span>
            </div>
          )}
        </div>

        <div>
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Priority
          </label>
          <select
            id="priority"
            {...register('priority')}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 active:bg-blue-800 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
        {isSubmitting
        ? (action === 'edit' ? "Updating..." : "Creating...")
        : (action === 'edit' ? "Update Ticket" : "Create Ticket")}
        </button>
        <button
          type="button"
          onClick={handleClose}
          className="w-full px-6 py-3 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</div>
  );
}
