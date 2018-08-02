import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Picker, WebView, Platform, Linking, ScrollView, TouchableOpacity, ListView, Alert, } from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import RNPickerSelect from 'react-native-picker-select';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import Gallery from 'react-native-image-gallery';
import GWLNScreen from './GWLNScreen';
import DonateWebView from './DonateWebView';
import MemberListScreen from './MemberListScreen';
import MyUpcomingEventsScreen from './MyUpcomingEventsScreen';
import MyPastEventsScreen from './MyPastEventsScreen';
import CreateEventScreen from './CreateEventScreen';
import CheckInScreen from './CheckInScreen';
import FeedbackFormScreen from './FeedbackFormScreen';
import CalendarDetailScreen from './CalendarDetailScreen';
import ProfileScreen from './ProfileScreen';
import AddPostScreen from './AddPostScreen';
import LaunchPage from './LaunchPage';
//import CalendarScreen from './CalendarScreen';
import OrganizerSigninScreen from './OrganizerSigninScreen';
import GuestBlog from './GuestBlog';

class GuestHomeScreen extends React.Component {
    constructor(){
      super();
      this.inputRefs = {};
    }

  render() {
    var buttonColors = ['rgba(255, 255, 255, 1)'];
		if (Platform.OS === 'android') {
			buttonColors = ['rgba(0, 42, 85, 1)'];
		};
    return (

    <View style={styles.container}>
    <View style={styles.galleryContainer}>
      <Gallery
        style={styles.gallery}
        images={[
          {source: require('./img/Scroll/Scroll1.jpg'), dimensions: {width: undefined, height: undefined}},
          {source: require('./img/Scroll/Scroll3.jpg'), dimensions: {width: undefined, height: undefined}},
          {source: require('./img/Scroll/Scroll2.jpg'), dimensions: {width: undefined, height: undefined}},
          {source: require('./img/Scroll/Scroll4.jpg'), dimensions: {width: undefined, height: undefined}},
        ]}
          flatListProps={{windowSize: 2}}
          pageMargin={10}
          />
          <Text style={styles.textStyle}>Our vision is to provide women with the opportunity and resources to make a measurable difference in the lives of each other, in the lives of credit union members and in their communities.</Text>
          </View>
          <View style={styles.buttonContainer}>
        <View style={styles.menuContainer}>
        <View style={styles.button}>
          <Button
            color= {buttonColors}
            title="Join the Network"
            onPress={() => {Linking.openURL('https://www.cuwomen.org/gwln_connect/gwln_new_member')}}
          />
          </View>
          </View>
          <View style={styles.menuContainer}>
          <View style={styles.button}>
            <Button
              color= {buttonColors}
              title="Find an Event"
              onPress={() => this.props.navigation.navigate('CalendarView')}
            />
            </View>
            </View>
        <View style={styles.menuContainer}>
        <View style={styles.button}>
          <Button
           color={buttonColors}
           title="Benefits of Membership"
           onPress={() => {Linking.openURL('https://www.cuwomen.org/gwln_about/gwln_member')}}
           />
           </View>
           </View>
           <Text
             style={styles.memberText}
             onPress={() => this.props.navigation.navigate('GuestBlog')}>
             Blog
           </Text>
           </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  memberText: {
		color: 'blue',
		fontSize: 17,
		alignSelf: 'center',
	},
  menuContainer: {
    backgroundColor: 'white',
    paddingBottom:5,
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 1,
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
    elevation: 0,
	},
  buttonContainer: {
    position: 'absolute',
    bottom: '2%',
    alignSelf: 'center',
 },
 galleryContainer: {
   backgroundColor: 'white',
   padding:5,
   position: 'absolute',
   top: '0%',
   height: '90%',
 },
 textStyle: {
   textAlign: 'center',
   fontSize: 17,
   paddingHorizontal:10,
   color: '#002a55',
   flex:1,
   ...Platform.select({
     ios: {
       fontFamily: 'Helvetica',
       fontWeight: '500',
     },
     android: {
       fontFamily: 'sans-serif-light',
       fontWeight: '400',
     },
   }),
 },
});

export default GuestHomeScreen;
