import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import sales from '../../Sales';
import '../Admin.css';

const EditBonus = () => {
  const navigate = useNavigate();
  const cookies = new Cookies;
  const { id } = useParams();

  const [bonus, setBonus] = useState({amount: '', text: '', date: ''});
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const [bonusResponse, loginResponse] = await Promise.all([
          sales.get(`bonuses?bonus_id=${id}`),
          sales.get(`login?ApiKey=${cookies.get('token')}`),
        ]);
  
        if (loginResponse.data.admin !== 1) {
          cookies.remove('token');
          navigate('/');
        }

        setBonus(bonusResponse.data);
      } catch (error) {
        console.warn(error);
        navigate('/admin/users');
      }
    })()
  }, []);

  const handleChange = (e) => {
    setBonus({...bonus, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sales.put('bonuses', {
        bonus_id: id,
        date: bonus.date,
        amount: bonus.amount,
        text: bonus.text,
      });

      setError(<p className='text-success fw-bold'>Bonus is succesvol opgeslagen</p>);
    } catch (error) {
      console.warn(error.response);
      setError(<p className='text-danger fw-bold'>Er is iets fout gegaan</p>);
    }
  }

  return (
    <div className='bg-info vh-100'>
      <div className='container text-center pt-5 w-50'>
        <form onSubmit={handleSubmit}>
          <h1 className='mb-3'>Bonus aanpassen</h1>
          {/* price input */}
          <div className='d-flex justify-content-center mb-5'>
            <div className="input-group w-50">
              <span className="input-group-text" id="basic-addon1">€</span>
              <div className="form-floating">
                <input type="number" step="0.01" onChange={handleChange} value={bonus.amount} name='amount' className="form-control no-spinner" id="floatingPrice" placeholder="Bedrag dat moet worden gehaald" required/>
                <label htmlFor="floatingPrice">Bedrag dat moet worden gehaald</label>
              </div>
            </div>
          </div>

          {/* text input */}
          <div className='d-flex justify-content-center mb-5'>
            <div className="form-floating w-50">
              <input type="text" onChange={handleChange} value={bonus.text} name='text' className="form-control no-spinner" id="floatingPrice" placeholder="Wat gaan we doen als het doel is bereikt?" required/>
              <label htmlFor="floatingPrice">Wat gaan we doen als het doel is bereikt?</label>
            </div>
          </div>

          {/* date input */}
          <div className='d-flex justify-content-center mb-5'>
            <div className="form-floating w-50">
              <input type="date" onChange={handleChange} value={bonus.date} name='date' className="form-control" id="floatingPrice" placeholder="Voor wanneer geld deze bonus" required/>
              <label htmlFor="floatingPrice">Voor wanneer geld deze bonus</label>
            </div>
          </div>

          {/* Buttons */}
          <div className='d-flex justify-content-evenly mb-3'>
            <a onClick={e => navigate('/admin/bonuses')} className="btn btn-danger">Terug</a>
            <button type="submit" className="btn btn-primary">Opslaan</button>
          </div>
          {error}
        </form>
      </div>
    </div>
  );
}

export default EditBonus;