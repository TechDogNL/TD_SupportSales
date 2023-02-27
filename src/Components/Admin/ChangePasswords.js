import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import sales from '../Sales';
import './Admin.css';

const ChangePasswords = () => {

  const navigate = useNavigate();
  const cookies = new Cookies();

  const [admin, setAdmin] = useState('');
  const [confirmAdmin, setConfirmAdmin] = useState('');
  const [user, setUser] = useState('');
  const [confirmUser, setConfirmUser] = useState('');
  
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
      const [changePasswordResponse] = await Promise.all([
        sales.put(`changePassword?`, {
          password: admin,
          confirm: confirmAdmin,
        }),
      ]);

      console.log(changePasswordResponse);
    } catch (error) {
      console.warn(error);
      navigate('/admin');
    } 
  }

  const handleUser = async () => {
    try {
      
    } catch (error) {
      console.warn(error);
      navigate('/admin');
    } 
  }

  return (
    <div className='bg-info vh-100'>
      <div className='container d-flex flex-row text-center mb-5 pt-5 align-items-center'>
        <div className='col-6 d-flex flex-column pe-4'>
          <form onSubmit={handleAdmin}>
            <h1>Admin Wachtwoord</h1>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" required onChange={e => setAdmin(e.target.value)} placeholder="Nieuw wachtwoord"/>
              <label>Nieuw wachtwoord</label>
            </div>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" required onChange={e => setConfirmAdmin(e.target.value)} placeholder="Voer wachtwoord opnieuw in"/>
              <label>Voer wachtwoord opnieuw in</label>
            </div>
            <button className='btn btn-success col-12'>Opslaan</button>
          </form>
        </div>
        <div className='col-6 d-flex flex-column ps-4'>
          <form onSubmit={handleUser}>
            <h1>Gebruikers Wachtwoord</h1>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" required onChange={e => setUser(e.target.value)} placeholder="Nieuw wachtwoord"/>
              <label>Nieuw wachtwoord</label>
            </div>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" required onChange={e => setConfirmUser(e.target.value)} placeholder="Voer wachtwoord opnieuw in"/>
              <label>Voer wachtwoord opnieuw in</label>
            </div>
            <div>
              <button className='btn btn-success col-12'>Opslaan</button>
            </div>
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