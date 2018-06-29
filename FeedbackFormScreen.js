import React from 'react';
import { StyleSheet, Text, View, Button, Picker, WebView, TextInput } from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const Content = t.struct({
	EventName: t.String,
	NumberOfAttendees: t.Number,
	PositiveComments: t.String,
	NegativeComments: t.maybe(t.String)
});

const Options = {
	label: 'Feedback Form',
	fields: {
		EventName: {
			error: 'Please enter the event name.'
		},
		NumberOfAttendees: {
			error: 'Please enter the number of attendees.',
			KeyboardType: 'numeric'
		},
		PositiveComments: {
			error: 'Please fill out this field',
			multiLine: true
		},
		NegativeComments: {
			multiLine: true
		}
	}

};

class FeedbackFormScreen extends React.Component {

	resetForm(){
		this.setState({value:null});
	}

	DiscardForm(){
		const value = this._form.getValue();
		if(!value){
			this.resetForm({})
		}
		
	}

	handleSubmit = () => {
		const value = this._form.getValue();
		console.log('value', value);
		if (value) {
			this.resetForm({})

		}
		
	}
	

	render() {
		return(
			<View style={styles.container}>
				
				<Form ref={c=>this._form = c} 
				type={Content} 
				options = {Options}/>	
				<View style={styles.container}>
					<Button
					title="Submit"
					onPress={this.handleSubmit}
					/>
					<Button	
						title="Discard feedback"
						onPress={this.DiscardForm}
					/>
				</View>
				
			</View>
		);
	}
	
}

const styles = StyleSheet.create({
	container: {

		justifyContent: 'center',
		marginTop: 50,
		padding: 20,

	},
	title: {

		justifyContent: 'center',
		marginTop: 10,
		alignItems: 'center',
		fontSize: 24,

	},
	DiscardFeedback: {
		fontSize: 10,
	}
});

export default FeedbackFormScreen;