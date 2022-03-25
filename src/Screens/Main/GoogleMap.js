import React, {Component, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  FlatList,
  SafeAreaView,
  Image,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {Icon, Input, Card, AirbnbRating} from 'react-native-elements';
import MapView, {Marker, Callout, PROVIDER_GOOGLE} from 'react-native-maps';
import Header from '../../Components/Header3';
import {
  back_img3,
  boat_img1,
  Colors,
  FontFamily,
  Sizes,
} from '../../Constants/Constants';
import Ad from '../../Data/Ad';
import {renderNode} from 'react-native-elements/dist/helpers';
import {apifuntion} from '../../Provider/apiProvider';
import {Lang_chg} from '../../Provider/Language_provider';
import {config} from '../../Provider/configProvider';
import {TextInput} from 'react-native';
//import Header from '../../Components/Header';
global.city_lat = 29.2831;
global.city_long = 47.9826;

export default class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: 0,
      loading: false,
      isConnected: false,
      aboutus: '',
      latitude: '29.3117',
      longitude: '47.4818',
      latdelta: '0.0922',
      longdelta: '0.0421',
      addressbar2: '',
      addressselected: '',
      address_selected: '',
      input_search: '',
      destination : this?.props?.route?.params?.destinations_arr 
      ? this?.props?.route?.params?.destinations_arr : [],
      type:this?.props?.route?.params?.type,
      adver_arr: this?.props?.route?.params?.adver_arr
        ? this?.props?.route?.params?.adver_arr
        : [],
        arry : this?.props?.route?.params?.arry,
      mapRegion: {
        latitude: parseFloat(city_lat),
        longitude: parseFloat(city_long),
        latitudeDelta: parseFloat(5),
        longitudeDelta: parseFloat(5),
      },
      initialRegion: {
        latitude: parseFloat(global.city_lat),
        longitude: parseFloat(global.city_long),
        latitudeDelta: parseFloat(0.5224),
        longitudeDelta: parseFloat(0.30339),
      },
      markers: [],
      search: '',
    };
    this.setMarkers();
  }
  setMarkers = () => {
    var adver_arr = this.state.adver_arr;
    if (adver_arr != 'NA') {
      for (let index = 0; index < adver_arr.length; index++) {
        const location_lat = adver_arr[index].location_lat;
        const location_lng = adver_arr[index].location_lng;
        if (location_lat && location_lng) {
          let x = {
            latitude: parseFloat(location_lat),
            longitude: parseFloat(location_lng),
          };
          this.state.markers.push(x);
        }
      }
    }
    console.log('this.state.markers', this.state.markers);
    if (this.state.markers.length) {
      this.setState({
        initialRegion: {
          latitude: parseFloat(this.state.markers[0]?.latitude),
          longitude: parseFloat(this.state.markers[0]?.longitude),
          latitudeDelta: parseFloat(0.3494),
          longitudeDelta: parseFloat(0.203),
        },
      });
    }
  };
  goToInitialLocation = async () => {
    // let initialRegion = Object.assign({}, this.state.initialRegion);
    // initialRegion["latitudeDelta"] = 0.9;
    // initialRegion["longitudeDelta"] = 0.9;
    // this.mapView.animateToRegion(initialRegion, 2000);
    this.mapView.fitToCoordinates(this.state.markers, {
      edgePadding: {
        bottom: 200,
        right: 50,
        top: 150,
        left: 50,
      },
      animated: true,
    });
  };
  goAnotherPage = () => {
    // this.mapView.clear();
    this.props.navigation.goBack();
  };
  render() {
    console.log("$$$$$", this.state.adver_arr);
    console.log('this.state.de :>> ', this.state.destination);
    return (
      <View style={{flex: 1}}>
        {/* <StatusBar backgroundColor="#ffffff25" ></StatusBar> */}
        <View>
          <ImageBackground
            style={{width: '100%', height: 250}}
            source={require('../../Images/backgd2.jpg')}>
            <Header
              imgBack={true}
              backBtn
              searchBtn
              name="Map"
              headerHeight={270}
              backImgSource={require('../../Images/back6.jpg')}
            />
          </ImageBackground>
          {/* <View
            style={{
              backgroundColor: '#fff',
              width: '82%',
              marginTop: '-30%',
              alignSelf: 'center',
              borderRadius: 30,
              flexDirection: 'row',
              borderColor: Colors.orange,
              borderWidth: 1,
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                borderRightWidth: 0.8,
                borderRightColor: '#10B9C0',
              }}>
              <TextInput
                style={{
                  height: 40,
                  flex: 1,
                  paddingLeft: 20,
                  fontFamily: FontFamily.default,
                }}
                placeholder="Search..."
                placeholderTextColor={'rgba(0, 0, 0, 0.4)'}
                onChangeText={txt => {
                  this.setState({search: txt});
                }}
                value={this.state.search}
              />
            </View>

            <View
              style={{
                width: 60,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="search" size={35} color={Colors.orange} />
            </View>
          </View> */}
        </View>
    { this.state.type != 3 ?
        <View
          style={{
            top: -70,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            marginTop: '16%',
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          }}>
            {this.state.type == 1 ?  
          <MapView
            style={{
              flex: 1,
              borderRadius: 40,
              width: '100%',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            followUserLocation={true}
            ref={ref => (this.mapView = ref)}
            zoomEnabled={true}
            showsUserLocation={true}
            onMapReady={() => {
              this.goToInitialLocation();
            }}
            initialRegion={this.state.initialRegion}>
            {this.state.adver_arr != 'NA' &&
              this.state.adver_arr.map((item, index) =>
                item.location_lat && item.location_lng ? (
                  <Marker.Animated
                    coordinate={{
                      latitude: parseFloat(item.location_lat),
                      longitude: parseFloat(item.location_lng),
                    }}
                    isPreselected={true}
                    description={'Your are here location'}>
                    <View
                      style={{
                        height: 40,
                        width: 40,
                        borderRadius: 20,
                        backgroundColor: '#fff',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        style={{height: 30}}
                        source={require('../../../assets/icons/markerIcon.png')}
                        resizeMode="contain"
                      />
                    </View>
                    <Callout
                      onPress={() =>
                        this.props.navigation.navigate('TripTypeDetail', {
                          item: item,list: '1'
                        })
                      }>
                      <TouchableOpacity
                        style={{
                          height: 40,
                          width: 120,
                          borderRadius: 10,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            // backgroundColor: '#0A8481',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            borderRadius: 1,
                            paddingRight:10
                          }}>
                          <View
                            style={{
                              height: 30,
                              width: 30,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Image
                              resizeMode="cover"
                              style={{
                                bottom: 2,
                                width: 37,
                                // position: 'absolute',
                                height: 30,
                                left:5
                                // tintColor: '#fff',
                              }}
                              source={{uri : config.image_url4 + this.state.arry.image}}
                            />
                          </View>
                        </View>
                        <Text style={styles.map_kwd}>
                          {Lang_chg.KWD_txt[config.language]} {item.price}
                        </Text>
                      </TouchableOpacity>
                    </Callout>
                    {/* <TouchableOpacity
                      style={{flexDirection: 'row', backgroundColor: 'red', alignItems: 'center'}}
                      activeOpacity={0.9}>
                      <Image
                        resizeMode="contain"
                        style={{width: 40, height: 40}}
                        source={require('../../../assets/icons/offer.png')}
                      />
                      <View
                        style={{
                          backgroundColor: '#ccc',
                          height: 37,
                          justifyContent: 'center',
                          borderRadius: 2,
                        }}>
                        <Text style={styles.map_kwd}>
                          {Lang_chg.KWD_txt[config.language]}{' '}
                          {item.rental_price}
                        </Text>
                      </View>
                    </TouchableOpacity> */}
                  </Marker.Animated>
                ) : null,
              )}
          </MapView>
          : 
<MapView
            style={{
              flex: 1,
              borderRadius: 40,
              width: '100%',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            followUserLocation={true}
            ref={ref => (this.mapView = ref)}
            zoomEnabled={true}
            showsUserLocation={true}
            // onMapReady={() => {
            //   this.goToInitialLocation();
            // }}
            initialRegion={this.state.initialRegion}>
           
                  <Marker.Animated
                    coordinate={{
                      latitude: parseFloat(this.state.adver_arr.location_lat),
                      longitude: parseFloat(this.state.adver_arr.location_lng),
                    }}
                    isPreselected={true}
                    description={'Your Boat location'}>
                    <View
                      style={{
                        height: 40,
                        width: 40,
                        borderRadius: 20,
                        backgroundColor: '#fff',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        style={{height: 30}}
                        source={require('../../../assets/icons/markerIcon.png')}
                        resizeMode="contain"
                      />
                    </View> 
                  </Marker.Animated>
          </MapView>
          } 
        </View>
        : 
         <View
        style={{
          top: -70,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          marginTop: '16%',
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}>
         
        <MapView
          style={{
            flex: 1,
            borderRadius: 40,
            width: '100%',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
          followUserLocation={true}
          ref={ref => (this.mapView = ref)}
          zoomEnabled={true}
          showsUserLocation={true}
          // onMapReady={() => {
          //   this.goToInitialLocation();
          // }}
          initialRegion={this.state.initialRegion}>
          {this.state.destination != 'NA' &&
            this.state.destination.map((item, index) =>
              item.lat && item.lng ? (
                <Marker.Animated
                  coordinate={{
                    latitude: parseFloat(item.lat),
                    longitude: parseFloat(item.lng),
                  }}
                  isPreselected={true}
                  description={'Your island  location'}>
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      borderRadius: 20,
                      backgroundColor: '#fff',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      style={{height: 30}}
                      source={require('../../../assets/icons/markerIcon.png')}
                      resizeMode="contain"
                    />
                  </View>

                  {/* <TouchableOpacity
                    style={{flexDirection: 'row', backgroundColor: 'red', alignItems: 'center'}}
                    activeOpacity={0.9}>
                    <Image
                      resizeMode="contain"
                      style={{width: 40, height: 40}}
                      source={require('../../../assets/icons/offer.png')}
                    />
                    <View
                      style={{
                        backgroundColor: '#ccc',
                        height: 37,
                        justifyContent: 'center',
                        borderRadius: 2,
                      }}>
                      <Text style={styles.map_kwd}>
                        {Lang_chg.KWD_txt[config.language]}{' '}
                        {item.rental_price}
                      </Text>
                    </View>
                  </TouchableOpacity> */}
                  <Callout
                      // onPress={() =>
                      //   this.props.navigation.navigate('TripTypeDetail', {
                      //     item: item,list: '1'
                      //   })
                      // }
                      >
                      <TouchableOpacity
                        style={{
                          height: 40,
                          width: 120,
                          borderRadius: 10,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            // backgroundColor: '#0A8481',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            borderRadius: 1,
                            paddingRight:10
                          }}>
                          <View
                            style={{
                              height: 30,
                              width: 30,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Image
                              resizeMode="cover"
                              style={{
                                bottom: 2,
                                width: 37,
                                // position: 'absolute',
                                height: 30,
                                left:5
                                // tintColor: '#fff',
                              }}
                              source={{uri : config.image_url4 + item.image}}
                            />
                          </View>
                        </View>
                        <Text style={styles.map_kwd}>
                          {Lang_chg.KWD_txt[config.language]} {item.min_price}
                        </Text>
                      </TouchableOpacity>
                    </Callout>
                </Marker.Animated>
              ) : null,
            )}
        </MapView>
        </View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  terms_main_view: {
    backgroundColor: Colors.white,
    height: '100%',
    flex: 1,
  },
  map_kwd: {
    fontSize: 15,
    color: Colors.black,
    fontFamily: FontFamily.default,
    marginLeft: 7,
  },
  Input: {
    borderBottomColor: Colors.white,
    width: Sizes.width * 0.85,
    color: Colors.white,
  },
  notification_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: Colors.black,
    paddingTop: 15,
    paddingBottom: 15,
  },
  hole_top_l1: {
    width: 20,
    height: 20,
  },
  Notifications_title: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 20,
    color: '#000000',
  },
  back_buttn_top: {
    padding: 5,
  },
  ImageBackground: {
    backgroundColor: Colors.black,
  },
  ImageBackground_Img: {
    resizeMode: 'cover',
    //opacity:0.5
  },
});
