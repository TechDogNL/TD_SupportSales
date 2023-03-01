import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import sales from '../../Sales';
import '../Admin.css';

const NewUser = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();

  const [error, setError] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setError('');
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    }
  }, [error]);

  useEffect(() => {
    (async () => {
      try {
        await sales.get(`login?ApiKey=${cookies.get('token')}`);
      } catch (error) {
        console.warn(error);
        cookies.remove('token', {path: '/'});
        navigate('/'); 
      }
    })()
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sales.post('users', {
        name: e.target[0].value,
        active: 1,
      });

      // sets all the data empty after the user is made
      e.target[0].value = '';

      setError(<p className='text-success fw-bold'>Gebruiker succesvol aangemaakt</p>);
    } catch (error) {
      console.warn(error.response);
      setError(<p className='text-danger fw-bold'>Er is iets fout gegaan</p>);
    }
  }

  return (
    <div className='adminBody vh-100'>
      <div className='container text-center pt-5 w-50'>
        <form onSubmit={handleSubmit} autoComplete='off'>
          <h1 className='mb-3'>Nieuwe Gebruiker</h1>
          {/* name input */}
          <div className='d-flex justify-content-center'>
            <div className="form-floating mb-5 w-50">
              <input type="text" className="form-control no-spinner" id="floatingPrice" placeholder="Naam" required/>
              <label htmlFor="floatingPrice">Naam</label>
            </div>
          </div>

          {/* buttons */}
          <div className='d-flex justify-content-evenly mb-3'>
            <a onClick={e => navigate('/admin')} className="btn btn-danger">Terug</a>
            <button type="submit" className="btn btn-primary">Opslaan</button>
          </div>
          {error}
        </form>
      </div>
    </div>
  );
}

export default NewUser;