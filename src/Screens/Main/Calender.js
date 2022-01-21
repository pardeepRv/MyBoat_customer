import { useNavigation } from '@react-navigation/native';
import React, { useState,useEffect } from 'react';
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
import { Calendar } from 'react-native-calendars';
import {
    Icon,
    Input,
    Card
} from 'react-native-elements';
import Header from '../../Components/Header';
import {Colors, FontFamily, Sizes } from '../../Constants/Constants';

const CalenderView=()=>{
    var dates=['2021-08-23','2021-08-26','2021-08-10']
    const navigation=useNavigation();
    const gotoSelectedDate=({data})=>{
        navigation.navigate("SelectedDate",{data})
    }
    const Cal=({selectDate})=>{
        const IconLeft=()=><Icon name="left" type="antdesign" size={20} color={Colors.black} />
        const IconRight=()=><Icon name="right" type="antdesign" size={20} color={Colors.black} />
        const [selecteddate,setSelectedDate]=useState([].concat(selectDate).concat(dates));
         var dates=['2021-08-23','2021-08-26','2021-08-10']
        // console.log(selecteddate)
        useEffect(() => {
            // setSelectedDate(dates)
            // console.log("--->",selecteddate)
        },[selecteddate])
        return(
            <View >
                <Calendar 
                    onDayPress={(day) =>{selecteddate.push(day.dateString),gotoSelectedDate({data:day})} }
                    dayComponent={({date,state,}) => {
                        return (
                          <TouchableOpacity style={{
                            backgroundColor:selecteddate.includes(date.dateString) ? Colors.orange : Colors.white,
                            elevation:5,
                            height:40,
                            width:40,
                            textAlign:"center",
                            justifyContent:"center"
                          }}
                          onPress={()=>{dates.push(date.dateString)
                        setSelectedDate(dates)
                        // console.log("-||-->",date)
                        gotoSelectedDate({data:date})
                        }}
                          >
                            <Text style={{
                                textAlign: 'center', 
                                color: state === 'disabled' ? 'gray' : selecteddate.includes(date.dateString) ? Colors.white :state === 'today' ? Colors.orange : 'black',
                                fontFamily:FontFamily.bold
                                }}
                                >
                              {date.day}
                            </Text>
                          </TouchableOpacity>
                        );
                      }}
                    onDayLongPress={(day) => {console.log(selecteddate)}}
                    monthFormat={'MMMM , yyyy'}
                    onMonthChange={(month) => {console.log('month changed', month)}}
                    renderArrow={(direction) => (direction === 'left' ? <IconLeft/> : <IconRight/>)}
                    onPressArrowLeft={subtractMonth => subtractMonth()}
                    onPressArrowRight={addMonth => addMonth()}
                    enableSwipeMonths={true}
                    style={{
                        // position:"absolute",
                        width:"100%",
                        alignSelf:"center",
                        borderTopLeftRadius:25,
                        borderTopEndRadius:25,
                    }}
                    theme={{
                        "stylesheet.calendar.header":{
                            week:{
                                marginTop: 15,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingHorizontal:5
                            },
                            dayTextAtIndex0:{
                                fontFamily:FontFamily.default,
                                color:"#000"
                            },
                            dayTextAtIndex1:{
                                fontFamily:FontFamily.default,
                                color:"#000"
                            },
                            dayTextAtIndex2:{
                                fontFamily:FontFamily.default,
                                color:"#000"
                            },
                            dayTextAtIndex3:{
                                fontFamily:FontFamily.default,
                                color:"#000"
                            },
                            dayTextAtIndex4:{
                                fontFamily:FontFamily.default,
                                color:"#000"
                            },
                            dayTextAtIndex5:{
                                fontFamily:FontFamily.default,
                                color:"#000"
                            },
                            dayTextAtIndex6:{
                                fontFamily:FontFamily.default,
                                color:"#000"
                            },
                            header:{
                                backgroundColor:Colors.cal_head,
                                flexDirection:"row",
                                justifyContent:"space-between",
                                borderTopEndRadius:25,
                                borderTopLeftRadius:25,
                                width:"102%",
                                height:60,
                                alignSelf:"center",
                                marginVertical:1,
                                alignItems:"center",
                                fontFamily:FontFamily.bold
                            },
                            
                        },
                        textMonthFontFamily:FontFamily.semi_bold
                    }}
                  />
                  <View>
                     <TouchableOpacity style={sb.btn1}>
                         <Text style={sb.btn1Text}>
                             Submit
                         </Text>
                     </TouchableOpacity>
                 </View>
            </View>
        )
    }
    const renderList=({item})=>{
        return(
            <View>
                <Card containerStyle={{height:50,paddingVertical:2,justifyContent:"center",borderRadius:12}}>
                    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <Icon name="calendar" type="antdesign" color={Colors.orange} />
                        <Text style={{fontSize:14,fontFamily:FontFamily.semi_bold,marginHorizontal:7}}>
                            {item}
                        </Text>
                    </View>
                    <Icon name="trash-outline" type="ionicon" color={Colors.orange} />
                    </View>
                </Card>
            </View>
        )
    }
    return(
        <View style={{flex:1,backgroundColor:Colors.white}}>
            <Header
             name="Manage Unavailablity"
             imgBack={true} />
             <View style={sb.SEC2}>
                 <View style={{marginTop:30}}>
                 <ScrollView showsVerticalScrollIndicator={false}>
                 <Cal selectDate={dates} />
                 <View>
                     <Text style={{fontFamily:FontFamily.semi_bold,fontSize:16,paddingHorizontal:10}}>
                     Unavailablity
                     </Text>
                     <FlatList
                      scrollEnabled={false}
                      data={dates}
                      renderItem={renderList}
                      keyExtractor={(itn=>itn)}
                      contentContainerStyle={{ 
                        paddingBottom: 15,
                     }}
                      />
                 </View>
                 </ScrollView>
                 </View>
             </View>
             
        </View>
    )
}
const sb=StyleSheet.create({
    SEC2:{
        backgroundColor:Colors.white,
        marginTop:-40,
        borderTopLeftRadius:25,
        borderTopEndRadius:25,
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
        elevation:5
    },
    btn1Text:{
        fontSize:20,
        fontFamily:FontFamily.semi_bold,
        color:Colors.white
    }
})

export default CalenderView;