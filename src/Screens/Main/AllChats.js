import AsyncStorage from "@react-native-community/async-storage";
import React, { PureComponent } from "react";
import {
    Dimensions,
    FlatList,
    Image, StyleSheet,
    Text,
    TouchableOpacity,
    View, 
    Alert
} from "react-native";
import {
    Card, colors, Icon
} from 'react-native-elements';
import TimeAgo from "react-native-timeago";
// import { connect } from "react-redux";
import Header from "../../Components/Header";
import { Colors, FontFamily, Sizes } from "../../Constants/Constants";
import { apifuntion } from "../../Provider/apiProvider";
import { config } from "../../Provider/configProvider";
import { Lang_chg } from "../../Provider/Language_provider";
import { UserContext } from "./UserContext";


const { width, height } = Dimensions.get("window");

const dummyChat = [
    {
        id: 1,
        name: "Colin Mochrie",
        lastMsg: "How are you doing?",
        time: "1h",
    },
    {
        id: 2,
        name: "Mila Kunis",
        lastMsg: "How are you doing?",
        time: "2h",
    },
    {
        id: 3,
        name: "James Kylie",
        lastMsg: "How are you doing?",
        time: "2h",
    },
];

class AllChats extends PureComponent {
    static contextType = UserContext
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            allChatMember: [],
        };
    }

    componentDidMount() {
        this.onFocusSubscribe = this.props.navigation.addListener("focus", () => {
            this.getAllChatMembers();
        });
    }

    componentWillUnmount() {
        this.onFocusSubscribe();
    }

    getAllChatMembers = async () => {
        this.setState({
            isLoading: true,
        });
        const value = await AsyncStorage.getItem('user_arr');
        console.log('value :>> ', value);
        const arrayData = JSON.parse(value);
        console.log('arrayData :>> ', arrayData);
        let url = config.baseURL + "chat_list.php";

        let data = new FormData();
        data.append("user_id", arrayData.user_id);
  console.log('url :>> ', url);
        apifuntion
            .postApi(url, data)
            .then(obj => {
                return obj.json();
            })
            .then(obj => {
                console.log(obj, "get all chats");
                if (obj?.success === "true") {
                    this.setState({
                        allChatMember: obj && obj.data ,
                        isLoading: false,
                    });
                } else {
                    this.setState({
                        isLoading: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    isLoading: false,
                });
            });
    };

     deleteNotification = async (item) => {
         console.log('type :>> ', item);
       
      this.setState({
        isLoading: true,
    });
       const value = await AsyncStorage.getItem('user_arr');
       console.log('value :>> ', value);
       const arrayData = JSON.parse(value);
        console.log('arrayData :>> ', arrayData);

       let url =
       config.baseURL +
       'chat_delete_list.php' ;
       let data = new FormData();
        data.append("user_id", arrayData.user_id);
        data.append("other_user_id", item.other_user_id);

     console.log(url, "url gere");
     apifuntion
            .postApi(url, data)
            .then(obj => {
                return obj.json();
            })
            .then(obj => {
                console.log(obj, "get all chats");
                if (obj?.success===  "true") {
                    Alert.alert("Chat has been deleted successfully!");
                  this.getAllChatMembers();
                } 
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    isLoading: false,
                });
            });
     }
