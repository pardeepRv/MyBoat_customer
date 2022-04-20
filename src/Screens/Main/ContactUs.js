import React, { useState, Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Image,
    SafeAreaView, StatusBar,
    Modal,
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
import DatePicker from 'react-native-datepicker';
import { Picker } from '@react-native-community/picker';
import { UserContext } from './UserContext';

export default class ContactUs extends Component {
    static contextType = UserContext
    //  const [date, setDate] = useState(new Date());
    // const onChange = (event, selectedDate) => {
    // const currentDate = selectedDate || date;
    // setDate(currentDate);
    // };

    constructor(props) {
        super(props);
        this.state = {
            contact_us_name: '',
            contact_email: [],
            contact_message: [],
            phone_number: [],
            password: [],
            confirm_password: [],
            date: '09-10-2020',
            address: [],
            dob: [],
            city_name: '',
            gender: [],
            city_arr: [],
            city: [],
            localData: [],
            //template:[{'lang':'Eng'},{'lang':'Arb'}],
        }
    }


    componentDidMount() {

        this.getData('user_arr');
    }
    selectedValue(value) {
        console.log('change ' + value)
    }
    getData = async (key) => {

        console.log('local ' + key)
        try {
            const value = await AsyncStorage.getItem(key);

            //          console.log('local '+value)

            //  console.log('array ',arrayData.email);
            if (value !== null) {

                const arrayData = JSON.parse(value);

                console.log(arrayData, 'array data in getdata contact us ')
                this.setState({
                    localData: arrayData,
                    contact_us_name: arrayData?.name || '',
                    contact_email: arrayData?.email || '',
                    contact_message: arrayData?.mobile || '',
                })
            }
        } catch (e) {
            // error reading value
        }
    }

    UpdateProfile() {
        console.log("KKKKK");
        this.setState({ modalVisible: true })

        let { contact_us_name, contact_email, contact_message } = this.state;

        if (contact_us_name.length <= 0) {
            msgProvider.toast(Lang_chg.MobileMaxLength[config.language], 'center')
            return false
        }

        if (contact_message.length <= 0) {
            msgProvider.toast(Lang_chg.MobileMaxLength[config.language], 'center')
            return false
        }
        if (contact_email.length <= 0) {
            msgProvider.toast(Lang_chg.emptyEmail[config.language], 'center')
            return false
        }
        if (contact_email.length > 50) {
            msgProvider.toast(Lang_chg.emailMaxLength[config.language], 'center')
            return false
        }
        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (reg.test(contact_email) !== true) {
            msgProvider.toast(Lang_chg.validEmail[config.language], 'center')
            return false
        }

        var data = new FormData();
        data.append('user_id_post', this.state.localData.user_id)
        data.append('user_type', 1)
        data.append('contact_us_name', contact_us_name)
        data.append('contact_email', contact_email)
        data.append('contact_message', contact_message)

        this.setState({ loading: true });
        let url = config.baseURL + 'contact_us.php';
        apifuntion.postApi(url, data).then((obj) => {
            // console.log(obj)
            this.setState({ loading: false });
            return obj.json();
        }).then((obj) => {

             console.log(obj);

            if (obj.success == 'true') {

                msgProvider.toast(obj.msg[config.language], 'center')
            }
        }).catch((error) => {
            console.log("-------- error ------- " + error);
            this.setState({ loading: false });
        });
    }

    setDate(date1) {
        console.log(date1)
        this.setState({ date: date1 })
    }

    _selectCity(index) {
        let data = this.state.city_arr;
        let len = this.state.city_arr.length;
        for (let i = 0; i < len; i++) {
            data[i].status = false;
        }

        data[index].status = !data[index].status;
        this.setState({
            city_name: data[index].city[config.language],
            city_id: data[index].city_id,
            modalVisible: false,
        })
        // let data =this.state.city_arr[index];
        // console.log(data)
    }

    render() {
        const user = this.context
        console.log('context in home', user);
        console.log('this.state.localData :>> ', this.state.localData);
        return (
            <View style={{ flex: 1, backgroundColor: Colors.white }}>
                <Header imgBack={true} backBtn={true} name={user.value == 1 ? Lang_chg.contact_to_ad_text[1] : Lang_chg.contact_to_ad_text[0]} />
                <View style={s.SEC2}>
                    <ScrollView>
                        <View style={{ marginTop: 50, paddingHorizontal: 10 }}>

                            <Input
                                placeholder={user.value == 1 ? Lang_chg.textname[1] : Lang_chg.textname[0]}
                                containerStyle={s.Input}
                                inputContainerStyle={s.Input}
                                placeholderTextColor={Colors.inputFieldEditProfile}
                                inputStyle={{ color: Colors.inputFieldEditProfile }}
                                onChangeText={(txt) => { this.setState({ contact_us_name: txt }) }}
                                value={this.state.contact_us_name}
                            //     onChangeText={(text) => {
                            //         this.setState({text}); 
                            //         onChange(text);
                            //    }
                            //    value={this.state.text}
                            //    defaultValue={this.state.localData.name}  
                            />

                            <Input
                                placeholder={user.value == 1 ? Lang_chg.loginEmail[1] : Lang_chg.loginEmail[0]}
                                containerStyle={s.Input}
                                inputContainerStyle={s.Input}
                                placeholderTextColor={Colors.inputFieldEditProfile}
                                inputStyle={{ color: Colors.inputFieldEditProfile }}
                                keyboardType="email-address"
                                onChangeText={(txt) => { this.setState({ contact_email: txt }) }}
                                value={this.state.contact_email}
                                editable={false}
                            />



                            <Input
                                placeholder={user.value == 1 ? Lang_chg.loginEmail[1] : Lang_chg.loginEmail[0]}
                                containerStyle={s.Input}
                                inputContainerStyle={s.Input}
                                placeholderTextColor={Colors.inputFieldEditProfile}
                                inputStyle={{ color: Colors.inputFieldEditProfile }}
                                keyboardType="phone-pad"
                                onChangeText={(txt) => { this.setState({ contact_message: txt }) }}
                                value={this.state.contact_message}

                            />


                            {/* {this.state.city_arr.map((item, id) => 
                      {
                      return <Text>{item.city_id}</Text>
                      }
                      )
                } */}


                        </View>
                    </ScrollView>
                </View>
                <View>
                    <TouchableOpacity style={s.btn1} onPress={() => this.UpdateProfile()} >
                        <Text style={s.btn1Text}>
                            {user.value == 1 ? Lang_chg.txt_Submit[1] : Lang_chg.txt_Submit[0]}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const s = StyleSheet.create({
    SEC2: {
        backgroundColor: Colors.white,
        marginTop: -50,
        borderTopLeftRadius: 25,
        borderTopEndRadius: 25,
        flex: 1
    },
    Text: {
        fontFamily: FontFamily.default
    },
    datePickerStyle: {
        width: 200,
        marginTop: 20,
    },
    Input1: {
        borderBottomColor: Colors.inputFieldEditProfile,
        width: Sizes.width * 0.42,
        marginLeft: -5
    },
    Input: {
        borderBottomColor: Colors.inputFieldEditProfile,
        marginTop: -10
    },
    btn1: {
        height: 48,
        width: "85%",
        backgroundColor: Colors.orange,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
        marginVertical: 10,
        elevation: 5,
        bottom: 20,
    },
    btn1Text: {
        fontSize: 20,
        fontFamily: FontFamily.semi_bold,
        color: Colors.white
    }
    , select_city: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 25,
        paddingRight: 25,
        backgroundColor: '#fff',
        paddingTop: 20,
        paddingBottom: 20,
    },
    select_back_city: {
        width: 30,
        resizeMode: 'contain',
        height: 30,
        tintColor: '#000',
    },
    edit_select_txt: {
        textAlign: 'left',
        fontFamily: "Ubuntu-Regular",
        fontSize: 14,
        color: '#b8b8b8',
        marginRight: 25,
        marginTop: 0,
        marginBottom: 10,
        marginLeft: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
    flag_text_detail: {
        color: '#333232',
        fontSize: 16,
        fontFamily: "Ubuntu-Regular",
    },

})
//export default EditProfile;