import React from 'react';
import { 
    Text,
    View,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { 
    Icon,
    Input
} from 'react-native-elements';
import Header from '../../Components/Header';
import { back_img, Colors, FontFamily, Sizes } from '../../Constants/Constants';

const AddBoat = () => {
    return(
        <View style={{flex:1,backgroundColor:Colors.white}}>
            <Header
             imgBack={true}
             name="Add Boat"
             backBtn={true}
             />
             <View style={s.SEC2}>
                 <ScrollView>
                <View style={{marginTop:5}}>
                <Input
                    placeholder="Boat Name"
                    containerStyle={s.Input}
                    inputContainerStyle={s.Input}
                    placeholderTextColor={Colors.black}
                    />
                    {/* ----------------------- */}
                <Input
                    placeholder="Boat Number"
                    containerStyle={s.Input1}
                    inputContainerStyle={s.Input1}
                    placeholderTextColor={Colors.black}
                    />
                <Input
                    placeholder="Boat Brand"
                    containerStyle={s.Input1}
                    inputContainerStyle={s.Input1}
                    placeholderTextColor={Colors.black}
                    />
                <Input
                    placeholder="Boat Registration Number"
                    containerStyle={s.Input1}
                    inputContainerStyle={s.Input1}
                    placeholderTextColor={Colors.black}
                    />
                <Input
                    placeholder="Boat Year"
                    containerStyle={s.Input1}
                    inputContainerStyle={s.Input1}
                    placeholderTextColor={Colors.black}
                    />
                <Input
                    placeholder="Boat length"
                    containerStyle={s.Input1}
                    inputContainerStyle={s.Input1}
                    placeholderTextColor={Colors.black}
                    />
                <Input
                    placeholder="Boat Capacity"
                    containerStyle={s.Input1}
                    inputContainerStyle={s.Input1}
                    placeholderTextColor={Colors.black}
                    />
                <Input
                    placeholder="Cabins"
                    containerStyle={s.Input1}
                    inputContainerStyle={s.Input1}
                    placeholderTextColor={Colors.black}
                    />
                <Input
                    placeholder="Toilet"
                    containerStyle={s.Input1}
                    inputContainerStyle={s.Input1}
                    placeholderTextColor={Colors.black}
                    />
                </View>
                <View style={{marginBottom:10}}>
                    <TouchableOpacity style={s.btn1}>
                        <Text style={s.btn1Text}>
                            Submit
                        </Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>
             </View>
        </View>
    )
}
const s= StyleSheet.create({
  SEC2:{
      backgroundColor:Colors.white,
      marginTop:-80,
      borderTopLeftRadius:25,
      borderTopEndRadius:25,
      flex:1
  },
  Input1:{
    borderBottomColor:Colors.black,
    marginTop:-7
},
  Input:{
    borderBottomColor:Colors.black,
    marginTop:-0
},
  btn1:{
    height:48,
    width:"95%",
    backgroundColor:Colors.orange,
    alignSelf:"center",
    alignItems:"center",
    justifyContent:"center",
    borderRadius:12,
    marginBottom:20,
    elevation:5
},
  btn1Text:{
    fontSize:20,
    fontFamily:FontFamily.semi_bold,
    color:Colors.white
}
})
export default AddBoat;