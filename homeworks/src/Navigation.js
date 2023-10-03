import { Link } from "react-router-dom";

const Navigation = () => {
return(
  <nav>
    <Link to="/">Questions</Link>
    <ul>
      <li><Link to="/signup">Sign up</Link></li>
      <li><Link to="/signin">Sign in</Link></li>
    </ul>
  </nav>
)
}
export default Navigation