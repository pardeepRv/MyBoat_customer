import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Root } from "native-base";
import TabNav from "./src/Navi/BottomNav";
// import  from './src/Navi/BottomNav';
import Stacks from "./src/Navi/Stack";

//import all the components we are going to use
import { View, LogBox, StatusBar, SafeAreaView, I18nManager } from "react-native";
import { Colors } from "./src/Constants/Constants";
import { requestUserPermission } from "./src/service/FcmService";
import { createNotificationListener } from "./src/service/notificationListener";
import checkPermission from "./src/service/notificationServices";
import AsyncStorage from "@react-native-community/async-storage";
import RNRestart from "react-native-restart";

LogBox.ignoreAllLogs();

const App = () => {
  useEffect(() => {
    getLang();
    checkPermission();
    requestUserPermission();
    createNotificationListener();
  }, []);

  const getLang = async () => {
    console.log(I18nManager.isRTL, 'I18nManager.isRTL');
    let lng = await AsyncStorage.getItem('language');
    console.log('LANG option on App', lng)

    if (lng == 1 ) {
      if (I18nManager.isRTL) {
        await I18nManager.forceRTL(false);
   }
    } else {
      if (!I18nManager.isRTL) {
        await I18nManager.forceRTL(true);
        }
    }
  }
  
  return (
    <NavigationContainer>

      <SafeAreaView
        style={{
          backgroundColor: Colors.black,
          // flex:1
        }}
      />

      <StatusBar backgroundColor="#5E8D48" barStyle="light-content" />
      <Stacks />

    </NavigationContainer>
  );
};

export default App;
