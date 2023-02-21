import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import ReactSpeedometer from "react-d3-speedometer"
import { Chart } from "react-google-charts";
import axios from 'axios';
import './Dashboard.css'
import './ChartStyles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMedal } from '@fortawesome/free-solid-svg-icons'




const bestSeller = [
    ["S.T.B.h.", "",],
    ["S.T.B.H.", 10175],
    ["S.T.B", 3792],
    ["S.T.B", 2695],
    ["S.T.B", 5099],

];
  

const options = {
    chartArea: { width: "60%" },
    backgroundColor: 'transparent',
    colors: ["#2c475c"],
    hAxis: {
      minValue: 0,
    },
    vAxis: {
    },
};

const bestService = [
    ["S.T.B ", "",],
    ["S.T.B , Jul", 5175],
    ["S.T.B , Aug", 3792],
    ["S.T.B , Sep", 2695],
    ["S.T.B , Okt", 5099],
];
  
const optionsServices = {
    chartArea: { width: "60%" },
    backgroundColor: 'transparent',
    colors: ["#2c475c"],
    hAxis: {
      minValue: 0,
    },
    vAxis: {
    },
};

  const data2 = [
    ["", ""],
    ["Jan", 1000],
    ["Feb", 1170],
    ["Mrt", 660],
    ["Apr", 1030],
    ["Mei", 1000],
    ["Jun", 1170],
    ["Jul", 660],
    ["Aug", 1030],
    ["Sep", 1000],
    ["Okt", 1170],
    ["Nov", 1000],
    ["Dec", 1170],
];
  
const optionsTotaal2 = {
    colors: ["#2c475c"],
    chart: {
    },
};

const Dashboard = () => {

    const [bestSeller, setBestSeller] = useState([]);

    // const fetchAll = () => {
    //     axios.get('https://support.sales.techdog.cloud/api/rankList', {
    //         ApiKey: 
    //     });
    // }

    // useEffect(() => {
    //     fetchAll();
    // }, []);

    const textColor = '#ffffff'
    
    return (
        <div className='body'>
        <Navbar />
        <div className='box-container d-flex flex-column'>
            <div className='d-flex flex-row col-12 px-3 pt-1 pb-1 my-1 justify-content-between'>
                <div className='midbox d-flex col-3 m-2 rounded-2  flex-column align-content-center'>
                <div className='mt-3  d-flex justify-content-center'>
                        <h5>Ranglijst van {}</h5>
                    </div>
                    <div className='d-flex justify-content-center pb-1'>
                    <Chart
                        chartType="BarChart"
                        width="101%"
                        height="250px"
                        data={bestSeller}
                        options={options}
                    />
                    </div>
                </div>
                <div className='bigbox col-5 m-2 rounded-2'>
                <div className='my-3  d-flex justify-content-center'>
                            <h4>Team target van {}</h4>
                        </div>
                <div className='speedoMeter d-flex p-4 justify-content-evenly'>
                            <div className='d-flex justify-content-center flex-column align-content-between'>
                                <h4 className='current'>Bedrag: € 7500</h4>
                                <h4 className='toGo'>Te gaan: € 2500</h4>
                            </div>
                        <div className=''>
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
                                value={40}
                                textColor={textColor}
                            />
                        </div>
                    </div>
                </div>
                <div className='midbox col-3 m-2 rounded-2 d-flex flex-column justify-content-center'>
                <div className='mt-3  d-flex justify-content-center'>
                        <h5>Verkochte diensten in {}</h5>
                    </div>
                    <div className='d-flex justify-content-center pb-1'>
                    <Chart
                        chartType="BarChart"
                        width="101%"
                        height="250px"
                        data={bestService}
                        options={optionsServices}
                    />
                    </div>
                </div>
            </div>
            <div className='d-flex flex-row col-12 px-3 pb-3 pt-1 justify-content-between'>
                <div className='biggestbox col-7 ms-2 rounded-2'>
                    <div className='d-flex justify-content-center p-3'>
                        <h4>Ranglijst afgelopen 12 maanden</h4>
                    </div>
                    <div className=' m-4'>
                    <Chart
                        chartType="Bar"
                        width="100%"
                        height="125px"
                        data={data2}
                        options={optionsTotaal2}
                    />
                    </div>
                </div>
                <div className='col-5 d-flex flex-column justify-content-between'>
                    <div className='col-12 ms-2 d-flex flex-row justify-content-around mb-2'>
                        <div className='smallboxes col-5 rounded-2 p-3 d-flex text-center flex-column'>
                            <p className='text mb-2'>Beste verkoper van de afgelopen maand</p>
                            <h3 className='sellerofthemonth'>Sven  <FontAwesomeIcon icon={faMedal} className="icon" /></h3>
                        </div>
                        <div className='smallboxes col-5 rounded-2 p-2 text-nowrap d-flex text-center flex-column'>
                        <div>
                                <p className='m-0'>Totaal vorige maand</p>
                                <h4 className='totalmoney'>€ 10.000</h4>
                            </div>
                            <div className='d-flex justify-content-around text-wrap flex-row'>
                                <div>
                                    <p className='m-0'>Deals</p>
                                    <h5 className='dealsAndGemOrders'>124</h5>
                                </div>
                                <div>
                                    <p className='m-0'>Gem. order</p>
                                    <h5 className='dealsAndGemOrders'>€ 80,65</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 d-flex ms-2 flex-row justify-content-around mt-2'>
                        <div className='smallboxes col-5 rounded-2 p-2 text-nowrap d-flex text-center flex-column'>
                            <div>
                                <p className='m-0'>Totaal nieuwe deals</p>
                                <h4 className='totalmoney'>€ 10.000</h4>
                            </div>
                            <div className='d-flex justify-content-around text-wrap flex-row'>
                                <div>
                                    <p className='m-0'>Deals</p>
                                    <h5 className='dealsAndGemOrders'>124</h5>
                                </div>
                                <div>
                                    <p className='m-0'>Gem. order</p>
                                    <h5 className='dealsAndGemOrders'>€ 80,65</h5>
                                </div>
                            </div>
                        </div>
                        <div className='smallboxes col-5 rounded-2 p-2 text-nowrap d-flex text-center flex-column'>
                        <div>
                                <p className='m-0'>Totaal bestaande deals</p>
                                <h4 className='totalmoney'>€ 10.000</h4>
                            </div>
                            <div className='d-flex justify-content-around text-wrap flex-row'>
                                <div>
                                    <p className='m-0'>Deals</p>
                                    <h5 className='dealsAndGemOrders'>124</h5>
                                </div>
                                <div>
                                    <p className='m-0'>Gem. order</p>
                                    <h5 className='dealsAndGemOrders'>€ 80,65</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    );
}

export default Dashboard;
