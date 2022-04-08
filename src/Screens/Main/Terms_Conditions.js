import React, { Component, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView, useWindowDimensions, Dimensions,
  FlatList,
  Image,
  I18nManager,
  TextInput
} from 'react-native';
import {
  Icon,
  Input,
  Card
} from 'react-native-elements';
import { Colors, FontFamily, Sizes } from '../../Constants/Constants';
import { useNavigation } from '@react-navigation/core';
import Header from '../../Components/Header';
import AsyncStorage from "@react-native-community/async-storage";
import { config } from '../../Provider/configProvider';
import { msgProvider, msgTitle, msgText } from '../../Provider/messageProvider';
import { Lang_chg } from '../../Provider/Language_provider'
import { apifuntion } from '../../Provider/apiProvider';
import HTML from "react-native-render-html";
import { WebView } from 'react-native-webview';
import { UserContext } from './UserContext';



export default class Terms_Conditions extends Component {
  static contextType = UserContext

  constructor(props) {
    super(props);
    this.state = {
      about_us: [],
      terms_cond: [],
      privacy: [],
      terms: false,
      policy: false,
      about: false,
      type: this.props.route.params.type,
    }

  }



  componentDidMount() {
    this.getData('user_arr');

    //    let d= useWindowDimensions();

    console.log(this.state.type)

    console.log('dimention ', Dimensions.get('window').width)


    if (this.state.type == '3') {
      this.setState({ about: true })
    }
    else if (this.state.type == '2') {

      this.setState({ policy: true })
    }

    else if (this.state.type == '1') {
      this.setState({ terms: true })

    }

  }


  getData = async (key) => {

    console.log('local ' + key)
    try {
      const value = await AsyncStorage.getItem(key);

      //          console.log('local '+value)

      //  console.log('array ',arrayData.email);
      if (value !== null) {

        const arrayData = JSON.parse(value);

        console.log(arrayData)
        //this.setState({localData:arrayData})
        this.ProfileDetail(arrayData.user_id)


      }
    } catch (e) {
      // error reading value
    }
  }


  async ProfileDetail(user_id) {
    const user = this.context
    console.log('context in home', user);
    console.log('user ', user_id)

    let url = config.baseURL + 'get_all_content.php?user_id_post=' + user_id + '&user_type=1';
    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log('json in content  ', json)

      if (json.success == 'true') {

        if (this.state.type == '3') {


          { user.value == 1 ? this.setState({ about_us: json.content_arr[0].content[1], about: true }) : this.setState({ about_us: json.content_arr[0].content[0], about: true }) }
          console.log('this.state.about_us :>> ', this.state.about_us);
        }
        else if (this.state.type == '2') {
          { user.value == 1 ? this.setState({ privacy: json.content_arr[1].content[1], policy: true }) : this.setState({ privacy: json.content_arr[1].content[0], policy: true }) }

          console.log('this.state.privacy :>> ', this.state.privacy);
        }
        else if (this.state.type == '1') {
          { user.value == 1 ? this.setState({ terms_cond: json.content_arr[2].content[1], terms: true }) : this.setState({ terms_cond: json.content_arr[2].content[0], terms: true }) }
          console.log('this.state.privacy :>> ', this.state.terms_cond);
        }
      } else {
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  webViewTextSize = (data) => {
    return `
           <!DOCTYPE html>
           <html>
           <head>
             <style type="text/css">
               body {
                 font-family: Helvetica;
                 font-size: 3rem;
                 color: black;
                 padding: 20px 20px 20px 20px;
               } 
               p {
                 text-align: center;
               }
             </style>
           </head>
           <meta name="viewport" content="initial-scale=0.1, maximum-scale=0.1">
           <body>
             ${data}
           </body>
           </html>
           `;
  }


  render() {
    // const {width: contentWidth} = useWindowDimensions();

    //console.log(contentWidth)
    //  const width =Dimensions.get('window').width;
    const html1 = this.state.privacy;
    const html2 = this.state.terms_cond;
    const html3 = this.state.about_us;

    console.log(html2[0])
    const user = this.context
    console.log('context in home', user);

    return (
      <View style={{ flex: 1, backgroundColor: Colors.white }}>

        

          {this.state.terms &&
            <Header backBtn={true} imgBack={true} name={user.value == 1 ? Lang_chg.text_Terms_And_Conditions[1] : Lang_chg.text_Terms_And_Conditions[0] } />
          }
          {this.state.about &&
            <Header backBtn={true} imgBack={true} name={user.value == 1 ? Lang_chg.text_About_Us[1] : Lang_chg.text_About_Us[0] }  />
          }
          {this.state.policy &&
            <Header backBtn={true} imgBack={true} name={user.value == 1 ? Lang_chg.html_Privacy_Policy[1] : Lang_chg.html_Privacy_Policy[0] }  />
          }
          <View style={subrata.SEC2}>
            {this.state.terms &&

              <WebView
                source={{ html: this.webViewTextSize(this.state.terms_cond) }}
                startInLoadingState={true}
                originWhitelist={['*']}
                javaScriptEnabled={true}
                // source={{ html: '<h1>Hellogdfgdfgfdgdgdgdgggdggdgdfggdgdggdfgdfgdfgdfgdgdg </h1>' }}
                style={{
                  // width: ,
                  marginTop: 15,
                  textAlign: 'center',
                }}
                height={750}
              />
            }

            {this.state.about &&

              <WebView
                source={{ html: this.webViewTextSize(this.state.about_us) }}
                startInLoadingState={true}
                originWhitelist={['*']}
                javaScriptEnabled={true}
                // source={{ html: '<h1>Hellogdfgdfgfdgdgdgdgggdggdgdfggdgdggdfgdfgdfgdfgdgdg </h1>' }}
                style={{
                  // width: ,
                  marginTop: 15,
                  textAlign: 'center',
                }}
                height={750}
              />
            }
            {this.state.policy &&

              <WebView

                source={{ html: this.webViewTextSize(this.state.privacy) }}
                startInLoadingState={true}
                originWhitelist={['*']}
                javaScriptEnabled={true}
                // source={{ html: '<h1>Hellogdfgdfgfdgdgdgdgggdggdgdfggdgdggdfgdfgdfgdfgdgdg </h1>' }}
                style={{
                  // width: ,
                  marginTop: 15,
                  textAlign: 'center',
                }}
                height={750}
              />
            }

          </View>

      </View>
    )
  }
}
const subrata = StyleSheet.create({
  SEC2: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 25,
    borderTopEndRadius: 25,
    marginTop: -40,
    flex: 1
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold'
  }

})
