import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ImageBackground,
  CustomTextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform
} from 'react-native';
import { CheckBox, Input , Icon } from 'react-native-elements';
import {
  backgd,
  back_img,
  logo_blue,
  Colors,
  FontFamily,
  Sizes,
} from '../../Constants/Constants';
import { useNavigation } from '@react-navigation/core';
import { Picker } from '@react-native-community/picker';
import { config } from '../../Provider/configProvider';
import { apifuntion } from '../../Provider/apiProvider';
import { localStorage } from '../../Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../../Provider/messageProvider';
import AsyncStorage from '@react-native-community/async-storage';
import { Lang_chg } from '../../Provider/Language_provider';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { UserContext } from '../Main/UserContext';

//import CheckBox from '@react-native-community/checkbox';

export default class SignUp extends Component {
  // }
  static contextType = UserContext;

  constructor(props) {
    super(props);
    console.log('props :>> ', props);
    this.state = {
      googleData: '',
      language_id: config.language,
      password: '',
      confirm_password: '',
      HidePassword: true,
      email: props?.route?.params?.google_data?.email ? props?.route?.params?.google_data?.email : '',
      name: props?.route?.params?.google_data?.name ? props?.route?.params?.google_data?.name : '',
      user_name: '',
      last_name:'',
      login_type: 0,
      user_type_post: 1,
      device_type: config.device_type,
      loading: false,
      isConnected: true,
      checked: false,
      timer: null,
      otp: [],
      phone_number: '',
      minutes_Counter: '01',
      seconds_Counter: '59',
      startDisable: false,
      modalVisible2: false,
      user_id: 0,
      player_id: 123456,
      admin_email: '',
      template: [{ lang: 'Eng' }, { lang: 'Arb' }],
      branch: [],
      ref: [],
      inputform: false,
      isSelected: false,
    };

    this.num1 = React.createRef();
    this.num2 = React.createRef();
    this.num3 = React.createRef();
    this.num4 = React.createRef();
    this.num5 = React.createRef();
    this.num6 = React.createRef();
  }

  onValueChange(value) {
    console.log('change ' + value);
  }

  selectedValue(value) {
    console.log('change ' + value);
  }

  onChangeCheck() {
    console.log('checked');
    this.setState({ checked: !this.state.isSelected });
  }

