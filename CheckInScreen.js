import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    Button,
    Alert,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import { Icon, Header } from 'react-native-elements';
import t from 'tcomb-form-native';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';

const Form = t.form.Form;

const Attendee = t.struct({
  name: t.String, //First name
  surname: t.String, //Last name
  email: t.String, //email address for member enrollment

});

const Options = {
	fields: {
    name:{
      label: 'First Name',
      error: 'Please enter attendee first name',
    },
		surname: {
			label: 'Last Name',
			error: 'Please enter attendee last name',
		},
	}
};

class CheckInScreen extends Component {
  constructor(props) {
        super(props);
        this.state = {value: null}
        this.state = {
          value: null,
          selectedIndex1: null,
          selectedIndex2: null,
          val1: null,
          val2: null,
        }
  }

  initialState = () => {
    // const value = this._form.getValue();
		// console.log('value', value);
    this.setState({value: null})
    this.setState({
      value: null,
      selectedIndex1: -1,
      selectedIndex2: -1,
      val1: null,
      val2: null,
    })
  }

  DiscardForm=( value ) => {
		Alert.alert(
			'Discard Feedback',
			'Are you sure you want to clear this form?',
			[
				{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
				{text: 'Yes', onPress: ()=> this.initialState()}
			],
		)
	}

	static navigationOptions = ({navigation})=> {
		return {
			headerTitle: (<Text style={{flex: 1, textAlign: 'center', alignSelf: 'center', fontWeight: 'bold', fontSize: 20}}> Event Check In </Text>),
			headerRight: ( <Icon
				containerStyle={{padding:15}}
				type='font-awesome'
				name= "trash"
				onPress={navigation.getParam('discard')}/>
			),
		};
	};

	componentDidMount=(value)=> {
		this.props.navigation.setParams({ discard: this.DiscardForm });
	}
  onChange(value) {
    this.setState({value:value});
  }
  //
  // onClick(value) {
  //   this.setState({selectedIndex: null})
  // }

  //================radioadd=====================
  onSelect_1(index, value){
    //console.log(value)
    //console.log(index)

    this.setState({
      selectedIndex1: index,
      val1: value,
    })
  }

  onSelect_2(index, value){
    //console.log(value)
    //console.log(index)

    this.setState({
      selectedIndex2: index,
      val2: value,
    })
  }


  onCheck () {
    this.initialState;
  }
  onSubmit = () => {
    const value = this._form.getValue();
		console.log('value', value);
    console.log('Is member?', this.state.val1);
    console.log('Interested?', this.state.val2);
    this.initialState();

  }
  handleSubmit = () => {
    Alert.alert(
      'Check In',
      'The atendee has been checked in',
      [
        {text: 'Dismiss', onPress: this.onSubmit},
      ],
    )
  }
  //================radioadd=====================


    render() {
        return (
          <ScrollView>
            <View style={styles.container}>
              <Form
              ref={c=>this._form = c}
              type={Attendee}
              options={Options}
              value={this.state.value}
              onChange={this.onChange.bind(this)}
              />
              <View style={styles.radiocontainer}>
        				<Text> Are you a member of GWLN? </Text>
        				<RadioGroup
        					size={18}
        					thickness={2}
        					style={styles.rg}
                  color={'#200a55'}
                  selectedIndex={this.state.selectedIndex1}
                  onSelect = {(index, value) => this.onSelect_1(index, value)}
        				>
        					<RadioButton value={'member_yes'} style={styles.rb} >
        						<Text>Yes</Text>
        					</RadioButton>
        					<RadioButton value={'member_no'} style={styles.rb} >
        						<Text>No</Text>
        					</RadioButton>

        				</RadioGroup>
        				<Text>If not, would you like to be?</Text>
        				<RadioGroup
        					size={18}
        					thickness={2}
        					style={styles.rg}
                  color={'#200a55'}
                  selectedIndex={this.state.selectedIndex2}
        					onSelect = {(index, value) => this.onSelect_2(index, value)}
        				>
        					<RadioButton value={'like_yes'} style={styles.rb} >
        						<Text>Yes</Text>
        					</RadioButton>
        					<RadioButton value={'like_no'} style={styles.rb} >
        						<Text>No</Text>
        					</RadioButton>
        					<RadioButton value={'na'} style={styles.rb} >
        						<Text>N/A</Text>
        					</RadioButton>

        				</RadioGroup>
              </View>
              <Button
                title="Check In!"
                onPress={this.handleSubmit}
                color= '#002a55'
              />
              </View>
              <View style={styles.trash}>
              </View>
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 40,
        justifyContent: 'center',
    },
    item: {
        flexDirection: 'row',
        padding:10,
    },
    line: {
        flex: 1,
        height: 0.3,
        backgroundColor: 'darkgray',
    },
    questionText: {
      fontSize: 18,
      fontWeight: 'bold',
      alignItems: 'center',
      justifyContent: 'center'
    },
    //================radioadd=====================
    radiocontainer: {
  		marginTop: 10,
      marginBottom: 40,
      backgroundColor: 'white',
  	},
  	rb: {
  		alignItems: 'center',
  		flexDirection: 'row',
  	},
  	rg: {
  		flexDirection: 'row',
  	}
    //================radioadd=====================
})

export default CheckInScreen;

//================NOTES================
//This might not be a problem but the radio buttons are being printed at the
//console when checked, not when the form is submitted -- FIXED!!
