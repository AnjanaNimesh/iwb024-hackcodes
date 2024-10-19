import { useState } from 'react'
import './App.css'
import router from "./Router/Router";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";

function App() {
  
  return (
  <RouterProvider router={router} />
  )
}

export default App
