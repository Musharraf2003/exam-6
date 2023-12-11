import './_Signout.scss';
import { TiDeleteOutline } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';


const Signout = () => {
    const navigate = useNavigate();

    const notosignout = () => {
        navigate('/dashboard')
    }

    const handlelogout = () => {
        localStorage.removeItem("token")
        navigate('/')
    }

  return (
    <div className='signout'>
        <div className='modal-signout'>
            <TiDeleteOutline onClick={notosignout} className='svg-signout' />
            <strong>Sign Out?</strong>
            <p>Do you want to Sign Out? Really?</p>
            <button onClick={handlelogout}>Sign Out</button>
        </div>
    </div>
  )
}

export default Signout