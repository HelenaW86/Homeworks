import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { themeQuestions } from "../store/authSlice";

export const Questions = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.auth.questions);
  const error = useSelector((state) => state.auth.error)
  const navigate= useNavigate();
  const[theme, setTheme] = useState()
  useEffect(() => {
     dispatch(themeQuestions(theme));
  },[theme])

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
     {error ? <p>{error}</p> : null}
    {
      questions && <div>
       { questions?.map((t, i) => <button key={i} className="questions-list-btn" onClick={() => navigate(`/questions/${t.name}`)}>{t?.name}</button>)}
      </div> 
    }
  </div>
  </>)
}