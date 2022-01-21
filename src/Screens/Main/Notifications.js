import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Image,
    I18nManager
} from 'react-native';
import {
    Icon,
    Input,
    Card,
    Rating,
    AirbnbRating
} from 'react-native-elements';
import Header, { s } from '../../Components/Header';
import { back_img4, Colors, FontFamily, Sizes } from '../../Constants/Constants';
import { useNavigation } from '@react-navigation/core';
import {config} from '../../Provider/configProvider';
import AsyncStorage from '@react-native-community/async-storage';

const NotificationsPage=()=>{
    const navigation=useNavigation();
    const gotoNotifications_Details=({data})=>{
        navigation.navigate("Notifications_Details",{data})
    }
    useEffect(()=>{
        getNotificationList()
    },[])


    const getNotificationList =async()=> {
        try {
          const value = await AsyncStorage.getItem('user_arr');
          if (value !== null) {
            const arrayData = JSON.parse(value);
            const response = await fetch(
              config.baseURL +
                'notificationList.php?user_id_post=' +
                arrayData.user_id,
            );
            const json = await response.json();
    
            console.log('______', json);
    
           
          }
          // console.log(this.state.img)
        } catch (error) {
          console.log(error);
        } finally {
        }
      }



    return(
        <View style={{flex:1,backgroundColor:Colors.white}}>
            <Header
             backBtn={true}
             name="Notifications" 
             />
             {/* Clear */}
             <View style={{position:"absolute",right:30,top:32}}>
                 <TouchableOpacity>
                     <Text style={{
                         textDecorationStyle:"solid",
                         textDecorationLine:"underline",
                         color:Colors.white,
                         fontFamily:FontFamily.default,
                         fontSize:14
                         }}>
                         clear
                     </Text>
                 </TouchableOpacity>
             </View>
             {/* SEC2 */}
             <View style={sb.SEC2}>
                 <View style={{marginTop:30}}>
                     {/*  */}
                     <TouchableOpacity onPress={()=>gotoNotifications_Details({data:"Test"})}>
                        <Card containerStyle={{borderRadius:12,padding:5,}}>
                            <View style={{alignItems:"center",flexDirection:"row",justifyContent:"space-between"}}>
                                <View style={{alignItems:"center",flexDirection:"row"}}>
                                    <Image style={{height:60,width:60,borderRadius:12}} source={{uri:"https://source.unsplash.com/weekly?face"}} />
                                    <View style={{marginLeft:7}}>
                                        <Text style={{fontFamily:FontFamily.semi_bold,fontSize:16,lineHeight:22}}>Devid Rock</Text>
                                        <Text style={{fontSize:12,fontFamily:FontFamily.default,color:"rgba(0, 0, 0, 0.58)",lineHeight:30}}>You have recieved booking #74512</Text>
                                    </View>
                                </View>
                                <View>
                                        <Text style={{fontSize:12,fontFamily:FontFamily.default,color:"rgba(0, 0, 0, 0.58)"}}>5m ago</Text>
                                        <TouchableOpacity>
                                            <Card containerStyle={{height:30,width:30,padding:0,alignItems:"center",justifyContent:"center"}}>
                                                <Icon name="cross" type="entypo" />
                                            </Card>
                                        </TouchableOpacity>
                                    </View>
                            </View>
                        </Card>
                     </TouchableOpacity>
                     {/*  */}
                     <TouchableOpacity>
                        <Card containerStyle={{borderRadius:12,padding:5,}}>
                            <View style={{alignItems:"center",flexDirection:"row",justifyContent:"space-between"}}>
                                <View style={{alignItems:"center",flexDirection:"row"}}>
                                    <Image style={{height:60,width:60,borderRadius:12}} source={{uri:"https://source.unsplash.com/weekly?face"}} />
                                    <View style={{marginLeft:7}}>
                                        <Text style={{fontFamily:FontFamily.semi_bold,fontSize:16,lineHeight:22}}>Devid Rock</Text>
                                        <Text style={{fontSize:12,fontFamily:FontFamily.default,color:"rgba(0, 0, 0, 0.58)",lineHeight:30}}>You have recieved booking #74512</Text>
                                    </View>
                                </View>
                                <View>
                                        <Text style={{fontSize:12,fontFamily:FontFamily.default,color:"rgba(0, 0, 0, 0.58)"}}>5m ago</Text>
                                        <TouchableOpacity>
                                            <Card containerStyle={{height:30,width:30,padding:0,alignItems:"center",justifyContent:"center"}}>
                                                <Icon name="cross" type="entypo" />
                                            </Card>
                                        </TouchableOpacity>
                                    </View>
                            </View>
                        </Card>
                     </TouchableOpacity>
                     {/*  */}
                     <TouchableOpacity>
                        <Card containerStyle={{borderRadius:12,padding:5,}}>
                            <View style={{alignItems:"center",flexDirection:"row",justifyContent:"space-between"}}>
                                <View style={{alignItems:"center",flexDirection:"row"}}>
                                    <Image style={{height:60,width:60,borderRadius:12}} source={{uri:"https://source.unsplash.com/weekly?face"}} />
                                    <View style={{marginLeft:7}}>
                                        <Text style={{fontFamily:FontFamily.semi_bold,fontSize:16,lineHeight:22}}>Devid Rock</Text>
                                        <Text style={{fontSize:12,fontFamily:FontFamily.default,color:"rgba(0, 0, 0, 0.58)",lineHeight:30}}>You have recieved booking #74512</Text>
                                    </View>
                                </View>
                                <View>
                                        <Text style={{fontSize:12,fontFamily:FontFamily.default,color:"rgba(0, 0, 0, 0.58)"}}>5m ago</Text>
                                        <TouchableOpacity>
                                            <Card containerStyle={{height:30,width:30,padding:0,alignItems:"center",justifyContent:"center"}}>
                                                <Icon name="cross" type="entypo" />
                                            </Card>
                                        </TouchableOpacity>
                                    </View>
                            </View>
                        </Card>
                     </TouchableOpacity>
                     {/*  */}
                     <TouchableOpacity>
                        <Card containerStyle={{borderRadius:12,padding:5,}}>
                            <View style={{alignItems:"center",flexDirection:"row",justifyContent:"space-between"}}>
                                <View style={{alignItems:"center",flexDirection:"row"}}>
                                    <Image style={{height:60,width:60,borderRadius:12}} source={{uri:"https://source.unsplash.com/weekly?face"}} />
                                    <View style={{marginLeft:7}}>
                                        <Text style={{fontFamily:FontFamily.semi_bold,fontSize:16,lineHeight:22}}>Devid Rock</Text>
                                        <Text style={{fontSize:12,fontFamily:FontFamily.default,color:"rgba(0, 0, 0, 0.58)",lineHeight:30}}>You have recieved booking #74512</Text>
                                    </View>
                                </View>
                                <View>
                                        <Text style={{fontSize:12,fontFamily:FontFamily.default,color:"rgba(0, 0, 0, 0.58)"}}>5m ago</Text>
                                        <TouchableOpacity>
                                            <Card containerStyle={{height:30,width:30,padding:0,alignItems:"center",justifyContent:"center"}}>
                                                <Icon name="cross" type="entypo" />
                                            </Card>
                                        </TouchableOpacity>
                                    </View>
                            </View>
                        </Card>
                     </TouchableOpacity>
                     {/*  */}
                 </View>
             </View>
        </View>
    )
}
const sb = StyleSheet.create({
    SEC2:{
        backgroundColor:Colors.white,
        marginTop:-120,
        borderTopLeftRadius:25,
        borderTopEndRadius:25,
        flex:1
    }
})
export default NotificationsPage;