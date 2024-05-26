import React, { useEffect, useState } from 'react'
import axios from 'axios'
export const Home = (props) => {
  const [json, setjson] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:5000/api/getAll",{
      headers:{ 'auth':`${JSON.parse(localStorage.getItem('auth'))}`}
    })
    .then(res=>{
     setjson(res.data)
    })
    .catch(err=>{

    })

  },[])


  return (
    <div>
        <h1>HOME</h1>
        <p>{JSON.stringify(json)}</p>
        <button className="btn btn-primary" onClick={()=>{
          localStorage.clear();
          props.history.push('login')
        }}>Logout</button>
    </div>
  )
}
