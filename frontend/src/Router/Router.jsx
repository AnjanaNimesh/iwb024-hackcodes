import {createBrowserRouter} from 'react-router-dom';
import Main from '../layout/Main';
import Post from '../Post';
import CartItems from '../CartItems';
import HomePage from '../Home';
import Login from '../components/Login'
import Signup from '../components/SignUp'
import ProfilePage from '../Profile';
import DonationForm from '../components/DonationForm'
import PaymentSuccess from '../components/PaymentSuccess'
import PaymentCancel from '../components/PaymentCancel'




const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [
        {
            path:'/',
            element:<HomePage/>
        },
        {
            path:'/post',
            element:<Post/>
        },
        {
            path:'/viewStrays',
            element:<CartItems/>
        },
        {
          path:'/donate',
          element:<DonationForm/>
      }
      ]
    },
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/signup",
      element: <Signup/>,
    },
    {
      path: "/profile",
      element: <ProfilePage/>,
    },
    {
      path: "/success",
      element: <PaymentSuccess/>,
    },
    {
      path: "/success",
      element: <PaymentCancel/>,
    }
  ]);

  export default router;