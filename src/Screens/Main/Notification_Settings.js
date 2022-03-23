import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  I18nManager,
} from 'react-native';
import {Icon, Input, Card, Rating, AirbnbRating} from 'react-native-elements';
import Header, {s} from '../../Components/Header';
import {back_img4, Colors, FontFamily, Sizes} from '../../Constants/Constants';
import {Switch} from 'react-native-elements';
import {config} from '../../Provider/configProvider';
import AsyncStorage from '@react-native-community/async-storage';
import {localStorage} from '../../Provider/localStorageProvider';
import {msgProvider, msgTitle, msgText} from '../../Provider/messageProvider';

const Noti_Setting = () => {
  const [onGoingNotification, setOnGoingNotification] = useState(false);
  const [chatNotification, setChatNotification] = useState(false);
  const [promotion, setPromotion] = useState(false);
  const [userInfo, setUserInfo] = useState({});

 const getData = async () => {
  let userdata =  await AsyncStorage.getItem('user_arr');
  setUserInfo(userdata)
  setChatNotification(userdata?.chat_notification );
  setPromotion(userdata?.promotion_notification);
  setOnGoingNotification(userdata?.on_going_notification);
  console.log("local user data",userdata);
  };
  
  useEffect(() => {
    getData()
  }, []);

  const getNotificationList = async (status, type) => {
    try {
      const value = await AsyncStorage.getItem('user_arr');
      if (value !== null) {
        const arrayData = JSON.parse(value);
        const formData = new FormData();
        formData.append('user_id_post', arrayData.user_id);
        formData.append('notification_status', status);
        formData.append('notification_type', type);
        console.log('______params', formData);
        const response = await fetch(
          config.baseURL + 'notification_on_off.php',
          {
            method: 'POST',
            body: formData,
          },
        );
        const json = await response.json();
        console.log('json :>> ', json);
        console.log('______', json.success, json?.msg&&json?.msg[0]);
        if(json.success){
          console.log('______', json.success);
          msgProvider.toast(json?.msg&&json?.msg[0], 'bottom');
          // setOnGoingNotification(json.notification_status)
        }
      }
      // console.log(this.state.img)
    } catch (error) {
      console.log(error);
      msgProvider.toast(error, 'bottom');
    } finally {
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <Header
        backBtn={true}
        imgBack={true}
        headerHeight={300}
        backImgSource={require('../../Images/back3.jpg')}
      />
      <View style={styles.SEC2}>
        <View style={{marginTop: 30}}>
          {/* 1 */}
          <View style={{marginBottom: 1}}>
            <Card
              containerStyle={{
                height: 50,
                paddingVertical: 2,
                justifyContent: 'center',
                borderRadius: 12,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: FontFamily.semi_bold,
                      marginHorizontal: 7,
                    }}>
                    On Going Notifications
                  </Text>
                </View>
                <View>
                  <Switch
                    value={onGoingNotification}
                    onChange={() => {
                      getNotificationList(!onGoingNotification, 'ongo');
                      setOnGoingNotification(!onGoingNotification);
                    }}
                    color="#fff"
                    trackColor={{
                      true: Colors.orange,
                      false: Colors.gray,
                    }}
                  />
                </View>
              </View>
            </Card>
          </View>
          {/* 2 */}
          <View style={{marginBottom: 1}}>
            <Card
              containerStyle={{
                height: 50,
                paddingVertical: 2,
                justifyContent: 'center',
                borderRadius: 12,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: FontFamily.semi_bold,
                      marginHorizontal: 7,
                    }}>
                    Chat Notifications
                  </Text>
                </View>
                <View>
                  <Switch
                    value={chatNotification}
                    onChange={() => {
                      getNotificationList(!chatNotification, 'chat');
                      setChatNotification(!chatNotification);
                    }}
                    color="#fff"
                    trackColor={{
                      true: Colors.orange,
                      false: Colors.gray,
                    }}
                  />
                </View>
              </View>
            </Card>
          </View>
          {/* 3 */}
          <View style={{marginBottom: 1}}>
            <Card
              containerStyle={{
                height: 50,
                paddingVertical: 2,
                justifyContent: 'center',
                borderRadius: 12,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: FontFamily.semi_bold,
                      marginHorizontal: 7,
                    }}>
                    Promotion
                  </Text>
                </View>
                <View>
                  <Switch
                    value={promotion}
                    onChange={() => {
                      getNotificationList(!promotion, 'promotion');
                      setPromotion(!promotion);
                    }}
                    color="#fff"
                    trackColor={{
                      true: Colors.orange,
                      false: Colors.gray,
                    }}
                  />
                </View>
              </View>
            </Card>
          </View>
          {/*  */}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  SEC2: {
    backgroundColor: Colors.white,
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopEndRadius: 30,
    flex: 1,
    height: 100,
  },
});
export default Noti_Setting;
