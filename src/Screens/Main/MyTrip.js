import React, {useState, Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {
  Icon,
  Input,
  Card,
  AirbnbRating,
  Overlay,
  Image,
} from 'react-native-elements';
import {color} from 'react-native-elements/dist/helpers';
import Header from '../../Components/Header';
import {
  back_img3,
  boat_img1,
  Colors,
  FontFamily,
  Sizes,
} from '../../Constants/Constants';
import Ad from '../../Data/Ad';
import Outgoing from '../../Data/Outgoing';
import AsyncStorage from '@react-native-community/async-storage';
import {config} from '../../Provider/configProvider';

export class MyTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myTrips: [],
      img: [],
      backgroundColor: 1,
      modalVisible: false,
      item: {},
      loading:false
    };
  }


   getMyTrips = async () => {
    try {
      const value = await AsyncStorage.getItem('user_arr');
     // if (value !== null) {
        const arrayData = JSON.parse(value);
        const response = await fetch(
          config.baseURL +
            'booking_list_user.php?user_id_post=115',
        );
        //https://myboatonline.com/app/webservice/booking_list_user.php?user_id_post=115

        const json = await response.json();

        console.log('______', json);

        this.setState({
          myTrips: json.booking_arr
        });
        this.setState({loading: false});
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({loading: false});
    }
  }

  componentDidMount() {
    this.setState({loading: true});
    this.getMyTrips();
  }
  CardView = ({ item }) => {
    console.log(item)
    return<Card containerStyle={s.Card}>
          <TouchableOpacity>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={{uri: config.baseURL + 'images/' + item.image }}
                style={{
                  height: 90,
                  width: 90,
                  borderRadius: 12,
                  //  marginLeft:-6
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 8,
                  justifyContent: 'space-between',
                }}>
                <View style={{width: Sizes.width / 2.2}}>
                  <Text style={s.name}>{item.booking_no}</Text>
                  <Text style={s.type}>{item.boat_name}</Text>
                  <Text style={s.id}>{item.id}</Text>
                  <Text style={s.type}>{item.time}</Text>
                </View>
                <View style={{justifyContent: 'space-around', marginLeft: -6}}>
                  <Text style={[s.type, {textAlign: 'right'}]}>
                    {item.status_time}
                  </Text>
                  <Text style={s.price}>{item.total_amt}</Text>
                  <Text
                    style={[
                      s.status,
                      {
                        color:
                          item.status === 'Confirmed'
                            ? Colors.confirmed
                            : item.status === 'Cancelled'
                            ? Colors.red
                            : Colors.orange,
                      },
                    ]}>
                    {item.status}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Card>
  };

  render() {
    return (
        <View style={{backgroundColor: Colors.white, flex: 1}}>
          <Header name="My Trip" searchBtn={true} imgBack={true} headerHeight={250}/>
          {/* View */}
          <View style={s.SEC2}>
            <View>
              { this.state.loading && 
                <ActivityIndicator size={30} color={Colors.orange} style={{alignSelf:"center"}} />
              }
              <FlatList
                data={this.state.myTrips}
                showsVerticalScrollIndicator={false}
                renderItem={this.CardView}
                keyExtractor={(i, ind) => ind}
                style={{
                  marginTop: 30,
                }}
                contentInsetAdjustmentBehavior="automatic"
                contentContainerStyle={{
                  paddingBottom: 10,
                  //    height:"100%"
                }}
              />
            </View>
          </View>
          {/* Overlay */}
        
      </View>
    );
  }
}
const s = StyleSheet.create({
  btn1: {
    height: 35,
    width: 240,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginBottom: 20,
    elevation: 5,
    backgroundColor: Colors.orange,
  },
  Card: {
    borderRadius: 20,
    elevation: 3,
    marginHorizontal: 10,
    marginTop: 0,
    marginBottom: 15,
    padding: 10,
  },
  btn1Text: {
    fontSize: 12,
    fontFamily: FontFamily.semi_bold,
    color: Colors.white,
  },
  btn_1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    alignSelf: 'center',
    top: 100,
  },
  SEC2: {
    backgroundColor: Colors.white,
    marginTop: -30,
    borderTopLeftRadius: 25,
    borderTopEndRadius: 25,
    flex: 1,
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
});

export default MyTrip;
