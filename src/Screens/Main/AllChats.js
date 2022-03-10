import React, { PureComponent } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    RefreshControl,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
// import { connect } from "react-redux";
import Header from "../../Components/Header";
import {
    Icon,
    Input,
    Card,
    AirbnbRating,
    Overlay,
    colors,

} from 'react-native-elements';
import { Colors, FontFamily, Sizes } from "../../Constants/Constants";
import { Lang_chg } from "../../Provider/Language_provider";
import { config } from "../../Provider/configProvider";
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
            allChatMember: dummyChat,
        };
    }

    renderChats = ({ item }) => {
        let data = {};

        return (
            <Card containerStyle={{
                borderRadius: 20,
                elevation: 3,
                // marginHorizontal: 10,
                // marginTop: 14,
                marginBottom: 15,
                // padding: 10,
                backgroundColor: colors.orange,
                margin: 5,
                width: Sizes.width * 0.95,
            }}>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate("OneToOneChat", { data: data || {} });
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            style={{ backgroundColor: Colors.orange, alignSelf: 'center', alignItems: 'center', marginRight: 14, justifyContent: 'center', height: 40, width: 40, borderRadius: 50 }}>
                            <Image source={require('../../../assets/icons/inbox_not_found.png')} style={{ height: 40, width: 40, resizeMode: 'contain' }} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'column', marginRight: 15, width: '50%' }}>
                            <Text numberOfLines={1} style={{ textAlign: 'left', fontSize: 16, bottom: 2, right: 35, fontFamily: FontFamily.bold, }} > {item.name}</Text>
                            <Text numberOfLines={1} style={{ textAlign: 'left', fontSize: 12, right: 33 }}> {item.lastMsg} </Text>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ fontSize: 12, marginTop: -14 }}>{item.time}</Text>

                        </View>
                    </View>
                </TouchableOpacity>
            </Card>
        );
    };

    render() {
        // const { userData } = this.props;
        const { isLoading, allChatMember } = this.state;
        const user = this.context

        return (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>

                <Header
                    imgBack={true}
                    notiBtn={false}
                    searchBtn={this.state?.inboxmessage?.length > 0 ? true : false}
                    headerHeight={200}
                    name={user.value == 1 ? Lang_chg.mesage[1] : Lang_chg.mesage[0]}
                    backImgSource={require('../../Images/backgroundImg.png')}
                />
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
                <View style={{ borderBottomColor: '#000', borderBottomWidth: 1 }}><Text style={{ color: "#000000" }}>{Lang_chg.inbox_not_found[config.language]}</Text></View>
              </TouchableOpacity>
                    </View>
                   
                )}
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
