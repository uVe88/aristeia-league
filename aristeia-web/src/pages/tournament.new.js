import React, { Component } from 'react';
import { getTournamentSummaryList } from '../services/tournamentService'
import TournamentSummaryCard from '../components/tournamentSummaryCard'
import styled from '@emotion/styled'
import { Grid } from '@material-ui/core';
import { withRouter } from 'react-router'
//import reactStyled from 'react-emotion'

class NewTournamentPage extends Component {

	constructor() {
		super()

		// this.state = {
		// 	tournamentSummaryList: []
		// }
	}

    componentDidMount() {
		// getTournamentSummaryList().subscribe({
		// 	next: x => this.setState({ tournamentSummaryList: x }),
		// 	error: err => console.error('getTournamentSummaryList something wrong occurred: ' + err),
		// 	complete: () => console.log('getTournamentSummaryList done'),
		// });
	}
	
	render() {
		return (
			<h1>
                New tournament
            </h1>

		);
	}
}

export default withRouter(NewTournamentPage);