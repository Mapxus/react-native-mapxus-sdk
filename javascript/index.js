// main index.js

import {
	Animated as RNAnimated,
	NativeModules,
	PermissionsAndroid,
} from 'react-native';

import {isAndroid} from './maprenderer/utils';
import MapView from './maprenderer/components/MapView';
import Light from './maprenderer/components/Light';
import PointAnnotation from './maprenderer/components/PointAnnotation';
import Annotation from './maprenderer/components/annotations/Annotation'; // eslint-disable-line import/no-cycle
import Callout from './maprenderer/components/Callout';
import Camera from './maprenderer/components/Camera';
import VectorSource from './maprenderer/components/VectorSource';
import ShapeSource from './maprenderer/components/ShapeSource';
import RasterSource from './maprenderer/components/RasterSource';
import ImageSource from './maprenderer/components/ImageSource';
import Images from './maprenderer/components/Images';
import FillLayer from './maprenderer/components/FillLayer';
import FillExtrusionLayer from './maprenderer/components/FillExtrusionLayer';
import HeatmapLayer from './maprenderer/components/HeatmapLayer';
import LineLayer from './maprenderer/components/LineLayer';
import CircleLayer from './maprenderer/components/CircleLayer';
import SymbolLayer from './maprenderer/components/SymbolLayer';
import RasterLayer from './maprenderer/components/RasterLayer';
import BackgroundLayer from './maprenderer/components/BackgroundLayer';
import locationManager from './maprenderer/modules/location/locationManager';
import offlineManager from './maprenderer/modules/offline/offlineManager';
import snapshotManager from './maprenderer/modules/snapshot/snapshotManager';
import MarkerView from './maprenderer/components/MarkerView';
import Animated from './maprenderer/utils/animated/Animated';
import AnimatedMapPoint from './maprenderer/utils/animated/AnimatedPoint';
import AnimatedShape from './maprenderer/utils/animated/AnimatedShape';
import AnimatedCoordinatesArray from './maprenderer/utils/animated/AnimatedCoordinatesArray';
import AnimatedExtractCoordinateFromArray from './maprenderer/utils/animated/AnimatedExtractCoordinateFromArray';
import AnimatedRouteCoordinatesArray from './maprenderer/utils/animated/AnimatedRouteCoordinatesArray';
import Style from './maprenderer/components/Style';
import Logger from './maprenderer/utils/Logger';
import MapxusMap from './mapxus/components/MapxusMap';
import MapxusMapLocationAndroid from './mapxus/components/MapxusMapLocation.android';
import UserLocation from './maprenderer/components/UserLocation'; // eslint-disable-line import/no-cycle
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

const {MapxusSdk} = NativeModules;
const MapxusMapLocation = isAndroid() && MapxusMapLocationAndroid;

// static methods
MapxusSdk.requestAndroidLocationPermissions = async function () {
	if (isAndroid()) {
		const res = await PermissionsAndroid.requestMultiple([
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
			PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
			PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
		]);
		
		if (!res) {
			return false;
		}
		
		const permissions = Object.keys(res);
		for (const permission of permissions) {
			if (res[permission] === PermissionsAndroid.RESULTS.GRANTED) {
				return true;
			}
		}
		
		return false;
	}
	
	throw new Error('You should only call this method on Android!');
};

MapxusSdk.UserTrackingModes = Camera.UserTrackingModes;

// components
MapxusSdk.MapxusMap = MapxusMap;
MapxusSdk.MapxusPointAnnotationView = MapxusPointAnnotationView;
MapxusSdk.RouteView = RouteView;
MapxusSdk.VisualNodeView = VisualNodeView;
MapxusSdk.VisualView = VisualView;
MapxusSdk.NavigationView = NavigationView;
MapxusSdk.SimulateLocationManager = SimulateLocationManager;
MapxusSdk.buildingSearchManager = buildingSearchManager;
MapxusSdk.geocodeSearchManager = geocodeSearchManager;
MapxusSdk.poiCategorySearchManager = poiCategorySearchManager;
MapxusSdk.poiSearchManager = poiSearchManager;
MapxusSdk.routeSearchManager = routeSearchManager;
MapxusSdk.visualSearchManager = visualSearchManager;

MapxusSdk.MapView = MapView;
MapxusSdk.Light = Light;
MapxusSdk.PointAnnotation = PointAnnotation;
MapxusSdk.Callout = Callout;
MapxusSdk.UserLocation = UserLocation;
MapxusSdk.Camera = Camera;
MapxusSdk.Style = Style;
MapxusSdk.UserLocation = UserLocation;
if (MapxusMapLocation) {
	MapxusSdk.MapxusMapLocation = MapxusMapLocation;
}

// annotations
MapxusSdk.Annotation = Annotation;
MapxusSdk.MarkerView = MarkerView;

// sources
MapxusSdk.VectorSource = VectorSource;
MapxusSdk.ShapeSource = ShapeSource;
MapxusSdk.RasterSource = RasterSource;
MapxusSdk.ImageSource = ImageSource;
MapxusSdk.Images = Images;

// layers
MapxusSdk.FillLayer = FillLayer;
MapxusSdk.FillExtrusionLayer = FillExtrusionLayer;
MapxusSdk.HeatmapLayer = HeatmapLayer;
MapxusSdk.LineLayer = LineLayer;
MapxusSdk.CircleLayer = CircleLayer;
MapxusSdk.SymbolLayer = SymbolLayer;
MapxusSdk.RasterLayer = RasterLayer;
MapxusSdk.BackgroundLayer = BackgroundLayer;

// modules
MapxusSdk.locationManager = locationManager;
MapxusSdk.offlineManager = offlineManager;
MapxusSdk.snapshotManager = snapshotManager;

// animated
MapxusSdk.Animated = Animated;

// utils
MapxusSdk.AnimatedPoint = AnimatedMapPoint;
MapxusSdk.AnimatedCoordinatesArray = AnimatedCoordinatesArray;
MapxusSdk.AnimatedExtractCoordinateFromArray = AnimatedExtractCoordinateFromArray;
MapxusSdk.AnimatedRouteCoordinatesArray = AnimatedRouteCoordinatesArray;
MapxusSdk.AnimatedShape = AnimatedShape;
MapxusSdk.Logger = Logger;

const {LineJoin} = MapxusSdk;

export {
	MapxusMap,
	MapxusPointAnnotationView,
	RouteView,
	VisualNodeView,
	VisualView,
	NavigationView,
	SimulateLocationManager,
	buildingSearchManager,
	geocodeSearchManager,
	poiCategorySearchManager,
	poiSearchManager,
	routeSearchManager,
	visualSearchManager,
	MapView,
	Light,
	PointAnnotation,
	Callout,
	UserLocation,
	Camera,
	Annotation,
	MarkerView,
	VectorSource,
	ShapeSource,
	RasterSource,
	ImageSource,
	Images,
	FillLayer,
	FillExtrusionLayer,
	HeatmapLayer,
	LineLayer,
	CircleLayer,
	SymbolLayer,
	RasterLayer,
	BackgroundLayer,
	locationManager,
	offlineManager,
	snapshotManager,
	AnimatedMapPoint,
	AnimatedCoordinatesArray,
	AnimatedShape,
	Animated,
	LineJoin,
	Logger,
	Style,
	MapxusMapLocation
};

export default MapxusSdk;
