import React, { useState, useEffect } from 'react';
import sales from '../Sales';
import Navbar from '../Navbar/Navbar';
import ReactSpeedometer from "react-d3-speedometer";
import { Chart } from "react-google-charts";
import Plot from 'react-plotly.js';
import './Dashboard.css'
import './ChartStyles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faL, faMedal } from '@fortawesome/free-solid-svg-icons'
import dayjs, { Dayjs } from 'dayjs';
import Cookies from 'universal-cookie';
import { useNavigate, useParams } from 'react-router-dom';

const Dashboard = () => {
  const cookies = new Cookies;
  const navigate = useNavigate();

  const { month, year } = useParams();

  const now = dayjs(`${year}-${month}`).locale('nl').format('MMMM');

  // where i store the data of the responses
  const [teamTarget, setTeamTarget] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);
  const [deals, setDeals] = useState([]);
  const [existantDeals, setExistantDeals] = useState([]);
  const [newDeals, setNewDeals] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [xRankList, setXRankList] = useState([]);
  const [yRankList, setYRankList] = useState([]);
  const [xSoldServicesList, setXSoldServicesList] = useState([]);
  const [ySoldServicesList, setYSoldServicesList] = useState([]);
  const [xYearRankList, setXYearRankList] = useState([]);
  const [yYearRankList, setYYearRankList] = useState([]);
  
  async function fetchAll(month, year) {
    try {
      const [
        rankListResponse,
        teamTargetResponse,
        mostSoldProductsResponse,
        yearRankListResponse,
        bestSellerResponse,
        dealsResponse,
        existantDealsResponse,
        newDealsResponse
      ] = await Promise.all([
        sales.get(`rankList?month=${month}&year=${year}`),
        sales.get(`teamTarget?month=${month}&year=${year}`),
        sales.get(`mostSoldProducts?month=${month}&year=${year}`),
        sales.get(`yearRankList?month=${month}&year=${year}`),
        sales.get(`bestSeller?month=${month - 1}&year=${year}`),
        sales.get(`deals?month=${month - 1}&year=${year}`),
        sales.get(`deals?month=${month}&year=${year}&status=0`),
        sales.get(`deals?month=${month}&year=${year}&status=1`),
      ]);
  
      setTeamTarget(teamTargetResponse.data);
      setBestSeller(bestSellerResponse.data);
      setDeals(dealsResponse.data);
      setExistantDeals(existantDealsResponse.data);
      setNewDeals(newDealsResponse.data);

      // ranklist
      let names = [];
      let totalPrices = [];
      rankListResponse.data[0].forEach(user => {
        names = [`${user.name} <br> € ${user.totalPrice}`, ...names];
        totalPrices = [user.totalPrice, ...totalPrices];
      });
      setXRankList(totalPrices);
      setYRankList(names);

      // team target
      if (teamTargetResponse.data.amount < rankListResponse.data[1]) {
        setTotalPrice(teamTargetResponse.data.amount);
      } else {
        setTotalPrice(rankListResponse.data[1]);
      }

      // most sold products
      names = [];
      totalPrices = [];
      mostSoldProductsResponse.data.forEach(product => {
        names = [`${product.name} <br> € ${product.totalPrice}`, ...names];
        totalPrices = [product.totalPrice, ...totalPrices];
      });
      setXSoldServicesList(totalPrices);
      setYSoldServicesList(names);

      // year ranklist
      names = [];
      totalPrices = [];
      yearRankListResponse.data.forEach(user => {
        totalPrices.push(user.totalPrice);
        names.push(`${user.name} <br> € ${user.totalPrice} <br> ${user.date}`);
      });
      setXYearRankList(names);
      setYYearRankList(totalPrices)

      setIsLoading(false);
    } catch (error) {
      console.warn(error.response);
      cookies.remove('token');
      navigate('/');
    }
  }

  const MINUTE_MS = 60000;

  useEffect(() => {
    if (cookies.get('token')) {
      fetchAll(month, year); // First fetch

      const interval = setInterval(() => { // Fetches every minute
        fetchAll(month, year);
      }, MINUTE_MS);

      return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    } else {
      navigate('/');
    }
  }, [month, year]);


  const textColor = '#ffffff'

  function capitalize(month) {
    return month.charAt(0).toUpperCase() + month.slice(1);
  }
  
  // const colorsRankList = ['rgb(163 103 220)', 'rgb(103 183 220)', 'rgb(166 221 242)', 'rgb(199 103 220)', 'rgb(163 103 220)'];
  
  const rankListData = [{
    x: xRankList,
    y: yRankList,
    type: "bar",
    orientation: "h",
    marker: {
      // color: colorsRankList // specify the colors for each bar
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
  
  // const colorsServices = ['rgb(163 103 220)', 'rgb(103 183 220)', 'rgb(166 221 242)', 'rgb(199 103 220)', 'rgb(163 103 220)'];
  
  const SoldServicesData = [{
    x: xSoldServicesList,
    y: ySoldServicesList,
    type: "bar",
    orientation: "h",
    marker: {
      // startColor: 'rgb(163 103 220)',
      // endColor: 'rgb(103 183 220)',
      // color: colorsServices // specify the colors for each bar
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

  // const colorsBiggestBox = ['rgb(163 103 220)'];
  
  const yearRankListBox = [{
    x: xYearRankList,
    y: yYearRankList,
    type: "bar",
    marker: {
      // color: colorsBiggestBox // specify the colors for each bar
    }
  }];
  
  const yearRankListBoxLayout = {
    title: "",
    xaxis: {
      title: ""
    },
    yaxis: {
      title: ""
    },
    height: 300,
  };

  return (
    <div className='bodyDashboard'>
      <Navbar />
      {!isLoading ? 
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
                  <p className='current '>Bedrag: € {totalPrice}</p>
                  <p className='toGo'>Te gaan: € {(teamTarget.amount - totalPrice).toFixed(2)}</p>
                </div>
                <div>
                  <ReactSpeedometer
                    className='reactSpeed'
                    minValue={0}
                    maxValue={teamTarget.amount}
                    needleHeightRatio={0.7}
                    segments={7}
                    needleColor={'black'}
                    labelFontSize={'0'}
                    startColor={'#67b7dc'}
                    endColor={'#dc67ce'}
                    value={totalPrice}
                    textColor={textColor}
                  />
                </div>
                </div>
                  <h5 className='textEndGoal text-center'>Wat we gaan doen als we het target halen:</h5>
                  <h5 className='textEndGoal text-center'>{teamTarget.text}</h5>
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
                    data={yearRankListBox}
                    layout={yearRankListBoxLayout}
                    config={config}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </div>
              <div className='col-5 d-flex flex-column justify-content-between'>
                <div className='col-12 ms-2 d-flex flex-row justify-content-around mb-2'>
                  <div className='smallboxes col-5 rounded-2 p-3 d-flex text-center flex-column'>
                    <p className='text mb-2'>Beste verkoper van de afgelopen maand</p>
                    <h3 className='sellerofthemonth'>{bestSeller.name}  <FontAwesomeIcon icon={faMedal} className="icon" /></h3>
                  </div>
                  <div className='smallboxes col-5 rounded-2 p-2 text-nowrap d-flex text-center flex-column'>
                  <div>
                    <p className='m-0'>Totaal vorige maand</p>
                    <h4 className='totalmoney'>€ {deals.totalPrice}</h4>
                  </div>
                  <div className='d-flex justify-content-around text-wrap flex-row'>
                    <div>
                      <p className='m-0'>Deals</p>
                      <h5 className='dealsAndGemOrders'>{deals.totalDeals}</h5>
                    </div>
                    <div>
                      <p className='m-0'>Gem. order</p>
                      <h5 className='dealsAndGemOrders'>€ {deals.averagePrice}</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-12 d-flex ms-2 flex-row justify-content-around mt-2'>
                <div className='smallboxes col-5 rounded-2 p-2 text-nowrap d-flex text-center flex-column'>
                  <div>
                    <p className='m-0'>Totaal nieuwe deals</p>
                    <h4 className='totalmoney'>€ {newDeals.totalPrice}</h4>
                  </div>
                  <div className='d-flex justify-content-around text-wrap flex-row'>
                    <div>
                      <p className='m-0'>Deals</p>
                      <h5 className='dealsAndGemOrders'>{newDeals.totalDeals}</h5>
                    </div>
                    <div>
                      <p className='m-0'>Gem. order</p>
                      <h5 className='dealsAndGemOrders'>€ {newDeals.averagePrice}</h5>
                    </div>
                  </div>
                </div>
              <div className='smallboxes col-5 rounded-2 p-2 text-nowrap d-flex text-center flex-column'>
                <div>
                  <p className='m-0'>Totaal bestaande deals</p>
                  <h4 className='totalmoney'>€ {existantDeals.totalPrice}</h4>
                </div>
                <div className='d-flex justify-content-around text-wrap flex-row'>
                  <div>
                    <p className='m-0'>Deals</p>
                    <h5 className='dealsAndGemOrders'>{existantDeals.totalDeals}</h5>
                  </div>
                  <div>
                    <p className='m-0'>Gem. order</p>
                    <h5 className='dealsAndGemOrders'>€ {existantDeals.averagePrice}</h5>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      :
        <div className='mt-5 d-flex justify-content-center'>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      }
    </div>
  );
}

export default Dashboard;
