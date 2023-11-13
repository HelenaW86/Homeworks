import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";

const Navigation = () => {
  const loggedIn = useSelector((state) => state?.isLoggedIn);
  const dispatch = useDispatch();
  return (
    <nav className={"navbar"}>
      <Link  to="/">Questions</Link>
      {loggedIn ? (
        <ul className="navbar-links">
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/questions">Questions</Link>
          </li>
          <li>
            <Link to="/" onClick={() => dispatch(logout())}>
           Log out
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="navbar-links">
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
          <li>
            <Link to="/signin">Sign in</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};
export default Navigation;
