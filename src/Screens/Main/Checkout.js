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
  Alert,
} from 'react-native';
import { Icon, Input, Card, AirbnbRating } from 'react-native-elements';
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
import moment from 'moment';
import { CheckBox } from 'react-native-elements';
import Header2 from '../../Components/Header2';
import { UserContext } from './UserContext';

export default class Checkout extends Component {
  static contextType = UserContext

  constructor(props) {
    super(props);

    this.state = {
      adv: this.props.route.params.adver_arr,
      adver_arr: this.props.route.params.adv,
      data: this.props.route.params.data,
      totalPrice: Number(this.props.route.params.totalPrice) + Number(this.props.route.params.extra_rent_amt),
      webviewshow: false,
      booking_no: '',
      pay_amount: '',
      booking_id: '',
      createTime: '',
      food: [],
      isConnected: true,
      isSuccess: false,
      isfailure: false,
      selectedPaymentMethod: 0,
      paymentMethod: [
        {
          title: 'knet',
          image: require('../../../assets/icons/payment1.png'),
          checked: false
        },
        {
          title: 'credit',
          image: require('../../../assets/icons/payment2.png'),
          checked: false
        },
        {
          title: 'Bookeey',
          image: require('../../../assets/icons/payment3.png'),
          checked: false
        },
        {
          title: 'amex',
          image: require('../../../assets/icons/payment4.png'),
          checked: false
        }
      ]
    };
  }

  componentDidMount() {
    console.log(this.state.adv, 'hhhhhhhh');
    // alert(JSON.stringify(this.props.route.params.extra_rent_amt))
    console.log('props in html :>> ', this.props.route.params);

  }

  gotoBack = () => {
    this.setState({ webviewshow: false });
  };

  _onNavigationStateChange(webViewState) {
    webViewState.canGoBack = false;
    if (webViewState.loading == false) {
      console.log('webViewState', webViewState);
      console.log(webViewState.url);
      var t = webViewState.url.split('/').pop().split('?')[0];
      if (typeof t != null) {
        var p = webViewState.url.split('?').pop().split('&');
        console.log('file name', t);
        if (t == 'success.php') {
          // console.log('parameter', p);
          var txnId = 0;
          var merchantTxnId = 0;

          console.log('p.length', p.length);
          for (var i = 0; i < p.length; i++) {
            var val = p[i].split('=');
            console.log('val', val);
            if (val[0] == 'txnId') {
              txnId = val[1];
              // alert(txnId);
            } else if (val[0] == 'merchantTxnId') {
              merchantTxnId = val[1];
              // alert(merchantTxnId);
            }
          }
          this._submitForPayment(txnId, merchantTxnId, this.state.booking_id); // no need to comment just for iur convience
        } else if (t == 'failure.php') {
          msgProvider.toast(Lang_chg.payment_failed[config.language], 'center');
          this.setState({ webviewshow: false, isfailure: true });
          // this.props.navigation.navigate('Explore');
          return false;
        }
      }
    }
  }


