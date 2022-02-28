import React, { Component, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  ActivityIndicator,
  Modal
} from 'react-native';
import { Input, Card, AirbnbRating } from 'react-native-elements';
import Header from '../../Components/Header';
import Header2 from '../../Components/Header2';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import cloneDeep from 'clone-deep';
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
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default class TripType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destinations: [],
      img: [],
      trips_arr: [],
      promotions_arr: [],
      trip_type: this.props.route.params.item,
      destinations_arr: [],
      isShowDatePicker: false,
      modalVisible: false,
      modalVisible2: false,
      modalVisible3: false,
      descending: false,
      short: 'none',
    };

    // console.log(this.props.navigation.state.params.item)
  }

  componentDidMount() {
    // const text = this.props.navigation.getParams('item');

    console.log('did ', this.state.trip_type);

    this.TripType();
  }

  async TripType() {
    let url =
      config.baseURL +
      'destination_list_filter.php?user_id_post=82&trip_type_id_post=' +
      this.state.trip_type.trip_id;
    console.log('urlin triptype :>> ', url);
    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log('json  ', json);
      this.setState({
        destinations_arr:
          json.destinations_arr != 'NA' ? json.destinations_arr : [],
      });

      // console.log(this.state.img)
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
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
    // this.setState({
    //   dob: moment(date).format('YYYY-MM-DD'),
    // });
    this.hideDatePicker();
  };

  Price = () => {
    this.setState({ modalVisible2: true });
  };

  // sort function>>>
  sortingBYPrice = (descending) => {
    this.setState({ modalVisible2: false });
    const sortedAds = this.sortAdsByPrice(this.state.destinations_arr, descending);

    this.setState({
      destinations_arr:sortedAds
    })
  }

  //common function
  sortAdsByPrice(arr, descending) {
    const ads = cloneDeep(arr);

    if (descending) {
      return ads.sort((a, b) => parseFloat(b.min_price || 0) - parseFloat(a.min_price || 0));
    }

    return ads.sort((a, b) => parseFloat(a.min_price || 0) - parseFloat(b.min_price || 0));
  };


  Goto() {
    console.log('goto');
    this.props.navigation.navigate('GoogleMap', {
      destinations_arr: this.state.destinations_arr,
      type:3
    });
  }

  async ShowResult() {
    this.setState({ modalVisible2: false });
    return;
    // console.log(
    //   'user ',
    //   this.state.trip_type,
    //   'destination ',
    //   this.state.destination.destination_id,
    // );

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

    return console.log(url);
    try {
      // const response = await fetch('https://myboatonline.com/app/webservice/adver_filter_user.php?user_id_post=82&trip_type=all&trip_type_id_send=2&search_type=by_trip&destination_id=7&latitude=&longitude=&find_key=');
      const response = await fetch(url);
      const json = await response.json();
      console.log('json  ', json);

      if (json.success == 'true') {
        this.setState({ modalVisible: false });
        this.setState({ modalVisible2: false });
        this.setState({ modalVisible3: false });


        this.setState({ adver_arr: json.adver_arr });
      } else {
      }

      // console.log(this.state.img)
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }


  render() {
    return (
      <View style={{ backgroundColor: Colors.white, flex: 1 }}>
        <Header2
          imgBack={true}
          backBtn={true}
          backImgSource={
            config.baseURL + 'images/' + this.state.trip_type.cover_image
          }
          name={this.state.trip_type.trip_type_name}
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
          <TouchableOpacity style={s.col} onPress={() => this.Price()} >
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
          <View style={s.col}>
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
          </View>

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
              {' '}
              Map
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => this.showDatePicker()}
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
            data={this.state.destinations_arr}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <View style={{ padding: 5 }}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('DestinationList', {
                        item: item,
                        trip_type: this.state.trip_type.trip_id,
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
                        imageStyle={s.imgStyle}
                        source={{ uri: config.baseURL + 'images/' + item.image }}>
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
                            starting{'\n'}KD {item.min_price}
                          </Text>
                        </View>
                      </ImageBackground>
                      {/*  */}
                      <View style={s.SEC3}>
                        <View style={{}}>
                          <Text style={s.title}>{item.destination_name}</Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginTop: 5,
                            }}>
                            {/* <View style={{marginLeft:5}}>
                          <Text style={{color:"rgba(51, 51, 51, 1)",fontSize:14,fontFamily:FontFamily.default}}>{item.type}</Text>
                          <AirbnbRating
                           showRating={false}
                           size={12}
                           isDisabled
                           defaultRating={4}
                           starContainerStyle={{alignSelf:"flex-start"}}
                            />
                        </View> */}
                          </View>
                        </View>
                        {/* <View>
                      <Text style={{color:"rgba(51, 51, 51, 1)",fontSize:12,fontFamily:FontFamily.default}}>
                        Destination
                      </Text>
                      <View style={{flexDirection:'row',alignItems:"center",alignSelf:'flex-end'}}>
                      <Icon name="person" size={14} />
                      <Text style={{color:"rgba(51, 51, 51, 1)",fontSize:10,fontFamily:FontFamily.default}}>10 Person</Text>
                      </View>
                    </View> */}
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
          <Text>
            {'\n'}
            {'\n'}
          </Text>
          <Text>
            {'\n'}
            {'\n'}
          </Text>
          <Text>
            {'\n'}
            {'\n'}
          </Text>
        </View>
        <DateTimePickerModal
          isVisible={this.state.isShowDatePicker}
          mode="date"
          onConfirm={this.handleConfirm}
          onCancel={this.hideDatePicker}
        />

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
                Filter
              </Text>
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

            <TouchableOpacity style={s.Btn1} onPress={() => {
              if (this.state.short == 'Price_low_high') {
                this.sortingBYPrice(false)

              } else if (this.state.short == 'Price_high_low') {
                this.sortingBYPrice(true)
              }
            }}>
              <Text style={s.Btn1Text}>Show Results</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

const s = StyleSheet.create({
  col: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#39DCE5',
    borderRightWidth: 0.8,
  },
  icons: { height: 15, width: 15 },
  SEC2: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopEndRadius: 30,
    marginTop: -40,
    //   marginBottom:40,
    flex: 1,
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
});
