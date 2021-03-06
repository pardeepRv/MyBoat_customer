import AsyncStorage from "@react-native-community/async-storage";
import React, { Component } from "react";
import {
  ActivityIndicator,
  Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View
} from "react-native";
import { AirbnbRating, Icon } from "react-native-elements";
import FastImage from "react-native-fast-image";
import GetLocation from 'react-native-get-location';
import getDirections from 'react-native-google-maps-directions';
import { SliderBox } from "react-native-image-slider-box";
import Share from "react-native-share";
import RNFetchBlob from "rn-fetch-blob";
import {
  Colors,
  FontFamily
} from "../../Constants/Constants";
import { apifuntion } from "../../Provider/apiProvider";
import { config } from "../../Provider/configProvider";
import { Lang_chg } from "../../Provider/Language_provider";
import { msgProvider } from "../../Provider/messageProvider";
import { UserContext } from "./UserContext";

//import {SliderBox} from 'react-native-image-slider-box';
const { width } = Dimensions.get("window");
export default class TripTypeDetail extends Component {
  static contextType = UserContext
  constructor(props) {
    super(props);
    this.state = {
      addon_arr_formatted: [],
      destinations: [],
      img: [],
      trips_arr: [],
      promotions_arr: [],
      advertisement: this.props.route.params.item,
      destinations_arr: [],
      img_arr: [],
      adver_arr: [],
      ratingscreen: [],
      user: [],
      calender_arr: [],
      webviewshow: false,
      booking_arr: [],
      isSelected: false,
      selectedMethod: 0,
      list: this.props.route.params.list,
      loader: false,
      other_user_id: null,
      other_user_img: "",
      other_user_name: '',
      mobile: "",
      location: [
        latitude = '',
        longitude = '',
      ]
    };
  }

