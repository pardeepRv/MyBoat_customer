import AsyncStorage from "@react-native-community/async-storage";
import cloneDeep from "clone-deep";
import React, { Component } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { Card, Icon } from "react-native-elements";
import Header2 from "../../Components/Header2";
import { Colors, FontFamily } from "../../Constants/Constants";
import { config } from "../../Provider/configProvider";
import { Lang_chg } from "../../Provider/Language_provider";
import { UserContext } from "./UserContext";
var moment = require("moment");

export default class TripType extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      destinations: [],
      img: [],
      trips_arr: [],
      promotions_arr: [],
      trip_type: this.props.route.params.item,
      destinations_arr: [],
      addon_arr: [],
      citylist: [],
      type_gear: [],
      entertainment: [],
      food: [],
      triphours: "",
      rating: "",
      advertisment: "",
      Guests: "",
      foodselected: null,
      entertainmentselected: null,
      citylistselected: null,
      type_gearslected: null,
      isSelected: false,
      isShowDatePicker: false,
      modalVisible: false,
      modalVisible2: false,
      modalVisible3: false,
      descending: false,
      time: "",
      getdate: "",
      date: "",
      pay_amount: "",
      booking_no: "",
      time: new Date("2020-06-12T14:42:42"),
      mode: "time",
      isConnected: true,
      calender_arr: {},
      guest: "",
      hour: "",
      selected_date: "",
      booking_id: "",
      unavailabe_arr: "NA",
      bookingDateTimeStart: "",
      bookingDateTimeEnd: "",
      short: "none",
      userid: "",
      dob: "",
    };
    this.foodArr = [];
    this.enterarr = [];
    this.equipmearr = [];
    this.cityarr = [];

    // console.log(this.props.navigation.state.params.item)
  }

  componentDidMount() {
    this.laungugaelocal();
    let date = new Date("2020-06-12T14:42:42");

    this.setState({ getdate: date });
    // const text = this.props.navigation.getParams('item');
    console.log("did ", this.state.trip_type);

    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      console.log("focus :>> ");
      this.setState({ isLoading: true });
      this.getData("user_arr");
      this.setState({ calender_arr: {}, date: "" });
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  laungugaelocal = () => {
    const user = this.context;
    console.log("user :>> ", user);
    if (user.value == 0) {
      LocaleConfig.locales["en"] = {
        monthNames: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "august",
          "September",
          "October",
          "November",
          "December",
        ],
        monthNamesShort: [
          "Janv.",
          "Févr.",
          "Mars",
          "Avril",
          "Mai",
          "Juin",
          "Juil.",
          "Août",
          "Sept.",
          "Oct.",
          "Nov.",
          "Déc.",
        ],
        dayNames: [
          "Dimanche",
          "Lundi",
          "Mardi",
          "Mercredi",
          "Jeudi",
          "Vendredi",
          "Samedi",
        ],
        dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"],
        today: "Aujourd'hui",
      };
      LocaleConfig.defaultLocale = "en";
    } else if (user.value == 1) {
      LocaleConfig.locales["ar"] = {
        monthNames: [
          "يناير",
          "فبراير",
          "مارس",
          "ابريل",
          "مايو",
          "يونيو",
          "يوليو",
          "اغسطس",
          "سبتمبر",
          "اكتوبر",
          "نوفمبر",
          "ديسمبر",
        ],
        monthNamesShort: [
          "Janv.",
          "Févr.",
          "Mars",
          "Avril",
          "Mai",
          "Juin",
          "Juil.",
          "Août",
          "Sept.",
          "Oct.",
          "Nov.",
          "Déc.",
        ],
        dayNames: [
          "Dimanche",
          "Lundi",
          "Mardi",
          "Mercredi",
          "Jeudi",
          "Vendredi",
          "Samedi",
        ],
        dayNamesShort: [
          "احد",
          "اثنين",
          "الثلاثاء",
          "الاربعاء",
          "الخميس",
          "الجمعة",
          "السبت",
        ],
        today: "Aujourd'hui",
      };
      LocaleConfig.defaultLocale = "ar";
    }
  };

  getData = async (key) => {
    this.setState({
      isLoading: true,
    });
    console.log("local " + key);
    try {
      const value = await AsyncStorage.getItem(key);

      //          console.log('local '+value)

      console.log("value 93", value);
      if (value !== null) {
        const arrayData = JSON.parse(value);

        console.log(arrayData);
        this.setState({ localData: arrayData, isLoading: false });
        // this.ProfileDetail(arrayData.user_id);
        this.TripType();
        this.filterdata(arrayData.user_id);
        this.setState({ userid: arrayData.user_id });
      } else {
        // this.ProfileDetail(null);
        this.TripType(null);
      }
    } catch (e) {
      // error reading value
      console.log(e, "coming in err");
    }
  };

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
      "boat_trip_type_for_add_advr.php?user_id_post=" +
      user_id +
      "&country_code=965";

    // let url = 'https://myboatonline.com/app/webservice/adver_filter_user.php?user_id_post=31&trip_type=1&find_key=NA&latitude=29.3117&longitude=47.4818&search_type=by_trip&trip_type_id_send=1'

    console.log(url, "user details url in filter array");
    try {
      // const response = await fetch('https://myboatonline.com/app/webservice/adver_filter_user.php?user_id_post=82&trip_type=all&trip_type_id_send=2&search_type=by_trip&destination_id=7&latitude=&longitude=&find_key=');
      const response = await fetch(url);
      const json = await response.json();
      console.log("json  ", json);

      if (json.success == "true") {
        this.setState({
          addon_arr: json.addon_arr != "NA" ? json.addon_arr : [],
        });
        this.equipmearr = json.addon_arr[2].addon_products;
        this.setState({ type_gear: json.addon_arr[2].addon_products });

        this.foodArr = json.addon_arr[0].addon_products;
        this.setState({ food: json.addon_arr[0].addon_products });
        this.enterarr = json.addon_arr[1].addon_products;
        this.setState({ entertainment: json.addon_arr[1].addon_products });
        this.cityarr = json.selected_City_Array;
        this.setState({
          citylist:
            json.selected_City_Array != "NA" ? json.selected_City_Array : [],
        });

        // console.log('typearr :>> ', this.state.type_gear);
        // console.log('food :>> ', this.state.food);
        // console.log('entertainment :>> ', this.state.entertainment);
        // console.log('citylist :>> ', this.state.citylist);
        // console.log('this.cityarr :>> ', this.cityarr);
        // console.log('this.enterarr :>> ', this.enterarr);
        // console.log('this.foodArr :>> ', this.foodArr);
        // console.log('this.equipmearr :>> ', this.equipmearr);

        return console.log("addon arr :>> ", this.state.addon_arr);
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
    console.log("id :>> ", idx);

    const array = this.state.food.map((v) => {
      const newItem = Object.assign({}, v);
      newItem.isSelected = false;
      return newItem;
    });
    console.log(array, " food before");

    array[idx].isSelected = !array[idx].isSelected;
    this.setState(
      {
        food: array,
        foodselected: array[idx].addon_product_id,
      },
      () => {
        console.log(this.state.food, "after food");
        console.log(this.state.foodselected, "after foodselected");
      }
    );
  };

  onChangeselected = (idx) => {
    console.log("id :>> ", idx);

    const array = this.state.entertainment.map((v) => {
      const newItem = Object.assign({}, v);
      newItem.isSelected = false;
      return newItem;
    });
    console.log(array, " food before");

    array[idx].isSelected = !array[idx].isSelected;
    this.setState(
      {
        entertainment: array,
        entertainmentselected: array[idx].addon_product_id,
      },
      () => {
        console.log(this.state.entertainment, "after food");
        console.log(this.state.entertainmentselected, "after foodselected");
      }
    );
  };
  onChangedone = (idx) => {
    console.log("id :>> ", idx);

    const array = this.state.type_gear.map((v) => {
      const newItem = Object.assign({}, v);
      newItem.isSelected = false;
      return newItem;
    });
    console.log(array, " food before");

    array[idx].isSelected = !array[idx].isSelected;
    this.setState(
      {
        type_gear: array,
        type_gearslected: array[idx].addon_product_id,
      },
      () => {
        console.log(this.state.type_gear, "after food");
        console.log(this.state.type_gearslected, "after foodselected");
      }
    );
  };

  _oncityselected = (idx) => {
    console.log("id :>> ", idx);

    const array = this.state.citylist.map((v) => {
      const newItem = Object.assign({}, v);
      newItem.isSelected = false;
      return newItem;
    });
    console.log(array, " food before");

    array[idx].isSelected = !array[idx].isSelected;
    this.setState(
      {
        citylist: array,
        citylistselected: array[idx].city_id,
      },
      () => {
        console.log(this.state.citylist, "after food");
        console.log(this.state.citylistselected, "after foodselected");
      }
    );
  };
  reset() {
    this.setState({
      citylist: this.cityarr,
      triphours: "",
      type_gear: this.equipmearr,
      food: this.foodArr,
      rating: "",
      advertisment: "",
      entertainment: this.enterarr,
      Guests: "",
      date: "",
    });
  }
  async TripType() {
    let url =
      config.baseURL +
      "destination_list_filter.php?user_id_post=82&trip_type_id_post=" +
      this.state.trip_type.trip_id;
    console.log("urlin triptype :>> ", url);
    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log("json  ", json);
      this.setState({
        destinations_arr:
          json.destinations_arr != "NA" ? json.destinations_arr : [],
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

  gotoBack = () => {
    this.setState({ modalVisible: false });
    this.setState({ modalVisible2: false });
    this.setState({ modalVisible3: false });
  };
  handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    var now = moment(date).format("YYYY-MM-DD");
    console.log("now :>> ", now);
    this.setState(
      {
        dob: now,
      },
      () => {
        this.ShowResult();
      }
    );
    this.hideDatePicker();
  };

  Price = () => {
    this.setState({ modalVisible2: true });
  };
  filtertrip = () => {
    this.setState({ modalVisible: true });
  };

  // sort function>>>
  sortingBYPrice = (descending) => {
    this.setState({ modalVisible2: false });
    const sortedAds = this.sortAdsByPrice(
      this.state.destinations_arr,
      descending
    );

    this.setState({
      destinations_arr: sortedAds,
    });
  };

  //common function
  sortAdsByPrice(arr, descending) {
    const ads = cloneDeep(arr);

    if (descending) {
      return ads.sort(
        (a, b) => parseFloat(b.min_price || 0) - parseFloat(a.min_price || 0)
      );
    }

    return ads.sort(
      (a, b) => parseFloat(a.min_price || 0) - parseFloat(b.min_price || 0)
    );
  }

  Goto() {
    console.log("goto");
    this.props.navigation.navigate("GoogleMap", {
      destinations_arr: this.state.destinations_arr,
      item: this.state.trip_type,
      type: 3,
    });
  }

  async ShowResult() {
    this.setState({ modalVisible: false });

    let url =
      config.baseURL +
      "adver_filter_island.php?user_id_post=" +
      this.state.userid +
      "&latitude=29.3117&longitude=47.4818&find_key=NA&trip_type=all&trip_type_id_send=" +
      this.state.trip_type.trip_id +
      "&filter_guest=" +
      this.state.Guests +
      "&filter_triphours=" +
      this.state.triphours +
      "&filter_food=" +
      this.state.foodselected +
      "&filter_entertainment=" +
      this.state.entertainmentselected +
      "&filter_citylist=" +
      this.state.citylistselected +
      "&filter_advertisement=" +
      this.state.advertisment +
      "&filter_equipement=" +
      this.state.type_gearslected +
      "&choose_Date=" +
      this.state.dob;
    // let url = 'https://myboatonline.com/app/webservice/adver_filter_user.php?user_id_post=31&trip_type=1&find_key=NA&latitude=29.3117&longitude=47.4818&search_type=by_trip&trip_type_id_send=1'

    console.log(url);
    try {
      // const response = await fetch('https://myboatonline.com/app/webservice/adver_filter_user.php?user_id_post=82&trip_type=all&trip_type_id_send=2&search_type=by_trip&destination_id=7&latitude=&longitude=&find_key=');
      const response = await fetch(url);
      const json = await response.json();
      console.log("json  ", json);

      if (json.success == "true") {
        this.setState({ modalVisible: false });
        this.setState({ modalVisible2: false });
        this.setState({ modalVisible3: false });
        if (json && json.destinations_arr != "NA") {
          this.setState({
            destinations_arr:
              json.destinations_arr != "NA" ? json.destinations_arr : [],
          });
        } else {
          this.setState({ destinations_arr: [] });
        }
      } else {
      }

      // console.log(this.state.img)
    } catch (error) {
      console.log(error);
      this.setState({ modalVisible: false });
      this.setState({ modalVisible2: false });
      this.setState({ modalVisible3: false });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  _selectDate = async (date) => {
    console.log("date ", date);

    if (this.state.unavailabe_arr != "NA") {
      var i = this.state.unavailabe_arr.findIndex((x) => x.date == date);
      if (i >= 0) {
        msgProvider.toast(Lang_chg.owner_not_avail[config.language], "center");
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
        if (this.state.time != "") {
          let date1 = date + " " + this.state.time + ":00";
          let date1xy = date + " " + this.state.time;
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
      this.state.calender_arr[date] = {
        selected: true,
        selectedColor: Colors.orange,
      };
      this.setState({
        date: date,
        calender_arr: { ...this.state.calender_arr, date: date },
      });
      let idle_hours = this.state.adver_arr.idle_time;
      let extra_hours = this.state.extra_time;
      let tot_hours = parseInt(idle_hours) + parseInt(extra_hours);

      if (this.state.time != "") {
        let date1 = date + " " + this.state.time + ":00";
        let date1xy = date + " " + this.state.time;
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

  Selectdate = () => {
    this.setState({ modalVisible3: true });
  };

  render() {
    console.log("this.state.des :>> ", this.state.destinations_arr);
    console.log("this.state.des :>> ", this.state.dob);
    console.log("date in render :>> ", this.state.date);

    const user = this.context;
    console.log("context in home", user);
    return (
      <View style={{ backgroundColor: Colors.white, flex: 1 }}>
        <Header2
          imgBack={true}
          backBtn={true}
          backImgSource={{
            uri: config.image_url4 + this.state.trip_type.cover_image,
          }}
          name={
            user.value == 1
              ? this.state.trip_type.trip_type_name_arabic
              : this.state.trip_type.trip_type_name
          }
          searchBtn={false}
          headerHeight={300}
        />

        <View
          style={{
            backgroundColor: "#fff",
            height: 40,
            width: "82%",
            marginTop: "-45%",
            alignSelf: "center",
            borderRadius: 30,
            flexDirection: "row",
            borderColor: Colors.orange,
            borderWidth: 1,
            shadowColor: "#fff",
            shadowOffset: { width: 500, height: 500 },
            shadowOpacity: 0.8,
            shadowRadius: 0,
            elevation: 5,
          }}
        >
          <TouchableOpacity style={s.col} onPress={() => this.Price()}>
            <Image
              source={require("../../../assets/icons/updown.png")}
              style={s.icons}
            />
            <Text
              style={{
                fontSize: 11,
                marginLeft: 5,
                color: "#0A8481",
                fontFamily: "Montserrat-Regular",
              }}
            >
              {" "}
              {user.value == 1 ? Lang_chg.Sortby[1] : Lang_chg.Sortby[0]}{" "}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.col, { borderRightColor: 'transparent' }]} onPress={() => this.filtertrip()}>
            <Image
              source={require("../../../assets/icons/filter_icon.png")}
              style={s.icons}
            />
            <Text
              style={{
                marginLeft: 7,
                fontSize: 11,
                padding: 5,
                color: "#0A8481",
                fontFamily: "Montserrat-Regular",
              }}
            >
              {user.value == 1
                ? Lang_chg.text_filter[1]
                : Lang_chg.text_filter[0]}{" "}
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
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
              {user.value == 1 ? Lang_chg.map[1] : Lang_chg.map[0]}
            </Text>
          </TouchableOpacity> */}
        </View>

        <TouchableOpacity
          onPress={() => this.Selectdate()}
          style={{
            backgroundColor: "#fff",
            height: 40,
            width: "82%",
            marginTop: 10,
            alignSelf: "center",
            borderRadius: 30,
            borderColor: Colors.orange,
            shadowColor: "#fff",
            shadowOffset: { width: 500, height: 500 },
            shadowOpacity: 0.8,
            shadowRadius: 0,
            elevation: 5,
          }}
        >
          {this.state.date ? (
            <Text style={s.select_date}> {this.state.date}</Text>
          ) : (
            <Text style={s.select_date}>
              {" "}
              {user.value == 1
                ? Lang_chg.Choose_from_library_txt[1]
                : Lang_chg.Choose_from_library_txt[0]}
            </Text>
          )}
        </TouchableOpacity>

        <View
          style={{
            marginTop: "15%",
            // marginBottom: '10%',
            borderRadius: 20,
            flex: 1,
            backgroundColor: Colors.white,
          }}
        >
          <FlatList
            data={this.state.destinations_arr}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              console.log("item :>> in trip type", item);
              return (
                <View style={{}}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("DestinationList", {
                        item: item,
                        trip_type: this.state.trip_type.trip_id,
                        tripdestination: this.state.destinations_arr,
                      })
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
                      }}
                    >
                      <ImageBackground
                        style={s.ImageBackground}
                        imageStyle={s.imgStyle}
                        source={{
                          uri: config.baseURL + "images/" + item.image,
                        }}
                      >
                        <View
                          style={[
                            {
                              height: 50,
                              backgroundColor: Colors.white,
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                              position: "absolute",
                              right: 35,
                              bottom: -1,
                              paddingHorizontal: 10,
                              borderTopLeftRadius: 12,
                              borderTopRightRadius: 12,
                            },
                          ]}
                        >
                          <Text style={s.place}>
                            {user.value == 1
                              ? Lang_chg.Starting[1]
                              : Lang_chg.Starting[0]}
                            {"\n"}
                            {user.value == 1
                              ? Lang_chg.KD[1]
                              : Lang_chg.KD[0]}{" "}
                            {item.min_price}
                          </Text>
                        </View>
                      </ImageBackground>
                      {/*  */}
                      <View style={s.SEC3}>
                        <View style={{}}>
                          <Text style={s.title}>
                            {user.value == 1
                              ? item.destination_name_arabic
                              : item.destination_name}
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              marginTop: 5,
                            }}
                          >
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
            ListEmptyComponent={() =>
              this.state.destinations_arr &&
              this.state.destinations_arr.length >= 0 && (
                <Text
                  style={{
                    alignSelf: "center",
                    marginTop: 20,
                    color: Colors.black,
                    // fontFamily: fonts.semiBold,
                    fontWeight: "bold",
                  }}
                >
                  No Request found
                </Text>
              )
            }
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={{
              paddingBottom: 10,
              //  height:"100%"
            }}
          />
        </View>
        {/* <DateTimePickerModal
          isVisible={this.state.isShowDatePicker}
          mode="date"
          minimumDate={new Date()}
          onConfirm={this.handleConfirm}
          onCancel={this.hideDatePicker}
        /> */}

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible2}
          onRequestClose={() => {
            // this.closeButtonFunction()
            this.setState({ modalVisible2: false });
          }}
        >
          <View
            style={{
              height: "50%",
              marginTop: "auto",
              backgroundColor: "#fff",
              fontFamily: "Montserrat-Regular",
              borderRadius: 30,
            }}
          >
            <View>
              <Text
                style={{
                  alignSelf: "center",
                  fontWeight: "bold",
                  fontSize: 18,
                  marginTop: 8,
                }}
              >
                Sort By
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                onPress={() => this.gotoBack()}
                style={{
                  alignItems: "flex-start",
                  marginTop: -25,
                  marginLeft: 20,

                  borderRadius: 25,
                }}
              >
                <Icon
                  name="x-circle"
                  type="feather"
                  size={26}
                  color={Colors.orange}
                />
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row", marginTop: "10%" }}>
              <View style={{ width: "50%" }}>
                <TouchableOpacity
                  onPress={() => this.setState({ short: "Price_low_high" })}
                >
                  <View
                    style={{
                      borderColor:
                        this.state.short != "Price_low_high" ? "grey" : "#fff",
                      backgroundColor:
                        this.state.short != "Price_low_high"
                          ? "#fff"
                          : Colors.orange,
                      borderColor: "grey",
                      borderWidth: 1,
                      padding: 8,
                      margin: 8,
                      width: 150,
                      alignSelf: "center",
                      borderRadius: 15,
                    }}
                  >
                    <Text
                      style={{
                        alignSelf: "center",
                        color:
                          this.state.short != "Price_low_high"
                            ? Colors.orange
                            : "#fff",
                      }}
                    >
                      Price low to high
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{ width: "50%" }}>
                <TouchableOpacity
                  onPress={() => this.setState({ short: "Price_high_low" })}
                >
                  <View
                    style={{
                      borderColor:
                        this.state.short != "Price_high_low" ? "grey" : "#fff",
                      backgroundColor:
                        this.state.short != "Price_high_low"
                          ? "#fff"
                          : Colors.orange,
                      borderColor: "grey",
                      borderWidth: 1,
                      padding: 8,
                      margin: 8,
                      width: 150,
                      alignSelf: "center",
                      borderRadius: 15,
                    }}
                  >
                    <Text
                      style={{
                        alignSelf: "center",
                        color:
                          this.state.short != "Price_high_low"
                            ? Colors.orange
                            : "#fff",
                      }}
                    >
                      Price high to low
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={s.Btn1}
              onPress={() => {
                if (this.state.short == "Price_low_high") {
                  this.sortingBYPrice(false);
                } else if (this.state.short == "Price_high_low") {
                  this.sortingBYPrice(true);
                }
              }}
            >
              <Text style={s.Btn1Text}>Show Results</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            // this.closeButtonFunction()
            this.setState({ modalVisible: false });
          }}
        >
          <View
            style={{
              height: "72%",
              marginTop: "auto",
              backgroundColor: "#fff",
              fontFamily: "Montserrat-Regular",
              borderRadius: 30,
            }}
          >
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
                    alignSelf: "center",
                    fontWeight: "bold",
                    fontSize: 18,
                    marginTop: 8,
                  }}
                >
                  Filter
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  onPress={() => this.gotoBack()}
                  style={{
                    alignItems: "flex-start",
                    marginTop: -25,
                    marginLeft: 20,

                    borderRadius: 25,
                  }}
                >
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
                    alignItems: "flex-end",
                    marginTop: -30,
                    marginRight: 30,
                    borderRadius: 25,
                  }}
                >
                  <Text
                    style={{
                      alignSelf: "center",
                      fontWeight: "bold",
                      fontSize: 15,
                      marginTop: 8,
                      color: Colors.orange,
                    }}
                  >
                    Reset
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 18,
                    fontWeight: "bold",
                    padding: 8,
                  }}
                >
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
                              borderColor: item.isSelected
                                ? Colors.orange
                                : "#000",
                              backgroundColor: item.isSelected
                                ? Colors.orange
                                : "white",
                              borderWidth: 1,
                              padding: 8,
                              margin: 8,
                              width: 100,
                              alignSelf: "center",
                              borderRadius: 15,
                            }}
                          >
                            <Text
                              style={{
                                alignSelf: "center",

                                color: item.isSelected
                                  ? "white"
                                  : Colors.orange,
                              }}
                            >
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
              <Text
                style={{
                  color: Colors.black,
                  fontSize: 18,
                  fontWeight: "bold",
                  padding: 8,
                }}
              >
                Advertisement
              </Text>

              <View style={{ flexDirection: "row", marginTop: -10 }}>
                <View style={{ width: "30%" }}>
                  <TouchableOpacity
                    onPress={() => this.setState({ advertisment: " Public" })}
                  >
                    <View
                      style={{
                        borderColor:
                          this.state.advertisment != " Public"
                            ? "grey"
                            : "#fff",
                        backgroundColor:
                          this.state.advertisment != " Public"
                            ? "#fff"
                            : Colors.orange,
                        borderWidth: 1,
                        padding: 8,
                        margin: 8,
                        width: 100,
                        alignSelf: "center",
                        borderRadius: 15,
                      }}
                    >
                      <Text
                        style={{
                          alignSelf: "center",
                          color:
                            this.state.advertisment != " Public"
                              ? Colors.orange
                              : "#fff",
                        }}
                      >
                        Public
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={{ width: "30%" }}>
                  <TouchableOpacity
                    onPress={() => this.setState({ advertisment: "Private" })}
                  >
                    <View
                      style={{
                        borderColor:
                          this.state.advertisment != "Private"
                            ? "grey"
                            : "#fff",
                        backgroundColor:
                          this.state.advertisment != "Private"
                            ? "#fff"
                            : Colors.orange,
                        borderWidth: 1,
                        padding: 8,
                        margin: 8,
                        width: 100,
                        alignSelf: "center",
                        borderRadius: 15,
                      }}
                    >
                      <Text
                        style={{
                          alignSelf: "center",
                          color:
                            this.state.advertisment != "Private"
                              ? Colors.orange
                              : "#fff",
                        }}
                      >
                        Private
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
                    fontWeight: "bold",
                    padding: 8,
                  }}
                >
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
                          onPress={() => this.onChangeCheck(index)}
                        >
                          <View
                            style={{
                              borderColor: item.isSelected
                                ? Colors.orange
                                : "#000",
                              backgroundColor: item.isSelected
                                ? Colors.orange
                                : "white",
                              borderWidth: 1,
                              padding: 8,
                              margin: 8,
                              width: 100,
                              alignSelf: "center",
                              borderRadius: 15,
                            }}
                          >
                            <Text
                              style={{
                                alignSelf: "center",
                                color: item.isSelected
                                  ? "white"
                                  : Colors.orange,
                              }}
                            >
                              {item &&
                                item?.addon_product_name &&
                                item?.addon_product_name?.length > 0
                                ? item?.addon_product_name[0]
                                : null}
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
                    fontWeight: "bold",
                    padding: 8,
                  }}
                >
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
                              borderColor: item.isSelected
                                ? Colors.orange
                                : "#000",
                              backgroundColor: item.isSelected
                                ? Colors.orange
                                : "white",
                              borderWidth: 1,
                              padding: 8,
                              margin: 8,
                              width: 100,
                              alignSelf: "center",
                              borderRadius: 15,
                            }}
                          >
                            <Text
                              style={{
                                alignSelf: "center",

                                color: item.isSelected
                                  ? "white"
                                  : Colors.orange,
                              }}
                            >
                              {item &&
                                item?.addon_product_name &&
                                item?.addon_product_name?.length > 0
                                ? item?.addon_product_name[0]
                                : null}
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
                    fontWeight: "bold",
                    padding: 8,
                  }}
                >
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
                              borderColor: item.isSelected
                                ? Colors.orange
                                : "#000",
                              backgroundColor: item.isSelected
                                ? Colors.orange
                                : "white",
                              borderWidth: 1,
                              padding: 8,
                              margin: 8,
                              width: 100,
                              alignSelf: "center",
                              borderRadius: 15,
                            }}
                          >
                            <Text
                              style={{
                                alignSelf: "center",
                                color: item.isSelected
                                  ? "white"
                                  : Colors.orange,
                              }}
                            >
                              {item &&
                                item?.addon_product_name &&
                                item?.addon_product_name?.length > 0
                                ? item?.addon_product_name[0]
                                : null}
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
                  fontWeight: "bold",
                  padding: 8,
                }}
              >
                Guests
              </Text>

              <View style={{ flexDirection: "row", marginTop: -10 }}>
                <View style={{ width: "30%" }}>
                  <TouchableOpacity
                    onPress={() => this.setState({ Guests: "1_3" })}
                  >
                    <View
                      style={{
                        borderColor:
                          this.state.Guests != "1_3" ? "grey" : "#fff",
                        backgroundColor:
                          this.state.Guests != "1_3" ? "#fff" : Colors.orange,
                        borderColor: "grey",
                        borderWidth: 1,
                        padding: 8,
                        margin: 8,
                        width: 100,
                        alignSelf: "center",
                        borderRadius: 15,
                      }}
                    >
                      <Text
                        style={{
                          alignSelf: "center",
                          color:
                            this.state.Guests != "1_3" ? Colors.orange : "#fff",
                        }}
                      >
                        1 - 3
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={{ width: "30%" }}>
                  <TouchableOpacity
                    onPress={() => this.setState({ Guests: "4_6" })}
                  >
                    <View
                      style={{
                        borderColor:
                          this.state.Guests != "4_6" ? "grey" : "#fff",
                        backgroundColor:
                          this.state.Guests != "4_6" ? "#fff" : Colors.orange,
                        borderColor: "grey",
                        borderWidth: 1,
                        padding: 8,
                        margin: 8,
                        width: 100,
                        alignSelf: "center",
                        borderRadius: 15,
                      }}
                    >
                      <Text
                        style={{
                          alignSelf: "center",
                          color:
                            this.state.Guests != "4_6" ? Colors.orange : "#fff",
                        }}
                      >
                        4 - 6
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={{ width: "30%" }}>
                  <TouchableOpacity
                    onPress={() => this.setState({ Guests: "7_9" })}
                  >
                    <View
                      style={{
                        borderColor:
                          this.state.Guests != "7_9" ? "grey" : "#fff",
                        backgroundColor:
                          this.state.Guests != "7_9" ? "#fff" : Colors.orange,
                        borderColor: "grey",
                        borderWidth: 1,
                        padding: 8,
                        margin: 8,
                        width: 100,
                        alignSelf: "center",
                        borderRadius: 15,
                      }}
                    >
                      <Text
                        style={{
                          alignSelf: "center",
                          color:
                            this.state.Guests != "7_9" ? Colors.orange : "#fff",
                        }}
                      >
                        7 - 9
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ flexDirection: "row" }}>
                <View style={{ width: "30%" }}>
                  <TouchableOpacity
                    onPress={() => this.setState({ Guests: "10_" })}
                  >
                    <View
                      style={{
                        borderColor:
                          this.state.Guests != "10_" ? "grey" : "#fff",
                        backgroundColor:
                          this.state.Guests != "10_" ? "#fff" : Colors.orange,
                        borderColor: "grey",
                        borderWidth: 1,
                        padding: 8,
                        margin: 8,
                        width: 100,
                        alignSelf: "center",
                        borderRadius: 15,
                      }}
                    >
                      <Text
                        style={{
                          alignSelf: "center",
                          color:
                            this.state.Guests != "10_" ? Colors.orange : "#fff",
                        }}
                      >
                        10+
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <Text
                style={{
                  color: Colors.black,
                  fontSize: 18,
                  fontWeight: "bold",
                  padding: 8,
                  marginTop: 6,
                }}
              >
                Trip Hours
              </Text>

              <View style={{ flexDirection: "row", marginTop: -10 }}>
                <TouchableOpacity
                  onPress={() => this.setState({ triphours: "1_2" })}
                >
                  <View
                    style={{
                      borderColor:
                        this.state.triphours != "1_2" ? "grey" : "#fff",
                      backgroundColor:
                        this.state.triphours != "1_2" ? "#fff" : Colors.orange,
                      borderWidth: 1,
                      padding: 8,
                      margin: 8,
                      width: 60,
                      alignSelf: "center",
                      borderRadius: 15,
                    }}
                  >
                    <Text
                      style={{
                        alignSelf: "center",
                        color:
                          this.state.triphours != "1_2"
                            ? Colors.orange
                            : "#fff",
                      }}
                    >
                      1-2hr
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.setState({ triphours: "3_4" })}
                >
                  <View
                    style={{
                      borderColor:
                        this.state.triphours != "3_4" ? "grey" : "#fff",
                      backgroundColor:
                        this.state.triphours != "3_4" ? "#fff" : Colors.orange,
                      borderWidth: 1,
                      padding: 8,
                      margin: 8,
                      width: 60,
                      alignSelf: "center",
                      borderRadius: 15,
                    }}
                  >
                    <Text
                      style={{
                        alignSelf: "center",
                        color:
                          this.state.triphours != "3_4"
                            ? Colors.orange
                            : "#fff",
                      }}
                    >
                      3-4hr
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.setState({ triphours: "5_6" })}
                >
                  <View
                    style={{
                      borderColor:
                        this.state.triphours != "5_6" ? "grey" : "#fff",
                      backgroundColor:
                        this.state.triphours != "5_6" ? "#fff" : Colors.orange,
                      borderWidth: 1,
                      padding: 8,
                      margin: 8,
                      width: 60,
                      alignSelf: "center",
                      borderRadius: 15,
                    }}
                  >
                    <Text
                      style={{
                        alignSelf: "center",
                        color:
                          this.state.triphours != "5_6"
                            ? Colors.orange
                            : "#fff",
                      }}
                    >
                      5-6hr
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.setState({ triphours: "7_8" })}
                >
                  <View
                    style={{
                      borderColor:
                        this.state.triphours != "7_8" ? "grey" : "#fff",
                      backgroundColor:
                        this.state.triphours != "7_8" ? "#fff" : Colors.orange,
                      borderWidth: 1,
                      padding: 8,
                      margin: 8,
                      width: 60,
                      alignSelf: "center",
                      borderRadius: 15,
                    }}
                  >
                    <Text
                      style={{
                        alignSelf: "center",
                        color:
                          this.state.triphours != "7_8"
                            ? Colors.orange
                            : "#fff",
                      }}
                    >
                      7-8hr
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.setState({ triphours: "9_10" })}
                >
                  <View
                    style={{
                      borderColor:
                        this.state.triphours != "9_10" ? "grey" : "#fff",
                      backgroundColor:
                        this.state.triphours != "9_10" ? "#fff" : Colors.orange,
                      borderWidth: 1,
                      padding: 8,
                      margin: 8,
                      width: 60,
                      alignSelf: "center",
                      borderRadius: 15,
                    }}
                  >
                    <Text
                      style={{
                        alignSelf: "center",
                        color:
                          this.state.triphours != "9_10"
                            ? Colors.orange
                            : "#fff",
                      }}
                    >
                      9-10h
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={s.Btn1}
                onPress={() => this.ShowResult()}
              >
                <Text style={s.Btn1Text}>Show Results</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible3}
          onRequestClose={() => {
            // this.closeButtonFunction()
            this.setState({ modalVisible3: false });
          }}
        >
          <View
            style={{
              height: "70%",
              marginTop: "auto",
              backgroundColor: "#fff",
              fontFamily: "Montserrat-Regular",
              borderRadius: 30,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                onPress={() => this.gotoBack()}
                style={{
                  alignItems: "flex-start",
                  marginTop: 10,
                  marginLeft: 20,

                  borderRadius: 25,
                }}
              >
                <Icon
                  name="x-circle"
                  type="feather"
                  size={26}
                  color={Colors.orange}
                />
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: "3%" }}>
              <Calendar
                minDate={new Date()}
                markedDates={this.state.calender_arr}
                onDayPress={(day) => {
                  this._selectDate(day.dateString);
                }}
                renderArrow={(direction) => (
                  <Icon
                    type="ionicon"
                    color={Colors.orange}
                    name={
                      direction === "left"
                        ? user.value == 1
                          ? "arrow-forward"
                          : "arrow-back"
                        : user.value == 1
                          ? "arrow-back"
                          : "arrow-forward"
                    }
                  />
                )}
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
  col: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRightColor: "#39DCE5",
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

  select_date: {
    fontSize: 13,
    color: Colors.orange,
    alignSelf: "center",
    padding: 9,
    fontWeight: "900",
    fontFamily: "Montserrat-SemiBold",
  },
  Btn1: {
    height: 48,
    width: "80%",
    backgroundColor: Colors.orange,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    marginLeft: "10%",
    elevation: 3,
    overflow: "hidden",
    shadowColor: "#fff",
    shadowRadius: 10,
    shadowOpacity: 1,
  },
  Btn1Text: {
    fontSize: 20,
    fontFamily: FontFamily.semi_bold,
    color: Colors.white,
  },
});
