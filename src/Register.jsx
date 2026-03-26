 import { useState } from "react";
import Navbar from "./nav";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
    const [registerValue, setRegisterValue]=useState({
        name:"",
        email:"",
        password:"",
        confirm_password:""
    })
    const [showPassword,setShowPassword]=useState(false)
    const[showConfirmPassword, setShowConfirmPassword]=useState(false)
     const navigate= useNavigate()
    const toggleSeenPassword=()=>{
        setShowPassword((prev)=>!prev)
    }
    const toggleSeenConfirmPassword=()=>{
        setShowConfirmPassword((prev)=>!prev)
    }
    const onchange=(e)=>{
        const{name, value}=e.target;
        setRegisterValue((prev)=>({...prev,[name]:value
    }))
}
const handleSubmit=(e)=>{
    e.preventDefault()
    if(registerValue.password!==registerValue.confirm_password){
        alert("please enter a matching password")
        return
    }
    if(registerValue.password=== registerValue.confirm_password){
        alert("Registration Successful")
    }
    console.log(registerValue)
    localStorage.setItem("loginValue", JSON.stringify(registerValue))
    
    setRegisterValue({
        name:"",
        email:"",
        password:"",
        confirm_password:""
    })
      navigate("/")
}
          

    return (
        <div className="login">
            <Navbar/>
            <form action="submit" className="form" onSubmit={handleSubmit}style={{position:"relative"}}>
                <label htmlFor="name"> Enter your name:</label>
                <input value={registerValue.name} type="text" onChange={onchange} name="name" placeholder="John Doe"/>
                 <label htmlFor="email">Enter your email:</label>
               <input name="email" type="email" value={registerValue.email} onChange={onchange} placeholder="example@gmail.com" />
               <label htmlFor="password">Enter Password:</label>
               <input className="show-password" type={showPassword? "text":"password"} name="password" value={registerValue.password} onChange={onchange} placeholder="********"/>
               <span
               onClick={()=>toggleSeenPassword()}
               style={{
                position:"absolute",
                bottom:"50%",
                right: "60px",
                transform:"translateY(-50%)",
                cursor:"pointer"
               }}
               >
               {showPassword? <FaEyeSlash/>:<FaEye/>}
               </span>
              <label htmlFor="confirm_password">confirm password:</label>
              <input className="show-confirm-password" type={showConfirmPassword? "text":"password"} name="confirm_password" value={registerValue.confirm_password} placeholder="********" onChange={onchange}/>
              <span
              onClick={()=>toggleSeenConfirmPassword()}
              style={{
                position:"absolute",
                right:"60px",
                bottom:"36%",
                transform:"translateY(-50%)",
                pointer:"cursor"
              }}
              > {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</span>
              <button>Register</button> <br /><br />
             <p className="auth-link">
                Already have an acount? <Link to="/">Login</Link>
             </p>

            </form>
        </div>
      );
}
 
export default Register;