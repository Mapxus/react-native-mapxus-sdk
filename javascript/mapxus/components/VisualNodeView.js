import React from 'react';
import PropTypes from 'prop-types';
import { requireNativeComponent } from 'react-native';
import NativeBridgeComponent from '../../components/NativeBridgeComponent';
import { ViewPropTypes } from '../../utils';

const NATIVE_MODULE_NAME = 'MXVisualNodeView'


class VisualNodeView extends NativeBridgeComponent(React.Component) {
    static propTypes = {
        ...ViewPropTypes,

        onTappedFlag: PropTypes.func,
    };

    constructor(props) {
        super(props, NATIVE_MODULE_NAME);
        this._onTappedFlag = this._onTappedFlag.bind(this);
    }

    _onTappedFlag(event) {
        if (!this.props.onTappedFlag) {
            return;
        }
        // process raw event...
        this.props.onTappedFlag(event.nativeEvent);
    }

    renderFlagUsingNodes(nodes) {
        this._runNativeCommand('renderFlagUsingNodes', this._nativeRef, [
            nodes,
        ]);
    }


    cleanLayer() {
        this._runNativeCommand('cleanLayer', this._nativeRef, [
        ]);
    }


    changeOn(buildingId, floor) {
        this._runNativeCommand('changeOn', this._nativeRef, [
            buildingId,
            floor
        ]);
    }

    _setNativeRef(nativeRef) {
        this._nativeRef = nativeRef;
        super._runPendingNativeCommands(nativeRef);
    }

    render() {
        const callbacks = {
            ref: (nativeRef) => this._setNativeRef(nativeRef),
            onTappedFlag: this._onTappedFlag,
        };

        return <NodeView {...this.props} {...callbacks}>{this.props.children}</NodeView>;
    }
}

const NodeView = requireNativeComponent(NATIVE_MODULE_NAME, VisualNodeView);

export default VisualNodeView;