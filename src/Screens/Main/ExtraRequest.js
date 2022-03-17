import React, { Component, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableOpacity,
  Modal,
  Keyboard,
  ScrollView,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import { CheckBox, Icon, Input, Card, AirbnbRating } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Header from '../../Components/Header';
import {
  back_img3,
  boat_img1,
  Colors,
  FontFamily,
  Sizes,
} from '../../Constants/Constants';
import Ad from '../../Data/Ad';
import Outgoing from '../../Data/Outgoing';
import Upcoming from '../../Data/Upcoming';
import { SliderBox } from 'react-native-image-slider-box';
import FastImage from 'react-native-fast-image';
import { renderNode } from 'react-native-elements/dist/helpers';
import { apifuntion } from '../../Provider/apiProvider';
import { config } from '../../Provider/configProvider';
import AsyncStorage from '@react-native-community/async-storage';
import { Calendar } from 'react-native-calendars';
import DatePicker from 'react-native-datepicker';
import { Lang_chg } from '../../Provider/Language_provider';
import DateTimePicker from '@react-native-community/datetimepicker';
import { WebView } from 'react-native-webview';
import { msgProvider, msgTitle, msgText } from '../../Provider/messageProvider';
import { UserContext } from './UserContext';

export default class ExtraRequest extends Component {
  static contextType = UserContext
  constructor(props) {
    super(props);
    this.state = {
      adver_arr: this.props.route.params.adver_arr,
      adv: this.props.route.params.adv,
      data: this.props.route.params.data,
      isSelected: false,
      coupon_discount: '0.00',
      check: [],
      hour: '',
      isChecked: false,
      couponCode: '',
      extraHours: "",
      rentam:this.props.route.params.adv.extra_price,
      totalPrice:
        Number(this.props.route.params.data.rent_amount) 
        // +
        // Number(this.props.route.params.data.extra_rent_amt),
    };
  }

  componentDidMount() {

    // alert(this.props.route.params.adv.extra_price)
    console.log(this.state.data, "????????????????????????????/");
    console.log(this.state.adv, "????????????????????????????/");
    console.log('object :>> ', this.state.rentam);

  }
  onChangeCheck = (item, index, id) => {
    console.log(item.addon_product_price, 'item.addon_product_price');
    console.log(index, 'index');
     console.log(id, 'id');

    const tempArray = [...this.state.adver_arr];

    console.log(tempArray, 'tem arr');

    const array = tempArray.map(v => {
      const newItem = Object.assign({}, v);
      return newItem;
    });

    console.log(array, 'arrayarray');
    if (!item.isChecked) {
      this.state.totalPrice =
        this.state.totalPrice + Number(item.addon_product_price);
    } else {
      this.state.totalPrice =
        this.state.totalPrice - Number(item.addon_product_price);
    }
     console.log('Total Price', this.state.totalPrice);

    console.log(array[id], 'array[index]');
    array[id].isChecked = !array[id].isChecked;
    this.setState({
      adver_arr: array,
    });
  };

//   onChangeCheck = (select, index, id) => {
//     console.log(index, id, 'ITEEEEEEE', select.addon_product_price);
//  const tempArray = [...this.state.adver_arr];
//  if (!select.isChecked) {
//    this.state.totalPrice =
//      this.state.totalPrice + Number(select.addon_product_price);
//  } else {
//    this.state.totalPrice =
//      this.state.totalPrice - Number(select.addon_product_price);
//  }
//   console.log('Total Price', this.state.totalPrice);
//  return   console.log('object :>> ', tempArray);
//  tempArray[id].addon_product_name[index].isChecked = !select.isChecked;
//  this.setState({
//    adver_arr: tempArray,
//  });
// };


  ExtraRequest() {
    console.log(this.state.couponCode, '^^^^^', this.state.data.coupon_code);
    if (this.state.couponCode) {
      if (this.state.couponCode != this.state.data.coupon_code) {
        alert('Please enter valid coupon code');
        return;
      } else {
        this.setState({
          coupon_discount: this.state.data.coupon_discount,
          // adver_arr:Number(this.state.extraHours) * Number(this.props.route.params.adv.extra_price)
          // extraHours:this.state.extraHours

        });
      }
    }

    this.props.navigation.navigate('Checkout', {
      adver_arr: this.state.adver_arr,
      adv: this.state.adv,
      coupon_discount: this.state.data.coupon_discount,
      data: this.state.data,
      extraHours: this.state.extraHours,
      extra_rent_amt: Number(this.state.extraHours) * Number(this.props.route.params.adv.extra_price),
      totalPrice: this.state.totalPrice + Number(this.state.data.coupon_discount),
    }
    );
  }

  render() {
    // alert(Number(this.state.extraHours) * Number(this.state.adver_arr.addon_product_price));
    const user = this.context
    console.log('context in home', user);
    console.log('this.state.adver_arr :>> ', this.state.adver_arr);
    return (


      <View style={{ backgroundColor: '#fff', height: '100%' }}>
        <Header
          imgBack={true}
          notiBtn={false}
          backBtn
          searchBtn={false}
          headerHeight={120}
          name={user.value == 1 ? Lang_chg.extrarequesttrip[1] : Lang_chg.extrarequesttrip[0]}
          backImgSource={require('../../Images/backgd2.jpg')}
        />

        <ScrollView style={{flex:1}}>
        <KeyboardAwareScrollView
              // extraScrollHeight={10}
              nestedScrollEnabled
              enableOnAndroid={true}
              style={s.subContainer}
              contentContainerStyle={s.subContentContainer}
              keyboardShouldPersistTaps={'always'}
              showsVerticalScrollIndicator={false}>
          <View
            style={{ backgroundColor: '#fff', borderRadius: 20 }}>
            {this.state.adver_arr.map((item, id, index) => {

              console.log(')))))200', item);
              return (
                <TouchableOpacity
                  activeOpacity={0.8}>
                  <View style={{ flexDirection: 'row', top: 12 }}>
                    <View style={{ width: '10%' }} />
                    <View style={{ width: '35%' }}>
                      <Text style={{ textAlign: 'left' }}>
                        { user.value ==1 ? item.addon_product_name[1] :  item.addon_product_name[0]}{' '}
                      </Text>
                    </View>

                    <View style={{ width: '35%', textAlign: 'right' }}>
                      <Text
                        style={{
                          textAlign: 'right',
                          marginLeft: '20%',
                          fontFamily: FontFamily.default,
                        }}>
                        {' $'}
                        {item.addon_product_price}
                      </Text>
                    </View>
                    <View style={{ width: '10%', padding: 0, top: -15 }}>

                      <CheckBox
                        // value={this.state.isChecked}
                        // onValueChange={setSelection}
                        checked={item && item.isChecked}
                        key={index}
                        onPress={() => this.onChangeCheck(item, index, id)}
                        style={s.checkbox}
                      />

                    </View>

                  </View>

                </TouchableOpacity>
              );
            })}
          
          </View>
         
          <View
            style={{
              height: 0.5,
              width: '89%',
              backgroundColor: Colors.black,
              alignSelf: 'center',
            }}
          />
          <View
            style={{
              height: 60,
              width: '89%',
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                marginLeft: 10,
                fontFamily: FontFamily.semi_bold,
                color: Colors.black,
                fontSize: 18,
              }}>
             {user.value == 1 ?  Lang_chg.extraHourtrip[1] : Lang_chg.extraHourtrip[0]}
            </Text>
            <Text
              style={{
                marginLeft: 10,
                fontFamily: FontFamily.semi_bold,
                color: Colors.black,
                fontSize: 18,
              }}>
              {' '}
              #
            </Text>
            <Input

              inputContainerStyle={{
                marginTop: 20,
                height: 40,
                width: 120,
                right: 0,
              }}
              inputStyle={{
                fontSize: 14,
                width: 100,
                fontFamily: FontFamily.default,
                color: Colors.black,
              }}
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
              keyboardType="numeric"
              maxLength={50}
              minLength={6}
              defaultValue={this.state.extraHours}
              // onChangeText={val => this.setState({couponCode: val})}
              onChangeText={txt => {
                this.setState({ extraHours: txt });
              }}
            />
          </View>
          <View
            style={{
              height: 60,
              width: '89%',
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                marginLeft: 10,
                fontFamily: FontFamily.semi_bold,
                color: Colors.black,
                fontSize: 18,
              }}>
              {user.value == 1  ? Lang_chg.txt_discount[1] : Lang_chg.txt_discount[0]}
            </Text>
            <Text
              style={{
                marginLeft: 10,
                fontFamily: FontFamily.semi_bold,
                color: Colors.black,
                fontSize: 18,

              }}>
              {' '}
              #
            </Text>
            <Input

              inputContainerStyle={{
                height: 40,
                width: 120,
                right: 0,
              }}
              inputStyle={{
                fontSize: 14,
                width: 100,
                fontFamily: FontFamily.default,
                color: Colors.black,
              }}
              defaultValue={this.state.couponCode}
              onChangeText={val => this.setState({ couponCode: val })}
            />
          </View>
          <View
            style={{
              height: 0.7,
              width: '89%',
              backgroundColor: Colors.black,
              alignSelf: 'center',

            }}
          />
          <View
          style={{
            alignContent: 'center',
            alignSelf: 'center',
            // position: 'absolute',
            // bottom: 40,
            width: '100%',
            alignItems: 'center',
            backgroundColor:'white'

          }}>
          <TouchableOpacity style={s.Btn2} onPress={() => this.ExtraRequest()}>
            <Text style={[s.Btn1Text, { color: Colors.orange, }]}>{user.value == 1  ? Lang_chg.Skip[1] : Lang_chg.Skip[0]}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.Btn1} onPress={() => this.ExtraRequest()}>
            <Text style={s.Btn1Text}>{user.value == 1  ? Lang_chg.Proceedtrip[1] : Lang_chg.Proceedtrip[0]}</Text>
          </TouchableOpacity>
        </View>
        <Text>{'\n'}</Text>
        <Text>{'\n'}</Text>
        </KeyboardAwareScrollView>
        </ScrollView>
      </View>

    );
  }
}