  payment = () => {
    //  if(this.state.selectedPaymentMethod == 0){
    //   msgProvider.toast("Please select a payment method", 'bottom');
    //  }else{
    //   console.log(this.state.selectedPaymentMethod)
    //   return false;
    //  }
    let { selectedPaymentMethod } =
      this.state;
    if (selectedPaymentMethod == '0') {
      msgProvider.toast(Lang_chg.slectpaymentmethod[config.language], 'center');
      return false;
    }
    console.log('paymentmethod :>> ', this.state.selectedPaymentMethod);
    let url = config.baseURL + 'booking_add.php';

    console.log('this.state.data', url);
    var form_data = new FormData();

    for (var key in this.state.data) {
      if (this.state.data[key] != null) {
        form_data.append(key, this.state.data[key]);
      }
    }
    // form_data.append('food_ent_eqip' , this.state.adv)
    form_data.append('extraHours', this.props.route.params.extraHours)
    form_data.append('extra_rent_amt', this.props.route.params.extra_rent_amt)
    form_data.append('rent_amount', this.state.totalPrice) //aa
    console.log('Form data', form_data);

    // return;
    apifuntion
      .postApi(url, form_data)
      .then(obj => {
        console.log(obj, 'obj in heckout ....')
        this.setState({ loading: false });
        return obj.json();
      })
      .then(obj => {
        console.log(obj);

        if (obj.success == 'true') {
          this.setState({
            booking_no: obj.booking_no,
            pay_amount: obj.pay_amount,
            booking_id: obj.booking_id,
            webviewshow: true,
          });
          // this.props.navigation.navigate('ExtraRequest', {
          //   adver_arr: this.state.adver_arr.addon_arr,
          //   adv: this.state.adver_arr,
          //   paymentDetail: {
          //     booking_no: obj.booking_no,
          //     pay_amount: obj.pay_amount,
          //     booking_id: obj.booking_id,
          //   },
          // });
          //    this.props.navigation.navigate('RequestPayment',{'user_id_post':this.state.user.user_id_post,'adver_arr':this.state.adver_arr})
        } else {
          alert(obj.msg[config.language])
          // msgProvider.toast(obj.msg[config.language], 'center');
        }
      })
      .catch(error => {
        console.log('-------- error ------- ' + error);
        this.setState({ loading: false });
      });
  };

  _submitForPayment = async (txnId, merchantTxnId, booking_id) => {
    this.setState({ webviewshow: false });
    // let result = await localStorage.getItemObject('user_arr')
    // let user_id_post = 0;
    // if (result != null) {
    //   user_id_post = result.user_id;
    // }
    if (this.state.isConnected === true) {
      var data = new FormData();
      data.append('user_id_post', this.state.data.user_id_post);
      data.append('txnId', txnId);
      data.append('merchantTxnId', merchantTxnId);
      data.append('booking_id', booking_id);
      let url = config.baseURL + 'booking_add_pay.php';
      console.log(url, "*****", data);
      this.setState({ loading: true });
      apifuntion
        .postApi(url, data)
        .then(obj => {
          this.setState({ loading: false });
          console.log("obj****", data);

          return obj.json();
        })
        .then(obj => {
          console.log("%%%%%%%%", obj);
          //  alert(JSON.stringify(obj))
          if (obj.success == 'true') {
            this.setState({
              booking_id: obj.booking_no,
              createTime: obj.createtime,
              isSuccess: true
            })
          }
        })
        .catch(error => {
          console.log('-------- error ------- ' + error);
          this.setState({ loading: false });
        });
    } else {
      msgProvider.alert(
        msgTitle.internet[config.language],
        msgText.networkconnection[config.language],
        false,
      );
    }
  };

  _submitWidthDrowReq = async (
    txnId,
    noti,
    booking_no,
    booking_date1,
    email_arr,
  ) => {
    console.log("############", txnId,
      noti,
      booking_no,
      booking_date1,
      email_arr);
    this.setState({ webviewshow: false });
    if (this.state.isConnected === true) {
      var data = new FormData();
      data.append('other_user_id', this.state.adver_arr.user_id);
      data.append('txnId', txnId);
      let url = config.baseURL + 'withdraw_request.php';
      console.log("OBBBBBBBBBBBBBBBBBBUUUUURRL", url);
      this.setState({ loading: true });
      apifuntion
        .postApi(url, data)
        .then(obj => {
          console.log("OBBBBBBBBBBBBBBBBBB----", obj);
          this.setState({ loading: false });
          return obj.json();
        })
        .then(obj => {
          console.log("OBBBBBBBBBBBBBBBBBB", obj);
          //  alert(JSON.stringify(obj))
          if (obj.success == 'true') {
            if (noti != 'NA') {
              //notification.oneSignalNotificationSendCall(noti)
              //notification.createNotif(noti)
            }
            if (email_arr != 'NA') {
              this.mailsendfunction(email_arr);
            }
            this.setState({ loading: false });
            this.props.navigation.navigate('Success_booking', {
              booking_no: booking_no,
              booking_date: booking_date1,
            });
            return false;
          } else {
            if (obj.account_active_status == 'deactivate') {
              config.checkUserDeactivate(this.props.navigation);
              return false;
            }
            msgProvider.alert(
              msgTitle.information[config.language],
              obj.msg[config.language],
              false,
            );
            return false;
          }
        })
      // .catch(error => {
      //   console.log('-------- error ------- ' + error);
      //   this.setState({loading: false});
      // });
    } else {
      msgProvider.alert(
        msgTitle.internet[config.language],
        msgText.networkconnection[config.language],
        false,
      );
    }
  };

