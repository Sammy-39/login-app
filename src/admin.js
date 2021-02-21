import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import Spinner from "./spinner"

const Admin = () =>{
    const [users,setUsers] = useState([])
    const [err, setErr] = useState("")

    const [showErr,setShowErr] = useState(false)
    const [showSpin ,setShowSpin] = useState(false)

    const history = useHistory()
    
    const getUsers = async () =>{
        try{
            setShowSpin(true)
            const res = await fetch("https://login-register-app-api.herokuapp.com/api/users",{
                headers: {authorize:localStorage.getItem("token")}
            })
            const resData = await res.json()
          
            if(res.status===200){
                setShowErr(false)
                setShowSpin(false)
                setUsers(resData)
            }
            else{ throw new Error(resData.message) }
        }
        catch(err){
            setShowSpin(false)
            setErr(err.message)
            setShowErr(true)
        }
    }

    useEffect(()=>{
        getUsers()
    },[])

    const handleLogout = () =>{
        setShowSpin(true)
        setTimeout(()=>{
            localStorage.clear()
            history.replace("/")
        },700)
    }

    return(
        <div className="admin">
            <div className="logout" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i>
                <small> Sign out </small>
            </div>
            <h4> Admin Dashboard </h4>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user,idx)=>(
                        <tr key={idx}>
                        <td> {idx+1} </td>   
                        <td> {user.email} </td>
                        <td> {user.role} </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showSpin && <Spinner />}
            {showErr && <p className="err-msg"> {err} </p> }
        </div>
    )
}

export default Admin
