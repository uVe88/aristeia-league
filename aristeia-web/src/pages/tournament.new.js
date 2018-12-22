import React, { Component } from 'react';
import styled from '@emotion/styled'
import { withRouter } from 'react-router'
import { Form, Field } from 'react-final-form'
import { createNewTournament } from '../services/tournamentService'

//import reactStyled from 'react-emotion'

class NewTournamentPage extends Component {
	
	sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

	onSubmit = async values => {
		await this.sleep(300)

		const { name, description } = values
		const tournamentId = await createNewTournament(
			{
				name,
				description,
				type: 'aristeia'
			}
		)

		this.props.history.push(`/tournaments/${tournamentId}/info`)
	}

	render() {
		return (
			<Form
    			onSubmit={this.onSubmit}
				render={({ handleSubmit, form, submitting, pristine }) => (
					<form onSubmit={handleSubmit}>
						<div>
							<label>Nombre</label>
							<Field name="name" component="input" placeholder="Nombre del torneo" />
						</div>
						<div>
							<label>Descripción</label>
							<Field name="description" component="textarea" placeholder="Descripción del torneo" />
						</div>

						<div className="buttons">
							<button type="submit" disabled={submitting || pristine}>
							Submit
							</button>
							<button
							type="button"
							onClick={form.reset}
							disabled={submitting || pristine}
							>
							Reset
							</button>
						</div>
					</form>
				)}
			/>

		);
	}
}

export default withRouter(NewTournamentPage);