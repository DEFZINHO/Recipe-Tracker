import { useState } from "react";
import Navbar from "./nav";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
    const [loginValue,setLoginValue]= useState({
        email:"",
        password:""
})
const [showPassword,setShowPassword]=useState(false)
const [error, setError]=useState("")
const navigate= useNavigate()
const handleClick=()=>{
    setShowPassword((prev)=>!prev)
}
   const handleChange=(e)=>{
   const {name,value}=e.target
  setLoginValue((prev)=>({
    ...prev,[name]:value
  }))
  setError("")
}
const handleSubmit=(e)=>{
 e.preventDefault()
 const storedData=JSON.parse(localStorage.getItem("loginValue"))
 if(!storedData){
    setError("email and password not found")
 return}
 if( 
    loginValue.email!== storedData.email ||
    loginValue.password!==storedData.password
 ){
    setError("Incorrect email or password")
    return
 }else{
    
    setError("")
 navigate("/dashboard")
 }
 setLoginValue({
    email:"",
        password:""
 })
  
}
    return ( 
        <div className="login-page">
        <nav>
        <Navbar/>
        </nav>
        <div className="login-card">
       <h1>Welcome Back</h1>
       <p> login to continue to your Recipes</p>
        <form onSubmit={handleSubmit}>
            <div className="input-group" style={{
                marginBottom:"20px"
            }}>
            <input type="email" name="email" placeholder="example@gmail.com" value={loginValue.email} onChange={handleChange} />
          </div>
           <div className="input-group" style={{position:"relative", marginBottom:"20px"}}>
            <input type={showPassword? "text":"password"} name="password" placeholder="******" value={loginValue.password} onChange={handleChange}/>
            <span
            onClick={()=>handleClick()}
            style={{
                position:"absolute",
                right:"40px",
                top: "40%",
                transform:"translateY(-50%)",
                cursor: "pointer",
                color:"#888"
            }}
            >
           {showPassword? <FaEyeSlash/>: <FaEye/>}
            </span>
            </div>
            {error&& <p style={{color:"red", marginBottom:"20px"}}>{error}</p>}
            <button className="login-btn">Login</button> <br /> <br />
            <p className="auth-link">
               Don't have an account? <Link to="/register">Register</Link>
            </p>
            
        </form>     
        </div>

        </div>
     );
}
 
export default Login;
