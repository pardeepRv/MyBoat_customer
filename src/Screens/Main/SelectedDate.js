import React, { createRef, useCallback, useRef, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    FlatList,
    ActivityIndicator
} from 'react-native';
import {
    Icon,
    Input,
    Card,
    AirbnbRating,
    Overlay,
    Image
} from 'react-native-elements';
import { color } from 'react-native-elements/dist/helpers';
import Header from '../../Components/Header';
import { back_img3, boat_img1, Colors, FontFamily, Sizes } from '../../Constants/Constants';
import RadioButtonRN from 'radio-buttons-react-native';



const SelectedDate=()=>{
    const data = [
        {
          label: 'All Select'
         },
        ];
    const data1 = [
        {
          label: 'Full Day'
         },
        {
          label: 'Select Hours'
         },
        ];
        const boatData=[
            {name:'Boat 1'},
            {name:'Boat 2'},
            {name:'Boat 3'},
            {name:'Boat 4'},
            {name:'Boat 5'},
            {name:'Boat 6'},
        ]
        const TouchableRef=createRef();
        
    return(
        <View style={{flex:1,backgroundColor:Colors.white}}>
            <Header backBtn={true} name="Selected Date" />
            <View style={sb.SEC2}>
                <View style={{marginTop:30,paddingHorizontal:10}}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <RadioButtonRN
                         data={data}
                         circleSize={10}
                         box={false}
                         deactiveColor={Colors.orange}
                         activeColor={Colors.orange}
                         textStyle={{
                             fontFamily:FontFamily.semi_bold
                         }}
                          />
                          {/*  */}
                          <View style={{borderWidth:0.5,marginVertical:15,borderColor:"rgba(0, 0, 0, 0.55)"}} />
                          {/*  */}
                          <View>
                              <Text>Select Boat</Text>
                              <View style={{flexDirection:"row",flexWrap:'wrap'}}>
                                  
                                  {boatData.map((itm,ind)=>{
                                      return(
                                          <View key={ind}>
                                              <TouchableOpacity ref={TouchableRef} />
                                          <TouchableOpacity key={ind} style={{
                                            //   height:30,
                                              alignItems:"center",
                                              justifyContent:"center",
                                              borderColor:"#999",
                                              borderWidth:1,
                                              margin:3,
                                              backgroundColor:"#fff"
                                              }}
                                               onPress={()=>TouchableRef?.current?.setNativeProps?.({
                                                   backgroundColor:"#000"
                                               })}
                                              >
                                              <Text style={{padding:7,paddingHorizontal:20}}>
                                                  {itm.name}
                                              </Text>
                                          </TouchableOpacity>
                                          </View>
                                      )
                                  })}
                              </View>
                          </View>
                          {/*  */}
                          <View style={{borderWidth:0.5,marginVertical:15,borderColor:"rgba(0, 0, 0, 0.55)"}} />
                          {/*  */}
                          <View>
                          <RadioButtonRN
                            data={data1}
                            circleSize={10}
                            box={false}
                            deactiveColor={Colors.orange}
                            activeColor={Colors.orange}
                            textStyle={{
                                fontFamily:FontFamily.semi_bold
                            }}
                            />
                            <View style={{marginTop:17,paddingHorizontal:20}}>
                                <View style={{flexDirection:'row',width:100}}>
                                    <Text>
                                        From
                                    </Text>
                                    <View >
                                        <Input
                                        placeholder="HH:MM"
                                        inputStyle={{fontSize:15,textAlign:"center"}}
                                        inputContainerStyle={{height:25,width:70,borderWidth:1}}
                                        value="11:00"
                                        maxLength={5}
                                        />
                                    </View>
                                    <View>
                                        <TouchableOpacity style={{padding:1.7,borderWidth:1,}}>
                                            <Text>AM</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                    <Text>
                                        To
                                    </Text>
                                    <View>
                                        <Input
                                        placeholder="HH:MM"
                                        inputStyle={{fontSize:15,textAlign:"center"}}
                                        inputContainerStyle={{height:25,width:70,borderWidth:1}}
                                        value="11:00"
                                        maxLength={5}
                                        />
                                    </View>
                                    <View>
                                        <TouchableOpacity style={{padding:1.7,borderWidth:1,}}>
                                            <Text>AM</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                          </View>
                    </ScrollView>
                </View>
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

export default SelectedDate;