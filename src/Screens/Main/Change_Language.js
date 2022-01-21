import React, { useState } from 'react';
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

const Change_Language=()=>{
    const [btn1Style,setBtn1Style]=useState({
        backColor:Colors.orange,
        textCOlor:Colors.white
    })
    const [btn2Style,setBtn2Style]=useState({
        backColor:Colors.white,
        textCOlor:Colors.black
    });
    return(
        <View style={{flex:1,backgroundColor:Colors.white}}>
            <Header
             backBtn={true}
             imgBack={true}
             name="Change Language"
             headerHeight={300}
             />
             <View style={sb.SEC2}>
                 <View style={{marginTop:30,paddingHorizontal:10}}>
                     {/*  */}
                     <TouchableOpacity>
                             <Card containerStyle={{
                                 backgroundColor:btn1Style.backColor,
                                 borderRadius:12,
                                 paddingHorizontal:20
                             }}>
                         <Text style={{
                             fontFamily:FontFamily.default,
                             fontWeight:"500",
                             color:btn1Style.textCOlor
                         }}>English</Text>
                         </Card>
                     </TouchableOpacity>
                     {/*  */}
                     <TouchableOpacity>
                             <Card containerStyle={{
                                 backgroundColor:btn2Style.backColor,
                                 borderRadius:12,
                                 paddingHorizontal:20
                             }}>
                         <Text style={{
                             fontFamily:FontFamily.default,
                             fontWeight:"500",
                             color:btn2Style.textCOlor
                         }}>Arabic</Text>
                         </Card>
                     </TouchableOpacity>
                 </View>
                 
             </View>
             <View>
                <TouchableOpacity style={sb.btn1}>
                    <Text style={sb.btn1Text}>
                        Done
                    </Text>
                </TouchableOpacity>
                </View>
        </View>
    )
}
const sb = StyleSheet.create({
    SEC2:{
        backgroundColor:Colors.white,
        borderTopLeftRadius:25,
        borderTopEndRadius:25,
        marginTop:-50,
        flex:1
    },
    btn1:{
        height:48,
        width:"95%",
        backgroundColor:Colors.orange,
        alignSelf:"center",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:12,
        marginVertical:10,
        elevation:5,
        position:"absolute",
        bottom:0
        
    },
    btn1Text:{
        fontSize:20,
        fontFamily:FontFamily.semi_bold,
        color:Colors.white
    }
})
export default Change_Language;