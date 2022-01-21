import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    StyleSheet
} from 'react-native';
import { Icon } from 'react-native-elements';
import { back_img,backgd2, Colors, FontFamily } from '../Constants/Constants';
import { useNavigation } from '@react-navigation/core';


const Header2 = ({backBtn,notiBtn,searchBtn,name,imgBack,backColor,headerHeight,backImgSource}) =>{
    const navigation=useNavigation();
    const [state,setState]=useState({
        backBtn: false || backBtn,
        notiBtn: false || notiBtn,
        searchBtn : false || searchBtn,
        imgBack: false || imgBack,
        name : " " || name,
        backColor : Colors.orange || backColor ,
        headerHeight : headerHeight || 200 ,
        back_img_source : backgd2 || backImgSource,
        back_img_source2 :  backImgSource
    })
    const gotoBack=()=>{
        navigation.goBack();
    };
    const gotoNotification=()=>{
        navigation.navigate("GoogleMap")
    };
    return(
        state.imgBack ? (
            <ImageBackground
                style={[s.ImageBackground,{height:state.headerHeight}]}
                source={state.back_img_source2}
                source={{uri:state.back_img_source2}}
               imageStyle={s.ImageBackground_Img}
                >
                <View style={{flexDirection:"row",justifyContent:"space-between",width:"90%",marginTop:30,alignSelf:"center",backgroundColor:"transparent",alignItems:"center"}}>
                    {
                        state.backBtn ? (
                            <TouchableOpacity onPress={()=>gotoBack()}>
                                <Icon name="arrow-back" type="ionicons" size={24} color={Colors.white} />
                            </TouchableOpacity>
                        ) : state.notiBtn ? (
                            <TouchableOpacity onPress={()=>gotoNotification()}>
                                <Icon name="bell" type="simple-line-icon" size={24} color={Colors.white} />
                            </TouchableOpacity>
                        ) : <View style={{height:25,width:25}} />
                    }
                    <Text style={{fontFamily:FontFamily.semi_bold,color:Colors.white,textAlign:"center"}}>
                        {name}
                    </Text>
                    {
                        state.searchBtn ? (
                            <TouchableOpacity>
                                <Icon name="search1" type="antdesign" size={25} color={Colors.white} />
                            </TouchableOpacity>
                        ) : <View style={{height:25,width:25}} />
                    }
                </View>
            </ImageBackground>
        ) : (
            <View
                style={[s.ImageBackground,{backgroundColor:state.backColor,height:state.headerHeight}]}
                >
                <View style={{flexDirection:"row",justifyContent:"space-between",width:"90%",marginTop:30,alignSelf:"center",backgroundColor:"transparent",alignItems:"center"}}>
                    {
                        state.backBtn ? (
                            <TouchableOpacity onPress={()=>gotoBack()}>
                                <Icon name="arrow-back" type="ionicons" size={24} color={Colors.white} />
                            </TouchableOpacity>
                        ) : state.notiBtn ? (
                            <TouchableOpacity onPress={()=>gotoNotification()}>
                                <Icon name="bell" type="simple-line-icon" size={24} color={Colors.white} />
                            </TouchableOpacity>
                        ) : <View style={{height:25,width:25}} />
                    }
                    <Text style={{fontFamily:FontFamily.semi_bold,color:Colors.white,textAlign:"center"}}>
                        {name}
                    </Text>
                    {
                        state.searchBtn ? (
                            <TouchableOpacity>
                                <Icon name="search1" type="antdesign" size={25} color={Colors.white} />
                            </TouchableOpacity>
                        ) : <View style={{height:25,width:25}} />
                    }
                </View>
            </View>
        )
        
    )
}
export const s= StyleSheet.create({
    ImageBackground:{
        backgroundColor:Colors.black
    },
    ImageBackground_Img:{
        resizeMode:"cover",
        //opacity:0.5
    }
})
export default Header2;