const s = StyleSheet.create({
  ImageBackground: {
    height: '100%',
    width: Sizes.width,
    backgroundColor: Colors.black,
  },
  ImageBackground_Img: {
    opacity: 0.5,
  },
  Logo: {
    height: 120,
    width: 120,
    borderRadius: 20,
    backgroundColor: Colors.orange,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
  },
  pickerIcon: {
    color: '#fff',
    position: 'absolute',
    bottom: 15,
    right: 10,
    fontSize: 20,
  },
  Btn1: {
    height: 48,
    width: '90%',
    backgroundColor: Colors.orange,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    elevation: 3,
    overflow: 'hidden',
    shadowColor: '#fff',
    shadowRadius: 10,
    shadowOpacity: 1,
  },
  Btn2: {
    height: 48,
    width: '90%',
    borderColor: Colors.orange,
    borderWidth: 0.7,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    elevation: 3,
    overflow: 'hidden',
    shadowColor: '#fff',
    shadowRadius: 10,
    shadowOpacity: 1,
  },
  Btn1Text: {
    fontSize: 18,
    fontFamily: FontFamily.semi_bold,
    color: Colors.white,
  },
  lang: {
    flexDirection: 'row',
    width: '85%',
    // padding:10,
    marginLeft: '79%',
  },
  condition: {
    flexDirection: 'row',
    width: '85%',
    // padding:10,
    //  marginLeft:'65%'
  },
  inputView: {
    flexDirection: 'row',
    alignSelf: 'center',
  },

  Logo1: {
    height: 120,
    width: 120,
    borderRadius: 20,
    backgroundColor: Colors.orange,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  Text1: {
    textAlign: 'center',
    //  justifyContent:"center",
    fontFamily: FontFamily.default,
    color: Colors.white,
    fontSize: 15,
    marginTop: 13,
  },
  Input1: {
    borderBottomColor: Colors.white,
    width: Sizes.width * 0.46,
    marginLeft: -5,
  },
  Input: {
    borderBottomColor: Colors.white,
    marginTop: -15,
  },
  checkbox: {
    color: Colors.orange,
    backgroundColor: Colors.orange,
    //padding:40
  },
  btn1: {
    height: 48,
    width: '95%',
    backgroundColor: Colors.orange,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginVertical: 10,
    elevation: 5,
    shadowColor: '#fff',
    shadowRadius: 10,
    shadowOpacity: 1,
  },
  btn1Text: {
    fontSize: 20,
    fontFamily: FontFamily.semi_bold,
    color: Colors.white,
  },
  subContainer: {
    // height: layout.size.height ,
    flex: 1,
    // backgroundColor:colors.secondry
  },
  subContentContainer: {
    paddingBottom: 12,
  },
});
