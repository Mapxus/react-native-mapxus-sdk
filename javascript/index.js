// main index.js

import {
	NativeModules,
} from 'react-native';

// import * as Mapbox from './maprenderer';
import { isAndroid } from './maprenderer/utils';

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

// MapxusSdk.mapRenderer = Mapbox;
// components
MapxusSdk.MapxusMap = MapxusMap;
MapxusSdk.MapxusPointAnnotationView = MapxusPointAnnotationView;
MapxusSdk.RouteView = RouteView;
MapxusSdk.VisualNodeView = VisualNodeView;
MapxusSdk.VisualView = VisualView;
MapxusSdk.NavigationView = NavigationView;
MapxusSdk.SimulateLocationManager = SimulateLocationManager;
if (MapxusMapLocation) {
	MapxusSdk.MapxusMapLocation = MapxusMapLocation;
}

// modules
MapxusSdk.buildingSearchManager = buildingSearchManager;
MapxusSdk.geocodeSearchManager = geocodeSearchManager;
MapxusSdk.poiCategorySearchManager = poiCategorySearchManager;
MapxusSdk.poiSearchManager = poiSearchManager;
MapxusSdk.routeSearchManager = routeSearchManager;
MapxusSdk.visualSearchManager = visualSearchManager;

export {
	// Mapbox,
	MapxusMap,
	MapxusPointAnnotationView,
	RouteView,
	VisualNodeView,
	VisualView,
	NavigationView,
	SimulateLocationManager,
	MapxusMapLocation,
	buildingSearchManager,
	geocodeSearchManager,
	poiCategorySearchManager,
	poiSearchManager,
	routeSearchManager,
	visualSearchManager
};

export default MapxusSdk;
