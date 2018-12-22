import React, { Component } from 'react';
import { getTournamentSummaryList } from '../services/tournamentService'
import TournamentSummaryCard from '../components/tournamentSummaryCard'
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router'
import { deleteTournament } from '../services/tournamentService' 

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
		const { classes } = this.props
		return (
			<div className={classes.container}>
				<div className={classes.content}>
					{ 
						this.state.tournamentSummaryList.map(t => 		
						<div className={classes.card}><TournamentSummaryCard key={t.id} onDelete={this.handleOnDelete} tournament={t} name={t.name} description={t.description } /></div>)
					}
				</div>
			</div>
		);
	}

	handleOnDelete = async (id) => {
		this.setState({
			loading: true
		})
		
		await deleteTournament(id)
		const tournamentList = await getTournamentSummaryList()
		
		this.setState({
			loading: false,
			tournamentSummaryList: tournamentList
		})
	}
}

const styles = {
	content: {
		display: 'flex',
		justifyContent: 'flex-start',
		height: 'fit-content',
		width: '80%',
		flexWrap: 'wrap'
	},
	card: {
		margin: 10
	},
	container: {
		overflowY: 'auto',
		height: 'inherit'
	}
}

export default withRouter(withStyles(styles)(TournamentListPage));
