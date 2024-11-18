import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardWrapper from '../shared/DashboardWrapper';
import { getEventList } from '../redux/slice/eventSlice';

const EventList = () => {
  const dispatch = useDispatch();

  // Get events, loading status, and error state from the Redux store
  const { data: events, status, error, response } = useSelector((state) => state.event);

  // Fetch the event list on component mount
  useEffect(() => {
    dispatch(getEventList());
  }, [dispatch]);

  // Handle loading and error states
  if (status === 'loading') {
    return <DashboardWrapper>Loading events...</DashboardWrapper>;
  }

  if (status === 'failed') {
    return <DashboardWrapper>Error: {error}</DashboardWrapper>;
  }

  return (
    <DashboardWrapper>
      <h2 className="text-2xl font-semibold mb-4">Event List</h2>
      {response?.data.length === 0 ? (
        <p>No events available.</p>
      ) : (
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border-b text-left">Event Name</th>
              <th className="px-4 py-2 border-b text-left">Time</th>
              <th className="px-4 py-2 border-b text-left">Location</th>
              <th className="px-4 py-2 border-b text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {response?.data && response?.data?.map((event, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{event.eventName}</td>
                <td className="px-4 py-2 border-b">{event.eventDate}</td>
                <td className="px-4 py-2 border-b">{event.location}</td>
                <td className="px-4 py-2 border-b">{event.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </DashboardWrapper>
  );
};

export default EventList;
