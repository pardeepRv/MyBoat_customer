import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    StyleSheet
} from 'react-native';
import { Icon } from 'react-native-elements';
import { back_img, backgd2, back_img2, Colors, FontFamily } from '../Constants/Constants';
import { useNavigation } from '@react-navigation/core';
import { UserContext } from '../Screens/Main/UserContext';


const Header = ({ backBtn, notiBtn, searchBtn, name, imgBack, backColor, headerHeight, backImgSource, notificationRead }) => {
    const user = React.useContext(UserContext);

    const navigation = useNavigation();
    const [state, setState] = useState({
        backBtn: false || backBtn,
        notiBtn: false || notiBtn,
        searchBtn: false || searchBtn,
        imgBack: false || imgBack,
        name: " " || name,
        backColor: Colors.orange || backColor,
        headerHeight: headerHeight || 200,
        back_img_source: backImgSource || back_img2
    })
    const gotoBack = () => {
        navigation.goBack();
    };
    const gotoNotification = () => {
        navigation.navigate("Notifications")
    };
    return (
        state.imgBack ? (
            <ImageBackground
                style={[s.ImageBackground, { height: state.headerHeight }]}
                source={state.back_img_source}
                imageStyle={s.ImageBackground_Img}
            >{
                    user.value == 1 ? (
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "90%", marginTop: 50, alignSelf: "center", backgroundColor: "transparent", alignItems: "center" }}>
                            {
                                state.backBtn ? (
                                    <TouchableOpacity onPress={() => gotoBack()} style={{ backgroundColor: Colors.orange, transform: [{ rotate: '180deg' }], borderRadius: 20 }}>
                                        <Icon name="arrow-back" type="ionicons" size={24} color={Colors.white} />
                                    </TouchableOpacity>
                                ) : state.notiBtn ? (
                                    <TouchableOpacity onPress={() => gotoNotification()} style={{ backgroundColor: Colors.orange, borderRadius: 20 }}>
                                        <Icon name="bell" type="simple-line-icon" size={24} color={Colors.white} />
                                    </TouchableOpacity>
                                ) : <View style={{ height: 25, width: 25 }} />
                            }
                            <View style={{ backgroundColor: Colors.orange, borderRadius: 20, padding: 5 }}>
                                <Text style={{ fontFamily: FontFamily.semi_bold, color: Colors.white, textAlign: "center" }}>
                                    {name}
                                </Text>
                            </View>
                            {
                                state.searchBtn ? (
                                    <TouchableOpacity style={{ backgroundColor: Colors.orange, borderRadius: 20 }}>
                                        <Icon name="search1" type="antdesign" size={25} color={Colors.white} />
                                    </TouchableOpacity>
                                ) : <View style={{ height: 25, width: 25 }} />
                            }
                        </View>
                    ) : (
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "90%", marginTop: 50, alignSelf: "center", backgroundColor: "transparent", alignItems: "center" }}>
                            {
                                state.backBtn ? (
                                    <TouchableOpacity onPress={() => gotoBack()} style={{ backgroundColor: Colors.orange, borderRadius: 20 }}>
                                        <Icon name="arrow-back" type="ionicons" size={24} color={Colors.white} />
                                    </TouchableOpacity>
                                ) : state.notiBtn ? (
                                    <TouchableOpacity onPress={() => gotoNotification()} style={{ backgroundColor: Colors.orange, borderRadius: 20 }}>
                                        <Icon name="bell" type="simple-line-icon" size={24} color={Colors.white} />
                                        {
                                            notificationRead == 0 && <View
                                                style={{
                                                    height: 12,
                                                    width: 12,
                                                    borderRadius: 12 / 2,
                                                    backgroundColor: Colors.red,
                                                    position: "absolute",
                                                    bottom: 20,
                                                }}
                                            />
                                        }
                                    </TouchableOpacity>
                                ) : <View style={{ height: 25, width: 25 }} />
                            }
                            <View style={{ backgroundColor: Colors.orange, borderRadius: 20, padding: 5 }}>
                                <Text style={{ fontFamily: FontFamily.semi_bold, color: Colors.white, textAlign: "center" }}>
                                    {name}
                                </Text>
                            </View>
                            {
                                state.searchBtn ? (
                                    <TouchableOpacity style={{ backgroundColor: Colors.orange, borderRadius: 20 }}>
                                        <Icon name="search1" type="antdesign" size={25} color={Colors.white} />
                                    </TouchableOpacity>
                                ) : <View style={{ height: 25, width: 25 }} />
                            }
                        </View>
                    )
                }
            </ImageBackground>
        ) : (
            <View
                style={[s.ImageBackground, { backgroundColor: state.backColor, height: state.headerHeight }]}
            >
                {user.value == 1 ?
                    (
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "90%", marginTop: 50, alignSelf: "center", backgroundColor: "transparent", alignItems: "center" }}>
                            {
                                state.backBtn ? (
                                    <TouchableOpacity onPress={() => gotoBack()} style={{ backgroundColor: Colors.orange, borderRadius: 20, transform: [{ rotate: '180deg' }] }}>
                                        <Icon name="arrow-back" type="ionicons" size={24} color={Colors.white} />
                                    </TouchableOpacity>
                                ) : state.notiBtn ? (
                                    <TouchableOpacity onPress={() => gotoNotification()} style={{ backgroundColor: Colors.orange, borderRadius: 20 }}>
                                        <Icon name="bell" type="simple-line-icon" size={24} color={Colors.white} />
                                    </TouchableOpacity>
                                ) : <View style={{ height: 25, width: 25 }} />
                            }
                            <View style={{ flex: 1, backgroundColor: Colors.orange, borderRadius: 20 }}>
                                <Text style={{ fontFamily: FontFamily.semi_bold, color: Colors.white, textAlign: "center" }}>
                                    {name}
                                </Text>
                            </View>
                            {
                                state.searchBtn ? (
                                    <TouchableOpacity style={{ backgroundColor: Colors.orange, borderRadius: 20 }}>
                                        <Icon name="search1" type="antdesign" size={25} color={Colors.white} />
                                    </TouchableOpacity>
                                ) : <View style={{ height: 25, width: 25 }} />
                            }
                        </View>
                    ) : (
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "90%", marginTop: 50, alignSelf: "center", backgroundColor: "transparent", alignItems: "center" }}>
                            {
                                state.backBtn ? (
                                    <TouchableOpacity onPress={() => gotoBack()} style={{ backgroundColor: Colors.orange, borderRadius: 20 }}>
                                        <Icon name="arrow-back" type="ionicons" size={24} color={Colors.white} />
                                    </TouchableOpacity>
                                ) : state.notiBtn ? (
                                    <TouchableOpacity onPress={() => gotoNotification()} style={{ backgroundColor: Colors.orange, borderRadius: 20 }}>
                                        <Icon name="bell" type="simple-line-icon" size={24} color={Colors.white} />
                                    </TouchableOpacity>
                                ) : <View style={{ height: 25, width: 25 }} />
                            }
                            <View style={{ flex: 1, backgroundColor: Colors.orange, borderRadius: 20 }}>
                                <Text style={{ fontFamily: FontFamily.semi_bold, color: Colors.white, textAlign: "center" }}>
                                    {name}
                                </Text>
                            </View>
                            {
                                state.searchBtn ? (
                                    <TouchableOpacity style={{ backgroundColor: Colors.orange, borderRadius: 20 }}>
                                        <Icon name="search1" type="antdesign" size={25} color={Colors.white} />
                                    </TouchableOpacity>
                                ) : <View style={{ height: 25, width: 25 }} />
                            }
                        </View>
                    )
                }
            </View>
        )

    )
}
export const s = StyleSheet.create({
    ImageBackground: {
        backgroundColor: Colors.black
    },
    ImageBackground_Img: {
        resizeMode: "cover",
        //opacity:0.5
    }
})
export default Header;