  mailsendfunction = email_arr => {
    console.log('email_arr', email_arr);
    for (let i = 0; i < email_arr.length; i++) {
      var email = email_arr[i].email;
      var mailcontent = email_arr[i].mailcontent;
      var mailsubject = email_arr[i].mailsubject;
      var fromName = email_arr[i].fromName;

      console.log('email ', email);
      console.log('mailcontent ', mailcontent);
      console.log('mailsubject ', mailsubject);
      console.log('fromName ', fromName);

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
          console.log('obj ', obj);
          if (obj.success == 'true') {
            console.log('Mail send');
            this.setState({ inputform: true });
          } else {
            console.log('not send mail');
          }
          // api calling end==============================
        });
    }
  };

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_id');

      console.log('local ' + value);
      if (value !== null) {
        // value previously stored
        console.log(value);
      }
    } catch (e) {
      // error reading value
    }
  };

  VerifyOtp() {
    let { otp, player_id, user_id, phone_number } = this.state;

    // let user_id =localStorage.getItemString('user_id');
    // let user_id=  AsyncStorage.getItem('user_id');

    var url = config.baseURL + 'otp_verify.php';
    var data = new FormData();
    data.append('user_id_post', user_id);
    data.append('user_otp', otp);
    data.append('user_type', 1);
    data.append('player_id', player_id);
    data.append('device_type', config.device_type);
    console.log('forget==', data);

    // api calling start==============================
    apifuntion
      .postApi(url, data)
      .then(obj => {
        return obj.json();
      })
      .then(obj => {
        //  alert(JSON.stringify(obj))
        console.log(obj);
        if (obj.success == 'true') {
          msgProvider.toast(obj.msg[config.language], 'center');
          this.props.navigation.navigate('Login');
        } else {
        }

        // api calling end==============================
      })
      .catch(error => {
        console.log('-------- error ------- ' + error);
        // this.setState({ loading: false });
      });
  }

  inputNumber(value, flag) {
    console.log(value, flag);
    this.state.otp = this.state.otp + value;

    const completeFlag = `num${flag}`;
    this.setState({ [completeFlag]: value });
    flag = flag + 1;
    if (flag < 7 && value) {
      const nextFlag = `num${flag}`;
      const textInputToFocus = this[nextFlag];
      textInputToFocus.current.focus();
    }
    console.log(this.state.branch);
  }

  SignUp() {
    debugger
    console.log(this.state);

    //Keyboard.dismiss()
    let { name,last_name, email, password, confirm_password, phone_number } = this.state;

    if (name.length <= 0) {
      msgProvider.toast(Lang_chg.emptyName[config.language], 'center');
      return false;
    }
    if (name.length <= 2) {
      msgProvider.toast(Lang_chg.NameMinLength[config.language], 'center');
      return false;
    }
    if (name.length > 50) {
      msgProvider.toast(Lang_chg.NameMaxLength[config.language], 'center');
      return false;
    }
    if (last_name.length <= 0) {
      msgProvider.toast(Lang_chg.emptyName[config.language], 'center');
      return false;
    }
    if (last_name.length <= 2) {
      msgProvider.toast(Lang_chg.NameMinLength[config.language], 'center');
      return false;
    }
    if (last_name.length > 50) {
      msgProvider.toast(Lang_chg.NameMaxLength[config.language], 'center');
      return false;
    }
    if (email.length <= 0) {
      msgProvider.toast(Lang_chg.emptyEmail[config.language], 'center');
      return false;
    }
    if (email.length > 50) {
      msgProvider.toast(Lang_chg.emailMaxLength[config.language], 'center');
      return false;
    }
    const reg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg.test(email) !== true) {
      msgProvider.toast(Lang_chg.validEmail[config.language], 'center');
      return false;
    }

    //mobile============================
    if (phone_number.length <= 0) {
      msgProvider.toast(Lang_chg.emptyMobile[config.language], 'center');
      return false;
    }
    if (phone_number.length < 8) {
      msgProvider.toast(Lang_chg.MobileMinLength[config.language], 'center');
      return false;
    }
    if (phone_number.length > 8) {
      msgProvider.toast(Lang_chg.MobileMaxLength[config.language], 'center');
      return false;
    }
    var letters = /^[0-9]+$/;
    if (letters.test(phone_number) !== true) {
      msgProvider.toast(Lang_chg.validMobile[config.language], 'center');
      return false;
    }
    //password===================
    if (password.length <= 0) {
      msgProvider.toast(Lang_chg.emptyPassword[config.language], 'center');
      return false;
    }
    if (password.length <= 5) {
      msgProvider.toast(Lang_chg.PasswordMinLength[config.language], 'center');
      return false;
    }
    if (password.length > 16) {
      msgProvider.toast(Lang_chg.PasswordMaxLength[config.language], 'center');
      return false;
    }
    //cpassword===================
    if (confirm_password.length <= 0) {
      msgProvider.toast(Lang_chg.emptyConfirmPWD[config.language], 'center');
      return false;
    }
    if (confirm_password.length <= 5) {
      msgProvider.toast(
        Lang_chg.ConfirmPWDMinLength[config.language],
        'center',
      );
      return false;
    }
    if (confirm_password.length > 16) {
      msgProvider.toast(
        Lang_chg.ConfirmPWDMaxLength[config.language],
        'center',
      );
      return false;
    }
    if (confirm_password !== password) {
      msgProvider.toast(Lang_chg.ConfirmPWDMatch[config.language], 'center');
      return false;
    }

    var data = new FormData();

    data.append('user_name', name + last_name);
    // data.append('last_name' , last_name)
    data.append('email', email);
    data.append('country_code', 965);
    data.append('phone_number', phone_number);
    data.append('password', password);
    data.append('device_type', config.device_type);
    data.append('player_id', this.state.player_id);
    data.append('login_type', 0);
    data.append('user_type_post', 1);
    data.append('language_id', config.language);

     console.log(data, 'sending to signup api');
    this.setState({ loading: true });
    let url = config.baseURL + 'signup.php';
    apifuntion
      .postApi(url, data)
      .then(obj => {
        console.log(obj, 'res of sign up')
        this.setState({ loading: false });
        return obj.json();
      })
      .then(obj => {
        console.log(obj);

        console.log('city array', obj);
        //  alert(JSON.stringify(obj))
        if (obj.success == 'true') {
          localStorage.setItemString('guest_user', 'no');
          console.log('password', password);
          console.log('email', email);
          localStorage.setItemString('password', password);
          localStorage.setItemString('email', this.state.email);

           console.log('user data===', obj);
          var user_arr = obj.user_details;
          var email_arr = obj.email_arr;
          let user_type = user_arr.user_type;
          let signup_step = user_arr.signup_step;
          let user_id = user_arr.user_id;
          let email = user_arr.email;
          let otp = user_arr.otp;

          console.log('mail_id ', user_id);
          if (user_type == 1) {
            if (signup_step == 0) {
              this.setState({
                modalVisible2: true,
                inputform: true,
                user_id: user_id,
                email: email,
              });
              //  this.onButtonStart();
            }
            if (signup_step == 1) {
              localStorage.setItemString('user_id', JSON.stringify(user_id));
              console.log('user_id', user_id);
              this.setState({ modalVisible2: false });
              localStorage.setItemObject('user_arr', user_arr);
              localStorage.setItemString('remember_me', 'no');
              //  firebaseprovider.firebaseUserCreate();
              // firebaseprovider.getMyInboxAllData();
               this.goHomePage()
            }

            // for mail send
            if (typeof email_arr !== 'undefined') {
              if (email_arr != 'NA') {
                this.mailsendfunction(email_arr);
              }
            }

            if (obj.notification_arr != 'NA') {
              //  notification.oneSignalNotificationSendCall(obj.notification_arr)
            }
          }
        } else {
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
        this.setState({ loading: false });
      });
  }

  onChangeCheck(select) {
    console.log('sdfs', select);
    // this.setState({ isSelected: false})
    if (select == true) {
      this.setState({ isSelected: false });
    } else {
      this.setState({ isSelected: true });
    }
  }

  render() {
    const ref = this.state;
    const user = this.context
    console.log('context in login', user);
    return (
      <View>
        <ImageBackground
          style={s.ImageBackground}
          source={backgd}
          imageStyle={s.ImageBackground_Img}>
          {this.state.inputform || (
            <View>
             
              {/* <View style={s.lang}> */}
                {/* <Icon
                  name="globe"
                  color="#fff"
                  size={20}
                  style={{ marginTop: 12 }}
                />

                <Text style={{ color: '#fff', marginTop: 12, margin: 5 }}>
                  Eng
                </Text>

                <Icon
                  name="caret-down"
                  color="#fff"
                  size={20}
                  style={{ marginTop: 12 }}
                /> */}
                {/* <Picker
            selectedValue={this.state.branch}
            style={{color:'#fff',flex: 0,width: 100 }}
            mode="dropdown"
            itemStyle={{backgroundColor:'#fff'}}
            onValueChange={(itemValue, itemIndex) =>
              this.selectedValue(itemValue)
            }>


                {this.state.template.map((item, id) =>
                      {
                      return <Picker.Item key={id} value={item} label={item.lang} style={{color:'#fff',marginRight:100}} />;
                      }
                      )
                }



          </Picker> */}
              {/* </View> */}

              <KeyboardAwareScrollView
              extraScrollHeight={50}
              nestedScrollEnabled
              enableOnAndroid={true}
              style={s.subContainer}
              contentContainerStyle={s.subContentContainer}
              keyboardShouldPersistTaps={'always'}
              showsVerticalScrollIndicator={false}>
                 {Platform.OS == "ios" ? null : <View>
                        {user.value == 1 ?

                            <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                                style={{
                                    marginBottom: -65,
                                    alignItems: "flex-start",
                                    marginTop: 40,
                                    marginLeft: 20,
                                    borderRadius: 25,
                                    transform: [{ rotate: '180deg' }]
                                }}
                            >
                                <Icon
                                    name="arrow-back"
                                    type="ionicons"
                                    size={26}
                                    color={Colors.white}
                                />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                                style={{
                                    marginBottom: -65,
                                    alignItems: "flex-start",
                                    marginTop: 40,
                                    marginLeft: 20,
                                    borderRadius: 25,
                                }}
                            >
                                <Icon
                                    
                                    name="arrow-back"
                                    type="ionicons"
                                    size={26}
                                    color={Colors.white}
                                />
                            </TouchableOpacity>
                        }
                    </View>}
                <View style={s.Logo1}>
                  <Image source={require('../../Images/appicon.png')} style={s.Logo} />
                </View>
                {/* <Text style={s.Text1}>Boat Owner</Text> */}
                <View style={{ marginVertical: 10 }}>
                  <Input
                    placeholder="First Name"
                    // containerStyle={s.Input}
                    // inputContainerStyle={s.Input}
                    placeholderTextColor={Colors.white}
                    inputStyle={{ color: Colors.white }}
                    onChangeText={txt => {
                      this.setState({ name: txt });
                    }}
                    defaultValue={this.state.name}
                  />
                  <Input
                    placeholder="Last Name"
                    // containerStyle={s.Input}
                    // inputContainerStyle={s.Input}
                    placeholderTextColor={Colors.white}
                    inputStyle={{ color: Colors.white }}
                    onChangeText={txt => {
                      this.setState({ last_name: txt });
                    }}
                    defaultValue={this.state.last_name}
                  />
                  <Input
                    placeholder="Email"
                    // containerStyle={s.Input}
                    // inputContainerStyle={s.Input}
                    placeholderTextColor={Colors.white}
                    inputStyle={{ color: Colors.white }}
                    onChangeText={txt => {
                      this.setState({ email: txt });
                    }}
                    defaultValue={this.state.email}

                  />
                  <Input
                    placeholder="Mobile"
                    // containerStyle={s.Input}
                    // inputContainerStyle={s.Input}
                    placeholderTextColor={Colors.white}
                    inputStyle={{ color: Colors.white }}
                    onChangeText={txt => {
                      this.setState({ phone_number: txt });
                    }}
                  />
                  <Input
                    placeholder="Password"
                    // containerStyle={s.Input}
                    // inputContainerStyle={s.Input}
                    placeholderTextColor={Colors.white}
                    inputStyle={{ color: Colors.white }}
                    secureTextEntry={this.state.HidePassword}
                    onChangeText={txt => {
                      this.setState({ password: txt });
                    }}
                  />
                  <Input
                    placeholder="Confirm Password"
                    // containerStyle={s.Input}
                    // inputContainerStyle={s.Input}
                    placeholderTextColor={Colors.white}
                    inputStyle={{ color: Colors.white }}
                    secureTextEntry={this.state.HidePassword}
                    onChangeText={txt => {
                      this.setState({ confirm_password: txt });
                    }}
                  />
                </View>
                <View style={s.condition}>
                  <CheckBox
                    // value={this.state.isSelected}
                    //   onValueChange={setSelection}
                    checked={this.state.isSelected}
                    onChange={() => this.onChangeCheck()}
                    onPress={() => this.onChangeCheck(this.state.isSelected)}
                    style={s.checkbox}
                    checkedColor={Colors.orange}
                  />
                  <Text style={s.Text1}>
                    By sign up, you agree to our <Text> </Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        borderColor: '#fff',
                        alignSelf: 'center',
                        textDecorationLine: 'underline',
                      }}
                      onPress={() =>
                        this.props.navigation.navigate('Terms_Conditions', {
                          type: 1,
                        })
                      }>
                      terms and conditions
                    </Text>{' '}
                    and <Text> </Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        borderBottomColor: '#fff',
                        borderBottomWidth: 1,
                        alignSelf: 'center',
                        textDecorationLine: 'underline',
                      }}
                      onPress={() =>
                        this.props.navigation.navigate('Terms_Conditions', {
                          type: 2,
                        })
                      }>
                      privacy policy
                    </Text>
                    .
                  </Text>
                </View>

                <TouchableOpacity style={s.btn1} onPress={() => this.SignUp()}>
                  <Text style={s.btn1Text}>Sign Up</Text>
                </TouchableOpacity>

                <View>
                  <Text style={[s.Text1, { marginBottom: 10 }]}>
                    I have already account ?{' '}
                    <Text
                      style={{
                        fontFamily: FontFamily.semi_bold,
                        color: Colors.white,
                        alignSelf: 'center',
                        textDecorationLine: 'underline',
                      }}
                      suppressHighlighting={true}
                      onPress={() => this.props.navigation.navigate('Login')}>
                      Login
                    </Text>
                  </Text>
                </View>
              
                </KeyboardAwareScrollView>
            </View>
          )}

          {this.state.inputform && (
            <View style={{ marginTop: '60%' }}>
              <View style={s.inputView}>
                <TextInput
                  ref={this.num1}
                  keyboardType="numeric"
                  textContentType="oneTimeCode"
                  onChangeText={number => this.inputNumber(number, 1)}
                  value={this.state.num1}
                  maxLength={1}
                  style={{
                    borderWidth: 1,
                    borderColor: '#fff',
                    margin: 10,
                    padding: 8,
                    color: '#fff',
                  }}
                />

                <TextInput
                  ref={this.num2}
                  keyboardType="numeric"
                  textContentType="oneTimeCode"
                  onChangeText={number => this.inputNumber(number, 2)}
                  value={this.state.num2}
                  maxLength={1}
                  style={{
                    borderWidth: 1,
                    borderColor: '#fff',
                    margin: 10,
                    padding: 8,
                    color: '#fff',
                  }}
                />

                <TextInput
                  ref={this.num3}
                  keyboardType="numeric"
                  textContentType="oneTimeCode"
                  onChangeText={number => this.inputNumber(number, 3)}
                  value={this.state.num3}
                  maxLength={1}
                  style={{
                    borderWidth: 1,
                    borderColor: '#fff',
                    margin: 10,
                    padding: 8,
                    color: '#fff',
                  }}
                />

                <TextInput
                  ref={this.num4}
                  keyboardType="numeric"
                  textContentType="oneTimeCode"
                  onChangeText={number => this.inputNumber(number, 4)}
                  value={this.state.num4}
                  maxLength={1}
                  style={{
                    borderWidth: 1,
                    borderColor: '#fff',
                    margin: 10,
                    padding: 8,
                    color: '#fff',
                  }}
                />

                <TextInput
                  ref={this.num5}
                  keyboardType="numeric"
                  textContentType="oneTimeCode"
                  onChangeText={number => this.inputNumber(number, 5)}
                  value={this.state.num5}
                  maxLength={1}
                  style={{
                    borderWidth: 1,
                    borderColor: '#fff',
                    margin: 10,
                    padding: 8,
                    color: '#fff',
                  }}
                />
                <TextInput
                  ref={this.num6}
                  keyboardType="numeric"
                  textContentType="oneTimeCode"
                  onChangeText={number => this.inputNumber(number, 6)}
                  value={this.state.num6}
                  maxLength={1}
                  style={{
                    borderWidth: 1,
                    borderColor: '#fff',
                    margin: 10,
                    padding: 8,
                    color: '#fff',
                  }}
                />
              </View>
              <View style={{ elevation: 5 }}>
                <TouchableOpacity
                  style={s.btn1}
                  onPress={() => this.VerifyOtp()}>
                  <Text style={s.btn1Text}>Verify & Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ImageBackground>
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
    marginTop: 80,
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
    color: '#fff',
    backgroundColor: '#fff',
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
    // flex: 1,
    // backgroundColor:colors.secondry
  },
  subContentContainer: {
    paddingBottom: 12,
  },
});
//export default SignUp;
