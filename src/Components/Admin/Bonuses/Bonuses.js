import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import sales from '../../Sales';
import '../Admin.css';

const Bonuses = () => {
  const navigate = useNavigate();
  const cookies = new Cookies;

  const [bonuses, setBonuses] = useState([]);
  const [error, setError] = useState('');

  const fetchAll = async () => {
    try {
      const [bonusesResponse, loginResponse] = await Promise.all([
        sales.get(`bonuses`),
        sales.get(`login?ApiKey=${cookies.get('token')}`),
      ]);

      if (loginResponse.data.admin !== 1) {
        cookies.remove('token');
        navigate('/');
      }

      bonusesResponse.data.sort((bonus1, bonus2) => {
        const date1 = new Date(bonus1.date);
        const date2 = new Date(bonus2.date);
        return date2 - date1;
      });

      setBonuses(bonusesResponse.data)
    } catch (error) {
      console.warn(error);
      cookies.remove('token');
      navigate('/');
    }
  }

  useEffect(() => {
    fetchAll();
  }, []);

  const BonusesTable = () => {
    const itemsPerPage = 7;
    const [currentPage, setCurrentPage] = useState(1);

    const maxButtons = 5;
    const pagesCount = Math.ceil(bonuses.length / itemsPerPage);
  
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
    const itemsToShow = bonuses.slice(startIndex, startIndex + itemsPerPage);
  
    const date = (date) => {
      date = date.split('-');
      return `${date[1]}-${date[0]}`;
    }

    const deleteBonus = async (bonus_id) => {
      try {
        const confirmed = window.confirm('WARNING!!! Weet je zeker dat je deze bonus wil verwijderen. Deze functie kan NIET ongedaan worden!');
        if (!confirmed) {
          return;
        }

        await sales.delete(`bonuse?bonus_id=${bonus_id}`);
        setError(<p className='text-success fw-bold'>Bonus is succesvol verwijderd</p>)
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
                <th>Datum</th>
                <th>Doel</th>
                <th>Wat we gaan doen</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {itemsToShow.map((bonus) => (
                <tr key={bonus.bonus_id}>
                  <td>{date(bonus.date)}</td>
                  <td>{bonus.amount}</td>
                  <td>{bonus.text}</td>
                  <td><p onClick={e => navigate(`/admin/bonuses/${bonus.bonus_id}`)} className='btn btn-primary'>Aanpassen</p></td>
                  <td><p onClick={e => deleteBonus(bonus.bonus_id)} className='btn btn-danger'>Verwijder</p></td>
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
        <BonusesTable/>
      </div>
    </div>
  );
}

export default Bonuses;