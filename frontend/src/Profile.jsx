import React, { useEffect, useState } from "react";

function ProfilePage() {
    const [userData, setUserData] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false); // manage modal visibility

    useEffect(() => {
        // Fetch user data 
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleSignOut = () => {
        // Clear user data from localStorage and reset state
        localStorage.removeItem("userData");
        setUserData(null);
    };

    if (!userData) {
        return <div className="text-center text-gray-700"></div>; // Loading state
    }

    return (
        <div className="profile">
            <div className="profile-section">
<img
    src={userData.profilePhoto}
    alt="profile"
    className="profile-pic cursor-pointer rounded-full shadow-xl transition-transform duration-200 ease-in-out hover:scale-105"
    onClick={handleOpenModal}
/>

            </div> 

           

            {/* Modal */}
            {isModalOpen && (
            <dialog open className="modal modal-bottom sm:modal-middle">
    <div className="modal-box flex flex-col items-center">
        <h3 className="font-bold text-lg mb-4">Profile Details</h3>
        <img
            src={userData.profilePhoto} // Profile picture 
            alt="Profile"
            className="profile-image mb-4 rounded-full shadow-md"
            style={{ width: "100px", height: "100px" }} 
        />
        <div className="user-details text-center space-y-3">
            <p className="font-semibold text-gray-700">
                Name: <span className="font-normal text-gray-600">{userData.name}</span>
            </p>
            <p className="font-semibold text-gray-700">
                Email: <span className="font-normal text-gray-600">{userData.email}</span>
            </p>
            <p className="font-semibold text-gray-700">
                Age: <span className="font-normal text-gray-600">{userData.age}</span>
            </p>
            <p className="font-semibold text-gray-700">
                Gender: <span className="font-normal text-gray-600">{userData.gender}</span>
            </p>
            <p className="font-semibold text-gray-700">
                Address: <span className="font-normal text-gray-600">{userData.address}</span>
            </p>
            <p className="font-semibold text-gray-700">
                Mobile: <span className="font-normal text-gray-600">{userData.mobile}</span>
            </p>
        </div>

        {/*buttons*/}
        <div className="modal-action mt-4 flex justify-between w-full space-x-4">
        <button className="btn bg-[#ffb74d]  hover:bg-[#f8b044]" onClick={handleSignOut}>
                Sign Out
            </button>
            <button className="btn" onClick={handleCloseModal}>
                Close
            </button>

            </div>
        </div>
    </dialog>

            )}
        </div>
    );
}

export default ProfilePage;
