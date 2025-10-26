import { Menu, Ticket } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';
import SignoutModal from '../SignoutModal';

export default function Header() {
  const {user} = useAuth();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
    { open &&
      <SignoutModal setOpen={setOpen} />
    }

    <header className="bg-white shadow-sm">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <Ticket className="w-6 h-6 text-blue-600" />
            <span>TicketFlow</span>
          </Link>

          {/* DESKTOP HEADER */}
          <nav className="hidden sm:flex items-center gap-6">
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-gray-900 font-medium">
                  Dashboard
                </Link>
                <Link to="/dashboard/tickets" className="text-gray-700 hover:text-gray-900 font-medium">
                  Tickets
                </Link>
                <button
                  onClick={()=> setOpen(true)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/signin" className="text-gray-700 hover:text-gray-900 font-medium">
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Get Started
                </NavLink>
              </>
          )}
          </nav>

          {/* MOBILE HEADER */}
          {/* Mobile hamburger */}
            <div className="sm:hidden relative flex items-center">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-700 text-2xl focus:outline-none"
              >
              <Menu />
              </button>
            </div>

        {/* Mobile nav dropdown */}
        {menuOpen && (
          <div className="sm:hidden absolute right-2 top-12 bg-white border-t border-gray-200 shadow-md rounded-xl">
            <nav className="flex flex-col gap-4 p-4">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-gray-700 hover:text-gray-900 font-medium"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/dashboard/tickets"
                    className="text-gray-700 hover:text-gray-900 font-medium"
                    onClick={() => setMenuOpen(false)}
                  >
                    Tickets
                  </Link>
                  <button
                    onClick={() => { setOpen(true); setMenuOpen(false); }}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/signin"
                    className="text-gray-700 hover:text-gray-900 font-medium"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    onClick={() => setMenuOpen(false)}
                  >
                    Get Started
                  </NavLink>
                </>
              )}
            </nav>
          </div>
        )}

        </div>
      </div>
    </header>

    </>
  );
}
