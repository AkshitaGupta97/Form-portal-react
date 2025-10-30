import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "../Hook/useLocalStorage";

const AuthContext = createContext();

export function AuthProvider({children}) {

  const [user, setUser] = useState(null);

  const [users, setUsers] = useState(() => {
    const storedUser = localStorage.getItem('users');
    return storedUser ? JSON.parse(storedUser) : [{username: 'admin', password:'admin123'}]
  })
  
  /* instead of it :  useLocalStorage('users', [{username: 'admin', password:'admin123'}])
  */

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users))
  }, [users])

  const logIn = (username, password) => {
    const found = users.find((u) => u.username === username && u.password === password)
    if(found){
      setUser({username});
      return true;
    }
    return false;
  }

  const signUp = (username, password) => {
    const exists = users.some((u) => u.username === username);
    if(exists) return {success:false, message:"username already taken"}  /* we are returning success:false, as user already exist, now we won't add new user  */
    /* else if user not exist, means new user */
    const newUser = {username,password}
    setUsers((prev) => [...prev, newUser])
    setUser({username})
    return {success: true}
  }

  const logOut = () => setUser(null)

  return (

    <AuthContext.Provider value={{user, logIn, signUp, logOut}}> 
      {children}
    </AuthContext.Provider>

  )
}

export const useAuth = () => useContext(AuthContext)
