import useStyles from '../styles'
import Hand from './Hand'



import '../../node_modules/react-vis/dist/style.css';

import {XYPlot, XAxis, YAxis, MarkSeries, CircularGridLines, CustomSVGSeries} from 'react-vis';

const data = [
  {r: 1, theta: (1 * Math.PI) / 4, size: 1},
  {r: 1, theta: (2 * Math.PI) / 4, size: 1},
  {r: 1, theta: (3 * Math.PI) / 4, size: 1},
  {r: 1, theta: (4 * Math.PI) / 4, size: 1},
  {r: 1, theta: (5 * Math.PI) / 4, size: 1},
  {r: 1, theta: (6 * Math.PI) / 4, size: 1},
  {r: 1, theta: (7 * Math.PI) / 4, size: 1},
  {r: 1, theta: (8 * Math.PI) / 4, size: 1, customComponent: (row, positionInPixels) => {
    return (
      <g className="inner-inner-component">
        <circle cx="0" cy="0" r={10} fill="green"/>
        <text x={0} y={0}>
          <tspan x="0" y="0">{`x: ${positionInPixels.x}`}</tspan>
          <tspan x="0" y="1em">{`y: ${positionInPixels.y}`}</tspan>
        </text>
      </g>
    );
  }}
];

const newdata=data.map(row => ({
  ...row,
  x: Math.cos(row.theta) * row.r,
  y: Math.sin(row.theta) * row.r
}))
console.log(newdata)




const MARGINS = 0;
const WIDTH = 500;
const HEIGHT = 500;

const margin = {
  top: MARGINS,
  bottom: MARGINS,
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
      <MarkSeries
        strokeWidth={1}
        sizeRange={[4, 4]}
        data={data.map(row => ({
          ...row,
          x: Math.cos(row.theta) * row.r,
          y: Math.sin(row.theta) * row.r
        }))}
      />
    </XYPlot>

    </div>
  )
}

export default Game


