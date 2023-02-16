import React from 'react';
import Navbar from '../Navbar/Navbar';
import './Dashboard.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const Dashboard = () => {
    return (
    <div className='body'>
        <Navbar />
        <div className='box-container d-flex'>
            <div className='d-flex flex-column col-3 ps-3 pe-3 pb-4 pt-4'>
                <div className='smallBoxes'>
                    <div className=' d-flex flex-column justify-content-evenly text-center'>
                        <h3>Totaal</h3>
                        <h3>€12.977</h3>
                    </div>
                    <div className=' d-flex flex-column justify-content-evenly text-center'>
                        <h3>Gem</h3>
                        <h3>€577</h3>
                    </div>
                </div>
                <div className='smallBoxes'>
                    <div className=' d-flex flex-column justify-content-evenly text-center'>
                        <h3>Deals</h3>
                        <h3>1677</h3>
                    </div>
                </div>
                <div className='smallBoxes'>
                    <div className=' d-flex flex-column justify-content-evenly text-center'>
                        <h3>Nieuwe Deals</h3>
                        <h3>587</h3>
                    </div>
                </div>
                <div className='smallBoxes'>
                    <div className=' d-flex flex-column justify-content-evenly text-center'>
                        <h3>Nieuwe Totaal</h3>
                        <h3>€4077</h3>
                    </div>
                </div>
                <div className='smallBoxes'>
                    <div className=' d-flex flex-column justify-content-evenly text-center'>
                        <h3>Bestaande Deals</h3>
                        <h3>6377</h3>
                    </div>
                </div>
                <div className='smallBoxes'>
                    <div className=' d-flex flex-column justify-content-evenly text-center'>
                        <h3>Bestaande Totaal</h3>
                        <h3>€80.377</h3>
                    </div>
                </div>
            </div>
            <div className='d-flex flex-column col-5 ps-3 pe-3 pb-4 pt-4'>
                <div className='bigBoxes'>
                    <div className='h-100'>
                        <h1>Sorry</h1>
                    </div>
                </div>
                <div className='bigBoxes'>
                    <div className='p-4 h-100'>
                        <div className='mb-3 ps-3'>
                            <h3 className=''>Ranglijst</h3>
                        </div>
                        <div className='row ps-3'>
                            <div className='col-6'>
                                <h2>1 Jane Doe</h2>
                                <h2>2 Jane Doe</h2>
                                <h2>3 Jane Doe</h2>
                                <h2>4 Jane Doe</h2>
                                <h2>5 Jane Doe</h2>
                            </div>
                            <div className='col-6'>
                                <h2>6 Jane Doe</h2>
                                <h2>7 Jane Doe</h2>
                                <h2>8 Jane Doe</h2>
                                <h2>9 Jane Doe</h2>
                                <h2>10 Jane Doe</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='d-flex flex-column col-4 ps-3 pe-3 pb-4 pt-4'>
                <div className='midBoxes'>
                    <h1>Sorry</h1>
                </div>
                <div className='midBoxes'>
                    <h1>Sorry</h1>
                </div>
                <div className='midBoxes'>
                    <h1>Sorry</h1>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Dashboard;
