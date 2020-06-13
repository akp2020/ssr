import React from 'react';
import './App.scss';
import NewsList from './components/NewsList';

function App({ initData }) {

	return (

			<NewsList initData={initData} />
	)
}

export default App;
