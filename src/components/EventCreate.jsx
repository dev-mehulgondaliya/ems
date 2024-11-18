import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // For form validation
import DashboardWrapper from '../shared/DashboardWrapper';
import { clearEventList, createEvent, setEventData } from '../redux/slice/eventSlice';
import { eventValidation } from '../validation/eventValidation';

const EventCreate = () => {
  const dispatch = useDispatch();
  
  // Redux state for handling status and errors
  const { status, error, response } = useSelector((state) => state.event);

  useEffect(() => {
    if (error) {
      alert(error); // Simple alert to display the error message
    }
  }, [error]);

  const formik = useFormik({
    initialValues: {
      eventName: '',
      eventDate: '',
      location: '',
      description: '',
    },
    validationSchema: eventValidation,  // Apply the validation schema
    onSubmit: (values) => {
      // Dispatch the form data and API call
      dispatch(setEventData(values));
      dispatch(createEvent({data:values}));
    }
  });

  useEffect(() => {
    if(response){
      dispatch(clearEventList())
    }
  }, [response])


  return (
    <DashboardWrapper>
      <h2 className="text-2xl font-semibold mb-4">Create Event</h2>
      <div className="w-full">
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Event name Input Field */}
          <div>
            <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">
              Event Name
            </label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.eventName}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {formik.touched.eventName && formik.errors.eventName && (
              <div className="text-red-500 text-sm">{formik.errors.eventName}</div>
            )}
          </div>

          {/* Event Date Input Field */}
          <div>
            <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">
              Event Date
            </label>
            <input
              type="date"
              id="eventDate"
              name="eventDate"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.eventDate}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {formik.touched.eventDate && formik.errors.eventDate && (
              <div className="text-red-500 text-sm">{formik.errors.eventDate}</div>
            )}
          </div>

          {/* Location Input Field */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.location}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {formik.touched.location && formik.errors.location && (
              <div className="text-red-500 text-sm">{formik.errors.location}</div>
            )}
          </div>

          {/* Description Input Field */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500 text-sm">{formik.errors.description}</div>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={status === 'loading'} // Disable the button if status is loading
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {status === 'loading' ? 'Creating Event...' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </DashboardWrapper>
  );
};

export default EventCreate;
