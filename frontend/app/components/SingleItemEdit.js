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
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

class SingleItemEditComponent extends Component {
    render() {
        const { data, onSave, onitemNameChange, onPriceChange } = this.props;
        return (
            <AppBase
                style={{
                    justifyContent: 'center',
                }}
            >
                <Image
                    source={Assets.Images[data.image]}
                    style={{
                        width: '100%',
                        height: 150,
                    }}
                    resizeMode="contain"
                />
                <BR size={50} />

                <TextInput
                    autoCorrect={false}
                    onChangeText={debounce(onitemNameChange, 500)}
                    style={{
                        width: '80%',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}
                    defaultValue={data.name}
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
                    defaultValue={data.price}
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



SingleItemEditComponent.defaultProps = {
    data: null,
};

SingleItemEditComponent.propTypes = {
    onSave: PropTypes.func.isRequired,
    onPriceChange: PropTypes.func.isRequired,
    onitemNameChange: PropTypes.func.isRequired,
};

export default SingleItemEditComponent;
