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


const MyWallet=()=>{
    return(
        <View style={{flex:1,backgroundColor:Colors.white}}>
            <Header
             backBtn={true}
             name="My Wallet"
             imgBack={true}
             headerHeight={300} />
             <View style={{
                 flexDirection:"row",
                 position:"absolute",
                 width:"100%",
                 justifyContent:"space-around",
                 top:170
                 }}>
                 <View style={{alignItems:"center"}}>
                     <Text style={{fontFamily:FontFamily.bold,fontSize:30,color:Colors.white}}>
                     KWD 345
                     </Text>
                     <Text style={{fontFamily:FontFamily.default,fontSize:30,color:Colors.white}}>
                     Total Amount
                     </Text>
                 </View>
                 {/* <View style={{alignItems:"center"}}>
                     <Text style={{fontFamily:FontFamily.bold,fontSize:17,color:Colors.white}}>
                     KWD 345
                     </Text>
                     <Text style={{fontFamily:FontFamily.default,fontSize:17,color:Colors.white}}>
                     Pending Amount
                     </Text>
                 </View> */}
             </View>
             {/*  */}
             <View style={sb.SEC2}>
                 <View style={{marginTop:30}}>
                     <Card containerStyle={{borderRadius:12,elevation:3}}>
                         <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                             <View style={{alignSelf:"flex-start"}}>
                                 <Text style={{fontSize:14,fontFamily:FontFamily.semi_bold}}>#95790767896890</Text>
                                 <Text style={{fontSize:10,fontFamily:FontFamily.default,color:"rgba(153, 153, 153, 1)"}}>10AM, 10-Aug-2021</Text>
                             </View>
                             <View style={{alignSelf:"flex-end"}}>
                                 <Text style={{textAlign:"right",fontFamily:FontFamily.default,fontSize:10,color:"rgba(153, 153, 153, 1)"}}>5m ago</Text>
                                 <Text style={{fontSize:16,fontFamily:FontFamily.semi_bold,color:Colors.orange}}>KWD 1000</Text>
                             </View>
                         </View>
                     </Card>
                     <Card containerStyle={{borderRadius:12,elevation:3}}>
                         <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                             <View style={{alignSelf:"flex-start"}}>
                                 <Text style={{fontSize:14,fontFamily:FontFamily.semi_bold}}>#95790767896890</Text>
                                 <Text style={{fontSize:10,fontFamily:FontFamily.default,color:"rgba(153, 153, 153, 1)"}}>10AM, 10-Aug-2021</Text>
                             </View>
                             <View style={{alignSelf:"flex-end"}}>
                                 <Text style={{textAlign:"right",fontFamily:FontFamily.default,fontSize:10,color:"rgba(153, 153, 153, 1)"}}>5m ago</Text>
                                 <Text style={{fontSize:16,fontFamily:FontFamily.semi_bold,color:Colors.orange}}>KWD 454</Text>
                             </View>
                         </View>
                     </Card>
                     <Card containerStyle={{borderRadius:12,elevation:3}}>
                         <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                             <View style={{alignSelf:"flex-start"}}>
                                 <Text style={{fontSize:14,fontFamily:FontFamily.semi_bold}}>#95790767896890</Text>
                                 <Text style={{fontSize:10,fontFamily:FontFamily.default,color:"rgba(153, 153, 153, 1)"}}>10AM, 10-Aug-2021</Text>
                             </View>
                             <View style={{alignSelf:"flex-end"}}>
                                 <Text style={{textAlign:"right",fontFamily:FontFamily.default,fontSize:10,color:"rgba(153, 153, 153, 1)"}}>5m ago</Text>
                                 <Text style={{fontSize:16,fontFamily:FontFamily.semi_bold,color:Colors.orange}}>KWD 327</Text>
                             </View>
                         </View>
                     </Card>
                     <Card containerStyle={{borderRadius:12,elevation:3}}>
                         <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                             <View style={{alignSelf:"flex-start"}}>
                                 <Text style={{fontSize:14,fontFamily:FontFamily.semi_bold}}>#95790767896890</Text>
                                 <Text style={{fontSize:10,fontFamily:FontFamily.default,color:"rgba(153, 153, 153, 1)"}}>10AM, 10-Aug-2021</Text>
                             </View>
                             <View style={{alignSelf:"flex-end"}}>
                                 <Text style={{textAlign:"right",fontFamily:FontFamily.default,fontSize:10,color:"rgba(153, 153, 153, 1)"}}>5m ago</Text>
                                 <Text style={{fontSize:16,fontFamily:FontFamily.semi_bold,color:Colors.orange}}>KWD 100</Text>
                             </View>
                         </View>
                     </Card>
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

export default MyWallet;