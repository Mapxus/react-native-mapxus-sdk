import React from 'react';
import PropTypes from 'prop-types';
import { requireNativeComponent } from 'react-native';
import NativeBridgeComponent from '../../components/NativeBridgeComponent';
import { ViewPropTypes } from '../../utils';

const NATIVE_MODULE_NAME = 'MXRouteView'

/**
 * This component makes it easy to draw and control routes.
 */
class RouteView extends NativeBridgeComponent(React.Component) {
    static propTypes = {
        ...ViewPropTypes,

        routeAppearance: PropTypes.shape({
            isAddStartDash: PropTypes.bool,
            isAddEndDash: PropTypes.bool,
            hiddenTranslucentPaths: PropTypes.bool,
            indoorLineColor: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]),
            outdoorLineColor: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]),
            dashLineColor: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]),
            arrowSymbolSpacing: PropTypes.number,
            arrowIcon: PropTypes.string,
            startIcon: PropTypes.string,
            endIcon: PropTypes.string,
            elevatorUpIcon: PropTypes.string,
            elevatorDownIcon: PropTypes.string,
            escalatorUpIcon: PropTypes.string,
            escalatorDownIcon: PropTypes.string,
            rampUpIcon: PropTypes.string,
            rampDownIcon: PropTypes.string,
            stairsUpIcon: PropTypes.string,
            stairsDownIcon: PropTypes.string,
            buildingGateIcon: PropTypes.string,
        }),

    };

    constructor(props) {
        super(props, NATIVE_MODULE_NAME);
    }

    /**
     * Get the data generated before drawing the route, such as 'keys' represent the identification value of the route section.
     * @returns {Promise}
     */
    async getPainterPathDto() {
        const res = await this._runNativeCommand('getPainterPathDto', this._nativeRef);
        return res.painterPathDto;
    }

    /**
     * Draw the route with the route search result
     * @param {Path} path the route which you want to display.
     * @param {Array<IndoorPoint>} points the waypoint list.
     */
    paintRouteUsingPath(path, points) {
        this._runNativeCommand('paintRouteUsingPath', this._nativeRef, [
            path,
            points
        ]);
    }

    /**
     * Clear the route that has been drawn on the map.
     */
    cleanRoute() {
        this._runNativeCommand('cleanRoute', this._nativeRef, [
        ]);
    }

    /**
     * Show the route of the specified scene, usually called when `MapxusMap.onIndoorSceneChange` is triggered.
     * @param {String} buildingId id of the building to be selected
     * @param {String} floor name of the floor to be selected
     */
    changeOn(buildingId, floor) {
        this._runNativeCommand('changeOn', this._nativeRef, [
            buildingId,
            floor
        ]);
    }

    /**
     * Let the map zoom to the appropriate level to show the specified route section.
     * @param {Array<String>} keys The route sections you want to show in full.
     * @param {Insets} insets The margins when displayed.
     */
    focusOn(keys, insets) {
        this._runNativeCommand('focusOn', this._nativeRef, [
            keys,
            insets,
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

        return <Route {...this.props} {...callbacks}>{this.props.children}</Route>;
    }
}

const Route = requireNativeComponent(NATIVE_MODULE_NAME, RouteView);

export default RouteView;