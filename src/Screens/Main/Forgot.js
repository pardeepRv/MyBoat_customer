import React, { Component } from 'react';
import { Text, View, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, Dimensions, ImageBackground, Image, TextInput, Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import {
    Input, Icon
} from 'react-native-elements';
import { apifuntion } from '../../Provider/apiProvider';
import { msgProvider, msgTitle, msgText } from '../../Provider/messageProvider';
import { backgd, back_img, google_icon, Colors, FontFamily, Sizes } from '../../Constants/Constants';
import { useNavigation } from '@react-navigation/core';
import { config } from '../../Provider/configProvider';
import { localStorage } from '../../Provider/localStorageProvider';
import { CommonActions } from '@react-navigation/native';
//import {Picker} from '@react-native-picker/picker';
import { Picker } from '@react-native-community/picker';
//import { msgProvider, msgTitle, msgText } from '../../Provider/messageProvider';
//import AsyncStorage  from "@react-native-community/async-storage";
import { Lang_chg } from '../../Provider/Language_provider'
import { UserContext } from './UserContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class Forgot extends Component {
    static contextType = UserContext;


    state = {
        email: '',
        loading: false,
        isConnected: true,
    }

    backpress = () => {
        this.props.navigation.goBack();
    }

    _btnSubmitForgot = () => {
        let user_email = this.state.email;
        //email============================
        if (user_email.length <= 0) {
            msgProvider.toast(Lang_chg.emptyEmail[config.language], 'center')
            return false
        }
        if (user_email.length > 50) {
            msgProvider.toast(Lang_chg.emailMaxLength[config.language], 'center')
            return false
        }
        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (reg.test(user_email) !== true) {
            msgProvider.toast(Lang_chg.validEmail[config.language], 'center')
            return false
        }

        if (this.state.isConnected === true) {
            let url = config.baseURL + "forget_password.php";
            var data = new FormData();
            data.append('user_email', user_email)
            this.setState({ loading: true })
            apifuntion.postApi(url, data).then((obj) => {
                this.setState({ loading: false });
                return obj.json();
            }).then((obj) => {
                console.log('user array', obj)
                //  alert(JSON.stringify(obj))
                if (obj.success == 'true') {
                    let email_arr = obj.email_arr;
                    if (typeof email_arr !== 'undefined') {
                        if (email_arr != 'NA') {
                            this.mailsendfunction(email_arr);
                        }
                    }
                    msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
                    this.backpress();
                    return false;
                } else {
                    msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
                    return false;
                }
            }).catch((error) => {
                console.log("-------- error ------- " + error);
                this.setState({ loading: false });
            });
        }
        else {
            msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
        }
    }

    mailsendfunction = (email_arr) => {
        console.log('email_arr', email_arr);
        for (let i = 0; i < email_arr.length; i++) {
            var email = email_arr[i].email;
            var mailcontent = email_arr[i].mailcontent
            var mailsubject = email_arr[i].mailsubject
            var fromName = email_arr[i].fromName
            var url = config.baseURL + 'mailFunctionsSend.php';
            var data = new FormData();
            data.append("email", email);
            data.append("mailcontent", mailcontent);
            data.append("mailsubject", mailsubject);
            data.append("fromName", fromName);
            data.append("mail_file", 'NA');
            console.log('forget==', data);

            // api calling start==============================
            apifuntion.postApi(url, data).then((obj) => {
                return obj.json();
            }).then((obj) => {
                //  alert(JSON.stringify(obj))
                if (obj.success == 'true') {
                    console.log('Mail send');
                } else {
                    console.log('not send mail');
                }
                // api calling end==============================    
            })
        }
    }

    render() {
        const user = this.context
        console.log('context in login', user);
        const { width, height } = Dimensions.get('window');

        return (
            <View activeOpacity={1} onPress={() => { Keyboard.dismiss() }} style={{ flex: 1, height: '100%', }}>
                <ImageBackground style={{ width: '100%', height: '100%', backgroundColor: Colors.black, }} imageStyle={styles.ImageBackground_Img} source={backgd}  >

                    <View>
                        {user.value == 1 ?
                            <TouchableOpacity
                                style={{
                                    marginBottom: -65,
                                    alignItems: "flex-start",
                                    marginTop: 40,
                                    marginLeft: 20,
                                    // backgroundColor: Colors.orange,
                                    borderRadius: 25,
                                    transform: [{ rotate: '180deg' }]
                                }}
                            >
                                <Icon
                                    onPress={() => this.backpress()}
                                    name="arrow-back"
                                    type="ionicons"
                                    size={26}
                                    color={Colors.white}
                                />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                style={{
                                    marginBottom: -65,
                                    alignItems: "flex-start",
                                    marginTop: 40,
                                    marginLeft: 20,
                                    // backgroundColor: Colors.orange,
                                    borderRadius: 25,
                                }}
                            >
                                <Icon
                                    onPress={() => this.backpress()}
                                    name="arrow-back"
                                    type="ionicons"
                                    size={26}
                                    color={Colors.white}
                                />
                            </TouchableOpacity>
                        }
                    </View>
                    <View style={styles.logo_forgot}>
                        <Text style={styles.forgot_title}>{Lang_chg.txt_Forgot_Pass1[config.language]}</Text>
                        <Text style={{ color: '#fff' }}>{Lang_chg.txt_Forgot_Pass2[config.language]}</Text>
                    </View>

                    <KeyboardAwareScrollView
                        extraScrollHeight={50}
                        nestedScrollEnabled
                        enableOnAndroid={true}
                        style={styles.subContainer}
                        contentContainerStyle={styles.subContentContainer}
                        keyboardShouldPersistTaps={'always'}
                        showsVerticalScrollIndicator={false}>
                        <View
                            style={{
                                flex: 1,
                                marginTop: height / 10,
                                // position: 'absolute',               
                                paddingHorizontal: 20,
                                marginBottom: 10
                            }}>
                            <Input
                                placeholder="Email"
                                containerStyle={styles.Input}
                                inputContainerStyle={styles.Input}
                                placeholderTextColor={Colors.white}
                                inputStyle={{ color: Colors.white }}
                                autoCapitalize={false}
                                returnKeyType='done'
                                onSubmitEditing={() => { Keyboard.dismiss() }}
                                onChangeText={(txt) => { this.setState({ email: txt }) }}
                                maxLength={50}
                                minLength={6}
                                value={this.state.email}
                            />


                            <View style={{ alignItems: 'center' }}>
                                <TouchableOpacity style={styles.Btn1} onPress={() => { this._btnSubmitForgot() }}>
                                    <Text style={styles.Btn1Text}>
                                        {Lang_chg.txt_Forgot_Pass3[config.language]}
                                    </Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                </ImageBackground>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    forgot_back: {
        width: 35,
        height: 20,
    },
    firgot_header: {
        marginTop: 25,
        marginLeft: 20,
    },
    forgot_logo_img: {
        textAlign: 'center',
        width: 90,
        height: 90,
    },
    logo_forgot: {
        alignItems: 'center',
        marginTop: '40%',
    },
    Input: {
        borderBottomColor: Colors.white,
        width: Sizes.width * 0.85,
        color: Colors.white
    },
    forgot_title: {
        fontFamily: 'Ubuntu-Bold',
        fontSize: 25,
        color: '#fff',
        marginTop: 5,
        fontWeight: 'bold',
        marginTop: 40,
    },
    Btn1: {
        height: 48,
        width: 175,
        backgroundColor: Colors.orange,
        margin: 5,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
        elevation: 3,
        overflow: 'hidden',
        shadowColor: '#fff',
        shadowRadius: 10,
        shadowOpacity: 1,
    },
    Btn1Text: {
        fontSize: 20,
        fontFamily: FontFamily.semi_bold,
        color: Colors.white
    },
    ImageBackground_Img: {
        opacity: 0.5,
        resizeMode: 'cover',
    },

    main_login: {
        width: "90%",
        alignItems: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 35,
    },
    login_input: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: "center",
        height: 50,
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#c2c2c2',
        backgroundColor: '#fff',
    },
    enter_emaol_login: {
        textAlign: 'right',
        height: 50,
        width: '100%',
        paddingRight: 20,
        paddingLeft: 20,
        fontSize: 16,
        fontFamily: "Ubuntu-Regular",
        height: 50
    },
    login_email: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    log_txt_btn: {
        lineHeight: 60,
        textAlign: 'center',
        fontFamily: "Ubuntu-Bold",
        fontSize: 17,
        color: 'white'
    },
    login_btn1: {
        backgroundColor: '#01a8e7',
        width: '100%',
        alignSelf: 'center',
        height: 60,
        borderRadius: 15,
        marginTop: 25,
    },
    subContainer: {
        // height: layout.size.height ,
        // flex: 1,
        // backgroundColor:colors.secondry
        flexGrow: 1
    },
    subContentContainer: {
        paddingBottom: 12,
    },
})