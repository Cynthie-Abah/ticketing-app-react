import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { createTicket as createTicketApi} from '../services/api'

export function useCreateTicket() {
    const queryClient = useQueryClient()

    const {mutate: createTicket, isPending: isCreating} = useMutation({
        mutationFn: createTicketApi,
        onSuccess: ()=>{
        toast.success("New TICKET CREATED SUCCESFULLY")
        
        queryClient.invalidateQueries({
            queryKey: ['tickets']
        })
        },
        onError: (error)=>{
        toast.error(error.message)
        }
    } )
return {createTicket, isCreating}
}

