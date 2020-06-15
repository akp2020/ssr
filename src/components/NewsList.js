import React, { Component } from 'react';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import domain from 'url-domain-name';
import './newsList.scss';
import VoteChart from './VoteChart';

let hiddenIds;
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');
let curPage;

class NewsList extends Component {

		state = {
		data: this.props.initData,
		votes: this.filteredVotes(this.props.initData)
		}
	
	componentDidMount() {
		curPage = window.curPage;
		//delete window.curPage;
		if (localStorage.getItem('hiddenIds') === null) {
			hiddenIds = [];
		}
		else {
			hiddenIds = JSON.parse(localStorage.getItem('hiddenIds'));
			const fData = this.props.initData.filter(elm => {
				return !hiddenIds.includes(elm.objectID)

			});
			this.updateData(fData);					
		}
	}
	
	updateData = async (newData)=>{
				await this.setState({ data: newData});
				await this.setState({ votes: this.filteredVotes(newData) });
			}

	upVote = (e) => {
		const id = e.target.dataset.id;
		const updatedData = this.state.data.map(obj => {
			if (obj.objectID === id) {
				obj.points = obj.points + 1;
			}
			return obj;
		});
		this.updateData(updatedData);
	}

	filteredVotes(data) {
		return data.map(({ objectID, points }) => ({ objectID, points }));
	}

	hidePost = (e)=> {
		const id = e.target.dataset.id;
		this.updateData(this.state.data.filter(obj => obj.objectID !== id));
		hiddenIds.push(id);
		localStorage.setItem('hiddenIds', JSON.stringify(hiddenIds));
	}

	navigate(e) {
		if (e.target.textContent === "Previous") {
			curPage === 1 ? window.location.href = "/" : window.location.href = `/?page=${curPage - 1}`;
		}
		else {
			window.location.href = `/?page=${curPage + 1}`;
		}
	}
	render() {
		return (
			<>
				<div className="newsList">
					<table>
						<thead>
							<tr>
								<th>Comments</th>
								<th>Vote<br />Count</th>
								<th>UpVote</th>
								<th style={{ textAlign: 'left' }}>News Details</th>
							</tr>
						</thead>
						<tbody>
							{this.state.data.map((data) =>
								<tr key={data.objectID} id={data.objectID}>
									<td className="bold">{data.num_comments}</td>
									<td className="bold">{data.points}</td>
									<td><span className="up" onClick={this.upVote} data-id={data.objectID}></span></td>
									<td className="newsD"><a href={data.url} className="bold">{data.title}</a>
										<span>{data.url !== null ? '(' + domain.from(String(data.url)).replace('www.', '') + ')' : ""}</span>
										<span className="auth">{data.author}</span>
										<span>{timeAgo.format(new Date(data.created_at)).replace('an', '1').replace('a minute', '1 minute')}</span>
										<span data-id={data.objectID} className="hide" onClick={this.hidePost}>hide</span>
									</td>
								</tr>
							)
							}
						</tbody>
					</table>
					<table className="navTable"><tbody>
						<tr>
							<td className="pn">
								<span className={global.curPage === 0 ? 'count0' : ''} suppressHydrationWarning={true} onClick={this.navigate}>Previous</span><b>|</b><span onClick={this.navigate}>Next</span>
							</td>
						</tr></tbody>
					</table>

				</div>
				<VoteChart data={this.state.votes} />
			</>
		)
	}
}

export default NewsList;