import React, { Component } from 'react'
import { Text, StatusBar, View, StyleSheet,SafeAreaView, Image, TouchableOpacity, BackHandler } from 'react-native'
//import color1 from './Colors'
//import styles from './Style'
import { Lang_chg } from '../../Provider/Language_provider'
import { config } from '../../Provider/configProvider';
import { msgProvider, msgTitle, msgText } from '../../Provider/messageProvider';
import { back_img3, boat_img1, Colors, FontFamily, Sizes } from '../../Constants/Constants';

export default class Success_booking extends Component {
    _didFocusSubscription;
    _willBlurSubscription;
    constructor(props) {
        super(props)
        this.state = {
            booking_no: this.props.route.params.booking_no,
            booking_date: this.props.route.params.booking_date,
            isConnected: true,
            loading: true,
        }
        this._didFocusSubscription = props.navigation.addListener('focus', payload =>
            BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
        );
    }

    componentDidMount() {
        this._willBlurSubscription = this.props.navigation.addListener('blur', payload =>
            BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
        );
    }
    
    handleBackPress = () => {
        return true;
    };
    
    render() {
        return (
            <View style={{ flex: 1, height: '100%', backgroundColor: '#ffffff' }}>
                <SafeAreaView style={{ flex: 0 }} />
                <StatusBar backgroundColor={Colors.white} barStyle='default' hidden={false} translucent={false}
                    networkActivityIndicatorVisible={true} />
                <View style={s.succes_view}>
                    {/* <Image resizeMode="contain" style={s.succes_img} source={require('./icons/succes.png')}></Image> */}
                    <Text style={s.succes_txt}>Success</Text>
                    <Text style={s.succes_boking}>{Lang_chg.text_seccess_msg[config.language]}</Text>
                    <Text style={s.succes_id}>{Lang_chg.text_Booking_id[config.language]}: <Text style={s.secce_mobile}>{this.state.booking_no}</Text></Text>
                    <Text style={s.succes_date}>{this.state.booking_date}</Text>
                    <TouchableOpacity style={s.succes_done} activeOpacity={0.9} onPress={() => { this.props.navigation.navigate('Home') }}>
                        <Text style={s.succes_deon_txt}>{Lang_chg.text_Countibue[config.language]}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}



const s= StyleSheet.create({
    SEC2:{
        backgroundColor:Colors.white,
        borderTopLeftRadius:25,
        borderTopEndRadius:25,
        marginTop:-40,
      //   marginBottom:40,
        flex:1
    },
    borders:{
      borderBottomColor:'#000',
      borderBottomWidth:1,
      margin:20
      //borderColor:'#000',
      //borderWidth:1
    },
    Btn1:{
      height:48,
      width:175,
      backgroundColor:Colors.orange,
      margin:5,
      alignItems:"center",
      justifyContent:"center",
      borderRadius:30,
      elevation:3,
      overflow: 'hidden',
      shadowColor: '#fff',
      shadowRadius: 10,
      shadowOpacity: 1,
  },
  Btn1Text:{
      fontSize:20,
      fontFamily:FontFamily.semi_bold,
      color:Colors.white
  },
    container: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start' // if you want to fill rows left to right
    },
    item: {
      width: '50%' // is 50% of container width
    },
    disc:{
     marginLeft:20,
     fontSize:18,
     fontWeight:'bold'
    },
    detail:{
  marginLeft:20
    },
    container:{  
     // flex: 1,  
      marginLeft:'15%',
      flexWrap: "wrap",
      flexDirection: 'row',// set elements horizontally, try column.  
  },  
  datePickerStyle:{
    width:'100%',
},
    btn1:{
      height:90,
      width:60,
      alignSelf:"center",
      alignItems:"center",
      justifyContent:"center",
      borderRadius:7,
      elevation:5,
      margin:7
  },
    btn1Text:{
      fontSize:10,
      fontFamily:FontFamily.semi_bold,
    },
    btn_1:{
        flexDirection:"row",
        justifyContent:"space-around",
    },
    Card:{
        borderRadius:20,
        elevation:3,
        marginHorizontal:10,
        marginTop:0,
        marginBottom:15
    },
    name:{
        fontFamily:FontFamily.semi_bold,
        fontSize:16,
        marginBottom:3
    },
    type:{
        fontFamily:FontFamily.default,
        fontSize:12,
        marginBottom:3,
      //   opacity:0.5
      color:Colors.gray1
    },
    id:{
        fontFamily:FontFamily.semi_bold,
        fontSize:13,
        marginBottom:3
    },
    price:{
        marginBottom:10,
        fontFamily:FontFamily.semi_bold,
        fontSize:15,
        color:Colors.price,
        textAlign:"right"
    },
    status:{
        color:Colors.orange,
        fontFamily:FontFamily.default,
        fontWeight:"500",
        fontSize:14,
        textAlign:"right"
    },
    ImageBackground:{
      height:215,
      width:"100%",
      borderRadius:15,
      alignSelf:"center",
      // marginHorizontal:10,
      elevation:0
    },
    imgStyle:{
      borderRadius:15,
      height:215,
      width:"100%",
      alignSelf:"center"
    },
    SEC3:{
      flexDirection:"row",
      justifyContent:"space-between",
      padding:10,
      paddingHorizontal:20,
      alignItems:'center'
    },
    title:{
      fontFamily:FontFamily.semi_bold,
      fontSize:18,
      color:Colors.orange,
      // lineHeight:20
    },
    type:{
      fontFamily:FontFamily.default,
      fontSize:15,
      lineHeight:20,
      color:Colors.black1
    },
    no:{
      fontFamily:FontFamily.default,
      fontSize:12,
      lineHeight:20,
      color:Colors.black1
    },
    dis:{
      fontFamily:FontFamily.default,
      fontSize:13,
      color:Colors.black1
    },
    place:{
      fontFamily:FontFamily.default,
      fontSize:16,
      color:Colors.orange
    },
    trapezoid_discount: {
      width: 115,
      height: 0,
      borderBottomWidth: 25,
      borderBottomColor: Colors.orange,
      borderLeftWidth: 25,
      borderLeftColor: "transparent",
      borderRightWidth: 25,
      borderRightColor: "transparent",
      borderStyle: "solid",
      backgroundColor:'transparent',
      alignItems:"center",
      transform:[{rotate:"-45deg"}],
      marginTop:19.2,
      marginLeft:-26
    },

    booknow_header:{
        flexDirection: 'row',
        justifyContent:'space-between',
        paddingTop:10,
        paddingBottom:10,
        marginBottom:30,
    },

    earnig_title:{
        fontSize:20,
        fontFamily:"Ubuntu-Bold",
        fontWeight:'bold',
    },
    book_nod_calender:{
        width:'100%',
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center',
        borderColor:'#c2c2c2',
        paddingBottom:5,
        borderRadius:15,
    },
    datePickerStyle:{
        width:'100%',
    },
    chhoice_time:{
        width:'100%',
        borderWidth:1,
        borderColor:'#c2c2c2',
        borderRadius:15,
        paddingLeft:20,
        paddingRight:20,
        marginTop:20,
        height:50
    },
    chooice_time_input:{
        fontFamily:'Ubuntu-Bold',
        textAlign:'right',
        height:50
    },

    succes_img:{
        width:70,
        height:70,
        resizeMode:'contain',
    },
    succes_txt:{
        fontWeight:'bold',
        fontFamily:"Ubuntu-Bold",
        fontSize:18,
    },
    succes_boking:{
        fontSize:16,
        fontFamily:"Ubuntu-Medium",
        lineHeight:30,
    },
    secce_mobile:{
        fontSize:16,
        fontStyle:'italic',
    },
    
    succes_id:{
        fontSize:16,
        fontFamily:"Ubuntu-Regular",
    },
    succes_date:{
        fontSize:16,
        fontStyle:'italic',
        fontFamily:"Ubuntu-MediumItalic",
        color:'#3c3c3c',
    },
    succes_view:{
        alignItems:'center',
        flex:1,
        justifyContent:'center',
    },
    succes_done:{
        backgroundColor:'#01a8e7',
        paddingTop:15,
        paddingBottom:15,
        paddingLeft:30,
        paddingRight:30,
        borderRadius:10,
        marginTop:40,
    },
    
    succes_deon_txt:{
        textAlign:'center',
        fontWeight:'bold',
        fontFamily:"Ubuntu-Bold",
        fontSize:16,
        color:'#fff',
        letterSpacing:1,
    },
  })
