import React, { Component } from 'react';
import { getTournamentSummaryList } from '../services/tournamentService'
import TournamentSummaryCard from '../components/tournamentSummaryCard'
import styled from '@emotion/styled'
import { Grid } from '@material-ui/core';
import { withRouter } from 'react-router'
//import reactStyled from 'react-emotion'

class TournamentListPage extends Component {

	constructor() {
		super()

		this.state = {
			tournamentSummaryList: []
		}
	}

    async componentDidMount() {
		const tournamentList = await getTournamentSummaryList()
		this.setState({ tournamentSummaryList: tournamentList })
	}
	
	render() {
		return (
			<Grid container spacing={8} justify="center">
				{ this.state.tournamentSummaryList.map(t => 
					<Grid item id="BUSCAME" >
						<TournamentSummaryCard key={t.id} id={t.id} name={t.name} description={t.description } />
					</Grid>)}
			</Grid>
		);
	}
}

export default withRouter(TournamentListPage);
