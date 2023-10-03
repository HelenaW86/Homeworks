import { useLocation } from "react-router-dom"

const Profile = () => {
  const location = useLocation();
  const user = location.state
  return(
    <div>
      <h1>
        Profile
      </h1>
      {user ? <h2>Hi {user}!</h2> : null}
    </div>
  )
}
export default Profile