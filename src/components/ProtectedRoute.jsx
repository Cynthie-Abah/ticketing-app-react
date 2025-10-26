import {useEffect} from 'react'
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({children}) => {
    const navigate = useNavigate();

    //1. load the authenticated user
    const {isLoading} = useAuth();
    const user = localStorage.getItem("ticketapp_session")

    useEffect(()=> {
        if (!user) navigate('/signin')
    }, [user, navigate])

if(isLoading) return <div> <Spinner /> </div>

if (user) return  children

}

export default ProtectedRoute