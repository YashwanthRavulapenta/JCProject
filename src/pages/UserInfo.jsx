import React from 'react'
import { useParams } from 'react-router-dom'
import { useState , useEffect } from 'react'
import Card from '../components/Card'
import "../styles/UserInfo.css"

const UserInfo = () => {

   const {id} = useParams() 

   const [users , setUsers] = useState([])
     async function getGithubUsers(){
       const response = await fetch(`https://api.github.com/users`)
       const data = await response.json()
       setUsers(data)
     }
   
     useEffect(()=>{
       getGithubUsers()
     },[])

     const eachUser = users.find((eachUser)=>(eachUser.id===Number(id)))
     if(!eachUser){
        return <h1>Loading....</h1>
     }


  return (
    <div style={{width:"100%",backgroundColor:"lightblue",height:"450px"}}
    className='d-flex flex-wrap justify-content-center align-items-center'>
        <div className='main_div d-flex flex-wrap gap-3' >
            <div>
                <img src={eachUser.avatar_url} alt="" className='user_image' />
            </div>
            <div className='d-flex flex-column gap-2 justify-content-center align-items-center'>
                <h1>{eachUser.login}</h1>
                <a href={eachUser.html_url} target='_blank'>GitHub</a>
            </div>
        </div>
    </div>
  )
}

export default UserInfo