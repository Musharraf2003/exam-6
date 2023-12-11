import homeimage from '../../assets/images/homeimage.png'
import {useState, useEffect} from 'react'
import { instance } from '../../api'
import user from '../../assets/images/userimage.png'
import { truncate } from '../../helpers/truncate'
import { v4 as uuidv4 } from 'uuid';
import CircularProgress from '@mui/material/CircularProgress';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';



const Home = () => {
    const [posts, Setposts] = useState([]);
    const [loading, Setloading] = useState(false);

    
    useEffect(() => {
        const fetchData = async () => {
            try{
                Setloading(true)
                const response = await instance('/api/posts');
                Setposts(response.data.data)
            }
            catch(error){
                console.log(error)
            }
            finally{
                Setloading(false)
            }
        }

        fetchData()
    },[])
    

    return (
        <>
            <section className='home_hero'>
               <img src={homeimage} alt="" />
               <div className='articles-wrapper'>
                <h2>All articles</h2>
                <div className='blog-cards-wrapper'>
                    {loading ? 
                         <CircularProgress className='loading' /> 
                          :
                          
                        posts.map(post => 
                        <Link to={`blog-post/${post._id}`} className='blog-card' key={uuidv4()}>
                            <img width={266} height={172} src={post.image} alt="" />
                            <div className='blog-card-text-wrapper'>
                            <span>{truncate(post.title, 25)}</span>
                            <p>{truncate(post.description, 100)}</p>
                            <div>
                                <div className='author-wrapper'>
                                    <img src={user} alt="" />
                                    <div>
                                    <p>{post.author}</p>
                                    <p className='author-word'>Author</p>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </Link>
                        )
                    }
                   
                         {/* <Carousel>
                         {
                            loading ? 
                            <CircularProgress className='loading' /> 
                             : 
                            
                                posts.map(post => 
                                    <Carousel.Item className='blog-card' key={uuidv4()}>
                                        <img width={266} height={172} src={post.image} alt="" />
                                        <div className='blog-card-text-wrapper'>
                                        <span>{truncate(post.title, 25)}</span>
                                        <p>{truncate(post.description, 100)}</p>
                                        <div>
                                            <div className='author-wrapper'>
                                                <img src={user} alt="" />
                                                <div>
                                                <p>{post.author}</p>
                                                <p className='author-word'>Author</p>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    </Carousel.Item>)
                         }
                         </Carousel> */}
                </div>
               </div>
            </section>
        </>
    )
}

export default Home