import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';


class QRCodeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null
        }
    }

    componentDidMount() {
        this._requestCameraPermission();
    }

    _requestCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted',
        });
    };

    _handleBarCodeRead = (data) => {
        Alert.alert(
            'Scan successful!',
            JSON.stringify(data)
        );
    };

    render() {
        return (
            <View>
                {this.state.hasCameraPermission === null ?
                    <Text>Requesting for camera permission</Text> :
                    this.state.hasCameraPermission === false ?
                        <Text>Camera permission is not granted</Text> :
                        <BarCodeScanner
                            torchMode="on"
                            onBarCodeRead={this._handleBarCodeRead}
                            style={{ height: 200, width: 200 }}
                        />
                }
            </View>
        );
    }

}

export default QRCodeScreen;