alertreset =(item)=>{
    Alert.alert(
        "Delete Chat",
        "Are you sure yo want to delete the chat ?",
        [
            {
                text: "Delete",
                onPress: () => {
                    this.deleteNotification(item);
                },
            },
            {
                text: "Cancel",
                onPress: () => {
                    console.log('cancel');
                },
            },
        ],
        { cancelable: true }
    );
}
   

    renderChats = ({ item }) => {
        // let data = {};
        const user = this.context

        return (
            <>
            {item && item.last_message ?(
            <Card containerStyle={{
                borderRadius: 20,
                elevation: 1,
                // marginHorizontal: 10,
                // marginTop: 14,
                marginBottom: 15,
                // padding: 10,s
                backgroundColor: colors.white,
                margin: 5,
                width: Sizes.width * 0.95,
            }}>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate("OneToOneChat", { data: item });
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            style={{ backgroundColor: Colors.orange, alignSelf: 'center', alignItems: 'center', marginRight: 14, justifyContent: 'center', height: 40, width: 40, borderRadius: 50 }}>
                            <Image
                                // source={require('../../../assets/icons/inbox_not_found.png')} 
                                // source={{
                                //     uri:
                                //       config.image_url4 +
                                //     item.image
                                //   }}
                                source={
                                    item?.image
                                        ? {
                                            uri:
                                                config.image_url4 +
                                                item.image
                                        }
                                        : require('../../../assets/icons/inbox_not_found.png')
                                }
                                style={{ height: 50, width: 50, resizeMode: 'cover', borderRadius: 50 }}
                            />
                        </TouchableOpacity>
                
                        <View style={{ flexDirection: 'column', marginRight: 15, width: '50%' }}>
                            <Text numberOfLines={1} style={{ textAlign: 'left', fontSize: 16, fontFamily: FontFamily.bold,top:-2 }} >
                                {item.name}
                            </Text>
                            <Text numberOfLines={1} style={{ textAlign: 'left', fontSize: 13 , top : 2 }}>
                                {item.last_message}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'column'  , alignItems:'center'}}>
                            <TimeAgo time={item?.last_message_time} />
                            <TouchableOpacity
                                onPress={() => this.alertreset( item)}
                                style={{
                                    height: 30,
                                    width: 30,
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
                                
                            </TouchableOpacity>


                        </View>
                    </View>
                </TouchableOpacity>
            </Card>
            ):
            <View
                            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                        >
                            {/* <Text style={{}}>No chat yet</Text> */}
                            <TouchableOpacity activeOpacity={0.7} onPress={() => { this.props.navigation.navigate('Home') }} style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center', height: 600, width: 400 }}>
                                <Image source={require('../../../assets/icons/inbox_not_found.png')} style={{ height: 100, width: 100, resizeMode: 'contain' }} />
                                <View style={{ borderBottomColor: '#000', borderBottomWidth: 1 }}><Text style={{ color: "#000000" , fontSize:15 }}>{user.value == 1 ? Lang_chg.inbox_not_found[1] : Lang_chg.inbox_not_found[0]}</Text></View>
                            </TouchableOpacity>
                        </View>
            }
            </>
        );
    };

    render() {
        // const { userData } = this.props;
        const { isLoading, allChatMember } = this.state;
        const user = this.context
        console.log('allChatMember :>> ', allChatMember);
        return (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>

                <Header
                backBtn={this.props?.route.params?.notificationParam ? true : false}
                    imgBack={true}
                    notiBtn={false}
                    searchBtn={this.state?.inboxmessage?.length > 0 ? true : false}
                    headerHeight={250}
                    name={user.value == 1 ? Lang_chg.mesage[1] : Lang_chg.mesage[0]}
                    backImgSource={require('../../Images/backgroundImg.png')}
                    
                />
                {/* {isLoading && <Loader />} */}
                <View style={{
                    backgroundColor: Colors.white,
                    borderTopLeftRadius: 25,
                    borderTopEndRadius: 25,
                    marginTop: -30,
                    flex: 1
                }}
                >
                    {allChatMember.length > 0 ? (
                        <FlatList
                            keyboardShouldPersistTaps={"handled"}
                            showsVerticalScrollIndicator={false}
                            data={allChatMember}
                            style={{
                                marginTop: 10,
                                alignSelf: "center",
                            }}
                            extraData={allChatMember}
                            renderItem={this.renderChats}
                            item={(item, index) => index.toString()}
                        />
                    ) : (
                        <View
                            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                        >
                            {/* <Text style={{}}>No chat yet</Text> */}
                            <TouchableOpacity activeOpacity={0.7} onPress={() => { this.props.navigation.navigate('Home') }} style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center', height: 600, width: 400 }}>
                                <Image source={require('../../../assets/icons/inbox_not_found.png')} style={{ height: 100, width: 100, resizeMode: 'contain' }} />
                                <View style={{ borderBottomColor: '#000', borderBottomWidth: 1 }}><Text style={{ color: "#000000" }}>{user.value == 1 ? Lang_chg.inbox_not_found[1] : Lang_chg.inbox_not_found[0]}</Text></View>
                            </TouchableOpacity>
                        </View>

                    )}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapperStyle: {
        backgroundColor: "white",
    },
    listContainer: {
        paddingBottom: 60,
    },
    headerContainer: {
        borderBottomWidth: 0.5,
        borderBottomColor: "green",
    },
    hiddenContainer: {
        flex: 1,
        alignItems: "flex-end",
    },
    moreText: {
        color: "white",
    },
    chat: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 5,
        width: "70%",
    },
    imageContainer: {
        height: width * 0.15,
        width: width * 0.15,
        overflow: "hidden",
    },
    left: {
        flexDirection: "row",
        width: "60%",
        alignItems: "center",
    },
    right: {
        flex: 1,
        alignItems: "flex-end",
    },
    separator: {
        width: "100%",
        borderBottomWidth: 1,
        borderColor: "lightgrey",
        marginVertical: 10,
    },
    msgText: {
        fontSize: 14,
        marginTop: 4,
    },
    msgTime: {
        fontSize: 14,
        textAlign: "right",
    },
});

export default AllChats;
