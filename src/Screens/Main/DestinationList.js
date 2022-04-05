import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import {
  ActivityIndicator, FlatList, Image, ImageBackground, Modal, Share, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { AirbnbRating, Card, colors, Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import Header2 from '../../Components/Header2';
import {
  Colors,
  FontFamily
} from '../../Constants/Constants';
import { config } from '../../Provider/configProvider';
import { Lang_chg } from '../../Provider/Language_provider';
import { msgProvider } from '../../Provider/messageProvider';
//import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { UserContext } from "./UserContext";

export default class DestinationList extends Component {
  static contextType = UserContext

  constructor(props) {
    super(props);
    this.state = {
      destinations: [],
      img: [],
      trips_arr: [],
      promotions_arr: [],
      trip_type: this?.props?.route?.params?.trip_type,
      destination: this?.props?.route?.params?.item,
      destinations_arr: [],
      adver_arr: [],
      localData: [],
      addon_arr: [],
      citylist: [],
Guests:'',
      advertisment: '',
      updateState: '',
      time: '',
      getdate: '',
      date: '',
      pay_amount: '',
      booking_no: '',
      time: new Date('2020-06-12T14:42:42'),
      mode: 'time',
      modalVisible: false,
      modalVisible2: false,
      modalVisible3: false,
      location: '',
      cabin: '',
      type_gear: [],
      food: [],
      foodselected: null,
      entertainmentselected: null,
      citylistselected: null,
      entertainment: [],
      type_gearslected: null,
      isSelected: false,

      rating: '',
      short: 'none',
      calender_arr: {},
      time: '',
      getdate: '',
      date: '',
      pay_amount: '',
      booking_no: '',
      time: new Date('2020-06-12T14:42:42'),
      mode: 'time',
      isConnected: true,
      calender_arr: {},
      guest: '',
      hour: '',
      selected_date: '',
      booking_id: '',
      unavailabe_arr: 'NA',
      bookingDateTimeStart: '',
      bookingDateTimeEnd: '',
      isLoading: false
    };

    // console.log(this.props.navigation.state.params.item)
    this.foodArr = [];
    this.enterarr =[];
    this.equipmearr=[];
    this.cityarr =[];
  }

  componentDidMount() {
    // const text = this.props.navigation.getParams('item');

    let date = new Date('2020-06-12T14:42:42');

    console.log('date ', this?.props?.route?.params?.trip_type);

    this.setState({ getdate: date });

    console.log(this.state.destination , 'destination images ');

    // this.getData('user_arr');

    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      console.log('focus :>> ');
      this.setState({ isLoading: true });
      this.getData('user_arr')
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  async filterdata(user_id) {
    // console.log(
    //   'user ',
    //   this.state.trip_type,
    //   'destination ',
    //   this.state.destination.destination_id,
    // );

    // https://server3.rvtechnologies.in/My-Boat/app/app/webservice/boat_trip_type_for_add_advr.php?user_id_post=206&country_code=965

    let url =
      config.baseURL +
      'boat_trip_type_for_add_advr.php?user_id_post=' +
      user_id +
      '&country_code=965';

    // let url = 'https://myboatonline.com/app/webservice/adver_filter_user.php?user_id_post=31&trip_type=1&find_key=NA&latitude=29.3117&longitude=47.4818&search_type=by_trip&trip_type_id_send=1'

    console.log(url, 'user details url in filter array');
    try {
      // const response = await fetch('https://myboatonline.com/app/webservice/adver_filter_user.php?user_id_post=82&trip_type=all&trip_type_id_send=2&search_type=by_trip&destination_id=7&latitude=&longitude=&find_key=');
      const response = await fetch(url);
      const json = await response.json();
      console.log('json  ', json);

      if (json.success == 'true') {
        this.setState({ addon_arr: json.addon_arr != 'NA' ? json.addon_arr : [] });
        this.equipmearr =json.addon_arr[2].addon_products;
        this.setState({ type_gear: json.addon_arr[2].addon_products })

        this.foodArr = json.addon_arr[0].addon_products;
        this.setState({ food: json.addon_arr[0].addon_products })
        this.enterarr =json.addon_arr[1].addon_products ;
        this.setState({ entertainment: json.addon_arr[1].addon_products })
this.cityarr=  json.selected_City_Array ;
        this.setState({ citylist: json.selected_City_Array != 'NA' ? json.selected_City_Array : [] })

        console.log('object :>> ', this.state.type_gear);
        console.log('food :>> ', this.state.food);


        return console.log('object :>> ', this.state.addon_arr);
      } else {
      }

      // console.log(this.state.img)
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }



  onChangeCheck = (idx) => {
    console.log('id :>> ', idx);

    const array = this.state.food.map(v => {
      const newItem = Object.assign({}, v);
      newItem.isSelected = false;
      return newItem;
    });
    console.log(array, ' food before');


    array[idx].isSelected = !array[idx].isSelected;
    this.setState({
      food: array,
      foodselected: array[idx].addon_product_id,
    }, () => {
      console.log(this.state.food, 'after food');
      console.log(this.state.foodselected, 'after foodselected');
    })
  }


  onChangeselected = (idx) => {
    console.log('id :>> ', idx);

    const array = this.state.entertainment.map(v => {
      const newItem = Object.assign({}, v);
      newItem.isSelected = false;
      return newItem;
    });
    console.log(array, ' food before');


    array[idx].isSelected = !array[idx].isSelected;
    this.setState({
      entertainment: array,
      entertainmentselected: array[idx].addon_product_id
    }, () => {
      console.log(this.state.entertainment, 'after food');
      console.log(this.state.entertainmentselected, 'after foodselected');
    })
  }
  onChangedone = (idx) => {
    console.log('id :>> ', idx);

    const array = this.state.type_gear.map(v => {
      const newItem = Object.assign({}, v);
      newItem.isSelected = false;
      return newItem;
    });
    console.log(array, ' food before');


    array[idx].isSelected = !array[idx].isSelected;
    this.setState({
      type_gear: array,
      type_gearslected: array[idx].addon_product_id
    }, () => {
      console.log(this.state.type_gear, 'after food');
      console.log(this.state.type_gearslected, 'after foodselected');
    })
  }

  _oncityselected = (idx) => {
    console.log('id :>> ', idx);

    const array = this.state.citylist.map(v => {
      const newItem = Object.assign({}, v);
      newItem.isSelected = false;
      return newItem;
    });
    console.log(array, ' food before');


    array[idx].isSelected = !array[idx].isSelected;
    this.setState({
      citylist: array,
      citylistselected: array[idx].city_id
    }, () => {
      console.log(this.state.citylist, 'after food');
      console.log(this.state.citylistselected, 'after foodselected');
    })
  }
  updateState = () => {
    this.setState({
      updateState: !this.state.updateState
    });
  }
  getData = async key => {
    this.setState({
      isLoading: true
    })
    console.log('local ' + key);
    try {
      const value = await AsyncStorage.getItem(key);

      //          console.log('local '+value)

       console.log('value 93', value);
      if (value !== null) {
        const arrayData = JSON.parse(value);

        console.log(arrayData);
        this.setState({ localData: arrayData, isLoading: false });
        this.ProfileDetail(arrayData.user_id);
        this.filterdata(arrayData.user_id);
      } else {
        this.ProfileDetail(null);
      }
    } catch (e) {
      // error reading value
      console.log(e, 'coming in err');
    }
  };

  Goto() {
    console.log('goto');
    this.props.navigation.navigate('GoogleMap', {
      adver_arr: this.state.adver_arr,
      arry : this.state.destination,
      type: 1
    });
  }


  Filter = () => {
    this.setState({ modalVisible: true });
  };

  Selectdate = () => {
    this.setState({ modalVisible3: true });
  };

  Price = () => {
    this.setState({ modalVisible2: true });
  };

  async ProfileDetail(user_id) {
     console.log(
      'user ',
      this.state.trip_type,
      'destination ',
      this.state.destination.destination_id,
    );

    let url =
      config.baseURL +
      'adver_filter_user.php?user_id_post=' +
      user_id +
      '&latitude=29.3117&longitude=47.4818&find_key=NA&trip_type=all&trip_type_id_send=' +
      this.state.trip_type +
      '&search_type=by_trip&sort_key=none&destination_id=' +
      this.state.destination.destination_id +
      '&filter_rating=0&filter_guest=0&filter_cabin=0&filter_price=0&filter_toilet=0';
    // let url = 'https://myboatonline.com/app/webservice/adver_filter_user.php?user_id_post=31&trip_type=1&find_key=NA&latitude=29.3117&longitude=47.4818&search_type=by_trip&trip_type_id_send=1'

      console.log(url, 'user details url');
    try {
      // const response = await fetch('https://myboatonline.com/app/webservice/adver_filter_user.php?user_id_post=82&trip_type=all&trip_type_id_send=2&search_type=by_trip&destination_id=7&latitude=&longitude=&find_key=');
      const response = await fetch(url);
      const json = await response.json();
       console.log('json123', json);

      if (json.success == 'true') {
        this.setState({ adver_arr: json.adver_arr != 'NA' ? json.adver_arr : [] });
      } else {
      }

      // console.log(this.state.img)
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  _selectDate = async date => {
    console.log('date ', date);

    this.setState({ selected_date: date });
    if (this.state.unavailabe_arr != 'NA') {
      var i = this.state.unavailabe_arr.findIndex(x => x.date == date);
      if (i >= 0) {
        msgProvider.toast(Lang_chg.owner_not_avail[config.language], 'center');
        return false;
      } else {
        delete this.state.calender_arr[this.state.date];
        this.state.calender_arr[date] = {
          selected: true,
          selectedColor: Colors.orange,
        };
        this.setState({
          date: date,
          calender_arr: { ...this.state.calender_arr, date: date },
        });
        // console.log(this.state.calender_arr);

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
      this.state.calender_arr[date] = { selected: true, selectedColor: Colors.orange };
      this.setState({
        date: date,
        calender_arr: { ...this.state.calender_arr, date: date },
      });

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

  gotoBack = () => {
    this.setState({ modalVisible: false });
    this.setState({ modalVisible2: false });
    this.setState({ modalVisible3: false });
  };

  reset() {
    this.setState({
      citylist: this.cityarr,
      // cabin: '',
      type_gear: this.equipmearr,
      food: this.foodArr,
      rating: '',
      advertisment: '',
      cabin: '',
      entertainment: this.enterarr,
      Guests:'',
    });
  }

  async addFavorite(item) {
    console.log(item);

    console.log(
      'user ',
      this.state.trip_type,
      'destination ',
      this.state.destination.destination_id,
    );

    let url =
      config.baseURL +
      'add_rm_fav.php?user_id_post=' +
      this.state.localData.user_id +
      '&advertisement_id=' +
      item.advertisement_id +
      '&type=single';
    // let url = 'https://myboatonline.com/app/webservice/adver_filter_user.php?user_id_post=31&trip_type=1&find_key=NA&latitude=29.3117&longitude=47.4818&search_type=by_trip&trip_type_id_send=1'

    console.log(url);
    try {
      // const response = await fetch('https://myboatonline.com/app/webservice/adver_filter_user.php?user_id_post=82&trip_type=all&trip_type_id_send=2&search_type=by_trip&destination_id=7&latitude=&longitude=&find_key=');
      const response = await fetch(url);
      const json = await response.json();
       console.log('json  in addfav/*', json);

      if (json.success == 'true') {
        msgProvider.toast(json.msg[config.language], 'center');
        this.getData('user_arr');
        //  this.setState({adver_arr:json.adver_arr})
      } else {
      }

      // console.log(this.state.img)
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }



  onShare = async (imgUrl) => {
     console.log(imgUrl, 'link');

    try {
      const result = await Share.share({
        title: 'My Boat',
        url: imgUrl
      });
      console.log(result, 'result on share >>>>>>>>>>>>>>>>>');
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  async ShowResult() {

    console.log(
      'user ',
      this.state.trip_type,
      'destination ',
      this.state.destination.destination_id,
    );

    let url =
      config.baseURL +
      'adver_filter_user.php?user_id_post=' +
      this.state.localData.user_id +
      '&latitude=29.3117&longitude=47.4818&find_key=NA&trip_type=all&trip_type_id_send=' +
      this.state.trip_type +
      '&search_type=by_trip&destination_id=' +
      this.state.destination.destination_id +
      '&filter_rating=' +
      this.state.rating +
      '&filter_guest=' + this.state.Guests
      + '&filter_cabin=' +
      this.state.cabin +
      '&filter_price=0&filter_toilet=0' + '&filter_food=' +
      this.state.foodselected + '&filter_entertainment=' + this.state.entertainmentselected +
      '&filter_citylist=' + this.state.citylistselected + '&filter_advertisement=' + this.state.advertisment +
      '&filter_equipement=' + this.state.type_gearslected + "&choose_date=" + this.state.calender_arr.date  +
      '&sort_key=' +
      this.state.short;
    // let url = 'https://myboatonline.com/app/webservice/adver_filter_user.php?user_id_post=31&trip_type=1&find_key=NA&latitude=29.3117&longitude=47.4818&search_type=by_trip&trip_type_id_send=1'

      console.log(url);
    try {
      // const response = await fetch('https://myboatonline.com/app/webservice/adver_filter_user.php?user_id_post=82&trip_type=all&trip_type_id_send=2&search_type=by_trip&destination_id=7&latitude=&longitude=&find_key=');
      const response = await fetch(url);
      const json = await response.json();
      console.log('json  ', json);

      if (json.success == 'true') {
        this.setState({ modalVisible: false });
        this.setState({ modalVisible2: false });
        this.setState({ modalVisible3: false });

        if (json && json.adver_arr != "NA") {
          this.setState({ adver_arr: json.adver_arr });
        } else {
          this.setState({ adver_arr: [] });
        }
      }
    } catch (error) {
      console.log(error);
      this.setState({ modalVisible: false });
      this.setState({ modalVisible2: false });
      this.setState({ modalVisible3: false });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    console.log('this.state.adver_arrin destibnation:>> ', this.state.adver_arr);
    console.log('this.state.advertisment :>> ', this.state.advertisment);
    console.log('cityselected :>> ', this.state.citylistselected);
    console.log('typegearslected :>> ', this.state.type_gearslected);
    console.log('food selected :>> ', this.state.foodselected);
    console.log('entertainmentslected :>> ', this.state.entertainmentselected);
    console.log('rating :>> ', this.state.rating);
    console.log('cabin :>> ', this.state.cabin);
    console.log('destiation :>> ', this.state.destination);
    console.log('destiation :>> ', this.state.calender_arr);


    const user = this.context
console.log('context in home', user);

    return (
      <View style={{ backgroundColor: Colors.white, flex: 1 }}>
        <Header2
          imgBack={true}
          backBtn={true}

          backImgSource={{
            uri:
            config.image_url4 + this.state.destination.image
          }}
          name={ user.value == 1 ? this.state.destination.destination_name_arabic :this.state.destination.destination_name}
          searchBtn={false}
          headerHeight={300}
        />
        <View
          style={{
            backgroundColor: '#fff',
            height: 40,
            width: '82%',
            marginTop: '-45%',
            alignSelf: 'center',
            borderRadius: 30,
            flexDirection: 'row',
            borderColor: Colors.orange,
            borderWidth: 1,
            shadowColor: '#fff',
            shadowOffset: { width: 500, height: 500 },
            shadowOpacity: 0.8,
            shadowRadius: 0,
            elevation: 5,
          }}>
          <TouchableOpacity style={s.col} onPress={() => this.Price()}>
            <Image
              source={require('../../../assets/icons/updown.png')}
              style={s.icons}
            />
            <Text
              style={{
                fontSize: 11,
                marginLeft: 5,
                color: '#0A8481',
                fontFamily: 'Montserrat-Regular',
              }}>
                         {user.value ==1 ? Lang_chg.Sortby[1] :Lang_chg.Sortby[0] }
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.col} onPress={() => this.Filter()}>
            <Image
              source={require('../../../assets/icons/filter_icon.png')}
              style={s.icons}
            />
            <Text
              style={{
                marginLeft: 7,
                fontSize: 11,
                padding: 5,
                color: '#0A8481',
                fontFamily: 'Montserrat-Regular',
              }}>
                          {user.value ==1 ? Lang_chg.text_filter[1] :Lang_chg.text_filter[0] }{' '}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.Goto()}
            style={[
              s.col,
              { borderRightColor: 'transparent', borderRightWidth: 0 },
            ]}>
            <Image
              source={require('../../../assets/icons/map_icon.png')}
              style={[s.icons, { height: 18 }]}
              resizeMode="contain"
            />
            <Text
              style={{
                margin: 7,
                fontSize: 11,
                marginLeft: -1,
                padding: 5,
                color: '#0A8481',
                fontFamily: 'Montserrat-Regular',
              }}>
                          {user.value == 1 ? Lang_chg.map[1] : Lang_chg.map[0]}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => this.Selectdate()}
          style={{
            backgroundColor: '#fff',
            height: 40,
            width: '82%',
            marginTop: 10,
            alignSelf: 'center',
            borderRadius: 30,
            borderColor: Colors.orange,
            shadowColor: '#fff',
            shadowOffset: { width: 500, height: 500 },
            shadowOpacity: 0.8,
            shadowRadius: 0,
            elevation: 5,
          }}>
          <Text style={s.select_date}> {user.value == 1 ? Lang_chg.Choose_from_library_txt[1] : Lang_chg.Choose_from_library_txt[0]}</Text>
        </TouchableOpacity>

        <View
          style={{
            // marginBottom: '60%',
            backgroundColor: Colors.white,
            borderTopLeftRadius: 25,
            borderTopEndRadius: 25,
            marginTop: 40,
            flex: 1
          }}>

          <FlatList
            data={this.state.adver_arr}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <View style={{ padding: 5 }}>
                  <TouchableOpacity
                    onPress={() => {
                      if (this.state.localData && this.state.localData.length == 0) {
                        alert('You need to login first.')
                        return this.props.navigation.navigate('Login');
                      }
                      console.log(this.state.localData, 'localDatalocalData');
                      this.props.navigation.navigate('TripTypeDetail', {
                        item: item,
                        list: '1'
                      })
                    }
                    }
                  >
                    <Card
                      containerStyle={{
                        padding: 0,
                        borderRadius: 15,
                        paddingHorizontal: 0,
                        margin: 7.5,
                        marginHorizontal: 10,
                        elevation: 5,
                      }}>
                      <ImageBackground
                        style={s.ImageBackground}
                        resizeMode="cover"
                        imageStyle={s.imgStyle}
                        source={{ uri: config.image_url4 + item.image }}
                        >
{item.discount  != "0.00" ? <View style={[{
                        justifyContent: 'center'
                      }, s.trapezoid_discount]}>
                        <Text style={{
                          position: "absolute",
                          fontFamily: FontFamily.semi_bold,
                          fontSize: 11,
                          alignSelf: "center",
                          color: Colors.white
                        }}>
                          {item.discount} OFF
                        </Text>
                      </View> : null }
                        <TouchableOpacity
                          style={{ position: 'absolute', right: 10, padding: 3, top: 7, backgroundColor: Colors.orange, borderRadius: 20 }}
                          onPress={() => this.addFavorite(item)}
                        >
                          {item.fav == "yes" ? (<Icon
                            name="heart"
                            size={20}
                            type="entypo"

                            color={Colors.red}
                          />) : (<Icon
                            name="heart"
                            size={20}
                            type="entypo"
                            color={Colors.white}
                          />)}

                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => this.onShare(config.baseURL + 'images/' + item.image)}
                          style={{ position: 'absolute', right: 50, top: 7, padding: 3, backgroundColor: Colors.orange, borderRadius: 20 }}>
                          <Icon
                            name="share"
                            size={20}
                            type="entypo"
                            color={Colors.white}
                          />
                        </TouchableOpacity>
                        {/* Price */}
                        <View
                          style={[
                            {
                              height: 50,
                              backgroundColor: Colors.white,
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'center',
                              position: 'absolute',
                              right: 35,
                              bottom: -1,
                              paddingHorizontal: 10,
                              borderTopLeftRadius: 12,
                              borderTopRightRadius: 12,
                            },
                          ]}>
                          <Text style={s.place}>
                            starting{'\n'}KD {item.price}
                          </Text>
                        </View>
                      </ImageBackground>
                      {/*  */}
                      <View style={s.SEC3}>
                        <View style={{ flex: 1 }}>
                          <View style={{ flexDirection: 'row', height: 30, justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                            <Text style={s.title}>{item.boat_name}</Text>
                            {/* <TouchableOpacity
                          style={{position: 'absolute', right: 10,padding: 10, top: -5}}
                          onPress={() => this.addFavorite(item)}>
                            {item.fav == "yes" ?( <Icon
                            name="heart"
                            size={20}
                            type="entypo"
                            color={Colors.red }
                          />) : (<Icon
                            name="heart"
                            size={20}
                            type="entypo"
                            color={Colors.black1 }
                          />)}
                          
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{position: 'absolute', right: 50,padding: 10, top: -5}}>
                          <Icon
                            name="share"
                            size={20}
                            type="entypo"
                            color={Colors.black}
                          />
                        </TouchableOpacity> */}
                          </View>
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 5,
                              }}>
                              <Image
                                style={{
                                  height: 40,
                                  width: 40,
                                  borderRadius: 20,
                                  resizeMode: 'cover',
                                }}
                                source={{
                                  uri: config.image_url4 + item.image,
                                }}
                                PlaceholderContent={
                                  <ActivityIndicator
                                    size={30}
                                    color={Colors.orange}
                                    style={{ alignSelf: 'center' }}
                                  />
                                }
                              />
                              <View style={{ marginLeft: 5 }}>
                                <Text
                                  style={{
                                    color: 'rgba(51, 51, 51, 1)',
                                    fontSize: 14,
                                    fontFamily: FontFamily.default,
                                  }}>
                                  {item.user_name}
                                </Text>
                                <AirbnbRating
                                  showRating={false}
                                  size={12}
                                  isDisabled
                                  defaultRating={item.rating}
                                  starContainerStyle={{ alignSelf: 'flex-start' }}
                                />
                              </View>
                            </View>
                            <View>
                              <Text
                                style={{
                                  color: 'rgba(51, 51, 51, 1)',
                                  fontSize: 12,
                                  fontFamily: FontFamily.default,
                                }}>
                                {item?.destination_name}
                              </Text>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  alignSelf: 'flex-end',
                                }}>
                                <Icon name="person" size={14} />
                                <Text
                                  style={{
                                    color: 'rgba(51, 51, 51, 1)',
                                    fontSize: 10,
                                    fontFamily: FontFamily.default,
                                  }}>
                                  {item?.no_of_people} Person
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>

                      </View>
                    </Card>
                  </TouchableOpacity>
                </View>
              );
            }}
            keyExtractor={(i, ind) => ind}
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={{
              paddingBottom: 10,
            }}
            // ListEmptyComponent={this}
            ListEmptyComponent={() =>
              this.state.adver_arr &&
              this.state.adver_arr.length >= 0 && (
                <Text style={{
                  alignSelf: 'center',
                  marginTop: 20,
                  color: colors.orange,
                  // fontFamily: fonts.semiBold,
                  fontWeight: 'bold'
                }}>No Request found</Text>
              )
            }
          />
        </View>


        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            // this.closeButtonFunction()
            this.setState({ modalVisible: false });
          }}>
          <View
            style={{
              height: '72%',
              marginTop: 'auto',
              backgroundColor: '#fff',
              fontFamily: 'Montserrat-Regular',
              borderRadius: 30,
            }}>



            <ScrollView>
              {/* <View >
      <Text>This is Half Modal</Text>
    </View>
    <TouchableOpacity
      onPress={() => {
        this.setState({modalVisible:false});
      }}>
      <Text>Close</Text>
    </TouchableOpacity> */}

              <View>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    fontSize: 18,
                    marginTop: 8,
                  }}>
                  Filter
                </Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                <TouchableOpacity
                  onPress={() => this.gotoBack()}

                  style={{

                    alignItems: 'flex-start',
                    marginTop: -25,
                    marginLeft: 20,

                    borderRadius: 25

                  }}>
                  <Icon

                    name="x-circle"
                    type="feather"
                    size={26}
                    color={Colors.orange}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.reset()}

                  style={{
                    alignItems: 'flex-end',
                    marginTop: -30,
                    marginRight: 30,
                    borderRadius: 25
                  }}>
                  <Text style={{
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    fontSize: 15,
                    marginTop: 8,
                    color: Colors.orange
                  }}>Reset</Text>
                </TouchableOpacity>
              </View>

              <View>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 18,
                    fontWeight: 'bold',
                    padding: 8,
                  }}>
                  Pickup Location
                  {/* {this.state.entertainment && this.state.entertainment?.addon_name?.length > 0 && this.state.entertainment?.addon_name[0]} */}
                </Text>


                <FlatList
                  extraData={this.state.citylist}
                  showsHorizontalScrollIndicator={false}
                  numColumns={3}
                  data={this.state.citylist}
                  // data={dateWiseList}
                  renderItem={({ item, index }) => {
                    return (
                      <View style={{}}>
                        <TouchableOpacity
                          //  onPress={() => this.setState({ type_gear: 'full' })}
                          onPress={() => this._oncityselected(index)}
                        >
                          <View
                            style={{
                              borderColor: item.isSelected ? Colors.orange : '#000',
                              backgroundColor: item.isSelected ? Colors.orange : 'white',
                              borderWidth: 1,
                              padding: 8,
                              margin: 8,
                              width: 100,
                              alignSelf: 'center',
                              borderRadius: 15,
                            }}>
                            <Text
                              style={{
                                alignSelf: 'center',

                                color:
                                  item.isSelected ? 'white' : Colors.orange,
                              }}>
                              {item && item?.city}

                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>

                    );
                  }}
                  keyExtractor={(i, ind) => ind}
                // ListHeaderComponent={() =>
                //   !this.state.entertainment.addon_products.length ? (
                //     <Text >No data found</Text>
                //   ) : null
                // }
                />

              </View>
              {/* <Text
                style={{
                  color: Colors.black,
                  fontSize: 18,
                  fontWeight: 'bold',
                  padding: 8,
                }}>
         Pickup From
              </Text>

              <View style={{ flexDirection: 'row', marginTop: -10 }}>
                <View style={{ width: '30%' }}>
                  <TouchableOpacity
                    onPress={() => this.setState({ location: 'fail' })}>
                    <View
                      style={{
                        borderColor:
                          this.state.location != 'fail' ? 'grey' : '#fff',
                        backgroundColor:
                          this.state.location != 'fail' ? '#fff' : Colors.orange,
                        borderWidth: 1,
                        padding: 8,
                        margin: 8,
                        width: 100,
                        alignSelf: 'center',
                        borderRadius: 15,
                      }}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          color:
                            this.state.location != 'fail'
                              ? Colors.orange
                              : '#fff',
                        }}>
                        Fail
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={{ width: '30%' }}>
                  <TouchableOpacity
                    onPress={() => this.setState({ location: 'Al Jhara' })}>
                    <View
                      style={{
                        borderColor:
                          this.state.location != 'Al Jhara' ? 'grey' : '#fff',
                        backgroundColor:
                          this.state.location != 'Al Jhara'
                            ? '#fff'
                            : Colors.orange,
                        borderWidth: 1,
                        padding: 8,
                        margin: 8,
                        width: 100,
                        alignSelf: 'center',
                        borderRadius: 15,
                      }}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          color:
                            this.state.location != 'Al Jhara'
                              ? Colors.orange
                              : '#fff',
                        }}>
                        Al Jhara
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{ width: '30%' }}>
                  <TouchableOpacity         
             onPress={() =>  {
              this.props.navigation.navigate('Citylist', {
                item: this.state.citylist,
              
              })
              this.gotoBack()}
            
            }
                    >
                    <View
                      style={{
                        borderColor:
                           '#fff',
                      
                        borderWidth: 1,
                        padding: 8,
                        margin: 8,
                        width: 100,
                        alignSelf: 'center',
                        borderRadius: 15,
                      }}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          color:
                            Colors.orange                       }}>
             {this.state.updateState ? this.state.updateState : 'View all'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View> */}
              <Text
                style={{
                  color: Colors.black,
                  fontSize: 18,
                  fontWeight: 'bold',
                  padding: 8,
                }}>
                Advertisement
              </Text>

              <View style={{ flexDirection: 'row', marginTop: -10 }}>
                <View style={{ width: '30%' }}>
                  <TouchableOpacity
                    onPress={() => this.setState({ advertisment: ' Public' })}>
                    <View
                      style={{
                        borderColor:
                          this.state.advertisment != ' Public' ? 'grey' : '#fff',
                        backgroundColor:
                          this.state.advertisment != ' Public' ? '#fff' : Colors.orange,
                        borderWidth: 1,
                        padding: 8,
                        margin: 8,
                        width: 100,
                        alignSelf: 'center',
                        borderRadius: 15,
                      }}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          color:
                            this.state.advertisment != ' Public'
                              ? Colors.orange
                              : '#fff',
                        }}>
                        Public
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={{ width: '30%' }}>
                  <TouchableOpacity
                    onPress={() => this.setState({ advertisment: 'Private' })}>
                    <View
                      style={{
                        borderColor:
                          this.state.advertisment != 'Private' ? 'grey' : '#fff',
                        backgroundColor:
                          this.state.advertisment != 'Private'
                            ? '#fff'
                            : Colors.orange,
                        borderWidth: 1,
                        padding: 8,
                        margin: 8,
                        width: 100,
                        alignSelf: 'center',
                        borderRadius: 15,
                      }}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          color:
                            this.state.advertisment != 'Private'
                              ? Colors.orange
                              : '#fff',
                        }}>
                        Private
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>


              <Text
                style={{
                  color: Colors.black,
                  fontSize: 18,
                  fontWeight: 'bold',
                  padding: 8,
                  marginTop: -6,
                }}>
                Cabin
              </Text>

              <View style={{ flexDirection: 'row', marginTop: -10 }}>
                <TouchableOpacity onPress={() => this.setState({ cabin: '1' })}>
                  <View
                    style={{
                      borderColor: this.state.cabin != '1' ? 'grey' : '#fff',
                      backgroundColor:
                        this.state.cabin != '1' ? '#fff' : Colors.orange,
                      borderWidth: 1,
                      padding: 8,
                      margin: 8,
                      width: 60,
                      alignSelf: 'center',
                      borderRadius: 15,
                    }}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        color: this.state.cabin != '1' ? Colors.orange : '#fff',
                      }}>
                      1
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.setState({ cabin: '2' })}>
                  <View
                    style={{
                      borderColor: this.state.cabin != '2' ? 'grey' : '#fff',
                      backgroundColor:
                        this.state.cabin != '2' ? '#fff' : Colors.orange,
                      borderWidth: 1,
                      padding: 8,
                      margin: 8,
                      width: 60,
                      alignSelf: 'center',
                      borderRadius: 15,
                    }}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        color: this.state.cabin != '2' ? Colors.orange : '#fff',
                      }}>
                      2
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.setState({ cabin: '3' })}>
                  <View
                    style={{
                      borderColor: this.state.cabin != '3' ? 'grey' : '#fff',
                      backgroundColor:
                        this.state.cabin != '3' ? '#fff' : Colors.orange,
                      borderWidth: 1,
                      padding: 8,
                      margin: 8,
                      width: 60,
                      alignSelf: 'center',
                      borderRadius: 15,
                    }}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        color: this.state.cabin != '3' ? Colors.orange : '#fff',
                      }}>
                      3
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.setState({ cabin: '4' })}>
                  <View
                    style={{
                      borderColor: this.state.cabin != '4' ? 'grey' : '#fff',
                      backgroundColor:
                        this.state.cabin != '4' ? '#fff' : Colors.orange,
                      borderWidth: 1,
                      padding: 8,
                      margin: 8,
                      width: 60,
                      alignSelf: 'center',
                      borderRadius: 15,
                    }}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        color: this.state.cabin != '4' ? Colors.orange : '#fff',
                      }}>
                      4
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.setState({ cabin: '5' })}>
                  <View
                    style={{
                      borderColor: this.state.cabin != '5' ? 'grey' : '#fff',
                      backgroundColor:
                        this.state.cabin != '5' ? '#fff' : Colors.orange,
                      borderWidth: 1,
                      padding: 8,
                      margin: 8,
                      width: 60,
                      alignSelf: 'center',
                      borderRadius: 15,
                    }}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        color: this.state.cabin != '5' ? Colors.orange : '#fff',
                      }}>
                      5
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <Text
                style={{
                  color: Colors.black,
                  fontSize: 18,
                  fontWeight: 'bold',
                  padding: 8,
                }}>
                Guests
              </Text>

              <View style={{ flexDirection: 'row', marginTop: -10 }}>
                <View style={{ width: '30%' }}>
                  <TouchableOpacity onPress={() => this.setState({ Guests: '1 - 3' })}>
                    <View
                      style={{
                        borderColor: this.state.Guests != '1 - 3' ? 'grey' : '#fff',
                        backgroundColor:
                          this.state.Guests != '1 - 3' ? '#fff' : Colors.orange,
                        borderColor: 'grey',
                        borderWidth: 1,
                        padding: 8,
                        margin: 8,
                        width: 100,
                        alignSelf: 'center',
                        borderRadius: 15,
                      }}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          color:
                            this.state.Guests != '1 - 3' ? Colors.orange : '#fff',
                        }}>
                        1 - 3
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={{ width: '30%' }}>
                  <TouchableOpacity onPress={() => this.setState({ Guests: '4 - 6' })}>
                    <View
                      style={{
                        borderColor: this.state.Guests != '4 - 6' ? 'grey' : '#fff',
                        backgroundColor:
                          this.state.Guests != '4 - 6' ? '#fff' : Colors.orange,
                        borderColor: 'grey',
                        borderWidth: 1,
                        padding: 8,
                        margin: 8,
                        width: 100,
                        alignSelf: 'center',
                        borderRadius: 15,
                      }}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          color:
                            this.state.Guests != '4 - 6' ? Colors.orange : '#fff',
                        }}>
                        4 - 6
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={{ width: '30%' }}>
                  <TouchableOpacity onPress={() => this.setState({ Guests: '7 - 9' })}>
                    <View
                      style={{
                        borderColor: this.state.Guests != '7 - 9' ? 'grey' : '#fff',
                        backgroundColor:
                          this.state.Guests != '7 - 9' ? '#fff' : Colors.orange,
                        borderColor: 'grey',
                        borderWidth: 1,
                        padding: 8,
                        margin: 8,
                        width: 100,
                        alignSelf: 'center',
                        borderRadius: 15,
                      }}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          color:
                            this.state.Guests != '7 - 9' ? Colors.orange : '#fff',
                        }}>
                       7 - 9
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '30%' }}>
                  <TouchableOpacity onPress={() => this.setState({ Guests: '10+' })}>
                    <View
                      style={{
                        borderColor: this.state.Guests != '10+' ? 'grey' : '#fff',
                        backgroundColor:
                          this.state.Guests != '10+' ? '#fff' : Colors.orange,
                        borderColor: 'grey',
                        borderWidth: 1,
                        padding: 8,
                        margin: 8,
                        width: 100,
                        alignSelf: 'center',
                        borderRadius: 15,
                      }}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          color:
                            this.state.Guests != '10+' ? Colors.orange : '#fff',
                        }}>
                        10+
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <View>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 18,
                    fontWeight: 'bold',
                    padding: 8,
                  }}>
                  Food
                  {/*  need to change form addon_arr */}
                  {/* {this.state.food && this.state.food?.addon_name?.length > 0 && this.state.food?.addon_name[0]} */}
                </Text>


                <FlatList
                  extraData={this.state.food}
                  showsHorizontalScrollIndicator={false}
                  numColumns={3}
                  data={this.state.food}
                  renderItem={({ item, index }) => {
                    return (
                      <View style={{}}>
                        <TouchableOpacity
                          onPress={() => this.onChangeCheck(index)}  >
                          <View
                            style={{
                              borderColor: item.isSelected ? Colors.orange : '#000',
                              backgroundColor: item.isSelected ? Colors.orange : 'white',
                              borderWidth: 1,
                              padding: 8,
                              margin: 8,
                              width: 100,
                              alignSelf: 'center',
                              borderRadius: 15,
                            }}>
                            <Text
                              style={{
                                alignSelf: 'center',
                                color:
                                  item.isSelected ? 'white' : Colors.orange,
                              }}>
                              {item && item?.addon_product_name && item?.addon_product_name?.length > 0 ? item?.addon_product_name[0] : null}

                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>

                    );
                  }}
                  keyExtractor={(i, ind) => ind}
                // ListHeaderComponent={() =>
                //   !this.state.food ? (
                //     <Text >No data found</Text>
                //   ) : null
                // }
                />

              </View>

              <View>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 18,
                    fontWeight: 'bold',
                    padding: 8,
                  }}>
                  Entertainment
                  {/* {this.state.entertainment && this.state.entertainment?.addon_name?.length > 0 && this.state.entertainment?.addon_name[0]} */}
                </Text>


                <FlatList
                  extraData={this.state.entertainment}
                  showsHorizontalScrollIndicator={false}
                  numColumns={3}
                  data={this.state.entertainment}
                  // data={dateWiseList}
                  renderItem={({ item, index }) => {
                    return (
                      <View style={{}}>
                        <TouchableOpacity
                          //  onPress={() => this.setState({ type_gear: 'full' })}
                          onPress={() => this.onChangeselected(index)}
                        >
                          <View
                            style={{
                              borderColor: item.isSelected ? Colors.orange : '#000',
                              backgroundColor: item.isSelected ? Colors.orange : 'white',
                              borderWidth: 1,
                              padding: 8,
                              margin: 8,
                              width: 100,
                              alignSelf: 'center',
                              borderRadius: 15,
                            }}>
                            <Text
                              style={{
                                alignSelf: 'center',

                                color:
                                  item.isSelected ? 'white' : Colors.orange,
                              }}>
                              {item && item?.addon_product_name && item?.addon_product_name?.length > 0 ? item?.addon_product_name[0] : null}

                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>

                    );
                  }}
                  keyExtractor={(i, ind) => ind}
                // ListHeaderComponent={() =>
                //   !this.state.entertainment.addon_products.length ? (
                //     <Text >No data found</Text>
                //   ) : null
                // }
                />

              </View>


              <View>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 18,
                    fontWeight: 'bold',
                    padding: 8,
                  }}>
                  Equpments
                  {/* {this.state.type_gear && this.state.type_gear?.addon_name?.length > 0 && this.state.type_gear?.addon_name[0]} */}
                </Text>


                <FlatList
                  extraData={this.state.type_gear}

                  showsHorizontalScrollIndicator={false}
                  numColumns={3}
                  data={this.state.type_gear}
                  // data={dateWiseList}
                  renderItem={({ item, index }) => {
                    return (
                      <View style={{}}>
                        <TouchableOpacity
                          onPress={() => this.onChangedone(index)}

                        >
                          <View
                            style={{
                              borderColor: item.isSelected ? Colors.orange : '#000',
                              backgroundColor: item.isSelected ? Colors.orange : 'white',
                              borderWidth: 1,
                              padding: 8,
                              margin: 8,
                              width: 100,
                              alignSelf: 'center',
                              borderRadius: 15,
                            }}>
                            <Text
                              style={{
                                alignSelf: 'center',
                                color:
                                  item.isSelected ? 'white' : Colors.orange,
                              }}>
                              {item && item?.addon_product_name && item?.addon_product_name?.length > 0 ? item?.addon_product_name[0] : null}

                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                  keyExtractor={(i, ind) => ind}
                // ListHeaderComponent={() =>
                //   !this.state.type_gear.addon_products.length > 0 ? (
                //     <Text >No data found</Text>
                //   ) : null
                // }
                />
              </View>

              <Text
                style={{
                  color: Colors.black,
                  fontSize: 18,
                  fontWeight: 'bold',
                  padding: 8,
                }}>
                Star Rating
              </Text>

              <View style={{ flexDirection: 'row', marginTop: -10 }}>
                <View style={{ width: '30%' }}>
                  <TouchableOpacity onPress={() => this.setState({ rating: '1' })}>
                    <View
                      style={{
                        borderColor: this.state.rating != '1' ? 'grey' : '#fff',
                        backgroundColor:
                          this.state.rating != '1' ? '#fff' : Colors.orange,
                        borderColor: 'grey',
                        borderWidth: 1,
                        padding: 8,
                        margin: 8,
                        width: 100,
                        alignSelf: 'center',
                        borderRadius: 15,
                      }}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          color:
                            this.state.rating != '1' ? Colors.orange : '#fff',
                        }}>
                        1Stars
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={{ width: '30%' }}>
                  <TouchableOpacity onPress={() => this.setState({ rating: '2' })}>
                    <View
                      style={{
                        borderColor: this.state.rating != '2' ? 'grey' : '#fff',
                        backgroundColor:
                          this.state.rating != '2' ? '#fff' : Colors.orange,
                        borderColor: 'grey',
                        borderWidth: 1,
                        padding: 8,
                        margin: 8,
                        width: 100,
                        alignSelf: 'center',
                        borderRadius: 15,
                      }}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          color:
                            this.state.rating != '2' ? Colors.orange : '#fff',
                        }}>
                        2Starts
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={{ width: '30%' }}>
                  <TouchableOpacity onPress={() => this.setState({ rating: '3' })}>
                    <View
                      style={{
                        borderColor: this.state.rating != '3' ? 'grey' : '#fff',
                        backgroundColor:
                          this.state.rating != '3' ? '#fff' : Colors.orange,
                        borderColor: 'grey',
                        borderWidth: 1,
                        padding: 8,
                        margin: 8,
                        width: 100,
                        alignSelf: 'center',
                        borderRadius: 15,
                      }}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          color:
                            this.state.rating != '3' ? Colors.orange : '#fff',
                        }}>
                        3Starts
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '30%' }}>
                  <TouchableOpacity onPress={() => this.setState({ rating: '4' })}>
                    <View
                      style={{
                        borderColor: this.state.rating != '4' ? 'grey' : '#fff',
                        backgroundColor:
                          this.state.rating != '4' ? '#fff' : Colors.orange,
                        borderColor: 'grey',
                        borderWidth: 1,
                        padding: 8,
                        margin: 8,
                        width: 100,
                        alignSelf: 'center',
                        borderRadius: 15,
                      }}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          color:
                            this.state.rating != '4' ? Colors.orange : '#fff',
                        }}>
                        4Starts
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={{ width: '30%' }}>
                  <TouchableOpacity onPress={() => this.setState({ rating: '5' })}>
                    <View
                      style={{
                        borderColor: this.state.rating != '5' ? 'grey' : '#fff',
                        backgroundColor:
                          this.state.rating != '5' ? '#fff' : Colors.orange,
                        borderWidth: 1,
                        padding: 8,
                        margin: 8,
                        width: 100,
                        alignSelf: 'center',
                        borderRadius: 15,
                      }}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          color:
                            this.state.rating != '5' ? Colors.orange : '#fff',
                        }}>
                        5Starts
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity style={s.Btn1} onPress={() => this.ShowResult()}>
                <Text style={s.Btn1Text}>Show Results</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible2}
          onRequestClose={() => {
            // this.closeButtonFunction()
            this.setState({ modalVisible2: false });
          }}>
          <View
            style={{
              height: '50%',
              marginTop: 'auto',
              backgroundColor: '#fff',
              fontFamily: 'Montserrat-Regular',
              borderRadius: 30,
            }}>
            <View>
              <Text
                style={{
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  fontSize: 18,
                  marginTop: 8,
                }}>
                Sort By
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

              <TouchableOpacity
                onPress={() => this.gotoBack()}

                style={{

                  alignItems: 'flex-start',
                  marginTop: -25,
                  marginLeft: 20,

                  borderRadius: 25

                }}>
                <Icon

                  name="x-circle"
                  type="feather"
                  size={26}
                  color={Colors.orange}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', marginTop: '10%' }}>
              <View style={{ width: '50%' }}>
                <TouchableOpacity
                  onPress={() => this.setState({ short: 'Price_low_high' })}>
                  <View
                    style={{
                      borderColor:
                        this.state.short != 'Price_low_high' ? 'grey' : '#fff',
                      backgroundColor:
                        this.state.short != 'Price_low_high'
                          ? '#fff'
                          : Colors.orange,
                      borderColor: 'grey',
                      borderWidth: 1,
                      padding: 8,
                      margin: 8,
                      width: 150,
                      alignSelf: 'center',
                      borderRadius: 15,
                    }}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        color:
                          this.state.short != 'Price_low_high'
                            ? Colors.orange
                            : '#fff',
                      }}>
                      Price low to high
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{ width: '50%' }}>
                <TouchableOpacity
                  onPress={() => this.setState({ short: 'Price_high_low' })}>
                  <View
                    style={{
                      borderColor:
                        this.state.short != 'Price_high_low' ? 'grey' : '#fff',
                      backgroundColor:
                        this.state.short != 'Price_high_low'
                          ? '#fff'
                          : Colors.orange,
                      borderColor: 'grey',
                      borderWidth: 1,
                      padding: 8,
                      margin: 8,
                      width: 150,
                      alignSelf: 'center',
                      borderRadius: 15,
                    }}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        color:
                          this.state.short != 'Price_high_low'
                            ? Colors.orange
                            : '#fff',
                      }}>
                      Price high to low
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: '50%' }}>
                <TouchableOpacity
                  onPress={() => this.setState({ short: 'Boat_small_large' })}>
                  <View
                    style={{
                      borderColor:
                        this.state.short != 'Boat_small_large'
                          ? 'grey'
                          : '#fff',
                      backgroundColor:
                        this.state.short != 'Boat_small_large'
                          ? '#fff'
                          : Colors.orange,
                      borderColor: 'grey',
                      borderWidth: 1,
                      padding: 8,
                      margin: 8,
                      width: 150,
                      alignSelf: 'center',
                      borderRadius: 15,
                    }}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        color:
                          this.state.short != 'Boat_small_large'
                            ? Colors.orange
                            : '#fff',
                      }}>
                      Boat small large
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{ width: '50%' }}>
                <TouchableOpacity
                  onPress={() => this.setState({ short: 'Boat_large_small' })}>
                  <View
                    style={{
                      borderColor:
                        this.state.short != 'Boat_large_small'
                          ? 'grey'
                          : '#fff',
                      backgroundColor:
                        this.state.short != 'Boat_large_small'
                          ? '#fff'
                          : Colors.orange,
                      borderColor: 'grey',
                      borderWidth: 1,
                      padding: 8,
                      margin: 8,
                      width: 150,
                      alignSelf: 'center',
                      borderRadius: 15,
                    }}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        color:
                          this.state.short != 'Boat_large_small'
                            ? Colors.orange
                            : '#fff',
                      }}>
                      Boat large small
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={s.Btn1} onPress={() => this.ShowResult()}>
              <Text style={s.Btn1Text}>Show Results</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible3}
          onRequestClose={() => {
            // this.closeButtonFunction()
            this.setState({ modalVisible3: false });
          }}>
          <View
            style={{
              height: '70%',
              marginTop: 'auto',
              backgroundColor: '#fff',
              fontFamily: 'Montserrat-Regular',
              borderRadius: 30,
            }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

              <TouchableOpacity
                onPress={() => this.gotoBack()}

                style={{

                  alignItems: 'flex-start',
                  marginTop: 10,
                  marginLeft: 20,

                  borderRadius: 25

                }}>
                <Icon

                  name="x-circle"
                  type="feather"
                  size={26}
                  color={Colors.orange}
                />
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: '3%' }}>
              <Calendar
                minDate={new Date()}
                markedDates={this.state.calender_arr}
                onDayPress={day => {
                  this._selectDate(day.dateString);
                }}
              />
            </View>


            <TouchableOpacity style={s.Btn1} onPress={() => this.ShowResult()}>
              <Text style={s.Btn1Text}>Select Date</Text>
            </TouchableOpacity>
          </View>
        </Modal>
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
  col: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#39DCE5',
    borderRightWidth: 0.8,
  },
  icons: { height: 15, width: 15 },
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
  Btn1: {
    height: 48,
    width: '80%',
    backgroundColor: Colors.orange,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginLeft: '10%',
    elevation: 3,
    overflow: 'hidden',
    shadowColor: '#fff',
    shadowRadius: 10,
    shadowOpacity: 1,
  },
  Btn1Text: {
    fontSize: 20,
    fontFamily: FontFamily.semi_bold,
    color: Colors.white,
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

  select_date: {
    fontSize: 13,
    color: Colors.orange,
    alignSelf: 'center',
    padding: 9,
    fontWeight: '900',
    fontFamily: 'Montserrat-SemiBold',
  },
  trapezoid_discount: {
    width: 115,
    height: 0,
    borderBottomWidth: 25,
    borderBottomColor: Colors.orange,
    borderLeftWidth: 25,
    borderLeftColor: "transparent",
    borderRightWidth: 25,
    borderRightColor: "transparent",
    borderStyle: "solid",
    backgroundColor: 'transparent',
    alignItems: "center",
    transform: [{ rotate: "-45deg" }],
    marginTop: 19.2,
    marginLeft: -26
  },
});
