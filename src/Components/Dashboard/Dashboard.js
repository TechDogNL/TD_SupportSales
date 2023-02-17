import React from 'react';
import Navbar from '../Navbar/Navbar';
import ReactSpeedometer from "react-d3-speedometer"
import { Chart } from "react-google-charts";
import './Dashboard.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const besteVerkoper1 = [
    ["S.T.B.", "",],
    ["S.T.B , Jan", 5175],
    ["S.T.B , Feb", 3792],
    ["S.T.B , Mrt", 2695],
    ["S.T.B , Apr", 5099],
    ["S.T.B , Mei", 1526],
    ["S.T.B , Jun", 3426],
];
  

const options = {
    chartArea: { width: "50%" },
    colors: ["#2c475c"],
    hAxis: {
      minValue: 0,
    },
    vAxis: {
    },
};

const besteVerkoper2 = [
    ["S.T.B ", "",],
    ["S.T.B , Jul", 5175],
    ["S.T.B , Aug", 3792],
    ["S.T.B , Sep", 2695],
    ["S.T.B , Okt", 5099],
    ["S.T.B , Nov", 1526],
    ["S.T.B , Dec", 3426],
];
  
const options2 = {
    chartArea: { width: "50%" },
    colors: ["#2c475c"],
    hAxis: {
      minValue: 0,
    },
    vAxis: {
    },
};

const data = [
    ["", ""],
    ["S.T.B.", 1000],
    ["S.T.B.", 1170],
    ["S.T.B.", 660],
    ["S.T.B.", 1030],
    ["S.T.B.", 1000],
    ["S.T.B.", 1170],
    ["S.T.B.", 660],
    ["S.T.B.", 1030],
    ["S.T.B.", 1000],
    ["S.T.B.", 1170],
];
  
const optionsTotaal = {
    colors: ["#2c475c"],
    chart: {
    },
};

  const data2 = [
    ["", ""],
    ["2014", 1000],
    ["2015", 1170],
    ["2016", 660],
    ["2017", 1030],
    ["2014", 1000],
    ["2015", 1170],
    ["2016", 660],
    ["2017", 1030],
    ["2014", 1000],
    ["2015", 1170],
];
  
const optionsTotaal2 = {
    colors: ["#2c475c"],
    chart: {
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
                        <h5>Totaal</h5>
                        <h5>€12.977</h5>
                    </div>
                    <div className=' d-flex flex-column justify-content-evenly text-center'>
                        <h5>Gem</h5>
                        <h5>€577</h5>
                    </div>
                </div>
                <div className='smallBoxes'>
                    <div className=' d-flex flex-column justify-content-evenly text-center'>
                        <h5>Deals</h5>
                        <h5>1677</h5>
                    </div>
                </div>
                <div className='smallBoxes'>
                    <div className=' d-flex flex-column justify-content-evenly text-center'>
                        <h5>Nieuwe Deals</h5>
                        <h5>587</h5>
                    </div>
                </div>
                <div className='smallBoxes'>
                    <div className=' d-flex flex-column justify-content-evenly text-center'>
                        <h5>Nieuwe Totaal</h5>
                        <h5>€4077</h5>
                    </div>
                </div>
                <div className='smallBoxes'>
                    <div className=' d-flex flex-column justify-content-evenly text-center'>
                        <h5>Bestaande Deals</h5>
                        <h5>6377</h5>
                    </div>
                </div>
                <div className='smallBoxes'>
                    <div className=' d-flex flex-column justify-content-evenly text-center'>
                        <h5>Bestaande Totaal</h5>
                        <h5>€80.377</h5>
                    </div>
                </div>
            </div>
            <div className='d-flex flex-column col-4 ps-3 pe-3 pb-4 pt-4'>
                <div className='bigBoxes'>
                <h5 className='ps-4 pt-3 pb-2'>Beste verkoper van de maand</h5>
                    <div className='chartsBar mx-3 mb-3 d-flex flex-row justify-content-evenly'>
                    <Chart
                        chartType="BarChart"
                        width="90%"
                        height="250px"
                        data={besteVerkoper1}
                        options={options}
                    />
                       <Chart
                        chartType="BarChart"
                        width="90%"
                        height="250px"
                        data={besteVerkoper2}
                        options={options2}
                    />
                    </div>
                </div>
                <div className='bigBoxes'>
                    <div className='p-3 '>
                        <div className='mb-3 ps-3'>
                            <h4>Ranglijst</h4>
                        </div>
                        <div className='row ps-3'>
                            <div className='col-6 text-nowrap'>
                                <h5>1 Jane Doe</h5>
                                <h5>2 Jane Doe</h5>
                                <h5>3 Jane Doe</h5>
                                <h5>4 Jane Doe</h5>
                                <h5>5 Jane Doe</h5>
                            </div>
                            <div className='col-6 text-nowrap'>
                                <h5>6 Jane Doe</h5>
                                <h5>7 Jane Doe</h5>
                                <h5>8 Jane Doe</h5>
                                <h5>9 Jane Doe</h5>
                                <h5>10 Jane Doe</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='d-flex flex-column col-5 px-3 py-4'>
                <div className='midBoxes'>
                    <div className='speedoMeter d-flex p-4 justify-content-between'>
                        <div className='mb-3 col-5'>
                            <h4>Bonus</h4>
                            <div className='d-flex justify-content-center flex-column align-content-center h-100'>
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
                <div className='midBoxes p-2'>
                    <h4 className='p-2'>Personeel totaal van de maand</h4>
                    <div className='d-flex justify-content-center chart'>
                    <Chart
                        chartType="Bar"
                        width="100%"
                        height="100px"
                        data={data}
                        options={optionsTotaal}
                    />
                    </div>
                </div>
                <div className='midBoxes p-2'>
                    <h5 className='p-2'>Meest verkochte product van de maand</h5>
                    <div className='d-flex justify-content-center chart'>
                    <Chart
                        chartType="Bar"
                        width="100%"
                        height="100px"
                        data={data2}
                        options={optionsTotaal2}
                    />
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Dashboard;
