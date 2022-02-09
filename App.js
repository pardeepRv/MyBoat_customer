import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Root } from "native-base";
import TabNav from './src/Navi/BottomNav';
// import  from './src/Navi/BottomNav';
import Stacks from './src/Navi/Stack';

//import all the components we are going to use
import { View, LogBox, StatusBar  , SafeAreaView} from "react-native";
import { Colors } from './src/Constants/Constants';

LogBox.ignoreAllLogs();

const App =()=>{
  return(
    <NavigationContainer>
     
            <SafeAreaView style={{
              backgroundColor: Colors.orange
            }} />
            {/* <StatusBar hidden /> */}
            <StatusBar  />
            <Stacks />
            {/* <TabNav /> */}
        
      {/* <StatusBar hidden />
      <Stacks /> */}
      {/* <TabNav /> */}
    </NavigationContainer>
  )
}

export default App;
