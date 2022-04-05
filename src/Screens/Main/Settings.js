import React, { useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Image
} from 'react-native';
import {
    Icon,
    Input,
    Card
} from 'react-native-elements';
import Header from '../../Components/Header';
import { back_img3, boat_img1, Colors, FontFamily, Sizes } from '../../Constants/Constants';
import { useNavigation } from '@react-navigation/core';
import { UserContext } from "./UserContext";
import { Lang_chg } from '../../Provider/Language_provider';

const Settings=()=>{
    const user = React.useContext(UserContext);

    const navigation=useNavigation()
    const gotoNoti_Settings=()=>{
        navigation.navigate("Noti_Setting");
    }
    const gotoChange_Language=()=>{
        navigation.navigate("Change_Language")
    }
    const gotoChange_Password=()=>{
        navigation.navigate("Change_Password")
    }
    
    const gotoTerms_Conditions=()=>{
        navigation.navigate("Terms_Conditions",{'type':1})
    }
   
    const gotoPrivacy=()=>{
        navigation.navigate("Terms_Conditions",{'type':2})
    }

    const gotoAbout=()=>{
        navigation.navigate("Terms_Conditions",{'type':3})
    }

    const gotoEditProfile=()=>{
        navigation.navigate("Edit_Profile")
    }
    const gotoContactUsPage=()=>{
        navigation.navigate("ContactUs")
    }
    return(
        <View style={{flex:1,backgroundColor:Colors.white}}>
            <Header
             backBtn={true}
             name={user.value ==1 ? Lang_chg.settings_txt[1] : Lang_chg.settings_txt[0]} />
             
             <View style={sb.SEC2}>
                 <ScrollView style={{marginTop:30}} showsVerticalScrollIndicator={false}>
                     {/* Account */}
                     <Text style={{paddingHorizontal:30,paddingBottom:5,color:Colors.orange,fontFamily:FontFamily.semi_bold}}>Account</Text>
                     {/* 1 */}
                     <TouchableOpacity style={{marginBottom:1}} onPress={()=>gotoNoti_Settings()}>
                        <Card containerStyle={{height:50,paddingVertical:2,justifyContent:"center",borderRadius:12}}>
                            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                            <View style={{flexDirection:"row",alignItems:"center"}}>
                                <Text style={{fontSize:14,fontFamily:FontFamily.semi_bold,marginHorizontal:7}}>
                                {user.value == 1  ? Lang_chg.text_Notification_Setting[1] : Lang_chg.text_Notification_Setting[0]}
                                </Text>
                            </View>
                            <Icon name="arrow-right" type="evilicon"  />
                            </View>
                        </Card>
                    </TouchableOpacity>
                    {/*  2*/}
                     {/* <TouchableOpacity style={{marginBottom:1}} onPress={()=>gotoEditProfile()}>
                        <Card containerStyle={{height:50,paddingVertical:2,justifyContent:"center",borderRadius:12}}>
                            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                            <View style={{flexDirection:"row",alignItems:"center"}}>
                                <Text style={{fontSize:14,fontFamily:FontFamily.semi_bold,marginHorizontal:7}}>
                                Edit Profile
                                </Text>
                            </View>
                            <Icon name="arrow-right" type="evilicon"  />
                            </View>
                        </Card>
                    </TouchableOpacity> */}
                    {/*  3*/}
                     <TouchableOpacity style={{marginBottom:1}} onPress={()=>gotoChange_Password()}>
                        <Card containerStyle={{height:50,paddingVertical:2,justifyContent:"center",borderRadius:12}}>
                            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                            <View style={{flexDirection:"row",alignItems:"center"}}>
                                <Text style={{fontSize:14,fontFamily:FontFamily.semi_bold,marginHorizontal:7}}>
                                {user.value == 1 ? Lang_chg.change_language_txt[1] : Lang_chg.change_language_txt[0]}
                                </Text>
                            </View>
                            <Icon name="arrow-right" type="evilicon"  />
                            </View>
                        </Card>
                    </TouchableOpacity>
                    {/*  4*/}
                     <TouchableOpacity style={{marginBottom:1}} onPress={()=>gotoChange_Language()}>
                        <Card containerStyle={{height:50,paddingVertical:2,justifyContent:"center",borderRadius:12}}>
                            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                            <View style={{flexDirection:"row",alignItems:"center"}}>
                                <Text style={{fontSize:14,fontFamily:FontFamily.semi_bold,marginHorizontal:7}}>
                                {user.value == 1 ? Lang_chg.text_Change_Language[1] : Lang_chg.text_Change_Language[0]}

                                </Text>
                            </View>
                            <Icon name="arrow-right" type="evilicon"  />
                            </View>
                        </Card>
                    </TouchableOpacity>
                    {/* Support */}
                    <Text style={{paddingHorizontal:30,paddingBottom:5,paddingTop:15,color:Colors.orange,fontFamily:FontFamily.semi_bold}}>Support</Text>
                     {/* 1 */}
                     <TouchableOpacity style={{marginBottom:1}} onPress={()=>gotoTerms_Conditions()}>
                        <Card containerStyle={{height:50,paddingVertical:2,justifyContent:"center",borderRadius:12}}>
                            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                            <View style={{flexDirection:"row",alignItems:"center"}}>
                                <Text style={{fontSize:14,fontFamily:FontFamily.semi_bold,marginHorizontal:7}}>
                                {user.value == 1 ? Lang_chg.text_Terms_And_Conditions[1] : Lang_chg.text_Terms_And_Conditions[0]}

                                </Text>
                            </View>
                            <Icon name="arrow-right" type="evilicon"  />
                            </View>
                        </Card>
                    </TouchableOpacity>
                    {/* 2 */}
                     <TouchableOpacity style={{marginBottom:1}}  onPress={()=>gotoPrivacy()}>
                        <Card containerStyle={{height:50,paddingVertical:2,justifyContent:"center",borderRadius:12}}>
                            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                            <View style={{flexDirection:"row",alignItems:"center"}}>
                                <Text style={{fontSize:14,fontFamily:FontFamily.semi_bold,marginHorizontal:7}}>
                                {user.value == 1 ? Lang_chg.loginterm4[1] : Lang_chg.loginterm4[0]}
                                </Text>
                            </View>
                            <Icon name="arrow-right" type="evilicon"  />
                            </View>
                        </Card>
                    </TouchableOpacity>
                    {/* 3 */}
                     <TouchableOpacity style={{marginBottom:1}}  onPress={()=>gotoAbout()} >
                        <Card containerStyle={{height:50,paddingVertical:2,justifyContent:"center",borderRadius:12}}>
                            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                            <View style={{flexDirection:"row",alignItems:"center"}}>
                                <Text style={{fontSize:14,fontFamily:FontFamily.semi_bold,marginHorizontal:7}}>
                                {user.value == 1 ? Lang_chg.text_About_Us[1] : Lang_chg.text_About_Us[0]}
                                </Text>
                            </View>
                            <Icon name="arrow-right" type="evilicon"  />
                            </View>
                        </Card>
                    </TouchableOpacity>
                    {/* 4 */}
                     <TouchableOpacity style={{marginBottom:1}}   onPress={()=>gotoContactUsPage()}>
                        <Card containerStyle={{height:50,paddingVertical:2,justifyContent:"center",borderRadius:12}}>
                            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                            <View style={{flexDirection:"row",alignItems:"center"}}>
                                <Text style={{fontSize:14,fontFamily:FontFamily.semi_bold,marginHorizontal:7}}>
                                {user.value == 1 ? Lang_chg.contact_to_ad_text[1] : Lang_chg.contact_to_ad_text[0]}
                                </Text>
                            </View>
                            <Icon name="arrow-right" type="evilicon"/>
                            </View>
                        </Card>
                    </TouchableOpacity>
                    {/* 5 */}
                     <TouchableOpacity style={{marginBottom:1}}>
                        <Card containerStyle={{height:50,paddingVertical:2,justifyContent:"center",borderRadius:12}}>
                            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                            <View style={{flexDirection:"row",alignItems:"center"}}>
                                <Text style={{fontSize:14,fontFamily:FontFamily.semi_bold,marginHorizontal:7}}>
                                {user.value == 1 ? Lang_chg.text_share_app[1] : Lang_chg.text_share_app[0]}
                                </Text>
                            </View>
                            <Icon name="arrow-right" type="evilicon"  />
                            </View>
                        </Card>
                    </TouchableOpacity>
                    {/* 6 */}
                     <TouchableOpacity style={{marginBottom:1}}>
                        <Card containerStyle={{height:50,paddingVertical:2,justifyContent:"center",borderRadius:12}}>
                            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                            <View style={{flexDirection:"row",alignItems:"center"}}>
                                <Text style={{fontSize:14,fontFamily:FontFamily.semi_bold,marginHorizontal:7}}>
                                {user.value == 1 ? Lang_chg.text_rate_app[1] : Lang_chg.text_rate_app[0]}
                                </Text>
                            </View>
                            <Icon name="arrow-right" type="evilicon"  />
                            </View>
                        </Card>
                    </TouchableOpacity>
                    {/* 7 */}
                     {/* <TouchableOpacity style={{marginBottom:15}}>
                        <Card containerStyle={{height:50,paddingVertical:2,justifyContent:"center",borderRadius:12}}>
                            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                            <View style={{flexDirection:"row",alignItems:"center"}}>
                                <Text style={{fontSize:14,fontFamily:FontFamily.semi_bold,marginHorizontal:7}}>
                                Logout
                                </Text>
                            </View>
                            <Icon name="arrow-right" type="evilicon"  />
                            </View>
                        </Card>
                    </TouchableOpacity> */}
                    {/* END */}
                    <Text>{'\n'}</Text>
                 </ScrollView>
             </View>
        </View>
    )
}
const sb =StyleSheet.create({
    SEC2:{
        backgroundColor:Colors.white,
        marginTop:-120,
        borderTopLeftRadius:25,
        borderTopEndRadius:25,
        flex:1
    },
})
export default Settings;