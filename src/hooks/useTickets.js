import { useQuery } from "@tanstack/react-query"
import { getTickets } from "../services/api";

export const useTickets = ()=> {
    const {status, data: tickets, isError, error, isPending} = useQuery({
        queryKey: ['tickets'],
        queryFn: getTickets,
    })

    return {status, tickets, isError, error, isPending}
}




