import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Image,
    TextInput,
    Keyboard
} from 'react-native';
import {
    Icon,
    Input,
    Card,
    AirbnbRating,
    Rating
} from 'react-native-elements';
import Header from '../../Components/Header';
import { back_img3, boat_img1, Colors, FontFamily, Sizes } from '../../Constants/Constants';
import { useNavigation } from '@react-navigation/core';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Caption } from 'react-native-paper';


const DetailsRatings = ({ route }) => {
    console.log('route :>> ', route);
    const [data, setData] = useState(route?.params?.item?.adver_arr)
    const [additionalNotes, setAdditionalNotes] = useState('');
    const [Captain, setCaptain] = useState(null);
    const [food, setfood] = useState(null);
    const [clean, setclean] = useState(null);
    const [hospitality, sethospitality] = useState(null);
    const [Equipment, setEquipments] = useState(null);
    const [Entertainment, setEntertainment] = useState(null);
    const [allrating, setallrating] = useState(null);




    const Navigator = useNavigation();

    const gotoBack = (id ) => {
        let rate = id / 6 ;
        console.log('rate :>> ', rate);
     setallrating(rate)  
     return
        Navigator.goBack();
    }
    useEffect(() => {
        console.log('data :>> ', data);

    }, []);

    const captainRatingCompleted = (rating) => {
        console.log("Rating is: captainRatingCompleted" + rating)
        setCaptain(rating);
    }
    const foodRatingCompleted = (rating) => {
        console.log("Rating is: captainRatingCompleted" + rating)
        setfood(rating);
    }

    const cleanRatingCompleted = (rating) => {
        console.log("Rating is: captainRatingCompleted" + rating)
        setclean(rating);
    }
    const entertainmentRatingCompleted = (rating) => {
        console.log("Rating is: captainRatingCompleted" + rating)
        setEntertainment(rating);
    }
    const equipmentsRatingCompleted = (rating) => {
        console.log("Rating is: captainRatingCompleted" + rating)
        setEquipments(rating);
    }
    const hospitalityRatingCompleted = (rating) => {
        console.log("Rating is: captainRatingCompleted" + rating)
        sethospitality(rating);
    }
    const ratingCompleted = (rating) => {
        console.log("Rating is: " + rating)
    }


    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <Header
                imgBack={true}
                backBtn={true} />
            <ScrollView style={{ flex: 1 }}>
                <KeyboardAwareScrollView
                    // extraScrollHeight={10}
                    nestedScrollEnabled
                    enableOnAndroid={true}
                    style={sb.subContainer}
                    contentContainerStyle={sb.subContentContainer}
                    keyboardShouldPersistTaps={'always'}
                    showsVerticalScrollIndicator={false}>
                    <View style={sb.SEC2}>
                        <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
                            {/*  */}
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                    <Image style={{ height: 40, width: 40 }} source={{ uri: `https://server3.rvtechnologies.in/My-Boat/app/app/webservice/images/${data.user_image}` }} />
                                    <Text style={{ marginLeft: 5, fontFamily: FontFamily.semi_bold, fontSize: 16 }}>{data.user_name}</Text>
                                </View>
                                <Text style={{ fontSize: 10, fontFamily: FontFamily.default, color: "#999" }}>10:30 PM</Text>
                            </View>
                            {/*  */}
                            <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}>
                                <Text style={{ fontFamily: FontFamily.semi_bold, fontSize: 12 }}>
                                    Total Ratings
                                </Text>
                                <AirbnbRating
                                    showRating={false}
                                    // value={allrating}
                                    size={14}
                                    count={5}
                                    defaultRating={allrating}
                                    isDisabled
                                    selectedColor="#FFCC39"
                                    starContainerStyle={{
                                        elevation: 5,
                                        // alignSelf:"flex-start"
                                        marginLeft: 15
                                    }} />
                            </View>
                            {/*  */}
                            <View style={sb.DIVIDER} />
                            {/*  */}
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: FontFamily.semi_bold, fontSize: 14 }}>Rating :</Text>
                                <View style={{ marginVertical: 10 }}>
                                    {/* Captain */}
                                    <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between", marginBottom: 5, paddingHorizontal: 40 }}>
                                        <Text style={{ fontSize: 13, fontFamily: FontFamily.semi_bold }}>
                                            Captain
                                        </Text>
                                        <Rating
                                            imageSize={20}
                                            // defaultRating={1}
                                            value={Captain}
                                            showRating={false}
                                            ratingCount={5}
                                            onFinishRating={captainRatingCompleted}
                                            style={{ paddingVertical: 10 }}
                                            startingValue={0}
                                        />
                                    </View>
                                    {/*Food */}
                                    <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between", marginBottom: 5, paddingHorizontal: 40 }}>
                                        <Text style={{ fontSize: 13, fontFamily: FontFamily.semi_bold }}>
                                            Food
                                        </Text>
                                        <Rating
                                            imageSize={20}
                                            value={food}
                                            showRating={false}
                                            ratingCount={5}
                                            onFinishRating={foodRatingCompleted}
                                            style={{ paddingVertical: 10 }}
                                            startingValue={0}

                                        // type='heart'
                                        />
                                    </View>
                                    {/* Clean */}
                                    <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between", marginBottom: 5, paddingHorizontal: 40 }}>
                                        <Text style={{ fontSize: 13, fontFamily: FontFamily.semi_bold }}>
                                            Clean
                                        </Text>
                                        <Rating
                                            imageSize={20}
                                            value={clean}
                                            showRating={false}
                                            ratingCount={5}
                                            onFinishRating={cleanRatingCompleted}
                                            // onStartRating={rateMe()}
                                            style={{ paddingVertical: 10 }}
                                            startingValue={0}

                                        // type='heart'
                                        />
                                    </View>
                                    {/* Hospitality */}
                                    <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between", marginBottom: 5, paddingHorizontal: 40 }}>
                                        <Text style={{ fontSize: 13, fontFamily: FontFamily.semi_bold }}>
                                            Hospitality
                                        </Text>
                                        <Rating
                                            imageSize={20}
                                            value={hospitality}
                                            showRating={false}
                                            ratingCount={5}
                                            onFinishRating={hospitalityRatingCompleted}
                                            // onStartRating={rateMe()}
                                            style={{ paddingVertical: 10 }}
                                            startingValue={0}
                                        // type='heart'
                                        />
                                    </View>
                                    {/* Equipment */}
                                    <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between", marginBottom: 5, paddingHorizontal: 40 }}>
                                        <Text style={{ fontSize: 13, fontFamily: FontFamily.semi_bold }}>
                                            Equipment
                                        </Text>
                                        <Rating
                                            imageSize={20}
                                            value={Equipment}
                                            showRating={false}
                                            ratingCount={5}
                                            onFinishRating={equipmentsRatingCompleted}
                                            // onStartRating={rateMe()}
                                            style={{ paddingVertical: 10 }}
                                            startingValue={0}

                                        // type='heart'
                                        />
                                    </View>
                                    {/* Entertainment */}
                                    <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between", marginBottom: 5, paddingHorizontal: 40 }}>
                                        <Text style={{ fontSize: 13, fontFamily: FontFamily.semi_bold }}>
                                            Entertainment
                                        </Text>
                                        <Rating
                                            imageSize={20}
                                            showRating={false}
                                            ratingCount={5}
                                            onFinishRating={entertainmentRatingCompleted}
                                            value={Entertainment}
                                            // onStartRating={rateMe()}
                                            style={{ paddingVertical: 10 }}
                                            startingValue={0}

                                        // type='heart'
                                        />

                                    </View>
                                    {/*  */}
                                </View>
                            </View>
                            {/*  */}
                            <View style={sb.DIVIDER} />
                            {/*  */}

                            <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: FontFamily.semi_bold, fontSize: 14 }}>Comment :</Text>
                                <View style={{ height: 150, paddingHorizontal: 20, marginTop: 6 }}>
                                    <TextInput
                                        placeholder="Add any additional notes you would like"
                                        autoCapitalize="sentences"

                                        style={{
                                            //   height:'80%',
                                            flex: 1,

                                            padding: 9,
                                            borderTopWidth: 1,
                                            fontSize: 16,
                                            // backgroundColor:'red',
                                            borderColor: 'lightgray',
                                            top: 5,
                                            paddingHorizontal: 10,
                                            fontFamily: FontFamily.default, fontSize: 15, lineHeight: 26, color: "#000000"
                                        }}
                                        returnKeyType="done"
                                        multiline={true}
                                        blurOnSubmit={true}
                                        onSubmitEditing={() => {
                                            Keyboard.dismiss();
                                        }}
                                        value={additionalNotes}
                                        onChangeText={text => setAdditionalNotes(text)}
                                    />
                                    {/* <Text style={{fontFamily:FontFamily.default,fontSize:10,lineHeight:16,color:"#999"}}>
                                Lorem Ipsum is simply dummy text of the printing. Lorem Ipsum is 
                                simply dummy text of the printing. Lorem Ipsum is simply dummy
                                text of the printing.{"\n"}
                                Lorem Ipsum is simply dummy text of the printing. Lorem Ipsum is 
                                simply dummy text of the printing. Lorem Ipsum is simply dummy
                                text of the printing.{"\n"}
                                Lorem Ipsum is simply dummy text of the printing. Lorem Ipsum is 
                                simply dummy text of the printing. Lorem Ipsum is simply dummy
                                text of the printing.
                             </Text> */}
                                </View>
                                {/*  */}
                                {/* btn */}

                            </View>
                        </View>

                        <Card containerStyle={[{}, sb.Btn1]}>
                            <TouchableOpacity onPress={() => gotoBack(food + Captain + clean + Equipment + Entertainment + hospitality)}>
                                <View>
                                    <Text style={{ fontSize: 20, fontFamily: FontFamily.semi_bold, color: Colors.orange }}>Post </Text>
                                </View>
                            </TouchableOpacity>
                        </Card>
                    </View>
                </KeyboardAwareScrollView>

            </ScrollView>
        </View>
    )
}
const sb = StyleSheet.create({
    SEC2: {
        backgroundColor: Colors.white,
        borderTopLeftRadius: 25,
        borderTopEndRadius: 25,
        // marginTop:-40,
        flex: 1
    },
    DIVIDER: {
        borderWidth: 0.5,
        borderColor: "rgba(0, 0, 0, 0.5)"
    },
    Btn1: {
        height: 48,
        width: "95%",
        backgroundColor: Colors.white,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        elevation: 5,
        alignSelf: "center",
        padding: 0,
        bottom: 10

    },
    subContainer: {
        // height: layout.size.height ,
        flex: 1,
        // backgroundColor:colors.secondry
    },
    subContentContainer: {
        paddingBottom: 12,
    },
})
export default DetailsRatings;