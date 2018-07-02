import React from 'react';
import { StyleSheet, Text, View, Button, Picker, WebView, ScrollView, TouchableOpacity } from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
//import { CheckBox } from 'react-native-checkbox';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';

import t from 'tcomb-form-native';

const Form = t.form.Form;

const Event = t.struct({
	name: t.String,
	location: t.String,
	date: t.Date,
	description: t.maybe(t.String),
	numberOfPinkTies: t.maybe(t.Number),
});

let myFormat = (date) =>{
	return moment(date).format('LLLL');
}

//var now = moment().format('LLL');

var options = {
	label: 'Create an Event',
	fields: {
		name: {
			label: 'Event Name',
			error: 'Please enter an event name'
		},
		location: {
			label: 'Event Location',
			error: 'Please enter the location'
		},
		date: {
			label: 'Date and Time',
			error: 'Please enter a valid date and time',
			mode: 'datetime',
			config: {
				//format: (date) => moment(date).format('mm-dd-YYYY')
				//format: (date: Date) => string
				//format: date => formatFunction(format)
				//format:(date) => myFormat(date)
				format: date => moment(date).format('dddd, MMMM Do YYYY, h:mm a'),
				dateFormat: date => moment(date).format('dddd, MMMM Do YYYY'),
				timeFormat: date => moment(date).format('h:mm a'),
			},
		},
		description: {
			label: 'Describe the Event',
			multiline: true,
		},
		numberOfPinkTies: {
			label: 'How many pink ties would you like for this event? (optional)'
		}
	}
};


class CreateEventScreen extends React.Component {
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
		if(value) {
			this.props.navigation.navigate('CalendarView')
		}
	}

	render() {
		return(
			<ScrollView>
			<View style={styles.container}>
				<Text></Text>
				<Form ref={c=>this._form = c}
				type={Event}
				options={options}/>
				<View style={styles.container}>
					<Button
					title="Create Event"
					onPress={this.handleSubmit}
					color= "#002a55"
					/>
					<Button
						title="Discard Event"
						onPress={this.DiscardForm}
						color= "#002a55"
					/>
				</View>
			</View>
			</ScrollView>
		);
	}

}

export default CreateEventScreen;

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		backgroundColor: '#fff',
		padding: 40,

	}
});
