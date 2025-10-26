import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { deleteTicket as deleteTicketApi} from '../services/api'

export default function useDeleteTicket() {
    const queryClient = useQueryClient()

    const {mutate: deleteTicket, isPending: isDeleting} = useMutation({
        mutationFn: ({id})=> deleteTicketApi(id),
        onSuccess: ()=>{
        queryClient.invalidateQueries({
            queryKey: ['tickets']
        })
        },
        onError: (error)=>{
        toast.error(error.message)
        }
    } )
return {deleteTicket, isDeleting}
}

