import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import sales from '../../Sales';
import '../Admin.css';

const NewProduct = () => {
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
      await sales.post('products', {
        name: e.target[0].value,
        price: e.target[1].value,
      });

      setError(<p className='text-success fw-bold'>Product succesvol aangemaakt</p>);
    } catch (error) {
      console.warn(error.response);
      setError(<p className='text-danger fw-bold'>Er is iets fout gegaan</p>);
    }
  }

  return (
    <div className='bg-info vh-100'>
      <div className='container text-center pt-5 w-50'>
        <form onSubmit={handleSubmit} autoCapitalize="true">
          <h1 className='mb-3'>Nieuwe Product</h1>
          {/* name input */}
          <div className='d-flex justify-content-center'>
            <div className="form-floating mb-5 w-50">
              <input type="text" className="form-control no-spinner" id="floatingPrice" placeholder="Product naam" required/>
              <label htmlFor="floatingPrice">Product naam</label>
            </div>
          </div>

          {/* price input */}
          <div className='d-flex justify-content-center mb-5'>
            <div className="input-group w-50">
              <span className="input-group-text" id="basic-addon1">€</span>
              <div className="form-floating">
                <input type="number" step="0.01" className="form-control no-spinner" id="floatingPrice" placeholder="Prijs" required/>
                <label htmlFor="floatingPrice">Prijs</label>
              </div>
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

export default NewProduct;