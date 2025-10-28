import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext"
import { useState } from "react";
import { isNotEmpty } from "../Utils/Validations";

function LoginContent() {

  const {user, logIn} = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!isNotEmpty(username) || !isNotEmpty(password)){
      setError("Please fill Information");
      return;
    }
    const success = logIn(username, password);
    if(success){
      navigate('/view')
    }
    else {
      setError('Invalid credentials')
    }
  }

  return (
    <div className={'panel login-panel'}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="content-form">
        <div className="form-group">
          <label htmlFor="login-username">Username : </label>
          <input type="text" id="login-username" placeholder="Enter username "
            value={username} onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="login-password">Password : </label>
          <input type="password" id="login-password" placeholder="Enter password "
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {
          error && <div className="error">{error}</div>
        }
        <button className="btn" type="submit">Login</button>
        <p>
         <Link to='/signup'>Signup</Link>
        </p>
      </form>

    </div>
  )
}

export default LoginContent