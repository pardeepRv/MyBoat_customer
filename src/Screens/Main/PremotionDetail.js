import React, { Component } from "react";
import {
  ImageBackground,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import { Colors, FontFamily } from "../../Constants/Constants";
import { config } from "../../Provider/configProvider";
import { Lang_chg } from "../../Provider/Language_provider";
import { UserContext } from "./UserContext";

//import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default class PremotionDetail extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      destinations: [],
      img: [],
      trips_arr: [],
      promotions_arr: [],
      promotion: this.props.route.params.item,
      destinations_arr: [],
    };
  }

  openUrl = () => {
    const { promotion } = this.state;
    console.log(promotion, "promotionpromotionpromotion");
    Linking.openURL(`https://${promotion.link}`).catch((err) =>
      console.error("Error", err)
    );
  };

  componentDidMount() {
    console.log(this.state.promotion.image);
  }

  render() {
    const user = this.context;
    console.log("context in home", user);
    return (
      <View style={{ flex: 1 }}>
        <View>
          <ImageBackground
            style={{ height: 300 }}
            source={{
              uri: config.image_url4 + this.state.promotion.image,
            }}
            imageStyle={s.ImageBackground_Img}
          >
            <View
              style={{
                alignItems: "center",
                width: "100%",
                flexDirection: "row",
              }}
            >
              {user.value == 1 ? (
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}
                  style={{
                    // marginBottom: -10,
                    // zIndex: 1,
                    alignItems: "flex-start",
                    marginTop: 50,
                    marginLeft: 20,
                    borderRadius: 25,
                    backgroundColor: Colors.orange,
                    width: 25,
                    transform: [{ rotate: "180deg" }],
                  }}
                >
                  <Icon
                    name="arrow-back"
                    type="ionicons"
                    size={26}
                    color={Colors.white}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}
                  style={{
                    // marginBottom: -50,
                    // zIndex: 1,
                    alignItems: "flex-start",
                    marginTop: 50,
                    marginLeft: 20,
                    borderRadius: 25,
                    backgroundColor: Colors.orange,
                    width: 25,
                  }}
                >
                  <Icon
                    name="arrow-back"
                    type="ionicons"
                    size={26}
                    color={Colors.white}
                  />
                </TouchableOpacity>
              )}
              <View style={{ left: 130 }}>
                <Text
                  style={{
                    backgroundColor: Colors.orange,
                    borderRadius: 20,
                    marginTop: 45,
                    fontFamily: FontFamily.semi_bold,
                    color: Colors.white,
                    textAlign: "center",
                  }}
                >
                  {user.value == 1
                    ? Lang_chg.Promotion[1]
                    : Lang_chg.Promotion[0]}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        <View
          style={{
            backgroundColor: Colors.white,

            flex: 1,
            marginTop: -30,
            borderRadius: 30,
            padding: 10,
          }}
        >
          <View
            style={{
              backgroundColor: Colors.white,
              height: 500,
              alignItems: "flex-start",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#000",
                marginTop: 20,
                fontFamily: FontFamily.semi_bold,
              }}
            >
              {user.value == 1
                ? Lang_chg.Discription[1]
                : Lang_chg.Discription[0]}
            </Text>
            <Text
              style={{ fontSize: 12, top: 15, fontFamily: FontFamily.default }}
            >
              {user.value == 1
                ? this.state.promotion.description_arabic
                : this.state.promotion.description}
            </Text>
            {/* <Text style={{textAlign:'justify',marginTop:10}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </Text> */}
          </View>

          <TouchableOpacity style={s.btn1} onPress={() => this.openUrl()}>
            <Text style={s.btn1Text}>
              {user.value == 1 ? Lang_chg.lets_see[1] : "let's see"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export const s = StyleSheet.create({
  ImageBackground: {
    backgroundColor: Colors.black,
  },
  ImageBackground_Img: {
    resizeMode: "cover",
    //opacity:0.5
  },
  btn1: {
    top: "90%",
    height: 48,
    width: "85%",
    backgroundColor: Colors.orange,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    marginVertical: 10,
    elevation: 5,
    position: "absolute",
    borderRadius: 25,
    // bottom:10
  },
  btn1Text: {
    fontSize: 20,
    fontFamily: FontFamily.semi_bold,
    color: Colors.white,
  },
});
