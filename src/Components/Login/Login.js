import React, { useEffect, useState } from 'react';
import './Login.css';
import logo from './logotechdoggroupmetpayoff.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate } from 'react-router-dom';
import sales from '../Sales';
import Cookies from 'universal-cookie';
import dayjs, { Dayjs } from 'dayjs';

const Login = () => {
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const cookies = new Cookies;

  const time = dayjs();

  useEffect(() => {
    (async () => {
      if (cookies.get('token')) {
        try {
          const res = await sales.get(`login?ApiKey=${cookies.get('token')}`);
          if (res.data.admin == 1) {
            navigate('admin');
          } else {
            navigate(`dashboard/${time.month() + 1}/${time.year()}`);
          }
        } catch (error) {
          cookies.remove('token');
          console.warn(error.response);
        }
      }
    })();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await sales.get(`login?password=${event.target.password.value}`);
      setError('');
      cookies.set('token', res.data.ApiKey);
      if (res.data.admin == 1) {
        navigate('admin');
      } else {
        navigate(`dashboard/${time.month() + 1}/${time.year()}`);
      }
    } catch (error) {
      console.warn(error.response);
      setError(error.response.data.error);
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
            {error}
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;