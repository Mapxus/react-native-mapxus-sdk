import React from 'react';
import PropTypes from 'prop-types';
import { requireNativeComponent } from 'react-native';
import NativeBridgeComponent from '../../components/NativeBridgeComponent';
import { ViewPropTypes } from '../../utils';

const NATIVE_MODULE_NAME = 'MXVisualView'

/**
 * This component makes it easy to draw and control routes.
 */
class VisualView extends NativeBridgeComponent(React.Component) {
    static propTypes = {
        ...ViewPropTypes,

        onLoadFail: PropTypes.func,
        onRenderComplete: PropTypes.func,
        onLoadingChanged: PropTypes.func,
        onBearingChanged: PropTypes.func,
        onNodeChanged: PropTypes.func,
    };

    constructor(props) {
        super(props, NATIVE_MODULE_NAME);
        this._onLoadFail = this._onLoadFail.bind(this);
        this._onRenderComplete = this._onRenderComplete.bind(this);
        this._onLoadingChanged = this._onLoadingChanged.bind(this);
        this._onBearingChanged = this._onBearingChanged.bind(this);
        this._onNodeChanged = this._onNodeChanged.bind(this);
    }

    _onLoadFail(event) {
        if (!this.props.onLoadFail) {
            return;
        }
        // process raw event...
        this.props.onLoadFail(event.nativeEvent);
    }

    _onRenderComplete(event) {
        if (!this.props.onRenderComplete) {
            return;
        }
        // process raw event...
        this.props.onRenderComplete(event.nativeEvent);
    }

    _onLoadingChanged(event) {
        if (!this.props.onLoadingChanged) {
            return;
        }
        // process raw event...
        this.props.onLoadingChanged(event.nativeEvent);
    }

    _onBearingChanged(event) {
        if (!this.props.onBearingChanged) {
            return;
        }
        // process raw event...
        this.props.onBearingChanged(event.nativeEvent);
    }

    _onNodeChanged(event) {
        if (!this.props.onNodeChanged) {
            return;
        }
        // process raw event...
        this.props.onNodeChanged(event.nativeEvent);
    }

    loadVisualViewWithFirstImg(imageId) {
        this._runNativeCommand('loadVisualViewWithFirstImg', this._nativeRef, [
            imageId
        ]);
    }

    unloadVisualView() {
        this._runNativeCommand('unloadVisualView', this._nativeRef, [
        ]);
    }

    moveToKey(key) {
        this._runNativeCommand('moveToKey', this._nativeRef, [
            key,
        ]);
    }

    moveCloseTo(buildingId, floor) {
        this._runNativeCommand('moveCloseTo', this._nativeRef, [
            buildingId,
            floor
        ]);
    }

    resize() {
        this._runNativeCommand('resize', this._nativeRef, [
        ]);
    }

    async getBearing() {
        const res = await this._runNativeCommand('getBearing', this._nativeRef);
        return res.bearing;
    }

    setBearing(bearing) {
        this._runNativeCommand('setBearing', this._nativeRef, [
            bearing,
        ]);
    }

    async getVisualCenter() {
        const res = await this._runNativeCommand('getVisualCenter', this._nativeRef);
        return res.center;
    }

    setVisualCenter(center) {
        this._runNativeCommand('setVisualCenter', this._nativeRef, [
            center,
        ]);
    }

    async getZoom() {
        const res = await this._runNativeCommand('getZoom', this._nativeRef);
        return res.zoom;
    }

    setZoom(zoom) {
        this._runNativeCommand('setZoom', this._nativeRef, [
            zoom,
        ]);
    }

    activateBearing() {
        this._runNativeCommand('activateBearing', this._nativeRef, [
        ]);
    }

    deactivateBearing() {
        this._runNativeCommand('deactivateBearing', this._nativeRef, [
        ]);
    }

    _setNativeRef(nativeRef) {
        this._nativeRef = nativeRef;
        super._runPendingNativeCommands(nativeRef);
    }

    render() {
        const callbacks = {
            ref: (nativeRef) => this._setNativeRef(nativeRef),
            onLoadFail: this._onLoadFail,
            onRenderComplete: this._onRenderComplete,
            onLoadingChanged: this._onLoadingChanged,
            onBearingChanged: this._onBearingChanged,
            onNodeChanged: this._onNodeChanged,
        };

        return <VView {...this.props} {...callbacks}>{this.props.children}</VView>;
    }
}

const VView = requireNativeComponent(NATIVE_MODULE_NAME, VisualView);

export default VisualView;