import React, {Component, useState} from 'react';
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
} from 'react-native';
import {Icon, Input, Card, AirbnbRating} from 'react-native-elements';
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
import Upcoming from '../../Data/Upcoming';
import {SliderBox} from 'react-native-image-slider-box';
import FastImage from 'react-native-fast-image';
import {renderNode} from 'react-native-elements/dist/helpers';
import {apifuntion} from '../../Provider/apiProvider';
import {config} from '../../Provider/configProvider';
//import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default class PremotionDetail extends Component {
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

  componentDidMount() {
    console.log(this.state.promotion.image);
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={{
            marginBottom: -50,
            zIndex: 1,
            alignItems: 'flex-start',
            marginTop: 20,
            marginLeft: 20,
          }}>
          <Icon
            name="arrow-back"
            type="ionicons"
            size={26}
            color={Colors.white}
          />
        </TouchableOpacity>

       
        <ImageBackground
          style={{height: 300}}
          source={{
            uri:
            config.image_url4+
              this.state.promotion.image,
          }}
          imageStyle={s.ImageBackground_Img}
        >
             <Text style={{marginTop: 25,fontFamily:FontFamily.semi_bold,color:Colors.white,textAlign:"center"}}>
                        {"Promotion"}
                    </Text>
            </ImageBackground>

        <View
          style={{
            backgroundColor: Colors.white,
            height: 500,
            marginTop: -30,
            borderRadius: 30,
            padding: 10,
          }}>
          <Text
            style={{
              fontSize: 18,
              color: '#000',
              marginTop: 20,
              fontFamily: FontFamily.semi_bold,
            }}>
            Discription :
          </Text>
          <Text style={{fontSize: 12,top:10,  fontFamily: FontFamily.default}}>
            {this.state.promotion.description}
          </Text>
          {/* <Text style={{textAlign:'justify',marginTop:10}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </Text> */}
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
    resizeMode: 'cover',
    //opacity:0.5
  },
});
