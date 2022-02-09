import React, {Component, useState} from 'react';
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
  Dimensions
} from 'react-native';
import {Icon, Input, Card, AirbnbRating} from 'react-native-elements';
import Header from '../../Components/Header';
import {
  back_img3,
  boat_img1,
  Colors,
  FontFamily,
  Sizes,
} from '../../Constants/Constants';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {apifuntion} from '../../Provider/apiProvider';
import {config} from '../../Provider/configProvider';
import {Calendar} from 'react-native-calendars';
import {Lang_chg} from '../../Provider/Language_provider';
import {WebView} from 'react-native-webview';
import {msgProvider, msgTitle, msgText} from '../../Provider/messageProvider';
import moment from 'moment';
import Timeslots from '../../Data/Timeslots';
const {height} = Dimensions.get('window');
export default class RequestPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id_post: this.props.route.params.user_id_post,
      adver_arr: this.props.route.params.adver_arr,
      advertisement: this.props.route.params.advertisement,
      // booking_arr: this.props.route.params.booking_arr,
      webviewshow: false,
      TimeSlot: Timeslots,
      time: '',
      getdate: '',
      date: '',
      pay_amount: '',
      booking_no: '',
      mode: 'time',
      isConnected: true,
      calender_arr: {},
      test_arr: {},
      isShowDatePicker: false,
      guest: '',
      hour: '',
      selected_date: '',
      booking_id: '',
      unavailabe_arr: 'NA',
      bookingDateTimeStart: '',
      bookingDateTimeEnd: '',
      selectedIndex: null,
      hoursData: [
        {hours: 1, status: false},
        {hours: 2, status: false},
        {hours: 3, status: false},
        {hours: 4, status: false},
        {hours: 5, status: false},
        {hours: 6, status: false},
        {hours: 7, status: false},
        {hours: 8, status: false},
        {hours: 9, status: false},
        {hours: 10, status: false},
        {hours: 11, status: false},
        {hours: 12, status: false},
        {hours: 13, status: false},
        {hours: 14, status: false},
        {hours: 15, status: false},
        {hours: 16, status: false},
        {hours: 17, status: false},
        {hours: 18, status: false},
        {hours: 19, status: false},
        {hours: 20, status: false},
        {hours: 21, status: false},
        {hours: 22, status: false},
        {hours: 23, status: false},
        {hours: 24, status: false},
      ],
    };
  }

  componentDidMount() {
    let date = new Date('2020-06-12T14:42:42');

    console.log('date ', date);

    this.setState({getdate: date});

    console.log('adv_arr', this.state.booking_arr);

    // let markedDay = {};
    // this.state.booking_arr.map(item => {
    //   this.state.calender_arr[item.date] = {
    //     selected: true,
    //     marked: true,
    //     selectedColor: 'purple',
    //   };
    // });

    console.log('markdate2', this.state.test_arr);
  }

  showDatePicker = () => {
    this.setState({
      isShowDatePicker: true,
    });
  };

  hideDatePicker = () => {
    this.setState({
      isShowDatePicker: false,
    });
  };

  handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    this.setState({
      time: moment(date).format('HH:mm'),
    });
    this.hideDatePicker();
  };

  Payment() {
   
      console.log('*******', this.state.adver_arr);
    Keyboard.dismiss();
    let {selected_date, guest, time} = this.state;

    if (selected_date.length <= 0) {
      msgProvider.toast(Lang_chg.select_date[config.language], 'center');
      return false;
    }
    if (!time) {
      msgProvider.toast(Lang_chg.text_select_time[config.language], 'center');
      return false;
    }

    if (!guest) {
      msgProvider.toast(Lang_chg.no_of_guest_e[config.language], 'center');
      return false;
    }

    var data = new FormData();
    data.append('user_id_post', this.state.user_id_post.user_id);
    data.append('advertisement_id', this.state.advertisement.advertisement_id);
    data.append('boat_id', this.state.adver_arr.boat_id);
    data.append('no_of_guest', this.state.guest);
    data.append('date', this.state.selected_date);
    data.append('time', this.state.time);
    data.append('idle_time', this.state.adver_arr.idle_time);
    data.append('rent_amount', this.state.advertisement?.price);
    data.append('minimum_hours', this.state.adver_arr.minimum_hours);
    data.append('discount', this.state.adver_arr.discount);
    data.append(
      'extra_rent_amt',
      this.state.hour &&
        Number(this.state.hour) * Number(this.state.adver_arr.extra_price),
    );
    data.append('payment_type', 1);
    data.append('other_user_id', this.state.adver_arr.user_id);
    data.append('coupon_code', '');
    this.props.navigation.navigate('ExtraRequest', {
      adver_arr: this.state.adver_arr.addon_arr,
      adv: this.state.adver_arr,
      data:{
        'user_id_post': this.state.user_id_post.user_id,
        'advertisement_id': this.state.advertisement.advertisement_id,
        'boat_id': this.state.adver_arr.boat_id,
        'no_of_guest': this.state.guest,
        'date': this.state.selected_date,
        'time': this.state.time,
        'idle_time': this.state.adver_arr.idle_time,
        'rent_amount': this.state.advertisement?.price,
        'minimum_hours': this.state.adver_arr.minimum_hours,
        'discount': this.state.adver_arr.discount,
        'extra_rent_amt':this.state.hour && Number(this.state.hour) * Number(this.state.adver_arr.extra_price),
        'payment_type': 1,
        'other_user_id': this.state.adver_arr.user_id,
        'coupon_code': this.state.adver_arr.coupon_code,
        'coupon_discount': this.state.adver_arr.coupon_discount,
        'extraHours':this.state.hour,
      }
      // paymentDetail: {
      //   booking_no: obj.booking_no,
      //   pay_amount: obj.pay_amount,
      //   booking_id: obj.booking_id,
      // },
    });
    console.log('_____________', data);
    return;

    this.setState({loading: true});
    let url = config.baseURL + 'booking_add.php';
    apifuntion
      .postApi(url, data)
      .then(obj => {
        // console.log(obj)
        this.setState({loading: false});
        return obj.json();
      })
      .then(obj => {
        console.log(obj);

        if (obj.success == 'true') {
          this.setState({
            booking_no: obj.booking_no,
            pay_amount: obj.pay_amount,
            booking_id: obj.booking_id,
            // webviewshow: true,
          });
          this.props.navigation.navigate('ExtraRequest', {
            adver_arr: this.state.adver_arr.addon_arr,
            adv: this.state.adver_arr,
            paymentDetail: {
              booking_no: obj.booking_no,
              pay_amount: obj.pay_amount,
              booking_id: obj.booking_id,
            },
          });
          //    this.props.navigation.navigate('RequestPayment',{'user_id_post':this.state.user.user_id_post,'adver_arr':this.state.adver_arr})
        } else {
          msgProvider.toast(obj.msg[config.language], 'center');
        }
      })
      .catch(error => {
        console.log('-------- error ------- ' + error);
        this.setState({loading: false});
      });
  }

  setBookingTime = async time => {
    let idle_hours = this.state.adver_arr.idle_time;
    let extra_hours = this.state.extra_time;
    let tot_hours = parseInt(idle_hours) + parseInt(extra_hours);
    if (this.state.date != '') {
      let date = this.state.date + ' ' + time + ':00';
      let datexy = this.state.date + ' ' + time;
      var date1 = new Date();
      date1.setTime(date1.getTime() + 1 * 3600000);
      let formate_date = date1;
      this.setState({
        bookingDateTimeStart: datexy,
        bookingDateTimeEnd: formate_date,
      });
    }
  };

  _selectDate = async date => {
    console.log('date ', date);

    this.setState({selected_date: date});
    if (this.state.unavailabe_arr != 'NA') {
      var i = this.state.unavailabe_arr.findIndex(x => x.date == date);
      if (i >= 0) {
        msgProvider.toast(Lang_chg.owner_not_avail[config.language], 'center');
        return false;
      } else {
        delete this.state.calender_arr[this.state.date];
        this.state.calender_arr[date] = {
          selected: true,
          selectedColor: "#0A8481",
        };
        this.setState({
          date: date,
          calender_arr: {...this.state.calender_arr, date: date},
        });
        console.log(this.state.calender_arr);

        let idle_hours = this.state.adver_arr.idle_time;
        let extra_hours = this.state.extra_time;
        let tot_hours = parseInt(idle_hours) + parseInt(extra_hours);
        if (this.state.time != '') {
          let date1 = date + ' ' + this.state.time + ':00';
          let date1xy = date + ' ' + this.state.time;
          var date12 = new Date(...this.getParsedDate(date1));
          date12.setTime(date12.getTime() + tot_hours * 3600000);
          let formate_date = await this.getFormatedDate(date12);
          this.setState({
            bookingDateTimeStart: date1xy,
            bookingDateTimeEnd: formate_date,
          });
        }
      }
    } else {
      delete this.state.calender_arr[this.state.date];
      this.state.calender_arr[date] = {selected: true, selectedColor: "#0A8481"};
      this.setState({
        date: date,
        calender_arr: {...this.state.calender_arr, date: date},
      });

      console.log(this.state.calender_arr);

      let idle_hours = this.state.adver_arr.idle_time;
      let extra_hours = this.state.extra_time;
      let tot_hours = parseInt(idle_hours) + parseInt(extra_hours);

      if (this.state.time != '') {
        let date1 = date + ' ' + this.state.time + ':00';
        let date1xy = date + ' ' + this.state.time;
        var date12 = new Date(...this.getParsedDate(date1));
        date12.setTime(date12.getTime() + tot_hours * 3600000);
        let formate_date = await this.getFormatedDate(date12);
        this.setState({
          bookingDateTimeStart: date1xy,
          bookingDateTimeEnd: formate_date,
        });
      }
    }
  };
  setDate(date) {
    console.log(date);
  }

  ExtraRequest() {
    this.hideDatePicker();
  }

  selectTimeslot = item => {
    const tempArray = [...this.state.TimeSlot];
    console.log('ITTTTTT', item);
    // tempArray[item?.index].selected = !item?.item?.selected
    this.setState({
      // TimeSlot: tempArray,
      selectedIndex: item?.index,
      time: moment(item.item.title, 'hh:mm A').format('HH:mm:ss'),
    });
  };

  selectTimeModal = () => {
    return (
      <Modal
        transparent={true}
        visible
        onRequestClose={() => {
          this.setState({isShowDatePicker: false});
        }}>
        <View
          // onPress={() => this.hideDatePicker()}
          activeOpacity={1}
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              height: height-100,
              width: '100%',
              backgroundColor: Colors.white,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 25,
            }}>
            <Text
              style={{
                marginLeft: 30,
                lineHeight: 40,
                color: Colors.black,
                fontSize: 16,
                FontFamily: FontFamily.default,
              }}>
              {'Select Time'}
            </Text>
            <View
              style={{
                height: 0.8,
                width: '90%',
                backgroundColor: Colors.black,
                alignSelf: 'center',
              }}
            />
            <FlatList
              data={this.state.TimeSlot}
              extraData={this.state}
              renderItem={item => {
                return (
                  <TouchableOpacity
                    onPress={() => this.selectTimeslot(item)}
                    style={{
                      height: 40,
                      width: '90%',
                      alignSelf: 'center',
                      borderBottomColor: 'rgba(0, 0, 0, 0.3)',
                      borderBottomWidth: 0.6,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    {item.index == this.state.selectedIndex ? (
                      <View
                        style={{
                          marginLeft: 5,
                          height: 12,
                          width: 12,

                          borderRadius: 6,
                          backgroundColor: '#39DCE5',
                        }}
                      />
                    ) : (
                      <View
                        style={{
                          marginLeft: 5,
                          height: 12,
                          width: 12,
                          borderRadius: 6,
                          borderWidth: 1.2,
                          borderColor: '#39DCE5',
                        }}
                      />
                    )}
                    <Text
                      style={{
                        fontSize: 14,
                        color: Colors.black,
                        marginLeft: 10,
                        fontFamily: FontFamily.default,
                      }}>
                      {item?.item?.title}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              ListFooterComponent={() => (
                <TouchableOpacity
                  style={s.Btn1}
                  onPress={() => this.ExtraRequest()}>
                  <Text style={s.Btn1Text}>Selected</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    );
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
          this._submitForPayment(txnId, merchantTxnId, this.state.booking_id);
        } else if (t == 'failure.php') {
          msgProvider.toast(Lang_chg.payment_failed[config.language], 'center');
          this.setState({webviewshow: false});
          // this.props.navigation.navigate('Explore');
          return false;
        }
      }
    }
  }

  _submitForPayment = async (txnId, merchantTxnId, booking_id) => {
    this.setState({webviewshow: false});
    // let result = await localStorage.getItemObject('user_arr')
    // let user_id_post = 0;
    // if (result != null) {
    //   user_id_post = result.user_id;
    // }
    if (this.state.isConnected === true) {
      var data = new FormData();
      data.append('user_id_post', this.state.user_id_post.user_id);
      data.append('txnId', txnId);
      data.append('merchantTxnId', merchantTxnId);
      data.append('booking_id', booking_id);
      let url = config.baseURL + 'booking_add_pay.php';
      this.setState({loading: true});
      apifuntion
        .postApi(url, data)
        .then(obj => {
          this.setState({loading: false});
          return obj.json();
        })
        .then(obj => {
          //  alert(JSON.stringify(obj))
          if (obj.success == 'true') {
            let booking_no = obj.booking_no;
            let booking_date = obj.createtime;
            let noti = 'NA';
            let email_arr = 'NA';
            if (obj.email_arr != 'NA') {
              email_arr = obj.email_arr;
            }

            if (obj.notification_arr != 'NA') {
              noti = obj.notification_arr;
            }
            this._submitWidthDrowReq(
              txnId,
              noti,
              booking_no,
              booking_date,
              email_arr,
            );
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
        .catch(error => {
          console.log('-------- error ------- ' + error);
          this.setState({loading: false});
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
    this.setState({webviewshow: false});
    if (this.state.isConnected === true) {
      var data = new FormData();
      data.append('other_user_id', this.state.adver_arr.user_id);
      data.append('txnId', txnId);
      let url = config.baseURL + 'withdraw_request.php';
      this.setState({loading: true});
      apifuntion
        .postApi(url, data)
        .then(obj => {
          this.setState({loading: false});
          return obj.json();
        })
        .then(obj => {
          //  alert(JSON.stringify(obj))
          if (obj.success == 'true') {
            if (noti != 'NA') {
              //notification.oneSignalNotificationSendCall(noti)
              //notification.createNotif(noti)
            }
            if (email_arr != 'NA') {
              this.mailsendfunction(email_arr);
            }
            this.setState({loading: false});
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
        .catch(error => {
          console.log('-------- error ------- ' + error);
          this.setState({loading: false});
        });
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

  render() {
    console.log(
      'URL------',
      'https://myboatonline.com/app/webservice/paymentgateway/bookeey_library/buy.php?amt=' +
        this.state.pay_amount +
        '&oid=' +
        this.state.booking_no +
        '&other_user_id=' +
        this.state.adver_arr.user_id +
        '&user_id=' +
        this.state.user_id_post.user_id,
    );
    return (
      <KeyboardAvoidingView behavior="position">
        <View style={{backgroundColor: '#fff'}}>
          <Header
            imgBack={true}
            backBtn
            notiBtn={false}
            searchBtn={false}
            headerHeight={120}
            backImgSource={require('../../Images/backgd2.jpg')}
            name="Request"
          />

          <View style={{marginTop: -20, height: 'auto', borderTopLeftRadius: 20, borderTopRightRadius: 25, backgroundColor: '#fff'}}>
            <TouchableOpacity style={{marginTop: 15, borderTopLeftRadius: 20, borderTopRightRadius: 25,}}>
              <Calendar
                minDate={new Date()}
                markedDates={this.state.calender_arr}
                onDayPress={day => {
                  this._selectDate(day.dateString);
                }}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{marginTop: 10}}
            onPress={() => this.showDatePicker()}>
            <Input
              editable={false}
              placeholder="Choose Time"
              placeholderTextColor={'rgba(0, 0, 0, 0.4)'}
              inputStyle={{color: Colors.black, fontFamily: FontFamily.default}}
              autoCapitalize={false}
              returnKeyType="done"
              rightIcon={
                <Icon
                  name="right"
                  size={18}
                  type="antdesign"
                  color="rgba(0, 0, 0, 0.5)"
                />
              }
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
              onChangeText={txt => {
                this.setState({time: txt});
              }}
              maxLength={50}
              minLength={6}
              value={this.state.time}
              inputContainerStyle={{
                width: '93%',
                alignSelf: 'center',
                borderBottomColor: 'rgba(0, 0, 0, 0.3)',
              }}
            />
          </TouchableOpacity>

          <View style={{width: '100%', alignItems: 'center'}}>
            <Input
              placeholder="Extra Hour"
              placeholderTextColor={'rgba(0, 0, 0, 0.4)'}
              inputStyle={{color: Colors.black, fontFamily: FontFamily.default}}
              autoCapitalize={false}
              returnKeyType="done"
              keyboardType="numeric"
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
              onChangeText={txt => {
                this.setState({hour: txt});
              }}
              maxLength={50}
              minLength={6}
              value={this.state.hour}
              inputContainerStyle={{
                alignSelf: 'center',
                width: '93%',
                borderBottomColor: 'rgba(0, 0, 0, 0.3)',
              }}
            />

            <Input
              placeholder="How Many Guest"
              placeholderTextColor={'rgba(0, 0, 0, 0.4)'}
              inputStyle={{color: Colors.black, fontFamily: FontFamily.default}}
              returnKeyLabel="done"
              autoCapitalize={false}
              keyboardType="numeric"
              returnKeyType="done"
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
              onChangeText={txt => {
                this.setState({guest: txt});
              }}
              maxLength={50}
              minLength={6}
              value={this.state.guest}
              inputContainerStyle={{
                alignSelf: 'center',
                width: '93%',
                borderBottomColor: 'rgba(0, 0, 0, 0.3)',
              }}
            />
          </View>
          <View
            style={{alignItems: 'center', alignSelf: 'center', width: '100%'}}>
            <TouchableOpacity style={s.Btn1} onPress={() => this.Payment()}>
              <Text style={s.Btn1Text}>Proceed</Text>
            </TouchableOpacity>
            <Text>
              {'\n'}
              {'\n'}
              {'\n'}
              {'\n'}
              {'\n'}
              {'\n'}
              {'\n'}
              {'\n'}
            </Text>
          </View>

          <Modal
            animationType="slide"
            transparent
            visible={this.state.webviewshow}
            onRequestClose={() => {
              this.setState({webviewshow: false});
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
                      'https://myboatonline.com/app/webservice/paymentgateway/bookeey_library/buy.php?amt=' +
                      this.state.pay_amount +
                      '&oid=' +
                      this.state.booking_no +
                      '&other_user_id=' +
                      this.state.adver_arr.user_id +
                      '&user_id=' +
                      this.state.user_id_post.user_id,
                  }}
                  onNavigationStateChange={this._onNavigationStateChange.bind(
                    this,
                  )}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  // injectedJavaScript = {this.state.cookie}
                  startInLoadingState={false}
                  containerStyle={{marginTop: 20, flex: 1}}
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
        </View>
        {/* <DateTimePickerModal
          isVisible={this.state.isShowDatePicker}
          mode="time"
          onConfirm={this.handleConfirm}
          onCancel={this.hideDatePicker}
        /> */}
        {this.state.isShowDatePicker && this.selectTimeModal()}
      </KeyboardAvoidingView>
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
  borders: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    margin: 20,
    //borderColor:'#000',
    //borderWidth:1
  },
  Btn1: {
    height: 48,
    width: '88%',
    alignSelf: 'center',
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
  Btn1Text: {
    fontSize: 18,
    fontFamily: FontFamily.semi_bold,
    color: Colors.white,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start', // if you want to fill rows left to right
  },
  item: {
    width: '50%', // is 50% of container width
  },
  disc: {
    marginLeft: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  detail: {
    marginLeft: 20,
  },
  container: {
    // flex: 1,
    marginLeft: '15%',
    flexWrap: 'wrap',
    flexDirection: 'row', // set elements horizontally, try column.
  },
  datePickerStyle: {
    width: '100%',
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
  book_nod_calender: {
    width: '100%',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#c2c2c2',
    paddingBottom: 5,
    borderRadius: 15,
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
  datePickerStyle: {
    width: '100%',
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
    transform: [{rotate: '-45deg'}],
    marginTop: 19.2,
    marginLeft: -26,
  },

  booknow_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 30,
  },

  earnig_title: {
    fontSize: 20,
    fontFamily: 'Ubuntu-Bold',
    fontWeight: 'bold',
  },
  book_nod_calender: {
    width: '100%',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#c2c2c2',
    paddingBottom: 5,
    borderRadius: 15,
  },
  datePickerStyle: {
    width: '100%',
  },
  chhoice_time: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#c2c2c2',
    borderRadius: 15,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
    height: 50,
  },
  chooice_time_input: {
    fontFamily: 'Ubuntu-Bold',
    textAlign: 'right',
    height: 50,
  },
});
