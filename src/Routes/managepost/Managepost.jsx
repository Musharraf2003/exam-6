import React from 'react'
import user from '../../assets/images/userfordash.png'
import { NavLink, renderMatches} from 'react-router-dom'
import { instance } from '../../api' 
import { useState, useEffect } from 'react'
const tokenf = localStorage.getItem("token")
const tokensplitted = tokenf.split(".")[1]
const decodedtoken = JSON.parse(atob(tokensplitted))
const idtoken = decodedtoken.id


const Managepost = () => {
  const [myposts, Setmyposts] = useState([])
  const [profile, Setprofile] = useState([])

   const renderUserData = async () => {
     const response = await instance.get(`api/users/${idtoken}`)
     try{
      Setprofile(response.data.data)
     }
     catch(error){
      console.log(error)
     }
   }
  
  useEffect(() => {
    //  instance.get(`api/users/${idtoken}`)
    //    .then(response => Setmyposts(response.data.data))
    //    .catch(err => console.log(err))

    //    console.log(myposts.posts)
       
      
    renderUserData()
  },[])

   
  return (
        <div className='dashboard'>
        <div className='dashboard-new-wrapper'>
        <div className='sidebar'>
            <p>Dashboard</p>
            <div className='dashboard-user-info'>
               <img src={user} width={54} height={54} alt="" />
               <div>
                    <p>{profile.firstname} {profile.lastname}</p>
                    <small>Author</small>
                </div>
            </div>
            <button className='create-btn white'><NavLink style={{color: "black", textDecoration: "none"}} to='/dashboard'>Create Post</NavLink></button>
            <button className='manage-btn black'>Manage Posts</button>
            <p><NavLink to='/signout' className='signout-link'>Sign Out?</NavLink></p>
        </div>
        <div className='manage-posts'>
          <p>Manage posts</p>
          <div className='manage-posts-wrapper'>
            { 
            myposts.map(post =>
            <div className='my-post-card'>
              <img src={post.image} alt="" />
              <p>{post.image}</p>
              <p>{post.description}</p>
              <button>Delete</button>
            </div>)
            }
          </div>
        </div>
        </div>
        </div>
  )
}

export default Managepost