import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { signupValidation } from '../validation/signupValidation';
import { adminSignup, clearSignupForm, setSignupForm, signupUser } from '../redux/slice/signupSlice';

function Home() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const userToken = cookies.get('Token'); // Get the token from cookies

  // Redirect if the user is already logged in
  useEffect(() => {
    if (userToken) {
      navigate('/dashboard/overview') // Redirect to dashboard if the token exists
    }
  }, [userToken, navigate]);

  const dispatch = useDispatch();
  const location = useLocation()

  const { status, error, response} = useSelector((state) => state.signup);

  // Show alert if there is an error
  useEffect(() => {
    if (error) {
      alert(error); // Simple alert to display the error message
    }
  }, [error]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: signupValidation,  // Apply the validation schema
    onSubmit: (values) => {
      // Dispatch the form data and API call
      dispatch(setSignupForm(values));
      if(location.pathname === "/admin/signup"){
        dispatch(adminSignup({data:values}));
      }else{
        dispatch(signupUser({data:values}));
      }
    
    }
  });

  useEffect(()=>{
    if(response){
      dispatch(clearSignupForm())
      navigate('/login')
    }
  },[response])

  return (
    <div className='flex justify-center items-center gap-2 p-4'>
      <div className="max-w-md mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Email Input Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}
          </div>

          {/* Password Input Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={status === 'loading'} // Disable the button if status is loading
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {status === 'loading' ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>

          <span className=''>or</span>
          <div>
            <button
              type="button"
              onClick={()=>navigate(location.pathname === '/admin/signup' ? '/admin/login' : '/login')}
              disabled={status === 'loading'} // Disable the button if status is loading
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;
