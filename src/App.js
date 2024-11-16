import React, {lazy, Suspense} from "react";
import ReactDOM from "react-dom/client";
import  Header from "./components/Header"
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from './components/Error';
import RestaurantMenu from "./components/RestaurantMenu";
import Cart from "./Cart";
// import Grocery from "./components/Grocery";
// we will use lazy loading here for grocery
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const Grocery = lazy(()=>import("./components/Grocery"));

const About = lazy(()=>import("./components/About"));

const AppLayout = () => {
return (
  <div className="app">
    <Header />
    <Outlet />
  </div>
);
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />
      },
      {
        path: "/about",
        element: <Suspense fallback={<h1>Loading...</h1>}> <About /></Suspense>,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/grocery",
        element: <Suspense fallback={<h1>Loading...</h1>}> <Grocery /></Suspense>,
      },
      {
        path: "/restaurants/:resId",  // Corrected path
        element: <RestaurantMenu />,
      },
      {
        path: "/Cart",
        element: <Cart />,
      }
    ],
    errorElement: <Error />
  },

]);

// Render the app to the DOM
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
