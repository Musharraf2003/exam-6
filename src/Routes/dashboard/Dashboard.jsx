import React from 'react'
import user from '../../assets/images/userfordash.png'
import { NavLink, useParams } from 'react-router-dom';
import { useState, useEffect, useLayoutEffect } from 'react'
import { instance } from '../../api'
import { toast } from 'react-toastify';
const tokenf = localStorage.getItem("token")
const tokensplitted = tokenf.split(".")[1]
const decodedtoken = JSON.parse(atob(tokensplitted))
const idtoken = decodedtoken.id 

const Dashboard = () => {
    const [title, SetTitle] = useState("");
    const [image, SetImage] = useState("");
    const [description, SetDescription] = useState("");
    const [category, Setcategory] = useState("");
    const [categorypost, Setcategorypost] =useState([]);
    const [profile, Setprofile] = useState("")
    
    const renderUserData = async () => {
        const response = await instance.get(`api/users/${idtoken}`) 
        try{
            Setprofile(response.data.data)
        }
        catch(error){
            console.log(error)
        }
        }

        const handleCreatePost = (e) => {
            e.preventDefault();
            instance.post('api/posts', 
            {
                title : title,
                description : description,
                category : category,
                image : image
            })
            .then(response => {
                if(response.status === 201) {
                    toast.success("Your post is uploaded!")
                    console.log(response)
                }
            })
            .catch(error => {
                 toast.error(error.response.data.errors[0].msg)
            })
            }

            
    useEffect(() => {
        instance.get('/api/categories')
        .then(response => Setcategorypost(response.data.data))
        .catch(err => console.log(err))

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
            <button className='create-btn'><NavLink className='btn-create' to='/dashboard'>Create Post</NavLink></button>
            <button className='manage-btn'><NavLink className='btn-manage' to='/managepost'>Manage Posts</NavLink></button>
            <p><NavLink to='/signout' className='signout-link'>Sign Out?</NavLink></p>
        </div>
        <div className='new-post'>
            <p>Create New Post</p>
            <div className='new-post-wrapper'>
                <form className='create-post-form' onSubmit={handleCreatePost}>
                    <label>Post title</label>
                    <input type="text" className='post-title-input' required value={title} onChange={(e) => SetTitle(e.target.value)} />
                    <label>Post image</label>
                    <div className='url-and-select'>
                    <input type="url" value={image} onChange={(e) => SetImage(e.target.value)} />
                    <select value={category} onChange={(e) => Setcategory(e.target.value)}>
                    <option value="All">Select post category</option>
                        {
                            categorypost.map(choices => 
                                <option key={(choices._id)}>{choices._id}</option>)
                        }
                    </select>
                    </div>
                    <label>Post description</label>
                    <textarea cols="30" rows="10" value={description} onChange={(e) => SetDescription(e.target.value)}></textarea>
                    <button type='submit' className='create-post-btn'>Create Post</button>
                </form>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Dashboard