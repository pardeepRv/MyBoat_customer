import React, { Component } from 'react';

// import $colors from './Colors';
import {
    StyleSheet,
    View,
    Modal,
    ActivityIndicator,
    Text
} from 'react-native';

export default class Loader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: true
        }
    }
    render() {
        console.log('props', this.state.status)
        return (

            <Modal
                transparent={true}
                animationType={'none'}
                visible={this.state.status ? this.props.loading : this.state.status}
                onRequestClose={() => { this.setState({ status: false }) }}>
                <View style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>
                        <ActivityIndicator size="large" color='#FFFFFF'
                            animating={this.props.loading} />
                    </View>
                </View>
            </Modal>
        )
    }
}
const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000020',
    },
    activityIndicatorWrapper: {
        height: 80,
        width: 80,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        // flexDirection:'row',
        justifyContent: 'space-around',
        backgroundColor: 'black'
    }
});

