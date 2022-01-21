import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { config } from '../../Provider/configProvider';
import { localStorage } from '../../Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../../Provider/messageProvider';
//import Loader from './Loader';
// import Footer from './Footer';
import Header from '../../Components/Header';
import { apifuntion } from '../../Provider/apiProvider';
import { Lang_chg } from '../../Provider/Language_provider'
import { firebaseprovider } from '../../Provider/FirebaseProvider';
import firebase1 from '../../Provider/FirebaseConfig';
import firebase from 'firebase/compat/app';
import 'firebase/database';
import { Text, View, StyleSheet, Dimensions, ScrollView, Image, ImageBackground, FlatList, TextInput } from 'react-native'
import { back_img3, boat_img1, Colors, FontFamily, Sizes } from '../../Constants/Constants';
import { consolepro } from '../../Provider/Consoleprovider';
import AsyncStorage  from "@react-native-community/async-storage";
// import { Nodata_found } from './Nodata_found';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const BannerWidth = Dimensions.get('window').width;
const BannerHeight = Dimensions.get('window').height;

export default class Inbox extends Component {


constructor(props) {
    super(props);
    this.state = {
      Email: '',
      isConnected: true,
      loadMoreloading: false,
      pagename: 'inbox',
      page: 'message',
      inboxmessage: [],
      inboxmessage2: [],
      loading: false,
      idex1: 0,
      modalVisible1: false,
      user_id: '',
      notification_arr: 'NA',
      refresh: false,
      guest_user_check: 'no',
      show_hide_flag: false
    }
  }
  // state = {
  //     data: [
  //         {
  //             name: 'Jane',
  //             age: '33',
  //             image: require('./icons/salini.png'),
  //             message:'hello how are you'

  //         },
  //         {
  //             name: 'Jane',
  //             age: '33',
  //             image: require('./icons/elish.png'),
  //             message:'David please release amount'
  //         },
  //         {
  //             name: 'Jane',
  //             age: '33',
  //             image: require('./icons/salini.png'),
  //             message:'hello how are you'
  //         },
  //         {
  //             name: 'Jane',
  //             age: '33',
  //             image: require('./icons/elish.png'),
  //             message:'hello how are you'

  //         },
  //         {
  //             name: 'Jane',
  //             age: '33',
  //             image: require('./icons/salini.png'),
  //             message:'hello how are you'
  //         },
  //         {
  //             name: 'Jane',
  //             age: '33',
  //             image: require('./icons/elish.png'),
  //             message:'hello how are you'

  //         },
  //         {
  //             name: 'Waplog Team',
  //             age: '33',
  //             image: require('./icons/elish.png'),
  //             message:'Welcome'

  //         }
  //     ],
  // }

  checkGuestUser = async () => {
    let guest_user = await localStorage.getItemString('guest_user');
    if (guest_user == 'yes') {
      this.setState({ guest_user_check: 'yes' })
    } else {
      this.setState({ guest_user_check: 'no' })
    }
  }
  componentDidMount() {
   
    this.props.navigation.addListener('focus', () => {
     

      this.getData('user_arr');

    });
    //  const { navigation } = this.props;
    //  this.focusListener = navigation.addListener('didFocus', () => {
    //   this.showUserInbox()
    //   firebaseprovider.firebaseUserGetInboxCount();
    //  });
   // this.getMyInboxAllData1()
   // firebaseprovider.firebaseUserGetInboxCount();
   // this.showUserInbox()
  }





  getData = async (key) => {
            
    console.log('local '+key)
    try {
      const value = await AsyncStorage.getItem(key);

//          console.log('local '+value)
      
       //  console.log('array ',arrayData.email);
      if(value !== null) {
       
        const arrayData = JSON.parse(value);

       console.log(arrayData)

       this.checkGuestUser()
       this.getMyInboxAllData1(arrayData)
       this.showUserInbox(arrayData)
       firebaseprovider.firebaseUserGetInboxCount(arrayData);
       
      
      }
    } catch(e) {
      // error reading value
    }
  }




