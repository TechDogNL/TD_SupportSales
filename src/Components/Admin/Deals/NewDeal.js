import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import sales from '../../Sales';
import '../Admin.css';

const NewDeal = () => {
  const navigate = useNavigate();
  const cookies = new Cookies;

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({name: 'Kies een gebruiker'});
  const [product, setProduct] = useState({name: 'Kies een product'});
  const [dealStatus, setDealStatus] = useState(0);
  const [price, setPrice] = useState('');
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
        const [usersResponse, productsResponse, loginResponse] = await Promise.all([
          sales.get(`users?filter=true`),
          sales.get(`products?filter=true`),
          sales.get(`login?ApiKey=${cookies.get('token')}`),
        ]);
        
        if (loginResponse.data.admin !== 1) {
          cookies.remove('token', {path: '/'});
          navigate('/');
        }
  
        setUsers(usersResponse.data);
        setProducts(productsResponse.data); 
      } catch (error) {
        console.warn(error);
        cookies.remove('token', {path: '/'});
        navigate('/'); 
      }
    })()
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.user_id || !product.product_id) { // checks if user and product are selected
      setError(<p className='text-danger fw-bold'>Vul alles in</p>);
      return;
    }

    try {
      await sales.post('deals', {
        user_id: user.user_id,
        product_id: product.product_id,
        price: e.target[2].value,
        created_at: e.target[3].value,
        status: dealStatus,
        business: e.target[4].value,
      });

      // sets all the data empty
      setUser({name: 'Kies een gebruiker'});
      setProduct({name: 'Kies een product'});
      setPrice('');
      e.target[3].value = '';
      e.target[4].value = '';
      setDealStatus(0);

      setError(<p className='text-success fw-bold'>Deal succesvol aangemaakt</p>);
    } catch (error) {
      console.warn(error.response);
      setError(<p className='text-danger fw-bold'>Er is iets fout gegaan</p>);
    }
  }

  const handlePrice = (product) => {
    setProduct(product);
    if (product.price) {
      setPrice(product.price);
    }
  }

  return (
    <div className='adminBody vh-100'>
      <div className='container text-center pt-5 w-50'>
        <form onSubmit={handleSubmit} autoComplete='off'>
          <h1 className='mb-3'>Nieuwe Deal</h1>
          {/* dropdowns */}
          <div className='d-flex justify-content-center mb-5'>
            <div className="dropdown pe-2">
              <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {user.name}
              </button>
              <ul className="dropdown-menu scrollable-menu">
                {users.map(user => (
                  <li key={user.user_id}><a className="dropdown-item" onClick={e => setUser(user)}>{user.name}</a></li>
              ))}
              </ul>
            </div>
            <div className="dropdown ps-2">
              <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {product.name}
              </button>
              <ul className="dropdown-menu">
                {products.map(product => (
                  <li key={product.product_id}><a className="dropdown-item" onClick={e => handlePrice(product)}>{product.name}</a></li>
                ))}
              </ul>
            </div>
          </div>

          {/* price input */}
          <div className='d-flex justify-content-center mb-3'>
            <div className="input-group w-50">
              <span className="input-group-text" id="basic-addon1">???</span>
              <div className="form-floating">
                <input type="number" step="0.01" className="form-control no-spinner" onChange={e => setPrice(e.target.value)} value={price} id="floatingPrice" placeholder="Prijs" required/>
                <label htmlFor="floatingPrice">Prijs</label>
              </div>
            </div>
          </div>

          {/* date input */}
          <div className='d-flex justify-content-center mb-3'>
            <div className="form-floating w-50">
              <input type="date" className="form-control no-spinner" id="floatingPrice" placeholder="Wanner is deze deal gemaakt?" required/>
              <label htmlFor="floatingPrice">Wanner is deze deal gemaakt?</label>
            </div>
          </div>

          {/* business input */}
          <div className='d-flex justify-content-center mb-5'>
            <div className="form-floating w-50">
              <input type="text" className="form-control no-spinner" id="floatingPrice" placeholder="Bedrijf" required/>
              <label htmlFor="floatingPrice">Bedrijf</label>
            </div>
          </div>
          
          {/* radio buttons */}
          <div className="form-check form-check-inline mb-5">
            <input className="form-check-input" type="radio" onClick={e => setDealStatus(0)} name="inlineRadioOptions" id="inlineRadio1" value="0" defaultChecked/>
            <label className="form-check-label" htmlFor="inlineRadio1">Bestaande deal</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" onClick={e => setDealStatus(1)} name="inlineRadioOptions" id="inlineRadio2" value="1"/>
            <label className="form-check-label" htmlFor="inlineRadio2">Nieuwe deal</label>
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

export default NewDeal;