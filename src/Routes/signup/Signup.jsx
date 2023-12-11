import { NavLink } from 'react-router-dom'
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useState} from 'react'
import { instance } from '../../api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate()
  const [isvisiblePassword, SetisvisiblePassword] = useState(false)
  const [firstname, Setfirstname] = useState("");
  const [lastname, Setlastname] = useState("");
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");
  const [loading, Setloading] = useState(false);

  const handleCreateUser = (e) => {
    e.preventDefault();
    Setloading(true)
    instance.post('/api/auth/signup',
    {
      firstname : firstname,
      lastname: lastname,
      email: email,
      password: password
    })
     .then(response => {
      Setloading(false)
      if(response.status === 201){
        toast.success("Successfully registered!")
        navigate('/login')
      }
     })
     .catch(err => {
      Setloading(false)
      toast.error(err.response.data.errors[0].msg);
     })
  }


  return (
    <div className='singup'>
      <div className='form-forsignup'>
      <strong className='website-logo-signup'>Medium</strong>
      <p>Sign Up</p>
        <form className='form-forsignup-wrapper' onSubmit={handleCreateUser}>
        <div style={{display: "flex", flexDirection: "column", gap: "20px"}}>
          <input type="text" placeholder='Firstname' required value={firstname} onChange={(e) => Setfirstname(e.target.value)} />
          <input type="text" placeholder='Lastname' value={lastname} onChange={(e) => Setlastname(e.target.value)} />
          <input type="email" placeholder='Email' required value={email} onChange={(e) => Setemail(e.target.value)} />
          <input type={isvisiblePassword ? "text" : "password"} className='password-input' placeholder='Password' required value={[password]} onChange={(e) => Setpassword(e.target.value)} />
          {
            isvisiblePassword ? <BsFillEyeSlashFill className='svg' onClick={() => SetisvisiblePassword(false)} /> : <BsFillEyeFill className='svg' onClick={() => SetisvisiblePassword(true)} />
          }
       
      </div>
      <p>Do you have an account? <span><NavLink className='navlink' to='/login'>Login.</NavLink></span> </p> 
        <button type='submit' disabled={loading} className='submit-btn'>{loading ? "Registering..." : "Sign Up"}</button>
      </form>
      </div>
    </div>
  )
}

export default Signup