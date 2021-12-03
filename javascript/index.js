// main index.js

import {
	NativeModules,
} from 'react-native';

import { isAndroid } from './maprenderer/utils';
import MapboxGL from './maprenderer';

import MapxusMap from './mapxus/components/MapxusMap';
import MapxusMapLocationAndroid from './mapxus/components/MapxusMapLocation.android';
import MapxusPointAnnotationView from './mapxus/components/MapxusPointAnnotationView';
import RouteView from './mapxus/components/RouteView';
import VisualNodeView from './mapxus/components/VisualNodeView';
import VisualView from './mapxus/components/VisualView';
import NavigationView from './mapxus/components/NavigationView';
import SimulateLocationManager from './mapxus/components/SimulateLocationManager';
import buildingSearchManager from './mapxus/modules/buildingSearchManager';
import geocodeSearchManager from './mapxus/modules/geocodeSearchManager';
import poiCategorySearchManager from './mapxus/modules/poiCategorySearchManager';
import poiSearchManager from './mapxus/modules/poiSearchManager';
import routeSearchManager from './mapxus/modules/routeSearchManager';
import visualSearchManager from './mapxus/modules/visualSearchManager';

const { MapxusSdk } = NativeModules;
const MapxusMapLocation = isAndroid() && MapxusMapLocationAndroid;

// components
const MapRenderer = {
	MapboxGL: {
		...MapboxGL
	}
};
MapxusSdk.MapxusMap = MapxusMap;
MapxusSdk.MapxusPointAnnotationView = MapxusPointAnnotationView;
MapxusSdk.VisualNodeView = VisualNodeView;
MapxusSdk.VisualView = VisualView;
MapxusSdk.RouteView = RouteView;
MapxusSdk.NavigationView = NavigationView;
MapxusSdk.SimulateLocationManager = SimulateLocationManager;
if (MapxusMapLocation) {
	MapxusSdk.MapxusMapLocation = MapxusMapLocation;
}

// modules
MapxusSdk.buildingSearchManager = buildingSearchManager;
MapxusSdk.poiSearchManager = poiSearchManager;
MapxusSdk.poiCategorySearchManager = poiCategorySearchManager;
MapxusSdk.routeSearchManager = routeSearchManager;
MapxusSdk.visualSearchManager = visualSearchManager;
MapxusSdk.geocodeSearchManager = geocodeSearchManager;

export {
	MapRenderer,
	MapxusMap,
	MapxusPointAnnotationView,
	VisualNodeView,
	VisualView,
	RouteView,
	NavigationView,
	SimulateLocationManager,
	MapxusMapLocation,
	buildingSearchManager,
	poiSearchManager,
	poiCategorySearchManager,
	routeSearchManager,
	visualSearchManager,
	geocodeSearchManager,
};

export default MapxusSdk;
