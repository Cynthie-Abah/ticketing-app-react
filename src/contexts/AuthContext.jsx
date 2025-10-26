import { createContext, useContext, useState } from 'react';
import { userEmailLogin, userSignUp } from '../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(localStorage.getItem('ticketapp_session'));
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signIn = async (email, password) => {
    setLoading(true)
    try {
      const data = await userEmailLogin(email, password);
      if (data) {
        setIsAuthenticated(true);
        localStorage.setItem("ticketapp_session", JSON.stringify(data));
        toast.success("Login successful!");
        navigate('/dashboard')
        setTimeout(() => {
        window.location.reload();
      }, 300);
        console.log(data);
        
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }

  };

  const signUp = async (email, password) => {
  setLoading(true)
    try {
      const data = await userSignUp(email, password);
      if (data) {
        setIsAuthenticated(true);
        localStorage.setItem("ticketapp_session", JSON.stringify(data));
        toast.success("Sign up successful!");
        navigate('/dashboard')
        setTimeout(() => {
        window.location.reload();
      }, 300);
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  };

const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error.message || "Error logging out");
      return;
    }

    // Clear user session
    localStorage.removeItem("ticketapp_session");
    setUser(null)
    setIsAuthenticated(false);

    toast.success("You’ve been logged out successfully!");
    navigate('/signin')

  } catch (err) {
    console.error("Logout failed:", err);
    toast.error("Unexpected error logging out");
  }
};

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
