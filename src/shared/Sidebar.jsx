import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar({ user }) {

  const location = useLocation();

  const sideBarOption = [
    { name: "Create Event", href: "/dashboard/eventCreate", role: 'admin' },
    { name: "overview", href: "/dashboard/overview", role: 'user' },
    { name: "Event List", href: "/dashboard/eventList", role: 'user' },
  ];

  return (
    <div className='flex flex-col gap-2 mt-3'>
      {
        sideBarOption.map((opt) => {
          // If there is a role, only show it if the user's role matches
          if (!opt.role || user?.role === opt.role) {
            return (
              <Link
                key={opt.href} // Unique key based on href
                className={`${location.pathname === opt.href ? 'bg-black text-white hover:bg-gray-800' : ''} p-2 rounded duration-300`}
                to={opt.href}
              >
                {opt.name}
              </Link>
            );
          }
          return null; // If role doesn't match, return nothing
        })
      }
    </div>
  );
}

export default Sidebar;
