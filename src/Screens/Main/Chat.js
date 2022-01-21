import React, { useState } from 'react';
import {
    Icon,
    Input,
    Card
} from 'react-native-elements';
import {Colors, FontFamily, Sizes } from '../../Constants/Constants';
import { useNavigation } from '@react-navigation/core';
import PersonalChat from '../../Data/PersonalChat';


//import React from 'react';
// import { GiftedChat,Bubble, Actions,
//   ActionsProps, } from 'react-native-gifted-chat'

import { Text, View, Image, Platform, Modal, Alert, StyleSheet, FlatList, TextInput, StatusBar, KeyboardAvoidingView, Dimensions, TouchableOpacity } from 'react-native'
import { Lang_chg } from '../../Provider/Language_provider'
import { config } from '../../Provider/configProvider';
import { localStorage } from '../../Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../../Provider/messageProvider';
//import Icon from 'react-native-vector-icons/AntDesign'
import firebase1 from '../../Provider/FirebaseConfig';
import firebase from 'firebase/compat/app';
import AsyncStorage  from "@react-native-community/async-storage";

//import Firebase from 'firebase';
// import {Languageprovider}  from './Provider/Language_provider';
import { firebaseprovider } from '../../Provider/FirebaseProvider';
//import { notification } from '../../Provider/NotificationProvider'
//import Loader from './Loader'
import { consolepro } from '../../Provider/Consoleprovider';
//import { Circle } from 'react-native-maps';



