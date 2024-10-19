import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CartItems = () => {
  const [cartItems, setCartItems] = useState([]);
  const userId = 'logged-in-user-id';
  const navigate = useNavigate();

  const handleVolunteer = (postId) => {
    navigate('/donate'); 
  };
  useEffect(() => {
    
    const fetchCartItems = async () => {
      try {
        const response = await fetch('http://localhost:9092/crossOriginService/items');
        const result = await response.json();
        setCartItems(result);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    
    fetchCartItems();

    const intervalId = setInterval(fetchCartItems, 100); 

   
    return () => clearInterval(intervalId);
  }, []);


  const renderCartItem = (item) => (
    <div className="card card-compact bg-base-100 w-96 shadow-xl rounded-lg overflow-hidden">
      <figure>
        <img
          src={item.image} 
          alt={item.title} 
          className="object-cover h-48 w-full" 
        />
      </figure>

<div className="card-body text-center bg-[#fbf5f2] shadow-lg rounded-lg p-6">
  <h2 className="card-title text-2xl font-bold text-[#8B4513] mb-2">{item.name}</h2>
  <p className="text-lg text-gray-500 mb-1">{item.category}</p>
  <p className="text-lg text-gray-500 mb-1">{item.gender}</p>
  <p className="text-lg text-gray-500 mb-1">{item.address}</p>
  <p className="text-lg text-gray-600 mb-4">{item.description}</p>
  <div className="card-actions justify-center">
  <button
  className="bg-gradient-to-r from-[#A0522D] to-[#8B4513] hover:from-[#8B4513] hover:to-[#5C3317] focus:outline-none focus:ring-2 focus:ring-[#A0522D] focus:ring-opacity-75 text-white py-2 px-6 rounded-lg shadow-lg transform transition-transform hover:scale-105"
  onClick={() => handleVolunteer(item.postId)}
>
  Volunteer
</button>
  </div>
</div>

    </div>
  );

  return (
    <div className="mx-auto p-6 bg-[#f0ebe3]">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#1f3e72]">Meet Our Strays: Stories of Hope and Rescue</h2>
      {cartItems.length === 0 ? (
        <p className="text-center mt-12 text-lg text-gray-600">No Stray Pets</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartItems.map((item, index) => (
            <div key={index.toString()} className="flex justify-center">
              {renderCartItem(item)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartItems;


