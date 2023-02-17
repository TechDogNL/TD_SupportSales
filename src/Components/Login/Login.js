import React from 'react';
import './Login.css';
import { InputGroup, FormControl } from 'react-bootstrap';
import { LockFill } from 'react-bootstrap-icons';
import logo from './logotechdoggroupmetpayoff.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Login = () => {
    return (
        <div>
            <nav className=' bg-light d-flex justify-content-center'>
                <img src={logo} id='logo' className="img-fluid col-4 p-3" alt=""></img>
            </nav>
            <div className='body d-flex justify-content-center'>
                <div className='d-flex justify-content-center flex-column  text-center mb-4'>
                    <h1>Enter Password</h1>
                    <div class="mb-3">
                    <InputGroup>
                    <InputGroup.Text><LockFill /></InputGroup.Text>
                    <FormControl type="password" id='password' placeholder="Password" />
                    </InputGroup>
                    </div>
                </div>
            </div>
            <nav className=' bg-light d-flex justify-content-center'>
                <img src={logo} id='logo' className="img-fluid col-4 p-3" alt=""></img>
            </nav>
        </div>
    );
}

export default Login;