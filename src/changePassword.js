import { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"

import Spinner from "./spinner"

const ChangePassword = () =>{
    
    const history = useHistory()
    const params = useParams()
     
    const [password,setPassword] = useState("")
    const [errMsg,setErrMsg] = useState("")

    const [showSuccessMsg,setShowSuccessMsg] = useState(false)
    const [showErrMsg,setShowErrMsg] = useState(false)
    const [showSpinner,setShowSpinner] = useState(false)

    const handleChangePwd = async (e) =>{
        try{
            e.preventDefault()
            setShowSpinner(true)

            const res = await fetch("https://login-register-app-api.herokuapp.com/api/changePassword",{
                method: "PATCH",
                headers: {"Content-type":"application/json"},
                body: JSON.stringify({token:params.token,password})
            })
            const resData = await res.json()

            if(res.status===200){
                setShowSuccessMsg(true)
                setShowErrMsg(false)
                setShowSpinner(false)
                setTimeout(()=>{
                    setPassword("")
                    setShowSuccessMsg(false)
                    history.replace("/")
                },2000)
            }
            else{
                throw new Error(resData.message)
            }
        }
        catch(err){
            setShowSuccessMsg(false)
            setShowSpinner(false)
            setShowErrMsg(true)
            setErrMsg(err.message)
        }

    }

    return(
        <div className="forgot-pwd">
            <form onSubmit={(e)=>handleChangePwd(e)}>
                <h4> Change Password </h4>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">New Password</label>
                    <input type="password" className="form-control" id="password" onClick={()=>{setShowSuccessMsg(false); setShowErrMsg(false)}}
                    value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                </div>
                <div className="mb-5 small">
                        { showSuccessMsg && <span className="success-msg"> Password updated successfully! </span> }
                        { showErrMsg && <span className="err-msg"> {errMsg} </span> }
                </div>
                <div className="form-btns">
                    <button type="submit" className="btn btn-warning">Reset</button>
                    <button type="submit" className="btn btn-warning" onClick={()=>{history.replace("/")}}>Cancel</button>
                </div>
            </form> 
            { showSpinner && <Spinner className="spin" />}
        </div>
    )
}

export default ChangePassword
