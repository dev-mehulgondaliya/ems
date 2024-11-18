import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Ensure you're importing from 'react-router-dom'
import { Cookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { adminlogin, clearLoginForm, loginUser, setloginForm } from '../redux/slice/LoginSlice';
import { useFormik } from 'formik';
import { loginValidation } from '../validation/loginValidation';

function Home() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const userToken = cookies.get('Token'); // Get the token from cookies

  // Redirect if the user is already logged in
  useEffect(() => {
    if (userToken) {
      navigate('/dashboard/overview') // Redirect to dashboard if the token exists
    }
  }, [userToken, navigate]); // Only run this effect when userToken or navigate changes

  const dispatch = useDispatch();
  const location = useLocation()

  const cookie = new Cookies()

  const { status, error, response} = useSelector((state) => state.login);

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
    validationSchema: loginValidation,  // Apply the validation schema
    onSubmit: (values) => {
      // Dispatch the form data and API call
      dispatch(setloginForm(values));
      if(location.pathname === "/admin/login"){
        dispatch(adminlogin({data:values}));
      }else{
        dispatch(loginUser({data:values}));
      }
    }
  });

  useEffect(()=>{
    if(response){
      cookie.set('Token', response.data.token)
      cookie.set('User', response.data.user)
      dispatch(clearLoginForm())
      navigate('/dashboard/overview')
    }
  },[response])

  return (
    <div className='flex justify-center items-center gap-2 p-4'>
          <div className='flex justify-center items-center gap-2 p-4'>
      <div className="max-w-md mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
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
              {status === 'loading' ? 'Login...' : 'Login'}
            </button>
          </div>
          <span className=''>or</span>
          <div>
            <button
              type="button"
              onClick={()=>navigate(location.pathname === '/admin/login' ? '/admin/signup' : '/signup')}
              disabled={status === 'loading'} // Disable the button if status is loading
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
                Sign Up
            </button>
          </div>

        </form>
      </div>
    </div>
      
    </div>
  );
}

export default Home;
