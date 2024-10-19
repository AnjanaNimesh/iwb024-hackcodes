import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Signup({ setSignIn, setUser }) {
  const [step, setStep] = useState(1); // current step
  const [isHovered, setIsHovered] = useState(false); //the image is hovered
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    age: "",
    gender: "Male", // Default gender value
    address: "",
    mobile: "",
  });
  const [errors, setErrors] = useState({}); // Track validation errors
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState("/signupImg1.jpg"); // handle image change
  const [profilePhoto, setProfilePhoto] = useState(null);

  const navigate = useNavigate(); 

  // validate fields 
  const validateStep = () => {
    let newErrors = {};

    if (step === 1) {
      if (!signUpData.username.trim()) newErrors.username = "Name is required";
      if (!signUpData.age) newErrors.age = "Age is required";
    }

    if (step === 2) {
      if (!signUpData.address.trim()) newErrors.address = "Address is required";
      if (!signUpData.mobile.trim()) newErrors.mobile = "Mobile is required";
    }

    if (step === 4) {
      if (!signUpData.email.trim()) newErrors.email = "Email is required";
      if (!signUpData.password.trim()) newErrors.password = "Password is required";
      if (signUpData.password !== signUpData.confirm_password)
        newErrors.confirm_password = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step < 4) {
        setStep(step + 1);
      } else {
        handleSubmit(); // Trigger signup on the last step
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  //change images every 2 seconds
  useEffect(() => {
    const images = ["/signupImg1.jpg", "/signupImg2.jpg"]; 
    const intervalId = setInterval(() => {
      setImageSrc((prevImage) => (prevImage === images[0] ? images[1] : images[0]));
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePhoto(reader.result); // base64-encoded image
    };
    reader.readAsDataURL(file);
  };

  // In handleSubmit, include the profilePhoto in the request body
  async function handleSubmit() {
    setErrMsg("");
    setSuccessMsg("");

    const url = "http://localhost:9092/crossOriginService/signup";
    setLoading(true);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...signUpData, profilePhoto }), // Include the profile photo
      });

      const data = await res.json();

      if (res.ok) {
        if (data.error) {
          setErrMsg(data.error);
        } else {
          setSignUpData({
            username: "",
            email: "",
            password: "",
            confirm_password: "",
            age: "",
            gender: "Male",
            address: "",
            mobile: "",
          });
          setSuccessMsg("Sign-up successful!");
          navigate("/login");
        }
      } else {
        setErrMsg("Sign-up failed");
      }
    } catch (error) {
      setErrMsg("An error occurred during sign-up");
      console.error("Error during sign-up:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="md:w-1/2">
          <div className="hero min-h-screen">
            <img
              src={imageSrc}
            alt='Sign Up'
            className={`transition-all duration-500 ease-in-out transform ${isHovered ? 'scale-100' : 'scale-100'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
                
            />
          </div>
        </div>

        <div className="md:w-1/2">
          <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse w-full">
              <div className="card bg-base-200 w-5/6 max-w-3xl shadow-2xl">
                <form className="card-body w-full">
                  <h2 className="text-3xl text-orange font-bold text-center text-orange-400 mb-6">
                    Sign Up
                  </h2>

                  {step === 1 && (
                    <>
                      <h3 className="text-3xl text-blue font-bold text-left text-orange-300 mb-6">
                        Personal Details
                      </h3>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text-bo text-dark">
                            Name
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Name"
                          className="input input-bordered input-lg"
                          value={signUpData.username}
                          onChange={(e) =>
                            setSignUpData({
                              ...signUpData,
                              username: e.target.value,
                            })
                          }
                          required
                        />
                        {errors.username && (
                          <p className="text-red-500">{errors.username}</p>
                        )}
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-dark">Age</span>
                        </label>
                        <input
                          type="number"
                          placeholder="Age"
                          className="input input-bordered input-lg"
                          value={signUpData.age}
                          onChange={(e) =>
                            setSignUpData({
                              ...signUpData,
                              age: e.target.value,
                            })
                          }
                          required
                        />
                        {errors.age && <p className="text-red-500">{errors.age}</p>}
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-dark">Gender</span>
                        </label>
                        <div className="flex items-center space-x-4">
                          <label className="flex items-center space-x-1">
                            <input
                              type="radio"
                              name="gender"
                              className="radio radio-warning"
                              checked={signUpData.gender === "Male"}
                              onChange={() =>
                                setSignUpData({ ...signUpData, gender: "Male" })
                              }
                            />
                            <span>Male</span>
                          </label>
                          <label className="flex items-center space-x-1">
                            <input
                              type="radio"
                              name="gender"
                              className="radio radio-warning"
                              checked={signUpData.gender === "Female"}
                              onChange={() =>
                                setSignUpData({
                                  ...signUpData,
                                  gender: "Female",
                                })
                              }
                            />
                            <span>Female</span>
                          </label>
                        </div>
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <h3 className="text-3xl font-bold text-left text-blue mb-6">
                        Contact Details
                      </h3>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text-bo text-dark">
                            Address
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Address"
                          className="input input-bordered input-lg"
                          value={signUpData.address}
                          onChange={(e) =>
                            setSignUpData({
                              ...signUpData,
                              address: e.target.value,
                            })
                          }
                          required
                        />
                        {errors.address && (
                          <p className="text-red-500">{errors.address}</p>
                        )}
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-dark">
                            Mobile
                          </span>
                        </label>
                        <input
                          type="tel"
                          pattern="[0-9]{10}"
                          placeholder="Mobile"
                          className="input input-bordered input-lg"
                          value={signUpData.mobile}
                          onChange={(e) =>
                            setSignUpData({
                              ...signUpData,
                              mobile: e.target.value,
                            })
                          }
                          required
                        />
                        {errors.mobile && (
                          <p className="text-red-500">{errors.mobile}</p>
                        )}
                      </div>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <h3 className="text-3xl font-bold text-left text-orange-300 mb-6">
                        Upload Profile Picture
                      </h3>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-dark">
                            Upload a Profile Picture
                          </span>
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          className="input input-lg"
                          onChange={handlePhotoChange}
                        />
                        {profilePhoto && (
                          <img
                            src={profilePhoto}
                            alt="Profile Preview"
                            className="mt-4 rounded-full w-24 h-24 object-cover"
                          />
                        )}
                      </div>
                    </>
                  )}

                  {step === 4 && (
                    <>
                      <h3 className="text-3xl font-bold text-left text-blue mb-6">
                        Account Details
                      </h3>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-dark">Email</span>
                        </label>
                        <input
                          type="email"
                          placeholder="Email"
                          className="input input-bordered input-lg"
                          value={signUpData.email}
                          onChange={(e) =>
                            setSignUpData({
                              ...signUpData,
                              email: e.target.value,
                            })
                          }
                          required
                        />
                        {errors.email && (
                          <p className="text-red-500">{errors.email}</p>
                        )}
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-dark">
                            Password
                          </span>
                        </label>
                        <input
                          type="password"
                          placeholder="Password"
                          className="input input-bordered input-lg"
                          value={signUpData.password}
                          onChange={(e) =>
                            setSignUpData({
                              ...signUpData,
                              password: e.target.value,
                            })
                          }
                          required
                        />
                        {errors.password && (
                          <p className="text-red-500">{errors.password}</p>
                        )}
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-dark">
                            Confirm Password
                          </span>
                        </label>
                        <input
                          type="password"
                          placeholder="Confirm Password"
                          className="input input-bordered input-lg"
                          value={signUpData.confirm_password}
                          onChange={(e) =>
                            setSignUpData({
                              ...signUpData,
                              confirm_password: e.target.value,
                            })
                          }
                          required
                        />
                        {errors.confirm_password && (
                          <p className="text-red-500">
                            {errors.confirm_password}
                          </p>
                        )}
                      </div>
                    </>
                  )}

                  <div className="flex justify-between mt-6">
                    <button
                      type="button"
                      className={`btn bg-black hover:bg-gray-700 text-white ${step === 1 ? "invisible" : ""}`}
                      onClick={handleBack}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      className="btn bg-[#ffcc81] text-white hover:bg-[#ffb74d]"
                      onClick={handleNext}
                    >
                      {step === 4 ? "Submit" : "Next"}
                    </button>
                  </div>

                  {errMsg && <p className="text-red-500">{errMsg}</p>}
                  {successMsg && <p className="text-green-500">{successMsg}</p>}
                  {loading && <p className="text-orange-400">Signing up...</p>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
