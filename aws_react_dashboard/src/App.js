
import './App.css';
import {DemoGauge} from './components/Gague';
import { DemoLiquid } from './components/Liquid';

function App() {

  // const gague = <DemoGauge />
  // const gague = <DemoLiquid />

//  'i-0686f214f7c6c9e3d', 'metric': [4.284999221972762]}
// 'i-09e53cf0a306778c2', 'metric': [0.09860763780146743]}
// 'i-0b9a1572489cd5c4c', 'metric': [0.09111771702095196]}
//  'i-0328abafe0dfbec82', 'metric': [0.09250900785956198]}
//  'i-0f52cb29835b53f6e', 'metric': [0.08869812414357428]}
//  'i-0d03ef520021decfa', 'metric': [0.14780644814747615]}
// 'i-0c9034b62b474643f', 'metric': [0.09420603071140136]}
//  'i-0eb0af039243ddd8d', 'metric': [0.08854024141146599]}
// 'i-0387e21c58937b4e8', 'metric': [0.10847941557605997]}
//  'i-07b1913ab346f73d6', 'metric': [0.09267413336410926]}
//  'i-01fb0e71d479892bd', 'metric': [0.09661553483508992]}
//  'i-0ed0800ce53c02fcb', 'metric': [0.09734377158213468]}
//  'i-01a853b10a64cc564', 'metric': [0.09568060437693922]}

const instances = ['i-01fb0e71d479892bd',
'i-07b1913ab346f73d6',
'i-0387e21c58937b4e8',
'i-0eb0af039243ddd8d',
'i-0d03ef520021decfa',
'i-0686f214f7c6c9e3d',
 'i-0ed0800ce53c02fcb',
 'i-09e53cf0a306778c2', 'i-0b9a1572489cd5c4c',  'i-0328abafe0dfbec82' , 'i-01a853b10a64cc564', 'i-0f52cb29835b53f6e']

  return (
    
    <>
    <div className='chart-container'>

   {instances.map((id,index) =>  ( <DemoGauge instance_id={id}/>))}

    </div>
  
    </>
 
  );
}


export default App;
