import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import './voteChart.scss';

const VoteChart = ({ data }) => {
	
	return (
		<div className="voteC">
		{/*<ResponsiveContainer width='100%' height={300}>*/}
			<LineChart data={data} width={1100} height={300}>				
				<CartesianGrid vertical={false} />
				<Line type="linear" dataKey="points" stroke="#047cb0" dot={{ fill: '#047cb0'}} strokeWidth='3' />
				<XAxis dataKey="objectID" label={{ value: 'ID', stroke: '#000', strokeWidth: 1, position: 'bottom', offset: -25 }} angle={-90} height={100} tickSize={30} tickLine={false} padding={{ left: 10, right: 10 }} interval={0} />
				<YAxis dataKey="points" label={{ value: 'Votes', position: 'left', fontSize: 15, fontWeight: 'bold', strokeWidth: 10, angle: -90, offset: -15 }} />
			</LineChart>
			{/*</ResponsiveContainer>*/}
		</div>
	)

}

export default VoteChart;