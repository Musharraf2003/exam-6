import { useState} from 'react'
import { NavLink } from 'react-router-dom'
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { instance } from '../../api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'



const Login = () => {
  const [isvisiblePassword, SetisvisiblePassword] = useState(false);
  const [password, Setpassword] = useState("");
  const [email, Setemail] = useState("");
  const navigate = useNavigate();



  const handleLoginUser = (e) => {
    e.preventDefault();
    instance.post('/api/auth/login', 
    {
      email : email,
      password: password
    })
     .then(response => {
      if(response.status === 200) {
        toast.success("You have successfully logged in!")
        localStorage.setItem("token", response.data.token);
      navigate('/dashboard')
      SetuserId(response.data)
      // console.log(response.data)
      }
     })
     .catch(error => {
      toast.error(error.response.data.message);
     })
  }

  
  return (
    <div className='login'>
      <div className='form-forlogin'>
      <strong className='website-logo-login'>Medium</strong>
      <p>Login</p>
        <form className='form-forsignup-login' onSubmit={handleLoginUser}>
          <input type="email" placeholder='Email' value={email} onChange={(e) => Setemail(e.target.value)} required />
          <input type={isvisiblePassword ? "text" : "password"} className='password-input' placeholder='Password' value={password} onChange={(e) => Setpassword(e.target.value)} required />
          {
            isvisiblePassword ? <BsFillEyeSlashFill className='svg' onClick={() => SetisvisiblePassword(false)} /> : <BsFillEyeFill className='svg' onClick={() => SetisvisiblePassword(true)} />
          }
      <p>Don't you have an account? <span><NavLink className='navlink' to='/signup'>Sign Up.</NavLink></span> </p> 
        <button type='submit' className='submit-btn'>Login</button>
        </form>
      </div>
    </div>
  )
}
export default Login
