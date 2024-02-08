
import "./App.css";
import Header from "./components/layout/Header";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "./router";

const router = createBrowserRouter(routes);
function App() {
  return (
    <>
      <Header />
      <RouterProvider router={router} />
    </>
  );
}

export default App;