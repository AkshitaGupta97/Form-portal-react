import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext"
import { useState } from "react";
import { isNotEmpty } from "../Utils/Validations";

function Signup() {

  const {user, signUp} = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  if(user){
    navigate('/view');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!isNotEmpty(username) || !isNotEmpty(password) || !isNotEmpty(confirmPassword)){
      setError("Please fill Information");
      return;
    }
    if(password !== confirmPassword){
      setError("Password does not match");
      return;
    }
    const result = signUp(username, password);
    if(result.success){
      navigate('/view')
    }
    else {
      setError(result.message)
    }
  }

  return (
     <div className={'panel login-panel'}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} className="content-form">
        <div className="form-group">
          <label htmlFor="signup-username">Username : </label>
          <input type="text" id="signup-username" placeholder="Enter username "
            value={username} onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="signup-password">Password : </label>
          <input type="password" id="signup-password" placeholder="Enter password "
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="signup-confirm-password">Confirm Password : </label>
          <input type="password" id="signup-confirm-password" placeholder="Confirm password "
            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {
          error && <div className="error">{error}</div>
        }
        <button className="btn" type="submit">Signup</button>
        <p> Already have an account ?
           <Link to='/signup'>Login</Link>
        </p>
      </form>

    </div>
  )
}

export default Signup