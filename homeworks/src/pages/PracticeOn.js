import { useParams } from "react-router-dom"

export const PracticeOn = () => {
const {name} = useParams();
  return (<h1>{name}</h1>)
}