  componentDidMount() {

    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      //I'm not sure what is best for the timeout to be set as. Some more testing could be beneficial
      timeout: 15000,
    })
      .then(location => {
        console.log('getting locationn >>>>>>>>>>>>>', location);
        this.setState({
          location: [
            latitude = location.latitude,
            longitude = location.longitude,
          ]
        })
        // setLocation(location);
      })
      .catch(error => {
        const { code, message } = error;
        console.log(code, message);
      });

    this.getData("user_arr");

    return console.log(this.props.route.params.list, " hhhhhhhhhhhhh");
  }

  downloadImage = () => {
    RNFetchBlob.fetch(
      "GET",
      `https://myboatonline.com/app/webservice/images/2BqiM20wtjxOdlJ1366903610.jpeg`
    )
      .then((resp) => {
        console.log("response : ", resp);
        console.log(resp.data);
        let base64image = resp.data;
        this.onShare("data:image/png;base64," + base64image);
      })
      .catch((err) => errorHandler(err));
  };

  handleGetDirections = () => {

    const data = {
      source: {
        latitude: this.state.location[0],
        longitude: this.state.location[1]
      },
      destination: {
        latitude: Number(this.state.adver_arr.location_lat),
        longitude: Number(this.state.adver_arr.location_lng)
      },
      params: [
        {
          key: "travelmode",
          value: "driving"        // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate"       // this instantly initializes navigation using the given travel mode
        }
      ],
      // waypoints: [
      //   {
      //     latitude: -33.8600025,
      //     longitude: 18.697452
      //   },
      //   {
      //     latitude: -33.8600026,
      //     longitude: 18.697453
      //   },
      //      {
      //     latitude: -33.8600036,
      //     longitude: 18.697493
      //   }
      // ]
    }

    console.log('data :>> ', data);

    getDirections(data)
  }

  onShare = async () => {
    let shareMessage =
      "https://myboatonline.com/";
    const options = {
      title: "Advertim",
      // url:'https://myboatonline.com/app/webservice/images/2BqiM20wtjxOdlJ1366903610.jpeg',
      message: shareMessage,
    };
    try {
      await Share.open(options);
      return console.log("Options :>> ", options);
    } catch (err) {
      console.log(err);
    }
  };

  getData = async (key) => {
    console.log("local " + key);
    try {
      const value = await AsyncStorage.getItem(key);

      //          console.log('local '+value)

      //  console.log('array ',arrayData.email);
      if (value !== null) {
        const arrayData = JSON.parse(value);

        //  console.log(arrayData)
        this.setState({ user: arrayData });
        this.ProfileDetail(arrayData.user_id);
      }
    } catch (e) {
      // error reading value
    }
  };

  async ProfileDetail(user_id) {
    console.log("user ", user_id);

    let url =
      config.baseURL +
      "advertisement_details.php?user_id_post=" +
      user_id +
      "&type=booking&advertisement_id=" +
      this.state.advertisement.advertisement_id;

    console.log(url, 'url in triptype details ');
    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log("json  ", json);

      this.setState({
        addon_arr_formatted: json?.adver_arr?.addon_arr_formatted,
        ratingscreen: json,
        adver_arr: json.adver_arr,
        img_arr: json.adver_arr && json.adver_arr.img_arr.length > 0 && json.adver_arr.img_arr,
        // booking_arr: json.booking_arr != "NA" ? json.booking_arr : [],
        booking_arr: json?.combine_unavailable_dates,

        other_user_id: json.adver_arr?.user_id,
        other_user_img: json.adver_arr?.other_user_img,
        other_user_name: json.adver_arr?.other_user_name,
        mobile: json.adver_arr?.mobile,
      });

      // console.log('add ',json.adver_arr.addon_arr)

      // console.log('obj ',json.adver_arr.destination_arr)

      json.adver_arr.img_arr.forEach((item) => {
        console.log(item);
        this.state.img.push(config.image_url4 + item.image);
      });
      if (json.success == "true") {
      } else {
        msgProvider.toast(json?.msg[0], 'center');

      }

      // console.log(this.state.img)
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  BookNow() {
    console.log(
      "object :>> ",
      this.state.advertisement,
      this.state.adver_arr,
      this.state.user,
      this.state.booking_arr
    );

    this.props.navigation.navigate("RequestPayment", {
      user_id_post: this.state.user,
      adver_arr: this.state.adver_arr,
      advertisement: this.state.advertisement,
      booking_arr: this.state.booking_arr,
    });
  }
  ratings = () => {
    // this.props.navigation.navigate('Ratings');
    this.props.navigation.navigate("DetailsRating", { item: this.state.ratingscreen, data: this.state.advertisement });
  };
  gotoBack = () => {
    this.props.navigation.goBack();
  };
  Goto() {
    console.log('goto');
    this.props.navigation.navigate('GoogleMap', {
      adver_arr: this.state.adver_arr,
      type: 2

    });
  }
  cancelbooking() {
    this.setState({ loader: true });
    let url = config.baseURL + "customer_booking_status.php";

    var formData = new FormData();
    formData.append("booking_id", this.state.advertisement.booking_id);
    formData.append("customer_id", this.state.advertisement.user_id);
    console.log('url :>> ', url);
    console.log(formData);
    apifuntion
      // .postApi(url, formData)
      // .then((res) => {
      //    console.log("res from cancelation ", res);
      //   this.setState({loading: false});
      //   if (res.success === "true") {
      //     this.gotoBack()
      //   } else {
      //     alert("Something went wrong");
      //   }
      // })
      .postApi(url, formData)
      .then(obj => {
        return obj.json();
      })
      .then(obj => {
        this.setState({ loader: false });
        console.log("Update Response", obj);

        if (obj.success == 'true') {
          this.gotoBack()
        } else {
          msgProvider.toast(obj?.msg, 'center');
        }
      })
      .catch((err) => console.log(err));
  };
  render() {
    const { addon_arr_formatted } = this.state;

    const user = this.context
    console.log('context in home', user);
    console.log('advertisement in :>> ', this.state.adver_arr);
    console.log('advertisement :>> ', this.state.advertisement);
    let item = {};
    item["other_user_id"] = this.state.other_user_id;
    item["image"] = this.state.other_user_img;
    item["name"] = this.state.other_user_name;

    return (
      <View style={{ backgroundColor: Colors.white, flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            zIndex: 1,
            justifyContent: "space-between",
          }}
        >
          {user.value == 1 ?

            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={{
                marginBottom: -65,
                alignItems: "flex-start",
                marginTop: 40,
                marginLeft: 20,
                backgroundColor: Colors.orange,
                borderRadius: 25,
                transform: [{ rotate: '180deg' }]
              }}
            >
              <Icon
                name="arrow-back"
                type="ionicons"
                size={26}
                color={Colors.white}
              />
            </TouchableOpacity>
            :
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={{
                marginBottom: -65,
                alignItems: "flex-start",
                marginTop: 40,
                marginLeft: 20,
                backgroundColor: Colors.orange,
                borderRadius: 25,
              }}
            >
              <Icon
                name="arrow-back"
                type="ionicons"
                size={26}
                color={Colors.white}
              />
            </TouchableOpacity>
          }
          <TouchableOpacity
            style={{
              marginBottom: -65,
              alignItems: "flex-end",
              marginTop: 40,
              marginRight: 20,
              backgroundColor: Colors.orange,
              borderRadius: 20,
            }}
          >
            <Icon
              name="share"
              type="ionicons"
              size={26}
              color={Colors.white}
              onPress={this.onShare}
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentInset={{ bottom: 40 }}
        >
          <SliderBox
            ImageComponent={FastImage}
            images={this.state.img}
            sliderBoxHeight={300}
            sliderBoxWidth={400}
            autoplayInterval={3000}
            circleLoop
            onCurrentImagePressed={(index) =>
              console.warn(`image ${index} pressed`)
            }
            //currentImageEmitter={index => console.warn(`image ${index} pressed`)}
            dotColor={Colors.orange}
            inactiveDotColor="#90A4AE"
            paginationBoxVerticalPadding={10}
            paginationBoxStyle={{
              position: "absolute",
              bottom: -30,
              padding: 0,
              alignItems: "center",
              alignSelf: "center",
              justifyContent: "center",
              paddingVertical: 10,
            }}
            dotStyle={{
              width: 7,
              height: 7,
              borderRadius: 20,
              marginHorizontal: -9,

              //  borderRadius:0,
              padding: 0,
              margin: 0,
              backgroundColor: "rgba(128, 128, 128, 0.92)",
              transform: [{ rotate: "40deg" }],
            }}
            autoplay
            ImageComponentStyle={{
              borderRadius: 5,
              width: "99%",
              marginTop: 0,
            }}
            imageLoadingColor="#2196F3"
          />
          <View style={s.SEC3}>
            <View style={{}}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 5,
                }}
              >
                <View
                >
                  <Image
                    style={{
                      height: 40,
                      width: 40,
                      borderRadius: 20,
                      resizeMode: "cover",
                    }}
                    source={{
                      uri:
                        config.baseURL +
                        "images/" +
                        this.state.adver_arr?.user_image,
                    }}
                    PlaceholderContent={
                      <ActivityIndicator
                        size={30}
                        color={Colors.orange}
                        style={{ alignSelf: "center" }}
                      />
                    }
                  />
                </View>


                <View style={{ marginLeft: "15%" }}>
                  <Text
                    style={{
                      color: Colors.orange,
                      fontSize: 18,
                      fontWeight: "bold",
                      fontFamily: FontFamily.default,
                      marginLeft: 5,
                    }}
                  >
                    {this.state.adver_arr?.boat_name}
                  </Text>
                  <AirbnbRating
                    showRating={false}
                    size={12}
                    isDisabled
                    defaultRating={this.state?.adver_arr?.rating}
                    starContainerStyle={{ alignSelf: "flex-start" }}
                  />
                </View>
              </View>
              <View style={{ flexDirection: "row", marginLeft: 65 }}>
                <Icon name="person" size={14} />
                {/* <Text style={{color:"rgba(51, 51, 51, 1)",fontSize:14,fontFamily:FontFamily.default}}>{this.state.adver_arr.captain_name}</Text> */}
                <Text
                  style={{
                    color: "rgba(51, 51, 51, 1)",
                    fontSize: 14,
                    fontFamily: FontFamily.default,
                    marginTop: -2,
                  }}
                >
                  {user.value == 1 ? this.state?.adver_arr?.captain_name &&
                    this.state?.adver_arr?.captain_name[1] : this.state?.adver_arr?.captain_name &&
                  this.state?.adver_arr?.captain_name[0]}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              // alignSelf: "flex-end",
            }}
          >
            <View style={{ width: "50%", height: "50%", alignItems: "center" }}>
              <View
                style={{
                  width: 60,
                  height: 60,
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: Colors.orange,
                  borderRadius: 80,
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../assets/icons/tag.png")}
                  style={[s.tool, { marginLeft: 3 }]}
                  resizeMode="contain"
                />
              </View>
              <Text style={s.text}>
                {user.value == 1 ? this.state.adver_arr?.trip_type_name &&
                  this.state.adver_arr?.trip_type_name[1] : this.state.adver_arr?.trip_type_name &&
                this.state.adver_arr?.trip_type_name[0]}
              </Text>
            </View>

            <View style={{ width: "50%", height: "50%", alignItems: "center" }}>
              <View
                style={{
                  width: 60,
                  height: 60,
                  alignItems: "center",
                  backgroundColor: Colors.orange,
                  borderRadius: 80,
                  padding: 10,
                }}
              >
                <Image
                  source={require("../../../assets/icons/tag2.png")}
                  style={s.tool}
                  resizeMode="contain"
                />
              </View>
              <Text style={s.text}>
                {user.value == 1 ? this.state.adver_arr?.city_name &&
                  this.state.adver_arr?.city_name[1] : this.state.adver_arr?.city_name &&
                this.state.adver_arr?.city_name[0]}{" "}
              </Text>
            </View>

            {/* <View> ;
  <Text>
{this.state.adver_arr.city_name} </Text>
</View> */}
          </View>

          <View style={s.categery}>
            <View style={(s.container1, s.top_margin)}>
              <View style={{ flex: 1, alignItems: "center" }}>
                <ImageBackground
                  style={s.circleView}
                  resizeMode="contain"
                  source={require("../../../assets/icons/ellipse.png")}
                >
                  <Image
                    source={require("../../../assets/icons/boat_solid.png")}
                    style={s.small_icon}
                    resizeMode="contain"
                  />
                </ImageBackground>
                <Text style={s.text}>{user.value == 1 ? Lang_chg.text_Boat_size0[1] : Lang_chg.text_Boat_size0[0]}</Text>
                <Text style={s.text}>{this.state.adver_arr ? this.state.adver_arr.boat_capacity : ''} ft</Text>
              </View>

              <View style={{ flex: 1, alignItems: "center" }}>
                <ImageBackground
                  style={s.circleView}
                  resizeMode="contain"
                  source={require("../../../assets/icons/ellipse.png")}
                >
                  <Image
                    source={require("../../../assets/icons/boat_solid.png")}
                    style={s.small_icon}
                    resizeMode="contain"
                  />
                </ImageBackground>
                <Text style={s.text}>{user.value == 1 ? Lang_chg.txt_Boat_brand[1] : Lang_chg.txt_Boat_brand[0]}</Text>
                <Text style={s.text}> {this.state.adver_arr ? this.state.adver_arr.boat_brand : ''} </Text>
              </View>

              <View style={{ flex: 1, alignItems: "center" }}>
                <ImageBackground
                  style={s.circleView}
                  resizeMode="contain"
                  source={require("../../../assets/icons/ellipse.png")}
                >
                  <Image
                    source={require("../../../assets/icons/watch_icon2.png")}
                    style={s.small_icon}
                    resizeMode="contain"
                  />
                </ImageBackground>
                <Text style={s.text}>{user.value == 1 ? Lang_chg.triphourstrip[1] : Lang_chg.triphourstrip[0]}</Text>
                <Text style={s.text}>
                  {" "}
                  {this.state.adver_arr ? this.state.adver_arr?.minimum_hours : ''}{" "}
                </Text>
              </View>
            </View>

            <View style={[s.container1]}>
              <View style={{ flex: 1, alignItems: "center" }}>
                <ImageBackground
                  style={s.circleView}
                  resizeMode="contain"
                  source={require("../../../assets/icons/ellipse.png")}
                >
                  <Image
                    source={require("../../../assets/icons/equipment1.png")}
                    style={s.small_icon}
                    resizeMode="contain"
                  />
                </ImageBackground>
                <Text style={s.text}>{user.value == 1 ? Lang_chg.equpmenttrip[1] : Lang_chg.equpmenttrip[0]}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 12 }}>
                  {this.state.adver_arr && this.state.adver_arr.addon_arr_formatted && this.state.adver_arr.addon_arr_formatted != 'NA'
                    && this.state.adver_arr?.addon_arr_formatted.equipment && this.state.adver_arr?.addon_arr_formatted.equipment.length > 0
                    && this.state.adver_arr?.addon_arr_formatted.equipment.length}
                </Text>
              </View>

              <View style={{ flex: 1, alignItems: "center" }}>
                <ImageBackground
                  style={s.circleView}
                  resizeMode="contain"
                  source={require("../../../assets/icons/ellipse.png")}
                >
                  <Image
                    source={require("../../../assets/icons/entertainment.png")}
                    style={s.small_icon}
                    resizeMode="contain"
                  />
                </ImageBackground>
                <Text style={s.text}>{user.value == 1 ? Lang_chg.entertainmenttrip[1] : Lang_chg.entertainmenttrip[0]}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 12 }}>
                  {this.state.adver_arr && this.state.adver_arr.addon_arr_formatted && this.state.adver_arr.addon_arr_formatted != 'NA'
                    && this.state.adver_arr?.addon_arr_formatted.entertainment && this.state.adver_arr?.addon_arr_formatted.entertainment.length > 0
                    && this.state.adver_arr?.addon_arr_formatted.entertainment.length}
                </Text>
              </View>

              <View style={{ flex: 1, alignItems: "center" }}>
                <ImageBackground
                  style={s.circleView}
                  resizeMode="contain"
                  source={require("../../../assets/icons/ellipse.png")}
                >
                  <Image
                    source={require("../../../assets/icons/food.png")}
                    style={s.small_icon}
                    resizeMode="contain"
                  />
                </ImageBackground>
                <Text style={s.text}>{user.value == 1 ? Lang_chg.foodtrip[1] : Lang_chg.foodtrip[0]}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 12 }}>
                  {this.state.adver_arr && this.state.adver_arr.addon_arr_formatted && this.state.adver_arr.addon_arr_formatted != 'NA'
                    && this.state.adver_arr?.addon_arr_formatted.food && this.state.adver_arr?.addon_arr_formatted.food.length > 0
                    && this.state.adver_arr?.addon_arr_formatted.food.length}
                </Text>
              </View>
            </View>

            <View style={[s.container1]}>
              <View style={{ flex: 1, alignItems: "center" }}>
                <ImageBackground
                  style={s.circleView}
                  resizeMode="contain"
                  source={require("../../../assets/icons/ellipse.png")}
                >
                  <Image
                    source={require("../../../assets/icons/cabin.png")}
                    style={s.small_icon}
                    resizeMode="contain"
                  />
                </ImageBackground>
                <Text style={s.text}>{user.value == 1 ? Lang_chg.txt_Cabin[1] : Lang_chg.txt_Cabin[0]}</Text>
                <Text style={s.text}>
                  {" "}
                  {this.state.adver_arr ? this.state.adver_arr?.boat_cabins : ''}{" "}
                </Text>
              </View>

              <View style={{ flex: 1, alignItems: "center" }}>
                <ImageBackground
                  style={s.circleView}
                  resizeMode="contain"
                  source={require("../../../assets/icons/ellipse.png")}
                >
                  <Image
                    source={require("../../../assets/icons/guest.png")}
                    style={s.small_icon}
                    resizeMode="contain"
                  />
                </ImageBackground>
                <Text style={s.text}>{user.value == 1 ? Lang_chg.noogguest[1] : Lang_chg.noogguest[0]}</Text>
                <Text style={s.text}>
                  {this.state.adver_arr ? this.state.adver_arr?.no_of_people : ''}{" "}
                </Text>
              </View>

              <View style={{ flex: 1, alignItems: "center" }}>
                <ImageBackground
                  style={s.circleView}
                  resizeMode="contain"
                  source={require("../../../assets/icons/ellipse.png")}
                >
                  <Image
                    source={require("../../../assets/icons/toilet.png")}
                    style={s.small_icon}
                    resizeMode="contain"
                  />
                </ImageBackground>
                <Text style={s.text}>{user.value == 1 ? Lang_chg.toilets_txt[1] : Lang_chg.toilets_txt[0]}</Text>
                <Text style={s.text}>{this.state.adver_arr ? this.state.adver_arr.idle_time : ''}</Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 1, top: 8, alignItems: "flex-start" }}>
            <Text style={s.disc}>
              {user.value == 1 ? Lang_chg.Discription[1] : Lang_chg.Discription[0]}
            </Text>
            <Text style={[s.detail, { lineHeight: 27 }]}>
              {user.value == 1 ? this.state.adver_arr && this.state.adver_arr.discription_arr &&
                this.state.adver_arr.discription_arr[1] : this.state.adver_arr && this.state.adver_arr.discription_arr &&
              this.state.adver_arr.discription_arr[0]}
            </Text>
          </View>
          <Text style={s.borders} />
          <View style={{ alignItems: "flex-start" }}>
            <Text
              style={{
                lineHeight: 27,
                marginLeft: "3%",
                fontSize: 18,
                fontFamily: FontFamily.semi_bold,

              }}
            >
              {" "}
              {user.value == 1 ? Lang_chg.text_booking_details[1] : Lang_chg.text_booking_details[0]}
            </Text>
          </View>

          {this.state.list == 2 ?

            <View style={{ Flex: 1 }}>
              <View style={s.container}>
                <View style={s.item}>
                  <Text style={s.leftText}> {user.value == 1 ? Lang_chg.Customername[1] : Lang_chg.Customername[0]}</Text>
                </View>

                <View style={s.item}>
                  <Text style={[s.rightText, { fontFamily: FontFamily.default }]}>
                    {this.state.advertisement.Coustemer_name}
                  </Text>
                </View>
              </View>

              <View style={s.container}>
                <View style={s.item}>
                  <Text style={s.leftText}>{user.value == 1 ? Lang_chg.Bookdatetrip[1] : Lang_chg.Bookdatetrip[0]}</Text>
                </View>

                <View style={s.item}>
                  <Text style={[s.rightText, { fontFamily: FontFamily.default }]}>
                    {this.state.advertisement?.date}{' '}
                  </Text>
                </View>
              </View>

              <View style={s.container}>
                <View style={s.item}>
                  <Text style={[s.leftText]}> {user.value == 1 ? Lang_chg.TripTimetrip[1] : Lang_chg.TripTimetrip[0]}</Text>
                </View>

                <View style={s.item}>
                  <Text style={[s.rightText, { fontFamily: FontFamily.default }]}>
                    {this.state.advertisement?.time}{' '}
                  </Text>
                </View>
              </View>

              <View style={s.container}>
                <View style={s.item}>
                  <Text style={[s.leftText]}>{user.value == 1 ? Lang_chg.noogguesttriptour[1] : Lang_chg.noogguesttriptour[0]}</Text>
                </View>

                <View style={s.item}>
                  <Text style={[s.rightText, { fontFamily: FontFamily.default }]}>
                    {this.state.advertisement.no_of_guest}{' '}
                  </Text>
                </View>
              </View>

              <View style={s.container}>
                <View style={s.item}>
                  <Text style={[s.leftText]}>{user.value == 1 ? Lang_chg.triphourcheckout[1] : Lang_chg.triphourcheckout[0]}</Text>
                </View>

                <View style={s.item}>
                  <Text style={[s.rightText, { fontFamily: FontFamily.default }]}>
                    {this.state.advertisement.minimum_hours} {user.value == 1 ? Lang_chg.Hours[1] : Lang_chg.Hours[0]}{' '}
                  </Text>
                </View>
              </View>
              <View style={s.container}>
                <View style={s.item}>
                  <Text style={[s.leftText]}> {user.value == 1 ? Lang_chg.extrahourcheckout[1] : Lang_chg.extrahourcheckout[0]}</Text>
                </View>

                <View style={s.item}>
                  <Text style={[s.rightText, { fontFamily: FontFamily.default }]}>
                    {this.state.advertisement.extra_time} {user.value == 1 ? Lang_chg.Hours[1] : Lang_chg.Hours[0]}

                  </Text>
                </View>
              </View>
              <View style={s.container}>
                <View style={s.item}>
                  <Text style={[s.leftText]}> {user.value == 1 ? Lang_chg.Boatplacetrip[1] : Lang_chg.Boatplacetrip[0]}</Text>
                </View>

                <View style={s.item}>
                  <Text style={[s.rightText, { fontFamily: FontFamily.default }]}>
                    {user.value == 1 ? this.state.advertisement.boat_place[1] : this.state.advertisement.boat_place[0]}{' '}
                  </Text>
                </View>
              </View>

              <View style={s.container}>
                <View style={s.item}>
                  <Text style={[s.leftText]}> {user.value == 1 ? Lang_chg.tripdestinationcheckout[1] : Lang_chg.tripdestinationcheckout[0]}</Text>
                </View>

                <View style={s.item}>
                  <Text numberOfLines={1} ellipsizeMode='tail' style={[s.rightText, { fontFamily: FontFamily.default }]}>
                    {user.value == 1 ? this.state.advertisement.destination_name[1] : this.state.advertisement.destination_name[0]}{' '}
                  </Text>
                </View>
              </View>

              <View style={s.container}>
                <View style={s.item}>
                  <Text style={[s.leftText]}> {user.value == 1 ? Lang_chg.triptypetrip[1] : Lang_chg.triptypetrip[0]}</Text>
                </View>
                <View style={s.item}>
                  <Text style={[s.rightText, { fontFamily: FontFamily.default }]}>
                    {user.value == 1 ? this.state.advertisement.trip_type[1] : this.state.advertisement.trip_type[0]}{' '}
                  </Text>
                </View>
              </View>
              <View style={s.container}>
                <View style={s.item}>
                  <Text style={[s.leftText]}> {user.value == 1 ? Lang_chg.discount_per_txt[1] : Lang_chg.discount_per_txt[0]}</Text>
                </View>

                <View style={s.item}>
                  <Text style={[s.rightText, { fontFamily: FontFamily.default }]}>
                    {this.state.advertisement?.discount} %{' '}
                  </Text>
                </View>
              </View>
              <View style={s.container}>
                <View style={s.item}>
                  <Text style={[s.leftText]}> {user.value == 1 ? Lang_chg.coupendiscountcheckout[1] : Lang_chg.coupendiscountcheckout[0]}</Text>
                </View>

                <View style={s.item}>
                  <Text style={[s.rightText, { fontFamily: FontFamily.default }]}>
                    {this.state.advertisement?.coupon_discount ? this.state.advertisement?.coupon_discount : " 0"} %{' '}
                  </Text>
                </View>
              </View>

              <View style={s.container}>
                <View style={s.item}>
                  <Text style={[s.leftText]}> {user.value == 1 ? Lang_chg.Triptypeprice[1] : Lang_chg.Triptypeprice[0]}</Text>
                </View>

                <View style={s.item}>
                  <Text style={[s.rightText, { fontFamily: FontFamily.default }]}>
                    {user.value == 1 ? Lang_chg.KD[1] : Lang_chg.KD[0]} {this.state.advertisement?.trip_price}{' '}
                  </Text>
                </View>
              </View>
              {this.state.rent_amount == 0 ? null :
                <View style={s.container}>
                  <View style={s.item}>
                    <Text style={[s.leftText]}> {user.value == 1 ? Lang_chg.Sel_data[1] : Lang_chg.Sel_data[0]}</Text>
                  </View>

                  <View style={s.item}>
                    <Text style={[s.rightText, { fontFamily: FontFamily.default }]}>
                      {user.value == 1 ? Lang_chg.KD[1] : Lang_chg.KD[0]} {this.state.advertisement.selected_Item_price}{' '}
                    </Text>
                  </View>
                </View>}

              {/* rent_amount */}
              <View style={s.container}>
                <View style={s.item}>
                  <Text style={[s.leftText]}> {user.value == 1 ? Lang_chg.toatalpricecheckout[1] : Lang_chg.toatalpricecheckout[0]}</Text>
                </View>

                <View style={s.item}>
                  <Text style={[s.rightText, { fontFamily: FontFamily.bold, color: Colors.orange }]}>
                    {user.value == 1 ? Lang_chg.KD[1] : Lang_chg.KD[0]} {this.state.advertisement.total_amt}{' '}
                  </Text>
                </View>
              </View>


            </View>

            :


            <View style={{ flex: 1, top: 7, alignItems: 'flex-start' }}>
              <View style={s.container}>
                <View style={s.item}>
                  <Text style={s.leftText}>
                    {user.value == 1 ? Lang_chg.advertisementtrip[1] : Lang_chg.advertisementtrip[0]}</Text>
                </View>

                <View style={s.item}>
                  <Text style={s.rightText}>
                    {this.state.adver_arr.boat_type == 2 ? user.value == 1 ? '???????? ????????' : "Public trip" : user.value == 1 ? '???????? ????????' : "Private trip"}{" "}
                  </Text>
                </View>
              </View>

              <View style={s.container}>
                <View style={s.item}>
                  <Text style={s.leftText}>{user.value == 1 ? Lang_chg.Discounttrip[1] : Lang_chg.Discounttrip[0]} </Text>
                </View>

                <View style={s.item}>
                  <Text style={s.rightText}>
                    {this.state.adver_arr ? this.state.adver_arr.discount : '0'} %{" "}
                  </Text>
                </View>
              </View>
              <View style={s.container}>
                <View style={s.item}>
                  <Text style={s.leftText}>{user.value == 1 ? Lang_chg.triptypetrip[1] : Lang_chg.triptypetrip[0]}</Text>
                </View>

                <View style={s.item}>
                  <Text style={s.rightText}>
                    {user.value == 1 ? this.state.adver_arr && this.state.adver_arr.trip_type_name && this.state.adver_arr.trip_type_name.length > 0 && this.state.adver_arr.trip_type_name[1] : this.state.adver_arr && this.state.adver_arr.trip_type_name && this.state.adver_arr.trip_type_name.length > 0 && this.state.adver_arr.trip_type_name[0]}{" "}
                  </Text>
                </View>
              </View>

              <View style={s.container}>
                <View style={s.item}>
                  <Text style={s.leftText}>{user.value == 1 ? Lang_chg.Destinationtrip[1] : Lang_chg.Destinationtrip[0]}</Text>
                </View>

                <View style={s.item}>
                  <Text style={s.rightText}>
                    {/* {this.state.adver_arr &&
                this.state.adver_arr.destination_arr &&
                this.state.adver_arr.destination_arr.length > 0 &&
                this.state.adver_arr.destination_arr[0].destination &&
                this.state.adver_arr.destination_arr[0].destination.length >
                0 &&
                this.state.adver_arr.destination_arr[0].destination[0]} */}
                    {user.value == 1 ? this.state.advertisement && this.state.advertisement.destination_name && this.state.advertisement.destination_name.length > 0 && this.state.advertisement.destination_name[1] :
                      this.state.advertisement && this.state.advertisement.destination_name && this.state.advertisement.destination_name.length > 0 && this.state.advertisement.destination_name[0]}
                    {" "}
                  </Text>
                </View>
              </View>

              <View style={s.container}>
                <View style={s.item}>
                  <Text style={s.leftText}>{user.value == 1 ? Lang_chg.Boatplacetrip[1] : Lang_chg.Boatplacetrip[0]} </Text>
                </View>

                <View style={s.item}>
                  <Text style={s.rightText}>
                    {user.value == 1 ? this.state.adver_arr && this.state.adver_arr.city_name &&
                      this.state.adver_arr.city_name[1] : this.state.adver_arr && this.state.adver_arr.city_name &&
                    this.state.adver_arr.city_name[0]}{" "}
                  </Text>
                </View>
              </View>

              <View style={s.container}>
                <View style={s.item}>
                  <Text style={s.leftText}>{user.value == 1 ? Lang_chg.Triptypeprice[1] : Lang_chg.Triptypeprice[0]}</Text>
                </View>

                <View style={s.item}>
                  <Text style={s.rightText}>{user.value == 1 ? Lang_chg.KD[1] : Lang_chg.KD[0]} {this.state.advertisement.price == 'NA' ? user.value == 1 ? '?????? ??????????' : 'not available' : this.state.advertisement.price} </Text>
                </View>
              </View>

              <View style={s.container}>
                <View style={s.item}>
                  <Text style={s.leftText}>{user.value == 1 ? Lang_chg.extraperhourtrip[1] : Lang_chg.extraperhourtrip[0]} </Text>
                </View>

                <View style={s.item}>
                  <Text style={s.rightText}>
                    {user.value == 1 ? Lang_chg.KD[1] : Lang_chg.KD[0]} {this.state.adver_arr ? this.state.adver_arr.extra_price : ''}{" "}
                  </Text>
                </View>
              </View>
              {/* <View style={s.container}>
        <View style={s.item}>
          <Text style={s.leftText}> Trip time :</Text>
        </View>

        <View style={s.item}>
          <Text style={s.rightText}>{this.state.adver_arr.location_address} </Text>
        </View>
      </View> */}
              <View style={s.container}>
                <View style={s.item}>
                  <Text style={s.leftText}>{user.value == 1 ? Lang_chg.noogguesttrip[1] : Lang_chg.noogguesttrip[0]} </Text>
                </View>

                <View style={s.item}>
                  <Text style={s.rightText}>
                    {this.state.adver_arr ? this.state.adver_arr.no_of_people : ''}{" "}
                  </Text>
                </View>
              </View>

              <View style={s.container}>
                <View style={s.item}>
                  <Text style={s.leftText}>{user.value == 1 ? Lang_chg.triphourstrip[1] : Lang_chg.triphourstrip[0]} </Text>
                </View>

                <View style={s.item}>
                  <Text style={s.rightText}>
                    {this.state.adver_arr ? this.state.adver_arr?.minimum_hours : '0'} {user.value == 1 ? Lang_chg.Hours[1] : Lang_chg.Hours[0]}{" "}
                  </Text>
                </View>
              </View>

              <View style={s.container}>
                <View style={s.item}>
                  <Text style={s.leftText}>{user.value == 1 ? Lang_chg.Can_days[1] : Lang_chg.Can_days[0]} </Text>
                </View>

                <View style={s.item}>
                  <Text style={s.rightText}>{this.state.adver_arr.free_cancel_days} {user.value == 1 ? Lang_chg.Day[1] : Lang_chg.Day[0]} </Text>
                </View>
              </View>

              <View style={s.container}>
                <View style={s.item}>
                  <Text style={s.leftText}>{user.value == 1 ? Lang_chg.equpmenttrip[1] : Lang_chg.equpmenttrip[0]}</Text>
                </View>

                <View style={[s.item,{padding:2}]}>
                  {addon_arr_formatted?.equipment &&
                    addon_arr_formatted?.equipment.map((v, i) => {
                      return (
                        <Text style={[{ fontFamily: FontFamily.default }]}>
                          {v?.addon_product_name && v.addon_product_name[0]}
                        </Text>
                      );
                    })}
                  {/* <Text style={s.rightText}>
                    {this.state.adver_arr && this.state.adver_arr.addon_arr_formatted
                      && this.state.adver_arr?.addon_arr_formatted.equipment && this.state.adver_arr?.addon_arr_formatted.equipment.length > 0
                      && this.state.adver_arr?.addon_arr_formatted.equipment ? user.value == 1 ? Lang_chg.avilable_text[1] : Lang_chg.avilable_text[0]
                      : user.value == 1 ? Lang_chg.notavailable_text[1] : Lang_chg.notavailable_text[0]}
                  </Text> */}
                </View>
              </View>

              <View style={s.container}>
                <View style={s.item}>
                  <Text style={s.leftText}>{user.value == 1 ? Lang_chg.entertainmenttrip[1] : Lang_chg.entertainmenttrip[0]}</Text>
                </View>

                <View style={[s.item, {}]}>
                  {/* <Text style={s.rightText}>
                    {this.state.adver_arr && this.state.adver_arr.addon_arr_formatted
                      && this.state.adver_arr?.addon_arr_formatted.food && this.state.adver_arr?.addon_arr_formatted.food.length > 0
                      && this.state.adver_arr?.addon_arr_formatted.food ? user.value == 1 ? Lang_chg.avilable_text[1] : Lang_chg.avilable_text[0]
                      : user.value == 1 ? Lang_chg.notavailable_text[1] : Lang_chg.notavailable_text[0]}
                  </Text> */}
                  {addon_arr_formatted?.entertainment &&
                    addon_arr_formatted?.entertainment.map((v, i) => {
                      return (
                        <Text style={[{ fontFamily: FontFamily.default }]}>
                          {v?.addon_product_name && v.addon_product_name[0]}
                        </Text>
                      );
                    })}
                </View>
              </View>

              <View style={s.container}>
                <View style={s.item}>
                  <Text style={s.leftText}>{user.value == 1 ? Lang_chg.foodtrip[1] : Lang_chg.foodtrip[0]}</Text>
                </View>

                <View style={s.item}>
                  {addon_arr_formatted?.food &&
                    addon_arr_formatted?.food.map((v, i) => {
                      return (
                        <Text style={[{ fontFamily: FontFamily.default }]}>
                          {v?.addon_product_name && v.addon_product_name[0]}
                        </Text>
                      );
                    })}
                  {/* <Text style={s.rightText}>
                    {this.state.adver_arr && this.state.adver_arr.addon_arr_formatted
                      && this.state.adver_arr?.addon_arr_formatted.entertainment && this.state.adver_arr?.addon_arr_formatted.entertainment.length > 0
                      && this.state.adver_arr?.addon_arr_formatted.entertainment ? user.value == 1 ? Lang_chg.avilable_text[1] : Lang_chg.avilable_text[0]
                      : user.value == 1 ? Lang_chg.notavailable_text[1] : Lang_chg.notavailable_text[0]}
                  </Text> */}
                </View>
              </View>
            </View>
          }
          {this.state.list == 1 ? (
            <View
              style={{
                backgroundColor: Colors.orange,
                flexDirection: "row",
                padding: 10,
                marginTop: 25,
                // bottom:10
              }}
            >
              <View>
                <TouchableOpacity
                  style={s.Btnbook}
                  onPress={() => this.BookNow()}
                >
                  <Text style={s.Btn1Textbook}>{user.value == 1 ? Lang_chg.book_now_txt[1] : Lang_chg.book_now_txt[0]}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ justifyContent: "center", marginLeft: "20%" }}>
                <Text style={s.rent}>{user.value == 1 ? Lang_chg.rental_amt_txt[1] : Lang_chg.rental_amt_txt[0]}</Text>
                <Text style={s.rent}>
                  {user.value == 1 ? Lang_chg.KD[1] : Lang_chg.KD[0]}{this.state.adver_arr ? this.state.advertisement?.price : ''}
                </Text>
              </View>
            </View>
          ) : <View>
            {this.state.advertisement.booking_status == 4 || this.state.advertisement.booking_status == 3 || this.state.advertisement.review_status == 1 ? null : <View>
              {this.state.advertisement.booking_status == 2 ? <View
                style={{
                  // backgroundColor: Colors.orange,
                  // flexDirection: 'row',
                  padding: 10,
                  marginTop: 20,
                }}
              >
                <View
                // style={{backgroundColor: Colors.orange,}}
                >
                  {this.state.advertisement.review_status == 1 ?
                    null
                    : <TouchableOpacity style={s.Btn1}
                      onPress={() => this.ratings()}
                    >
                      <Text style={s.Btn1Text}>{user.value == 1 ? Lang_chg.rate_now[1] : Lang_chg.rate_now[0]}</Text>
                    </TouchableOpacity>}
                </View>

              </View> : <View
                style={{
                  // backgroundColor: Colors.orange,
                  // flexDirection: 'row',
                  padding: 10,
                  marginTop: 20,
                }}
              >
                <View
                // style={{backgroundColor: Colors.orange,}}
                >
                  <TouchableOpacity style={s.Btn1}
                    // onPress={() => this.Goto()}
                    onPress={this.handleGetDirections}
                  >
                    <Text style={s.Btn1Text}>{user.value == 1 ? Lang_chg.Loactiontrip[1] : Lang_chg.Loactiontrip[0]}</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ justifyContent: "center", flexDirection: "row" }}>
                  <TouchableOpacity style={s.Btn2}
                    onPress={() => {
                      this.props.navigation.navigate("OneToOneChat", { data: item });
                    }} >
                    <Text style={s.Btn1Text2}>{user.value == 1 ? Lang_chg.chatnowtrip[1] : Lang_chg.chatnowtrip[0]}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={s.Btn2} onPress={() => this.cancelbooking()}>
                    <Text style={s.Btn1Text2}>{user.value == 1 ? Lang_chg.chatcancel[1] : Lang_chg.chatcancel[0]}</Text>
                  </TouchableOpacity>
                </View>
              </View>}

            </View>
            }
          </View>
          }
        </ScrollView>
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
  circleView: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  small_icon: { width: 25, height: 25 },
  borders: {
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    margin: 20,
    marginTop: 1,
    //borderColor:'#000',
    //borderWidth:1
  },
  tool: {
    // width:'70%',
    // height:'70%',
    marginTop: 5,
    height: 27,
    width: 27,
  },
  top_margin: {
    marginTop: 15,
    flexDirection: "row", // set elements horizontally, try column.
  },
  tool1: {
    width: "80%",
    height: "80%",
    marginTop: 3,
  },
  rent: {
    color: "#fff",
    backgroundColor: Colors.orange,
    fontSize: 16,
    alignSelf: "flex-end",
  },
  Btnbook: {
    height: 48,
    width: 175,
    backgroundColor: Colors.white,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    elevation: 3,
    overflow: "hidden",
    shadowColor: Colors.orange,
    shadowRadius: 10,
    shadowOpacity: 1,
  },
  Btn1: {
    height: 48,
    width: "90%",
    backgroundColor: Colors.orange,
    margin: 18,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    elevation: 3,
    overflow: "hidden",
    shadowColor: Colors.orange,
    shadowRadius: 10,
    shadowOpacity: 1,
  },
  Btn2: {
    height: 48,
    width: 150,
    backgroundColor: Colors.white,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.orange,
    elevation: 3,
    // overflow: 'hidden',
    shadowColor: Colors.orange,
    shadowRadius: 10,
    shadowOpacity: 1,
  },
  text: {
    fontSize: 11,
    fontFamily: FontFamily.semi_bold,
    color: Colors.black,
    textAlign: "center",
  },
  Btn1Text: {
    fontSize: 18,
    fontFamily: FontFamily.semi_bold,
    color: Colors.white,
  },
  Btn1Textbook: {
    fontSize: 18,
    fontFamily: FontFamily.semi_bold,
    color: Colors.orange,
  },
  Btn1Text2: {
    fontSize: 18,
    fontFamily: FontFamily.semi_bold,
    color: Colors.orange,
  },
  categery: {
    backgroundColor: "#F3F9F9",
    width: width - 40,
    flex: 1,
    marginTop: "10%",
    // padding: 0,
    alignSelf: "center",
    paddingBottom: 10,
    // margin: '7%',
  },
  container: {
    top: 15,
    // height: 20,
    flexDirection: "row",
    alignItems: "flex-start", // if you want to fill rows left to right
    margin: 8,
  },
  item: {
    width: "45%", // is 50% of container width
    marginLeft: "4%",
    fontSize: 10,
    alignItems: 'flex-start'
  },
  leftText: {
    color: Colors.black,
    fontSize: 14,
    fontFamily: FontFamily.semi_bold,
  },
  rightText: {
    color: Colors.black,
    fontSize: 12,
    fontFamily: FontFamily.default,
  },
  disc: {
    marginTop: 10,
    marginLeft: 19,
    fontSize: 18,
    textAlign: "justify",
    fontFamily: FontFamily.semi_bold,
  },
  detail: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    textAlign: "justify",
    fontFamily: FontFamily.default,
    color: Colors.black,
  },
  container1: {
    marginTop: 15,
    flexWrap: "wrap",
    justifyContent: "center",
    flexDirection: "row", // set elements horizontally, try column.
  },
  btn1: {
    height: 90,
    width: 60,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    elevation: 5,
    margin: 7,
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
    textAlign: "right",
  },
  status: {
    color: Colors.orange,
    fontFamily: FontFamily.default,
    fontWeight: "500",
    fontSize: 14,
    textAlign: "right",
  },
  ImageBackground: {
    height: 215,
    width: "100%",
    borderRadius: 15,
    alignSelf: "center",
    // marginHorizontal:10,
    elevation: 0,
  },
  imgStyle: {
    borderRadius: 15,
    height: 215,
    width: "100%",
    alignSelf: "center",
  },
  SEC3: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: "8%",
    backgroundColor: "#F3F9F9",
    margin: "5%",
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
    borderLeftColor: "transparent",
    borderRightWidth: 25,
    borderRightColor: "transparent",
    borderStyle: "solid",
    backgroundColor: "transparent",
    alignItems: "center",
    transform: [{ rotate: "-45deg" }],
    marginTop: 19.2,
    marginLeft: -26,
  },
  paymnetImage: {
    width: 50,
    height: 50,
  },
  paymentText: {
    fontSize: 18,
    justifyContent: "center",
    textAlignVertical: "center",
  },
  checkbox: {
    color: "#fff",
    backgroundColor: "#fff",
    //padding:40
  },
});
