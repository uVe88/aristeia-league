import React, { Component } from 'react';
import styled from '@emotion/styled'
import { withRouter } from 'react-router'
import { withStyles } from '@material-ui/core/styles';

//import reactStyled from 'react-emotion'

class TournamentDetailPage extends Component {

	render() {
		const { classes, tournament } = this.props

		return (
			tournament ?			
				<Main id="TournamentDetailPage">
					<div>
						<h6>{tournament.name }</h6>
						<p>{tournament.description }</p>
						<p>{tournament.type }</p>
						<p>{tournament.players.length }</p>
						<p>{tournament.rounds.length }</p>
					</div>
				</Main>

			:
			<h1>Tournament not found</h1>
		)
	}
}

const Main = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	flex: 1;
`

const styles = {
	card: {
	  //maxWidth: 345,
	},
	media: {
	  //height: 60,
	},
	root: {
		width: "100%"
	  },
  };

export default withRouter(withStyles(styles)(TournamentDetailPage));
