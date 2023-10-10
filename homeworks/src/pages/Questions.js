import { useEffect, useState } from "react"
// import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector"
import axios from "axios"
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { getQuestions } from "../store/authSlice";
export const Questions = () => {
  // const dispatch = useDispatch();
  // const username = useSelector((state) => state.auth.user);
  // // const questions = useSelector((state) => state.auth.questions);
  // // console.log(questions)
  // // const error = useSelector((state) => state.auth.error)
  const navigate= useNavigate();
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const[theme, setTheme] = useState()
  useEffect(() => {
    axios.get('http://localhost:8080/getQuestions', {params: {theme}})
    .then(res => {
      setQuestions(res.data)
    })
    .catch(err => setError('Couldn`t fetch questions'))
  },[theme])

  // const getQ = () => {
  //   dispatch(getQuestions({theme}));
  // }
    

  const themes = [
    "Matte", "Svenska" ,"Engelska", "Geografi"
  ]
  return(
  <>
  <h1 className="username">? questions ?</h1>
  <div style={{width: "270px", margin: "auto"}}>
    {themes.map((t, i) => 
      <button className="theme-btn" key={i} onClick={() => {setTheme(t)}}>{t}</button>
    )}
    {
      questions && <div>
       { questions?.map((t) => <button className="questions-list-btn" onClick={() => navigate(`/${t.name}`)}>{t?.name}</button>)}
      </div> 
    }
  </div>
  </>)
}