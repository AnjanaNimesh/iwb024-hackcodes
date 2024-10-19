import React, { useState, useEffect } from 'react';
import './post.css';
import FrameImg from './assets/Images/formimg.png'; 
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const Post = () => {
  const [cartItem, setCartItem] = useState({
    name: '',
    category: '',
    gender: '',
    weight: '',
    address: '',
    description: '',
    image: ''
  });
  const [imagePreview, setImagePreview] = useState('');
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCartItems = () => {
      const storedItems = localStorage.getItem('cartItems');
      if (storedItems) {
        setCartItems(JSON.parse(storedItems));
      }
    };

    loadCartItems();
  }, []);

  const handleChange = (name, value) => {
    setCartItem({ ...cartItem, [name]: value });
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setCartItem({ ...cartItem, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview('');
    setCartItem({ ...cartItem, image: '' });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const exists = cartItems.some(item => item.name === cartItem.name);
    if (exists) {
      toast.error('This item is already in the cart.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:9092/crossOriginService/addItem', cartItem, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (response.status === 200 || response.status === 201) {
        const updatedCartItems = [...cartItems, cartItem];
        setCartItems(updatedCartItems);
  
        
        const optimizedCartItems = updatedCartItems.map(item => ({
          name: item.name,
          category: item.category,
          gender: item.gender,
          weight: item.weight,
          address: item.address,
          description: item.description,
          image: item.image ? item.image.substring(0, 100) : '' 
        }));
  
        localStorage.setItem('cartItems', JSON.stringify(optimizedCartItems));
  
        toast.success('Item added to cart successfully!');
        setCartItem({ name: '', category: '', gender: '', weight: '', address: '', description: '', image: '' });
        setImagePreview('');
      } else {
        toast.error(`Unexpected response from the server. Status: ${response.status}`);
        console.log(response);
      }
    } catch (error) {
      console.error('Error adding item to cart:', error.response ? error.response.data : error.message);
      toast.error('Error adding item to cart. Please check the console for details.');
    }
  };
  

  return (
  
    <div className="main">
      <div className="container">
        <h2>Add Pet Details</h2>
        <div className="header-image">
          <img src={FrameImg} alt="Decorative Frame" className="frame-img" />
        </div>

        <div className="mb-8">
          {!imagePreview ? (
            <button className="button1" onClick={() => document.getElementById('imageInput').click()}>
              Pick an Image
            </button>
          ) : (
            <div className="image-preview-container">
              <p className="text-gray-600">Image Preview:</p>
              <img src={imagePreview} alt="Preview" className="image-preview" />
              <div className="image-actions">
                <button className="button1" onClick={() => document.getElementById('imageInput').click()}>
                  Change Image
                </button>
                <button className="button1 remove-button" onClick={handleRemoveImage}>
                  Remove Image
                </button>
              </div>
            </div>
          )}
          <input
            type="file"
            id="imageInput"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <div className="mb-4">
          <label>Pet Name:</label>
          <input
            type="text"
            className="input"
            placeholder="Enter pet name"
            value={cartItem.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label>Category:</label>
          <select
            className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            value={cartItem.category}
            onChange={(e) => handleChange('category', e.target.value)}
          >
            <option value="">Select category</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
          </select>
        </div>

        <div className="mb-4">
          <label>Gender:</label>
          <select
            className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            value={cartItem.gender}
            onChange={(e) => handleChange('gender', e.target.value)}
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="mb-4">
          <label>Address:</label>
          <input
            type="text"
            className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter address"
            value={cartItem.address}
            onChange={(e) => handleChange('address', e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label>Description:</label>
          <textarea
            className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter description"
            value={cartItem.description}
            onChange={(e) => handleChange('description', e.target.value)}
            required
          />
        </div>

        <button className="submit-button" onClick={handleSubmit}>
          Add Pet
        </button>
        <ToastContainer />
      </div>
    </div>

  );
};

export default Post;

