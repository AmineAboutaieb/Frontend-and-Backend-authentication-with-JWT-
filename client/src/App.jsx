import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { getCurrentUser } from "./api/user";
import useAuth from "./hooks/useAuth";
import RequireAuth from "./components/RequireAuth";
import Missing from "./pages/Missing";
import OnlyPublicRoute from "./components/OnlyPublicRoute";
import { Spinner } from "react-activity";
import "react-activity/dist/library.css";
import { useState } from "react";
import Unauthorized from "./pages/Unauthorized";

function App() {
  const { setAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = getCurrentUser()
      .then((response) => {
        if (!response.error) setAuth(response);
      })
      .catch((error) => {
        toast.warning(error);
      })
      .finally(() => setIsLoading(false));

    return unsubscribe;
  }, []);
  return (
    <div>
      {isLoading ? (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
          <Spinner />
        </div>
      ) : (
        <Router>
          <ToastContainer />
          <Header />
          <Routes>
            <Route element={<RequireAuth allowedRoles={["user"]} />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route element={<OnlyPublicRoute />}>
              <Route path="/signup" element={<Register />} />
            </Route>
            <Route element={<OnlyPublicRoute />}>
              <Route path="/signin" element={<Login />} />
            </Route>
            <Route path="unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<Missing />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
