import { NavLink, useLocation } from 'react-router-dom'
const RESTRICTED_ROUTES_FOR_NAV = ["/login", "/signup", "/dashboard", "/signout", "/managepost"]

const Nav = () => {
    const locationpath = useLocation()
   
    return RESTRICTED_ROUTES_FOR_NAV.includes(locationpath.pathname) ? null : (
        <div className='home_navigation'>
            <div className='nav-wrapper'>
                <strong className='website-logo'>Medium</strong>
                <div className='nav-links'>
                  <p> <NavLink className={({isActive}) => isActive ? "nav_link nav_link--active" : "nav_link"} to='login'>Log In</NavLink> </p>
                  <p> <NavLink className={({isActive}) => isActive ? "nav_link nav_link--active" : "nav_link"} to='signup'>Sign Up</NavLink> </p>
                </div>
            </div>
        </div>
    )
}

export default Nav