import { FaRoad, FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux"
import {logout, reset} from "../features/auth/authSlice"

const Header = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const {user} = useSelector((state) => state.auth)

	const onLogout = () => {
		dispatch(logout())
		dispatch(reset())
		navigate("/")
	}

  return (
    <header className='header'>
      <div>
        <Link to={'/'}>GoalSetter</Link>
      </div>
      <ul>
				{user ? (
					<li><button className='btn' onClick={onLogout}><FaSignOutAlt/> Logout</button></li>
				) : (
					<>
						<li><Link to={'/login'}><FaSignInAlt/> Login</Link></li>
						<li><Link to={'/register'}><FaSignOutAlt/> Sign Up</Link></li>
					</>
				)}
        
      </ul>
    </header>
  )
}

export default Header