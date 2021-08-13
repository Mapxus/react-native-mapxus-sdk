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

        /**
         * Display indicator to show the direction of the user.
         */
        showsUserHeadingIndicator: PropTypes.bool,

        /**
         * Callback when the position is updated.
         */
        onUpdate: PropTypes.func,

    };

    constructor(props) {
        super(props, NATIVE_MODULE_NAME);
        this._onUpdate = this._onUpdate.bind(this);

    }

    _onUpdate(event) {
        if (!this.props.onUpdate) {
            return;
        }
        // process raw event...
        this.props.onUpdate(event.nativeEvent);
    }

    /**
     * Set the simulate location you want.
     * @param {InputLocation} location 
     */
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
            ref: (nativeRef) => this._setNativeRef(nativeRef),
            onUpdate: this._onUpdate,
        };

        return <SimView {...this.props} {...callbacks}>{this.props.children}</SimView>;
    }
}

const SimView = requireNativeComponent(NATIVE_MODULE_NAME, SimulateLocationManager);

export default SimulateLocationManager;