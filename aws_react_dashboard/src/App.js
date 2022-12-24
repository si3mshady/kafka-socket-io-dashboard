
import './App.css';
import {DemoGauge} from './components/Gague';
import { DemoLiquid } from './components/Liquid';
import {useEffect, useState} from 'react'
import axios from 'axios'

import io from 'socket.io-client'


const socket = io.connect('http://localhost:888', {
  maxHttpBufferSize: 1e9, pingTimeout: 60000
})



function App() {



const [chartData, setChartData] = useState([])


const get_data = async () => {
  const data = await axios.get('http://localhost:888/data')

  console.log(data.data)
  
  setChartData(data.data)
 

}

useEffect(() => {

  get_data()

  // socket.on("new_data", (data) => {
  //   setChartData(data.message)
  //   console.log(data.message)
  //   console.log(chartData)
  // })

},[socket])


  return (
    
    <>
    <div className='chart-container'>

   {chartData.map((val,index) =>  ( <DemoGauge key={val.instance_id} instance_id={val.instanceid} stats={val.metric}/>))}

    </div>
  
    </>
 
  );
}


export default App;
