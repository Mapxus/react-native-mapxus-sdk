// main index.js

import {
	Animated as RNAnimated,
	NativeModules,
	PermissionsAndroid,
} from 'react-native';

import {isAndroid} from './utils';
import MapView from './components/MapView';
import Light from './components/Light';
import PointAnnotation from './components/PointAnnotation';
import Annotation from './components/annotations/Annotation'; // eslint-disable-line import/no-cycle
import Callout from './components/Callout';
import Camera from './components/Camera';
import VectorSource from './components/VectorSource';
import ShapeSource from './components/ShapeSource';
import RasterSource from './components/RasterSource';
import ImageSource from './components/ImageSource';
import Images from './components/Images';
import FillLayer from './components/FillLayer';
import FillExtrusionLayer from './components/FillExtrusionLayer';
import HeatmapLayer from './components/HeatmapLayer';
import LineLayer from './components/LineLayer';
import CircleLayer from './components/CircleLayer';
import SymbolLayer from './components/SymbolLayer';
import RasterLayer from './components/RasterLayer';
import BackgroundLayer from './components/BackgroundLayer';
import locationManager from './modules/location/locationManager';
import offlineManager from './modules/offline/offlineManager';
import snapshotManager from './modules/snapshot/snapshotManager';
import MarkerView from './components/MarkerView';
import Animated from './utils/animated/Animated';
import AnimatedMapPoint from './utils/animated/AnimatedPoint';
import AnimatedShape from './utils/animated/AnimatedShape';
import AnimatedCoordinatesArray from './utils/animated/AnimatedCoordinatesArray';
import AnimatedExtractCoordinateFromArray from './utils/animated/AnimatedExtractCoordinateFromArray';
import AnimatedRouteCoordinatesArray from './utils/animated/AnimatedRouteCoordinatesArray';
import Style from './components/Style';
import Logger from './utils/Logger';
import MapxusMap from './mapxus/components/MapxusMap';
import MapxusMapLocationAndroid from './mapxus/components/MapxusMapLocation.android';
import UserLocation from './components/UserLocation'; // eslint-disable-line import/no-cycle
import MapxusPointAnnotationView from './mapxus/components/MapxusPointAnnotationView';
import VisualNodeView from './mapxus/components/VisualNodeView';
import VisualView from './mapxus/components/VisualView';
import NavigationView from './mapxus/components/NavigationView';
import buildingSearchManager from './mapxus/module/buildingSearchManager';
import geocodeSearchManager from './mapxus/module/geocodeSearchManager';
import poiCategorySearchManager from './mapxus/module/poiCategorySearchManager';
import poiSearchManager from './mapxus/module/poiSearchManager';
import routeSearchManager from './mapxus/module/routeSearchManager';
import visualSearchManager from './mapxus/module/visualSearchManager';

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
MapxusSdk.VisualNodeView = VisualNodeView;
MapxusSdk.VisualView = VisualView;
MapxusSdk.NavigationView = NavigationView;
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
	VisualNodeView,
	VisualView,
	NavigationView,
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
