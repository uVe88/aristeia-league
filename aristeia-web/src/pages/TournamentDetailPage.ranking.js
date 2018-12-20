import React, { Component } from 'react';
import { getTournamentById } from '../services/tournamentService'
import styled from '@emotion/styled'
import { withRouter } from 'react-router'
import { withStyles } from '@material-ui/core/styles';
import BottomNavigationMenu from '../components/tournamentBottomNavitagation'

import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

//import reactStyled from 'react-emotion'

class TournamentDetailPage extends Component {

	constructor() {
		super()

		this.state = {
			tournament: null,
			value: 0
		}
	}

    componentDidMount() {
		const id = this.props.match.params.id
		if(id) {
			getTournamentById(id).subscribe({
				next: t => this.setState({ tournament: t }),
				error: err => console.error('getTournamentById something went wrong: ' + err),
				complete: () => console.log('getTournamentById done'),
			});
		}
	}

	handleChange = (event, value) => {
		this.setState({ value });
	};

	render() {
		const { classes } = this.props
		const { tournament } = this.state

		return (
			tournament ?			
				<Main id="TournamentDetailPage">
					<Paper className={classes.root}>
						<Table className={classes.table}>
							<TableHead>
							<TableRow>
								<TableCell>Jugador</TableCell>
								<TableCell numeric>Puntos</TableCell>
								<TableCell numeric>Frags</TableCell>
								<TableCell numeric>Primeras Sangres</TableCell>
							</TableRow>
							</TableHead>
							<TableBody>
							{this.populateRanking(tournament).map(row => {
								return (
								<TableRow key={row.player.id}>
									<TableCell component="th" scope="row">
										{row.player.name}
									</TableCell>
									<TableCell numeric>{row.points}</TableCell>
									<TableCell numeric>{row.frags}</TableCell>
									<TableCell numeric>{row.firstBlood}</TableCell>
								</TableRow>
								);
							})}
							</TableBody>
						</Table>
					</Paper>
					<BottomNavigationMenu tournament={this.state.tournament} position={2}/>
				</Main>
			:
			<h1>Tournament not found</h1>
		)
	}

	populateRanking(tournament) {
		const playerResultsMap = {}

		tournament.players.forEach(player => { 

			playerResultsMap[player.id] = { player, points: 0, frags: 0, firstBlood: 0}
			console.log(playerResultsMap[player.id])
		})

		tournament.rounds.forEach(rounds => {
			rounds.games.forEach(game => { 
				playerResultsMap[game.player1.playerId].points += game.player1.points
				playerResultsMap[game.player1.playerId].frags += game.player1.frags
				game.player1.firstBlood && playerResultsMap[game.player1.playerId].firstBlood++

				playerResultsMap[game.player2.playerId].points += game.player2.points
				playerResultsMap[game.player2.playerId].frags += game.player2.frags
				game.player2.firstBlood && playerResultsMap[game.player2.playerId].firstBlood++
			})
		});

		const ranking = Object.values(playerResultsMap).sort((stats1, stats2) => {
			if (stats1.points > stats2.points) { return -1 }
			if (stats1.points < stats2.points) { return 1 }

			if (stats1.frags > stats2.frags) { return -1 }
			if (stats1.frags < stats2.frags) { return 1 }

			if (stats1.firstBlood > stats2.firstBlood) { return -1 }
			if (stats1.firstBlood < stats2.firstBlood) { return 1 }
		})
		
		console.log(ranking)
		return ranking
	}

	
}


const Main = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	flex: 1;
`

// const styles = {
// 	card: {
// 	  //maxWidth: 345,
// 	},
// 	media: {
// 	  //height: 60,
// 	},
// 	root: {
// 		width: "100%"
// 	  },
//   };

const styles = theme => ({
	root: {
	  width: '100%',
	  marginTop: theme.spacing.unit * 3,
	  overflowX: 'auto',
	},
	table: {
	},
  });

export default withRouter(withStyles(styles)(TournamentDetailPage));
