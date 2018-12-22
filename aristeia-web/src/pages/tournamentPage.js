import React, { Component, Fragment } from 'react';
import { getTournamentById } from '../services/tournamentService'
import styled from '@emotion/styled'
import { withRouter } from 'react-router'
import { withStyles } from '@material-ui/core/styles';
import BottomNavigationMenu from '../components/tournamentBottomNavitagation'
import RankingPage from './tournamentPage.ranking'
import PlayerPage from './tournamentPage.players'
import RoundPage from './tournamentPage.rounds'
import RoundPageResults from './tournamentPage.rounds.results'
import { Route } from 'react-router-dom'


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
		const { match, classes } = this.props
		const { tournament } = this.state

		return (
				<div className={ classes.container}>
					<div className={ classes.content }>
						{
							tournament ?
								<Fragment>
									<Route path={`${match.path}/info`} render={() => <h1>{`New info page t:${match.params.tournamentId}`}</h1>}/>
									<Route path={`${match.path}/players`} render={() => <PlayerPage tournament={tournament} />}/>
									<Route path={`${match.path}/ranking`} render={() => <RankingPage tournament={tournament} />}/>
									<Route exact path={`${match.path}/rounds`} render={() => <RoundPage tournament={tournament}/>}/>
									<Route path={`${match.path}/rounds/:roundId`} render={({match}) => <RoundPageResults tournament={tournament}/>}/>
								</Fragment>
							:
							<h1>Loading tournament</h1>
						}
					</div>
					<div className={classes.bottomMenu}>
						<BottomNavigationMenu tournament={this.state.tournament} />
					</div>
				</div>
				
			
		)
	}
}

const styles = {
	bottomMenu: {

	},
	content: {
		overflowY: 'auto',
		backgroundColor: 'red',
		//height: '500px',
		flex: 1,
		maxHeight: '100%'
	},
	container: {
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: 'purple',
		height: '100%',
		justifyContent: 'flex-end', 
		minWidth: '100%'
	}
  };

export default withRouter(withStyles(styles)(TournamentDetailPage));

