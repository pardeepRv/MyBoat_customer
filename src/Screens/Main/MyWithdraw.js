import React, { useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Image
} from 'react-native';
import {
    Icon,
    Input,
    Card
} from 'react-native-elements';
import Header from '../../Components/Header';
import { back_img3, boat_img1, Colors, FontFamily, Sizes } from '../../Constants/Constants';


const MyWithdraw=()=>{
    return(
        <View style={{flex:1,backgroundColor:Colors.white}}>
            <Header
             backBtn={true}
             name="My Withdraw"
             imgBack={true}
             headerHeight={300} />
             {/* btn */}
            <View style={{
                 flexDirection:"row",
                 position:"absolute",
                 width:"100%",
                 justifyContent:"space-around",
                 top:170
                 }}>
                 <View style={{alignItems:"center"}}>
                     <Text style={{fontFamily:FontFamily.bold,fontSize:17,color:Colors.white}}>
                     KWD 345
                     </Text>
                     <Text style={{fontFamily:FontFamily.default,fontSize:17,color:Colors.white}}>
                     Total Amount
                     </Text>
                 </View>
                 <View style={{alignItems:"center"}}>
                     <Text style={{fontFamily:FontFamily.bold,fontSize:17,color:Colors.white}}>
                     KWD 345
                     </Text>
                     <Text style={{fontFamily:FontFamily.default,fontSize:17,color:Colors.white}}>
                     Pending Amount
                     </Text>
                 </View>
             </View>
             {/*  */}
             <View style={sb.SEC2}>
                 <View style={{marginTop:30}}>
                     <ScrollView>
                     <Card containerStyle={{borderRadius:12,elevation:3}}>
                         <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                             <View style={{width:"70%"}}>
                                 <Text style={{fontSize:14,fontFamily:FontFamily.semi_bold}}>#95790767896890</Text>
                                 <Text style={{fontSize:10,fontFamily:FontFamily.default,color:"rgba(153, 153, 153, 1)"}}>10AM, 10-Aug-2021</Text>
                                 <Text style={{fontSize:14,fontFamily:FontFamily.semi_bold}}>Name</Text>
                                 <Text style={{fontSize:10,fontFamily:FontFamily.default,color:"rgba(153, 153, 153, 1)"}} >
                                 Ac. No.: 157552620120512 {"\n"}
                                 Ifsc : SBIN753420 {"\n"}
                                 Hello I am sending money.Hello I am sending money.Hello I am sending money.
                                 </Text>
                             </View>
                             <View style={{marginLeft:-10}}>
                                 {/* <Text style={{textAlign:"right",fontFamily:FontFamily.default,fontSize:10,color:"rgba(153, 153, 153, 1)"}}>5m ago</Text> */}
                                 <Text style={{fontSize:16,fontFamily:FontFamily.semi_bold,color:Colors.orange,lineHeight:40}}>KWD 1000</Text>
                                 <Text style={{textAlign:"right",fontFamily:FontFamily.semi_bold,fontSize:13,color:"rgba(235, 219, 78, 1)"}}>Pending</Text>
                             </View>
                         </View>
                     </Card>
                     <Card containerStyle={{borderRadius:12,elevation:3}}>
                         <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                             <View style={{}}>
                                 <Text style={{fontSize:14,fontFamily:FontFamily.semi_bold}}>#95790767896890</Text>
                                 <Text style={{fontSize:10,fontFamily:FontFamily.default,color:"rgba(153, 153, 153, 1)"}}>10AM, 10-Aug-2021</Text>
                                 <Text style={{fontSize:14,fontFamily:FontFamily.semi_bold}}>Name</Text>
                                 <Text style={{fontSize:10,fontFamily:FontFamily.default,color:"rgba(153, 153, 153, 1)"}} >
                                 Ac. No.: 157552620120512
                                 </Text>
                                 <Text style={{fontSize:10,fontFamily:FontFamily.default,color:"rgba(153, 153, 153, 1)"}} >
                                 Ifsc : SBIN753420
                                 </Text>
                                 <Text style={{fontSize:10,fontFamily:FontFamily.default,color:"rgba(153, 153, 153, 1)"}} >
                                 Hello I am sending money.
                                </Text>
                             </View>
                             <View style={{alignSelf:"center",justifyContent:"flex-end"}}>
                                 {/* <Text style={{textAlign:"right",fontFamily:FontFamily.default,fontSize:10,color:"rgba(153, 153, 153, 1)"}}>5m ago</Text> */}
                                 <Text style={{fontSize:16,fontFamily:FontFamily.semi_bold,color:Colors.orange,lineHeight:40}}>KWD 100000000</Text>
                                 <Text style={{textAlign:"right",fontFamily:FontFamily.semi_bold,fontSize:13,color:"rgba(255, 0, 0, 1)"}}>Cancel</Text>
                             </View>
                         </View>
                     </Card>
                     <Card containerStyle={{borderRadius:12,elevation:3}}>
                         <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                             <View style={{}}>
                                 <Text style={{fontSize:14,fontFamily:FontFamily.semi_bold}}>#95790767896890</Text>
                                 <Text style={{fontSize:10,fontFamily:FontFamily.default,color:"rgba(153, 153, 153, 1)"}}>10AM, 10-Aug-2021</Text>
                                 <Text style={{fontSize:14,fontFamily:FontFamily.semi_bold}}>Name</Text>
                                 <Text style={{fontSize:10,fontFamily:FontFamily.default,color:"rgba(153, 153, 153, 1)"}} >
                                 Ac. No.: 157552620120512 {"\n"}
                                 Ifsc : SBIN753420 {"\n"}
                                 Hello I am sending money.
                                 </Text>
                             </View>
                             <View style={{marginLeft:-10}}>
                                 {/* <Text style={{textAlign:"right",fontFamily:FontFamily.default,fontSize:10,color:"rgba(153, 153, 153, 1)"}}>5m ago</Text> */}
                                 <Text style={{fontSize:16,fontFamily:FontFamily.semi_bold,color:Colors.orange,lineHeight:40}}>KWD 1000</Text>
                                 <Text style={{textAlign:"right",fontFamily:FontFamily.semi_bold,fontSize:13,color:"rgba(52, 168, 83, 1)"}}>Completed</Text>
                             </View>
                         </View>
                     </Card>
                     <Card containerStyle={{borderRadius:12,elevation:3}}>
                         <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                             <View style={{}}>
                                 <Text style={{fontSize:14,fontFamily:FontFamily.semi_bold}}>#95790767896890</Text>
                                 <Text style={{fontSize:10,fontFamily:FontFamily.default,color:"rgba(153, 153, 153, 1)"}}>10AM, 10-Aug-2021</Text>
                                 <Text style={{fontSize:14,fontFamily:FontFamily.semi_bold}}>Name</Text>
                                 <Text style={{fontSize:10,fontFamily:FontFamily.default,color:"rgba(153, 153, 153, 1)"}} >
                                 Ac. No.: 157552620120512 {"\n"}
                                 Ifsc : SBIN753420 {"\n"}
                                 Hello I am sending money.
                                 </Text>
                             </View>
                             <View style={{marginLeft:-10}}>
                                 {/* <Text style={{textAlign:"right",fontFamily:FontFamily.default,fontSize:10,color:"rgba(153, 153, 153, 1)"}}>5m ago</Text> */}
                                 <Text style={{fontSize:16,fontFamily:FontFamily.semi_bold,color:Colors.orange,lineHeight:40}}>KWD 1000</Text>
                                 <Text style={{textAlign:"right",fontFamily:FontFamily.semi_bold,fontSize:13,color:"rgba(52, 168, 83, 1)"}}>Completed</Text>
                             </View>
                         </View>
                     </Card>
                     <Card containerStyle={{borderRadius:12,elevation:3,marginBottom:15}}>
                         <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                             <View style={{}}>
                                 <Text style={{fontSize:14,fontFamily:FontFamily.semi_bold}}>#95790767896890</Text>
                                 <Text style={{fontSize:10,fontFamily:FontFamily.default,color:"rgba(153, 153, 153, 1)"}}>10AM, 10-Aug-2021</Text>
                                 <Text style={{fontSize:14,fontFamily:FontFamily.semi_bold}}>Name</Text>
                                 <Text style={{fontSize:10,fontFamily:FontFamily.default,color:"rgba(153, 153, 153, 1)"}} >
                                 Ac. No.: 157552620120512 {"\n"}
                                 Ifsc : SBIN753420 {"\n"}
                                 Hello I am sending money.
                                 </Text>
                             </View>
                             <View style={{marginLeft:-10}}>
                                 {/* <Text style={{textAlign:"right",fontFamily:FontFamily.default,fontSize:10,color:"rgba(153, 153, 153, 1)"}}>5m ago</Text> */}
                                 <Text style={{fontSize:16,fontFamily:FontFamily.semi_bold,color:Colors.orange,lineHeight:40}}>KWD 1000</Text>
                                 <Text style={{textAlign:"right",fontFamily:FontFamily.semi_bold,fontSize:13,color:"rgba(52, 168, 83, 1)"}}>Completed</Text>
                             </View>
                         </View>
                     </Card>
                     </ScrollView>
                 </View>
             </View>
        </View>
    )
}
const sb=StyleSheet.create({
    SEC2:{
        backgroundColor:Colors.white,
        marginTop:-30,
        borderTopLeftRadius:25,
        borderTopEndRadius:25,
        flex:1,
        height:100
      }
})

export default MyWithdraw;