const BannerHieght = Dimensions.get('window').height;
const BannerWidth = Dimensions.get('window').width;
global.userChatIdGlobal = '';
global.blockinbox = 'no';
global.messagedata = []
export default class Chats extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      optionmsg: '',
      data1: [],
      user_id: '',
      chatmsg: '',
      other_user_name: '',
      data: this.props.route.params.chatdata,
      // data:{'other_user_name':'vikas',image:'',other_user_id:3,'blockstatus':'no'},
      name: '',
      message_type: 'text',

      filePath: {},
      messages: [],
      isVisible: false,
      modalVisible: false,
      fileData: '',
      fileUri: '',
      user_image: '',
      imgBlob: '',
      isConnected: true,
      loading: false,
      behavior: 'position',
      bottom: 5,
    }
    // OneSignal.init(config.onesignalappid, {
    //   kOSSettingsKeyAutoPrompt: true,
    // });
    // OneSignal.setLogLevel(6, 0);

    this.show_user_message_chat = this.show_user_message_chat.bind(this);
  }
  componentDidMount() {
   
    this.getData('user_arr')
  }



  getData = async (key) => {
            
    console.log('local '+key)
    try {
      const value = await AsyncStorage.getItem(key);

//          console.log('local '+value)
      
       //  console.log('array ',arrayData.email);
      if(value !== null) {
       
        const arrayData = JSON.parse(value);

      
       this.getmessagedata(arrayData)
     
       
      
      }
    } catch(e) {
      // error reading value
    }
  }



  getmessagedata = async (userdata) => {
    //var userdata = await localStorage.getItemObject('user_arr');
   // consolepro.consolelog('getmessagedata')

    this.setState({ user_id: userdata.user_id, })


    var data = this.state.data
    consolepro.consolelog('data', data)
    var other_user_id = data.other_user_id
    // var item_id = data.item_id;
    consolepro.consolelog('other_user_id', other_user_id);
    // consolepro.consolelog('item_id',item_id);
    // consolepro.consolelog('firebaseprovider',FirebaseUserJson)
    var inbox_count = FirebaseUserJson.findIndex(x => x.user_id == other_user_id);
    consolepro.consolelog("chat name inbox count before", inbox_count);
    if (inbox_count >= 0) {
      consolepro.consolelog("chat name inbox count", inbox_count);
      var jsonData = FirebaseUserJson[inbox_count];
      consolepro.consolelog('jsonData', jsonData);
      if (jsonData.name != 'NA') {
        this.setState({ name: jsonData.name })

        // if (userProvider.getMe().user_type == 'user') {
        //   $('#chat_name').attr("onclick","redirectChefProfile("+other_user_id+")");
        // }
      } else {
        this.setState({ name: 'Chat' })
      }

    } else {
      this.setState({ name: 'Chat' })
    }
    this.show_user_message_chat()
  }
  sendmessagebtn = async () => {
    consolepro.consolelog('sendmessagebtn')

    let messageType = 'text';
    let message = this.state.chatmsg
    consolepro.consolelog('message', message)
    this.chatmsg.clear();
    this.setState({ chatmsg: '' })
    if (message.length <= 0) {
      alert(Languageprovider.massege_validation[language_key])
      return false
    }
    this.sendmessagecallbtn(messageType, message)
  }
  sendmessagecallbtn = async (messageType, message) => {
    let userdata = await localStorage.getItemObject('user_arr')

    let data1 = this.state.data
    //  jhkfhjkhsdk
    var user_id = userdata.user_id
    var other_user_id = data1.other_user_id
    //  var item_id = data1.item_id;
    var chat_type = 'Item_chat';

    var user_id_send = 'u_' + user_id;
    var other_user_id_send = 'u_' + other_user_id;

    var inbox_id_me = 'u_' + other_user_id;
    var inbox_id_other = 'u_' + user_id;
    consolepro.consolelog('inbox_id', inbox_id_me)
    consolepro.consolelog('inbox_id_other', inbox_id_other)

    //---------------------- this code for create inbox in first time -----------
    consolepro.consolelog('FirebaseInboxJsonChck', FirebaseInboxJson);
    console.log('other_user_id', other_user_id)
    console.log('FirebaseInboxJsonChck', FirebaseInboxJson);
    console.log('Firebaseuserjson', FirebaseUserJson);

    if (FirebaseUserJson.length > 0) {
      var find_inbox_index2 = FirebaseUserJson.findIndex(x => x.user_id == other_user_id);
      console.log('find_inbox_index', find_inbox_index2)

      if (find_inbox_index2 != -1) {
        if ('myInbox' in FirebaseUserJson[find_inbox_index2]) {
          let myinbox2 = FirebaseUserJson[find_inbox_index2].myInbox
          if (myinbox2 != undefined) {
            //  myinbox=myinbox.findIndex(x => x.user_id == other_user_id)
            console.log('myinbox2', myinbox2)
            if (inbox_id_other in myinbox2) {
              let myinboxdata = myinbox2[inbox_id_other]

              console.log('inbox_id_me', inbox_id_me)
              console.log('inbox_id_other', inbox_id_other)
              blockinbox = myinboxdata.block_status

            }
          }
        }
      }
    }
    var find_inbox_index = FirebaseInboxJson.findIndex(x => x.user_id == other_user_id);
    consolepro.consolelog('find_inbox_index chat', find_inbox_index);
    consolepro.consolelog('other_user_id chat', other_user_id);
    if (find_inbox_index == -1) {

      var jsonUserDataMe = {
        count: 0,
        lastMessageType: "",
        lastMsg: "",
        user_id: other_user_id,
        typing_status: 'no',
        block_status: 'no',
        lastMsgTime: firebase.database.ServerValue.TIMESTAMP,
      };

      var jsonUserDataother = {
        count: 0,
        lastMessageType: "",
        lastMsg: "",
        user_id: user_id,
        typing_status: 'no',
        block_status: 'no',
        lastMsgTime: firebase.database.ServerValue.TIMESTAMP,

      };

      firebaseprovider.UpdateUserInboxMe(user_id_send, inbox_id_me, jsonUserDataMe);
      if (blockinbox == 'no') {
        firebaseprovider.UpdateUserInboxOther(other_user_id_send, inbox_id_other, jsonUserDataother);
      }

      //  consolepro.consolelog('FirebaseUserJson',FirebaseUserJson);
    }
    //---------------------- this code for create inbox in first time end -----------

    //---------------------- this code for send message to both -----------
    var messageIdME = 'u_' + user_id + '__u_' + other_user_id;
    var messageIdOther = 'u_' + other_user_id + '__u_' + user_id;
    var senderId = user_id;
    var inputId = 'xyz'
    // var timestamp = new Date().getTime();
    var messageJson = {
      message: message,
      messageType: messageType,
      senderId: senderId,
      timestamp: firebase.database.ServerValue.TIMESTAMP
    }

    this.chatmsg.clear();

    firebaseprovider.SendUserMessage(messageIdME, messageJson, messageType, inputId);
    if (this.state.data.blockstatus == 'no') {
      if (blockinbox == 'no') {
        firebaseprovider.SendUserMessage(messageIdOther, messageJson, messageType, inputId);
      }

    }
    //---------------------- this code for send message to both end -----------


    //----------------update user inbox----------------------------
    var jsonUserDataMe = {
      count: 0,
      lastMessageType: messageType,
      lastMsg: message,
      lastMsgTime: firebase.database.ServerValue.TIMESTAMP
    };

    firebaseprovider.UpdateUserInboxMe(user_id_send, inbox_id_me, jsonUserDataMe);

    var user_id_me = userdata.user_id
    var chat_room_id = other_user_id;
    this.chatRoomIdUpdate(user_id_me, chat_room_id);

    //------------------------- get other user inbox -------------------

    consolepro.consolelog('other_user_id_send', other_user_id_send);
    consolepro.consolelog('user_id_send', user_id_send);
    var count_new = 0;
    var query = firebase1.database().ref('users/' + other_user_id_send + '/myInbox/' + inbox_id_other);
    query.once('value', (data) => {
      consolepro.consolelog("chat_data", data.toJSON());
      // consolepro.consolelog('user inbox data',data.val().count);
      var count_old = data.val() == null ? 0 : data.val().count;
      consolepro.consolelog('count_old_check', count_old);
      count_new = parseInt(count_old) + 1;

      var jsonUserDataOther = {
        count: count_new,
        lastMessageType: messageType,
        lastMsg: message,
        lastMsgTime: firebase.database.ServerValue.TIMESTAMP
      };
      // alert("dddd");      
      // consolepro.consolelog('jsonUserDataOther',jsonUserDataOther);
      if (blockinbox == 'no') {
        firebaseprovider.UpdateUserInboxOther(other_user_id_send, inbox_id_other, jsonUserDataOther);
      }

    })
    //---------------------- send message notifications ----------------
    var title = 'Boatuser';
    var message_send = message;
    var SenderName = userdata.name;
    if (messageType != 'text' && messageType != 'location') {
      message_send = SenderName + ' sent: ' + messageType;
    } else {
      message_send = SenderName + ' ' + message_send;
    }

    var other_user_id = chat_room_id;
    consolepro.consolelog('other_user_id_noti', other_user_id);
    var message_noti = message_send;
    var action_json = {
      user_id: user_id_me,
      other_user_id: other_user_id,
      chat_type: chat_type,

      action_id: 0,
      action: 'chat_single',
      // action_id : user_id_me,
      SenderName: SenderName,
    };
    // alert(user_id_me);  
    this.sendNotificationSignle(title, message_noti, action_json, other_user_id);
    //---------------------- send message notifications end----------------

  }
  sendNotificationSignle = async (title, message, action_json, user_id_member) => {
    let userdata = await localStorage.getItemObject('user_arr')
    consolepro.consolelog('sendNotificationSignle action_json', action_json);
    consolepro.consolelog('sendNotificationSignle message', message);
    consolepro.consolelog('sendNotificationSignle user_id_member', user_id_member);

    consolepro.consolelog('update delete_flag', user_id_member);
    consolepro.consolelog("sendNotificationSignle FirebaseUserJson", FirebaseUserJson);
    var user_check_inbox = FirebaseUserJson.findIndex(x => x.user_id == user_id_member);
    consolepro.consolelog("user_check_inbox subuser", user_check_inbox);
    if (user_check_inbox >= 0) {
      consolepro.consolelog('FirebaseUserJson subuser', FirebaseUserJson[user_check_inbox]);
      var player_id_get = FirebaseUserJson[user_check_inbox].player_id;
      var chat_room_id_get = FirebaseUserJson[user_check_inbox].chat_room_id;
      var notification_status = FirebaseUserJson[user_check_inbox].notification_status;

      consolepro.consolelog('chat_room_id_get', chat_room_id_get + '//' + chat_room_id_get);
      consolepro.consolelog('player_id_get', user_id_member + '//' + player_id_get);
      consolepro.consolelog('notification_status', notification_status);

      if (notification_status == 0) {
        var user_id_me = userdata.user_id;
        consolepro.consolelog('chat_room_id_get', chat_room_id_get + '!=' + user_id_me);
        // if(chat_room_id_get != user_id_me){
        if (player_id_get != 'no' && player_id_get != '123456') {
          var player_id_arr = [];
          player_id_arr.push(player_id_get);
          consolepro.consolelog('player_id_arr', player_id_arr);

          if (player_id_arr.length > 0) {
            consolepro.consolelog('vikas slonakfsdsend notihd');
            notification.notificationfunction(message, action_json, player_id_get, title);
          }
          // }
        }
      }
    }
  }
  chatRoomIdUpdate = (user_id, other_user_id) => {
    consolepro.consolelog('chatRoomIdUpdate user_id', user_id);
    consolepro.consolelog('chatRoomIdUpdate other_user_id', other_user_id);
    var id = 'u_' + user_id;
    var jsonUserDataMe = {
      chat_room_id: other_user_id,
    };
    firebaseprovider.CreateUser(id, jsonUserDataMe);
  }
  myInboxCountZeroChat = () => {
    consolepro.consolelog('myInboxCountZeroChat');
    var data = this.state.data
    var user_id = this.state.user_id
    var other_user_id = data.other_user_id
    var user_id_send = 'u_' + user_id;
    var other_user_id_send = 'u_' + other_user_id;

    var jsonUserDataOther = {
      count: 0,
      user_id: other_user_id,
    };
    firebaseprovider.UpdateUserInboxOther(user_id_send, other_user_id_send, jsonUserDataOther);
  }

  show_user_message_chat = () => {

    //  var messagedata=[]
    var other_user_id = this.state.data.other_user_id
    var find_inbox_index = FirebaseInboxJson.findIndex(x => x.user_id == other_user_id);
    consolepro.consolelog('find_inbox_index chatshow_user_message_chat', find_inbox_index);
    consolepro.consolelog('other_user_id chatshow_user_message_chat', other_user_id);
    if (find_inbox_index >= 0) {
      consolepro.consolelog('inboxfinguser')
      this.myInboxCountZeroChat()
    }

    consolepro.consolelog('show_user_message');

    // var userdata= await localStorage.getItemObject('user_arr');
    var data = this.state.data
    var user_id = this.state.user_id
    var other_user_id = data.other_user_id
    // var item_id = data.item_id;
    var chat_type = 'Item_chat';

    var userChatId = 'u_' + user_id + '__u_' + other_user_id
    if (userChatIdGlobal == '') {
      userChatIdGlobal = userChatId;
    }
    consolepro.consolelog('userChatIdGlobal', userChatIdGlobal);

    var queryOff = firebase1.database().ref('message/').child(userChatIdGlobal);
    queryOff.off('child_added');
    queryOff.off('child_changed');
    // alert('userChatId======'+userChatId);
    var image_index_me = 0;
    var image_index_other = 0;
    userChatIdGlobal = userChatId;
    var query = firebase1.database().ref('message/' + userChatId).orderByChild("timestamp");
    query.on('child_added', (data) => {
      consolepro.consolelog('message child_added chat all data', data.toJSON());
      // LoadingEnd();

      var msgKey = data.key;
      var message = data.val().message;
      var messageType = data.val().messageType;
      var senderId = data.val().senderId;
      var timestamp = data.val().timestamp;
      var lastMsgTime = firebaseprovider.convertTimeAllFormat(timestamp, 'date_time_full');
      var messageDataShow = '';
      consolepro.consolelog('senderId', senderId);
      consolepro.consolelog('user_id', user_id);

      if (senderId == user_id) {
        consolepro.consolelog('senderId', senderId);

        if (messageType == 'text') {

          var messageJson = {
            'name': message,
            'userid': senderId,
            'messageType': messageType,
            'time': lastMsgTime
          }
          consolepro.consolelog('messageJoson', messageJson)
          let data6 = this.state.data1
          data6.push(messageJson)
          this.setState({ data1: data6 })
        } else if (messageType == 'location') {
          var messageJson = {
            'name': message,
            'userid': senderId,
            'messageType': messageType,
            'time': lastMsgTime
          }
          consolepro.consolelog('messageJoson', messageJson)
          let data6 = this.state.data1
          data6.push(messageJson)
          this.setState({ data1: data6 })
        }
        else if (messageType == 'image') {
          var messageJson = {
            'name': message,
            'userid': senderId,
            'messageType': messageType,
            'time': lastMsgTime
          }
          consolepro.consolelog('messageJoson', messageJson)
          let data6 = this.state.data1
          data6.push(messageJson)
          this.setState({ data1: data6 })

        }
      } else {
        if (messageType == 'text') {
          var messageJson = {
            'name': message,
            'userid': senderId,
            'messageType': messageType,
            'time': lastMsgTime
          }
          consolepro.consolelog('messageJson', messageJson)
          let data6 = this.state.data1
          data6.push(messageJson)
          this.setState({ data1: data6 })

        }
        else if (messageType == 'location') {
          var messageJson = {
            'name': message,
            'userid': senderId,
            'messageType': messageType,
            'time': lastMsgTime
          }
          consolepro.consolelog('messageJson', messageJson)
          let data6 = this.state.data1
          data6.push(messageJson)
          this.setState({ data1: data6 })
        }
        else if (messageType == 'image') {
          var messageJson = {
            'name': message,
            'userid': senderId,
            'messageType': messageType,
            'time': lastMsgTime
          }
          consolepro.consolelog('messageJoson', messageJson)
          let data6 = this.state.data1
          data6.push(messageJson)
          this.setState({ data1: data6 })

        }
      }
      consolepro.consolelog('this.state.data1', this.state.data1)
    });

    // for(let i=0; i<messagedata.length; i++)
    // {
    //   messagedata[i]=messagedata[(messagedata.length-1)-i];
    // }

    consolepro.consolelog('enndshowfunction')
  }


  // componentWillMount() {
  //   this.setState({
  //     messages: [
  //       {
  //           _id: 2,
  //           text: 'My message',
  //           createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
  //           avatar: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',

  //           user: {
  //             _id: 2,
  //             name: 'React Native',
  //            avatar: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
  //           },

  //         }
  //     ],
  //   })
  // }


  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }
  handlePickImage = () => {
    consolepro.consolelog('fjslkfldsjlas')
  }
  renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: 'white',
          },

        }}
        wrapperStyle={{
          right: {
            backgroundColor: Colorss.theme1,
          },
          left: {
            backgroundColor: '#d6d6d6',
          },
        }}
      />
    );
  }
  renderActions = (props) => {
    return (
      <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={{ width: '10%', alignItems: 'center', justifyContent: 'center' }}>
      
        {/* <Image style={{ width: 34, height: 34, resizeMode: 'contain', marginLeft: 9, marginBottom: 9 }} source={require('./icons/error.png')}></Image>
       */}
      </TouchableOpacity>
    )
  }
  senduserreport = async () => {
    let userdata = await localStorage.getItemObject('user_arr')
    consolepro.consolelog('userdata', userdata)
    let user_id = userdata.user_id
    let data = this.state.data
    var other_user_id = data.other_user_id
    var url = config.baseURL + 'chat_report_submit.php?user_id=' + user_id + '&other_user_id=' + other_user_id + '&report_type=chat';
    consolepro.consolelog('url', url)
    this.setState({ loading: true, })
    fetch(url, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': 0,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    }).then((obj) => {
      this.setState({ loading: false });
      return obj.json();
    }).then((obj) => {
      consolepro.consolelog('obj', obj);

      if (obj.success == 'true') {
        msgProvider.alert('', obj.msg[config.language], false);
      }
      else {
        if (obj.account_active_status == "deactivate") {
          config.checkUserDeactivate(this.props.navigation);
          return false;
        }
        msgProvider.alert('', obj.msg[config.language], false);
        return false;
      }
    }).catch((error) => {
      this.setState({ loading: false });
      msgProvider.alert(msgTitle.server[config.language], msgText.servermessage[config.language], false);
    })
  }
  clearchatbtn = () => {
    Alert.alert(
      'Are you sure you want to clear chat ?',  // message
      '',
      [
        { text: 'No', onPress: () => consolepro.consolelog('Cancel Pressed'), style: 'cancel' },
        { text: 'Yes', onPress: () => { this.ClearChatConfirm() }, style: 'destructive' },
      ],
      { cancelable: false }
    )
  }
  ClearChatConfirm = async () => {
    let userdata = await localStorage.getItemObject('user_arr')
    consolepro.consolelog('userdata', userdata)
    let data = this.state.data
    var user_id = userdata.user_id
    var other_user_id = data.other_user_id
    // var item_id = data.item_id;
    var chat_type = 'Item_chat';

    var messageIdME = 'u_' + user_id + '__u_' + other_user_id;
    var id = 'u_' + user_id;
    var otherid = 'u_' + other_user_id;
    let jsonUsesadsssfrData = {};

    firebase1.database().ref().child('message' + '/' + messageIdME + '/').remove();
    // messagedata=[] 
    this.setState({ data1: [], modalVisible: false })
    let jsonUserData = {};


    var jsonUserDataMe = {
      count: 0,
      lastMessageType: "",
      lastMsg: "",
      lastMsgTime: "",
      user_id: other_user_id,
    };
    var user_id_send = 'u_' + user_id;
    var other_user_id_send = 'u_' + other_user_id;
    var inbox_id_me = 'u_' + other_user_id;

    firebaseprovider.UpdateUserInboxMe(user_id_send, inbox_id_me, jsonUserDataMe);
    firebaseprovider.getMyInboxAllData();

  }
  btnOpneImageOption = (index) => {
    const options = {
      title: Lang_chg.privacypolicy[config.language],
      takePhotoButtonTitle: Lang_chg.takephot[config.language],
      chooseFromLibraryButtonTitle: Lang_chg.chooselib[config.language],
      cancelButtonTitle: Lang_chg.cancel[config.language],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      maxWidth: 1000,
      maxHeight: 1000,
      quality: 0.8
    };

    // ImagePicker.showImagePicker(options, (response) => {
    //   consolepro.consolelog('Response = ', response);

    //   if (response.didCancel) {
    //     consolepro.consolelog('User cancelled image picker');
    //   } else if (response.error) {
    //     consolepro.consolelog('ImagePicker Error: ', response.error);
    //   } else if (response.customButton) {
    //     consolepro.consolelog('User tapped custom button: ', response.customButton);
    //   } else {


    //     this.setState({
    //       filePath: response,
    //       fileData: response.data,
    //       fileUri: response.uri,
    //       imagedata: true,
    //       camraon: true,
    //       loading: true,
    //       profileimagehide: true,
    //       openDate: false
    //     });
    //     let user_id = this.state.user_id
    //     consolepro.consolelog('this.state.fileUri', response.uri)
    //     var url = config.baseURL + 'chat_file_upload.php';
    //     var data2 = new FormData();

    //     data2.append('user_id', user_id)
    //     data2.append('file_type', 'image')
    //     data2.append('image', {
    //       uri: response.uri,
    //       type: 'image/jpg', // or photo.type
    //       name: 'image.jpg'
    //     });
    //     consolepro.consolelog('url', url)
    //     consolepro.consolelog('data', data2)
    //     // this.setState({loading:true,})
    //     fetch(url, {
    //       method: 'POST',
    //       headers: {
    //         "Content-Type": "multipart/form-data"
    //       },
    //       body: data2,
    //     }).then((obj) => {
    //       this.setState({ loading: false })
    //       return obj.json();
    //     }).then((obj) => {
    //       consolepro.consolelog('obj', obj);
    //       if (obj.success == 'true') {
    //         this.setState({ bottom: 0, loading: false })
    //         this.sendmessagecallbtn('image', obj.file)
    //       }
    //       else {
    //         this.setState({ loading: false });
    //         msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
    //         return false;
    //       }
    //     }).catch((error) => {
    //       consolepro.consolelog('error', error)
    //       msgProvider.alert(msgTitle.server[config.language], msgText.servermessage[config.language], false);
    //     })
    //   }
    // });

  }

  permmissionsendreport = () => {
    Alert.alert(
      //This is title
      Lang_chg.Confirm[config.language],
      //This is body text
      Lang_chg.reportmessagepopup[config.language],
      [
        { text: Lang_chg.Yes[config.language], onPress: () => this.senduserreport() },
        { text: Lang_chg.No[config.language], onPress: () => consolepro.consolelog('No Pressed'), style: 'cancel' },
      ],
      { cancelable: false }
      //on clicking out side, Alert will not dismiss
    );
  }

  permmissionclearchat = () => {
    Alert.alert(
      //This is title
      Lang_chg.Confirm[config.language],
      //This is body text
      Lang_chg.chatclearpopup[config.language],
      [
        { text: Lang_chg.Yes[config.language], onPress: () => this.ClearChatConfirm() },
        { text: Lang_chg.No[config.language], onPress: () => consolepro.consolelog('No Pressed'), style: 'cancel' },
      ],
      { cancelable: false }
      //on clicking out side, Alert will not dismiss
    );
  }
  render() {
    consolepro.consolelog('this.state.data.other_user_name', this.state.data)
    if (Platform.OS === 'ios') {

      return (
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
          <View style={styles.container}>
          
            <StatusBar
              hidden={false}
              backgroundColor={Colors.theme1}
              translucent={false}
              networkActivityIndicatorVisible={true}
            />
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => { this.setState({ modalVisible: false }) }}
            >
              <TouchableOpacity
                style={{ flex: 1 }}
                activeOpacity={1}
                onPressOut={() => { this.setState({ modalVisible: false }) }}
              >
                <View style={{ backgroundColor: '#f5f4f2', height: 'auto', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                  <View style={{ paddingTop: 15, paddingHorizontal: 20 }}>
                    <Text style={{ paddingVertical: 10, fontSize: 15.5, fontFamily: 'Ubuntu-Bold', textAlign: 'flex-start' }}>{Lang_chg.chataction[config.language]}</Text>
                    <TouchableOpacity onPress={() => { this.setState({ modalVisible: false }); this.permmissionsendreport() }}>
                      <Text style={{ color: 'black', fontSize: 15, fontFamily: 'Ubuntu-Regular' }}>{Lang_chg.chatreport[config.language]}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingVertical: 16 }} onPress={() => { this.setState({ modalVisible: false }); this.permmissionclearchat() }}>
                      <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: 14 }}>{Lang_chg.chatclear[config.language]}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ paddingBottom: 15 }} onPress={() => { this.setState({ modalVisible: false }) }}>
                      <Text style={{ color: Colors.theme1, fontSize: 15, fontFamily: 'Ubuntu-Regular' }}>{Lang_chg.chatcancel[config.language]}</Text>
                    </TouchableOpacity>
                  </View>

                </View>

              </TouchableOpacity>
            </Modal>

            <View style={{ paddingVertical: 14, backgroundColor: Colors.theme1, flexDirection: 'row', width: '100%', }}>
              <View style={{ width: '15%', alignSelf: 'center' }}>
                <TouchableOpacity style={{ width: '100%', paddingTop: 3 }} onPressOut={() => { this.props.navigation.goBack() }}>
                
                  {/* <Image source={require('./icons/backw.png')} style={{ width: 26, height: 14, alignSelf: 'center' }} />
                 */}
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', alignSelf: 'center', width: '85%', }}>
                <View style={{ flexDirection: 'row', width: '80%' }}>

                  {this.state.data.image == undefined ?
                    <Image source={require('../../../assets/icons/error.png')} style={{ width: 20, alignSelf: 'center', height: 20, resizeMode: 'contain', }} /> :
                    this.state.data.image == 'NA' ?
                      <Image source={require('../../../assets/icons/error.png')} style={{ width: 20, alignSelf: 'center', height: 20, resizeMode: 'contain' }} /> :
                      this.state.data.image == null ?
                        <Image source={require('../../../assets/icons/error.png')} style={{ width: 20, alignSelf: 'center', height: 20, resizeMode: 'contain' }} /> :
                        <Image source={{ uri: config.img_url1 + this.state.data.image }} style={{ width: 30, alignSelf: 'center', height: 30, borderRadius: 15, }} />

                  }
                  <Text style={{ color: 'white', fontSize: 17, fontFamily: 'Ubuntu-Bold', paddingLeft: 10 }}>{this.state.data.other_user_name}</Text>

                </View>
                <View style={{ width: '15%', alignItems: 'flex-end', }}>
                  <TouchableOpacity style={{ width: '100%', alignItems: 'flex-end' }} onPressOut={() => { this.setState({ modalVisible: true }) }}>
                    <Image source={require('../../../assets/icons/dot.png')} style={{ width: 6, height: 24, resizeMode: 'contain' }} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={{ paddingBottom: 130, width: '95%', paddingTop: 10, alignSelf: 'center' }}>
              <FlatList
                data={this.state.data1}
                showsVerticalScrollIndicator={false}
                ref={ref => (this.FlatListRef = ref)} // assign the flatlist's ref to your component's FlatListRef...
                onContentSizeChange={() => this.FlatListRef.scrollToEnd()} // scroll it
                contentContainerStyle={{ marginBottom: 200 }}
                keyboardDismissMode='interactive'
                keyboardShouldPersistTaps='always'
                renderItem={({ item, index }) => {
                  return (
                    <View style={{ width: '95%', alignSelf: 'center', paddingVertical: 7, }}>
                      {item.userid != this.state.user_id && <View style={{ alignSelf: 'flex-start', width: '70%' }}>
                        <View style={{ backgroundColor: '#d7d7d7', paddingVertical: 1.5, paddingHorizontal: 8, alignSelf: 'flex-start', borderTopStartRadius: 6, borderTopEndRadius: 6, borderBottomLeftRadius: 6 }}>
                          {item.messageType == 'text' && <Text style={{ fontSize: 14, fontFamily: 'Ubuntu-Bold', color: 'black' }}>{item.name}</Text>}
                          {item.messageType == 'image' && <TouchableOpacity >
                            <Image source={{ uri: config.img_url + item.name }} style={{ width: BannerWidth * 42 / 100, height: BannerHieght * 30 / 100, borderRadius: 5, backgroundColor: 'red' }} />
                          </TouchableOpacity>}
                          <Text style={{ fontSize: 14, fontFamily: 'Ubuntu-Regular', color: 'gray' }}>{item.time}</Text>
                        </View>
                      </View>}
                      {item.userid == this.state.user_id && <View style={{ width: '70%', alignSelf: 'flex-end', }}>
                        <View style={{ backgroundColor: Colors.theme1, borderTopStartRadius: 6, borderTopEndRadius: 6, borderBottomLeftRadius: 6, paddingVertical: 1.5, paddingHorizontal: 8, alignSelf: 'flex-end' }}>
                          {item.messageType == 'text' && <Text style={{ fontSize: 14, fontFamily: 'Ubuntu-Regular', color: '#FFFFFF' }}>{item.name}</Text>}
                          {item.messageType == 'image' && <TouchableOpacity >
                            <Image source={{ uri: config.img_url + item.name }} style={{ width: BannerWidth * 42 / 100, height: BannerHieght * 30 / 100, borderRadius: 5, backgroundColor: Colors.imagebackcolor }} />
                          </TouchableOpacity>}
                          <Text style={{ fontSize: 14, fontFamily: 'Ubuntu-Medium', color: '#FFFFFF' }}>{item.time}</Text>
                        </View>

                      </View>}
                    </View>
                  )
                }}
              />

            </View>

            <View style={{ position: 'absolute', borderTopWidth: 0.6, bottom: Platform.OS === 'ios' ? this.state.bottom : 0, left: 0, right: 0, borderTopColor: '#FFFFFF', paddingVertical: 7.5 }}>
              {this.state.data.blockstatus != 'no' &&
                <TouchableOpacity onPress={() => { alert('unblock') }}>
                  <View style={{ alignSelf: 'center', paddingVertical: 10 }}>
                    <Text style={{ color: Colors.theme1, fontSize: 15, textAlign: 'center', textAlignVertical: 'center' }}>you blocked this user.tap to unblock</Text>
                  </View>
                </TouchableOpacity>
              }
              {this.state.data.blockstatus == 'no' && <View style={{ paddingHorizontal: 20, width: '100%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>

                <View style={{ flexDirection: 'row', width: '100%', }}>
                  <TouchableOpacity style={{ height: 30, width: '10%', alignSelf: 'center', paddingTop: 4, }} onPress={() => { this.btnOpneImageOption() }}>
                    {/* <Icon name='camera' size={20} color={Colors.buttoncolor} style={{alignSelf:'center'}}/> */}
                    <Image source={require('../../../assets/icons/camera.png')} style={{ width: 25, height: 25, resizeMode: 'contain' }} />
                  </TouchableOpacity>

                  <TextInput
                    placeholder={Lang_chg.chattextinputmessage[config.language]}
                    placeholderTextColor={Colors.theme1}
                    ref={(input) => { this.chatmsg = input; }}
                    onChangeText={(txt) => { this.setState({ chatmsg: txt }) }}
                    keyboardType="default"
                    onFocus={() => { this.setState({ Numberbtn: 1, bottom: 43 }); }}
                    blurOnSubmit={true}
                    scrollEnabled={true}
                    onSubmitEditing={() => { this.setState({ bottom: 0 }) }}
                    style={{ width: '77%', paddingRight: 7, fontFamily: 'Ubuntu-Regular', paddingVertical: 8, color: 'black' }}
                  />
                  {this.state.chatmsg.length > 0 && <TouchableOpacity style={{ width: '13%', alignSelf: 'center', alignItems: 'flex-end' }} onPress={() => { this.sendmessagebtn() }}>
                    <Image source={require('../../../assets/icons/send.png')} style={{ width: 25, height: 15, resizeMode: 'contain' }} />
                  </TouchableOpacity>}

                  {this.state.chatmsg.length <= 0 && <TouchableOpacity style={{ width: '13%', alignSelf: 'center' }}>


                  </TouchableOpacity>}
                </View>

                {/* <TouchableOpacity style={{height:30,width:'10%',alignSelf:'center',paddingTop:4,}} onPress={()=>{this.btnOpneImageOption()}}>
            <Icon name='camera' size={20} color={Colors.buttoncolor} style={{alignSelf:'center'}}/>
            
        </TouchableOpacity> */}
              </View>}

            </View>
          </View>
        </KeyboardAvoidingView>

      )
    }
    else {
      return (
        // <KeyboardAvoidingView style={styles.container} behavior='padding'>


        <View style={styles.container}>
        
          <StatusBar
            hidden={false}
            backgroundColor={Colors.theme1}
            translucent={false}
            networkActivityIndicatorVisible={true}
          />
       

          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => { this.setState({ modalVisible: false }) }}
          >
            <TouchableOpacity
              style={{ flex: 1 }}
              activeOpacity={1}
              onPressOut={() => { this.setState({ modalVisible: false }) }}
            >
              <View style={{ backgroundColor: '#f5f4f2', height: 'auto', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                <View style={{ paddingTop: 15, paddingHorizontal: 20 }}>
                  <Text style={{ paddingVertical: 10, fontSize: 16, fontFamily: 'Ubuntu-Bold' }}>{Lang_chg.chataction[config.language]}</Text>
                  <TouchableOpacity onPress={() => { this.setState({ modalVisible: false }); this.permmissionsendreport() }}>
                    <Text style={{ color: 'black', fontSize: 15, fontFamily: 'Ubuntu-Regular' }}>{Lang_chg.chatreport[config.language]}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ paddingVertical: 16 }} onPress={() => { this.setState({ modalVisible: false }); this.permmissionclearchat() }}>
                    <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: 14 }}>{Lang_chg.chatclear[config.language]}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={{ paddingBottom: 15 }} onPress={() => { this.setState({ modalVisible: false }) }}>
                    <Text style={{ color: 'red', fontSize: 15, fontFamily: 'Ubuntu-Regular' }}>{Lang_chg.chatcancel[config.language]}</Text>
                  </TouchableOpacity>
                </View>

              </View>

            </TouchableOpacity>
          </Modal>

          <View style={{ paddingVertical: 14, backgroundColor: Colors.theme1, flexDirection: 'row', width: '100%', }}>
            <View style={{ width: '15%', alignSelf: 'center' }}>
              <TouchableOpacity style={{ width: '100%', paddingTop: 3 }} onPressOut={() => { this.props.navigation.goBack() }}>
                <Image source={require('../../../assets/icons/backw.png')} style={{ width: 26, height: 14, alignSelf: 'center' }} />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'center', width: '85%', }}>
              <View style={{ flexDirection: 'row', width: '80%', alignSelf: 'center' }}>

                {this.state.data.image == undefined ?
                  <Image source={require('../../../assets/icons/error.png')} style={{ width: 20, alignSelf: 'center', height: 20, resizeMode: 'contain', }} /> :
                  this.state.data.image == 'NA' ?
                    <Image source={require('../../../assets/icons/error.png')} style={{ width: 20, alignSelf: 'center', height: 20, resizeMode: 'contain' }} /> :
                    this.state.data.image == null ?
                      <Image source={require('../../../assets/icons/error.png')} style={{ width: 20, alignSelf: 'center', height: 20, resizeMode: 'contain' }} /> :
                      <Image source={{ uri: config.img_url1 + this.state.data.image }} style={{ width: 30, alignSelf: 'center', height: 30, borderRadius: 15, }} />

                }
                <Text style={{ color: 'white', fontSize: 17, fontFamily: 'Ubuntu-Bold', paddingLeft: 10 }}>{this.state.data.other_user_name}</Text>
              </View>
              <View style={{ width: '15%', alignItems: 'flex-end', }}>
                <TouchableOpacity style={{ width: '100%', alignItems: 'flex-end' }} onPressOut={() => { this.setState({ modalVisible: true }) }}>
                  <Image source={require('../../../assets/icons/dot.png')} style={{ width: 6, height: 24, resizeMode: 'contain' }} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ paddingBottom: 130, width: '95%', alignSelf: 'center', paddingTop: 10 }}>
            <FlatList
              data={this.state.data1}
              showsVerticalScrollIndicator={false}
              ref={ref => (this.FlatListRef = ref)} // assign the flatlist's ref to your component's FlatListRef...
              onContentSizeChange={() => this.FlatListRef.scrollToEnd()} // scroll it
              contentContainerStyle={{ marginBottom: 200 }}
              keyboardDismissMode='interactive'
              keyboardShouldPersistTaps='always'

              renderItem={({ item, index }) => {
                return (
                  <View style={{ width: '97%', alignSelf: 'center', paddingVertical: 7 }}>
                    {item.userid != this.state.user_id && <View style={{ alignSelf: 'flex-start', width: '70%' }}>
                      <View style={{ backgroundColor: '#d7d7d7', paddingVertical: 1.5, paddingHorizontal: 8, alignSelf: 'flex-start', borderTopStartRadius: 6, borderTopEndRadius: 6, borderBottomLeftRadius: 6 }}>
                        {item.messageType == 'text' && <Text style={{ fontSize: 14, fontFamily: 'Ubuntu-Bold', color: 'black' }}>{item.name}</Text>}
                        {item.messageType == 'image' && <TouchableOpacity activeOpacity={0.9} onPress={() => { this.props.navigation.navigate('Imagefullview', { 'images': item.name }) }}>
                          <Image source={{ uri: config.img_url + item.name }} style={{ width: BannerWidth * 42 / 100, height: BannerHieght * 30 / 100, borderRadius: 5, backgroundColor: Colors.imagebackcolor }} />
                        </TouchableOpacity>}
                        <Text style={{ fontSize: 14, fontFamily: 'Ubuntu-Regular', color: 'gray' }}>{item.time}</Text>
                      </View>
                    </View>}
                    {item.userid == this.state.user_id && <View style={{ width: '70%', alignSelf: 'flex-end', alignItems: 'flex-end', }}>
                      <View style={{ backgroundColor: Colors.theme1, borderTopStartRadius: 6, borderTopEndRadius: 6, borderBottomLeftRadius: 6, paddingVertical: 1.5, paddingHorizontal: 8, alignSelf: 'flex-end' }}>
                        {item.messageType == 'text' && <Text style={{ fontSize: 14, fontFamily: 'Ubuntu-Regular', color: '#FFFFFF' }}>{item.name}</Text>}
                        {item.messageType == 'image' && <TouchableOpacity activeOpacity={0.9} onPress={() => { this.props.navigation.navigate('Imagefullview', { 'images': item.name }) }}>
                          <Image source={{ uri: config.img_url + item.name }} style={{ width: BannerWidth * 42 / 100, height: BannerHieght * 30 / 100, borderRadius: 5, backgroundColor: Colors.imagebackcolor }} />
                        </TouchableOpacity>}
                        <Text style={{ fontSize: 14, fontFamily: 'Ubuntu-Medium', color: '#FFFFFF' }}>{item.time}</Text>
                      </View>

                    </View>}
                  </View>
                )
              }}
            />
          </View>
          <View style={{ position: 'absolute', borderTopWidth: 0.6, bottom: Platform.OS === 'ios' ? this.state.bottom : 0, left: 0, right: 0, borderTopColor: '#FFFFFF', backgroundColor: '#e3e3e3', paddingVertical: 7.5 }}>
            {this.state.data.blockstatus != 'no' &&
              <TouchableOpacity onPress={() => { this.props.navigation.navigate('Blockuser') }}>
                <View style={{ alignSelf: 'center', paddingVertical: 10 }}>
                  <Text style={{ color: Colors.theme1, fontSize: 15, textAlign: 'center', textAlignVertical: 'center' }}>you blocked this user.tap to unblock</Text>
                </View>
              </TouchableOpacity>
            }
            {this.state.data.blockstatus == 'no' && <View style={{ paddingHorizontal: 20, width: '100%', alignSelf: 'center', flexDirection: 'row', backgroundColor: '#e3e3e3', justifyContent: 'space-between' }}>

              <View style={{ flexDirection: 'row', width: '100%' }}>
                <TouchableOpacity style={{ height: 30, width: '10%', alignSelf: 'center', paddingTop: 4, }} onPress={() => { this.btnOpneImageOption() }}>
                  {/* <Icon name='camera' size={20} color={Colors.buttoncolor} style={{alignSelf:'center'}}/> */}
                  <Image source={require('../../../assets/icons/camera.png')} style={{ width: 25, height: 25, resizeMode: 'contain' }} />
                </TouchableOpacity>

                <TextInput
                  placeholder={Lang_chg.chattextinputmessage[config.language]}
                  placeholderTextColor={Colors.black}
                  ref={(input) => { this.chatmsg = input; }}
                  onChangeText={(txt) => { this.setState({ chatmsg: txt }) }}
                  keyboardType="default"
                  onFocus={() => { this.setState({ Numberbtn: 1, bottom: 43 }); }}
                  blurOnSubmit={true}
                  scrollEnabled={true}
                  onSubmitEditing={() => { this.setState({ bottom: 0 }) }}
                  style={{ width: '77%', paddingRight: 6, fontFamily: 'Ubuntu-Regular', paddingVertical: 8, color: 'black' }}
                />
                {this.state.chatmsg.length > 0 && <TouchableOpacity style={{ width: '13%', alignSelf: 'center', alignItems: 'flex-end' }} onPress={() => { this.sendmessagebtn() }}>
                  <Image source={require('../../../assets/icons/send.png')} style={{ width: 25, height: 15, resizeMode: 'contain' }} />

                </TouchableOpacity>}

                {this.state.chatmsg.length <= 0 && <TouchableOpacity style={{ width: '13%', alignSelf: 'center' }}>
                </TouchableOpacity>}
              </View>
            </View>}
          </View>
        </View>
        // </KeyboardAvoidingView>

      )
    }

  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  button: {
    backgroundColor: Colors.theme1,
    width: '90%',
    borderRadius: 8,
    paddingVertical: 8.5,
    marginTop: 7,
    marginTop: 10,
    alignSelf: 'center',
    alignItems: 'center'
  },


})