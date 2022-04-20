import React ,{Component} from 'react';
import { 
    Text,
    View,
    StyleSheet,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import { 
    Icon,
    
} from 'react-native-elements';
import { back_img, Colors, FontFamily, Sizes } from '../../Constants/Constants';
import { useNavigation } from '@react-navigation/core';
import Header from '../../Components/Header';
import {Input} from 'galio-framework'
import { renderNode } from 'react-native-elements/dist/helpers';
//import { Component } from 'react';
import { apifuntion } from '../../Provider/apiProvider';
import { msgProvider, msgTitle, msgText } from '../../Provider/messageProvider';
//import { backgd,back_img,google_icon, Colors, FontFamily, Sizes } from '../../Constants/Constants';
//import { useNavigation } from '@react-navigation/core';
import { config } from '../../Provider/configProvider';
import { localStorage } from '../../Provider/localStorageProvider';
import { CommonActions } from '@react-navigation/native';
//import Icon from 'react-native-vector-icons/dist/FontAwesome';
//import {Picker} from '@react-native-picker/picker';
import {Picker} from '@react-native-community/picker';
//import { msgProvider, msgTitle, msgText } from '../../Provider/messageProvider';
import AsyncStorage  from "@react-native-community/async-storage";
import { Lang_chg } from '../../Provider/Language_provider'
import { UserContext } from '../Main/UserContext';


export default class Change_Password extends Component{
    static contextType = UserContext
    constructor(props) {
        super(props);
         this.state = {
            user_details:[],
            password:'',
            old_password:'',
            confirm_password:[],
            local_data:[],
           
         }
        }
    componentDidMount(){
        //console.log('user ',v);
     
        this.getData('user_arr');
     
         }
         getData = async (key) => {
            
             console.log('local '+key)
             try {
               const value = await AsyncStorage.getItem(key);
     
     //          console.log('local '+value)
               
                //  console.log('array ',arrayData.email);
               if(value !== null) {
                
                 const arrayData = JSON.parse(value);

                 console.log(arrayData)
                 this.setState({local_data:arrayData})
                //this.ProfileDetail(arrayData.user_id)       
               }
             } catch(e) {
               // error reading value
             }
           }

    Change_Pass(){

        let {old_password, password,confirm_password } = this.state;
    //password===================
    if (old_password.length <= 0) {
        msgProvider.toast(Lang_chg.emptyPassword[config.language], 'center')
        return false
    }

if (password.length <= 0) {
    msgProvider.toast(Lang_chg.emptyPassword[config.language], 'center')
    return false
}
if (password.length <= 5) {
    msgProvider.toast(Lang_chg.PasswordMinLength[config.language], 'center')
    return false
}
if (password.length > 16) {
    msgProvider.toast(Lang_chg.PasswordMaxLength[config.language], 'center')
    return false
}
//cpassword===================
if (confirm_password.length <= 0) {
    msgProvider.toast(Lang_chg.emptyConfirmPWD[config.language], 'center')
    return false
}
if (confirm_password.length <= 5) {
    msgProvider.toast(Lang_chg.ConfirmPWDMinLength[config.language], 'center')
    return false
}
if (confirm_password.length > 16) {
    msgProvider.toast(Lang_chg.ConfirmPWDMaxLength[config.language], 'center')
    return false
}
if (confirm_password !== password) {
    msgProvider.toast(Lang_chg.ConfirmPWDMatch[config.language], 'center')
    return false
}

  var data = new FormData();

  data.append('user_id_post', this.state.local_data.user_id)
 // data.append('email', email)
  data.append('password_old', old_password)
  data.append('password_new', confirm_password)



  let url = config.baseURL + "change_password.php";
  apifuntion.postApi(url,data).then((obj) => {
   // console.log(obj)
    //this.setState({ loading: false });
    return obj.json();
     }).then((obj) => {

    console.log(obj);

      if(obj.success=='true'){

        msgProvider.toast(obj.msg[config.language], 'center')

        this.props.navigation.navigate('Settings');

      }else{
        msgProvider.toast(obj.msg[config.language], 'center')
      }

     }).catch((error) => {
        console.log("-------- error ------- " + error);
        this.setState({ loading: false });
    });
}

  render(){
    const user = this.context
    console.log('context in home', user);
    return(
        <View style={{flex:1,backgroundColor:Colors.white}}>
            <Header backBtn={true} name= {user.value == 1 ? Lang_chg.change_language_txt[1] : Lang_chg.change_language_txt[0]}/>
            <View style={sb.SEC2}>
                <View style={{marginTop:30,paddingHorizontal:20 , alignItems:'flex-start'}}>
                <Input
                 placeholder={user.value == 1 ? Lang_chg.old_pass_txt[1] : Lang_chg.old_pass_txt[0]} 
                 containerStyle={sb.Input}
                 inputContainerStyle={sb.Input}
                 selectionColor={'green'}
               //  secureTextEntry={true} 
                //  placeholderTextColor={Colors.inputFieldEditProfile}
                 inputStyle={{color:Colors.inputFieldEditProfile}}
                 placeholderTextColor={Colors.gray}
                  viewPass
                  password
              //   caretHidden
                //  borderless
                 style={{
                     borderWidth:0,
                     borderBottomWidth:1
                 }}
                 iconColor={Colors.gray}
                 onChangeText={(txt) => { this.setState({ old_password: txt }) }}
                 textAlign={user.value == 1 ? "right" : "left"}

                 />
                <Input
                 placeholder={user.value == 1 ? Lang_chg.new_pass_txt[1] : Lang_chg.new_pass_txt[0]} 
               //  secureTextEntry={true} 
                 placeholderTextColor={Colors.gray}
                 viewPass
                 password
                // caretHidden
                //  borderless
                 style={{
                     borderWidth:0,
                     borderBottomWidth:1
                 }}
                 iconColor={Colors.gray}
                 onChangeText={(txt) => { this.setState({ password: txt }) }}
                 textAlign={user.value == 1 ? "right" : "left"}
               
                 />
                <Input
                 placeholder={user.value == 1 ? Lang_chg.c_pass_txt[1] : Lang_chg.c_pass_txt[0]} 
                // secureTextEntry={true} 
                 placeholderTextColor={Colors.gray}
                 viewPass
                 password
                // caretHidden
                //  borderless
                 style={{
                     borderWidth:0,
                     borderBottomWidth:1,

                 }}
                 textAlign={user.value == 1 ? "right" : "left"}
                 iconColor={Colors.gray}

                 onChangeText={(txt) => { this.setState({ confirm_password: txt }) }}
               
                 />
         </View>
            </View>
            <View>
                <TouchableOpacity style={sb.btn1} onPress={()=>this.Change_Pass()}>
                    <Text style={sb.btn1Text}>
                    {user.value == 1 ? Lang_chg.txt_Submit[1] : Lang_chg.txt_Submit[0]} 
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
                }
}
const sb =StyleSheet.create({
    SEC2:{
        backgroundColor:Colors.white,
        marginTop:-120,
        borderTopLeftRadius:25,
        borderTopEndRadius:25,
        flex:1
    },
    btn1:{
        height:48,
        width:"85%",
        backgroundColor:Colors.orange,
        alignSelf:"center",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:12,
        marginVertical:10,
        elevation:5,
        position:"absolute",
        bottom:10
        
    },
    btn1Text:{
        fontSize:20,
        fontFamily:FontFamily.semi_bold,
        color:Colors.white
    }
    ,
    Input:{
        borderBottomColor:Colors.inputFieldEditProfile,
        marginTop:-10
    },
})

