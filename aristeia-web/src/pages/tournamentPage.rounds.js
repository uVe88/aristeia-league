import React, { Component } from 'react';
import styled from '@emotion/styled'
import { engineTypes } from '../roundEngines/engines'
import { withRouter } from 'react-router'
import { withStyles } from '@material-ui/core/styles';
import { List, ListItem, Select, MenuItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Avatar, 
				IconButton,Typography, Button } from '@material-ui/core';
import { Whatshot as RoundIcon, Delete as DeleteIcon } from '@material-ui/icons'
import { startTournament, createNewRound, deleteLastRound } from '../services/tournamentService'

class TournamentDetailPage extends Component {

	state = {
		loading: false,
		roundTypes: [],
		selectedRoundType: null
	}

	componentDidMount() {
		this.setState({
			roundTypes: engineTypes,
			selectedRoundType: engineTypes && engineTypes[0]
		})
	}
	
	render() {
		const { tournament } = this.props
		
		if (tournament) {
			if (tournament.status === 'open') {
				return(this.renderStartTournamentView(this.props, this.state))
			}
			else {
				return (this.renderRoundView(this.props, this.state))
			}
		} else {
			return(<Typography>Torneo no encontrado</Typography>)
		}
	}
	
	startTournmanet = async () => {
		this.setState({
			loading: true,

		})

		console.log("tournament started")
		await startTournament(this.props.tournament.id)

		this.setState({
			loading: false,
		})	
	}

	deleteRound = async () => {
		this.setState({
			loading: true,

		})

		await deleteLastRound(this.props.tournament.id)

		this.setState({
			loading: false,
		})
	}

	createNewRound = async () => {
		this.setState({
			loading: true
		})

		await createNewRound(this.props.tournament.id, this.state.selectedRoundType)

		this.setState({
			loading: false
		})
	}

	renderStartTournamentView(props, state) {
		const { classes } = props

		return <div className={classes.demo}>
				<Typography>El torneo todavía está abierto. Mientras esté abierto podrás añadir y quitar jugadores. 
					Para habilitar las rondas y debew empezar el torneo. 
					Tenga en cuenta que una vez empezado el torneo no podrá añadir o quitar jugadores del torneo</Typography>
				<Button variant="contained" color="primary" className={classes.button} onClick={() => this.startTournmanet()}>
						Empezar torneo
				</Button>
			</div>
	}

	renderRoundView = (props, state) => {
		const { tournament, classes } = this.props
		const rounds = tournament.rounds
		const lastItem = rounds[rounds.length -1]
		return <div>
			<Typography variant={'title'}>Crear nueva ronda</Typography>
			<div className={classes.demo}>
				{ this.renderCreateRound(this.props, this.state) }
			</div>
			<Typography variant={'title'}>Rondas</Typography>
			
			<List>
				{ rounds.map(r => this.renderRoundItem(r, r === lastItem, classes))}
			</List>
			
		</div>
	}

	renderRoundItem = (round, isDeleteActive, classes) => {
		return <div className={[classes.demo]}>
				<ListItem onClick={() => this.navigateToRound(round.id)}>
					<ListItemAvatar>
						<Avatar>
							<RoundIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText
						primary={ <Typography>{`Número de ronda: ${round.number}` }</Typography> }
						secondary={ <Typography>{`Número total de partidas: ${round.games ? round.games.length : 0}` }</Typography> }
					/>
					<ListItemSecondaryAction>
						<IconButton aria-label="Delete" disabled={!isDeleteActive} onClick={() => this.deleteRound()}>
								<DeleteIcon />
						</IconButton>
					</ListItemSecondaryAction>
				</ListItem>
			</div>
	}

	renderCreateRound = (props, state) => {
		const { classes } = props
		const { selectedRoundType, roundTypes } = state
		return <div classes={classes.formControl}>	
			<Typography> Tipo de ronda </Typography>
			<Select
				value={selectedRoundType}
				onChange={this.handleChange}
				placeholder="Select multiple countries"
				className={classes.selectEmpty}
				textFieldProps={{
					label: 'Label',
					InputLabelProps: {
					  shrink: true,
					},
				  }}
				>
				
				<MenuItem value="" disabled>	
					Tipo de ronda
				</MenuItem>
				{
					roundTypes.map(rt => <MenuItem id={rt.id} value={rt}>{rt.name}</MenuItem>)
				}
			</Select>
			<Button variant="contained" color="primary" className={classes.button} onClick={() => this.createNewRound()}>
						Crear nueva ronda
			</Button>
		</div> 
	}

	handleChange = event => {
		this.setState({
			selectedRoundType: event.target.value
		})
	}

	navigateToRound = roundId => {
		this.props.history.push(`${this.props.match.url}/${roundId}`)
	}
}

const styles = theme => ({
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 200,
	},
  	root: {
    	flexGrow: 1,
    	maxWidth: 752,
	},
	button: {
    	margin: theme.spacing.unit,
	},
	selectEmpty: {
		marginTop: theme.spacing.unit * 2,
	},
	nameInput: {
		width: '100%'
	},
	container: {
    display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-between'
  },
  demo: {
		backgroundColor: theme.palette.background.paper,
		margin: theme.spacing.unit * 3,
		padding: theme.spacing.unit * 2
	},
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
});

export default withRouter(withStyles(styles)(TournamentDetailPage));
