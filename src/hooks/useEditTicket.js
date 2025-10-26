import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { editTicket as editTicketApi} from '../services/api'

export function useEditTicket() {
    const queryClient = useQueryClient()

    const {mutate: editTicket, isPending: isEditing} = useMutation({
        mutationFn: ({newTicketData, id})=> editTicketApi({...newTicketData}, id),
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
return {editTicket, isEditing}
}

