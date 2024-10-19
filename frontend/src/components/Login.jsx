import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Login({ setSignIn,
  setUser,
}) {
// handling form data
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [errMsg, setErrMsg] = useState("");
const [successMsg, setSuccessMsg] = useState("");
const [loading, setLoading] = useState(false);


const navigate = useNavigate(); 

async function setCookie(username) {
  const cookieName = "username"; // Name of the cookie
  const cookieValue = username; // Username from sign in response
  const expirationDays = 7; // Cookie expire

  // Calculate expiration date
  const date = new Date();
  date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000); // Convert days
  const expires = "expires=" + date.toUTCString();

  // Set the cookie with the name, value, and expiration
  document.cookie = `${cookieName}=${cookieValue};${expires};path=/;SameSite=Lax;Secure`;
}


const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true); // Set loading state 
  setErrMsg(''); // Clear previous error message
  setSuccessMsg(''); // Clear previous success message

  try {
    const response = await axios.post('http://localhost:9092/crossOriginService/signin', {
      email,
      password,
    });

    // Store the user data in localStorage
    localStorage.setItem('userData', JSON.stringify(response.data));

    // Set success message
    setSuccessMsg('Login successful! Redirecting...');
    await setCookie(response.data.username);
    navigate('/');
  
    // Redirect to home page
    
  } catch (err) {
    setErrMsg('Login failed. Please check your credentials.');
  } finally {
    setLoading(false); // Reset loading state 
  }
};



  // handle image change
  const [imageSrc, setImageSrc] = useState("/loginImg1.jpg");

  useEffect(() => {
    // Array of images to loop through
    const images = ["/loginImg1.jpg", "/loginImg2.jpg"];
    
    // change the image every 3 seconds
    const intervalId = setInterval(() => {
      setImageSrc((prevImage) =>
        prevImage === images[0] ? images[1] : images[0]
      );
    }, 2000);

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    
    <div className='bg-white min-h-screen'>
      <div className='flex flex-col md:flex-row items-center justify-between gap-10'>
        {/* Image section */}
        <div className='md:w-1/2'>
          <div className='hero h-full w-full mx-10'>
            {/* Image with auto-changing effect */}
            <img
              src={imageSrc}
              alt='dog'
              className='w-full h-full object-cover transition-transform duration-300 hover:scale-950'
            />
          </div>
        </div>

        {/* Form section */}
        <div className='md:w-1/2'>
          <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse w-full">
              {/*form size */}
              <div className="card bg-base-200 w-5/6 max-w-3xl shadow-2xl">
                <form className="card-body w-full" onSubmit={handleSubmit}>
                  {/*Login Title */}
                  <h2 className="text-3xl font-bold text-center text-blue mb-6">Login</h2>
                  {successMsg && <div className="text-green-500">{successMsg}</div>}
                  {errMsg && <div className="text-red-500">{errMsg}</div>}

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text-bo text-dark">Email</span>
                    </label>
                    <input type="email" placeholder="email" className="input input-bordered input-lg"  value={email}
                      onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-dark">Password</span>
                    </label>
                    <input type="password" placeholder="password" className="input input-bordered input-lg"  value={password}
                      onChange={(e) => setPassword(e.target.value)} required />
                    <label className="label">
                      <p className='label-text text-orange-400'>
                        Don't have an account? <a href='/signup' className="label-text-alt link link-hover text-red-600 hover:text-red-800 transition-colors duration-300 ">SignUp Now</a>
                      </p>
                    </label>
                  </div>
                  <div className="form-control mt-6">
                    <button type="submit" className="btn bg-[#ffcc81] text-white hover:bg-[#ffb74d] text-lg py-3"  disabled={loading}>{loading ? "Logging In..." : "Login"}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
