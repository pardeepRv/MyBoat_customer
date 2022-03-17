import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {Image } from 'react-native';
import Home from '../Screens/Main/Home';
import TripType from '../Screens/Main/TripType';
import React from 'react';
import { Colors, FontFamily } from '../Constants/Constants';
import { Icon } from 'react-native-elements';
const Tab = createBottomTabNavigator();
const Stack= createStackNavigator();
import ManageAdd from '../Screens/Main/ManageAdd';
import Inbox from '../Screens/Main/Inbox';
import CalenderView from '../Screens/Main/Calender';
import Profile from '../Screens/Main/Profile';
import FavList from '../Screens/Main/Fav';
import MyTrip from '../Screens/Main/MyTrip';
import DestinationList from '../Screens/Main/DestinationList';
import AllChats from '../Screens/Main/AllChats';
import { UserContext } from '../Screens/Main/UserContext';
import { Lang_chg } from '../Provider/Language_provider';

const Stacks=()=>{
  
  return(
      <Stack.Navigator
       initialRouteName="Home"
       headerMode="none"
      >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="TripType" component={TripType} />
          <Stack.Screen name="DestinationList" component={DestinationList} />
      </Stack.Navigator>
  )
}
function TabNav() {
  const user = React.useContext(UserContext);


  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Colors.orange,
        inactiveTintColor:"#757575",
        labelStyle: {
            fontSize: 12,
            fontFamily:FontFamily.default
          },
        tabStyle:{
            height:50,
            alignItems:"center"
        },
     
      }}
    >
      <Tab.Screen
        name="Home"
        component={Stacks}
        options={{
          tabBarLabel:user.value == 1 ? Lang_chg.txt_explore[1] : Lang_chg.txt_explore[0],
          tabBarIcon: ({ focused,color}) => (
            // <Icon name="sait-boat" color={color} size={20} type="fontisto" />
            focused ? (
              <Image style={{height:25,width:30,resizeMode:"contain"}} source={require('../../assets/icons/home_active.png')} />
            ) : (
              <Image style={{height:25,width:30,resizeMode:"contain"}} source={require('../../assets/icons/home.png')} />
            )
          )
        }}
      />
      <Tab.Screen
        name="Trip"
        component={MyTrip}
        options={{
          tabBarLabel: user.value == 1 ? Lang_chg.text_my_trip[1] : Lang_chg.text_my_trip[0],
          tabBarIcon: ({ focused,color}) => (
            // <Icon name="sait-boat" color={color} size={20} type="fontisto" />
            focused ? (
              <Image style={{height:25,width:30,resizeMode:"contain"}} source={require('../../assets/icons/active-1.png')} />
            ) : (
              <Image style={{height:20,width:30,resizeMode:"contain"}} source={require('../../assets/icons/boat.png')} />
            )
          ),
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={AllChats}
        options={{
          tabBarLabel:  user.value == 1 ? Lang_chg.tittleinbox[1] : Lang_chg.tittleinbox[0],
          tabBarIcon: ({ focused,color}) => (
            // <Icon name="sait-boat" color={color} size={20} type="fontisto" />
            focused ? (
              <Image style={{height:25,width:30,resizeMode:"contain"}} source={require('../../assets/icons/active_inbox.png')} />
            ) : (
              <Image style={{height:20,width:30,resizeMode:"contain"}} source={require('../../assets/icons/inbox.png')} />
            )
          )
        //   tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={FavList}
        options={{
          tabBarLabel: user.value == 1 ? Lang_chg.text_favourites[1] : Lang_chg.text_favourites[0],
          tabBarIcon: ({ focused,color}) => (
            // <Icon name="sait-boat" color={color} size={20} type="fontisto" />
            focused ? (
              <Image style={{tintColor:Colors.orange, height:25,width:30,resizeMode:"contain"}} source={require('../../assets/icons/fav-1.png')} />
            ) : (
              <Image style={{height:20,width:30,resizeMode:"contain"}} source={require('../../assets/icons/fav-1.png')} />
            )
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: user.value == 1 ? Lang_chg.txt_Profile[1] : Lang_chg.txt_Profile[0],
          tabBarIcon: ({ focused }) => (
            focused ? (
              <Image style={{height:25,width:30,resizeMode:"contain"}} source={require('../../assets/icons/active_profile.png')} />
            ) : (
              <Image style={{height:20,width:30,resizeMode:"contain"}} source={require('../../assets/icons/profile.png')} />
            )
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNav;