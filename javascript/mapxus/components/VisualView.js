import React from 'react';
import PropTypes from 'prop-types';
import { requireNativeComponent } from 'react-native';
import NativeBridgeComponent from '../../maprenderer/components/NativeBridgeComponent';
import { ViewPropTypes } from '../../maprenderer/utils';

const NATIVE_MODULE_NAME = 'MXVisualView'

/**
 * Visual view showcases realistic interior.
 */
class VisualView extends NativeBridgeComponent(React.Component) {
    static propTypes = {
        ...ViewPropTypes,

        /**
         * Fired when the view load fail.
         */
        onLoadFail: PropTypes.func,

        /**
         * Fired when the view render complete.
         */
        onRenderComplete: PropTypes.func,

        /**
         * Fired when the view is loading more data.
         */
        onLoadingChanged: PropTypes.func,

        /**
         * Fired when the view direction of the camera changes.
         */
        onBearingChanged: PropTypes.func,

        /**
         * Fired every time when the view navigates to a new node.
         */
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

    /**
     * Load visual.
     * @param {string} imageId The first image that visual view load with.
     */
    loadVisualViewWithFirstImg(imageId) {
        this._runNativeCommand('loadVisualViewWithFirstImg', this._nativeRef, [
            imageId
        ]);
    }

    /**
     * Unload visual
     */
    unloadVisualView() {
        this._runNativeCommand('unloadVisualView', this._nativeRef, [
        ]);
    }

    /**
     * Navigate to a given photo key.
     * @param {stirng} key A valid Visual photo key.
     */
    moveToKey(key) {
        this._runNativeCommand('moveToKey', this._nativeRef, [
            key,
        ]);
    }

    /**
     * Move close to given indoor latitude and longitude.
     * @param {string} buildingId Image belong building id.
     * @param {stirng} floor Image belong floor name.
     * @param {number} latitude Latitude, in degrees.
     * @param {number} longitude Longitude, in degrees.
     */
    moveCloseTo(buildingId, floor, latitude, longitude) {
        this._runNativeCommand('moveCloseTo', this._nativeRef, [
            buildingId,
            floor,
            latitude,
            longitude
        ]);
    }

    /**
     * Detect the viewer's new width and height and resize it. The components will also detect 
     * the viewer's new size and resize their rendered elements if needed.
     */
    resize() {
        this._runNativeCommand('resize', this._nativeRef, [
        ]);
    }

    /**
     * Get the bearing of the current viewer camera.
     * @returns {Promise<number>} The bearing depends on how the camera is currently rotated and does not 
     * correspond to the compass angle of the current node if the view has been panned. Bearing 
     * is measured in degrees clockwise with respect to north.
     */
    async getBearing() {
        const res = await this._runNativeCommand('getBearing', this._nativeRef);
        return res.bearing;
    }

    /**
     * Set the photo's pan to bearing. Provide the angle (0 - 360), to pan rotation photo's bearing.
     * @param {number} bearing The photo's pan to bearing.
     */
    setBearing(bearing) {
        this._runNativeCommand('setBearing', this._nativeRef, [
            bearing,
        ]);
    }

    /**
     * Get the basic coordinates of the current photo that is at the center of the viewport. 
     * Basic coordinates are 2D coordinates on the [0, 1] interval and have the origin point, 
     * (0, 0), at the top left corner and the maximum value, (1, 1), at the bottom right corner 
     * of the original image.
     * @returns {Promise<VisualCoordinate2D>} Center.
     */
    async getVisualCenter() {
        const res = await this._runNativeCommand('getVisualCenter', this._nativeRef);
        return res.center;
    }

    /**
     * Get the basic coordinates of the current photo that is at the center of the viewport. 
     * Basic coordinates are 2D coordinates on the [0, 1] interval and have the origin point, 
     * (0, 0), at the top left corner and the maximum value, (1, 1), at the bottom right corner 
     * of the original photo.
     * @param {VisualCoordinate2D} center Promise to the basic coordinates of the current photo at the center for the viewport.
     */
    setVisualCenter(center) {
        this._runNativeCommand('setVisualCenter', this._nativeRef, [
            center,
        ]);
    }

    /**
     * Get the image's current zoom level.
     * @returns {Promise<number>} Current zoom level.
     */
    async getZoom() {
        const res = await this._runNativeCommand('getZoom', this._nativeRef);
        return res.zoom;
    }

    /**
     * Set the photo's current zoom level. Possible zoom level values are on the [0, 3] interval. 
     * Zero means zooming out to fit the photo to the view whereas three shows the highest level of detail.
     * @param {number} zoom The level which you want to zoom.
     */
    setZoom(zoom) {
        this._runNativeCommand('setZoom', this._nativeRef, [
            zoom,
        ]);
    }

    /**
     * Activate the compass
     */
    activateBearing() {
        this._runNativeCommand('activateBearing', this._nativeRef, [
        ]);
    }

    /**
     * Deactivate the compass
     */
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