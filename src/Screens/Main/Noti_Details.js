import React, { useEffect, useState } from 'react';
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
import {Switch} from 'react-native-elements'
import { config } from '../../Provider/configProvider';
import { UserContext } from './UserContext';
import { Lang_chg } from '../../Provider/Language_provider';


const Notifications_Details=(props)=>{
    const user = React.useContext(UserContext);
    console.log('props :>> ', props);
    const [data , setData] = useState(props.route.params.data)
useEffect(() => {
    console.log('data :>> ', data);
}, []);
    return(
        <View style={{flex:1,backgroundColor:Colors.white}}>
            <Header
             backBtn={true}
             name={user.value == 1 ? Lang_chg.text_notification[1] : Lang_chg.text_notification[0]} 
             />
             <View style={sb.SEC2}>
                 {/*  */}
                 <View style={{marginTop:30,paddingHorizontal:20}}>
                     <ScrollView>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <View style={{flexDirection:"row",alignItems:"center"}}>
                                <Image style={{height:50,width:50,borderRadius:10}} source={{ uri: config.image_url4+data.user_image }} />
                                <Text style={{fontFamily:FontFamily.semi_bold,fontSize:16,marginLeft:7}}>{data.user_name}</Text>
                            </View>
                            <Text style={{fontSize:10,fontFamily:FontFamily.default,color:"rgba(153, 153, 153, 1)"}}>
                                {data.createtime_ago}
                            </Text>
                        </View>
                        {/*  */}

                        
                        <View style={{marginVertical:20 , alignItems:'flex-start'}}>
                            <Text style={{fontFamily:FontFamily.default,fontSize:12,color:"rgba(0, 0, 0, 0.58)"}}>
                           { user.value == 1 ? data.message[1] : data.message[0]}
                            </Text>
                        </View>
                        <View style={sb.DIVIDER} />
                      {data?.booking_details?.booking_arr == 'NA'  ? null :
                      
                 
                       <View style={{marginVertical:10}}>
                           <View style={{alignItems:'flex-start'}}>
                           <Text style={{fontSize:14,fontFamily:FontFamily.semi_bold,marginVertical:10 }}>
                           {user.value==1 ?  Lang_chg.text_booking_details[1]: Lang_chg.text_booking_details[0]}
                           </Text>
                           </View>
                      
                           <View style={sb.style1}>
                               <Text style={sb.parameters}>
                               {user.value==1 ?  Lang_chg.Customer_Name[1]: Lang_chg.Customer_Name[0]}
                               </Text>
                               <View style={sb.style2}>
                                   <Text style={sb.values}>
                                       {data?.booking_details?.booking_arr == 'NA' ? "NA":data?.booking_details?.booking_arr?.user_name}
                                   </Text>
                               </View>
                           </View>
                  
                           <View style={sb.style1}>
                               <Text style={sb.parameters}>
                               {user.value==1 ?  Lang_chg.Bookdatetrip[1]: Lang_chg.Bookdatetrip[0]}
                               </Text>
                               <View style={sb.style2}>
                                   <Text style={sb.values}>
                                   {data?.booking_details?.booking_arr == 'NA' ? "NA": data?.booking_details?.booking_arr?.date}

                                   </Text>
                               </View>
                           </View>
                           <View style={sb.style1}>
                               <Text style={sb.parameters}>
                               {user.value==1 ?  Lang_chg.TripTimetrip[1]: Lang_chg.TripTimetrip[0]}
                               </Text>
                               <View style={sb.style2}>
                                   <Text style={sb.values}>
                                   {data?.booking_details?.booking_arr == 'NA' ? "NA": data?.booking_details?.booking_arr?.time}
                                   </Text>
                               </View>
                           </View>
                      
                           <View style={sb.style1}>
                               <Text style={sb.parameters}>
                               {user.value==1 ?  Lang_chg.noogguesttriptour[1]: Lang_chg.noogguesttriptour[0]}
                               </Text>
                               <View style={sb.style2}>
                                   <Text style={sb.values}>
                                   {data?.booking_details?.booking_arr == 'NA' ? "NA":data?.booking_details?.booking_arr?.no_of_guest}
                                   </Text>
                               </View>
                           </View>
                         
                           <View style={sb.style1}>
                               <Text style={sb.parameters}>
                               {user.value==1 ?  Lang_chg.triphourstrip[1]: Lang_chg.triphourstrip[0]}
                               </Text>
                               <View style={sb.style2}>
                                   <Text style={sb.values}>
                                   {data?.booking_details?.booking_arr == 'NA' ? "NA": data?.booking_details?.booking_arr?.minimum_hours} hr
                                   </Text>
                               </View>
                           </View>
                        
                           <View style={sb.style1}>
                               <Text style={sb.parameters}>
                               {user.value==1 ?  Lang_chg.extrahourcheckout[1]: Lang_chg.extrahourcheckout[0]}
                               </Text>
                               <View style={sb.style2}>
                                   <Text style={sb.values}>
                                   {data?.booking_details?.booking_arr == 'NA' ? "NA": data?.booking_details?.booking_arr?.extra_time} hr
                                   </Text>
                               </View>
                           </View>
                    
                           <View style={sb.style1}>
                               <Text style={sb.parameters}>
                               {user.value==1 ?  Lang_chg.equpmenttrip[1]: Lang_chg.equpmenttrip[0]}
                               </Text>
                               <View style={sb.style2}>
                                   <Text style={sb.values}>
                                   Equipment
                                   </Text>
                               </View>
                           </View>
                        
                           <View style={sb.style1}>
                               <Text style={sb.parameters}>
                               {user.value==1 ?  Lang_chg.entertainmenttrip[1]: Lang_chg.entertainmenttrip[0]}
                               </Text>
                               <View style={sb.style2}>
                                   <Text style={sb.values}>
                                   Entertainment
                                   </Text>
                               </View>
                           </View>
                         
                           <View style={sb.style1}>
                               <Text style={sb.parameters}>
                               {user.value==1 ?  Lang_chg.entertainmenttrip[1]: Lang_chg.entertainmenttrip[0]}
                               </Text>
                               <View style={sb.style2}>
                                   <Text style={sb.values}>
                                       Food
                                   </Text>
                               </View>
                           </View>
                     
                           <View style={sb.style1}>
                               <Text style={sb.parameters}>
                               {user.value==1 ?  Lang_chg.Boatplacetrip[1]: Lang_chg.Boatplacetrip[0]}
                               </Text>
                               <View style={sb.style2}>
                                   <Text style={sb.values}>
                                   {data?.booking_details?.booking_arr == 'NA' ? "NA": data?.booking_details?.booking_arr?.location_address}
                                   </Text>
                               </View>
                           </View>
                          
                           <View style={sb.style1}>
                               <Text style={sb.parameters}>
                               {user.value==1 ?  Lang_chg.tripdestinationcheckout[1]: Lang_chg.tripdestinationcheckout[0]}
                               </Text>
                               <View style={sb.style2}>
                                   <Text style={sb.values}>
                                   {data?.booking_details?.booking_arr == 'NA' ? "NA": data?.booking_details?.booking_arr?.location_address}
                                   </Text>
                               </View>
                           </View>
                           
                           <View style={sb.style1}>
                               <Text style={sb.parameters}>
                               {user.value==1 ?  Lang_chg.triptypetrip[1]: Lang_chg.triptypetrip[0]}
                               </Text>
                               <View style={sb.style2}>
                                   <Text style={sb.values}>
                                   {data?.booking_details?.booking_arr == 'NA' ? "NA": user.value==1 ?  data?.booking_details?.booking_arr?.trip_name[1] : data?.booking_details?.booking_arr?.trip_name[0]}

                                   </Text>
                               </View>
                           </View>
                          
                           <View style={sb.style1}>
                               <Text style={sb.parameters}>
                               {user.value==1 ?  Lang_chg.Discounttrip[1]: Lang_chg.Discounttrip[0]}
                               </Text>
                               <View style={sb.style2}>
                                   <Text style={sb.values}>
                                   {data?.booking_details?.booking_arr == 'NA' ? "NA": data?.booking_details?.booking_arr?.discount} %

                                   </Text>
                               </View>
                           </View>
                
                           <View style={sb.style1}>
                               <Text style={sb.parameters}>
                               {user.value==1 ?  Lang_chg.coupendiscountcheckout[1]: Lang_chg.coupendiscountcheckout[0]}
                               </Text>
                               <View style={sb.style2}>
                                   <Text style={sb.values}>
                                   
                                   </Text>
                               </View>
                           </View>
                
                           <View style={sb.style1}>
                               <Text style={sb.parameters}>
                               {user.value==1 ?  Lang_chg.toatalpricecheckout[1]: Lang_chg.toatalpricecheckout[0]}
                               </Text>
                               <View style={sb.style2}>
                                   <Text style={sb.values}>
                                   {user.value==1 ?  Lang_chg.KD[1]: Lang_chg.KD[0]} {data?.booking_details?.booking_arr == 'NA' ? "NA": data?.booking_details?.booking_arr?.total_amt}
                                   </Text>
                               </View>
                           </View>
                       
                           <View style={sb.style1}>
                               <Text style={sb.parameters}>
                               {user.value==1 ?  Lang_chg.Extrarequestcheckout[1]: Lang_chg.Extrarequestcheckout[0]}
                               </Text>
                               <View style={sb.style2}>
                                   <Text style={sb.values}>
                                     No Request
                                   </Text>
                               </View>
                           </View>
                           
                       </View>
                       } 
                       
                        
                     </ScrollView>
                 </View>
             </View>
             {/*  */}
             {
                 data?.booking_details?.booking_arr == 'NA' ? null :
                 <View style={{position:"absolute",alignItems:"center",width:"100%",bottom:10}}>
                 <View style={sb.btn_1}>
                     <TouchableOpacity
                      style={[sb.btn1,{borderColor:Colors.orange,backgroundColor:Colors.white}]}
                      onPress={()=>props.navigation.goBack()}
                      activeOpacity={0.8}
                      >
                         <Text style={[sb.btn1Text,{color:Colors.orange}]}>
                             {user.value == 1 ?  Lang_chg.chatcancel[1] : Lang_chg.chatcancel[0]}
                         </Text>
                     </TouchableOpacity>
                     <TouchableOpacity
                      style={[sb.btn1,{borderColor:Colors.orange,backgroundColor:Colors.orange}]}
                      onPress={() =>
                  props.navigation.navigate('TripTypeDetail', {
                          item: data,
                        
                        })
                      }
                      activeOpacity={0.8}
                      >
                         <Text style={[sb.btn1Text,{color:Colors.white}]}>
                         {user.value == 1 ?  Lang_chg.See_Trip[1] : Lang_chg.See_Trip[0]}
                         </Text>
                     </TouchableOpacity>
                 </View>
                 </View>
             }
           
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
    },
    DIVIDER:{
        borderWidth:0.5,
        borderColor:"rgba(0, 0, 0, 0.5)"
    },
    style1:{
        alignItems:"center",
        flexDirection:"row",
        justifyContent:"space-between",
        marginBottom:7,
        alignItems:"center"
    },
    parameters:{
        fontFamily:FontFamily.semi_bold,
        fontSize:12,
    },
    values:{
        fontFamily:FontFamily.default,
        fontSize:12,
        // textAlign:"left"
        justifyContent:"flex-end",
        alignSelf:"flex-start"
    },
    style2:{
        width:200
    },
    btn1:{
        height:48,
        width:170,
        alignSelf:"center",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:12,
        elevation:2,
        borderWidth:1
        
    },
      btn1Text:{
        fontSize:15,
        fontFamily:FontFamily.semi_bold,
      },
      btn_1:{
        flexDirection:"row",
        justifyContent:"space-around",
width:'100%',
bottom:20
    },
})
export default Notifications_Details;