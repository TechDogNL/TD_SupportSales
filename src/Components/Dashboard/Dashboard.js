import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import ReactSpeedometer from "react-d3-speedometer"
import { Chart } from "react-google-charts";
import axios from 'axios';
import Plot from 'react-plotly.js';
import './Dashboard.css'
import './ChartStyles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMedal } from '@fortawesome/free-solid-svg-icons'
import dayjs, { Dayjs } from 'dayjs';


function capitalize(month) {
    return month.charAt(0).toUpperCase() + month.slice(1);
  }

  const xRankList = [5000,9666, 10000, 2870, 1500,];
  const yRankList = ["Italy <br> €1500","France <br> €1500","Spain <br> €1500","USA <br> €1500","Argentina <br> €1500"];
  const colorsRankList = ['rgb(163 103 220)', 'rgb(103 183 220)', 'rgb(166 221 242)', 'rgb(199 103 220)', 'rgb(163 103 220)'];

  const rankListData = [{
    x: xRankList,
    y: yRankList,
    type: "bar",
    orientation: "h",
    marker: {
        color: colorsRankList // specify the colors for each bar
    },
  }];

  const rankListLayout = {
    title: "",
    xaxis: {
      title: ""
    },
    yaxis: {
      title: ""
    },
    height: 350,
  };

  const config = {
    displayModeBar: false
  };

  const xSoldServicesList = [5000,9666, 10000, 2870, 1500];
  const ySoldServicesList = ["Italy <br> €1500","France <br> €1500","Spain <br> €1500","USA <br> €1500","Argentina <br> €1500"];
  const colorsServices = ['rgb(163 103 220)', 'rgb(103 183 220)', 'rgb(166 221 242)', 'rgb(199 103 220)', 'rgb(163 103 220)'];

  const SoldServicesData = [{
    x: xSoldServicesList,
    y: ySoldServicesList,
    type: "bar",
    orientation: "h",
    marker: {
        color: colorsServices // specify the colors for each bar
      }
  }];

  const SoldServicesLayout = {
    title: "",
    xaxis: {
      title: ""
    },
    yaxis: {
      title: ""
    },
    height: 350,
  };
  

  const xBiggestBox = ["Italy <br> €1500",];
  const yBiggestBox = [1500, ];
  const colorsBiggestBox = ['rgb(163 103 220)',];

  const biggestBoxdata = [{
    x: xBiggestBox,
    y: yBiggestBox,
    type: "bar",
    marker: {
        color: colorsBiggestBox // specify the colors for each bar
      }
  }];

  const biggestBoxlayout = {
    title: "",
    xaxis: {
      title: ""
    },
    yaxis: {
      title: ""
    },
    height: 300, // set a maximum height of 400 pixels for the chart
  };

const Dashboard = () => {

    // const [bestSeller, setBestSeller] = useState([]);

    const textColor = '#ffffff'

    // const [selectedMonth, setSelectedMonth] = useState();
    
    const now = dayjs().locale('nl').format('MMMM')

    return (
        <div className='bodyDashboard'>
        <Navbar />
        <div className='box-container d-flex flex-column'>
            <div className='d-flex flex-row col-12 px-3 pt-1 pb-1 my-1 justify-content-between'>
                <div className='midbox d-flex col-3 m-2 rounded-2  flex-column align-content-center'>
                <div className='mt-3  d-flex justify-content-center'>
                        <h5 id='rankList'>Ranglijst van { capitalize(now) }</h5>
                    </div>
                    <div className='midBoxCharts d-flex justify-content-center pb-1'>
                        <Plot
                            data={rankListData}
                            layout={rankListLayout}
                            config={config}
                            style={{ width: "100%", height: "100%" }}
                        />
                    </div>
                </div>
                <div className='bigbox col-5 m-2 rounded-2'>
                <div className='my-3  d-flex justify-content-center'>
                            <h4 id='teamTarget'>Team target van { capitalize(now) }</h4>
                        </div>
                <div className='speedoMeter d-flex p-4 justify-content-evenly'>
                            <div className='d-flex justify-content-center flex-column align-content-between'>
                                <p className='current '>Bedrag: € 7500</p>
                                <p className='toGo'>Te gaan: € 2500</p>
                            </div>
                        <div>
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
                    <h5 className='textEndGoal text-center'>Wat we gaan doen als we het target halen:</h5>
                    <h5 className='textEndGoal text-center'>Placeholder</h5>
                </div>
                <div className='midbox d-flex col-3 m-2 rounded-2  flex-column align-content-center'>
                <div className='mt-3  d-flex justify-content-center'>
                        <h5 id='soldServices'>Verkochte diensten in { capitalize(now) }</h5>
                    </div>
                    <div className='midBoxCharts d-flex justify-content-center pb-1'>
                        <Plot
                            data={SoldServicesData}
                            layout={SoldServicesLayout}
                            config={config}
                            style={{ width: "100%", height: "100%" }}
                        />
                    </div>
                </div>
            </div>
            <div className='d-flex flex-row col-12 px-3 pb-3 pt-1 justify-content-between'>
                <div className='biggestbox col-7 ms-2 rounded-2'>
                    <div className='d-flex justify-content-center p-3'>
                        <h4>Ranglijst afgelopen 12 maanden</h4>
                    </div>
                    <div className='biggestBoxChart'>
                        <Plot
                            data={biggestBoxdata}
                            layout={biggestBoxlayout}
                            config={config}
                            style={{ width: "100%", height: "100%" }}
                        />
                    </div>
                </div>
                <div className='col-5 d-flex flex-column justify-content-between'>
                    <div className='col-12 ms-2 d-flex flex-row justify-content-around mb-2'>
                        <div className='smallboxes col-5 rounded-2 p-3 d-flex text-center flex-column'>
                            <p className='text mb-2'>Beste verkoper van de afgelopen maand</p>
                            <h3 className='sellerofthemonth'>Mer  <FontAwesomeIcon icon={faMedal} className="icon" /></h3>
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