  mailsendfunction = email_arr => {
    console.log('email_arr', email_arr);
    if (email_arr != 'NA') {
      for (let i = 0; i < email_arr.length; i++) {
        var email = email_arr[i].email;
        var mailcontent = email_arr[i].mailcontent;
        var mailsubject = email_arr[i].mailsubject;
        var fromName = email_arr[i].fromName;
        var url = config.baseURL + 'mailFunctionsSend.php';
        var data = new FormData();
        data.append('email', email);
        data.append('mailcontent', mailcontent);
        data.append('mailsubject', mailsubject);
        data.append('fromName', fromName);
        data.append('mail_file', 'NA');
        console.log('forget==', data);

        // api calling start==============================
        apifuntion
          .postApi(url, data)
          .then(obj => {
            return obj.json();
          })
          .then(obj => {
            //  alert(JSON.stringify(obj))
            if (obj.success == 'true') {
              console.log('Mail send');
            } else {
              console.log('not send mail');
            }
            // api calling end==============================
          });
      }
    }
  };


  renderSuccessModal = () => {
    const user = this.context
    console.log('context in home', user);
    return (
      <Modal
        transparent={true}
        visible
      >
        <View
          // onPress={() => this.hideDatePicker()}
          activeOpacity={1}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              height: 270,
              width: '90%',
              backgroundColor: Colors.white,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Image style={{ height: 55, width: 55 }} source={require('../../../assets/icons/success.png')} resizeMode='contain' />
            <Text style={{ fontSize: 15, fontFamily: FontFamily.semi_bold, color: Colors.black, lineHeight: 40 }}>{user.value == 1 ? Lang_chg.text_SUCCESS[1] : Lang_chg.text_SUCCESS[0]}</Text>
            <Text style={{ fontSize: 14, fontFamily: FontFamily.default, color: Colors.black, lineHeight: 20 }}>{user.value == 1 ? Lang_chg.text_seccess_msg[1] : Lang_chg.text_seccess_msg[0]}</Text>
            <Text style={{ fontSize: 14, fontFamily: FontFamily.default, color: Colors.black, lineHeight: 30 }}>Booking ID :- #{this.state.booking_id}</Text>
            <Text style={{ fontSize: 14, fontFamily: FontFamily.default, color: Colors.black, lineHeight: 30 }}>{moment(this.state.createTime).format('DD-MM-YYYY, hh:mmA')}</Text>
            <TouchableOpacity style={[s.Btn1, { width: '90%' }]} onPress={() => {
              this.setState({ isSuccess: false })
              this.props.navigation.navigate('Trip')
            }}>
              <Text style={[s.Btn1Text]}>{user.value == 1 ? Lang_chg.text_Countibue[1] : Lang_chg.text_Countibue[0]}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  renderFailureModal = () => {
    const user = this.context
    console.log('context in home', user);
    return (
      <Modal
        transparent={true}
        visible
      >
        <View
          // onPress={() => this.hideDatePicker()}
          activeOpacity={1}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              height: 270,
              width: '90%',
              backgroundColor: Colors.white,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Image style={{ height: 55, width: 55 }} source={require('../../../assets/icons/Failure.png')} resizeMode='contain' />
            <Text style={{ fontSize: 15, fontFamily: FontFamily.semi_bold, color: Colors.black, lineHeight: 40 }}>{user.value == 1 ? Lang_chg.txt_Failure[1] : Lang_chg.txt_Failure[0]}</Text>
            <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: FontFamily.default, color: Colors.black, lineHeight: 20 }}>{user.value == 1 ? Lang_chg.text_failure_msg[1] : Lang_chg.text_failure_msg[0]}</Text>
            <Text style={{ fontSize: 14, fontFamily: FontFamily.default, color: Colors.black, lineHeight: 30 }}>Booking ID :- #{this.state.booking_id}</Text>
            {/* <Text style={{ fontSize: 14, fontFamily: FontFamily.default, color: Colors.black, lineHeight: 30 }}>{moment(this.state.createTime).format('DD-MM-YYYY, hh:mmA')}</Text> */}
            <TouchableOpacity style={[s.Btn1, { width: '90%' }]} onPress={() => {
              this.setState({ isfailure: false })
              this.props.navigation.navigate('Home')
            }}>
              <Text style={[s.Btn1Text]}>{user.value == 1 ? Lang_chg.text_Countibue[1] : Lang_chg.text_Countibue[0]}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  render() {
    console.log('this.state. :>> ', this.state.selectedPaymentMethod);
    const user = this.context
    console.log('context in home', user);
    return (
      <View style={{ backgroundColor: '#fff', height: '100%' }}>
        <Header
          imgBack={true}
          notiBtn={false}
          backBtn
          searchBtn={false}
          name={user.value == 1 ? Lang_chg.text_checkout[1] : Lang_chg.text_checkout[0]}
          headerHeight={120}
          backImgSource={require('../../Images/back1.jpg')}
        />

        <View
          style={{
            flex: 1,
            marginTop: -20,
            backgroundColor: '#fff',
            borderRadius: 20,
            marginBottom: 60
          }}>
          <ScrollView>

            <Text
              style={{
                marginTop: 15,
                marginLeft: '5%',
                fontSize: 18,
                fontFamily: FontFamily.semi_bold,
              }}>
{user.value == 1 ? Lang_chg.text_booking_details[1] : Lang_chg.text_booking_details[0]}
            </Text>

            <Text />
            <View style={{ Flex: 1 }}>
              <View style={s.container}>
                <View style={s.item}>
                  <Text style={s.text1}> {user.value == 1 ? Lang_chg.Customername[1] : Lang_chg.Customername[0]}</Text>
                </View>

                <View style={s.item}>
                  <Text style={[s.text1, { fontFamily: FontFamily.default }]}>
                    {this.props.route.params.adv.user_name}
                  </Text>
                </View>
              </View>

              <View style={s.container}>
                <View style={s.item}>
                  <Text style={s.text1}>{user.value == 1 ? Lang_chg.Bookdatetrip[1] : Lang_chg.Bookdatetrip[0]}</Text>
                </View>

                <View style={s.item}>
                  <Text style={[s.text1, { fontFamily: FontFamily.default }]}>
                    {this.state.data?.date}{' '}
                  </Text>
                </View>
              </View>

              <View style={s.container}>
                <View style={s.item}>
                  <Text style={[s.text1]}> {user.value == 1 ? Lang_chg.TripTimetrip[1] : Lang_chg.TripTimetrip[0]}</Text>
                </View>

                <View style={s.item}>
                  <Text style={[s.text1, { fontFamily: FontFamily.default }]}>
                    {this.state.data?.time}{' '}
                  </Text>
                </View>
              </View>

              <View style={s.container}>
                <View style={s.item}>
                  <Text style={[s.text1]}>{user.value == 1 ? Lang_chg.noogguesttriptour[1] : Lang_chg.noogguesttriptour[0]}</Text>
                </View>

                <View style={s.item}>
                  <Text style={[s.text1, { fontFamily: FontFamily.default }]}>
                    {this.props.route.params.data.no_of_guest}{' '}
                  </Text>
                </View>
              </View>

              <View style={s.container}>
                <View style={s.item}>
                  <Text style={[s.text1]}>{user.value == 1 ? Lang_chg.triphourcheckout[1] : Lang_chg.triphourcheckout[0]}</Text>
                </View>

                <View style={s.item}>
                  <Text style={[s.text1, { fontFamily: FontFamily.default }]}>
                    {this.state.adver_arr.minimum_hours}{' '}
                  </Text>
                </View>
              </View>
              <View style={s.container}>
                <View style={s.item}>
                  <Text style={[s.text1]}> {user.value == 1 ? Lang_chg.extrahourcheckout[1] : Lang_chg.extrahourcheckout[0]}</Text>
                </View>

                <View style={s.item}>
                  <Text style={[s.text1, { fontFamily: FontFamily.default }]}>
                    {this.props.route.params.extraHours ? this.props.route.params.extraHours : '0'}

                  </Text>
                </View>
              </View>

              <View style={s.container2}>
                <View style={s.item}>
                  <Text style={[s.text1]}>{user.value == 1 ? Lang_chg.equpmenttrip[1] : Lang_chg.equpmenttrip[0]}</Text>
                </View>

                <View style={{
                  width: 200,
                  height: 18,
                  flexDirection: 'row',
                  alignItems: 'flex-start'
                }}>
                  {this.state.adv && this.state.adv!= 'NA' && this.state.adv.length > 0 && this.state.adv.map((item) => {
                    return (
                      <View style={{}}>
                        <Text style={[{ fontFamily: FontFamily.default, fontSize: 12 }]}>
                          {item.add_On_name == "Equipment " &&
                            item.isChecked == true ?
                            `${item.addon_product_name[0]},` :
                            null}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>

              <View style={s.container2}>
                <View style={s.item}>
                  <Text style={[s.text1]}>{user.value == 1 ? Lang_chg.entertainmenttrip[1] : Lang_chg.entertainmenttrip[0]}</Text>
                </View>
                <View style={{
                  width: 200,
                  height: 18,
                  flexDirection: 'row',
                }}>
                  {this.state.adv && this.state.adv!= 'NA'&& this.state.adv.length > 0 && this.state.adv.map((item) => {
                    return (
                      <View style={{}}>
                        <Text style={[{ fontFamily: FontFamily.default, fontSize: 12 }]}>
                          {item.add_On_name == "entertainment" &&
                            item.isChecked == true ?
                            `${item.addon_product_name[0]},` :
                            null}
                        </Text>
                      </View>
                    );
                  })}
                </View>

              </View>
              <View style={s.container2}>
                <View style={s.item}>
                  <Text style={[s.text1]}>{user.value == 1 ? Lang_chg.foodtrip[1] : Lang_chg.foodtrip[0]}</Text>
                </View>

                <View style={{
                  width: 200,
                  height: 18,
                  flexDirection: 'row',
                  // justifyContent:'space-around',
                  alignItems: 'flex-start'
                }}>
                  {this.state.adv && this.state.adv!= 'NA' &&  this.state.adv.length > 0 && this.state.adv.map((item) => {
                    return (
                      <View style={{}}>
                        <Text style={[{ fontFamily: FontFamily.default, fontSize: 12 }]}>
                          {item.add_On_name == "Food" &&
                            item.isChecked == true ?
                            `${item.addon_product_name[0]},` :
                            null}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>

              <View style={s.container}>
                <View style={s.item}>
                  <Text style={[s.text1]}> {user.value == 1 ? Lang_chg.Boatplacetrip[1] : Lang_chg.Boatplacetrip[0]}</Text>
                </View>

                <View style={s.item}>
                  <Text style={[s.text1, { fontFamily: FontFamily.default }]}>
                    { user.value == 1 ?  this.state.adver_arr.city_name[1] : this.state.adver_arr.city_name[0]}{' '}
                  </Text>
                </View>
              </View>

              <View style={s.container}>
                <View style={s.item}>
                  <Text style={[s.text1]}> {user.value == 1 ? Lang_chg.tripdestinationcheckout[1] : Lang_chg.tripdestinationcheckout[0]}</Text>
                </View>

                <View style={s.item}>
                  <Text numberOfLines={2} ellipsizeMode='tail'  style={[s.text1, {bottom:6, height:30 , fontFamily: FontFamily.default   }]}>
                    {this.state.adver_arr.location_address}{' '}
                  </Text>
                </View>
              </View>

              <View style={s.container}>
                <View style={s.item}>
                  <Text style={[s.text1]}> {user.value == 1 ? Lang_chg.triptypetrip[1] : Lang_chg.triptypetrip[0]}</Text>
                </View>

                <View style={s.item}>
                  <Text style={[s.text1, { fontFamily: FontFamily.default }]}>
                    { user.value==1 ? this.state.adver_arr.trip_type_name[1] : this.state.adver_arr.trip_type_name[0]}{' '}
                  </Text>
                </View>
              </View>
              <View style={s.container}>
                <View style={s.item}>
                  <Text style={[s.text1]}> {user.value == 1 ? Lang_chg.discount_per_txt[1] : Lang_chg.discount_per_txt[0]}</Text>
                </View>

                <View style={s.item}>
                  <Text style={[s.text1, { fontFamily: FontFamily.default }]}>
                    {this.state.adver_arr?.discount}{' '}
                  </Text>
                </View>
              </View>
              <View style={s.container}>
                <View style={s.item}>
                  <Text style={[s.text1]}> {user.value == 1 ? Lang_chg.coupendiscountcheckout[0] : Lang_chg.coupendiscountcheckout[0]}</Text>
                </View>

                <View style={s.item}>
                  <Text style={[s.text1, { fontFamily: FontFamily.default }]}>
                    {this.state.data?.coupon_discount}{' '}
                  </Text>
                </View>
              </View>

              <View style={s.container}>
                <View style={s.item}>
                  <Text style={[s.text1]}> {user.value == 1 ? Lang_chg.toatalpricecheckout[0] : Lang_chg.toatalpricecheckout[0]}</Text>
                </View>

                <View style={s.item}>
                  <Text style={[s.text1, { fontFamily: FontFamily.default }]}>
                    {this.state.data?.rent_amount}{' '}
                  </Text>
                </View>
              </View>

              {/* <View style={s.container}>
              <View style={s.item}>
                <Text style={[s.text1]}> {user.value == 1 ? Lang_chg.extrarequesttrip[0] : Lang_chg.extrarequesttrip[0]}</Text>
              </View>

              <View style={s.item}>
                <Text style={[s.text1, { fontFamily: FontFamily.default }]}>
                  {this.state.adver_arr.location_address}{' '}
                </Text>
              </View>
            </View>

            <View style={s.container}>
              <View style={s.item}>
                <Text style={[s.text1]}> {user.value == 1 ? Lang_chg.advertismenttypecheckout[0] : Lang_chg.advertismenttypecheckout[0]}</Text>
              </View>

              <View style={s.item}>
                <Text style={[s.text1, { fontFamily: FontFamily.default }]}>
                  {this.props.route.params.adv.trip_type_name[0]}

                </Text>
              </View>
            </View> */}
            </View>

            <View style={{ top: 5, height: 0.5, backgroundColor: 'lightgrey' }}></View>
            <View style={{ flex: 1, marginTop: 20, marginBottom: 40 }}>
              <Text
                style={{
                  lineHeight: 27,
                  marginLeft: '3%',
                  fontSize: 18,
                  fontFamily: FontFamily.semi_bold,
                }}>
                {' '}
                {user.value == 1 ? Lang_chg.payment_method_txt[1] :Lang_chg.payment_method_txt[0]}
              </Text>
              {this.state.paymentMethod.map(opt => (
                <View key={opt.title} style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                  <CheckBox
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checkedColor={Colors.orange}
                    checked={opt.title == this.state.selectedPaymentMethod ? true : false}
                    key={opt.title}
                    style={s.checkbox}

                    onPress={(value) => {
                      opt.checked = !opt.checked;
                      this.setState({
                        selectedPaymentMethod: opt.title,
                        paymentMethod: [
                          ...this.state.paymentMethod
                        ]
                      })
                    }}
                  />

                  <Image
                    source={opt.image}
                    style={s.paymnetImage}
                    resizeMode='contain'
                  />
                  <Text style={s.paymentText}> {opt.title}</Text>

                </View>
              ))}

            </View>
          </ScrollView>
        </View>


        <View
          style={{
            // position: 'absolute',
            bottom: 25,
            height: 60,
            // width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            borderTopColor: Colors.orange,
            borderTopWidth: 2,
            justifyContent: 'space-evenly',
          }}>
          <TouchableOpacity style={s.Btn1} onPress={() => this.payment()}>
            <Text style={s.Btn1Text}>{user.value == 1 ? Lang_chg.text_checkout[1] : Lang_chg.text_checkout[0]}</Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              fontFamily: FontFamily.semi_bold,
              marginLeft: 30,
            }}>
            KD {this.state.totalPrice}
          </Text>
        </View>

        <Modal
          animationType="slide"
          transparent
          visible={this.state.webviewshow}
          onRequestClose={() => {
            this.setState({ webviewshow: false });
          }}>
          {/* <SafeAreaView style={{ flex: 0, backgroundColor: color1.white_color }} />
          <StatusBar barStyle='default' hidden={false} backgroundColor={color1.white_color} translucent={true}
            networkActivityIndicatorVisible={true} /> */}
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
              paddingLeft: 20,
              paddingRight: 20,
            }}>
            <TouchableOpacity

              style={{
                // marginBottom: -50,
                alignItems: 'flex-start',
                marginTop: 35,
                height: 50,
                // marginLeft: 50,
                marginRight: 20,
                // backgroundColor: Colors.gray,
                borderRadius: 25

              }}>
              <Icon
                onPress={() => this.gotoBack()}
                name="x-circle"
                type="feather"
                size={26}
                color={Colors.orange}
              />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor: '#ffffff',
                paddingBottom: 10,
                paddingTop: 10,
              }}
            />
            {this.state.webviewshow == true && (
              <WebView
                source={{
                  uri:
                    'https://myboatonline.com/app/webservice/paymentgateway/bookeey_library/buy.php?selectedPaymentOption=' +
                    this.state.selectedPaymentMethod
                    + '&amt=' +
                    this.state.pay_amount +
                    '&oid=' +
                    this.state.booking_no +
                    '&other_user_id=' +
                    this.state.adver_arr.user_id +
                    '&user_id=' +
                    this.state.data.user_id_post +
                    '&booking_id=' +
                    this.state.booking_id,
                }}
                onNavigationStateChange={this._onNavigationStateChange.bind(
                  this,
                )}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                // injectedJavaScript = {this.state.cookie}
                startInLoadingState={false}
                containerStyle={{ marginTop: 20, flex: 1 }}
                // injectedJavaScript={runFirst}
                // androidHardwareAccelerationDisabled={true}
                // allowUniversalAccessFromFileURLs={true}
                // allowingReadAccessToURL={true}
                // keyboardDisplayRequiresUserAction={false}
                // allowFileAccess={true}
                textZoom={100}
              // onMessage={this.onMessage}
              // onNavigationStateChange={(navEvent)=> console.log(navEvent.jsEvaluationValue)}
              // onMessage={(event)=> console.log(event.nativeEvent.data)}
              />
            )}
          </View>
        </Modal>
        {this.state.isSuccess && this.renderSuccessModal()}
        {this.state.isfailure && this.renderFailureModal()}

      </View>
    );
  }
}

const s = StyleSheet.create({
  SEC2: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopEndRadius: 30,
    marginTop: -40,
    //   marginBottom:40,
    flex: 1,
  },
  text1: {
    fontSize: 12,
    fontFamily: FontFamily.semi_bold,
    left: 1,
  },
  borders: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    margin: 20,
    marginTop: 1,
    //borderColor:'#000',
    //borderWidth:1
  },
  tool: {
    // width:'70%',
    // height:'70%',
    marginTop: 5,
  },
  top_margin: {
    marginTop: 15,
    padding: 0,
    marginLeft: '10%',
    flexWrap: 'wrap',
    flexDirection: 'row', // set elements horizontally, try column.
  },
  tool1: {
    width: '80%',
    height: '80%',
    marginTop: 3,
  },
  rent: {
    color: '#fff',
    fontSize: 16,
    alignSelf: 'flex-end',
  },
  Btn1: {
    height: 48,
    width: '60%',
    backgroundColor: Colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    elevation: 3,
    overflow: 'hidden',
    shadowColor: Colors.orange,
    shadowRadius: 10,
    shadowOpacity: 1,
  },
  Btn1Text: {
    fontSize: 20,
    fontFamily: FontFamily.semi_bold,
    color: Colors.white,
  },

  categery: {
    backgroundColor: '#F3F9F9',
    width: '84%',
    height: '20%',
    marginTop: '10%',
    padding: 0,
    margin: '7%',
  },
  container: {
    // marginLeft: '2%',
    margin: 5,
    height: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // flexWrap: 'wrap',
    // alignItems: 'flex-start',
    // backgroundColor:'red'
    // if you want to fill rows left to right
  },
  container2: {
    marginLeft: '5%',
    margin: 5,
    height: 25,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
    // if you want to fill rows left to right
  },
  item: {
    width: '45%',
    alignItems: "flex-start",// is 50% of container width
    // backgroundColor:'red'
  },
  disc: {
    marginLeft: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'justify',
  },
  detail: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'justify',
  },
  container1: {
    // flex: 1,
    marginTop: -15,
    padding: 0,
    marginLeft: '10%',
    flexWrap: 'wrap',
    flexDirection: 'row', // set elements horizontally, try column.
  },
  btn1: {
    height: 90,
    width: 60,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    elevation: 5,
    margin: 7,
  },
  btn1Text: {
    fontSize: 10,
    fontFamily: FontFamily.semi_bold,
  },
  btn_1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  Card: {
    borderRadius: 20,
    elevation: 3,
    marginHorizontal: 10,
    marginTop: 0,
    marginBottom: 15,
  },
  name: {
    fontFamily: FontFamily.semi_bold,
    fontSize: 16,
    marginBottom: 3,
  },
  type: {
    fontFamily: FontFamily.default,
    fontSize: 12,
    marginBottom: 3,
    //   opacity:0.5
    color: Colors.gray1,
  },
  id: {
    fontFamily: FontFamily.semi_bold,
    fontSize: 13,
    marginBottom: 3,
  },
  price: {
    marginBottom: 10,
    fontFamily: FontFamily.semi_bold,
    fontSize: 15,
    color: Colors.price,
    textAlign: 'right',
  },
  status: {
    color: Colors.orange,
    fontFamily: FontFamily.default,
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'right',
  },
  ImageBackground: {
    height: 215,
    width: '100%',
    borderRadius: 15,
    alignSelf: 'center',
    // marginHorizontal:10,
    elevation: 0,
  },
  imgStyle: {
    borderRadius: 15,
    height: 215,
    width: '100%',
    alignSelf: 'center',
  },
  SEC3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: '8%',
    backgroundColor: '#F3F9F9',
    margin: '5%',
  },
  title: {
    fontFamily: FontFamily.semi_bold,
    fontSize: 18,
    color: Colors.orange,
    // lineHeight:20
  },
  type: {
    fontFamily: FontFamily.default,
    fontSize: 15,
    lineHeight: 20,
    color: Colors.black1,
  },
  no: {
    fontFamily: FontFamily.default,
    fontSize: 12,
    lineHeight: 20,
    color: Colors.black1,
  },
  dis: {
    fontFamily: FontFamily.default,
    fontSize: 13,
    color: Colors.black1,
  },
  place: {
    fontFamily: FontFamily.default,
    fontSize: 16,
    color: Colors.orange,
  },
  trapezoid_discount: {
    width: 115,
    height: 0,
    borderBottomWidth: 25,
    borderBottomColor: Colors.orange,
    borderLeftWidth: 25,
    borderLeftColor: 'transparent',
    borderRightWidth: 25,
    borderRightColor: 'transparent',
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    alignItems: 'center',
    transform: [{ rotate: '-45deg' }],
    marginTop: 19.2,
    marginLeft: -26,
  },
  paymnetImage: {
    width: 50,
    height: 50
  },
  paymentText: {
    fontSize: 14,
    justifyContent: 'center',
    textAlignVertical: 'center',
    top: 20,
    fontFamily: FontFamily.semi_bold
  },
  checkbox: {
    color: '#fff',
    backgroundColor: '#fff',
    //padding:40
  },
});
