import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { People, GridOn, Notes, Info } from '@material-ui/icons'

const styles = {
};

class TournamentBottomNavigation extends React.Component {

    constructor() {
		super()

		this.state = {
			value: 0
		}
	}

	handleChange = (event, value) => {
        const { tournament, } = this.props;

        switch(value) {
            case 0:
                this.props.history.push(`/tournaments/${tournament.id}/info`)
                break
            case 1:
                this.props.history.push(`/tournaments/${tournament.id}/players`)
                break
            case 2:
                this.props.history.push(`/tournaments/${tournament.id}/ranking`)
                break
            case 3:
                this.props.history.push(`/tournaments/${tournament.id}/results`)
                break
            default:
                break
        }
	};

    render() {
        const { classes, tournament, position } = this.props;

        return (
            <BottomNavigation
                value={ position }
                onChange={this.handleChange}
                showLabels
                className={classes.root}>
                <BottomNavigationAction label="Info" icon={<Info />} />
                <BottomNavigationAction label="Jugadores" icon={<People />} />
                <BottomNavigationAction label="Clasificación" icon={<GridOn  />} />
                <BottomNavigationAction label="Resultados" icon={<Notes />} />
            </BottomNavigation>
        );
    }
}

TournamentBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
  tournament: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(TournamentBottomNavigation));
