import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import sales from '../Sales';
import './Admin.css';

const ChangePasswords = () => {

  const navigate = useNavigate();
  const cookies = new Cookies();

  const [admin, setAdmin] = useState('');
  const [oldAdmin, setOldAdmin] = useState('');
  const [user, setUser] = useState('');
  const [oldUser, setOldUser] = useState('');
  const [adminError, setAdminError] = useState('');
  const [userError, setUserError] = useState('');
  
  useEffect(() => {
    (async () => {
      try {
        await sales.get(`login?ApiKey=${cookies.get('token')}`);
      } catch (error) {
        console.warn(error);
        cookies.remove('token');
        navigate('/'); 
      }
    })()
  }, []);

  const handleAdmin = async (e) => {
    e.preventDefault();
    try {
      const res = await sales.put(`changePassword`, {
        password: admin,
        oldPassword: oldAdmin,
      });

      cookies.set('token', res.data.api_key, {path: '/'});
      setAdminError(<p className='text-success mb-0 fw-bold'>Wachtwoord successvol geupdate</p>);
    } catch (error) {
      console.warn(error);
      if (error.response.status === 404) {
        setAdminError(<p className='text-danger mb-0 fw-bold'>Oude wachtwoord is niet correct</p>);
      } else {
        navigate('/admin');
      }
    } 
  }

  const handleUser = async (e) => {
    e.preventDefault();
    try {
      await sales.put(`changePassword`, {
        password: user,
        oldPassword: oldUser,
      });
      setUserError(<p className='text-success mb-0 fw-bold'>Wachtwoord successvol geupdate</p>);
    } catch (error) {
      if (error.response.status === 404) {
        setUserError(<p className='text-danger mb-0 fw-bold'>Oude wachtwoord is niet correct</p>);
      } else {
        navigate('/admin');
      }
      console.warn(error);
    }
  }

  return (
    <div className='bg-info vh-100'>
      <div className='container d-flex flex-row text-center mb-5 pt-5 align-items-center'>
        <div className='col-6 d-flex flex-column pe-4'>
          <form onSubmit={handleAdmin}>
            <h1>Admin Wachtwoord</h1>
            <div className="form-floating mb-3">
              <input type="password" className="form-control" required onChange={e => setAdmin(e.target.value)} placeholder="Nieuw wachtwoord"/>
              <label>Nieuw wachtwoord</label>
            </div>
            <div className="form-floating mb-3">
              <input type="password" className="form-control" required onChange={e => setOldAdmin(e.target.value)} placeholder="Het oude wachtwoord"/>
              <label>Het oude wachtwoord</label>
            </div>
            <div>
              <button className='btn btn-success col-12'>Opslaan</button>
              {adminError}
            </div>
          </form>
        </div>
        <div className='col-6 d-flex flex-column ps-4'>
          <form onSubmit={handleUser}>
            <h1>Gebruikers Wachtwoord</h1>
            <div className="form-floating mb-3">
              <input type="password" className="form-control" required onChange={e => setUser(e.target.value)} placeholder="Nieuw wachtwoord"/>
              <label>Nieuw wachtwoord</label>
            </div>
            <div className="form-floating mb-3">
              <input type="password" className="form-control" required onChange={e => setOldUser(e.target.value)} placeholder="Het oude wachtwoord"/>
              <label>Het oude wachtwoord</label>
            </div>
            <div>
              <button className='btn btn-success col-12'>Opslaan</button>
            </div>
            {userError}
          </form>
        </div>
      </div>
      <div className='text-center'>
        <a className='btn btn-danger' onClick={e => navigate('/admin')}>Terug</a>
      </div>
    </div>
  );
}

export default ChangePasswords;