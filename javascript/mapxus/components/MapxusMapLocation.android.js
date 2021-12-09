import React from 'react';
import PropTypes from 'prop-types';
import { requireNativeComponent, NativeModules } from 'react-native';
import { viewPropTypes, isFunction } from '../../maprenderer/utils';
import NativeBridgeComponent from '../../maprenderer/components/NativeBridgeComponent';

export const NATIVE_MODULE_NAME = 'RCTMapxusLocation';
const MapboxGL = NativeModules.MGLModule;
const RCTMapxusModule = NativeModules.MapxusSdk;

/**
 * MapxusMapLocation backed by Mapxus Map SDK
 */
class MapxusMapLocation extends NativeBridgeComponent(React.Component) {
	static propTypes = {
		...viewPropTypes,
		/**
		 * This event is triggered when location started.
		 */
		onLocationStarted: PropTypes.func,

		/**
		 * This event is triggered when location Stopped.
		 */
		onLocationStopped: PropTypes.func,

		/**
		 * This event is triggered when location Error.
		 */
		onLocationError: PropTypes.func,

		/**
		 * This event is triggered when location change.
		 */
		onLocationChange: PropTypes.func,

		/**
		 * This event is triggered when compass change.
		 */
		onCompassChange: PropTypes.func,

		/**
		 * The mode used to track the user location on the map. One of; "None", "Follow", "FollowWithHeading". Or just pass a number , "None" to 0,"Follow" to 1,"FollowWithHeading" to 3
		 */
		followUserMode: PropTypes.oneOf([MapboxGL.UserTrackingModes.None,MapboxGL.UserTrackingModes.Follow,MapboxGL.UserTrackingModes.FollowWithHeading,]),
	};

	constructor(props) {
		super(props, NATIVE_MODULE_NAME);

		this._onChange = this._onChange.bind(this);
	}

	_onChange(e) {
		const { type, payload } = e.nativeEvent;
		let propName = '';

		switch (type) {
			case RCTMapxusModule.MapxusEventTypes.OnLocationChange:
				propName = 'onLocationChange';
				break;
			case RCTMapxusModule.MapxusEventTypes.OnLocationStarted:
				propName = 'onLocationStarted';
				break;
			case RCTMapxusModule.MapxusEventTypes.OnLocationStopped:
				propName = 'onLocationStopped';
				break;
			case RCTMapxusModule.MapxusEventTypes.OnLocationError:
				propName = 'onLocationError';
				break;
			case RCTMapxusModule.MapxusEventTypes.OnCompassChange:
				propName = 'onCompassChange';
				break;
			default:
				console.warn('Unhandled event callback type', type);
		}

		if (propName.length) {
			this._handleOnChange(propName, payload);
		}
	}

	_handleOnChange(propName, payload) {
		if (isFunction(this.props[propName])) {
			this.props[propName](payload);
		}
	}

	_setNativeRef(nativeRef) {
		this._nativeRef = nativeRef;
		super._runPendingNativeCommands(nativeRef);
	}

	render() {
		const callbacks = {
			ref: (nativeRef) => this._setNativeRef(nativeRef),
			onUserLocationChange: this._onChange,
		};

		return (
			<RCTMapxusLocation {...this.props} {...callbacks}>
				{this.props.children}
			</RCTMapxusLocation>
		);
	}
}

const RCTMapxusLocation = requireNativeComponent(
	NATIVE_MODULE_NAME,
	MapxusMapLocation,
	{
		nativeOnly: { onUserLocationChange: true },
	}
);

export default MapxusMapLocation;
