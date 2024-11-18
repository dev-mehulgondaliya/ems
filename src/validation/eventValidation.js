import * as Yup from 'yup';  // Import Yup for validation

const eventValidation = Yup.object().shape({
    eventName: Yup.string().required('Event name is required'),
    eventDate: Yup.date().required('Event time is required'),
    location: Yup.string().required('Location is required'),
    description: Yup.string().required('Description is required'),
  });

export {
    eventValidation
}