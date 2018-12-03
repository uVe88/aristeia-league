import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';

import { from } from 'rxjs';
const styles = {
  card: {
    //maxWidth: 345,
  },
  media: {
    height: 60,
  },
};

function TournamentSummaryCard(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardActionArea onClick={ () => props.history.push('/tournament/'+props.id) }>
        <CardMedia
          className={classes.media}
          image="https://imperiofriki.com/c/17-category_default/aristeia.jpg"
          title="Aristeia the game"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography component="p">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
  );
}

TournamentSummaryCard.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default withRouter(withStyles(styles)(TournamentSummaryCard));

