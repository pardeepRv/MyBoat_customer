import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Root } from "native-base";
import TabNav from "./src/Navi/BottomNav";
// import  from './src/Navi/BottomNav';
import Stacks from "./src/Navi/Stack";

//import all the components we are going to use
import { View, LogBox, StatusBar, SafeAreaView, I18nManager  , platform} from "react-native";
import { Colors } from "./src/Constants/Constants";
import { requestUserPermission } from "./src/service/FcmService";
import { createNotificationListener } from "./src/service/notificationListener";
import checkPermission from "./src/service/notificationServices";
import AsyncStorage from "@react-native-community/async-storage";
import RNRestart from "react-native-restart";
import { UserContext } from "./src/Screens/Main/UserContext";
import { Lang_chg } from './src/Provider/Language_provider';
import { Platform } from "react-native";

LogBox.ignoreAllLogs();

const App = () => {
  const [name, setname] = useState(0)
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
    if (lng == null) {
      Lang_chg.language_set(0)
      await I18nManager.forceRTL(false);
      return setname(0)
    }
    else if (lng == 1) {
      setname(lng)
      if (I18nManager.isRTL) {
        return await I18nManager.forceRTL(false);
      }
    } else {
      setname(lng)
      if (!I18nManager.isRTL) {
        return await I18nManager.forceRTL(true);
      }
    }
  }

  const setData = (val) => {
    alert(val);
    setname('gshagg')
  };

  return (
    <NavigationContainer>

      <SafeAreaView
        style={{
          backgroundColor: Colors.black,
         
        }}
      />
{ Platform.OS == "ios" ?<StatusBar backgroundColor="#5E8D48" barStyle="light-content" /> : <StatusBar barStyle="light-content" backgroundColor="#000" /> }
      {/* <StatusBar backgroundColor="#5E8D48" barStyle="light-content" /> */}
      <UserContext.Provider
        value={{ value: name, updateValue: setData }}
      >

        <Stacks />
      </UserContext.Provider>

    </NavigationContainer>
  );
};

export default App;
