import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { InputGroup, FormControl } from 'react-bootstrap';
import { LockFill } from 'react-bootstrap-icons';
import logo from './logotechdoggroupmetpayoff.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target.password.value);
        if (event.target.password.value === "test") {
            navigate("/dashboard")
        }
      };


    return (
        <div>
            <nav className=' bg-light d-flex justify-content-center'>
                <img src={logo} id='logoLogin' className="img-fluid col-4 p-3" alt=""></img>
            </nav>
            <form onSubmit={handleSubmit}>
                <div className='body d-flex justify-content-center'>
                    <div className='d-flex justify-content-center flex-column  text-center mb-4'>
                        <h1>Enter password to login</h1>
                        <div className="mb-3">
                        <input type="password" id='password' placeholder='Password...' onChange={e => setPassword(e.target.value)}></input>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;