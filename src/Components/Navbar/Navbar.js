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



const Navbar = () => {
  function capitalize(month) {
    return month.charAt(0).toUpperCase() + month.slice(1);
  }
  const now = dayjs().locale('nl').format();
  const [date, setDate] = useState(dayjs(now).locale('nl'));
  console.log(capitalize(date.format('MMMM')))
  console.log(date.year())
  console.log(date.add(-1, 'year'))
  const [popoverOpen, setPopoverOpen] = useState(false);

    return (
        <div>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid d-flex justify-content-center ">
                    <div className='col-3'>

                    </div>
                    <div className='col-6 d-flex justify-content-center'>
                        <img src={logo} id='logo' className="img-fluid" alt=""></img>
                    </div>
                    <div className='col-3'>
                    <Button type="button"  color="secondary" id="popoverButton" data-bs-toggle="popover" title="Popup title" data-bs-content="Popup content" onClick={e => setPopoverOpen(!popoverOpen)}>
                      Selecteer datum
                    </Button>
                    <Popover placement="bottom" isOpen={popoverOpen} target="popoverButton" toggle={e => setPopoverOpen(!popoverOpen)}>
                      <PopoverBody className='ps-2'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <MonthPicker className='MonthPicker' date={date} onChange={(newDate) => setDate(newDate.locale('nl'))} />
                        </LocalizationProvider>
                      </PopoverBody>
                    </Popover>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
