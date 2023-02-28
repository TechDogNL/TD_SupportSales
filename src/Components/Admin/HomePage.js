import React, { useEffect } from 'react';
import sales from '../Sales';
import Cookies from 'universal-cookie';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const HomePage = () => {
  const cookies = new Cookies;
  const navigate = useNavigate();

  const time = dayjs();

  useEffect(() => {
    (async () => {
      if (!cookies.get('token')) {
        navigate('/');
      }

      try {
        const res = await sales.get(`login?ApiKey=${cookies.get('token')}`);
        if (res.data.admin != 1) {
          navigate(`dashboard/${time.month() + 1}/${time.year()}`);
        }
      } catch (error) {
        console.warn(error.response);
        cookies.remove('token', {path: '/'});
        navigate('/');
      }
    })();
  }, []);

  const logout = () => {
    cookies.remove('token', {path: '/'});
    navigate('/');
  }

  return (
    <div className='adminBody vh-100'>
      <div className='container d-flex flex-row text-center pt-5 mb-5 align-items-center'>
        <div className='col-3 d-flex flex-column'>
          <h1>Deals</h1>
          <a className='fw-bold mb-3 hover-link' onClick={e => navigate('/admin/deals')}>Alle deals inzien</a>
          <a className='fw-bold hover-link' onClick={e => navigate('/admin/deals/new')}>Nieuwe deal</a>
        </div>
        <div className='col-3 d-flex flex-column'>
          <h1>Gebruikers</h1>
          <a className='fw-bold mb-3 hover-link' onClick={e => navigate('/admin/users')}>Alle gebruikers inzien</a>
          <a className='fw-bold hover-link' onClick={e => navigate('/admin/users/new')}>Nieuwe gebruiker</a>
        </div>
        <div className='col-3 d-flex flex-column'>
          <h1>Producten</h1>
          <a className='fw-bold mb-3 hover-link' onClick={e => navigate('/admin/products')}>Alle producten inzien</a>
          <a className='fw-bold hover-link' onClick={e => navigate('/admin/products/new')}>Nieuw product</a>
        </div>
        <div className='col-3 d-flex flex-column'>
          <h1>Bonuses</h1>
          <a className='fw-bold mb-3 hover-link' onClick={e => navigate('/admin/bonuses')}>Alle bonuses inzien</a>
          <a className='fw-bold hover-link' onClick={e => navigate('/admin/bonuses/new')}>Nieuwe bonus</a>
        </div>
      </div>
      <div className='text-center'>
        <p onClick={logout} className='btn btn-danger'>Uitloggen</p>
        <a className='fw-bold ms-3 hover-link' onClick={e => navigate('/admin/changePasswords')}>Wachtwoorden aanpassen</a>
      </div>
    </div>
  );
}

export default HomePage;