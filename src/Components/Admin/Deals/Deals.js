import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import sales from '../../Sales';
import '../Admin.css';

const Deals = () => {

  const navigate = useNavigate();
  const cookies = new Cookies;

  const [deals, setDeals] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  const fetchAll = async () => {
    try {
      const [dealsResponse, usersResponse, productsResponse, loginResponse] = await Promise.all([
        sales.get(`deals`),
        sales.get(`users`),
        sales.get(`products`),
        sales.get(`login?ApiKey=${cookies.get('token')}`),
      ]);

      if (loginResponse.data.admin !== 1) {
        cookies.remove('token', {path: '/'});
        navigate('/');
      }
  
      dealsResponse.data.sort((deal1, deal2) => {
        const date1 = new Date(deal1.created_at);
        const date2 = new Date(deal2.created_at);
        return date2 - date1;
      });
  
      setDeals(dealsResponse.data);
      setUsers(usersResponse.data);
      setProducts(productsResponse.data);
    } catch (error) {
      console.warn(error);
      cookies.remove('token', {path: '/'});
      navigate('/');
    }
  }

  useEffect(() => {
    fetchAll();
  }, []);

  const DealsTable = () => {
    const itemsPerPage = 7;
    const [currentPage, setCurrentPage] = useState(1);

    const maxButtons = 5;
    const pagesCount = Math.ceil(deals.length / itemsPerPage);
  
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
    const itemsToShow = deals.slice(startIndex, startIndex + itemsPerPage);

    const user = (user_id) => {
      const user = users.find(user => user.user_id === user_id);
      return user.name;
    }
  
    const product = (deal) => {
      const product = products.find(product => product.product_id === deal.product_id);
      return product.name;
    }

    const status = (status) => {
      switch (status) {
        case 1:
          return 'Niewe deal';
        default:
          return 'Bestaande deal';
      }
    }
  
    const deleteDeal = async (deal_id) => {
      try {
        const confirmed = window.confirm('WARNING!!! Weet je zeker dat je deze deal wilt verwijderen. Deze functie kan NIET ongedaan worden!');
        if (!confirmed) {
          return;
        }

        await sales.delete(`deals?deal_id=${deal_id}`);
        setError(<p className='text-success fw-bold'>Deal is succesvol verwijderd</p>)
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
                <th>Gebruiker</th>
                <th>Product</th>
                <th>Price</th>
                <th>Status</th>
                <th>Datum aangemaakt</th>
                <th>Bedrijf</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {itemsToShow.map((deal) => (
                <tr key={deal.deal_id}>
                  <td>{user(deal.user_id)}</td>
                  <td>{product(deal)}</td>
                  <td>€ {deal.price.toFixed(2).toString().replace('.', ',')}</td>
                  <td>{status(deal.status)}</td>
                  <td>{deal.created_at}</td>
                  <td>{deal.business}</td>
                  <td><p onClick={e => navigate(`/admin/deals/${deal.deal_id}`)} className='btn btn-primary'>Aanpassen</p></td>
                  <td><p onClick={e => deleteDeal(deal.deal_id)} className='btn btn-danger'>Verwijder</p></td>
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
    <div className='adminBody vh-100'>
      <div className='container pt-5'>
        <DealsTable/>
      </div>
    </div>
  );
}

export default Deals;