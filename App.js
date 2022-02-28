import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Root } from "native-base";
import TabNav from "./src/Navi/BottomNav";
// import  from './src/Navi/BottomNav';
import Stacks from "./src/Navi/Stack";

//import all the components we are going to use
import { View, LogBox, StatusBar, SafeAreaView } from "react-native";
import { Colors } from "./src/Constants/Constants";
import { requestUserPermission } from "./src/service/FcmService";
import { createNotificationListener } from "./src/service/notificationListener";
import checkPermission from "./src/service/notificationServices";

LogBox.ignoreAllLogs();

const App = () => {
  
  useEffect(() => {
    // checkPermission();
    // requestUserPermission();
    // createNotificationListener();
  }, []);
  
  return (
    <NavigationContainer>
      <SafeAreaView
        style={{
          backgroundColor: Colors.orange,
        }}
      />
      {/* <StatusBar hidden /> */}
      <StatusBar  />
      <Stacks />
      {/* <TabNav /> */}

      {/* <StatusBar hidden />
      <Stacks /> */}
      {/* <TabNav /> */}
    </NavigationContainer>
  );
};

export default App;
