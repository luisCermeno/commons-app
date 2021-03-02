import useStyles from '../styles'
import Hand from './Hand'



import '../../node_modules/react-vis/dist/style.css';

import {XYPlot, XAxis, YAxis, CircularGridLines, CustomSVGSeries} from 'react-vis';


const getHand = (username) => {
  const compFunction = (row, positionInPixels) => {
    return (
      <g className="inner-inner-component">
        <Hand player = {username}/>
      </g>
    );
  }
  return compFunction;
}



const data = [
  {r: 1, theta: (0 * Math.PI) / 4, size: 1, customComponent: getHand('hand 1')},
  {r: 1, theta: (1 * Math.PI) / 4, size: 1, customComponent: getHand('hand 2')},
  {r: 1, theta: (2 * Math.PI) / 4, size: 1, customComponent: getHand('hand 3')},
  {r: 1, theta: (3 * Math.PI) / 4, size: 1, customComponent: getHand('hand 4')},
  {r: 1, theta: (4 * Math.PI) / 4, size: 1, customComponent: getHand('hand 5')},
  {r: 1, theta: (5 * Math.PI) / 4, size: 1, customComponent: getHand('hand 6')},
  {r: 1, theta: (6 * Math.PI) / 4, size: 1, customComponent: getHand('hand 7')},
  {r: 1, theta: (7 * Math.PI) / 4, size: 1, customComponent: getHand('hand 8')},
  {r: 1, theta: (2 * Math.PI) / 4, size: 1, customComponent: getHand('hand 9')}
];

//element 



const newdata=data.map(row => ({
  ...row,
  x: Math.cos(row.theta) * row.r,
  y: Math.sin(row.theta) * row.r
}))
console.log(newdata)




const MARGINS = 0;
const WIDTH = 600;
const HEIGHT = 600;

const margin = {
  top: MARGINS,
  handtom: MARGINS,
  left: MARGINS,
  right: MARGINS
};

const Game = props => {

  const classes = useStyles()

  return (
    <div>
    <XYPlot
      margin={margin}
      xDomain={[-1.1, 1.1]}
      yDomain={[-1.1, 1.1]}
      width={WIDTH}
      height={HEIGHT}
    >
      <CircularGridLines />
      <XAxis top={(HEIGHT - margin.top) / 2} />
      <YAxis left={(WIDTH - margin.left - margin.right) / 2} />
      <CustomSVGSeries
        data={data.map(row => ({
          ...row,
          x: (Math.cos(row.theta) * row.r)-0.1,
          y: (Math.sin(row.theta) * row.r)+0.1
        }))}
      />
    </XYPlot>

    </div>
  )
}

export default Game


