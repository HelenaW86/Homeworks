import { useSelector } from "react-redux/es/hooks/useSelector"

const Profile = () => {
const user = useSelector((state) => state.auth.user)
  return(
    <div>
      {user ? <h1 className="username">{user}!🐨</h1> : null}
    </div>
  )
}
export default Profile