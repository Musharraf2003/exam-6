import { useParams } from 'react-router-dom'
import { instance } from '../../api'
import { useEffect, useState } from 'react'


const Blogpost = () => {
  const {id} = useParams()
  const [posts, Setposts] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
        try{
          const response = await instance(`/api/posts/${id}`)
          Setposts(response.data)
        }
        catch(error){
          console.log(error);
        }
    }

    fetchData()
  },[])

  console.log(posts)
  return (
    <div className='blogpost'>
      {
            posts ? 
            <div className='blog-post-wrapper'>
              <div className='blogpost-title-wrapper'>
              <h1>{posts.title}</h1>
              <p>{posts.category}</p>
              </div>
              <img className='blogpost-image' src={posts.image} alt="" />
              <p>{posts.description}</p>
              </div> : <></>
      }
    </div>
  )
}

export default Blogpost