  getMyInboxAllData1 = async (userdata) => {
    console.log('159 : getMyInboxAllData');
   // userdata = await localStorage.getItemObject('user_arr')
    //------------------------------ firbase code get user inbox ---------------
    if (userdata != null) {
      // alert("himanshu");
      var id = 'u_' + userdata.user_id;
      if (inboxoffcheck > 0) {
        console.log('getMyInboxAllDatainboxoffcheck');
        var queryOffinbox = firebase1.database().ref('users/' + id + '/myInbox/').child(userChatIdGlobal);
        queryOffinbox.off('child_added');
        queryOffinbox.off('child_changed');
      }

      var queryUpdatemyinbox = firebase1.database().ref('users/' + id + '/myInbox/');
      queryUpdatemyinbox.on('child_changed', (data) => {
        console.log('inboxkachildchange', data.toJSON())

        firebaseprovider.firebaseUserGetInboxCount()
        setTimeout(() => { this.setState({ countinbox: count_inbox }) }, 2000);

        //  this.getalldata(currentLatlong)
      })
      var queryUpdatemyinboxadded = firebase1.database().ref('users/' + id + '/myInbox/');
      queryUpdatemyinboxadded.on('child_added', (data) => {
        console.log('inboxkaadded', data.toJSON())
        firebaseprovider.firebaseUserGetInboxCount()
        setTimeout(() => { this.setState({ countinbox: count_inbox }) }, 2000);

        // firebaseprovider.firebaseUserGetInboxCount();
      })

    }
  }


  convertTimeAllFormat = (time11, format) => {
    consolepro.consolelog(' convertTimeAllFormat time11', time11)
    time11 = parseInt(time11);

    var date1 = new Date(time11);

    var curr_day = date1.getDay();
    var curr_date = date1.getDate();
    var curr_month = date1.getMonth(); //Months are zero based
    var curr_year = date1.getFullYear();

    var hours = date1.getHours();
    var minutes = date1.getMinutes();

    // consoleProvider.log('hours',hours);
    // consoleProvider.log('minutes',minutes);

    if (format == 12) {
      var ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
    } else if (format == 24) {
      var ampm = hours >= 12 ? 'PM' : 'AM';
      //hours = hours < 10 ? '0'+hours : hours;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      var strTime = hours + ':' + minutes;
    } else if (format == 'other') {

      var ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      var strTimeAll = hours + ':' + minutes + ' ' + ampm;
      var strTime = curr_date + '. ' + m_names_sort[curr_month] + ' ' + curr_year + ' ' + strTimeAll;
    } else if (format == 'ago') {
      var strTime = timeSince(new Date(time11));
      //consoleProvider.log(new Date(time11));
    } else if (format == 'date_time') {
      var date = new Date(time11);

      var seconds = Math.floor((new Date() - date) / 1000);
      var interval = Math.floor(seconds / 3600);
      if (interval <= 24) {
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
      } else {
        var curr_month = date1.getMonth() + 1; //Months are zero based
        var curr_year = date1.getFullYear();
        var curr_year_small = String(curr_year);
        consolepro.consolelog('curr_year_small', curr_year_small);
        curr_year_small = curr_year_small.substring(2, 4);
        consolepro.consolelog('curr_year_small', curr_year_small);
        var strTime = curr_month + '/' + curr_date + '/' + curr_year_small;
      }
    }
    else if (format == 'date_time_full') {
      var date = new Date(time11);

      var seconds = Math.floor((new Date() - date) / 1000);
      var interval = Math.floor(seconds / 3600);
      if (interval <= 24) {
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
      } else {
        var curr_month = date1.getMonth() + 1; //Months are zero based
        var curr_year = date1.getFullYear();
        var curr_year_small = String(curr_year);
        consolepro.consolelog('curr_year_small', curr_year_small);
        curr_year_small = curr_year_small.substring(2, 4);
        consolepro.consolelog('curr_year_small', curr_year_small);

        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTimeAll = hours + ':' + minutes + ' ' + ampm;

        var strTime = curr_month + '/' + curr_date + '/' + curr_year_small + ' ' + strTimeAll;
      }
    }
    return strTime;
  }

