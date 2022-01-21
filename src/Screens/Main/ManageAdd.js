import React, { useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    FlatList,
    ActivityIndicator
} from 'react-native';
import {
    Icon,
    Input,
    Card,
    AirbnbRating,
    Overlay,
    Image
} from 'react-native-elements';
import { color } from 'react-native-elements/dist/helpers';
import Header from '../../Components/Header';
import { back_img3, boat_img1, Colors, FontFamily, Sizes } from '../../Constants/Constants';
import Ad from '../../Data/Ad';


const ManageAdd=()=>{
  const [visible, setVisible] = useState(false);
  const [Data,setData]=useState([])
    const toggleOverlay = ({item}) => {
      setVisible(!visible);
      setData(item)
    };
    console.log(Data);
  return(
    <View style={{backgroundColor:Colors.white,flex:1}}>
      <Header
       name="Manage Advertisement"
       searchBtn={true}
       imgBack={true}
       />
       {/* Buttons */}
       <View style={s.btn_1}>
          <TouchableOpacity
          style={[s.btn1]}
          // onPress={()=>OutgoingBtn()}
          activeOpacity={0.8}
          >
              <Text style={[s.btn1Text]}>
                  Add Advertisement
              </Text>
          </TouchableOpacity>
      </View>
      {/* View */}
      <View style={s.SEC2}>
          <View>
            <FlatList
            data={Ad}
            showsVerticalScrollIndicator={false}
            renderItem={({item})=>{
              return(
                <View style={{padding:5}}>
                  <Card containerStyle={{padding:0,borderRadius:15,paddingHorizontal:0,margin:7.5,marginHorizontal:10,elevation:5}}>
                  <ImageBackground
                   style={s.ImageBackground}
                   imageStyle={s.imgStyle}
                   source={{uri:item.img}}
                   >
                     {/* Discount */}
                     <View style={[{
                       justifyContent:'center'
                       },s.trapezoid_discount]}>
                       <Text style={{
                         position:"absolute",
                         fontFamily:FontFamily.semi_bold,
                         fontSize:11,
                         alignSelf:"center",
                         color:Colors.white
                         }}>
                         {item.discount} OFF
                       </Text>
                     </View>
                     {/* Three dots */}
                     <TouchableOpacity style={{position:"absolute",right:10,top:10}} onPress={()=>toggleOverlay({item})}>
                       <Icon name="dots-three-vertical" type="entypo" color={Colors.orange} />
                     </TouchableOpacity>
                     {/* Price */}
                     <View
                      style={[{
                       height:40,
                      //  width:97,
                       backgroundColor:Colors.white,
                       flexDirection:"row",
                       alignItems:"center",
                       justifyContent:"space-around",
                       position:"absolute",
                       right:20,
                       bottom:-1,
                       paddingHorizontal:10,
                       borderTopLeftRadius:12,
                       borderTopRightRadius:12
                       }]}
          
                       >
                       <Text style={s.place}>
                          KWD {item.price}
                       </Text>
                     </View>
                  </ImageBackground>
                  {/*  */}
                  <View style={s.SEC3}>
                    <View style={{}}>
                      <Text style={s.title}>
                        {item.name}
                      </Text>
                      <View style={{flexDirection:"row",alignItems:"center",marginTop:5}}>
                        <Image style={{
                          height:40,
                          width:40,
                          borderRadius:20,
                          resizeMode:"cover",
                          }} 
                          source={{uri:'https://source.unsplash.com/400x400/?face'}}
                          PlaceholderContent={<ActivityIndicator size={30} color={Colors.orange} style={{alignSelf:"center"}} />} 
                          />
                        <View style={{marginLeft:5}}>
                          <Text style={{color:"rgba(51, 51, 51, 1)",fontSize:14,fontFamily:FontFamily.default}}>{item.type}</Text>
                          <AirbnbRating 
                           showRating={false}
                           size={12}
                           isDisabled
                           defaultRating={4}
                           starContainerStyle={{alignSelf:"flex-start"}}
                            />
                        </View>
                      </View>
                    </View>
                    <View>
                      <Text style={{color:"rgba(51, 51, 51, 1)",fontSize:12,fontFamily:FontFamily.default}}>
                        Destination
                      </Text>
                      <View style={{flexDirection:'row',alignItems:"center",alignSelf:'flex-end'}}>
                      <Icon name="person" size={14} />  
                      <Text style={{color:"rgba(51, 51, 51, 1)",fontSize:10,fontFamily:FontFamily.default}}>10 Person</Text>
                      </View>
                    </View>
                  </View>
                  </Card>
              </View>
              )
            }}
            keyExtractor={(i,ind)=>ind}
              style={{
                  marginTop:30
              }}
              contentInsetAdjustmentBehavior="automatic"
              contentContainerStyle={{ 
                   paddingBottom: 10,
                //    height:"100%"
                }}
            />
            
          </View>
      </View>
      {/* Overlay */}
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{borderRadius:20}} supportedOrientations statusBarTranslucent>
      <View style={{padding:10,width:Sizes.width*0.8}}>
        <TouchableOpacity><Text style={{fontFamily:FontFamily.semi_bold,fontSize:16,lineHeight:39,color:"rgba(0, 0, 0, 0.55)"}}>View</Text></TouchableOpacity>
        <View style={{width:"100%",borderWidth:0.5,marginTop:5,borderColor:"rgba(0, 0, 0, 0.55)",backgroundColor:"rgba(0, 0, 0, 0.55)"}} />
        <TouchableOpacity><Text style={{fontFamily:FontFamily.semi_bold,fontSize:16,lineHeight:39,color:"rgba(0, 0, 0, 0.55)"}}>Edit</Text></TouchableOpacity>
        <View style={{width:"100%",borderWidth:0.5,marginTop:5,borderColor:"rgba(0, 0, 0, 0.55)",backgroundColor:"rgba(0, 0, 0, 0.55)"}} />
        <TouchableOpacity><Text style={{fontFamily:FontFamily.semi_bold,fontSize:16,lineHeight:39,color:"rgba(0, 0, 0, 0.55)"}}>Delete</Text></TouchableOpacity>
        <View style={{width:"100%",borderWidth:0.5,marginTop:5,borderColor:"rgba(0, 0, 0, 0.55)",backgroundColor:"rgba(0, 0, 0, 0.55)"}} />
        <TouchableOpacity onPress={()=>toggleOverlay({item:undefined})}><Text style={{fontFamily:FontFamily.semi_bold,fontSize:16,lineHeight:39,color:"rgba(0, 0, 0, 0.55)"}}>Back</Text></TouchableOpacity>
      </View>
      </Overlay>
    </View>
  )
}
const s=StyleSheet.create({
  btn1:{
    height:35,
    width:240,
    alignSelf:"center",
    alignItems:"center",
    justifyContent:"center",
    borderRadius:7,
    marginBottom:20,
    elevation:5,
    backgroundColor:Colors.orange
},
  btn1Text:{
    fontSize:12,
    fontFamily:FontFamily.semi_bold,
    color:Colors.white
  },
  btn_1:{
      flexDirection:"row",
      justifyContent:"space-around",
      position:"absolute",
      alignSelf:"center",
      top:100
  },
  SEC2:{
    backgroundColor:Colors.white,
    marginTop:-40,
    borderTopLeftRadius:25,
    borderTopEndRadius:25,
    flex:1
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
})

export default ManageAdd;