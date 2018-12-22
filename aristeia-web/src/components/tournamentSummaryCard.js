import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { CardActionArea, Card, CardActions, CardContent, CardMedia, Typography, IconButton }from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons'
import { withRouter } from 'react-router-dom';

const styles = {
  card: {
    width: 350,
    height: 230
  },
  media: {
    height: 80,
  },
};

function TournamentSummaryCard(props) {
  const { classes, name, description, tournament, onDelete } = props;
  return (
    <Card className={classes.card}>
      <CardActionArea onClick={ () => props.history.push(`/tournaments/${tournament.id}/info`) }>
        <CardMedia
          className={classes.media}
          image="https://imperiofriki.com/c/17-category_default/aristeia.jpg"
          title="Aristeia the game"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            { name }
          </Typography>
          <Typography component="p">
            { description }
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton aria-label="Delete" onClick={() => onDelete(tournament.id)}>
							<DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

TournamentSummaryCard.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  tournament: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(TournamentSummaryCard));

