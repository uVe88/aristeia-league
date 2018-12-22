import React, { Component } from 'react';
import styled from '@emotion/styled'
import { engineTypes } from '../roundEngines/engines'
import { withRouter } from 'react-router'
import { withStyles } from '@material-ui/core/styles';
import { List, ListItem, Select, MenuItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Avatar, 
				IconButton, TextField, Typography, Button, FormControl, InputLabel } from '@material-ui/core';
import { Whatshot as RoundIcon, Delete as DeleteIcon } from '@material-ui/icons'
import { startTournament, createNewRound, deleteLastRound } from '../services/tournamentService'
//import reactStyled from 'react-emotion'

class TournamentDetailPage extends Component {

	state = {
        loading: false
	}

	componentDidMount() {
        // const { match, tournament } = this.props
        // const { roundId } = match.params
        
		// if (tournament) {
        //     const round = tournament.rounds.find(r => r.id === roundId)

        //     this.setState(
        //         {
        //             results: round.games.map(g => {
        //                 [g.id] = {
        //                     player1: null,
        //                     player2: null
        //                 }
        //             })
        //         }
        //     )
        // }
           
	}
	
	render() {
        const { match, tournament } = this.props
        const { roundId } = match.params
        
		if (tournament) {
            const round = tournament.rounds.find(r => r.id === roundId)

            return (this.renderGameList (round, tournament))
			
		} else {
			return(<Typography>Loading round</Typography>)
		}
	}
		    
    handleGameResult = (playerId, value) => {
        this.setState({
            [playerId]: value
        })
    }

	renderGameList = (round, tournament) => {
        const games = round.games

		return <div>
			<Typography variant={'title'}>{ `Partidas ronda: ${round.number}` } </Typography>
			<div>
				{ games.map(g => this.renderGameItem(g, tournament)) }
			</div>
		</div>
	}

	renderGameItem = (game, tournament) => {
        const { classes } = this.props
        const player1 = tournament.players.find(p => p.id === game.player1.playerId)
        const player2 = tournament.players.find(p => p.id === game.player2.playerId)

		return <div className={classes.demo}>
            <Typography variant="subtitle1"> { `Partida ${game.number} || ${player1.name} vs ${player2.name}`} </Typography>
            <div className={classes.gameResultContainer}>
                <div>
                    <TextField
                        id='text-field-game-result-input'
                        label={ `Resultado jugador ${player1.name}` }
                        className={ classes.textField }
                        value={ this.state[player1.id] || null }
                        onChange={ (event) => this.handleGameResult(player1.id, event.target.value) }
                        margin="normal"
                        placeholder="#puntos #frags #primera sangre"
                    />
                </div>
                <div>
                    <TextField
                        id='text-field-game-result-input'
                        label={ `Resultado jugador ${player2.name}` }
                        className={ classes.textField }
                        value={ this.state[player2.id] || null }
                        onChange={ (event) => this.handleGameResult(player2.id, event.target.value) }
                        margin="normal"
                        placeholder="#puntos #frags #primera sangre"
                    />
                </div>
            </div>
        </div>
	}
}

const styles = theme => ({
    gameResultContainer: {
        display: 'flex'
    },
	textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
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
