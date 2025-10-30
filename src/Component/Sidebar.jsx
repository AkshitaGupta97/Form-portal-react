import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext"

function Sidebar() {

  const {user, logOut} = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut();
    navigate('/login')
  }

  return (
    <aside className="sidebar">
      <h2>CMS Portal</h2>
      <nav>
        <ul>
          {
            user ? (
              <>
                <li>
                  <NavLink to='/add'>
                    <p>Add Content</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/view'>
                    <p>View Content</p>
                  </NavLink>
                </li>
              </>
            ) :
            (
              <>
                <li>
                  <NavLink to='/login'>
                    <p>Login</p> 
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/signup'>
                    <p>Signup</p>
                  </NavLink>
                </li>

              </>
            )
          }
        </ul>
      </nav>
      {
        user&& (
          <div className="logout-section">
            <button onClick={handleLogOut} className="logout-btn">
              Logout
            </button>
          </div>
        )
      }
    </aside>
  )
}

export default Sidebar