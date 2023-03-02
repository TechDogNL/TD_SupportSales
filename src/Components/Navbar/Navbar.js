import React, { useState } from 'react';
import logo from './logotechdoggroupmetpayoff.png';
import './Navbar.css';
import { Button, Popover, PopoverBody } from 'reactstrap';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/nl';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MonthPicker } from '@mui/x-date-pickers/MonthPicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faCalendar } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';

const Navbar = () => {
  const { month, year } = useParams();
  const cookies = new Cookies();

  const now = dayjs(`${year}-${month}`).locale('nl');

  const navigate = useNavigate();

  const [popoverOpen, setPopoverOpen] = useState(false);

  const handelChange = (time) => {
    navigate(`/dashboard/${time.month() + 1}/${time.year()}`);
  }

  function capitalize(month) {
    return month.charAt(0).toUpperCase() + month.slice(1);
  }

  const logOut = () => {
    cookies.remove('token', {path: '/'});
    navigate('/');
  }
  
  return (
    <div>
      <nav className="navbar navbar-light bg-white">
        <div className="container-fluid d-flex justify-content-center p-0 mt-0">
          <div className='col-3'>
            <button className="myButton w-100 h-100" onClick={logOut}>Uitloggen</button>
          </div>
          <div className='col-6 d-flex justify-content-center'>
            <img src={logo} id='logoNav' className="img-fluid" alt=""></img>
          </div>
          <div className='col-3 d-flex justify-content-end'>
            <Button type="button"  color="secondary" id="popoverButton" data-bs-toggle="popover" data-bs-content="Popup content" onClick={e => setPopoverOpen(!popoverOpen)}>
              <FontAwesomeIcon icon={faCalendar} />
            </Button>
            <Popover className='bodyPopover' placement="bottom" isOpen={popoverOpen} target="popoverButton" toggle={e => setPopoverOpen(!popoverOpen)}>
              <PopoverBody className='bodyPopover ps-2'>
                <div className=' d-flex flex-nowrap justify-content-center'>
                  <button type="button" name="" id="" onClick={e => navigate(`/dashboard/${now.month() + 1}/${now.year() - 1}`)} className="btn p-0 me-2"><FontAwesomeIcon icon={faChevronLeft} /></button>
                  <h5 className='date m-0'>{capitalize(now.format('MMMM'))} {now.year()}</h5>
                  <button type="button" name="" id="" onClick={e => navigate(`/dashboard/${now.month() + 1}/${now.year() + 1}`)} className="btn p-0 ms-2"><FontAwesomeIcon icon={faChevronRight} /></button>
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MonthPicker className='MonthPicker' date={now} onChange={handelChange} />
                </LocalizationProvider>
              </PopoverBody>
            </Popover>
            <div className='month' onClick={e => setPopoverOpen(!popoverOpen)}>
              <p className='MonthShow rounded-2 py-1 border-4'>{now.format('MMM').toUpperCase()}</p>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;