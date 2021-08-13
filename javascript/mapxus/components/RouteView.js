import React from 'react';
import PropTypes from 'prop-types';
import { requireNativeComponent, processColor } from 'react-native';
import NativeBridgeComponent from '../../components/NativeBridgeComponent';
import { ViewPropTypes } from '../../utils';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import { StyleTypes } from '../../utils/styleMap';


const typeMap = {
    isAddStartDash: StyleTypes.Constant,
    isAddEndDash: StyleTypes.Constant,
    hiddenTranslucentPaths: StyleTypes.Constant,
    indoorLineColor: StyleTypes.Color,
    outdoorLineColor: StyleTypes.Color,
    dashLineColor: StyleTypes.Color,
    arrowSymbolSpacing: StyleTypes.Constant,

    arrowIcon: StyleTypes.Image,
    startIcon: StyleTypes.Image,
    endIcon: StyleTypes.Image,
    elevatorUpIcon: StyleTypes.Image,
    elevatorDownIcon: StyleTypes.Image,
    escalatorUpIcon: StyleTypes.Image,
    escalatorDownIcon: StyleTypes.Image,
    rampUpIcon: StyleTypes.Image,
    rampDownIcon: StyleTypes.Image,
    stairsUpIcon: StyleTypes.Image,
    stairsDownIcon: StyleTypes.Image,
    buildingGateIcon: StyleTypes.Image,
}


const NATIVE_MODULE_NAME = 'MXRouteView'

/**
 * This component makes it easy to draw and control routes.
 */
class RouteView extends NativeBridgeComponent(React.Component) {
    static propTypes = {
        ...ViewPropTypes,

        /**
         * Configuration route appearance.
         */
        routeAppearance: PropTypes.shape({

            /**
             * Add a dashed line from the start point to the beginning of the route
             */
            isAddStartDash: PropTypes.bool,

            /**
             * Add a dashed line from the end point to the end of the route
             */
            isAddEndDash: PropTypes.bool,

            /**
             * Hide route segments that are not in the current scene.
             */
            hiddenTranslucentPaths: PropTypes.bool,

            /**
             * Set the colour of the route drawn on indoor.
             */
            indoorLineColor: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]),

            /**
             * Set the colour of the route drawn on the outdoor.
             */
            outdoorLineColor: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]),

            /**
             * Set the colour of the dash.
             */
            dashLineColor: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]),

            /**
             * Set the distance of the directional markers on the route.
             */
            arrowSymbolSpacing: PropTypes.number,

            /**
             * Set the icon indicating the direction on the route.
             */
            arrowIcon: PropTypes.number,

            /**
             * Set the start point icon.
             */
            startIcon: PropTypes.number,

            /**
             * Set the end point icon.
             */
            endIcon: PropTypes.number,

            /**
             * Set the icon for going up in the lift.
             */
            elevatorUpIcon: PropTypes.number,

            /**
             * Set the icon for going down in the lift.
             */
            elevatorDownIcon: PropTypes.number,

            /**
             * Set the icon for going up on the escalator.
             */
            escalatorUpIcon: PropTypes.number,

            /**
             * Set the icon for going down on the escalator.
             */
            escalatorDownIcon: PropTypes.number,

            /**
             * Set the icon for warp ramp up.
             */
            rampUpIcon: PropTypes.number,

            /**
             * Set the icon for warp ramp down.
             */
            rampDownIcon: PropTypes.number,

            /**
             * Set the icon for going up via stairs.
             */
            stairsUpIcon: PropTypes.number,

            /**
             * Set the icon for going down via stairs.
             */
            stairsDownIcon: PropTypes.number,

            /**
             * Set the icon for passing through the door.
             */
            buildingGateIcon: PropTypes.number,
        }),

    };

    get baseProps() {
        return {
            ...this.props,
            reactRouteAppearance: this._getAppearance(),
        };
    }

    constructor(props) {
        super(props, NATIVE_MODULE_NAME);
    }

    _getAppearance() {
        let appearance = this.props.routeAppearance;
        if (!appearance) {
            return;
        }

        const nativeAppearance = {};
        const appearanceProps = Object.keys(appearance);
        for (const appearanceProp of appearanceProps) {
            const propType = this._getPropType(appearanceProp);
            let rawAppearance = appearance[appearanceProp];

            if (propType === StyleTypes.Image) {
                rawAppearance = resolveAssetSource(rawAppearance) || {};
            } else if (propType === StyleTypes.Color && typeof rawAppearance === 'string') {
                rawAppearance = processColor(rawAppearance);
            }

            // const bridgeValue = new BridgeValue(rawAppearance);
            nativeAppearance[appearanceProp] = rawAppearance;
            // {
            //     appearanceType: propType,
            //     appearanceValue: bridgeValue.toJSON(),
            // };
        }

        return nativeAppearance;
    }

    _getPropType(appearanceProp) {
        if (typeMap[appearanceProp]) {
            return typeMap[appearanceProp];
        }

        throw new Error(`${appearanceProp} is not a valid Mapxus route type`);
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

        return <Route {...this.baseProps} {...callbacks}>{this.props.children}</Route>;
    }
}

const Route = requireNativeComponent(NATIVE_MODULE_NAME, RouteView, { nativeOnly: { reactRouteAppearance: true } });

export default RouteView;