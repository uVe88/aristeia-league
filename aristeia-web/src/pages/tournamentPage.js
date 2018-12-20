import React, { Component } from 'react';
import { getTournamentById } from '../services/tournamentService'
import styled from '@emotion/styled'
import { withRouter } from 'react-router'
import { withStyles } from '@material-ui/core/styles';
import { Redirect, Route } from 'react-router-dom';
import BottomNavigationMenu from '../components/tournamentBottomNavitagation'
import RankingPage from './tournamentPage.ranking'
import PlayerPage from './tournamentPage.players'
import RoundPage from './tournamentPage.rounds'

//import reactStyled from 'react-emotion'

class TournamentDetailPage extends Component {

	constructor() {
		super()

		this.state = {
			tournament: null,
			value: 0
		}
	}

    async componentDidMount() {
		const id = this.props.match.params.tournamentId
		const t = await getTournamentById(id)
		this.setState({ tournament: t })
	}

	render() {
		const { classes, match, history } = this.props
		const { tournament } = this.state

		return (
			tournament ?			
				<Main>
					<Route path={`${match.path}/info`} render={() => <h1>{`New info page t:${match.params.tournamentId}`}</h1>}/>
					<Route path={`${match.path}/players`} render={() => <PlayerPage tournament={tournament} />}/>
					<Route path={`${match.path}/ranking`} render={() => <RankingPage tournament={tournament} />}/>
					<Route exact path={`${match.path}/rounds`} render={() => <RoundPage tournament={tournament}/>}/>
					<Route path={`${match.path}/rounds/:roundId`} render={({match}) => 
						{
							console.log(match)
							return <h1>{`New round page t:${match.params.tournamentId} r:${match.params.roundId}`}</h1>
						}
					}/>
											
					<BottomNavigationMenu tournament={this.state.tournament} />
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

