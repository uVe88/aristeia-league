import React, { Component } from 'react';
import { getRankingTournament } from '../services/tournamentService'
import styled from '@emotion/styled'
import { withRouter } from 'react-router'
import { withStyles } from '@material-ui/core/styles';
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
		this.state = { ranking: null }
	}

	componentWillUpdate() {
		console.log("WILL UPDATE")
	}

	async componentDidMount () {
		const { tournament } = this.props
		const ranking = tournament && await getRankingTournament(tournament)
		
		this.setState({
			ranking
		})
	}

	render() {
		const { classes } = this.props
		const { ranking } = this.state
		
		return (
			ranking ?			
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
							{ ranking.map(row => {
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
