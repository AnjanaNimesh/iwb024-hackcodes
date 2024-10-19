import {createBrowserRouter} from 'react-router-dom';
import Main from '../layout/Main';
import Post from '../Post';
import CartItems from '../CartItems';




const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [
        // {
        //     path:'/',
        //     element:<HomePage/>
        // },
        {
            path:'/post',
            element:<Post/>
        },
        {
            path:'/viewStrays',
            element:<CartItems/>
        }
      ]
    },
    // {
    //   path: "/login",
    //   element: <Login/>,
    // },
    // {
    //   path: "/signup",
    //   element: <Signup/>,
    // },
    // {
    //   path: "/profile",
    //   element: <ProfilePage/>,
    // }
  ]);

  export default router;