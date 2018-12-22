import React, { Component } from 'react';
import styled from '@emotion/styled'
import { withRouter } from 'react-router'
import { withStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Avatar, 
				IconButton, TextField, Typography, Button } from '@material-ui/core';
import { Person as PersonIcon, Delete as DeleteIcon } from '@material-ui/icons'
import { deletePlayer, createPlayer } from '../services/tournamentService'
//import reactStyled from 'react-emotion'

class TournamentDetailPage extends Component {

	constructor(props) {
    super(props);
    this.textInput = React.createRef();
	}
	
	state = {
		loading: false,
		name: "",
		error: false
	}

	componentDidMount() {
		this.textInput.current.focus()
	}

	nameButton = null
	
	render() {
		const { classes, tournament } = this.props
		const { name, error } = this.state

		return (
			tournament ?
			<div>
				<Typography variant="title">Añadir jugadores</Typography>
				<div className={classes.demo}>
					<TextField
						disabled={tournament.status !== 'open'}
						className={classes.nameInput}
						label="Nombre"
						style={{ margin: 8 }}
						placeholder="Introduce el nombre del jugador"
						margin="normal"
						error= {error}
						onKeyPress={this.onKeyPress}
						inputRef={this.textInput}
						InputLabelProps={{
							shrink: true,
						}}
						value={ name }
						onChange= { this.handleNameChanges }
					/>
					<Button variant="contained" color="primary" disabled={tournament.status !== 'open'} className={classes.button} onClick={() => this.addPlayer(name)}>
						Añadir
					</Button>
				</div>
				<Typography variant="title">Lista de jugadores</Typography>
				<div className={classes.demo}> 
					{ tournament.players ?
						<List>
							{ tournament.players.map(p => this.renderPlayerItem(p, tournament)) }
						</List>
					:
						<Typography>No hay jugadores todavía</Typography>
					}
				</div>
			</div>
			:
			<h1>Tournament not found</h1>
		)
	}

	renderPlayerItem = (player, tournament) => {
		return <ListItem>
				<ListItemAvatar>
					<Avatar>
						<PersonIcon />
					</Avatar>
				</ListItemAvatar>
				<ListItemText
					primary={player.name}
					// secondary={secondary ? 'Secondary text' : null}
				/>
				<ListItemSecondaryAction>
					<IconButton aria-label="Delete" onClick={() => this.deletePlayer(player)} disabled={tournament.status !== 'open'}>
							<DeleteIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
	}
	onKeyPress = (e) => {
		if (e.key == 'Enter') {
			this.addPlayer(this.state.name)
		}
	}

	handleNameChanges = (event) => {
		
		this.setState({
			name: event.target.value
		})
	}

	deletePlayer = async (player) => {
		this.setState({
			loading: true
		})

		await deletePlayer(this.props.tournament.id, player.id)

		this.setState({
			loading: false
		})
	}

	addPlayer = async (name) => {

		if (name) {
			this.setState({
				loading: true,
				error: false
			})

			await createPlayer(this.props.tournament.id, name)

			this.setState({
				loading: false,
				name: ""
			})
		} else {
			this.setState({
				error: true
			})
		}
	}
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
	},
	button: {
    margin: theme.spacing.unit,
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