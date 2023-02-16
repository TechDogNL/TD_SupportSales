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



const Navbar = () => {
  function capitalize(month) {
    return month.charAt(0).toUpperCase() + month.slice(1);
  }
  const now = dayjs().locale('nl').format();
  const [date, setDate] = useState(dayjs(now).locale('nl'));
  console.log(capitalize(date.format('MMMM')))
  // console.log(date.add(-1, 'year'))
  // console.log(date.year())
  const [popoverOpen, setPopoverOpen] = useState(false);


    return (
        <div>
            <nav className="navbar navbar-light bg-white">
                <div className="container-fluid d-flex justify-content-center p-0 mt-0">
                    <div className='col-3'>
                    </div>
                    <div className='col-6 d-flex justify-content-center'>
                        <img src={logo} id='logo' className="img-fluid" alt=""></img>
                    </div>
                    <div className='col-3 d-flex justify-content-end'>
                    <Button type="button"  color="secondary" id="popoverButton" data-bs-toggle="popover" data-bs-content="Popup content" onClick={e => setPopoverOpen(!popoverOpen)}>
                      <FontAwesomeIcon icon={faCalendar} />
                    </Button>
                    <Popover className='bodyPopover' placement="bottom" isOpen={popoverOpen} target="popoverButton" toggle={e => setPopoverOpen(!popoverOpen)}>
                      <PopoverBody className='bodyPopover ps-2'>
                        <div className=' d-flex flex-nowrap justify-content-center'>
                          <button type="button" name="" id="" className="btn p-0 me-2"><FontAwesomeIcon icon={faChevronLeft} /></button>
                          <h5 className='date m-0'>{capitalize(date.format('MMMM'))} {date.year()}</h5>
                          <button type="button" name="" id="" className="btn p-0 ms-2"><FontAwesomeIcon icon={faChevronRight} /></button>
                        </div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <MonthPicker className='MonthPicker' date={date} onChange={(newDate) => setDate(newDate.locale('nl'))} />
                        </LocalizationProvider>
                      </PopoverBody>
                    </Popover>
                    <div className='month' onClick={e => setPopoverOpen(!popoverOpen)}>
                      <p className='MonthShow rounded-2 py-1 border-4'>{date.format('MMM').toUpperCase()}</p>
                    </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
