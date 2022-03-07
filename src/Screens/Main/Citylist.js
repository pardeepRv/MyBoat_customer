import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import Header from '../../Components/Header';
import { Colors } from '../../Constants/Constants';
import { Icon, Input, Card, AirbnbRating } from "react-native-elements";

class Citylist extends React.Component {

  constructor(props) {
    console.log(props, 'props n view');
    super(props);

    this.state = {
      item: props.route.params.item,
      iscontact: '',
      isSelected: false,
      itemselected:null 

     
    };
  }
  handleClick = (idx) => {
    console.log('id :>> ', idx);

    const array = this.state.item.map(v => {
      const newItem = Object.assign({}, v);
      newItem.isSelected = false;
      return newItem;
    });
     console.log(array, ' food before');


    array[idx].isSelected = !array[idx].isSelected;
    this.setState({
      item: array,
      itemselected: array[idx].country_id
    }, () => {
      console.log(this.state.item, 'after food');
      console.log(this.state.itemselected, 'after foodselected');
    })
    // this.props.updateState();
    this.props.navigation.goBack();
}


  
gotoBack = () => {
    this.props.navigation.goBack();
  };

  _renderDateView = ({ item, index }) => (
    <TouchableOpacity
    onPress={() => this.handleClick(index)}
      style={{
        backgroundColor: '#fafafa',
        marginVertical: 10,
        marginHorizontal: 10,
      }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.hText}>{item && item.city && item.city.length >0 && item.city[0]}</Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    console.log('details', this.state.item);
    const { item } = this.state;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      
        <TouchableOpacity
            style={{
              marginBottom: -50,
              alignItems: "flex-start",
              marginTop: 20,
              marginLeft: 20,

              borderRadius: 25,
              width:'10%'
            }}
          >
            <Icon
              onPress={() => this.gotoBack()}
              name="arrow-back"
              type="ionicons"
              size={26}
              color={Colors.black}
            />
          </TouchableOpacity>
  
          <View style={{ flex: 1 ,marginTop:60}}>
          <FlatList
             extraData={this.state.item}
            data={this.state.item}
            renderItem={this._renderDateView}
            keyExtractor={(item, index) => 'key' + index}
            ListHeaderComponent={() =>
              !this.state.item.length ? (
                <Text
                  style={{
                    alignSelf: 'center',
                    marginTop: 20,
                    //   fontFamily: fonts.regular,
                  }}>
                  No Match found
                </Text>
              ) : null
            }
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default Citylist;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#000',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  hText: {
    fontSize: 18,
    fontWeight: 'bold',
    top: 5,
    left: 5,
  },
  sText: {
    fontWeight: 'bold',
    marginRight: 10,
  },
});