  showUserInbox = async (userdata) => {
    consolepro.consolelog('showUserInboxmesssagepabgewala');
    //let userdata = await localStorage.getItemObject('user_arr');

   // const value = await AsyncStorage.getItem('user_arr');
    //let userdata= JSON.parse(value);
    console.log('userdata ',userdata)
    var user_id = userdata.user_id
    var login_type = userdata.login_type
    inboxoffcheck = 1
    var inbox = []
    consolepro.consolelog('FirebaseInboxJson get in-box121', FirebaseInboxJson);
    var len = FirebaseInboxJson.length;
    consolepro.consolelog('FirebaseInboxJson len', len);
    //$('.showConversationsCount').text(len);
    if (len > 0) {
      // $('#chat_meassage_inbox_list').html('');
      // $('#no_data_home').hide()
      FirebaseInboxJson.sort((a, b) => {
        var x = a.lastMsgTime, y = b.lastMsgTime;
        return x > y ? -1 : x < y ? 1 : 0;
      });
      consolepro.consolelog('FirebaseInboxJsonmessage', FirebaseInboxJson);
      console.log('FirebaseInboxJsonmessage', FirebaseInboxJson);
      let other_user_id55 = 0
      // $.each(FirebaseInboxJson,function(index,keyValue)
      for (let k = 0; k < FirebaseInboxJson.length; k++)
      // FirebaseInboxJson.map((keyValue)=>
      {
        let keyValue = FirebaseInboxJson[k]
        if (keyValue.user_id != other_user_id55) {
          consolepro.consolelog('message user_id', keyValue);
          var other_user_id = keyValue.user_id;
          var blockstatus = keyValue.block_status
          other_user_id55 = keyValue.user_id;
          consolepro.consolelog('other_user_id55', other_user_id55)
          consolepro.consolelog('other_user_id', other_user_id)
          consolepro.consolelog('FirebaseUserJson', FirebaseUserJson);
          var user_data_other = FirebaseUserJson.findIndex(x => x.user_id == other_user_id);
          consolepro.consolelog("user_data_other", user_data_other);
          if (user_data_other != -1) {
            var userDataMe = FirebaseUserJson[user_data_other];

            consolepro.consolelog('userdata', userDataMe)
            var count = keyValue.count;
            var lastMessageType = keyValue.lastMessageType;
            var lastMsg = keyValue.lastMsg;
            var lastMsgTime = keyValue.lastMsgTime;
            // var order_id=keyValue.order_id;
            // var order_number=keyValue.order_number;
            // var chat_type=keyValue.chat_type;

            consolepro.consolelog('lastMsg', lastMsg);
            var userId = userDataMe.user_id;
            if (userDataMe.login_type == 'app') {
              var userImage = config.img_url + userDataMe.image;
            }
            else {
              var userImage = userDataMe.image;
            }

            var userName = userDataMe.name;
            var onlineStatus = userDataMe.onlineStatus;

            var lastMsgShow = '';
            if (lastMessageType == 'text') {
              lastMsgShow = lastMsg;
            } else if (lastMessageType == 'image') {
              lastMsgShow = 'Photo';
            }

            var imgOnline = '';
            // if(onlineStatus == 'true'){
            //   var imgOnline='<img src="img/msg_green_dot.png" class="msg_green_dot">';
            // }
            var countHtml = '';
            consolepro.consolelog('lastMsgTime', lastMsgTime);
            if (lastMsgTime != '') {
              lastMsgTime = this.convertTimeAllFormat(lastMsgTime, 'date_time');
              // lastMsgTime=lastMsgTime
              countHtml = '';
            } else {
              lastMsgTime = '';
            }
            if (count > 0) {
              countHtml = count;
            }
            let data5 = {
              'name': userName,
              'images': userImage,
              'message': lastMsgShow,
              'time': lastMsgTime,
              'count': count,
              'other_user_id': other_user_id,
              'blockstatus': blockstatus,
              'vip_staus_me': userdata.vip_staus_me

            };
            consolepro.consolelog('lastMsgShowlastMsgShow', lastMsgShow);
            consolepro.consolelog('nilesh1 count', count);
            consolepro.consolelog('upervalapushdataconsole', data5)

            inbox.push(data5)
            consolepro.consolelog('pushdataconsoleafter', inbox)


            /*var htmlData = '<li class="item-content chat_list_'+other_user_id+'" id="chat_list_'+other_user_id+'">'+
              '<a href="/chat/'+other_user_id+'/'+userName+'/" class="item-link">'+
                '<span><img src="'+userImage+'" '+onerror_user_placeholder+'  /></span>'+
                '<content>'+
                  '<h3>'+userName+'</h3>'+
                  '<p class="lastMsgShow_'+other_user_id+'" id="lastMsgShow_'+other_user_id+'">'+lastMsgShow+'</p>'+
                '</content>'+
                '<time id="lastMsgTime_'+other_user_id+'">'+lastMsgTime+'</time>'+
                '<span id="unreadMsgCount_'+other_user_id+'">'+countHtml+'</span>'+
              '</a>'+
            '</li>';*/


            //  var onerror="this.src='img/error_default_image121.png'";
            // var htmlData = '<li id="chat_list_'+other_user_id+'_'+keyValue.order_number+'" data-position="'+keyValue.lastMsgTime+'">'+
            //    '<a href="/chat/'+other_user_id+'/'+keyValue.order_id+'/'+keyValue.order_number+'/'+keyValue.chat_type+'/">'+
            //     '<time>'+lastMsgTime+'</time>'+
            //     '<span> <img src="'+userImage+'" onerror="'+onerror+'"></span>'+
            //     '<content>'+
            //       '<h2>#'+keyValue.order_number+'</h2>'+
            //       '<h3>'+userName+'</h3>'+
            //       '<h4>'+lastMsgShow+'</h4>'+
            //     '</content>'+
            //     countHtml+
            //   '</a>'+
            //   '</li>';

            // consolepro.consolelog('nilesh2');
            // if (chat_type == 'o') {
            //   $('#chat_meassage_inbox_list').append(htmlData);
            //   $('#chat_meassage_inbox_list li').sort(sortInboxAll).appendTo('#chat_meassage_inbox_list');
            // }else if (chat_type == 's') {
            //   $('#chat_meassage_inbox_list_service').append(htmlData);
            //   $('#chat_meassage_inbox_list_service li').sort(sortInboxAll).appendTo('#chat_meassage_inbox_list_service');
            // }

          }
          consolepro.consolelog('inboxmessage', inbox)


        }

        // var length = $('#chat_meassage_inbox_list li').length;
        // var length2 = $('#chat_meassage_inbox_list_service li').length;

        // if(length==0){
        //   $('#no_data_home_order').show();    
        // }else{
        //   $('#no_data_home_order').hide();
        // }
        // if(length2==0){
        //   $('#no_data_home_service').show();    
        // }else{
        //   $('#no_data_home_service').hide();
        // }
      }
    }
    this.setState({ inboxmessage: inbox, inboxmessage2: inbox, refresh: false })
    // this.setState({inboxmessage:'NA'}) 
    // }else{
    //   $('#chat_meassage_inbox_list').html('<li class="no_found_img"><img src="img/no-result.gif" style="width: 100%;"></li>');
    //  $('#no_data_home_order').show();
    //   $('#no_data_home_service').show();
    // }
  }
  SearchFilterFunction = (text) => {
    //passing the inserted text in textinput
    let data1 = this.state.inboxmessage2
    const newData = data1.filter(function (item) {
      //applying filter for the inserted text in search bar
      const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    consolepro.consolelog(newData)
    if (newData.length > 0) {
      this.setState({
        inboxmessage: newData,
        search: text,

      });
    }
    else {
      this.setState({
        inboxmessage: 'NA',
        search: text,

      });
      this.setState({ msg: 'This Type of data is not available' })
    }

  }

  _onRefresh = () => {
    this.setState({ refresh: true })
    this.showUserInbox()
  }


  loadMore = () => {
    consolepro.consolelog('vikas')
    if (this.state.notification_arr != 'NA') {
      this.setState({
        loadMoreloading: true, page: this.state.page + 1
      }, () => {
        this.getallnotification1()
      });
    }
  }

  checkfreindstatus = async (item) => {
    let userdata = await localStorage.getItemObject('user_arr')
    let user_id = userdata.user_id
    if (this.state.isConnected == true) {
      let url = config.baseURL + "check_friendstateus.php?user_id=" + user_id + '&other_user_id=' + item.other_user_id
      consolepro.consolelog(url)
      apifuntion.getApi(url).then((obj) => {
        return obj.json();
      }).then((obj) => {
        consolepro.consolelog('obj', obj)
        console.log('obj', item)
        if (obj.success == "true") {

          if (item.vip_staus_me == 1 || obj.friend_status == 1 || obj.vip_staus_me == 1) {
            this.props.navigation.navigate('Chat', { 'chatdata': { 'other_user_id': item.other_user_id, 'other_user_name': item.name, 'image': item.images, blockstatus: item.blockstatus } })
          }
          else {
            this.props.navigation.navigate('Becomevip')
          }

        } else {
          msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
          return false;
        }
      }).catch((error) => {
        consolepro.consolelog("-------- error ------- " + error);
        this.setState({ loading: false });
      });
    }
    else {
      msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
    }
  }

  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (this.state.loadMoreloading == true) {
      return (
        <ActivityIndicator
          style={{ color: '#000' }}
        />
      );

    }
    else {
      return null
    }
  };
  _showHideInputBox = () => {
    this.setState({
      show_hide_flag: !this.state.show_hide_flag
    })
  }
  hideSearchBox = () => {
    this.setState({
      inboxmessage: this.state.inboxmessage2,
      show_hide_flag: !this.state.show_hide_flag
    })
  }
  // _searchData = (txt) => {
  //   // this.setState({ txtsrch: txt })
  //   console.log('test1', txt)
  //   let data1 = this.state.booking_arr1
  //   console.log('data', data1)
  //   if (data1 != 'NA') {
  //       var text_data = txt.toString().toLowerCase();
  //       let newData = data1.filter(function (item) {
  //           return (
  //               item.booking_no.toString().toLowerCase().indexOf(text_data) >= 0
  //           )
  //       });

  //       if (newData.length > 0) {
  //           this.setState({ booking_arr: newData })
  //       } else if (newData.length <= 0) {
  //           this.setState({ booking_arr: 'NA' })
  //       }
  //   }
  // }
  renderitem = ({ item }) => {

    if (this.state.inboxmessage.length >= 0) {
      consolepro.consolelog('titleee-', item)
      return (
        <View  style={{backgroundColor:Colors.white,flex:1,borderRadius:60}}>
           

         <View style={{backgroundColor:Colors.white,marginTop:-10,zIndex:0.9}}>
          <TouchableOpacity activeOpacity={0.9} onPress={() => { this.props.navigation.navigate('Chats', { chatdata: { 'other_user_name': item.name, image: item.images, other_user_id: item.other_user_id, 'blockstatus': 'no' } },) }}>
            <View style={{ backgroundColor: 'white', borderRadius: 12, marginBottom: 5, paddingHorizontal: 10, paddingVertical: 10, flexDirection: 'row', width: '100%', borderWidth: 0.5, borderColor: '#cfcfcf' }}>
              <View style={{ width: '15%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                {item.images == undefined ?
                  <ImageBackground imageStyle={{ borderRadius: 20 }} style={{ width: 40, height: 40, resizeMode: 'cover' }} source={require('../../../assets/icons/error.png')}>
                  </ImageBackground> :
                  item.images == 'NA' ?
                    <ImageBackground imageStyle={{ borderRadius: 20 }} style={{ width: 40, height: 40, resizeMode: 'cover' }} source={require('../../../assets/icons/error.png')}>
                    </ImageBackground> :
                    item.images == null ?
                      <ImageBackground imageStyle={{ borderRadius: 20 }} style={{ width: 40, height: 40, resizeMode: 'cover' }} source={require('../../../assets/icons/error.png')}>
                      </ImageBackground> :
                      <ImageBackground imageStyle={{ borderRadius: 20 }} style={{ width: 40, height: 40, resizeMode: 'cover' }} source={{ uri: config.img_url1 + item.images }}>
                      </ImageBackground>
                }

              </View>

              <View style={{ marginLeft: 10, width: '65%', alignSelf: 'center', }}>
                <Text style={{ fontSize: 18, fontFamily: 'Ubuntu-Bold' }}>{item.name}</Text>
                <Text style={{ fontSize: 12, fontFamily: 'Ubuntu-Regular' }}>{item.message}</Text>
              </View>
              <View style={{ width: '20%', alignSelf: 'center', alignItems: 'flex-end', right: 19 }}>
                {item.count != 0 && <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'green', width: 24, height: 24, borderRadius: 12 }}>
                  <Text style={{ color: 'white', fontSize: 12, fontFamily: 'Ubuntu-Regular' }}>{item.count}</Text>
                </View>}

                <Text style={{ fontSize: 13, fontFamily: 'Ubuntu-Regular' }}>{item.time}</Text>

              </View>
            </View>
          </TouchableOpacity>
          </View>
        </View>
      )
    }
  }
  _searchData = (txt) => {
    // this.setState({ txtsrch: txt }) inboxmessage: this.state.inboxmessage2,
    console.log('test1', txt)
    let data1 = this.state.inboxmessage2
    console.log('data', data1)
    if (data1.length > 0) {
      var text_data = txt.toString().toLowerCase();
      let newData = data1.filter(function (item) {
        return (
          item.name.toString().toLowerCase().indexOf(text_data) >= 0
        )
      });

      if (newData.length > 0) {
        this.setState({ inboxmessage: newData })
      } else if (newData.length <= 0) {
        this.setState({ inboxmessage: [] })
      }
    }
  }

