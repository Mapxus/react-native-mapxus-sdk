import React from 'react';
import PropTypes from 'prop-types';
import { requireNativeComponent } from 'react-native';
import NativeBridgeComponent from '../../components/NativeBridgeComponent';
import { ViewPropTypes } from '../../utils';

const NATIVE_MODULE_NAME = 'MXNavigationView'

/**
 * This component makes it easy to draw and control routes.
 */
class NavigationView extends NativeBridgeComponent(React.Component) {
    static propTypes = {
        ...ViewPropTypes,

        adsorbable: PropTypes.bool,

        shortenable: PropTypes.bool,

        numberOfAllowedDrifts: PropTypes.number,

        maximumDrift: PropTypes.number,

        distanceToDestination: PropTypes.number,

        onArrivalAtDestination: PropTypes.func,

        onExcessiveDrift: PropTypes.func,

        onRefreshTheAdsorptionLocation: PropTypes.func,

        onGetNewPath: PropTypes.func,

    };

    constructor(props) {
        super(props, NATIVE_MODULE_NAME);
        this._onArrivalAtDestination = this._onArrivalAtDestination.bind(this);
        this._onExcessiveDrift = this._onExcessiveDrift.bind(this);
        this._onRefreshTheAdsorptionLocation = this._onRefreshTheAdsorptionLocation.bind(this);
        this._onGetNewPath = this._onGetNewPath.bind(this);
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
     * Draw the route with the route search result
     * @param {Path} path the route which you want to display.
     * @param {Array<IndoorPoint>} points the waypoint list.
     */
     updatePath(path, points) {
        this._runNativeCommand('updatePath', this._nativeRef, [
            path,
            points
        ]);
    }

    start() {
        this._runNativeCommand('start', this._nativeRef, []);
    }

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
        };

        return <NaviView {...this.props} {...callbacks}>{this.props.children}</NaviView>;
    }
}

const NaviView = requireNativeComponent(NATIVE_MODULE_NAME, NavigationView);

export default NavigationView;