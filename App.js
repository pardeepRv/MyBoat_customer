import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import TabNav from './src/Navi/BottomNav';
// import  from './src/Navi/BottomNav';
import Stacks from './src/Navi/Stack';

//import all the components we are going to use
import { View, LogBox, StatusBar } from "react-native";

LogBox.ignoreAllLogs();

const App =()=>{
  return(
    <NavigationContainer>
      <StatusBar hidden />
      <Stacks />
      {/* <TabNav /> */}
    </NavigationContainer>
  )
}

export default App;
