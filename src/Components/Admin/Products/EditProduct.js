import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import sales from '../../Sales';
import '../Admin.css';

const EditProduct = () => {
  const navigate = useNavigate();
  const cookies = new Cookies;
  const { id } = useParams();

  const [product, setProduct] = useState({name: '', price: ''});
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
        const [productResponse, loginResponse] = await Promise.all([
          sales.get(`products?product_id=${id}`),
          sales.get(`login?ApiKey=${cookies.get('token')}`),
        ]);
  
        if (loginResponse.data.admin !== 1) {
          cookies.remove('token', {path: '/'});
          navigate('/');
        }

        const price = productResponse.data.price;
        
        price ? productResponse.data.price = price.toString().replace('.', ',') : productResponse.data.price = '';
        setProduct(productResponse.data);
      } catch (error) {
        console.warn(error);
        navigate('/admin/products');
      }
    })()
  }, []);

  const handleChange = (e) => {
    setProduct({...product, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sales.put('products', {
        product_id: id,
        name: product.name,
        price: product.price.replace(',', '.'),
      });

      setError(<p className='text-success fw-bold'>Product is succesvol opgeslagen</p>);
    } catch (error) {
      console.warn(error.response);
      setError(<p className='text-danger fw-bold'>Er is iets fout gegaan</p>);
    }
  }

  return (
    <div className='adminBody vh-100'>
      <div className='container text-center pt-5 w-50'>
        <form onSubmit={handleSubmit} autoComplete='off'>
          <h1 className='mb-3'>Product aanpassen</h1>
          {/* name input */}
          <div className='d-flex justify-content-center'>
            <div className="form-floating mb-5 w-50">
              <input type="text" onChange={handleChange} value={product.name} name='name' className="form-control no-spinner" id="floatingPrice" placeholder="Product naam" required/>
              <label htmlFor="floatingPrice">Product naam</label>
            </div>
          </div>

          {/* price input */}
          <div className='d-flex justify-content-center mb-5'>
            <div className="input-group w-50">
              <span className="input-group-text" id="basic-addon1">€</span>
              <div className="form-floating">
                <input type="text" onChange={handleChange} value={product.price} name='price' className="form-control no-spinner" id="floatingPrice" placeholder="Prijs"/>
                <label htmlFor="floatingPrice">Prijs</label>
              </div>
            </div>
          </div>

          {/* buttons */}
          <div className='d-flex justify-content-evenly mb-3'>
            <a onClick={e => navigate('/admin/products')} className="btn btn-danger">Terug</a>
            <button type="submit" className="btn btn-primary">Opslaan</button>
          </div>
          {error}
        </form>
      </div>
    </div>
  );
}

export default EditProduct;