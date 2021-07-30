import React from 'react';
import PropTypes from 'prop-types';
import { requireNativeComponent } from 'react-native';
import NativeBridgeComponent from '../../components/NativeBridgeComponent';
import { ViewPropTypes } from '../../utils';

const NATIVE_MODULE_NAME = 'MXSimulateLocation'

/**
 * This component makes it easy to draw and control routes.
 */
class SimulateLocationManager extends NativeBridgeComponent(React.Component) {
    static propTypes = {
        ...ViewPropTypes,

        showsUserHeadingIndicator: PropTypes.bool,

        onUpdate: PropTypes.func,

    };

    constructor(props) {
        super(props, NATIVE_MODULE_NAME);
    }

    setSimulateLocation(location) {
        this._runNativeCommand('setSimulateLocation', this._nativeRef, [
            location
        ]);
    }

    _setNativeRef(nativeRef) {
        this._nativeRef = nativeRef;
        super._runPendingNativeCommands(nativeRef);
    }

    render() {
        const callbacks = {
            ref: (nativeRef) => this._setNativeRef(nativeRef)
        };

        return <SimView {...this.props} {...callbacks}>{this.props.children}</SimView>;
    }
}

const SimView = requireNativeComponent(NATIVE_MODULE_NAME, SimulateLocationManager);

export default SimulateLocationManager;