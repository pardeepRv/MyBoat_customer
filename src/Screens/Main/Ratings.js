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
    Card,
    AirbnbRating
} from 'react-native-elements';
import Header from '../../Components/Header';
import { back_img3, boat_img1, Colors, FontFamily, Sizes } from '../../Constants/Constants';
import { useNavigation } from '@react-navigation/core';

const Ratings=()=>{
    const navigate=useNavigation();
    const gotoRatingsDetails=({item})=>{
        navigate.navigate("DetailsRating",{item})
    }
    return(
        <View style={{flex:1,backgroundColor:Colors.white}}>
            <Header
             backBtn={true}
             name="Ratings"
             imgBack={true}
             headerHeight={300} />
             {/* Ratings */}
             <View style={{
                 flexDirection:"row",
                 justifyContent:"space-around",
                 position:'absolute',
                 width:"100%",
                 top:100,
                 alignItems:"center"
                 }}>
                 <View style={{alignItems:"center"}}>
                     <Text style={{
                         fontSize:17,
                         fontFamily:FontFamily.bold,
                         color:Colors.white
                     }}>4.5</Text>
                     <View style={{flexDirection:"row",alignItems:"center"}}>
                     <AirbnbRating
                       showRating={false} 
                       size={14} 
                       count={5}
                       defaultRating={4.5}
                       isDisabled
                       selectedColor="#FFCC39"
                       starContainerStyle={{
                           elevation:5
                       }}
                       />
                       <Text style={sb.count}>(2000)</Text>
                     </View>
                 </View>
                 {/*  */}
                 <View>
                 {/* 5* */}
                 <View style={{flexDirection:"row",alignItems:"center",marginVertical:4}}>
                    <AirbnbRating
                       showRating={false} 
                       size={14} 
                       count={5}
                       defaultRating={5}
                       isDisabled
                       selectedColor="#FFCC39"
                       starContainerStyle={{
                           elevation:5
                       }}
                    />
                    <Text style={sb.count}>
                        (150)
                    </Text>
                 </View>
                 {/* 4* */}
                 <View style={{flexDirection:"row",alignItems:"center",marginVertical:4}}>
                    <AirbnbRating
                       showRating={false} 
                       size={14} 
                       count={5}
                       defaultRating={4}
                       isDisabled
                       selectedColor="#FFCC39"
                       starContainerStyle={{
                           elevation:5
                       }}
                    />
                    <Text style={sb.count}>
                        (100)
                    </Text>
                 </View>
                 {/* 3* */}
                 <View style={{flexDirection:"row",alignItems:"center",marginVertical:4}}>
                    <AirbnbRating
                       showRating={false} 
                       size={14} 
                       count={5}
                       defaultRating={3}
                       isDisabled
                       selectedColor="#FFCC39"
                       starContainerStyle={{
                           elevation:5
                       }}
                    />
                    <Text style={sb.count}>
                        (30)
                    </Text>
                 </View>
                 {/* 2* */}
                 <View style={{flexDirection:"row",alignItems:"center",marginVertical:4}}>
                    <AirbnbRating
                       showRating={false} 
                       size={14} 
                       count={5}
                       defaultRating={2}
                       isDisabled
                       selectedColor="#FFCC39"
                       starContainerStyle={{
                           elevation:5
                       }}
                    />
                    <Text style={sb.count}>
                        (16)
                    </Text>
                 </View>
                 {/* 1* */}
                 <View style={{flexDirection:"row",alignItems:"center",marginVertical:4}}>
                    <AirbnbRating
                       showRating={false} 
                       size={14} 
                       count={5}
                       defaultRating={1}
                       isDisabled
                       selectedColor="#FFCC39"
                       starContainerStyle={{
                           elevation:5
                       }}
                    />
                    <Text style={sb.count}>
                        (10)
                    </Text>
                 </View>
                 {/*  */}
                
                 </View>
             </View>
             {/* SEC2 */}
             <View style={sb.SEC2}>
                 <View style={{marginTop:30}}>
                     <FlatList
                      renderItem={(item)=>{
                          return(
                            <Card containerStyle={{borderRadius:12,elevation:3}}>
                                {console.log("item==Raa===>")}
                                <TouchableOpacity onPress={()=>gotoRatingsDetails({item:"Test"})}>
                                <View style={{flexDirection:"row"}}>
                                    <View style={{flexDirection:"row",alignItems:"center"}}>
                                        <Image style={{height:40,width:40 }} source={{uri:'https://source.unsplash.com/weekly?face'}} />
                                        <View style={{marginLeft:5}}>
                                            <Text style={{fontFamily:FontFamily.semi_bold}}>
                                                Name of Rater
                                            </Text>
                                            <AirbnbRating
                                            showRating={false} 
                                            size={10} 
                                            count={5}
                                            defaultRating={4.5}
                                            isDisabled
                                            selectedColor="#FFCC39"
                                            starContainerStyle={{
                                                elevation:5,
                                                alignSelf:"flex-start"
                                            }}
                                            />
                                            <Text style={{fontFamily:FontFamily.default,fontSize:10}}>
                                                Commodo anim consequat num nisi excepteur.
                                            </Text>
                                        </View>
                                    </View>
                                    <Text style={{fontSize:10,fontFamily:FontFamily.default}}>
                                    10:30 PM
                                </Text>
                                </View>
                                </TouchableOpacity>
                            </Card>
                          )
                      }}
                      data={[{},{},{},{},{},{}]}
                      keyExtractor={(item,ind)=>ind}
                      contentContainerStyle={{
                          paddingBottom:15
                      }}
                      />
                 </View>
             </View>
        </View>
    )
}
const sb=StyleSheet.create({
    count:{
        fontFamily:FontFamily.default,
        fontSize:14,
        color:Colors.white
    },
    SEC2:{
        backgroundColor:Colors.white,
        marginTop:-30,
        borderTopLeftRadius:25,
        borderTopEndRadius:25,
        flex:1
    },
})
export default Ratings;