/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { Actions } from 'react-native-router-flux';
import AppBase from '../base_components/AppBase';
import PrimaryText from '../base_components/PrimaryText';
import BR from '../base_components/BR';
import TextInput from '../base_components/TextInput';
import RoundButton from '../base_components/RoundButton';
import TextButton from '../base_components/TextButton';
import Colors from '../../src/constants/colors';
import Assets from '../../src/constants/assets';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

class AddItemComponent extends Component {
    state = {
        image: null,
    };

    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };

    render() {
        const { onSave, onitemNameChange, onPriceChange, addItem, addItemError } = this.props;
        let { image } = this.state;
        return (
            <AppBase
                style={{
                    justifyContent: 'center',
                }}
            >
                <BR size={20} />
                {addItem && <PrimaryText>Successfully added item</PrimaryText>}
                {addItemError && <PrimaryText>Failed to add item</PrimaryText>}
                <BR size={50} />
                <TextButton
                    title="Pick an image from camera roll"
                    onPress={this._pickImage}
                />
                {image &&
                    <Image source={{ uri: image }} style={{
                        width: '100%',
                        height: 150,
                    }}
                        resizeMode="contain" />}
                {!image && <Image
                    source={Assets.Images['placeholderFood']}
                    style={{
                        width: '100%',
                        height: 150,
                    }}
                    resizeMode="contain"
                />}
                <BR size={50} />

                <TextInput
                    autoCorrect={false}
                    onChangeText={debounce(onitemNameChange, 500)}
                    style={{
                        width: '80%',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}
                    underlineColorAndroid="#B9B9B9"
                    placeholder="Item Name"
                />
                <BR />
                <TextInput
                    autoCorrect={false}
                    onChangeText={debounce(onPriceChange, 500)}
                    style={{
                        width: '80%',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}
                    underlineColorAndroid="#B9B9B9"
                    placeholder="Price"
                />
                <BR />
                <RoundButton
                    title="Save"
                    onPress={onSave}
                />
                <BR size={20} />
            </AppBase>
        );
    }
}



AddItemComponent.defaultProps = {
    data: null,
};

AddItemComponent.propTypes = {
    onSave: PropTypes.func.isRequired,
    onPriceChange: PropTypes.func.isRequired,
    onitemNameChange: PropTypes.func.isRequired,
};

export default AddItemComponent;
