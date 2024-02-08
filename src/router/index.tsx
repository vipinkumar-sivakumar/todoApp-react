import { Navigate, RouteObject } from "react-router-dom";
import Home from "../components/layout/Home";
import MyForm from "../view/UpdateTodo";
  
const routes : RouteObject[] = [
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/Add",
      element: <MyForm />
    },
    {
      path: "/Edit/:id",
      element: <MyForm />
    },
    {
      path: "/",
      element:<Navigate to="/home" replace />
    }

]

export default routes;
