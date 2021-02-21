import {BrowserRouter, Route, Switch} from "react-router-dom"
import { useEffect, useState } from "react";

import Login from "./login"
import Register from "./register"
import Admin from "./admin"
import ChangePassword from "./changePassword";
import ForgotPassword from "./forgotPassword";
import './App.css';

function App() {
  const [showAdmin,setShowAdmin] = useState(false)
  const [showRegister,setShowRegister] = useState(false)
  const [showResetPassword, setShowResetPassword] = useState(false)

  return (
    <div className="app">
      <BrowserRouter>
          <Switch>
            <Route path="/" exact={true}>
              { !showAdmin && !showRegister && !showResetPassword && 
                <Login setShowRegister={setShowRegister} setShowAdmin={setShowAdmin} 
                setShowResetPassword={setShowResetPassword} /> 
              }
              { showRegister && !showAdmin && !showResetPassword && 
                 <Register setShowRegister={setShowRegister} /> }

              { showResetPassword && !showAdmin && !showRegister && 
                <ForgotPassword setShowResetPassword={setShowResetPassword} />}  
            </Route>
            
            <Route path="/admin">
              <Admin />
            </Route>      

            <Route path="/reset/:token">
              <ChangePassword />
            </Route>
          </Switch>
      </BrowserRouter>
      
      
        
      
    </div>
  );
}

export default App;
