import axios from "axios"
import React,{useState, useRef} from 'react'
import {useNavigate, Link} from "react-router-dom"
import "../styles/Register.css"
import { registerUser } from "../redux/action"
import { useDispatch } from "react-redux"

function Register() {
    const [details, setDetails] = useState({
        fullName: "",
        email: "",
        phoneNumber:"",
        address: "",
        password:""
    })
    
    const [error, setError] = useState("")
    const [network, networkError] = useState("")
    const registerRef = useRef()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const registerNewUser = async (e) => {
        e.preventDefault()
        const { phoneNumber, password, address, fullName, email } = details
        
        if (phoneNumber && password && address && fullName && email ) {
            try {
              
            const data = {phoneNumber, password, address, fullName, email}
              const res = await axios.post("http://localhost:5000/user/register", data) 
                if (res.data && res.status === 201) {
                    dispatch(registerUser(res.data))
                    navigate("/")
                    alert("Registartion Successful")
                } 
                if (res.status === 202 && res.data.newErrors.phoneNumber) {
                    const { newErrors } = res.data
                    setError(newErrors.phoneNumber)
                  }
               
            } catch (error) {
                console.log(error)
              networkError(error.message)
          }
        

        }
    }

  return (
      <div className="register">
          <div className="register__container">
              <h1>Sign-Up</h1>
              <form onSubmit={registerNewUser} ref={
                  registerRef
              }>
                  <div className="list">
                  <span>Full Name:</span>
                  <input type="text" required
                      name="fullName"
                      value={details.fullName}
                      onChange={
                          e => setDetails({
                          ...details, fullName: e.target.value
                      })
                  } />
                </div>
                  <div className="list">
                   <span>E-Mail:</span>
                  <input type="email" required
                      name="email"
                      value={details.email}
                      onChange={
                          e => setDetails({
                          ...details, email: e.target.value
                      })
                  } />
                </div>
                  <div className="list">
                  <span>Address:</span>
                  <input type="text" required
                      name="address"
                      value={details.address}
                      onChange={
                          e => setDetails({
                          ...details, address: e.target.value
                      })
                  } />
                  </div>
                  <div className="list">
                      
                
                      <span>Phone Number:</span>
                   
                  <input type="number" required
                      name="phoneNumber"
                      value={details.phoneNumber}
                      onChange={
                          e => setDetails({
                          ...details, phoneNumber: e.target.value
                      })
                  } />
                  </div>
                  {error && <p className="error">{error}</p>}   
                 
                  <div className="list">
                      
                  <span>Password:</span>
                  <input type="password"
                      name="password"
                      value={ details.password }
                      required onChange={e => setDetails({
                          ...details, password: e.target.value
                      })} />
                       </div>
                <button className="login__register">Create An Account</button>
              </form>
             
              {network && <p className="error">{networkError}</p>}   
             
              <p>Allready have an account?  <Link to="/login">Login</Link></p> 
          </div>
         
   </div>
  )
}

export default Register
 