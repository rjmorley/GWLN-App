import React from 'react';
import { StyleSheet, Text, View, Button, Picker, WebView, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import { Icon } from 'react-native-elements';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';

import a from './Components/alert';
import CalendarScreen from './CalendarScreen';

import './Global.js';

import t from 'tcomb-form-native';

var _ = require('lodash');
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

stylesheet.textbox.normal.height = 80;
stylesheet.textbox.normal.textAlignVertical = 'top';

const Form = t.form.Form;


const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)
const _maxDate = moment().add(120, 'days').format(_format)


const Event = t.struct({
	event_name: t.String,
	location: t.String,
	date: t.Date,
	event_description: t.String,
});

let myFormat = (date) =>{
	return moment(date).format('LLLL');
}

//var now = moment().format('LLL');

var options = {
	//label: 'Create an Event',
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
			stylesheet: stylesheet,
		},
	}
};

class addEventTest extends React.Component {

	constructor(props){
		super(props);
		//Obj = new CalendarScreen();
	}

	resetForm=()=>{
		this.setState({value:null});
	}

	DiscardForm=()=>{
		Alert.alert(
			'Discard Feedback',
			'Are you sure you want to clear this form?',
			[
				{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
				{text: 'Yes', onPress: ()=> this.resetForm()}
			],
		)
	}

	static navigationOptions = ({navigation})=> {
		return {
			headerTitle: (<Text style={{flex: 1, textAlign: 'center', alignSelf: 'center', fontWeight: 'bold', fontSize: 20, color: '#002A55'}}> Create an Event </Text>),
			headerRight: ( <Icon
				containerStyle={{marginRight:15, marginTop:15}}
				iconStyle={styles.headerIcon}
				type='font-awesome'
				// color= '#002A55'
				name= "trash"
				onPress={navigation.getParam('discard')}/>
			),
		};
	};

	componentDidMount=(value)=> {
		this.props.navigation.setParams({ discard: this.DiscardForm });
	}

  handleSubmit = () => {
    const value = this.refs.form.getValue();
    //console.log(value.event_name);
    const TmpDate = value.date;

  	const parsedDay = TmpDate.getDay();
  	const parsedMonth = TmpDate.getMonth();
  	const parsedYear = TmpDate.getFullYear();

    //console.log('value', value);
    if(value) {
      const url = 'https://cuwomen.org/functions/app.gwln.php'
      fetch(url, {
        method: "POST",
        headers: {
          'X-Token': 'hub46bubg75839jfjsbs8532hs09hurdfy47sbub',
        },
        body: JSON.stringify({
          "code": "insertEvent",
          "arguments": {
            "event_day": parsedDay,
            "event_month": parsedMonth,
            "event_year": parsedYear,
            "event_name": value.event_name,
            "event_description": value.event_description,
            "event_picture": null,
            "pic_caption": null,
            "link": null,
            "username": "abbiroseb",
          }
        }),
      })

      .then(res => res.json())
      .then(res => {
        //console.log(res)
        if (res) {
          //this.props.navigation.navigate('Home')
          //global.currUser = res
          console.log(res);
        }
        else {
          console.log('error');
          this.DiscardForm();
        }
      })
      .catch(error => {
        console.log(error);
      })
    console.log('fetch');
    }
  }

	// handleSubmit = () => {
  //
	// 	//const value = this._form.getValue();
  //
  //
	// 	const value = this.refs.form.getValue();
  //
  //
	// 	const TmpDate = value.date;
  //
	// 	const parsedDay = TmpDate.getDay();
	// 	const ParsedMonth = TmpDate.getMonth();
	// 	const parsedYear = TmpDate.getFullYear();
  //
	// 	 const DBEvent = {
	// 	 	event_name: value.event_name,
	// 	 	event_day: parsedDay,
	// 	 	event_month: ParsedMonth,
	// 	 	event_year: parsedYear,
	// 	 	event_description: value.event_description,
	// 	 	event_location: value.location,
	// 	 }
  //
	// 	//this.updateCalendar.bind(this);
	// 	//console.log(TmpDate);
	// 	if(value) {
	// 		console.log(TmpDate);
  //
	// 		//this.updateCalendar(TmpDate);
	// 		console.log('value', value);
	// 		console.log(DBEvent);
	// 		// post to database!!
	// 	}
	// 	this.resetForm();
	// }

	// updateCalendar = (Day) => {
	// 	console.log('in updateCalendar');
	// 	//Obj.test();
  //
	// 	const tmp = Day;
	// 	const newEvent = moment(tmp).format(_format);
	// 	console.log('newEvent');
	// 	console.log(newEvent);
	// 	global.EventArray.push(newEvent);
	// 	console.log(EventArray);
	// 	//Obj.OnDaySelect(tmp);
	// 	this.setState({ EventDate: tmp});
	// 	this.props.navigation.navigate('CalendarView');
	// 	//console.log(this.state.EventDate);
	// 	//Obj.AddEvent(tmp)
	// 	//console.log('under cal.OnDaySelect');
	// 	return EventArray
	// }

	render() {
		var buttonColors = ['rgba(255, 255, 255, 1)'];
		if (Platform.OS === 'android') {
			buttonColors = ['rgba(0, 42, 85, 1)'];
		};
    //const value = this.refs.form.getValue();
		return(
			<View style={styles.mainContainer}>
			<ScrollView>
			<View style={styles.container}>
				<Form ref="form"
				type={Event}
				options={options}/>
				<View style={styles.buttonContainer}>
					<Button
					// style={styles.buttons}
					title="Create Event"
					onPress={this.handleSubmit}
					color= {buttonColors}
					/>
				</View>
			</View>
			</ScrollView>
			</View>
		);
	}

}


export default addEventTest;


const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: 'white',
	},
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		backgroundColor: '#fff',
		padding: 30,

	},
	paragraph: {
		margin: 30,
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#002a55',
	},
	buttons: {
		padding: 40,
		margin: 10,
	},
	to: {
		margin: 24,
		padding: 40,
		borderRadius: 15,
		borderWidth: 1,
		borderColor: "transparent",
		//fontWeight: 'bold',
		//textAlign: 'center',
		//color: '#34495e',
		backgroundColor: '#ff6666'
	},
	headerIcon: {
		flex:1,
		color: '#002A55',
	},
	buttonContainer: {
		alignSelf: 'center',
		// padding: 30,
		paddingHorizontal: 30,
		backgroundColor: '#002A55',
		...Platform.select({
			ios: {
				borderColor: '#002A55',
			},
			android: {
				borderColor: 'white',
			},
		}),
		borderWidth: 1,
		borderRadius: 5,
		flexDirection: 'column',
	},
});