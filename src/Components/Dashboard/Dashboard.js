import React, { useState, useEffect } from 'react';
import sales from '../Sales';
import Navbar from '../Navbar/Navbar';
import ReactSpeedometer from "react-d3-speedometer";
import Plot from 'react-plotly.js';
import './Dashboard.css'
import './ChartStyles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMedal } from '@fortawesome/free-solid-svg-icons'
import dayjs from 'dayjs';
import Cookies from 'universal-cookie';
import { useNavigate, useParams } from 'react-router-dom';

const Dashboard = () => {
  const cookies = new Cookies;
  const navigate = useNavigate();

  const { month, year } = useParams();

  const now = dayjs(`${year}-${month}`).locale('nl').format('MMMM');

  const [teamTarget, setTeamTarget] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);
  const [deals, setDeals] = useState([]);
  const [existantDeals, setExistantDeals] = useState([]);
  const [newDeals, setNewDeals] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [rankList, setRankList] = useState([]);
  const [soldServices, setSoldServices] = useState([]);
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
        sales.get(`getDeals?month=${month - 1}&year=${year}`),
        sales.get(`getDeals?month=${month}&year=${year}&status=0`),
        sales.get(`getDeals?month=${month}&year=${year}&status=1`),
      ]);
      
      setSoldServices(mostSoldProductsResponse.data)
      setRankList(rankListResponse.data[0]);
      setTeamTarget(teamTargetResponse.data);
      setBestSeller(bestSellerResponse.data);
      setDeals(dealsResponse.data);
      setExistantDeals(existantDealsResponse.data);
      setNewDeals(newDealsResponse.data);

      // ranklist
      let names = [];
      let totalPrices = [];
      setAmount(rankListResponse.data[1])
      // team target
      if (teamTargetResponse.data.amount < rankListResponse.data[1]) {
        setTotalPrice(teamTargetResponse.data.amount);
      } else {
        setTotalPrice(rankListResponse.data[1]);
      }

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
      cookies.remove('token', {path: '/'});
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

  function checkIfInteger(number) {
    if (Number.isInteger(number)) {
      return number;
    } else {
      return number.toFixed(2);
    }
  }
  
  const config = {
    displayModeBar: false
  };
  
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

  const MIN_BAR_WIDTH = 40;
  const maxDataRanklist = Math.max(...rankList.map((d) => d.totalPrice));
  const maxDataServices = Math.max(...soldServices.map((d) => d.totalPrice));
  const chartWidth = 275;
  const chartHeight = 200;
  const barHeightRanklist = chartHeight / rankList.length;
  const barHeightServices = chartHeight / soldServices.length;
  const barPadding = 0.5;

  const RanklistChart = () => {
    return (
      <svg width={chartWidth} height={chartHeight}>
        {rankList.map((d, i) => (
          <g key={i}>
            <text
              x={5}
              y={i * (barHeightRanklist + barPadding) + barHeightRanklist / 2 + 0}
              alignmentBaseline="middle"
              style={{ fontWeight: "bold" }}
            >
              <tspan
                key={d.name}
                x={5}
                style={{ whiteSpace: "pre", fontSize: d.name.length > 10 ? "10px" : "9px" }}
              >
                {d.name.length > 14 ? `${d.name.slice(0, 12)}...` : d.name}
              </tspan>
            </text>
            <rect
              x={80}
              y={i * (barHeightRanklist + barPadding) + barPadding / 2}
              width={Math.max(MIN_BAR_WIDTH, (d.totalPrice / maxDataRanklist) * (chartWidth - 80) + MIN_BAR_WIDTH)}
              height={barHeightRanklist}
              fill="#69b3a2"
              style={{ minWidth: '40px' }}
            />
            <text
              x={85}
              y={i * (barHeightRanklist + barPadding) + barHeightRanklist / 2 + 0}
              alignmentBaseline="middle"
              fill="#FFFFFF"
              fontSize="10px"
              style={{ fontWeight: "bold" }}
            >
              €{d.totalPrice}
            </text>
          </g>
        ))}
      </svg>
    )
  }

  const MostSoldProductsChart = () => {
    return (
      <svg width={chartWidth} height={chartHeight}>
        {soldServices.map((d, i) => (
          <g key={i}>
            <text
              x={5}
              y={i * (barHeightServices + barPadding) + barHeightServices / 2 + 0}
              alignmentBaseline="middle"
              style={{ fontWeight: "bold" }}
            >
              <tspan
                key={d.name}
                x={5}
                style={{ whiteSpace: "pre", fontSize: d.name.length > 10 ? "10px" : "9px" }}
              >
                {d.name.length > 14 ? `${d.name.slice(0, 12)}...` : d.name}
              </tspan>
            </text>
            <rect
              x={80}
              y={i * (barHeightServices + barPadding) + barPadding / 2}
              width={Math.max(MIN_BAR_WIDTH, (d.totalPrice / maxDataServices) * (chartWidth - 80) + MIN_BAR_WIDTH)}
              height={barHeightServices}
              fill="#69b3a2"
              style={{ minWidth: '40px' }}
            />
            <text
              x={85}
              y={i * (barHeightServices + barPadding) + barHeightServices / 2 + 0}
              alignmentBaseline="middle"
              fill="#FFFFFF"
              fontSize="10px"
              style={{ fontWeight: "bold" }}
            >
              €{d.totalPrice}
            </text>
          </g>
        ))}
      </svg>
    )
  }

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
                <RanklistChart/>
              </div>
            </div>
            <div className='bigbox col-5 m-2 rounded-2'>
              <div className='my-3  d-flex justify-content-center flex-column text-center'>
                <h4 id='teamTarget'>Team target van { capitalize(now) }</h4>
                <p className='fw-bold'>Target: € {teamTarget.amount}</p>
              </div>
              <div className='speedoMeter d-flex p-4 pt-0 justify-content-evenly'>
                <div className='d-flex justify-content-center flex-column align-content-between'>
                  <p className='current '>Bedrag: € {checkIfInteger(amount)}</p>
                  <p className='toGo'>Te gaan: € {teamTarget.amount ? checkIfInteger(teamTarget.amount - totalPrice) : 0}</p>
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
                    value={teamTarget.amount ? totalPrice : 0}
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
                    <MostSoldProductsChart/>
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
                    <h4 className='totalmoney'>€ {checkIfInteger(deals.totalPrice)}</h4>
                  </div>
                  <div className='d-flex justify-content-around text-wrap flex-row'>
                    <div>
                      <p className='m-0'>Deals</p>
                      <h5 className='dealsAndGemOrders'>{deals.totalDeals}</h5>
                    </div>
                    <div>
                      <p className='m-0'>Gem. order</p>
                      <h5 className='dealsAndGemOrders'>€ {checkIfInteger(deals.averagePrice)}</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-12 d-flex ms-2 flex-row justify-content-around mt-2'>
                <div className='smallboxes col-5 rounded-2 p-2 text-nowrap d-flex text-center flex-column'>
                  <div>
                    <p className='m-0'>Totaal nieuwe deals</p>
                    <h4 className='totalmoney'>€ {checkIfInteger(newDeals.totalPrice)}</h4>
                  </div>
                  <div className='d-flex justify-content-around text-wrap flex-row'>
                    <div>
                      <p className='m-0'>Deals</p>
                      <h5 className='dealsAndGemOrders'>{newDeals.totalDeals}</h5>
                    </div>
                    <div>
                      <p className='m-0'>Gem. order</p>
                      <h5 className='dealsAndGemOrders'>€ {checkIfInteger(newDeals.averagePrice)}</h5>
                    </div>
                  </div>
                </div>
              <div className='smallboxes col-5 rounded-2 p-2 text-nowrap d-flex text-center flex-column'>
                <div>
                  <p className='m-0'>Totaal bestaande deals</p>
                  <h4 className='totalmoney'>€ {checkIfInteger(existantDeals.totalPrice)}</h4>
                </div>
                <div className='d-flex justify-content-around text-wrap flex-row'>
                  <div>
                    <p className='m-0'>Deals</p>
                    <h5 className='dealsAndGemOrders'>{existantDeals.totalDeals}</h5>
                  </div>
                  <div>
                    <p className='m-0'>Gem. order</p>
                    <h5 className='dealsAndGemOrders'>€ {checkIfInteger(existantDeals.averagePrice)}</h5>
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
