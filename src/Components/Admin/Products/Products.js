import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import sales from '../../Sales';
import '../Admin.css';

const Products = () => {
  const navigate = useNavigate();
  const cookies = new Cookies;

  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  const fetchAll = async () => {
    try {
      const [productsResponse, loginResponse] = await Promise.all([
        sales.get(`products`),
        sales.get(`login?ApiKey=${cookies.get('token')}`),
      ]);

      if (loginResponse.data.admin !== 1) {
        cookies.remove('token');
        navigate('/');
      }

      productsResponse.data.sort((a, b) => { // sorts names on alphabetical order
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        } else {
          return 0;
        }
      });

      setProducts(productsResponse.data)
    } catch (error) {
      console.warn(error);
      cookies.remove('token');
      navigate('/');
    }
  }

  useEffect(() => {
    fetchAll();
  }, []);

  const ProductsTable = () => {
    const itemsPerPage = 7;
    const [currentPage, setCurrentPage] = useState(1);

    const maxButtons = 5;
    const pagesCount = Math.ceil(products.length / itemsPerPage);
  
    function handlePageClick(page) {
      setCurrentPage(page);
    }
  
    const startPage = Math.max(currentPage - Math.floor(maxButtons / 2), 1);
    const endPage = Math.min(startPage + maxButtons - 1, pagesCount);
  
    function generatePages(start, end) {
      const pages = [];
      for (let i = start; i <= end; i++) {
        pages.push(
          <button key={i} onClick={() => handlePageClick(i)} className={`btn btn-primary mx-1 ${currentPage === i ? "active" : ""}`}>
            {i}
          </button>
        );
      }
      return pages;
    }
  
    const pages = generatePages(startPage, endPage);
  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const itemsToShow = products.slice(startIndex, startIndex + itemsPerPage);
  
    const deleteProduct = async (product_id) => {
      try {
        const confirmed = window.confirm('WARNING!!! Als je dit product verwijderd worden ook alle deals van dit product verwijderd. Deze functie kan NIET ongedaan worden!');
        if (!confirmed) {
          return;
        }

        await sales.delete(`products?product_id=${product_id}`);
        setError(<p className='text-success fw-bold'>Product is succesvol verwijderd</p>)
        fetchAll();
      } catch (error) {
        console.warn(error);
        setError(<p className='text-danger fw-bold'>Er is iets fout gegaan</p>);
      }
    }
  
    return (
      <div>
        <div className="table-responsive text-center">
          <table className="table table-striped table-hover	table-borderless table-primary align-middle">
            <thead>
              <tr>
                <th>Product</th>
                <th>Prijs</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {itemsToShow.map((product) => (
                <tr key={product.product_id}>
                  <td>{product.name}</td>
                  <td>€ {product.price.toString().replace('.', ',')}</td>
                  <td><p onClick={e => navigate(`/admin/products/${product.product_id}`)} className='btn btn-primary'>Aanpassen</p></td>
                  <td><p onClick={e => deleteProduct(product.product_id)} className='btn btn-danger'>Verwijder</p></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='text-center'>
          {currentPage > 1 && (
            <button onClick={() => handlePageClick(pagesCount - pagesCount + 1)} className="btn btn-primary mx-1">
              {"<<"}
            </button>
          )}
          {currentPage > 1 && (
            <button onClick={() => handlePageClick(currentPage - 1)} className="btn btn-primary mx-1">
              {"<"}
            </button>
          )}
          {pages}
          {currentPage < pagesCount && (
            <button onClick={() => handlePageClick(currentPage + 1)} className="btn btn-primary mx-1">
              {">"}
            </button>
          )}
          {currentPage < pagesCount && (
            <button onClick={() => handlePageClick(pagesCount)} className="btn btn-primary mx-1">
              {">>"}
            </button>
          )}
        </div>
        <div className='text-center'>
          <p>{currentPage} van de {pagesCount}</p>
        </div>
        <div className='text-center'>
          {error}
        </div>
        <div>
          <a onClick={e => navigate('/admin')} className='btn btn-danger'>Terug</a>
        </div>
      </div>
    );
  };

  return (
    <div className='bg-info vh-100'>
      <div className='container pt-5'>
        <div className='text-center'>
          <h1>Producten</h1>
        </div>
        <ProductsTable/>
      </div>
    </div>
  );
}

export default Products;