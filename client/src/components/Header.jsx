import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { logoutUser } from "../api/user";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Header() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await logoutUser();
      if (response.error) toast.error(response.error);
      else {
        toast.success(response.message);
        setAuth(null);
        navigate("/signin");
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <Link className="navbar-brand" to="/">
        Auth App
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNav"
      >
        <ul className="navbar-nav">
          {!auth && (
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                Sign up
              </Link>
            </li>
          )}
          {!auth && (
            <li className="nav-item">
              <Link className="nav-link" to="/signin">
                Sign in
              </Link>
            </li>
          )}
          {auth && (
            <li className="nav-item">
              <span className="nav-link" role="button" onClick={handleLogout}>
                Sign out
              </span>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
