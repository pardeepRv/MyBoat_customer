import React, {Component, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Share,
  Modal,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Icon, Input, Card, AirbnbRating} from 'react-native-elements';
import Header from '../../Components/Header';
import Header2 from '../../Components/Header2';
import {msgProvider, msgTitle, msgText} from '../../Provider/messageProvider';
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
import {SliderBox} from 'react-native-image-slider-box';
import FastImage from 'react-native-fast-image';
import {renderNode} from 'react-native-elements/dist/helpers';
import {apifuntion} from '../../Provider/apiProvider';
import {config} from '../../Provider/configProvider';
import AsyncStorage from '@react-native-community/async-storage';
import {Calendar} from 'react-native-calendars';
//import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default class DestinationList extends Component {
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
      type_gear: '',
      food: '',
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
    };

    // console.log(this.props.navigation.state.params.item)
  }

  componentDidMount() {
    // const text = this.props.navigation.getParams('item');

    let date = new Date('2020-06-12T14:42:42');

    console.log('date ', this?.props?.route?.params?.trip_type,);

    this.setState({getdate: date});

    console.log(this.state.destination);

    this.getData('user_arr');
  }

  getData = async key => {
    console.log('local ' + key);
    try {
      const value = await AsyncStorage.getItem(key);

      //          console.log('local '+value)

      //  console.log('array ',arrayData.email);
      if (value !== null) {
        const arrayData = JSON.parse(value);

        console.log(arrayData);
        this.setState({localData: arrayData});
        this.ProfileDetail(arrayData.user_id);
      }
    } catch (e) {
      // error reading value
    }
  };

  Goto() {
    console.log('goto');
    this.props.navigation.navigate('GoogleMap', {
      adver_arr: this.state.adver_arr,
    });
  }

  Filter = () => {
    this.setState({modalVisible: true});
  };

  Selectdate = () => {
    this.setState({modalVisible3: true});
  };

  Price = () => {
    this.setState({modalVisible2: true});
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

     console.log(url , 'user details url ');
    try {
      // const response = await fetch('https://myboatonline.com/app/webservice/adver_filter_user.php?user_id_post=82&trip_type=all&trip_type_id_send=2&search_type=by_trip&destination_id=7&latitude=&longitude=&find_key=');
      const response = await fetch(url);
      const json = await response.json();
       console.log('json  ', json);

      if (json.success == 'true') {
        this.setState({adver_arr: json.adver_arr!='NA'?json.adver_arr:[]});
      } else {
      }

      // console.log(this.state.img)
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({isLoading: false});
    }
  }

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
          selectedColor: Colors.orange,
        };
        this.setState({
          date: date,
          calender_arr: {...this.state.calender_arr, date: date},
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
      this.state.calender_arr[date] = {selected: true, selectedColor: Colors.orange};
      this.setState({
        date: date,
        calender_arr: {...this.state.calender_arr, date: date},
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
      console.log('json  ', json);

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
      this.setState({isLoading: false});
    }
  }
 
  

   onShare = async (imgUrl) => {
     console.log(imgUrl,'link');
    try {
      const result = await Share.share({
        title: 'Lokahi fishing',
        // message: 'Sharing from lokahi',
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
      '&filter_guest=0&filter_cabin=' +
      this.state.cabin +
      '&filter_price=0&filter_toilet=0' +
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
        this.setState({modalVisible: false});
        this.setState({modalVisible2: false});
        this.setState({modalVisible3: false});


        this.setState({adver_arr: json.adver_arr});
      } else {
      }

      // console.log(this.state.img)
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({isLoading: false});
    }
  }

  render() {
    console.log('this.state.adver_arr :>> ', this.state.adver_arr);
    return (
      <View style={{backgroundColor: Colors.white, flex: 1}}>
        <Header2
          imgBack={true}
          backBtn={true}

          backImgSource={
            config.baseURL + 'images/' + this.state.destination.image
          }
          name={this.state.destination.destination_name}
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
            shadowOffset: {width: 500, height: 500},
            shadowOpacity: 0.8,
            shadowRadius: 0,
            elevation: 5,
          }}>
          <TouchableOpacity style={s.col} onPress={()=>this.Price()}>
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
              {' '}
              Sort By{' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.col} onPress={()=>this.Filter()}>
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
              Filter
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
          onPress={()=> this.Goto()}
            style={[
              s.col,
              {borderRightColor: 'transparent', borderRightWidth: 0},
            ]}>
            <Image
              source={require('../../../assets/icons/map_icon.png')}
              style={[s.icons, {height: 18}]}
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
              {' '}
              Map
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
            shadowOffset: {width: 500, height: 500},
            shadowOpacity: 0.8,
            shadowRadius: 0,
            elevation: 5,
          }}>
          <Text style={s.select_date}> Choose Trip Date</Text>
        </TouchableOpacity>

        <View
          style={{
            marginTop: '15%',
            marginBottom: '60%',
            borderRadius: 20,
            backgroundColor: Colors.white,
          }}>
          <FlatList
            data={this.state.adver_arr}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
                console.log('item in clo:>> destination list ', item);
              return (
                <View style={{padding: 5}}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('TripTypeDetail', {
                        item: item,
                      })
                    }>
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
                        resizeMode="contain"
                        imageStyle={s.imgStyle}
                        source={{uri: config.baseURL + 'images/' + item.image}}>
                        
                        <TouchableOpacity
                          style={{position: 'absolute', right: 10,padding: 3, top: 7 , backgroundColor:Colors.gray1 , borderRadius:20}}
                          onPress={() => this.addFavorite(item)}
                          >
                            {item.fav == "yes" ?( <Icon
                            name="heart"
                            size={20}
                            type="entypo"
                          
                            color={Colors.red }
                          />) : (<Icon
                            name="heart"
                            size={20}
                            type="entypo"
                            color={Colors.white }
                          />)}
                          
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={() => this.onShare(config.baseURL + 'images/' + item.image)}
                          style={{position: 'absolute', right: 50, top: 7 ,padding:3,backgroundColor:Colors.gray1 , borderRadius:20}}>
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
                        <View style={{flex:1 }}>
                          <View style={{flexDirection:'row' ,height:30,  justifyContent:'space-between',width:'100%' , alignItems:'center'}}>
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
                        <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
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
                                uri: config.baseURL + 'images/' + item.user_image,
                              }}
                              PlaceholderContent={
                                <ActivityIndicator
                                  size={30}
                                  color={Colors.orange}
                                  style={{alignSelf: 'center'}}
                                />
                              }
                            />
                            <View style={{marginLeft: 5}}>
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
                                starContainerStyle={{alignSelf: 'flex-start'}}
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
            style={
              {
                // marginTop:30
              }
            }
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={{
              paddingBottom: 10,
              //  height:"100%"
            }}
          />
        </View>
        <Text>
          {'\n'}
          {'\n'}
        </Text>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            // this.closeButtonFunction()
            this.setState({modalVisible: false});
          }}>
          <View
            style={{
              height: '72%',
              marginTop: 'auto',
              backgroundColor: '#fff',
              fontFamily: 'Montserrat-Regular',
              borderRadius: 30,
            }}>
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

            <Text
              style={{
                color: Colors.black,
                fontSize: 18,
                fontWeight: 'bold',
                padding: 8,
              }}>
              Location
            </Text>

            <View style={{flexDirection: 'row', marginTop: -10}}>
              <View style={{width: '30%'}}>
                <TouchableOpacity
                  onPress={() => this.setState({location: 'fail'})}>
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

              <View style={{width: '30%'}}>
                <TouchableOpacity
                  onPress={() => this.setState({location: 'Al Jhara'})}>
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

            <View style={{flexDirection: 'row', marginTop: -10}}>
              <TouchableOpacity onPress={() => this.setState({cabin: '1'})}>
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

              <TouchableOpacity onPress={() => this.setState({cabin: '2'})}>
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

              <TouchableOpacity onPress={() => this.setState({cabin: '3'})}>
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

              <TouchableOpacity onPress={() => this.setState({cabin: '4'})}>
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

              <TouchableOpacity onPress={() => this.setState({cabin: '5'})}>
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
              Type Gear
            </Text>

            <View style={{flexDirection: 'row', marginTop: -10}}>
              <View style={{width: '30%'}}>
                <TouchableOpacity
                  onPress={() => this.setState({type_gear: 'full'})}>
                  <View
                    style={{
                      borderColor:
                        this.state.type_gear != '1' ? 'full' : '#fff',
                      backgroundColor:
                        this.state.type_gear != 'full' ? '#fff' : Colors.orange,
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
                          this.state.type_gear != 'full'
                            ? Colors.orange
                            : '#fff',
                      }}>
                      Full
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{width: '30%'}}>
                <TouchableOpacity
                  onPress={() => this.setState({type_gear: 'half'})}>
                  <View
                    style={{
                      borderColor:
                        this.state.type_gear != 'half' ? 'grey' : '#fff',
                      backgroundColor:
                        this.state.type_gear != 'half' ? '#fff' : Colors.orange,
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
                          this.state.type_gear != 'half'
                            ? Colors.orange
                            : '#fff',
                      }}>
                      Half
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{width: '30%'}}>
                <TouchableOpacity
                  onPress={() => this.setState({type_gear: 'no'})}>
                  <View
                    style={{
                      borderColor:
                        this.state.type_gear != 'no' ? 'grey' : '#fff',
                      backgroundColor:
                        this.state.type_gear != 'no' ? '#fff' : Colors.orange,
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
                          this.state.type_gear != 'no' ? Colors.orange : '#fff',
                      }}>
                      No
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
              }}>
              Food
            </Text>

            <View style={{flexDirection: 'row', marginTop: -10}}>
              <TouchableOpacity
                onPress={() => this.setState({food: 'Vid Food'})}>
                <View
                  style={{
                    borderColor:
                      this.state.food != 'Vid Food' ? 'grey' : '#fff',
                    backgroundColor:
                      this.state.food != 'Vid Food' ? '#fff' : Colors.orange,
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
                        this.state.food != 'Vid Food' ? Colors.orange : '#fff',
                    }}>
                    Vip Food
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.setState({food: 'Indian Food'})}>
                <View
                  style={{
                    borderColor:
                      this.state.food != 'Indian Food' ? 'grey' : '#fff',
                    backgroundColor:
                      this.state.food != 'Indian Food' ? '#fff' : Colors.orange,
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
                        this.state.food != 'Indian Food'
                          ? Colors.orange
                          : '#fff',
                    }}>
                    Indian Food
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
              Star Rating
            </Text>

            <View style={{flexDirection: 'row', marginTop: -10}}>
              <View style={{width: '30%'}}>
                <TouchableOpacity onPress={() => this.setState({rating: '1'})}>
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

              <View style={{width: '30%'}}>
                <TouchableOpacity onPress={() => this.setState({rating: '2'})}>
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

              <View style={{width: '30%'}}>
                <TouchableOpacity onPress={() => this.setState({rating: '3'})}>
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

            <View style={{flexDirection: 'row'}}>
              <View style={{width: '30%'}}>
                <TouchableOpacity onPress={() => this.setState({rating: '4'})}>
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

              <View style={{width: '30%'}}>
                <TouchableOpacity onPress={() => this.setState({rating: '5'})}>
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
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible2}
          onRequestClose={() => {
            // this.closeButtonFunction()
            this.setState({modalVisible2: false});
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
                Filter
              </Text>
            </View>

            <View style={{flexDirection: 'row', marginTop: '10%'}}>
              <View style={{width: '50%'}}>
                <TouchableOpacity
                  onPress={() => this.setState({short: 'Price_low_high'})}>
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

              <View style={{width: '50%'}}>
                <TouchableOpacity
                  onPress={() => this.setState({short: 'Price_high_low'})}>
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

            <View style={{flexDirection: 'row'}}>
              <View style={{width: '50%'}}>
                <TouchableOpacity
                  onPress={() => this.setState({short: 'Boat_small_large'})}>
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

              <View style={{width: '50%'}}>
                <TouchableOpacity
                  onPress={() => this.setState({short: 'Boat_large_small'})}>
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
            this.setState({modalVisible3: false});
          }}>
          <View
            style={{
              height: '70%',
              marginTop: 'auto',
              backgroundColor: '#fff',
              fontFamily: 'Montserrat-Regular',
              borderRadius: 30,
            }}>
            <View style={{marginTop: '10%'}}>
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
  icons: {height: 15, width: 15},
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
    transform: [{rotate: '-45deg'}],
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
});
