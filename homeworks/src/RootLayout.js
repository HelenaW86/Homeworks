import Navigation from "./components/Navigation";
import { Outlet } from "react-router-dom";

const RootLayou = () => {
  return(
<div>
  <Navigation/>
  <Outlet/>
</div>
  )
}
export default RootLayou