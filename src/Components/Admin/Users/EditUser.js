import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import sales from '../../Sales';
import '../Admin.css';

const EditUser = () => {
  const navigate = useNavigate();
  const cookies = new Cookies;
  const { id } = useParams();

  const [user, setUser] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const [userResponse, loginResponse] = await Promise.all([
          sales.get(`users?user_id=${id}`),
          sales.get(`login?ApiKey=${cookies.get('token')}`),
        ]);
  
        if (loginResponse.data.admin !== 1) {
          cookies.remove('token', {path: '/'});
          navigate('/');
        }

        setUser(userResponse.data.name);
      } catch (error) {
        console.warn(error);
        navigate('/admin/users');
      }
    })()
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sales.put('users', {
        user_id: id,
        name: e.target[0].value,
      });

      setError(<p className='text-success fw-bold'>Gebruiker is succesvol opgeslagen</p>);
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
              <input type="text" className="form-control no-spinner" id="floatingPrice" onChange={e => setUser(e.target.value)} value={user} placeholder="Naam" required/>
              <label htmlFor="floatingPrice">Naam</label>
            </div>
          </div>

          {/* buttons */}
          <div className='d-flex justify-content-evenly mb-3'>
            <a onClick={e => navigate('/admin/users')} className="btn btn-danger">Terug</a>
            <button type="submit" className="btn btn-primary">Opslaan</button>
          </div>
          {error}
        </form>
      </div>
    </div>
  );
}

export default EditUser;