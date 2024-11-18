import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function DashboardWrapper({ children }) {
    const navigate = useNavigate();

    // Get user details from cookies
    const getLoginUserDetails = (Cookies.get('User'));

    const logout = () => {
        // Remove both Token and User cookies (and any other session-related cookies)
        Cookies.remove('Token'); // Remove the Token cookie
        Cookies.remove('User');  // Remove the User cookie

        // Redirect to login page
        navigate('/login');
    };
    const token = Cookies.get('Token');

    // Optional: Check if the user is not logged in, you can redirect them to the login page
    useEffect(() => {
        if (!token) {
            navigate('/login'); // Redirect to login if no user details found
        }
    }, [token, navigate]);

    return (
        <div className="w-screen h-screen">
            <div className="w-full h-full flex overflow-hidden">
                {/* Sidebar */}
                <div className="w-[300px] h-full flex flex-col bg-gray-300 p-4">
                    <span>LOGO</span>
                    <hr />
                    <div className="flex-grow">
                        <Sidebar user={JSON.parse(getLoginUserDetails)} />
                    </div>
                    {/* Logout button at the bottom */}
                    <button
                        onClick={logout}
                        className="mt-auto w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                        Logout
                    </button>
                </div>

                {/* Content area */}
                <div className="w-full h-full overflow-y-auto p-4">
                    <div>{children}</div>
                </div>
            </div>
        </div>
    );
}

export default DashboardWrapper;
