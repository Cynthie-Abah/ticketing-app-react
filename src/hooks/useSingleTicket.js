import { useQuery } from "@tanstack/react-query"
import { getTicketbyId } from "../services/api";

export const useSingleTicket = (id)=> {
    const {status, data: ticket, isError, error, isPending} = useQuery({
        queryKey: [`ticket-${id}`],
        queryFn: ()=> getTicketbyId(id),
    })

    return {status, ticket, isError, error, isPending}
}


