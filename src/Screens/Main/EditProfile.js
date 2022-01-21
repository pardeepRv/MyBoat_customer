import React, {useState, Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  Modal,
  I18nManager,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {Icon, Input, Card} from 'react-native-elements';
import {Colors, FontFamily, Sizes, default_profile} from '../../Constants/Constants';
import {useNavigation} from '@react-navigation/core';
import ActionSheet from 'react-native-actionsheet';
import Header from '../../Components/Header';
import AsyncStorage from '@react-native-community/async-storage';
import {config} from '../../Provider/configProvider';
import {msgProvider, msgTitle, msgText} from '../../Provider/messageProvider';
import {Lang_chg} from '../../Provider/Language_provider';
import {apifuntion} from '../../Provider/apiProvider';
import DatePicker from 'react-native-datepicker';
import {Picker} from '@react-native-community/picker';
import ImagePicker from 'react-native-image-crop-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';



export default class EditProfile extends Component {
  //  const [date, setDate] = useState(new Date());

  // const onChange = (event, selectedDate) => {
  // const currentDate = selectedDate || date;
  // setDate(currentDate);
  // };

  constructor(props) {
    super(props);
    this.state = {
      user_details: [],
      name: '',
      email: [],
      phone_number: '',
      password: [],
      confirm_password: [],
      date: '09-10-2020',
      address: '',
      dob: '',
      city_name: '',
      gender: '',
      city_arr: [],
      city: [],
      city_id:'',
      city_arr1: [],
      modalVisible: false,
      gender_selection: false,
      avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png',
      isShowDatePicker: false,
      about: '',
      imageObj: {},
      //template:[{'lang':'Eng'},{'lang':'Arb'}],
    };
  }

  componentDidMount() {
    //console.log('user ',v);

    this.getData('user_arr');
  }

  selectedValue(value) {
    console.log('change ' + value);
  }

  getData = async key => {
    console.log('local ' + key);
    try {
      const value = await AsyncStorage.getItem(key);

      //          console.log('local '+value)

      //  console.log('array ',arrayData.email);
      if (value !== null) {
        const arrayData = JSON.parse(value);

        console.log(arrayData);
        //this.setState({localData:arrayData})
        this.ProfileDetail(arrayData.user_id);
        this.GetCityList(arrayData.phone_code);
      }
    } catch (e) {
      // error reading value
    }
  };

  async GetCityList(phone_code) {
    console.log('user ', phone_code);

    let url = config.baseURL + 'city_list.php?country_code=' + phone_code;
    try {
      const response = await fetch(url);
      const json = await response.json();
      // console.log('citylist  ',json)

      if (json.success == 'true') {
        this.setState({city_arr: json.city_arr, city_arr1: json.city_arr});
        // this.setState({name:json.user_details.f_name})

        console.log('citylist ', this.state.city_arr);
      } else {
      }

      // console.log(this.state.img)
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({isLoading: false});
    }
  }

  async ProfileDetail(user_id) {
    console.log('user ', user_id);

    let url = config.baseURL + 'getUserDetails.php?user_id_post=' + user_id;
    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log('image   ', json.user_details?.image);

      if (json.success == 'true') {
        this.setState({
          user_details: json.user_details,
          name:
            json.user_details?.f_name != 'NA'
              ? json.user_details?.f_name
              : json.user_details?.name,
          about:
            json.user_details?.about != 'NA' ? json.user_details?.about : '',
          email: json.user_details?.email,
          address: json.user_details?.address ? json.user_details?.address : '',
          phone_number: json.user_details?.mobile,
          dob:  json.user_details?.dob?json.user_details?.dob:'',
          city: json.user_details?.city_name,
          city_name: json.user_details?.city_name[config.language],
          city_id:json.user_details?.city,
          avatar: json.user_details?.image && json.user_details?.image !== 'NA' ?config.image_url4+json.user_details?.image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png',
          gender: json.user_details?.gender==0?"Male":"Female",
        });

        console.log('image   ', this.state.avatar);
      } else {
      }

      // console.log(this.state.img)
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({isLoading: false});
    }
  }

  UpdateProfile() {
    //  this.setState({modalVisible:true})

    let {name, dob, gender, city_name, address, email, phone_number, about} =
      this.state;
    if (name.length <= 0) {
      msgProvider.toast(Lang_chg.MobileMaxLength[config.language], 'center');
      return false;
    }
    if (email.length <= 0) {
      msgProvider.toast(Lang_chg.emptyEmail[config.language], 'center');
      return false;
    }
    if (email.length > 50) {
      msgProvider.toast(Lang_chg.emailMaxLength[config.language], 'center');
      return false;
    }
    const reg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg.test(email) !== true) {
      msgProvider.toast(Lang_chg.validEmail[config.language], 'center');
      return false;
    }
    if (phone_number.length <= 0) {
      msgProvider.toast(Lang_chg.emptyMobile[config.language], 'center');
      return false;
    }
    if (phone_number.length < 8) {
      msgProvider.toast(Lang_chg.MobileMinLength[config.language], 'center');
      return false;
    }
    if (phone_number.length > 8) {
      msgProvider.toast(Lang_chg.MobileMaxLength[config.language], 'center');
      return false;
    }

    var data = new FormData();
    if(this.state.imageObj?.path){
    data.append('profile_pic', {
      uri: this.state.imageObj?.path,
      type: this.state.imageObj.mime
        ? this.state.imageObj.mime
        : this.state.imageObj?.type,
      name: new Date().getTime() + '.jpg', //imageObj.filename,//new Date().getTime() + "." + imageObj.uri.split(".")[imageObj.uri.split(".").length - 1]
    });
}
    data.append('user_id_post', this.state.user_details.user_id);
    data.append('user_type_post', 1);
    data.append('user_name', name);
    data.append('email', email);
    data.append('phone_number', phone_number);
    data.append('gender', gender=="Male"?0:1);
    data.append('dob', dob);
    data.append('city', this.state.city_id);
    data.append('address', address);
    data.append('user_type', 1);
    data.append('f_name', '');
    data.append('l_name', '');
    data.append('business_name', '');
    // data.append('profile_pic', '');
    data.append('about', about);
    console.log('Image object', data);
    this.setState({loading: true});
    let url = config.baseURL + 'edit_profile.php';
    apifuntion
      .postApi(url, data)
      .then(obj => {
        return obj.json();
      })
      .then(obj => {
        this.setState({loading: false});
        console.log("Update Response", obj);
       
        if (obj.success == 'true') {
          AsyncStorage.setItem('user_arr', JSON.stringify(obj?.user_details));
          msgProvider.toast(obj?.msg&&obj?.msg[0], 'center');
          this.props.navigation.goBack()
        }else{
          msgProvider.toast(obj?.msg&&obj?.msg[0], 'center');
        }
      })
      .catch(error => {
        console.log('-------- error ------- ' + error);
        this.setState({loading: false});
      });
  }

  setDate(date1) {
    console.log(date1);

    this.setState({date: date1});
  }

  _selectCity(index) {
    
    let data = this.state.city_arr;
    console.log("-------", data[index].city_id);
    let len = this.state.city_arr.length;
    for (let i = 0; i < len; i++) {
      data[i].status = false;
    }

    data[index].status = !data[index].status;
    this.setState({
      city_name: data[index].city[config.language],
      city_id: data[index].city_id,
      modalVisible: false,
    });

    // let data =this.state.city_arr[index];
    // console.log(data)
  }

  _selectGender(s_gender) {
    console.log(s_gender);

    this.setState({gender: s_gender, gender_selection: false});
  }

  _searchCity = textToSearch => {
    this.setState({
      city_arr: this.state.city_arr1.filter(i =>
        i.city[config.language]
          .toLowerCase()
          .includes(textToSearch.toLowerCase()),
      ),
    });
  };

  onPhotoUploadDialogDone = index => {
    if (index == 0) {
      this.openCamera();
    } else if (index == 1) {
      this.openGallery();
    }
  };

  openCamera = () => {
    ImagePicker.openCamera({
      mediaType: 'photo',
    }).then(photoObj => {
      this.setState({
        imageObj: photoObj,
        avatar: photoObj?.path,
      });
      console.log(photoObj);
    });
  };

  openGallery = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
    }).then(photoObj => {
      this.setState({
        imageObj: photoObj,
        avatar: photoObj?.path,
      });
      console.log(photoObj);
    });
  };

  showDatePicker = () => {
    this.setState({
      isShowDatePicker: true,
    });
  };

  hideDatePicker = () => {
    this.setState({
      isShowDatePicker: false,
    });
  };

  handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    this.setState({
      dob: moment(date).format('YYYY-MM-DD'),
    });
    this.hideDatePicker();
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: Colors.white}}>
        <Header
          backImgSource={require('../../Images/back4.jpg')}
          headerHeight={300}
          imgBack={true}
          backBtn={true}
          name="Edit Profile"
        />

        <Modal
          animationType="slide"
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({modalVisible: false});
          }}>
          <StatusBar
            barStyle="default"
            hidden={false}
            translucent={false}
            networkActivityIndicatorVisible={true}
          />
          <SafeAreaView style={{flex: 0, backgroundColor: 'white'}} />
          {/* <View style={s.select_city}>
            <Text style={s.select_city_title}>
              {Lang_chg.Choose_City[config.language]}
            </Text>
            <Text />
          </View> */}

          <View style={s.search_bar}>
            <TouchableOpacity
              onPress={() => this.setState({modalVisible: false})}
              style={{
                marginLeft: -5,
                height: 50,
                width: 40,
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Icon
                name="arrow-back"
                type="ionicons"
                size={24}
                color={Colors.black}
              />
            </TouchableOpacity>
            <TextInput
              placeholder={Lang_chg.ssearch12[config.language]}
              style={{
                height: 50,
                flex: 1,
                borderColor: '#0A8481',
                borderWidth: 0.8,
                borderRadius: 5,
              }}
              onChangeText={text => this._searchCity(text)}
            />
          </View>
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <FlatList
              style={{marginBottom: 10, marginTop: 10}}
              showsVerticalScrollIndicator={false}
              data={this.state.city_arr}
              renderItem={({item, index}) => {
                // this.state.city_id == item.city_id && alert('match')
                return (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      this._selectCity(index);
                    }}>
                    <View style={s.main_view_flag}>
                      <Text style={s.flag_text_detail}>
                        {item.city[config.language]}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent
          visible={this.state.gender_selection}
          onRequestClose={() => {
            this.setState({gender_selection: false});
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            }}>
           
            <View
              style={{
                height: 120,
                width: '90%',
                backgroundColor: '#fff',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                justifyContent: 'space-around', 
                elevation: 5,
              }}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  this._selectGender(Lang_chg.male_txt[config.language]);
                }}>
                <Text style={[s.flag_text_detail,{marginLeft: 15, marginTop: 7}]}>
                  {Lang_chg.male_txt[config.language]}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  this._selectGender(Lang_chg.female_txt[config.language]);
                }}>
                <Text style={[s.flag_text_detail,{marginLeft: 15, marginBottom: 7}]}>
                  {Lang_chg.female_txt[config.language]}
                </Text>
              </TouchableOpacity>
            </View>
        
         </View>
        </Modal>

        <View style={s.SEC2}>
          <View
            style={{
              height: 65,
              width: 115,
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <ImageBackground
              style={{
                height: 108,
                width: 108,
                borderRadius: 7,
                position: 'absolute',
                top: -50,
                alignSelf: 'center',
              }}
              source={{uri: this.state.avatar}}
              imageStyle={{
                resizeMode: 'cover',
                borderRadius: 7,
              }}
            />
            <TouchableOpacity
              style={{
                height: 30,
                width: 30,
                borderRadius: 4,
                backgroundColor: '#fff',
                zIndex: 99999999,
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
                position: 'absolute',
                top: 0,
                right: -10,
                borderWidth: 0.7,
                borderColor: 'rgba(0, 0, 0, 0.75)',
                elevation: 3,
              }}
              onPress={() => this.photoUploadDialogActionSheetRef.show()}>
              <Icon
                name="edit"
                type="feather"
                size={24}
                color={Colors.orange}
              />
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View style={{marginTop: 50, paddingHorizontal: 10}}>
              <Input
                placeholder="Name"
                containerStyle={s.Input}
                inputContainerStyle={s.Input}
                placeholderTextColor={Colors.inputFieldEditProfile}
                inputStyle={s.inputStyles}
                onChangeText={txt => {
                  this.setState({name: txt});
                }}
                defaultValue={this.state.name}
              />
              <Input
                placeholder="Email"
                containerStyle={s.Input}
                inputContainerStyle={s.Input}
                placeholderTextColor={Colors.inputFieldEditProfile}
                inputStyle={s.inputStyles}
                keyboardType="email-address"
                onChangeText={txt => {
                  this.setState({email: txt});
                }}
                defaultValue={this.state.user_details.email}
              />

              <Input
                placeholder="Mobile"
                containerStyle={s.Input}
                inputContainerStyle={s.Input}
                placeholderTextColor={Colors.inputFieldEditProfile}
                inputStyle={s.inputStyles}
                keyboardType="phone-pad"
                onChangeText={txt => {
                  this.setState({phone_number: txt});
                }}
                defaultValue={this.state.phone_number}
              />
              <TouchableOpacity onPress={() => this.showDatePicker()}>
                <Input
                  placeholder="Birthday"
                  containerStyle={s.Input}
                  editable={false}
                  inputContainerStyle={s.Input}
                  placeholderTextColor={Colors.inputFieldEditProfile}
                  inputStyle={s.inputStyles}
                  rightIcon={<Icon name="calendar" type="antdesign" />}
                  onChangeText={txt => {
                    this.setState({dob: txt});
                  }}
                  defaultValue={this.state.dob}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.setState({gender_selection: true});
                }}>
                <Input
                  editable={false}
                  placeholder="Gender"
                  containerStyle={s.Input}
                  inputContainerStyle={s.Input}
                  placeholderTextColor={Colors.inputFieldEditProfile}
                  inputStyle={s.inputStyles}
                  rightIcon={<Icon name="down" size={18} type="antdesign" />}
                  onChangeText={txt => {
                    this.setState({gender: txt});
                  }}
                  defaultValue={
                    this.state.gender == ''
                      ? 'Choose Gender'
                      : this.state.gender
                  }
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.setState({modalVisible: true});
                }}>
                <Input
                  editable={false}
                  //placeholder="Gender"
                  containerStyle={s.Input}
                  inputContainerStyle={s.Input}
                  placeholderTextColor={Colors.inputFieldEditProfile}
                  inputStyle={s.inputStyles}
                  rightIcon={<Icon name="right" size={18} type="antdesign" />}
                  //onChangeText={(txt) => { this.setState({ city_name: txt }) }}
                  defaultValue={
                    this.state.city_name == ''
                      ? 'Choose City'
                      : this.state.city_name
                  }
                />
              </TouchableOpacity>

              <Input
                placeholder="Address"
                containerStyle={s.Input}
                inputContainerStyle={s.Input}
                placeholderTextColor={Colors.inputFieldEditProfile}
                inputStyle={s.inputStyles}
                onChangeText={txt => {
                  this.setState({address: txt});
                }}
                defaultValue={this.state.address}
              />

              <Input
                placeholder="About"
                containerStyle={s.Input}
                inputContainerStyle={s.Input}
                placeholderTextColor={Colors.inputFieldEditProfile}
                inputStyle={s.inputStyles}
                onChangeText={txt => {
                  this.setState({about: txt});
                }}
                defaultValue={this.state?.about}
              />

              <DateTimePickerModal
                isVisible={this.state.isShowDatePicker}
                mode="date"
                onConfirm={this.handleConfirm}
                onCancel={this.hideDatePicker}
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
            { this.state.loading && 
              <ActivityIndicator size={30} color={Colors.orange} style={{alignSelf:"center"}} />
            }
          <TouchableOpacity style={[s.btn1, {flexDirection:'row'}]} onPress={() => this.UpdateProfile()}>
            <Text style={s.btn1Text}>Update</Text>
          </TouchableOpacity>
        </View>
        <ActionSheet
          ref={ref => (this.photoUploadDialogActionSheetRef = ref)}
          title={'Photo Upload'}
          options={['Launch Camera', 'Open Photo Gallery', 'Cancel']}
          cancelButtonIndex={2}
          onPress={this.onPhotoUploadDialogDone}
        />
      </View>
    );
  }
}
const s = StyleSheet.create({
  SEC2: {
    backgroundColor: Colors.white,
    marginTop: -30,
    borderTopLeftRadius: 20,
    borderTopEndRadius: 20,
    flex: 1,
  },
  main_view_flag: {
    height: 35,
    width: '100%',
    marginLeft: '5%',
  },
  search_bar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  inputStyles: {
    color: Colors.inputFieldEditProfile,
    fontFamily: FontFamily.semi_bold,
    fontSize: 15,
  },
  Text: {
    fontFamily: FontFamily.default,
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
  Input1: {
    borderBottomColor: Colors.inputFieldEditProfile,
    width: Sizes.width * 0.42,
    marginLeft: -5,
  },
  Input: {
    borderBottomColor: Colors.inputFieldBottomColor,
    marginTop: -10,
  },
  btn1: {
    height: 48,
    width: '95%',
    backgroundColor: Colors.orange,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginVertical: 10,
    elevation: 5,
  },
  btn1Text: {
    fontSize: 18,
    fontFamily: FontFamily.semi_bold,
    color: Colors.white,
  },
  select_city: {
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
    fontFamily: 'Ubuntu-Regular',
    fontSize: 14,
    color: '#b8b8b8',
    marginRight: 25,
    marginTop: 0,
    marginBottom: 10,
    marginLeft: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  edit_select_txt1: {
    textAlign: 'left',
    fontFamily: 'Ubuntu-Regular',
    fontSize: 16,
    color: '#b9b9b9',
    marginRight: 16,
    marginTop: 0,
    marginBottom: 14,
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#b9b9b9',
  },
  select_city_title: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
  flag_text_detail: {
    color: '#333232',
    fontSize: 14,
    fontFamily: FontFamily.semi_bold,
  },
});
//export default EditProfile;
