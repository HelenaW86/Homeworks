import { useSelector } from "react-redux/es/hooks/useSelector"

const Profile = () => {
const user = useSelector((state) => state.auth.user)
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