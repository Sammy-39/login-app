import { useState } from "react"
import { useHistory } from "react-router-dom"

import Spinner from "./spinner"

const Login = ({setShowRegister, setShowResetPassword}) =>{
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [errMsg,setErrMsg] = useState("")

    const [showSuccessMsg,setShowSuccessMsg] = useState(false)
    const [showErrMsg,setShowErrMsg] = useState(false)
    const [showSpinner, setShowSpinner] = useState(false)

    const history = useHistory()

    const handleSubmit = async (e) =>{
        try{
            e.preventDefault()
            
            setShowSpinner(true)

            const res = await fetch("https://login-register-app-api.herokuapp.com/api/login",{
                method: "POST",
                headers: {"Content-type":"application/json"},
                body: JSON.stringify({email,password})
            })
            const resData = await res.json()

            if(res.status===200){
                localStorage.setItem("token",resData.token)
                localStorage.setItem("role",resData.role)
                setShowErrMsg(false)
                setShowSuccessMsg(true)
                setShowSpinner(false)
                setEmail("")
                setPassword("")
                if(localStorage.getItem("role")==="admin"){
                    setTimeout(()=>{
                        setShowSuccessMsg(false)
                        history.replace("/admin")
                    },700)
                }
                setTimeout(()=>{
                    setShowSuccessMsg(false)
                },1500)
            }
            else{
                setShowSpinner(false)
                setShowErrMsg(true)
                setErrMsg(resData.message+"!")
            }
        }
        catch(e){
            setShowSpinner(false)
            setShowErrMsg(true)
            setErrMsg("Unable to Login!")
        }
    }

    return(
        <div className="login">
            <form onSubmit={(e)=>handleSubmit(e)}>
                <h4> Login Form </h4>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" required
                    value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="mb-2">
                    <label htmlFor="pass" className="form-label">Password</label>
                    <input type="password" className="form-control" id="pass" required
                    value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div className="mb-5 small">
                        <span className="forgot-pass" onClick={()=>{setShowResetPassword(true)}}> Forget Password? </span>
                        { showSuccessMsg && <span className="success-msg"> Log in success! </span> }
                        { showErrMsg && <span className="err-msg"> {errMsg} </span> }
                </div>
                <div className="form-btns">
                    <button type="submit" className="btn btn-warning">Login</button>
                    <button type="button" className="btn btn-warning" onClick={()=>(setShowRegister(true))}>Register</button>
                </div>
            </form>
            { showSpinner && <Spinner /> }
        </div>
    )
}

export default Login