  render() {

    consolepro.consolelog('titleee------', this.state.inboxmessage)
    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>

         <Header
             imgBack={true}
             notiBtn={false}
             searchBtn={this.state?.inboxmessage?.length > 0 ? true:false}
             headerHeight={200}
             name={'Messages'}
             backImgSource={require('../../Images/backgroundImg.png')}
            />
       
            {/* (this.state.show_hide_flag == true) ? */}
              {/* <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 15 }}>
                <TouchableOpacity style={{ width: '15%' }} onPress={() => { this.hideSearchBox() }} activeOpacity={0.7}>
                  <Image resizeMode="contain" style={{ width: 20, height: 20, tintColor: '#000' }} source={require('../../../assets/icons/backwhite.png')}></Image>
                </TouchableOpacity>
                <View style={{ width: '70%' }}>
                  <TextInput
                    style={{ width: '100%', borderRadius: 20, paddingLeft: 12, height: 40, paddingBottom: 10, backgroundColor: '#f8f8f8' }}
                    placeholder={Lang_chg.text_search1[config.language]}
                    onChangeText={text => this._searchData(text)}
                    returnKeyLabel='done'
                    returnKeyType='done'
                    onSubmitEditing={() => { Keyboard.dismiss() }}
                  />

                </View>
                <TouchableOpacity onPress={() => { this.hideSearchBox() }} style={{ width: '15%', alignItems: 'flex-end' }}>
                  <Image resizeMode="contain" style={{ width: 30, height: 30 }} source={require('../../../assets/icons/cross1.png')}></Image>
                </TouchableOpacity>
              </View> */}
              {/* :
               <View style={{
                flexDirection: "row",
                height: BannerWidth * 0.071,
                paddingHorizontal: BannerWidth * 0.04,
                backgroundColor: '#fff', marginTop: 15
              }}>
                <View style={{ flex: 1, justifyContent: "center" }}>

                </View>
                <View style={{ flex: 2, justifyContent: "center" }}>
                  <Text style={{ textAlign: "center", fontFamily: "Ubuntu-bold", fontWeight: "bold", fontSize: 18 }}>{Lang_chg.tittleinbox[config.language]}</Text>
                </View>
                {
                  (this.state.inboxmessage.length > 0) ? <TouchableOpacity activeOpacity={0.9} style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} onPress={() => { this._showHideInputBox() }}>
                    <Image style={{ width: 20, height: 20, }}
                      source={require('../../../assets/icons/search.png')}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                    :
                    <TouchableOpacity activeOpacity={0.9} style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                    </TouchableOpacity>
                }
              </View>
          } */}

<View style={{marginTop:-40,zIndex:1,backgroundColor:'#fff',height: '100%',width:'100%', borderTopRightRadius: 25, borderTopLeftRadius: 25}}>
          <View style={{ paddingHorizontal: 10, height: '100%', }}>
            {
              (this.state.inboxmessage.length <= 0 && this.state.guest_user_check == 'no') &&
              <TouchableOpacity activeOpacity={0.7} onPress={() => { this.props.navigation.navigate('Home') }} style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center', height: 600, width: 400 }}>
                <Image source={require('../../../assets/icons/inbox_not_found.png')} style={{ height: 100, width: 100, resizeMode: 'contain' }} />
                <View style={{ borderBottomColor: '#000', borderBottomWidth: 1 }}><Text style={{ color: "#000000" }}>{Lang_chg.inbox_not_found[config.language]}</Text></View>
              </TouchableOpacity>
            }
            {
              (this.state.guest_user_check == 'yes') &&
              <View style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center', height: 600, width: 400, }}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => { this.props.navigation.navigate('Login') }} style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center', height: 600, width: 400 }}>
                  <Image source={require('../../../assets/icons/inbox_not_found.png')} style={{ height: 100, width: 100, resizeMode: 'contain' }} />
                  <View style={{ borderBottomColor: '#000', borderBottomWidth: 1 }}><Text style={{ color: "#000000" }}>{Lang_chg.text_Please_Login_First[config.language]}</Text></View>
                </TouchableOpacity>
              </View>
            }



            <FlatList
              style={{ marginTop: 10 }}
              data={this.state.inboxmessage}
              renderItem={this.renderitem}

              keyExtractor={(item, index) => index.toString()}
            />
          </View>

          </View>

        {/* <Footer color={this.state.pagename} navigation={this.props.navigation} count_inbox={count_inbox}/> */}
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  crossimg: {
    resizeMode: 'contain',
    width: 15,
    height: 15,
    alignSelf: 'center'
  }, imgicon: {
    width: 15, height: 15, resizeMode: 'contain',
    marginTop: 5, marginRight: 10
  },
})
