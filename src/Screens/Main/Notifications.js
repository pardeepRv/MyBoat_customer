import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Image,
    I18nManager
} from 'react-native';
import {
    Icon,
    Input,
    Card,
    Rating,
    AirbnbRating
} from 'react-native-elements';
import Header, { s } from '../../Components/Header';
import { back_img4, Colors, FontFamily, Sizes } from '../../Constants/Constants';
import { useNavigation } from '@react-navigation/core';
import { config } from '../../Provider/configProvider';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../Provider/Loader';
import { UserContext } from './UserContext';
import { Lang_chg } from '../../Provider/Language_provider';
import { apifuntion } from '../../Provider/apiProvider';
import { msgProvider } from '../../Provider/messageProvider';

const NotificationsPage = () => {
    const user = React.useContext(UserContext);

    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(false);

    const gotoNotifications_Details = ({ data }) => {
        console.log('data :>> ', data);
        navigation.navigate("Notifications_Details", { data })
    }
    useEffect(() => {
        getNotificationList()
    }, [])


    const getNotificationList = async () => {
        try {
            const value = await AsyncStorage.getItem('user_arr');
            if (value !== null) {
                const arrayData = JSON.parse(value);
                console.log('arrayData :>> ', arrayData);
                const response = await fetch(
                    config.baseURL +
                    'notificationList.php?user_id_post=' +
                    arrayData.user_id,
                );
                const json = await response.json();
                setData(json.notification_arr)
                console.log('______', json);


            }
            // console.log(this.state.img)
        } catch (error) {
            console.log(error);
        } finally {
        }
    }

    // const deleteNotification = () => {
    //     alert("delete");
    // };

    const deleteNotification = async (type , id) => {
         console.log('type :>> ', type , id);
         let notification_id = '';
         let status ='';
       if (type == 1 ){
        notification_id =id ; 
        status ="single";
       }else {
        notification_id = null ; 
        status ="all";
       }
       setLoader(true);
        const value = await AsyncStorage.getItem('user_arr');
        console.log('value :>> ', value);
        const arrayData = JSON.parse(value);
         console.log('arrayData :>> ', arrayData);

        let url =
        config.baseURL +
        'notificationDelete.php?user_id_post=' +
        arrayData.user_id +
        '&notification_message_id=' +  notification_id   +  "&delete_type="  + status  ;
      console.log(url, "url gere");
      apifuntion
        .getApi(url)
        .then(res => {
          return res.json();
        })
        .then((res) => {
           console.log(res, "res in notificatuon delted  ");
          setLoader(false);
          if (res && res.success) {
            //Initalizing the chat history
           alert(res?.msg[0])
            // msgProvider.toast(res?.msg[0], 'bottom');
            getNotificationList();
          }
        })
        .catch((err) => {
            setLoader(false)
          console.log(err);
        });
      }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <Header
                backBtn={true}
                name={user.value == 1 ? Lang_chg.text_notification[1] : Lang_chg.text_notification[0]}
            />
            {/* Clear */}
            <View style={{ position: "absolute", right: 30, top: 42 }}>
                <TouchableOpacity
                onPress={()=>deleteNotification(2)}
                >
                    <Text style={{
                        textDecorationStyle: "solid",
                        textDecorationLine: "underline",
                        color: Colors.white,
                        fontFamily: FontFamily.default,
                        fontSize: 14
                    }}>
                        {user.value == 1 ? Lang_chg.text_clear[1] : Lang_chg.text_clear[0]}
                    </Text>
                </TouchableOpacity>
            </View>
            {/* SEC2 */}
            <View style={sb.SEC2}>
                {loader ? (
                    <Loader />
                ) :
                    (
                        <View style={{ marginTop: 30 }}>
                            {data === "NA" ? (
                                <View style={{ alignItems: "center", marginTop: "10%" }}>
                                    <Text style={{textAlign:'center', fontSize: 20, fontWeight: "bold", color: "#ccc" }}>"No Notification" </Text>
                                </View>
                            ) : (
                                <FlatList
                                    data={data === "NA" ? [] : data}
                                    keyExtractor={(item, ind) => ind}
                                    contentContainerStyle={{
                                        paddingBottom: 15,
                                    }}
                                    renderItem={(item) => {
                                        return (
                                            <TouchableOpacity
                                                onPress={() =>
                                                    gotoNotifications_Details({ data: item.item })
                                                }
                                            >
                                                <Card containerStyle={{ borderRadius: 12, padding: 5 }}>
                                                    <View
                                                        style={{
                                                            alignItems: "center",
                                                            flexDirection: "row",
                                                            justifyContent: "space-between",
                                                        }}
                                                    >
                                                        <View
                                                            style={{
                                                                alignItems: "center",
                                                                flexDirection: "row",
                                                                width: "50%",
                                                            }}
                                                        >
                                                            <Image
                                                                style={{
                                                                    height: 60,
                                                                    width: 60,
                                                                    borderRadius: 12,
                                                                }}
                                                                source={{ uri: config.image_url4 + item.item.user_image }}
                                                            />
                                                            <View style={{ marginLeft: 7 , alignItems:'flex-start' }}>
                                                                <Text
                                                                    style={{
                                                                        fontFamily: FontFamily.semi_bold,
                                                                        fontSize: 16,
                                                                        lineHeight: 22,
                                                                    }}
                                                                >
                                                                    {user.value == 1 ? item.item.title[1] :  item.item.title[0]}
                                                                </Text>
                                                                <Text
                                                                    style={{
                                                                        width: "50%",
                                                                        fontSize: 12,
                                                                        fontFamily: FontFamily.default,
                                                                        color: "rgba(0, 0, 0, 0.58)",
                                                                    }}
                                                                >
                                                                    { user.value == 1 ? item.item.message[1] : item.item.message[0]}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                        <View>
                                                            <Text
                                                                style={{
                                                                    fontSize: 12,
                                                                    fontFamily: FontFamily.default,
                                                                    color: "rgba(0, 0, 0, 0.58)",
                                                                }}
                                                            >
                                                                {item.item.createtime_ago}
                                                            </Text>
                                                            <TouchableOpacity
                                                                onPress={()=>deleteNotification(1 , item.item.notification_message_id)}
                                                            >
                                                                <Card
                                                                    containerStyle={{
                                                                        height: 27,
                                                                        width: 27,
                                                                        padding: 0,
                                                                        alignItems: "center",
                                                                        justifyContent: "center",
                                                                    }}
                                                                >
                                                                    <Icon
                                                                        name="trash-outline"
                                                                        type="ionicon"
                                                                        color={Colors.orange}
                                                                    />
                                                                </Card>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                </Card>
                                            </TouchableOpacity>
                                        );
                                    }}
                                />
                            )}
                        </View>
                    )}
            </View>
        </View>
    )
}
const sb = StyleSheet.create({
    SEC2: {
        backgroundColor: Colors.white,
        marginTop: -120,
        borderTopLeftRadius: 25,
        borderTopEndRadius: 25,
        flex: 1
    }
})
export default NotificationsPage;