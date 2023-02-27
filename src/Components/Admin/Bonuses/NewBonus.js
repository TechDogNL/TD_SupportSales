import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import sales from '../../Sales';
import '../Admin.css';

const NewBonus = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [error, setError] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sales.post('bonuses', {
        amount: e.target[0].value,
        text: e.target[1].value,
        date: e.target[2].value,
      });

      setError(<p className='text-success fw-bold'>Bonus succesvol aangemaakt</p>);
    } catch (error) {
      console.warn(error.response);
      setError(<p className='text-danger fw-bold'>Er is iets fout gegaan</p>);
    }
  }

  return (
    <div className='bg-info vh-100'>
      <div className='container text-center pt-5 w-50'>
        <form onSubmit={handleSubmit}>
          <h1 className='mb-3'>Nieuwe Bonus</h1>
          {/* price input */}
          <div className='d-flex justify-content-center mb-5'>
            <div className="input-group w-50">
              <span className="input-group-text" id="basic-addon1">€</span>
              <div className="form-floating">
                <input type="number" className="form-control no-spinner" id="floatingPrice" placeholder="Bedrag dat moet worden gehaald" required/>
                <label htmlFor="floatingPrice">Bedrag dat moet worden gehaald</label>
              </div>
            </div>
          </div>

          {/* text input */}
          <div className='d-flex justify-content-center mb-5'>
            <div className="form-floating w-50">
              <input type="text" className="form-control no-spinner" id="floatingPrice" placeholder="Wat gaan we doen als het doel is bereikt?" required/>
              <label htmlFor="floatingPrice">Wat gaan we doen als het doel is bereikt?</label>
            </div>
          </div>

          {/* date input */}
          <div className='d-flex justify-content-center mb-5'>
            <div className="form-floating w-50">
              <input type="date" className="form-control no-spinner" id="floatingPrice" placeholder="Voor wanneer geld deze bonus" required/>
              <label htmlFor="floatingPrice">Voor wanneer geld deze bonus</label>
            </div>
          </div>

          {/* Buttons */}
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

export default NewBonus;