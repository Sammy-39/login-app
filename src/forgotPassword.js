import { useState } from "react"
import Spinner from "./spinner"

const ForgotPassword = ({setShowResetPassword}) =>{
    const [email,setEmail] = useState("")
    const [errMsg,setErrMsg] = useState("")

    const [showSuccessMsg,setShowSuccessMsg] = useState(false)
    const [showErrMsg,setShowErrMsg] = useState(false)
    const [showSpin,setShowSpin] = useState(false)

    const handleSubmit = async (e) =>{
        try{
            e.preventDefault()

            setShowSpin(true)
            const res = await fetch("https://login-register-app-api.herokuapp.com/api/forgotPassword",{
            method: "POST",
            headers : {"Content-type":"application/json"},
            body: JSON.stringify({email})
            })
            const resData = await res.json()
            if(res.status===200) { 
                setShowErrMsg(false) 
                setShowSpin(false)
                setShowSuccessMsg(true)
                setEmail("")
            }
            else { throw new Error(resData.message) }
        }
        catch(err){
            setShowSuccessMsg(false)
            setShowSpin(false)
            setErrMsg(err.message)
            setShowErrMsg(true)
        }
        
    }

    return(
        <div className="forgot-pwd">
            <i className="fas fa-arrow-left back" onClick={()=>{setShowResetPassword(false)}}></i>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <h4> Reset Password Form </h4>
                <div className="mb-2">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" required
                    value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>

                <div className="mb-3 small">
                        { showSuccessMsg && <small> A link to reset password has been sent to your mail. </small> }
                        { showErrMsg && <span className="err-msg"> {errMsg+"!"} </span> }
                </div>
                <div className="form-btns mb-3">
                    <button type="submit" className="btn btn-warning">Reset</button>
                </div>
                <div className="text-center">
                { showSpin && <Spinner/>}
                </div>
            </form>
        </div>
    )
}

export default ForgotPassword