import React, { useState } from 'react';
import logo from './logotechdoggroupmetpayoff.png';
import './Navbar.css';
import { Button, Popover, PopoverBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navbar = () => {

const [selectedDate, setSelectedDate] = useState(null);

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
                    <Button
              type="button"
              color="secondary"
              id="popoverButton"
              data-bs-toggle="popover"
              title="Popup title"
              data-bs-content="Popup content"
              onClick={e => setPopoverOpen(!popoverOpen)}
            >
              Selecteer datum
            </Button>
            <Popover
              placement="bottom"
              isOpen={popoverOpen}
              target="popoverButton"
              toggle={e => setPopoverOpen(!popoverOpen)}
            >
              <PopoverBody> 
              </PopoverBody>
            </Popover>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
