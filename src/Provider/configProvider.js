import { Platform } from "react-native";
//import base64 from 'react-native-base64'
//import { Alert} from 'react-native'
import { msgProvider, msgTitle, msgText } from './messageProvider';
// import firebase from '../Config1';
// import Firebase from 'firebase';
// import {
//     GoogleSignin,
//     GoogleSigninButton,
//     statusCodes,
// } from 'react-native-google-signin';
// import { localStorage } from './localStorageProvider';
global.player_id_me1 = '123456';
global.social_login_data = 'NA';
//--------------------------- Config Provider Start -----------------------
class configProvider {

	//commented by pardeep
	// baseURL 	= 'https://myboatonline.com/app/webservice/';
	// img_url 	= 'https://myboatonline.com/app/webservice/images/200X200/';
	// img_url1 	= 'https://myboatonline.com/app/webservice/images/400X400/';
	// img_url2 	= 'https://myboatonline.com/app/webservice/images/700X700/';
	// img_url3 	= 'https://myboatonline.com/app/webservice/images/';
	// image_url4= 'https://myboatonline.com/app/webservice/images/';
	// appUrl= 'https://play.google.com/store/apps/details?id=com.whatsapp.w4b';


	baseURL = 'https://server3.rvtechnologies.in/My-Boat/app/app/webservice/';
	img_url = 'https://server3.rvtechnologies.in/My-Boat/app/app/webservice/images/200X200/';
	img_url1 = 'https://server3.rvtechnologies.in/My-Boat/app/app/webservice/images/400X400/';
	img_url2 = 'https://server3.rvtechnologies.in/My-Boat/app/app/webservice/images/700X700/';
	img_url3 = 'https://server3.rvtechnologies.in/My-Boat/app/app/webservice/images/';
	image_url4 = 'https://server3.rvtechnologies.in/My-Boat/app/app/webservice/images/';
	appUrl = 'https://play.google.com/store/apps/details?id=com.whatsapp.w4b';



	// notiCount = 0;
	// //  userauth = base64.encode('mario');
	// //  passauth = base64.encode('carbonell')
	// onesignalappid='d0c587e6-bf58-4b0e-8e41-2166524b5a9d'
	// // mapkey = 'AIzaSyCiJFnU3Ci8q5zXSvX-c5C3NnTOd2hYrGE'
	// mapkey = 'AIzaSyBwum8vSJGI-HNtsPVSiK9THpmA2IbgDTg'

	// headersapi={
	// 	'Authorization': 'Basic ' + base64.encode(base64.encode('mario')+":"+base64.encode('carbonell')), 
	// 	 Accept: 'application/json',
	// 	'Content-Type': 'multipart/form-data',
	// 	'Cache-Control': 'no-cache,no-store,must-revalidate',
	// 	 'Pragma': 'no-cache',
	// 	'Expires': 0,
	//    }


	login_type = 'app';

	// GetPlayeridfunctin= (player_id)=>{
	// 	player_id_me1=player_id
	// }

	language = 0;
	player_id = '123456';
	player_id_me = '123456';
	device_type = Platform.OS;
	loading_type = false;
	city_lat = '29.3117';
	city_lng = '47.4818';
	latitude = '29.3117';
	longitude = '47.4818';

	checkUserDeactivate = async (navigation) => {
		msgProvider.toast('Your account deactivated', 'long')
		setTimeout(() => {
			this.AppLogout(navigation);
		}, 200);
		return false;
	}

	AppLogout = async (navigation) => {
		console.log('AppLogout');
		//----------------------- if get user login type -------------
		var userdata = await localStorage.getItemObject('user_arr');
		var password = await localStorage.getItemString('password');
		var email = await localStorage.getItemString('email');
		var remember_me = await localStorage.getItemString('remember_me');
		var language = await localStorage.getItemString('language');

		console.log(password);
		console.log(email);
		console.log(remember_me);
		console.log(language);

		if (userdata != null) {
			if (userdata.login_type == 0) {
				localStorage.clear();
				if (remember_me == 'yes') {
					localStorage.setItemString('password', password);
					localStorage.setItemString('email', email);
					localStorage.setItemString('remember_me', remember_me);
					localStorage.setItemString('language', language.toString());
				} else {
					localStorage.setItemString('password', password);
					localStorage.setItemString('email', email);
					localStorage.setItemString('language', JSON.stringify(language));
				}

				var id = 'u_' + userdata.user_id;
				var queryOffinbox = firebase.database().ref('users/' + id + '/myInbox/');
				queryOffinbox.off();
				FirebaseInboxJson = [];
				count_inbox = 0;
				navigation.navigate('Login');

			} else if (userdata.login_type == 1) {
				console.log('face boook login');
				LoginManager.logOut();
				localStorage.clear();

				var id = 'u_' + userdata.user_id;
				var queryOffinbox = firebase.database().ref('users/' + id + '/myInbox/');
				queryOffinbox.off();
				FirebaseInboxJson = [];
				count_inbox = 0;
				navigation.navigate('Login')
			} else if (userdata.login_type == 2) {
				console.log('google login')
				try {
					await GoogleSignin.revokeAccess();
					await GoogleSignin.signOut();
				} catch (error) {
					// alert(error);
				}
				var id = 'u_' + userdata.user_id;
				var queryOffinbox = firebase.database().ref('users/' + id + '/myInbox/');
				queryOffinbox.off();
				FirebaseInboxJson = [];
				count_inbox = 0;
				localStorage.clear();
				navigation.navigate('Login')
			} else if (userdata.login_type == 5) {
				// alert(userdata.login_type);
				var id = 'u_' + userdata.user_id;
				var queryOffinbox = firebase.database().ref('users/' + id + '/myInbox/');
				queryOffinbox.off();
				FirebaseInboxJson = [];
				count_inbox = 0;
				localStorage.clear();
				navigation.navigate('Login')
			}
		} else {
			console.log('user arr not found');
		}
	}

};
//--------------------------- Config Provider End -----------------------

export const config = new configProvider();





