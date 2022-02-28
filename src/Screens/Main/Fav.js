import React, { useState, Component } from 'react';
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
  Linking,
  Alert
} from 'react-native';
import {
  Icon,
  Input,
  Card,
  AirbnbRating
} from 'react-native-elements';
import Header from '../../Components/Header';
import { back_img3, boat_img1, Colors, FontFamily, Sizes } from '../../Constants/Constants';
import Ad from '../../Data/Ad';
import Outgoing from '../../Data/Outgoing';
import Upcoming from '../../Data/Upcoming'
import { apifuntion } from '../../Provider/apiProvider';
import { msgProvider, msgTitle, msgText } from '../../Provider/messageProvider';
import AsyncStorage from "@react-native-community/async-storage";
import { config } from '../../Provider/configProvider';






export default class Fav extends Component {


  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      fav_arr: [],
      isLoading: false
    }
  }


  // this.setState({ isLoading: true });
  // this.getData('user_arr')


  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      console.log('focus :>> ');
      this.setState({ isLoading: true });
      this.getData('user_arr')
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }
  clearAll = async () => {
    this.setState({ isLoading: true });
    let userId = 115
    let deleteType = 'all'
    let advId = 0
    let url = config.baseURL + 'add_rm_fav.php?user_id_post=' + userId + '&type=' + deleteType + '&advertisement_id=' + advId;
    console.log(url)
    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log('json  ', json)

      if (json.success == 'true') {
        this.setState({ fav_arr: [] })
        this.setState({ isLoading: false });
        this.getData('user_arr')
      } else {


      }

    } catch (error) {
      this.setState({ isLoading: false });
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  getData = async (key) => {
    this.setState({ isLoading: true });
    console.log('local ' + key)
    try {
      const value = await AsyncStorage.getItem(key);

      console.log('local ' + value)

      //  console.log('array ',arrayData.email);
      if (value !== null) {

        const arrayData = JSON.parse(value);

        console.log(arrayData)
        this.FavoriteList(arrayData);

      }

      this.setState({ isLoading: false });
    } catch (e) {
      this.setState({ isLoading: false });
    }
  }





  async FavoriteList(arrayData) {
    console.log("****", arrayData);

    let url = config.baseURL + 'fav_list.php?user_id_post=' + arrayData.user_id;
    console.log(url)
    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log('json  ', json)

      if (json.success == 'true') {

        this.setState({ fav_arr: json.fav_arr != 'NA' ? json.fav_arr : [] })

      } else {


      }

      this.setState({ isLoading: false });
    } catch (error) {
      this.setState({ isLoading: false });
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }


  render() {
    console.log('this.state.fav_arr :>> ', this.state.fav_arr);
    return (
      <View style={{ flex: 1 }}>
        <Header
          imgBack={true}
          name="Favourites"
          headerHeight={270}
          backImgSource={require('../../Images/back1.jpg')}
        />
        <TouchableOpacity style={{ backgroundColor:Colors.orange , borderRadius:20  ,  position: 'absolute', top: 35, right: 20 }} onPress={() => this.clearAll()}>
          <Text style={{ color: Colors.white, fontFamily: FontFamily.default , fontWeight:'bold' }}>Clear All</Text>
        </TouchableOpacity>
        <View style={s.SEC2}>
          <FlatList
            data={this.state.fav_arr}
            showsVerticalScrollIndicator={false}
            //  refreshing={this.getData('user_arr')}

            renderItem={({ item }) => {
              console.log('item :>> ', item);
              return (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('TripTypeDetail', {
                      item: item, list: '1'
                    })}
                  style={{ padding: 5 }}>
                  <Card containerStyle={{ padding: 0, borderRadius: 15, paddingHorizontal: 0, margin: 7.5, marginHorizontal: 10, elevation: 5 }}>
                    <ImageBackground
                      style={s.ImageBackground}
                      imageStyle={s.imgStyle}
                      source={{ uri: config.baseURL + 'images/' + item.image }}
                    >
                      {/* Discount */}
                      <View style={[{
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
                      </View>
                      {/* Three dots */}
                      <TouchableOpacity style={{ position: "absolute", right: 10, top: 10, borderRadius: 20, backgroundColor: Colors.gray }}>
                        <Icon name="heart" type="entypo" color={item.like_status == 1 ? Colors.red : Colors.white} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => Linking.openURL(config.appUrl)}
                        style={{ position: "absolute", right: 50, top: 10, borderRadius: 20, backgroundColor: Colors.gray }}>
                        <Icon name="share" type="entypo" color={Colors.white} />
                      </TouchableOpacity>
                      <View
                        style={[{
                          height: 50,
                          //  width:97,
                          backgroundColor: Colors.white,
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          position: "absolute",
                          right: 35,
                          bottom: -1,
                          paddingHorizontal: 10,
                          borderTopLeftRadius: 12,
                          borderTopRightRadius: 12
                        }]}

                      >
                        <Text style={s.place}>starting{'\n'}KD {item.extra_price}
                        </Text>
                      </View>
                    </ImageBackground>
                    {/*  */}
                    <View style={s.SEC3}>
                      <View style={{}}>
                        <View style={{ flexDirection: 'row', height: 30, justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                          <Text style={s.title}>{item.boat_name}</Text>

                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
                            <Image style={{
                              height: 40,
                              width: 40,
                              borderRadius: 20,
                              resizeMode: "cover",
                            }}
                              source={{ uri: `https://${item.user_image}` }}
                              PlaceholderContent={<ActivityIndicator size={30} color={Colors.orange} style={{ alignSelf: "center" }} />}
                            />
                            <View style={{ marginLeft: 5, width: '65%' }}>
                              <Text numberOfLines={1} style={{ color: "rgba(51, 51, 51, 1)", fontSize: 14, fontFamily: FontFamily.default }}>{item.discription_en}</Text>
                              <AirbnbRating
                                showRating={false}
                                size={12}
                                isDisabled
                                defaultRating={item.rating}
                                starContainerStyle={{ alignSelf: "flex-start" }}
                              />
                            </View>
                          </View>
                          <View>
                            <Text style={{ color: "rgba(51, 51, 51, 1)", fontSize: 12, fontFamily: FontFamily.default }}>
                              Destination
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: "center", alignSelf: 'flex-end' }}>
                              <Icon name="person" size={14} />
                              <Text style={{ color: "rgba(51, 51, 51, 1)", fontSize: 10, fontFamily: FontFamily.default }}>{item.no_of_people} Person</Text>
                            </View>
                          </View>

                        </View>
                      </View>

                    </View>
                  </Card>
                </TouchableOpacity>
              )
            }}
            keyExtractor={(i, ind) => ind}
            style={{
              marginTop: 30
            }}
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={{
              paddingBottom: 10,
              //    height:"100%"
            }}
          />

          {this.state.isLoading && <ActivityIndicator size={30} color={Colors.orange} style={{ alignSelf: "center" }} />}
          {!this.state.fav_arr.length && !this.state.isLoading ? <Text style={{ alignSelf: 'center', position: 'absolute', top: '50%', }}>No Record Found</Text> : null}
        </View>
      </View>
    )
  }

}
const s = StyleSheet.create({
  SEC2: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 25,
    borderTopEndRadius: 25,
    marginTop: -40,
    //   marginBottom:40,
    flex: 1
  },
  btn1: {
    height: 90,
    width: 60,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    elevation: 5,
    margin: 7
  },
  btn1Text: {
    fontSize: 10,
    fontFamily: FontFamily.semi_bold,
  },
  btn_1: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  Card: {
    borderRadius: 20,
    elevation: 3,
    marginHorizontal: 10,
    marginTop: 0,
    marginBottom: 15
  },
  name: {
    fontFamily: FontFamily.semi_bold,
    fontSize: 16,
    marginBottom: 3
  },
  type: {
    fontFamily: FontFamily.default,
    fontSize: 12,
    marginBottom: 3,
    //   opacity:0.5
    color: Colors.gray1
  },
  id: {
    fontFamily: FontFamily.semi_bold,
    fontSize: 13,
    marginBottom: 3
  },
  price: {
    marginBottom: 10,
    fontFamily: FontFamily.semi_bold,
    fontSize: 15,
    color: Colors.price,
    textAlign: "right"
  },
  status: {
    color: Colors.orange,
    fontFamily: FontFamily.default,
    fontWeight: "500",
    fontSize: 14,
    textAlign: "right"
  },
  ImageBackground: {
    height: 215,
    width: "100%",
    borderRadius: 15,
    alignSelf: "center",
    // marginHorizontal:10,
    elevation: 0
  },
  imgStyle: {
    borderRadius: 15,
    height: 215,
    width: "100%",
    alignSelf: "center"
  },
  SEC3: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    paddingHorizontal: 20,
    alignItems: 'center'
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
    color: Colors.black1
  },
  no: {
    fontFamily: FontFamily.default,
    fontSize: 12,
    lineHeight: 20,
    color: Colors.black1
  },
  dis: {
    fontFamily: FontFamily.default,
    fontSize: 13,
    color: Colors.black1
  },
  place: {
    fontFamily: FontFamily.default,
    fontSize: 14,
    color: Colors.orange
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
})
