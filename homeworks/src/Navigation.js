import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./store/authSlice";

const Navigation = () => {
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  return (
    <nav>
      <Link to="/">Questions</Link>
      {loggedIn ? (
        <ul>
          <li>
            <Link to="/profile">Profile</Link>
          </li>{" "}
          <li>
            <Link to="/" onClick={() => dispatch(logout())}>
           Log out
            </Link>
          </li>
        </ul>
      ) : (
        <ul>
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
