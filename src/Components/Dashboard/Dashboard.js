import React from 'react';
import Navbar from '../Navbar/Navbar';
import ReactSpeedometer from "react-d3-speedometer"
import { Chart } from "react-google-charts";
import './Dashboard.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const data = [
    ["City", "2010 Population", "2000 Population"],
    ["knikker, NY", 8175000, 8008000],
    ["Los Angeles, CA", 3792000, 3694000],
    ["Chicago, IL", 2695000, 2896000],
    ["Houston, TX", 2099000, 1953000],
    ["Philadelphia, PA", 1526000, 1517000],
  ];
  
const options = {
    title: "Population of Largest U.S. Cities",
    chartArea: { width: "50%" },
    colors: ["#b0120a", "#ffab91"],
    hAxis: {
      title: "Total Population",
      minValue: 0,
    },
    vAxis: {
      title: "City",
    },
  };

const Dashboard = () => {
    const textColor = '#ffffff'
    
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
            <div className='d-flex flex-column col-4 ps-3 pe-3 pb-4 pt-4'>
                <div className='bigBoxes'>
                    <div className='pt-3 mx-3 mb-3'>
                    <Chart
                        chartType="BarChart"
                        width="100%"
                        height="250px"
                        data={data}
                        options={options}
                    />
                    </div>
                </div>
                <div className='bigBoxes'>
                    <div className='p-4 h-100'>
                        <div className='mb-3 ps-3'>
                            <h3>Ranglijst</h3>
                        </div>
                        <div className='row ps-3'>
                            <div className='col-6 text-nowrap'>
                                <h4>1 Jane Doe</h4>
                                <h4>2 Jane Doe</h4>
                                <h4>3 Jane Doe</h4>
                                <h4>4 Jane Doe</h4>
                                <h4>5 Jane Doe</h4>
                            </div>
                            <div className='col-6 text-nowrap'>
                                <h4>6 Jane Doe</h4>
                                <h4>7 Jane Doe</h4>
                                <h4>8 Jane Doe</h4>
                                <h4>9 Jane Doe</h4>
                                <h4>10 Jane Doe</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='d-flex flex-column col-5 px-3 py-4'>
                <div className='midBoxes'>
                    <div className='container d-flex p-4 justify-content-between'>
                        <div className='mb-3 col-5'>
                            <h4>Bonus</h4>
                            <div className='d-flex container justify-content-center flex-column align-content-center h-50'>
                                <h5>Bedrag: € 7500</h5>
                                <h5>Te gaan: € 2500</h5>
                            </div>
                        </div>
                        <div className='col-7'>
                            <ReactSpeedometer
                                className='reactSpeed'
                                minValue={0}
                                maxValue={100}
                                needleHeightRatio={0.7}
                                segments={7}
                                needleColor={'black'}
                                labelFontSize={'0'}
                                segmentColors={['#67b7dc', '#6794dc', '#6771dc', '#8067dc', '#a367dc', '#c767dc', '#dc67ce', '#dc67ce']}
                                customSegmentStops={[0, 30, 50, 70, 80, 90, 95, 97, 100]}
                                value={50}
                                textColor={textColor}
                            />
                        </div>
                    </div>
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
