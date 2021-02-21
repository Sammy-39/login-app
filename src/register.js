import { useState } from "react"

import Spinner from "./spinner"

const Register = ({setShowRegister}) =>{
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [errMsg,setErrMsg] = useState("")

    const [showSuccessMsg,setShowSuccessMsg] = useState(false)
    const [showErrMsg,setShowErrMsg] = useState(false)
    const [showSpinner, setShowSpinner] = useState(false)

    const handleSubmit = async (e) =>{
        try{
            e.preventDefault()
            
            setShowSpinner(true)

            const res = await fetch("https://login-register-app-api.herokuapp.com/api/register",{
                method: "POST",
                headers: {"Content-type":"application/json"},
                body: JSON.stringify({email,password,"role":"user"})
            })
            const resData = await res.json()

            if(res.status===200){
                setShowErrMsg(false)
                setShowSuccessMsg(true)
                setShowSpinner(false)
                setEmail("")
                setPassword("")
                setTimeout(()=>{
                    setShowSuccessMsg(false)
                },2000)
            }
            else{
                setShowSpinner(false)
                setShowErrMsg(true)
                setErrMsg("Email id already exists!")
            }
        }
        catch(e){
            setShowSpinner(false)
            setShowErrMsg(true)
            setErrMsg("Unable to Register!")
        }
    }

    return(
        <div className="register">
            <i className="fas fa-arrow-left back" onClick={()=>{setShowRegister(false)}}></i>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <h4> Register Form </h4>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={email} required onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="pass" className="form-label">Password</label>
                    <input type="password" className="form-control" id="pass" value={password} required onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div className="mb-5 small">
                        { showSuccessMsg && <span className="success-msg"> Registered successfully! </span> }
                        { showErrMsg && <span className="err-msg"> {errMsg} </span> }
                </div>
                <div className="form-btns">
                    <button type="submit" className="btn btn-warning">Register</button>
                    <button type="button" className="btn btn-warning" onClick={()=>(setShowRegister(false))}>Cancel</button>
                </div>
            </form>
            { showSpinner && <Spinner/>}
        </div>
    )
}

export default Register