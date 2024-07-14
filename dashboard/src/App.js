import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
import Parse from 'parse';
import Main from "./pages/Main";
import Coupons from "./pages/Coupons";
import NewCoupon from "./pages/NewCoupon";
import EditCoupon from "./pages/EditCoupon";
import Redeemed from "./pages/Redeemed";
import Redeem from "./pages/Redeem";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/main",
    element: <Main />,
    children: [
      { 
        path: "coupons", 
        element: <Coupons /> 
      },
      { 
        path: "newcoupon", 
        element: <NewCoupon /> 
      },
      { 
        path: "editcoupon/:id", 
        element: <EditCoupon /> 
      },
      { 
        path: "redeemed/:id", 
        element: <Redeemed /> 
      },
      { 
        path: "redeem/:id", 
        element: <Redeem /> 
      },
    ]
  },
]);

function App() {
  Parse.initialize(process.env.REACT_APP_APPID, process.env.REACT_APP_JSKEY);
  Parse.serverURL = process.env.REACT_APP_SERVER
  return (
    <RouterProvider router={router} />
  );
}

export default App;
