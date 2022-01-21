import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
// import { LoginManager, AccessToken, GraphRequest, GraphRequestManager, } from 'react-native-fbsdk';
import {localStorage} from './localStorageProvider';
import {config} from './configProvider';
import {apifuntion} from './apiProvider';
import {msgProvider, msgTitle, msgText} from './messageProvider';
import {CommonActions} from '@react-navigation/native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  appleAuth,
  AppleButton,
  AppleAuthRequestScope,
  AppleAuthRequestOperation,
} from '@invertase/react-native-apple-authentication';
import {Lang_chg} from './Language_provider';

class SocialLoginProvider extends Component {
  constructor(props) {
    super(props);
    GoogleSignin.configure({
      webClientId:
        '1076734868236-uon9jm6dmf6l8ss6sbjhfjmakba027ao.apps.googleusercontent.com',
    });
  }

  goHomePage = navigation => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'Home'}],
      }),
    );
  };
  btnGoogleSignin = async () => {
    //Prompts a modal to let the user sign in into your application.
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      //this.callsocailweb(userInfo, 'google')
      console.log('userinfo', userInfo);
      console.log('userinfoemail', userInfo.user.email);
      //this.fetchsocialdata(userInfo,'google')
      //this.setState({ userInfo: userInfo });
      // console.log('userInfo.user',userInfo.user);
      //return false;
      return userInfo.user;
    } catch (error) {
      // alert('Message'+error.message)
      console.log('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened', error);
      }
    }
  };

  // facebook login end startt

  btnSocialLoginGoogle = async navigation => {
    console.log('result ');
    console.log(navigation);
    GoogleSignin.signOut()
    var result = await this.btnGoogleSignin();
    console.log('result ', result);
    console.log('result89', result);

    var data = new FormData();
    data.append('social_type', 2);
    data.append('social_id', result.id);
    data.append('social_email', result.email);
    data.append('device_type', config.device_type);
    data.append('player_id', config.player_id_me);
    //console.log('navigation', navigation);
    //navigation.navigate('Home');
    var obj = await this._callSignup1(data);
    console.log('obj84', obj);
    if (obj.success == 'true') {
      if (obj.user_exist == 'yes') {
        this.Call_Social_Normal_signup(obj.user_details, navigation);
      } else {
        social_login_data = {
          token: result.id,
          social_type: 2,
          name: result.name,
          email: result.email,
        };
        navigation.navigate('Signup');
      }
    } else {
      if (obj.account_active_status == 'deactivate') {
        config.checkUserDeactivate(navigation);
        return false;
      }
      alert(obj.msg[config.language]);
      return false;
    }
  };

  applelogin = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    return appleAuthRequestResponse;
  };

  btnSocialLoginApple = async navigation => {
    var result = await this.applelogin();
    // alert(JSON.stringify(result))
    var data = new FormData();
    // return false;
    data.append('social_type', 5);
    data.append('social_id', result.user);
    data.append('social_email', result.email);
    data.append('device_type', config.device_type);
    data.append('player_id', config.player_id_me);
    console.log('appleResult', result);
    var obj = await this._callSignup1(data);
    console.log('obj84', obj);
    if (obj.success == 'true') {
      if (obj.user_exist == 'yes') {
        this.Call_Social_Normal_signup(obj.user_details, navigation);
      } else {
        social_login_data = {
          token: result.user,
          social_type: 5,
          name: result.fullName.familyName,
          email: result.email,
        };
        navigation.navigate('Signup');
      }
    } else {
      if (obj.account_active_status == 'deactivate') {
        config.checkUserDeactivate(navigation);
        return false;
      }
      alert(obj.msg[config.language]);
      return false;
    }
  };

  submitSignup = async (result, navigation, type) => {
    var data = new FormData();
    let name = result.fullName.familyName;
    let email = result.email;
    let id = result.user;
    let photo = 'NA';
    data.append('user_name', name);
    data.append('email', email);
    data.append('country_code', 965);
    data.append('device_type', config.device_type);
    data.append('player_id', config.player_id_me);
    data.append('login_type', type);
    data.append('social_id', id);
    data.append('user_type_post', 1);
    data.append('language_id', config.language);
    let url = config.baseURL + 'signup.php';

    fetch(url, {
      method: 'POST',
      headers: new Headers(config.headersapi),
      body: data,
    })
      .then(obj => {
        return obj.json();
      })
      .then(obj => {
        if (obj.success == 'true') {
          var user_arr = obj.user_details;
          var email_arr = obj.email_arr;
          let user_id = user_arr.user_id;
          let email = user_arr.email;
          localStorage.setItemString('email', email);
          localStorage.setItemString('user_id', JSON.stringify(user_id));
          localStorage.setItemObject('user_arr', user_arr);
          // for mail send
          if (typeof email_arr !== 'undefined') {
            if (email_arr != 'NA') {
              this.mailsendfunction(email_arr);
            }
          }
          localStorage.setItemString('guest_user', 'no');
          this.goHomePage(navigation);
        } else {
          if (obj.account_active_status == 'deactivate') {
            config.checkUserDeactivate(navigation);
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
        this.setState({loading: false, data_not_found: 'Data Not Found'});
      });
  };

  _callSignup1 = async data => {
    console.log('data104', data);
    let url = config.baseURL + 'social_login.php';
    try {
      var res = await fetch(url, {
        method: 'POST',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
          Expires: 0,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      });
      if (res.status != 200) {
        throw 400;
      }
      const obj = await res.json();
      return obj;
    } catch (error) {
      msgProvider.alert(
        msgTitle.internet[config.language],
        msgText.networkconnection[config.language],
        false,
      );
    }
  };

  Call_Social_Normal_signup = (user_details, navigation) => {
    console.log('Call_Social_Normal_signup coming_from=', navigation);
    console.log('Call_Social_Normal_signup user_details=', user_details);
    var user_id = user_details.user_id;
    var email = user_details.email;
    var profile_complete = user_details.profile_complete;
    localStorage.setItemString('user_id', JSON.stringify(user_id));
    localStorage.setItemObject('user_arr', user_details);
    localStorage.setItemString('email', email);
    if (profile_complete == 1) {
      localStorage.setItemString('guest_user', 'no');
      this.goHomePage(navigation);
    }
  };
}

export const SocialLogin = new SocialLoginProvider();
