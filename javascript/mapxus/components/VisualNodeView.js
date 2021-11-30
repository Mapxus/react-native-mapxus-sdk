import React from 'react';
import PropTypes from 'prop-types';
import { requireNativeComponent } from 'react-native';
import NativeBridgeComponent from '../../maprenderer/components/NativeBridgeComponent';
import { ViewPropTypes } from '../../maprenderer/utils';

const NATIVE_MODULE_NAME = 'MXVisualNodeView'

/**
 * This component makes it easy to draw and control visual nodes on the map.
 */
class VisualNodeView extends NativeBridgeComponent(React.Component) {
    static propTypes = {
        ...ViewPropTypes,

        /**
         * Triggered by clicking on the flag.
         */
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

    /**
     * Rendering of incoming data.
     * @param {VisualNode[] | VisualNodeGroup[]} nodes The json objects which got from searching interface, for iOS uses VisualNode[] and Android uses VisualNodeGroup[]
     */
    renderFlagUsingNodes(nodes) {
        this._runNativeCommand('renderFlagUsingNodes', this._nativeRef, [
            nodes,
        ]);
    }

    /**
     * Clean all flag which rendering on the map.
     */
    cleanLayer() {
        this._runNativeCommand('cleanLayer', this._nativeRef, [
        ]);
    }

    /**
     * Toggles the display of the visual annotation points corresponding to the floor of the building. 
     * @param {string} buildingId id of the building to be selected
     * @param {String} floor name of the floor to be selected
     */
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