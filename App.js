/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';


// this shall be called regardless of app state: running, background or not running. Won't be called when app is killed by user in iOS
FCM.on(FCMEvent.Notification, async (notif) => {


  // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
  if(notif.local_notification){
    //this is a local notification

    console.log('what i got from   local notif ',notif)
  }


  if(notif.opened_from_tray){
    //iOS: app is open/resumed because user clicked banner
    //Android: app is open/resumed because user clicked banner or tapped app icon
  }
  
});

FCM.on(FCMEvent.RefreshToken, (token) => {
  console.log(token)
  // fcm token may not be available on first load, catch it here
});



export default class App extends Component{

  componentDidMount() {
    // iOS: show permission prompt for the first call. later just check permission in user settings
         // Android: check permission in user settings
         FCM.requestPermissions().then(()=>console.log('granted')).catch(()=>console.log('notification permission rejected'));
         
         FCM.getFCMToken().then(token => {
             // alert(token)
             // store fcm token in your server
         });
         
           this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
             // // optional, do some component related stuff
             // alert('what i got from server in listener direct', notif);
             // alert('what i got from server in listener ', notif.custom_notification);
 
             // alert('this needs to be shown', data);
 
             try {
               alert(JSON.stringify(notif))
                 FCM.presentLocalNotification({
                     vibrate: 100,
                     title: notif.fcm.title,
                     body: notif.fcm.body,
                     big_text: notif.big_text,     // Android only
                     sub_text: notif.fcm.body,                   // Android only priority: "high",
                     large_icon: notif.image,
                     show_in_foreground: true,
                     group: 'test',
                     targetScreen: 'detail',
                     number: 10
                 });
 
             }
             catch (e) {
                 alert(e)
             }
 
             // try {
             //     alert('tray', notif.opened_from_tray);
             //     if(notif.opened_from_tray === 1){
             //         this.props.navigation.navigate('AllNews')
             //     }
             // } catch (e) {
             //    alert('tray error ', e)
             // }
 
             // try {
                 
             //     var data = JSON.parse(notif.custom_notification);
             //     FCM.presentLocalNotification({
             //         vibrate: 100,
             //         title: data.title,
             //         body: data.body,
             //         big_text: data.body,     // Android only
             //         sub_text: data.sub_text,                      // Android only priority: "high",
             //         sound: "bell.mp3",
             //         large_icon: "https://image.freepik.com/free-icon/small-boy-cartoon_318-38077.jpg",
             //         show_in_foreground: true,
             //         group: 'test',
             //         targetScreen: 'detail',
             //         number: 10
             //     });
 
             // }
             // catch (e) {
             //    alert(e)
             // }
               
        
         });
        }
 
 
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Push Notification Example!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
