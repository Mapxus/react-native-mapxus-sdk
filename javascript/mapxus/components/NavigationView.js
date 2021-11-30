import React from 'react';
import PropTypes from 'prop-types';
import { requireNativeComponent } from 'react-native';
import NativeBridgeComponent from '../../maprenderer/components/NativeBridgeComponent';
import { ViewPropTypes } from '../../maprenderer/utils';

const NATIVE_MODULE_NAME = 'MXNavigationView'

/**
 * NavigationView provides navigation with adsorption and route reduction.
 */
class NavigationView extends NativeBridgeComponent(React.Component) {
    static propTypes = {
        ...ViewPropTypes,

        /**
         * Enable adsorption.
         */
        adsorbable: PropTypes.bool,

        /**
         * Enable route reduction.
         */
        shortenable: PropTypes.bool,

        /**
         * Number of drifts allowed.
         */
        numberOfAllowedDrifts: PropTypes.number,

        /**
         * Maximum permissible drift.
         */
        maximumDrift: PropTypes.number,

        /**
         * Sets the distance to determine if the destination is reached.
         */
        distanceToDestination: PropTypes.number,

        /**
         * Display indicator to show the direction of the user.
         */
        showsUserHeadingIndicator: PropTypes.bool,

        /**
         * Triggered when the distance of route to the destination is less than distanceToDestination.
         */
        onArrivalAtDestination: PropTypes.func,

        /**
         * Triggered when the number of drifts is greater than numberOfAllowedDrifts.
         */
        onExcessiveDrift: PropTypes.func,

        /**
         * Triggered when the adsorbable point is calculated, or not triggered if adsorbable is false.
         */
        onRefreshTheAdsorptionLocation: PropTypes.func,

        /**
         * Triggered when a new route is calculated, or not triggered if shortenable is false.
         */
        onGetNewPath: PropTypes.func,

        /**
         * Callback when the position is updated, if start() has been executed and adsorbable is true, 
         * then the corrected position will be returned, otherwise the original position will be returned.
         */
        onUpdate: PropTypes.func,
    };

    constructor(props) {
        super(props, NATIVE_MODULE_NAME);
        this._onArrivalAtDestination = this._onArrivalAtDestination.bind(this);
        this._onExcessiveDrift = this._onExcessiveDrift.bind(this);
        this._onRefreshTheAdsorptionLocation = this._onRefreshTheAdsorptionLocation.bind(this);
        this._onGetNewPath = this._onGetNewPath.bind(this);
        this._onUpdate = this._onUpdate.bind(this);
    }

    _onUpdate(event) {
        if (!this.props.onUpdate) {
            return;
        }
        // process raw event...
        this.props.onUpdate(event.nativeEvent);
    }

    _onArrivalAtDestination(event) {
        if (!this.props.onArrivalAtDestination) {
            return;
        }
        // process raw event...
        this.props.onArrivalAtDestination(event.nativeEvent);
    }

    _onExcessiveDrift(event) {
        if (!this.props.onExcessiveDrift) {
            return;
        }
        // process raw event...
        this.props.onExcessiveDrift(event.nativeEvent);
    }

    _onRefreshTheAdsorptionLocation(event) {
        if (!this.props.onRefreshTheAdsorptionLocation) {
            return;
        }
        // process raw event...
        this.props.onRefreshTheAdsorptionLocation(event.nativeEvent);
    }

    _onGetNewPath(event) {
        if (!this.props.onGetNewPath) {
            return;
        }
        // process raw event...
        this.props.onGetNewPath(event.nativeEvent);
    }

    /**
     * Importing route data with the route search result
     * @param {Path} path the route which you want to display.
     * @param {Array<IndoorPoint>} points the waypoint list.
     */
    updatePath(path, points) {
        this._runNativeCommand('updatePath', this._nativeRef, [
            path,
            points
        ]);
    }

    /**
     * Start to navigation.
     */
    start() {
        this._runNativeCommand('start', this._nativeRef, []);
    }

    /**
     * Stop to navigation.
     */
    stop() {
        this._runNativeCommand('stop', this._nativeRef, []);
    }

    _setNativeRef(nativeRef) {
        this._nativeRef = nativeRef;
        super._runPendingNativeCommands(nativeRef);
    }

    render() {
        const callbacks = {
            ref: (nativeRef) => this._setNativeRef(nativeRef),
            onArrivalAtDestination: this._onArrivalAtDestination,
            onExcessiveDrift: this._onExcessiveDrift,
            onRefreshTheAdsorptionLocation: this._onRefreshTheAdsorptionLocation,
            onGetNewPath: this._onGetNewPath,
            onUpdate: this._onUpdate,
        };

        return <NaviView {...this.props} {...callbacks}>{this.props.children}</NaviView>;
    }
}

const NaviView = requireNativeComponent(NATIVE_MODULE_NAME, NavigationView);

export default NavigationView;