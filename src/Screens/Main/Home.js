import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import {
  ActivityIndicator, Alert, BackHandler, FlatList,
  Image, ImageBackground, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
// import { Card } from 'react-native-elements';
import { Card, Icon } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import { SliderBox } from 'react-native-image-slider-box';
import Header from '../../Components/Header';
import {
  Colors,
  FontFamily
} from '../../Constants/Constants';
import { UserContext } from "./UserContext";
import { config } from '../../Provider/configProvider';
import { firebaseprovider } from '../../Provider/FirebaseProvider';
import socketServices from '../../Provider/socketServices';
import { Lang_chg } from '../../Provider/Language_provider';

export default class Home extends Component {
  static contextType = UserContext
  constructor(props) {
    console.log('props :>> ', props);
    super(props);
    this.state = {
      destinations: [],
      img: [],
      trips_arr: [],
      promotions_arr: [],
      backgroundColor: 1,
      modalVisible: false,
      modalVisible1 : false , 
      destination_trip_array : [],
      item: {},
      isLoading: false,
      err: false
    };

  }

  backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to close the app?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };
  static getDerivedStateFromError(prevprops, prevState) {
    console.log('props :>> props ', prevprops);
    console.log('state :>> state ', prevState);
  }

  componentWillUnmount() {
    // this.backHandler.remove();
    this._unsubscribe();
  }
  socketintial = async () => {
    const value = await AsyncStorage.getItem('user_arr');
    console.log('value :>> ', value);
    const arrayData = JSON.parse(value);
    console.log('arrayData :>> ', arrayData);
    if (!socketServices.socket) {
      //connect socket
      socketServices.initializeSocket(arrayData.user_id);
    }
    if (!socketServices.socket.connected) {
      //connect socket
      socketServices.socket.connect();
    }
  };

  componentDidMount() {
    this.socketintial();
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      console.log('focus :>> ');
      this.getUsers();
      this.Promotion();
      //firebaseprovider.getAllUsers();
      //firebaseprovider.messagecountforfooter();
      console.log('des', this.state.trips_arr)
      this.getData('user_arr');
    });
    // if (!socketServices.socket) {
    //   //connect socket
    //   socketServices.initializeSocket(209);
    // }
    // if (!socketServices.socket.connected) {
    //   //connect socket
    //   socketServices.socket.connect();
    // }
  }

  getData = async key => {
    console.log('local ' + key);
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        const arrayData = JSON.parse(value);
        console.log(arrayData);
        firebaseprovider.getMyInboxAllData(arrayData);
        firebaseprovider.firebaseUserGetInboxCount(arrayData);
      }
    } catch (e) {
      // error reading value
    }
  };

  ChangeColor(index, item, type) {
    console.log('color', item);

    this.setState({ modalVisible: false  , modalVisible1 : false});

    this.setState({ backgroundColor: index });
    if (type) {
      this.props.navigation.navigate('TripType', { item: item });
    } else {
      this.props.navigation.navigate('DestinationList', {
        item: this.state.item,
        trip_type: item?.trip_id,
        trip_detail: item,
      });
    }
  }

  getUsers = async () => {
    const value = await AsyncStorage.getItem('user_arr');
    console.log('value :>> ', value);
    const arrayData = JSON.parse(value);
    console.log('arrayData :>> ', arrayData);

    let url = config.baseURL +
      `destination_list.php?user_id_post=${arrayData.user_id}`;

    try {
      let res = await fetch(url);
      const json = await res.json();

      console.log('destination kist res>>>>>>> 124', json);

      return json;
    } catch (error) {
      console.log(error, 'err on 123');
    }
  }

  //get promotions
  Promotion = async () => {
    this.setState({ isLoading: true });
    const value = await AsyncStorage.getItem('user_arr');
    console.log('value :>> ', value);
    const arrayData = JSON.parse(value);
    console.log('arrayData :>> ', arrayData);
    let url
    if (arrayData != null) {
      url = config.baseURL +
        `destination_list.php?user_id_post=${arrayData.user_id}`;
    }
    else {
      url = config.baseURL +
        `destination_list.php?user_id_post=`;
    }
    console.log(url, 'urlurlurl');
    const response = await fetch(url
    );
    console.log('response', response);
    const json = await response.json();
    this.setState({ isLoading: false });
    console.log('destination kist res>>>>>>>', json);
    if (json && json.trips_arr && json.trips_arr.length > 0) {

      let updatedArr = json.trips_arr;

      let newArr = updatedArr.filter((value, i) => {
        if (value.no_of_boat > 0) {
          return true
        } else {
          false
        }
      })

      json.promotions_arr.forEach(item => {
        item.serverImg = 'https://myboatonline.com/app/webservice/images/' + item.image;

      });

      console.log(newArr, 'newArrnewArrnewArr');
      this.setState({
        trips_arr: newArr
      });
    }
    let imgAr = [];
    this.setState(prevState => {
      console.log(prevState, 'pre state');
      if (prevState && prevState.promotions_arr && prevState.promotions_arr.length > 0 && this.state.img.length > 0) {
        prevState.promotions_arr.forEach(i => {
          this.state.img.forEach(j => {
            if (i.serverImg == j) {
              console.log('coming in if');
              // this.state.img.push(i.serverImg);
            }
          });
        });
      } else {
        console.log('coming in else');
        json.promotions_arr.forEach(i => {
          this.state.img.push(i.serverImg);

        });
      }
    })

    this.setState({
      destinations: json.destinations_arr,
      promotions_arr: json.promotions_arr,
      isLoading: false
    });

    // json.promotions_arr.forEach(item => {
    //   this.state.img.push(item.serverImg);
    // });
  }

  ModalClick(item) {
    if (item) {
      this.setState({
        item: item,
      });
    }

     console.log('modal' , item);
    this.setState({  destination_trip_array : item ? item.trip_array  : []});
    this.setState({  modalVisible1 : true});
  }

  gotoBack = () => {
    this.setState({  modalVisible1 : false });
  };

  Premotion(index) {
    console.log(index);

    let v = this.state.promotions_arr[index];

    //let d = v.findIndex(index);

    console.log(v);

    this.props.navigation.navigate('PremotionDetail', { item: v });
  }

  render() {
    const user = this.context
    console.log('context in home', user);
    const destinations = this.state.destinations.image;
    console.log('render>>>>>>>>>>>>> im  trip arr', this.state.trips_arr)
    console.log('render>>>>>>>>>>>>>', this.state.destinations)

    var images = [
      require('../../Images/boat.jpg'),
      require('../../Images/back.jpg'),
      require('../../Images/back1.jpg'),
      require('../../Images/back2.jpg'),
      require('../../Images/back3.jpg'),
      require('../../Images/back4.jpg'),
    ];

    return (
      <View style={{ backgroundColor: Colors.white, flex: 1 }}>
            {/* <View style={{height:25}}></View> */}
        
        <Header
          imgBack={true}
          notiBtn={true}
          searchBtn={false}
          headerHeight={300}
          name={user.value == 1 ? Lang_chg.txt_explore[1] : Lang_chg.txt_explore[0]}
          backImgSource={require('../../Images/backgd2.jpg')}
        />
        {/* Buttons */}
        <View style={{ position: 'absolute', width: '100%', top: 135 }}>
          <TouchableOpacity onPress={() => this.ModalClick()}
            style={{ alignItems: 'flex-start' }}
          >
            <Text
              style={{
                marginLeft: 17,
                color: Colors.white,
                textDecorationLine: 'underline',
              }}>
              {user.value == 1 ? Lang_chg.txt_view_all[1] : Lang_chg.txt_view_all[0]}
            </Text>
          </TouchableOpacity>

          <View style={s.btn_1}>
            <ScrollView horizontal={true}>
              {this.state.trips_arr.map((item, index) => (

                item.no_of_boat ?
                  (
                    <TouchableOpacity
                      key={index}
                      style={[
                        s.btn1,
                        {
                          backgroundColor:
                            this.state.backgroundColor === index
                              ? 'rgba(10, 132, 129, 1)'
                              : '#fff',
                          width: 80,
                          borderRadius: 20,
                          alignItems: 'center',
                          alignSelf: 'center',
                          alignContent: 'center',
                        },
                      ]}
                      onPress={() => this.ChangeColor(index, item, true)}
                      activeOpacity={0.8}>
                      {this.state.backgroundColor == index ? (
                        <Image
                          source={{
                            uri: config.baseURL + 'images/' + item.icon_white,
                          }}
                          style={{ height: 50, width: 50, resizeMode: 'contain' }}
                        />
                      ) : (
                        <Image
                          source={{
                            uri: config.baseURL + 'images/' + item.icon_green,
                          }}
                          style={{ height: 50, width: 50, resizeMode: 'contain' }}
                        />
                      )}

                      <Text
                        style={[
                          s.btn1Text,
                          {
                            color:
                              this.state.backgroundColor === index
                                ? '#fff'
                                : 'rgba(10, 132, 129, 1)',
                            fontSize: 10,
                            padding: 2,
                            alignSelf: 'center',
                            alignItems: 'center',
                            alignContent: 'center',
                            fontWeight: 'bold',
                          },
                        ]}>
                        {user.value == 1 ? item.trip_type_name_arabic : item.trip_type_name}
                      </Text>
                      <Text style={{ color: '#b6b6b6', fontSize: 10 }}>
                        {' '}
                        {item.no_of_boat} Boats
                      </Text>
                    </TouchableOpacity>
                  ) : null
              ))}
            </ScrollView>
          </View>
        </View>
        {/* View */}
        <View style={s.SEC2}>

          {this.state.isLoading && <ActivityIndicator size={30} color={Colors.orange} style={{ alignSelf: "center" }} />}
          <ScrollView style={{ marginTop: 10 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 13,
                width: '95%',
                alignSelf: 'center',
              }}>
              <TouchableOpacity
              // onPress={user.updateValue}
              >
                <Text
                  style={{
                    // textDecorationStyle: 'dashed',
                    textDecorationLine: 'underline',
                    fontFamily: FontFamily.default,
                    color: Colors.orange,
                    marginLeft: 10,
                    fontWeight: 'bold',
                  }}>
                  {user.value == 1 ? Lang_chg.Promotion[1] : Lang_chg.Promotion[0]}
                </Text>
              </TouchableOpacity>
            </View>

            <SliderBox
              ImageComponent={FastImage}
              images={this.state.img}
              sliderBoxHeight={200}
              slidderBoxWidth={280}
              autoplayInterval={3000}
              circleLoop
              onCurrentImagePressed={index =>
                // console.warn(`image ${index} pressed`)
                this.Premotion(index)
              }
              //currentImageEmitter={index => console.warn(`image ${index} pressed`)}
              dotColor={Colors.orange}
              // resizeMethod={'resize'}
              resizeMode={'cover'}
              inactiveDotColor="#90A4AE"
              // paginationBoxVerticalPadding={10}
              paginationBoxStyle={{
                position: 'absolute',
                bottom: -30,
                padding: 0,
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
                paddingVertical: 10,
              }}
              // dotStyle={{
              //   width: 9,
              //   height: 9,
              //   // borderRadius: 5,
              //   marginHorizontal: -9,
              //   borderRadius: 20,
              //   padding: 0,
              //   margin: 0,
              //   backgroundColor: 'rgba(128, 128, 128, 0.92)',
              //   // transform: [{ rotate: '45deg' }],
              // }}
              // autoplay
              ImageComponentStyle={{
                borderRadius: 0,
                width: '90%',
                marginTop: 2,
              }}
              imageLoadingColor="#2196F3"
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
                width: '95%',
                alignSelf: 'center',
              }}>
              <TouchableOpacity>
                <Text
                  style={{
                    // textDecorationStyle: 'dashed',
                    textDecorationLine: 'underline',
                    fontFamily: FontFamily.default,
                    color: Colors.orange,
                    marginLeft: 10,
                    fontWeight: 'bold',
                  }}>
                  {
                    user.value == 1 ?
                      Lang_chg.popolardes[1] : Lang_chg.popolardes[0]
                  }
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <FlatList
                data={this.state.destinations}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                  console.log('item :>> ', item);
                  return (
                    <View style={{ padding: 5 }}>
                      { item.no_of_trips ?  
                      <Card
                      containerStyle={{
                        padding: 0,
                        borderRadius: 15,
                        paddingHorizontal: 0,
                        margin: 7.5,
                        marginHorizontal: 10,
                        elevation: 5,
                      }}>
                      <TouchableOpacity onPress={() => this.ModalClick(item)}>
                        <ImageBackground
                          style={s.ImageBackground}
                          imageStyle={s.imgStyle}
                          source={{
                            uri:
                              config.image_url4 +
                              item.image,
                          }}>
                          <View
                            style={[
                              {
                                height: 50,
                                //  width:97,
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
                              {user.value == 1 ? Lang_chg.Starting[1] : Lang_chg.Starting[0]}{'\n'}{user.value==1 ?  Lang_chg.KD[1]: Lang_chg.KD[0]} {item.min_price}
                            </Text>
                          </View>
                        </ImageBackground>
                      </TouchableOpacity>
                      {/*  */}
                      <View style={s.SEC3}>
                        <View style={{}}>
                          <Text style={s.title}>{user.value == 1 ? item.destination_name_arabic : item.destination_name}</Text>
                          {/*  <View style={{flexDirection:"row",alignItems:"center",marginTop:5}}>
                      <Image style={{
                        height:40,
                        width:40,
                        borderRadius:20,
                        resizeMode:"cover",
                        }}
                        source={{uri:'https://source.unsplash.com/400x400/?face'}}
                        PlaceholderContent={<ActivityIndicator size={30} color={Colors.orange} style={{alignSelf:"center"}} />}
                        />
                      <View style={{marginLeft:5}}>
                        <Text style={{color:"rgba(51, 51, 51, 1)",fontSize:14,fontFamily:FontFamily.default}}>{item.type}</Text>
                        <AirbnbRating
                         showRating={false}
                         size={12}
                         isDisabled
                         defaultRating={4}
                         starContainerStyle={{alignSelf:"flex-start"}}
                          />
                      </View>
                    </View> */}
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
                    </Card>  :  null 
                      }
                      
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
          </ScrollView>
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
              height: '50%',
              marginTop: 'auto',
              backgroundColor: '#fff',
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
            <Text
              style={{
                color: Colors.orange,
                alignSelf: 'center',
                fontSize: 18,
                fontWeight: 'bold',
                padding: 8,
              }}>
              {user.value == 1 ? Lang_chg.txt_type_of_trips[1] : Lang_chg.txt_type_of_trips[0]}
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>

              <TouchableOpacity

                style={{
                  // marginBottom: -50,
                  alignItems: 'flex-start',
                  marginTop: -25,
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
            </View>
            <FlatList
              data={this.state.trips_arr}
              //  horizontal={true}
              numColumns={3}
              //  keyExtractor={(item, index) => console.log(item)}
              renderItem={({ item, index }) => {
                console.log('item :>> ', item);

                return (

                  <View
                    style={{
                      flex: 1,
                      height: 120,
                      alignSelf: 'center',
                      alignItems: 'center',
                      alignContent: 'center',
                      backgroundColor: item.no_of_boat > 0 ? Colors.white : Colors.gray,
                      margin: 15,
                      borderRadius: 22,
                      padding: 10,
                      shadowColor: '#000',
                      // width:90,
                      maxWidth: '25%',
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.8,
                      shadowRadius: 2,
                      elevation: 5,
                    }}
                  >

                    <TouchableOpacity
                      onPress={
                        () => item.no_of_boat > 0 ? this.ChangeColor(index, item) : null
                        //  this.handleClick(item)
                      }
                      activeOpacity={0.8}

                      style={
                        {
                          top: -12,
                          borderRadius: 20,
                          alignItems: 'center',
                          alignSelf: 'center',
                          alignContent: 'center',
                          height: 90,
                          width: 110,
                          borderRadius: 7,
                          margin: 7,
                        }
                      }
                    >
                      <Image
                        source={{
                          uri: config.baseURL + 'images/' + item.icon_green,
                        }}
                        style={{ height: 50, width: 50, resizeMode: 'contain' }}
                      />
                      <Text
                        style={{
                          color: Colors.orange,
                          fontWeight: 'bold',
                          fontSize: 16,
                          textAlign: 'center',
                        }}>
                        {user.value == 1 ? item.trip_type_name_arabic : item.trip_type_name}
                      </Text>

                      <Text style={{ color: '#b6b6b6' }}>
                        {' '}
                        {item.no_of_boat} Boats
                      </Text>
                    </TouchableOpacity>

                  </View>

                )
              }}
            />
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible1}
          onRequestClose={() => {
            // this.closeButtonFunction()
            this.setState({ modalVisible1: false });
          }}>
          <View
            style={{
              height: '50%',
              marginTop: 'auto',
              backgroundColor: '#fff',
              borderRadius: 30,
            }}>
            <Text
              style={{
                color: Colors.orange,
                alignSelf: 'center',
                fontSize: 18,
                fontWeight: 'bold',
                padding: 8,
              }}>
              {user.value == 1 ? Lang_chg.txt_type_of_trips[1] : Lang_chg.txt_type_of_trips[0]}
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>

              <TouchableOpacity

                style={{
                  // marginBottom: -50,
                  alignItems: 'flex-start',
                  marginTop: -25,
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
            </View>
            <FlatList
              data={this.state.destination_trip_array}
              //  horizontal={true}
              numColumns={3}
              //  keyExtractor={(item, index) => console.log(item)}
              renderItem={({ item, index }) => {
                 console.log('item 1:>> ', item);

                return (

                  <View
                    style={{
                      flex: 1,
                      height: 120,
                      alignSelf: 'center',
                      alignItems: 'center',
                      alignContent: 'center',
                      // backgroundColor: item.no_of_boat > 0 ? Colors.white : Colors.gray,
                      backgroundColor:Colors.white,
                      margin: 15,
                      borderRadius: 22,
                      padding: 10,
                      shadowColor: '#000',
                      // width:90,
                      maxWidth: '25%',
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.8,
                      shadowRadius: 2,
                      elevation: 5,
                    }}
                  >

                    <TouchableOpacity
                      onPress={
                        () =>  this.ChangeColor(index, item) 
                        //  this.handleClick(item)
                      }
                      activeOpacity={0.8}

                      style={
                        {
                          top: -12,
                          borderRadius: 20,
                          alignItems: 'center',
                          alignSelf: 'center',
                          alignContent: 'center',
                          height: 90,
                          width: 110,
                          borderRadius: 7,
                          margin: 7,
                        }
                      }
                    >
                      <Image
                        source={{
                          uri: config.baseURL + 'images/' + item.icon_green,
                        }}
                        style={{ height: 50, width: 50, resizeMode: 'contain' }}
                      />
                      <Text
                        style={{
                          color: Colors.orange,
                          fontWeight: 'bold',
                          fontSize: 16,
                          textAlign: 'center',
                        }}>
                        {user.value == 1 ? item.trip_type_name_arabic : item.trip_type_name}
                      </Text>

                      <Text style={{ color: '#b6b6b6' }}>
                        {' '}
                        {item.no_of_boats} Boats
                      </Text>
                    </TouchableOpacity>

                  </View>

                )
              }}
            />
          </View>
        </Modal>
      </View>
    );
  }
}
const s = StyleSheet.create({
  SEC2: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 25,
    borderTopEndRadius: 25,
    marginTop: -30,
    //   marginBottom:40,
    flex: 1,
  },
  btn1: {
    height: 100,
    width: 70,
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
    fontSize: 14,
    color: Colors.orange,
    textAlign: 'center',
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
});

//export default Home;
