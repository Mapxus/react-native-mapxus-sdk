declare module '@mapxus/react-native-mapxus-sdk';

import {
  Component,
  ReactNode,
  SyntheticEvent,
} from 'react';

import {
  ViewProps,
  ViewStyle,
  StyleProp,
  ImageSourcePropType,
  Insets
} from 'react-native';

import {
  Geometry as TurfGeometry,
  Properties,
  Position,
  Feature,
  LineString,
  Coord,
  Units,
  BBox,
  Id,
  FeatureCollection,
} from '@turf/helpers';

// prettier-ignore
type ExpressionName =
  // Types
  | 'array' | 'boolean' | 'collator' | 'format' | 'literal' | 'number' | 'object' | 'string'
  | 'to-boolean' | 'to-color' | 'to-number' | 'to-string' | 'typeof'
  // Feature data
  | 'feature-state' | 'geometry-type' | 'id' | 'line-progress' | 'properties'
  // Lookup
  | 'at' | 'get' | 'has' | 'length'
  // Decision
  | '!' | '!=' | '<' | '<=' | '==' | '>' | '>=' | 'all' | 'any' | 'case' | 'match' | 'coalesce'
  // Ramps, scales, curves
  | 'interpolate' | 'interpolate-hcl' | 'interpolate-lab' | 'step'
  // Variable binding
  | 'let' | 'var'
  // String
  | 'concat' | 'downcase' | 'is-supported-script' | 'resolved-locale' | 'upcase'
  // Color
  | 'rgb' | 'rgba'
  // Math
  | '-' | '*' | '/' | '%' | '^' | '+' | 'abs' | 'acos' | 'asin' | 'atan' | 'ceil' | 'cos' | 'e'
  | 'floor' | 'ln' | 'ln2' | 'log10' | 'log2' | 'max' | 'min' | 'pi' | 'round' | 'sin' | 'sqrt' | 'tan'
  // Zoom, Heatmap
  | 'zoom' | 'heatmap-density';

type ExpressionField =
  | string
  | number
  | boolean
  | Expression
  | ExpressionField[]
  | { [key: string]: ExpressionField };

export type Expression = [ExpressionName, ...ExpressionField[]];

type Anchor =
  | 'center'
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';
type Visibility = 'visible' | 'none';
type Alignment = 'map' | 'viewport';
type AutoAlignment = Alignment | 'auto';

type NamedStyles<T> = {
  [P in keyof T]:
  | SymbolLayerStyle
  | RasterLayerStyle
  | LineLayerStyle
  | FillLayerStyle
  | FillExtrusionLayerStyle
  | CircleLayerStyle
  | BackgroundLayerStyle;
};

export type MapboxGLEvent<
  T extends string,
  P = GeoJSON.Feature,
  V = Element
  > = SyntheticEvent<V, { type: T; payload: P }>;

export type OnPressEvent = {
  features: Array<GeoJSON.Feature>;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  point: {
    x: number;
    y: number;
  }
};

declare namespace MapxusSdk {
  function registerWithApiKey(apiKey: string, secret: string): void;
  function requestAndroidLocationPermissions(): Promise<boolean>;

  const offlineManager: OfflineManager;
  const snapshotManager: SnapshotManager;
  const locationManager: LocationManager;

  const buildingSearchManager: BuildingSearchManager;
  const geocodeSearchManager: GeocodeSearchManager;
  const poiCategorySearchManager: PoiCategorySearchManager;
  const poiSearchManager: PoiSearchManager;
  const routeSearchManager: RouteSearchManager;
  const visualSearchManager: VisualSearchManager;

  /**
   * GeoUtils
   */
  interface UnitsOptions {
    units?: Units;
  }

  interface PositionsOptions {
    bbox?: BBox;
    id?: Id;
  }

  namespace geoUtils {
    function makePoint<P = Properties>(coordinates: Position, properties?: P, options?: PositionsOptions): Feature<Point, P>;
    function makeLineString<P = Properties>(coordinates: Position[], properties?: P, options?: PositionsOptions): Feature<LineString, P>;
    function makeLatLngBounds<G = TurfGeometry, P = Properties>(northEastCoordinates: Position[], southWestCoordinates: Position[]): FeatureCollection<G, P>;
    function makeFeature<G = TurfGeometry, P = Properties>(geometry: G, properties?: P): Feature<G, P>;
    function makeFeatureCollection<G = TurfGeometry, P = Properties>(features: Array<FeatureCollection<G, P>>, options?: PositionsOptions): FeatureCollection<G, P>;
    function addToFeatureCollection<G = TurfGeometry, P = Properties>(newFeatureCollection: Array<FeatureCollection<G, P>>, newFeature: Feature<G, P>): FeatureCollection<G, P>;
    function calculateDistance(origin: Coord, dest: Coord, options?: UnitsOptions): number;
    function pointAlongLine(newLineString: Feature<LineString> | LineString, distAlong: number, options?: UnitsOptions): Feature<Point>;
    function getOrCalculateVisibleRegion(coord: { lon: number; lat: number }, zoomLevel: number, width: number, height: number, nativeRegion: { properties: { visibleBounds: number[] }; visibleBounds: number[] }): void;
  }

  namespace Animated {
    // sources
    class ShapeSource extends Component<ShapeSourceProps> { }
    class ImageSource extends Component<ImageSourceProps> { }

    // layers
    class FillLayer extends Component<FillLayerProps> { }
    class FillExtrusionLayer extends Component<FillExtrusionLayerProps> { }
    class LineLayer extends Component<LineLayerProps> { }
    class CircleLayer extends Component<CircleLayerProps> { }
    class SymbolLayer extends Component<SymbolLayerProps> { }
    class RasterLayer extends Component<RasterLayerProps> { }
    class BackgroundLayer extends Component<BackgroundLayerProps> { }
  }

  class BuildingSearchManager {
    buildingSearchGlobal(params: BuildingSearchGlobalProps): Promise<BuildingSearchResult>;
    buildingSearchOnBbox(params: BuildingSearchOnBboxProps): Promise<BuildingSearchResult>;
    buildingSearchNearbyCenter(params: BuildingSearchNearbyProps): Promise<BuildingSearchResult>;
    buildingSearchByIds(params: BuildingSearchByIdsProps): Promise<BuildingSearchResult>;
  }

  class GeocodeSearchManager {
    reverseGeoCode(params: ReverseGeoCodeSearchProps): Promise<GeocodeSearchResult>;
  }

  class PoiCategorySearchManager {
    poiCategorySearch(params: POICategorySearchProps): Promise<PoiCategorySearchResult>;
  }

  class PoiSearchManager {
    poiSearchInIndoorScene(params: PoiSearchInIndoorSceneProps): Promise<PoiSearchResult>;
    poiSearchOnBbox(params: PoiSearchOnBboxProps): Promise<PoiSearchResult>;
    poiSearchNearbyCenter(params: PoiSearchNearbyProps): Promise<PoiSearchResult>;
    poiSearchByIds(params: PoiSearchByIdsProps): Promise<PoiSearchResult>;
    orientationPoiSearch(params: OrientationPoiSearchProps): Promise<PoiSearchResult>;
  }

  class RouteSearchManager {
    routeSearch(params: RouteSearchProps): Promise<RouteSearchResult>;
  }

  class VisualSearchManager {
    searchVisualDataInBuilding(params: VisualSearchProps): Promise<object[]>;
  }

  /**
   * Components
   */
  class MapxusMap extends Component<MapxusMapProps> {
    setMapxusStyle(style: MapxusMapStyle): void;
    setMapxusStyleWithString(name: string): void;
    setMapLanguage(name: string): void;
    selectIndoorScene(zoomMode: MapxusZoomMode, insets: Insets, buildingId?: string, floor?: string): void;
  }

  class MapxusMapLocation extends Component<MapxusMapLocationProps> { }

  class VisualNodeView extends Component<VisualNodeViewProps> {
    renderFlagUsingNodes(nodes: object): void;
    cleanLayer(): void;
    changeOn(buildingId: string, floor: string): void;
  }

  class VisualView extends Component<VisualViewProps> {
    loadVisualViewWithFristImg(imageId: string): void;
    unloadVisualView(): void;
    moveToKey(key: string): void;
    moveCloseTo(buildingId: string, floor: string): void;
    resize(): void;
    getBearing(): Promise<number>;
    setBearing(bearing: number): void;
    getVisualCenter(): Promise<object>;
    setVisualCenter(center: object): void;
    getZoom(): Promise<number>;
    setZoom(zoom: number): void;
    activateBearing(): void;
    deactivateBearing(): void;
  }

  class NavigationView extends Component<NavigationViewProps> {
    getPainterPathDto(): Promise<PainterPathDtoProps>;
    paintRouteUsingPath(path: Path, points: IndoorPoint[]): void;
    cleanRoute(): void;
    changeOn(buildingId: string, floor: string): void;
    focusOn(keys: string[], insets: Insets): void;
  }

  class MapView extends Component<MapViewProps> {
    getPointInView(coordinate: GeoJSON.Position): Promise<GeoJSON.Position>;
    getCoordinateFromView(point: GeoJSON.Position): Promise<GeoJSON.Position>;
    getVisibleBounds(): Promise<GeoJSON.Position[]>;
    queryRenderedFeaturesAtPoint(
      coordinate: GeoJSON.Position,
      filter?: Expression,
      layerIds?: Array<string>,
    ): Promise<GeoJSON.FeatureCollection | undefined>;
    queryRenderedFeaturesInRect(
      coordinate: GeoJSON.Position,
      filter?: Expression,
      layerIds?: Array<string>,
    ): Promise<GeoJSON.FeatureCollection | undefined>;
    takeSnap(writeToDisk?: boolean): Promise<string>;
    getZoom(): Promise<number>;
    getCenter(): Promise<GeoJSON.Position>;
    showAttribution(): void;
    setSourceVisibility(visible: Boolean, sourceId: string, sourceLayerId?: string): void;
  }

  type Padding = number | [number, number] | [number, number, number, number];
  class Camera extends Component<CameraProps> {
    fitBounds(
      northEastCoordinates: GeoJSON.Position,
      southWestCoordinates: GeoJSON.Position,
      padding?: Padding,
      duration?: number,
    ): void;
    flyTo(coordinates: GeoJSON.Position, duration?: number): void;
    moveTo(coordinates: GeoJSON.Position, duration?: number): void;
    zoomTo(zoomLevel: number, duration?: number): void;
    setCamera(config: CameraSettings): void;
  }

  class UserLocation extends Component<UserLocationProps> { }

  interface Location {
    coords: Coordinates;
    timestamp?: number;
  }

  interface Coordinates {

    /**
     * The heading (measured in degrees) relative to true north.
     * Heading is used to describe the direction the device is pointing to (the value of the compass).
     * Note that on Android this is incorrectly reporting the course value as mentioned in issue https://github.com/react-native-mapbox-gl/maps/issues/1213
     * and will be corrected in a future update.
     */
    heading?: number;

    /**
     * The direction in which the device is traveling, measured in degrees and relative to due north.
     * The course refers to the direction the device is actually moving (not the same as heading).
     */
    course?: number;

    /**
     * The instantaneous speed of the device, measured in meters per second.
     */
    speed?: number;

    /**
     * The latitude in degrees.
     */
    latitude: number;

    /**
     * The longitude in degrees.
     */
    longitude: number;

    /**
     * The radius of uncertainty for the location, measured in meters.
     */
    accuracy?: number;

    /**
     * The altitude, measured in meters.
     */
    altitude?: number;

    /**
     * This is a logical representation that will vary on definition from building-to-building.
     * Floor 0 will always represent the floor designated as "ground".
     */
    ordinal?: number;
  }

  class Light extends Component<LightProps> { }

  class StyleSheet extends Component {
    static create<T extends NamedStyles<T> | NamedStyles<any>>(styles: T): void;
    camera(
      stops: { [key: number]: string },
      interpolationMode?: InterpolationMode,
    ): void;
    source(
      stops: { [key: number]: string },
      attributeName: string,
      interpolationMode?: InterpolationMode,
    ): void;
    composite(
      stops: { [key: number]: string },
      attributeName: string,
      interpolationMode?: InterpolationMode,
    ): void;

    identity(attributeName: string): number;
  }

  class MapxusPointAnnotationView extends Component<MapxusPointAnnotationViewProps> {
    refresh(): void;
  }

  class PointAnnotation extends Component<PointAnnotationProps> {
    refresh(): void;
  }
  class MarkerView extends Component<MarkerViewProps> { }
  class Callout extends Component<CalloutProps> { }
  interface Style extends React.FC<StyleProps> { }

  /**
   * Sources
   */
  class VectorSource extends Component<VectorSourceProps> { }
  class ShapeSource extends Component<ShapeSourceProps> { }
  class RasterSource extends Component<RasterSourceProps> { }

  /**
   * Layers
   */
  class BackgroundLayer extends Component<BackgroundLayerProps> { }
  class CircleLayer extends Component<CircleLayerProps> { }
  class FillExtrusionLayer extends Component<FillExtrusionLayerProps> { }
  class FillLayer extends Component<FillLayerProps> { }
  class LineLayer extends Component<LineLayerProps> { }
  class RasterLayer extends Component<RasterLayerProps> { }
  class SymbolLayer extends Component<SymbolLayerProps> { }
  class HeatmapLayer extends Component<HeatmapLayerProps> { }
  class Images extends Component<ImagesProps> { }
  class ImageSource extends Component<ImageSourceProps> { }

  class LocationManager extends Component {
    start(displacement?: number): void;
    stop(): void;
  }

  /**
   * Offline
   */
  class OfflineManager extends Component {
    createPack(
      options: OfflineCreatePackOptions,
      progressListener?: (pack: OfflinePack, status: OfflineProgressStatus) => void,
      errorListener?: (pack: OfflinePack, err: OfflineProgressError) => void
    ): Promise<void>;
    deletePack(name: string): Promise<void>;
    getPacks(): Promise<Array<OfflinePack>>;
    getPack(name: string): Promise<OfflinePack | undefined>;
    invalidateAmbientCache(): Promise<void>;
    clearAmbientCache(): Promise<void>;
    setMaximumAmbientCacheSize(size: number): Promise<void>;
    resetDatabase(): Promise<void>;
    setTileCountLimit(limit: number): void;
    setProgressEventThrottle(throttleValue: number): void;
    subscribe(
      packName: string,
      progressListener: (pack: OfflinePack, status: object) => void,
      errorListener?: (pack: OfflinePack, err: object) => void
    ): void;
    unsubscribe(packName: string): void;
  }

  class SnapshotManager {
    static takeSnap(options: SnapshotOptions): Promise<string>;
  }

  interface OfflineProgressStatus {
    name: string;
    state: number;
    percentage: number;
    completedResourceSize: number;
    completedTileCount: number;
    completedResourceCount: number;
    requiredResourceCount: number;
    completedTileSize: number;
  }

  interface OfflineProgressError {
    message: string;
    name: string;
  }

  interface OfflinePack {
    name: string,
    bounds: [GeoJSON.Position, GeoJSON.Position];
    metadata: any;
    status: () => Promise<OfflinePackStatus>,
    resume: () => Promise<void>,
    pause: () => Promise<void>,
  }

  interface OfflinePackStatus {
    name: string,
    state: number,
    percentage: number,
    completedResourceCount: number,
    completedResourceSize: number,
    completedTileSize: number,
    completedTileCount: number,
    requiredResourceCount: number,
  }

  /**
   * Constants
   */
  enum UserTrackingModes {
    Follow = 'normal',
    FollowWithHeading = 'compass',
    FollowWithCourse = 'course',
  }

  enum InterpolationMode {
    Exponential = 0,
    Categorical = 1,
    Interval = 2,
    Identity = 3,
  }

  enum StyleURL {
    Street = 'mapbox://styles/mapbox/streets-v11',
    Dark = 'mapbox://styles/mapbox/dark-v10',
    Light = 'mapbox://styles/mapbox/light-v10',
    Outdoors = 'mapbox://styles/mapbox/outdoors-v11',
    Satellite = 'mapbox://styles/mapbox/satellite-v9',
    SatelliteStreet = 'mapbox://styles/mapbox/satellite-streets-v11',
    TrafficDay = 'mapbox://styles/mapbox/navigation-preview-day-v4',
    TrafficNight = 'mapbox://styles/mapbox/navigation-preview-night-v4',
  }

  enum MapxusMapStyle {
    MAPXUS_V2,
    MAPXUS,
    COMMON,
    CHRISTMAS,
    HALLOWMAS,
    MAPPYBEE,
  }

  enum MapxusSelectorPosition {
    CENTER_LEFT,
    CENTER_RIGHT,
    BOTTOM_LEFT,
    BOTTOM_RIGHT,
    TOP_LEFT,
    TOP_RIGHT,
  }

  enum MapxusZoomMode {
    /**
     不缩放
     */
    DISABLE,
    /**
     通过动画缩放
     */
    ANIMATED,
    /**
     无动画缩放
     */
    DIRECT,
  }
}

export type AttributionPosition =
  | { top: number; left: number }
  | { top: number; right: number }
  | { bottom: number; left: number }
  | { bottom: number; right: number };

export interface RegionPayload {
  zoomLevel: number;
  heading: number;
  animated: boolean;
  isUserInteraction: boolean;
  visibleBounds: GeoJSON.Position[];
  pitch: number;
}

export interface Configuration {
  outdoorHidden?: boolean;
  defaultStyle?: MapxusSdk.MapxusMapStyle;
  defaultStyleName?: string;
  buildingId?: string;
  floor?: string;
  zoomInsets?: Insets;
  poiId?: string;
  zoomLevel?: number;
  // 仅Android
  language?: string;
}

export interface MapxusMapProps extends ViewProps {
  mapOption?: Configuration;
  selectFontColor?: string | number;
  selectBoxColor?: string | number;
  fontColor?: string | number;
  indoorControllerAlwaysHidden?: boolean;
  selectorPosition?: MapxusSdk.MapxusSelectorPosition;
  selectorPositionCustom?: Point;
  logoBottomMargin?: number;
  openStreetSourceBottomMargin?: number;
  outdoorHidden?: boolean;
  gestureSwitchingBuilding?: boolean;
  autoChangeBuilding?: boolean;

  onTappedOnPoi?: (feature: TappedOnPoiObject) => void;
  onTappedOnBlank?: (feature: TappedOnBlankObject) => void;
  onLongPressed?: (feature: LongPressedObject) => void;
  onIndoorSceneChange?: (feature: IndoorSceneChangeObject) => void;
  onIndoorStatusChange?: (feature: IndoorStatusChangeObject) => void;
}

export interface MapxusMapLocationProps extends ViewProps {
  followUserMode?: number;

  onLocationStarted?: () => void;
  onLocationStopped?: () => void;
  onLocationError?: (feature: AndroidLocationErronInfo) => void;
  onLocationChange?: (feature: AndroidLocation) => void;
  onCompassChange?: (feature: AndroidCompass) => void;
}

export interface VisualNodeViewProps extends ViewProps {
  onTappedFlag?: (feature: object) => void;
}

export interface VisualViewProps extends ViewProps {
  onLoadFail?: () => void;
  onRenderComplete?: () => void;
  onLoadingChanged?: (feature: object) => void;
  onBearingChanged?: (feature: object) => void;
  onNodeChanged?: (feature: object) => void;
}

export interface AndroidLocationErronInfo {
  errorCode: number;
  errorMessage: string;
}

export interface AndroidLocation {
  accuracy: number;
  longitude: number;
  latitude: number;
  timestamp: number;
  buildingId?: string;
  floor?: string;
}

export interface AndroidCompass {
  orientation: number;
  sensorAccuracy: number;
}

export interface NavigationViewProps extends ViewProps {

}

export interface MapViewProps extends ViewProps {
  animated?: boolean;
  userTrackingMode?: MapxusSdk.UserTrackingModes;
  userLocationVerticalAlignment?: number;
  contentInset?: Array<number>;
  style?: StyleProp<ViewStyle>;
  styleURL?: string;
  styleJSON?: string;
  localizeLabels?: boolean;
  zoomEnabled?: boolean;
  scrollEnabled?: boolean;
  pitchEnabled?: boolean;
  rotateEnabled?: boolean;
  attributionEnabled?: boolean;
  attributionPosition?: AttributionPosition;
  logoEnabled?: boolean;
  compassEnabled?: boolean;
  compassViewPosition?: number;
  compassViewMargins?: Point;
  surfaceView?: boolean;
  regionWillChangeDebounceTime?: number;
  regionDidChangeDebounceTime?: number;

  onPress?: (feature: GeoJSON.Feature) => void;
  onLongPress?: (feature: GeoJSON.Feature) => void;
  onRegionWillChange?: (
    feature: GeoJSON.Feature<GeoJSON.Point, RegionPayload>,
  ) => void;
  onRegionIsChanging?: (
    feature: GeoJSON.Feature<GeoJSON.Point, RegionPayload>,
  ) => void;
  onRegionDidChange?: (
    feature: GeoJSON.Feature<GeoJSON.Point, RegionPayload>,
  ) => void;
  onUserLocationUpdate?: (feature: MapxusSdk.Location) => void;
  onWillStartLoadingMap?: () => void;
  onDidFinishLoadingMap?: () => void;
  onDidFailLoadingMap?: () => void;
  onWillStartRenderingFrame?: () => void;
  onDidFinishRenderingFrame?: () => void;
  onDidFinishRenderingFrameFully?: () => void;
  onWillStartRenderingMap?: () => void;
  onDidFinishRenderingMap?: () => void;
  onDidFinishRenderingMapFully?: () => void;
  onDidFinishLoadingStyle?: () => void;
  onUserTrackingModeChange?: () => void;
}

export interface CameraProps extends CameraSettings, ViewProps {
  animationDuration?: number;
  animationMode?: 'flyTo' | 'easeTo' | 'moveTo';
  defaultSettings?: CameraSettings;
  minZoomLevel?: number;
  maxZoomLevel?: number;
  maxBounds?: { ne: [number, number]; sw: [number, number] };
  followUserLocation?: boolean;
  followUserMode?: 'normal' | 'compass' | 'course';
  followZoomLevel?: number;
  followPitch?: number;
  followHeading?: number;
  triggerKey?: any;
  alignment?: number[];
  onUserTrackingModeChange?: (
    event: MapboxGLEvent<
      'usertrackingmodechange',
      {
        followUserLocation: boolean;
        followUserMode: 'normal' | 'compass' | 'course' | null;
      }
    >,
  ) => void;
}

export interface CameraSettings {
  centerCoordinate?: GeoJSON.Position;
  heading?: number;
  pitch?: number;
  bounds?: {
    ne: GeoJSON.Position;
    sw: GeoJSON.Position;
    paddingLeft?: number;
    paddingRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
  };
  zoomLevel?: number;
  animationDuration?: number;
  animationMode?: 'flyTo' | 'easeTo' | 'moveTo';
  stops?: CameraSettings[];
}

export interface UserLocationProps {
  androidRenderMode?: 'normal' | 'compass' | 'gps'
  animated?: boolean;
  children?: ReactNode;
  minDisplacement?: number;
  onPress?: () => void;
  onUpdate?: (location: MapxusSdk.Location) => void;
  renderMode?: 'normal' | 'native';
  showsUserHeadingIndicator?: boolean,
  visible?: boolean;
}

export type WithExpression<T> = {
  [P in keyof T]: T[P] | Expression;
};

export interface LightStyle {
  anchor?: Alignment | Expression;
  position?: GeoJSON.Position | Expression;
  positionTransition?: Transition | Expression;
  color?: string | Expression;
  colorTransition?: Transition | Expression;
  intensity?: number | Expression;
  intensityTransition?: Transition | Expression;
}

export interface Transition {
  duration: number;
  delay: number;
}

export interface BackgroundLayerStyle {
  visibility?: Visibility | Expression;
  backgroundColor?: string | Expression;
  backgroundColorTransition?: Transition | Expression;
  backgroundPattern?: string | Expression;
  backgroundPatternTransition?: Transition | Expression;
  backgroundOpacity?: number | Expression;
  backgroundOpacityTransition?: Transition | Expression;
}

export interface CircleLayerStyle {
  visibility?: Visibility | Expression;
  circleRadius?: number | Expression;
  circleRadiusTransition?: Transition | Expression;
  circleColor?: string | Expression;
  circleColorTransition?: Transition | Expression;
  circleBlur?: number | Expression;
  circleBlurTransition?: Transition | Expression;
  circleOpacity?: number | Expression;
  circleOpacityTransition?: Transition | Expression;
  circleTranslate?: Array<number> | Expression;
  circleTranslateTransition?: Transition | Expression;
  circleTranslateAnchor?: Alignment | Expression;
  circlePitchScale?: Alignment | Expression;
  circlePitchAlignment?: Alignment | Expression;
  circleStrokeWidth?: number | Expression;
  circleStrokeWidthTransition?: Transition | Expression;
  circleStrokeColor?: string | Expression;
  circleStrokeColorTransition?: Transition | Expression;
  circleStrokeOpacity?: number | Expression;
  circleStrokeOpacityTransition?: Transition | Expression;
}

export interface FillExtrusionLayerStyle {
  visibility?: Visibility | Expression;
  fillExtrusionOpacity?: number | Expression;
  fillExtrusionOpacityTransition?: Transition | Expression;
  fillExtrusionColor?: string | Expression;
  fillExtrusionColorTransition?: Transition | Expression;
  fillExtrusionTranslate?: Array<number> | Expression;
  fillExtrusionTranslateTransition?: Transition | Expression;
  fillExtrusionTranslateAnchor?: Alignment | Expression;
  fillExtrusionPattern?: string | Expression;
  fillExtrusionPatternTransition?: Transition | Expression;
  fillExtrusionHeight?: number | Expression;
  fillExtrusionHeightTransition?: Transition | Expression;
  fillExtrusionBase?: number | Expression;
  fillExtrusionBaseTransition?: Transition | Expression;
}

export interface FillLayerStyle {
  visibility?: Visibility | Expression;
  fillAntialias?: boolean | Expression;
  fillOpacity?: number | Expression;
  fillExtrusionOpacityTransition?: Transition | Expression;
  fillColor?: string | Expression;
  fillColorTransition?: Transition | Expression;
  fillOutlineColor?: string | Expression;
  fillOutlineColorTransition?: Transition | Expression;
  fillTranslate?: Array<number> | Expression;
  fillTranslateTransition?: Transition | Expression;
  fillTranslateAnchor?: Alignment | Expression;
  fillPattern?: string | Expression;
  fillPatternTransition?: Transition | Expression;
}

export interface LineLayerStyle {
  lineCap?: 'butt' | 'round' | 'square' | Expression;
  lineJoin?: 'bevel' | 'round' | 'miter' | Expression;
  lineMiterLimit?: number | Expression;
  lineRoundLimit?: number | Expression;
  visibility?: Visibility | Expression;
  lineOpacity?: number | Expression;
  lineOpacityTransition?: Transition | Expression;
  lineColor?: string | Expression;
  lineColorTransition?: Transition | Expression;
  lineTranslate?: Array<number> | Expression;
  lineTranslateTransition?: Transition | Expression;
  lineTranslateAnchor?: Alignment | Expression;
  lineWidth?: number | Expression;
  lineWidthTransition?: Transition | Expression;
  lineGapWidth?: number | Expression;
  lineGapWidthTransition?: Transition | Expression;
  lineOffset?: number | Expression;
  lineOffsetTransition?: Transition | Expression;
  lineBlur?: number | Expression;
  lineBlurTransition?: Transition | Expression;
  lineDasharray?: Array<number> | Expression;
  lineDasharrayTransition?: Transition | Expression;
  linePattern?: string | Expression;
  linePatternTransition?: Transition | Expression;
}

export interface RasterLayerStyle {
  visibility?: Visibility | Expression;
  rasterOpacity?: number | Expression;
  rasterOpacityTransition?: Transition | Expression;
  rasterHueRotate?: Expression;
  rasterHueRotateTransition?: Transition | Expression;
  rasterBrightnessMin?: number | Expression;
  rasterBrightnessMinTransition?: Transition | Expression;
  rasterBrightnessMax?: number | Expression;
  rasterBrightnessMaxTransition?: Transition | Expression;
  rasterSaturation?: number | Expression;
  rasterSaturationTransition?: Transition | Expression;
  rasterContrast?: number | Expression;
  rasterContrastTransition?: Transition | Expression;
  rasterFadeDuration?: number | Expression;
}

export type TextVariableAnchorValues = "center" | "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right";

export interface SymbolLayerStyle {
  symbolPlacement?: 'point' | 'line' | Expression;
  symbolSpacing?: number | Expression;
  symbolAvoidEdges?: boolean | Expression;
  symbolZOrder?: 'auto' | 'viewport-y' | 'source' | Expression;
  iconAllowOverlap?: boolean | Expression;
  iconIgnorePlacement?: boolean | Expression;
  iconOptional?: boolean | Expression;
  iconRotationAlignment?: AutoAlignment | Expression;
  iconSize?: number | Expression;
  iconTextFit?: 'none' | 'width' | 'height' | 'both' | Expression;
  iconTextFitPadding?: Array<number> | Expression;
  iconImage?: string | Expression;
  iconRotate?: number | Expression;
  iconPadding?: number | Expression;
  iconKeepUpright?: boolean | Expression;
  iconOffset?: Array<number> | Expression;
  iconAnchor?: Anchor | Expression;
  iconPitchAlignment?: AutoAlignment | Expression;
  textPitchAlignment?: AutoAlignment | Expression;
  textRotationAlignment?: AutoAlignment | Expression;
  textField?: string | Expression;
  textFont?: Array<string> | Expression;
  textSize?: number | Expression;
  textMaxWidth?: number | Expression;
  textLineHeight?: number | Expression;
  textLetterSpacing?: number | Expression;
  textJustify?: 'left' | 'center' | 'right' | Expression;
  textAnchor?: Anchor | Expression;
  textMaxAngle?: number | Expression;
  textRotate?: number | Expression;
  textPadding?: number | Expression;
  textKeepUpright?: boolean | Expression;
  textTransform?: 'none' | 'uppercase' | 'lowercase' | Expression;
  textOffset?: Array<number> | Expression;
  textAllowOverlap?: boolean | Expression;
  textIgnorePlacement?: boolean | Expression;
  textOptional?: boolean | Expression;
  textVariableAnchor?: Array<TextVariableAnchorValues>;
  textRadialOffset?: number | Expression;
  visibility?: Visibility | Expression;
  iconOpacity?: number | Expression;
  iconOpacityTransition?: Transition | Expression;
  iconColor?: string | Expression;
  iconColorTransition?: Transition | Expression;
  iconHaloColor?: string | Expression;
  iconHaloColorTransition?: Transition | Expression;
  iconHaloWidth?: number | Expression;
  iconHaloWidthTransition?: Transition | Expression;
  iconHaloBlur?: number | Expression;
  iconHaloBlurTransition?: Transition | Expression;
  iconTranslate?: Array<number> | Expression;
  iconTranslateTransition?: Transition | Expression;
  iconTranslateAnchor?: Alignment | Expression;
  textOpacity?: number | Expression;
  textOpacityTransition?: Transition | Expression;
  textColor?: string | Expression;
  textColorTransition?: Transition | Expression;
  textHaloColor?: string | Expression;
  textHaloColorTransition?: Transition | Expression;
  textHaloWidth?: number | Expression;
  textHaloWidthTransition?: Transition | Expression;
  textHaloBlur?: number | Expression;
  textHaloBlurTransition?: Transition | Expression;
  textTranslate?: Array<number> | Expression;
  textTranslateTransition?: Transition | Expression;
  textTranslateAnchor?: Alignment | Expression;
}

export interface HeatmapLayerStyle {
  visibility?: Visibility | Expression;
  heatmapRadius?: number | Expression;
  heatmapRadiusTransition?: Transition | Expression;
  heatmapWeight?: number | Expression;
  heatmapIntensity?: number | Expression;
  heatmapIntensityTransition?: Transition | Expression;
  heatmapColor?: string | Expression;
  heatmapOpacity?: number | Expression;
  heatmapOpacityTransition?: Transition | Expression;
}

export interface Point {
  x: number;
  y: number;
}

export interface LightProps extends Omit<ViewProps, 'style'> {
  style?: LightStyle;
}

export interface TappedOnPoiObject {
  poi: GeoPoi;
  coordinates: GeoPoint;
  floor: string;
  building: GeoBuilding;
}

export interface TappedOnBlankObject {
  coordinates: GeoPoint;
  floor: string;
  building: GeoBuilding;
}

export interface LongPressedObject {
  coordinates: GeoPoint;
  floor: string;
  building: GeoBuilding;
}

export interface IndoorSceneChangeObject {
  floor: string;
  building: GeoBuilding;
}

export interface IndoorStatusChangeObject {
  flag: boolean;
  floor: string;
  buildingId: string;
}

export interface GeoPoi {
  identifier: string;
  buildingId: string;
  floor: string;
  floorId: string;
  ordinal: number;
  coordinate: GeoPoint;
  name: string;
  name_en: string;
  name_cn: string;
  name_zh: string;
  name_ja: string;
  name_ko: string;
  accessibilityDetail: string;
  accessibilityDetail_en: string;
  accessibilityDetail_cn: string;
  accessibilityDetail_zh: string;
  accessibilityDetail_ja: string;
  accessibilityDetail_ko: string;
  category: string[];
}

export interface GeoBuilding {
  identifier: string;
  building: string;
  venueId: string;
  name: string;
  name_en: string;
  name_cn: string;
  name_zh: string;
  name_ja: string;
  name_ko: string;
  floors: Floor[];
  ground_floor: string;
  type: string;
}

export interface BuildingSearchResult {
  total: number;
  buildings: Building[];
}

export interface Building {

  /**
   * ID of the building
   */
  buildingId: string;

  /**
   * ID of the venue
   */
  venueId?: string;

  /**
   * Default venue name
   */
  venueName_default?: string;

  /**
   * Name of venue in English
   */
  venueName_en?: string;

  /**
   * Name of venue in Simplified Chinese
   */
  venueName_cn?: string;

  /**
   * Name of venue in Traditional Chinese
   */
  venueName_zh?: string;

  /**
   * Name of venue in Japanese
   */
  venueName_ja?: string;

  /**
   * Name of venue in Korean
   */
  venueName_ko?: string;

  /**
   * Default building name
   */
  name_default?: string;

  /**
   * Building name in English
   */
  name_en?: string;

  /**
   * Building name in Simplified Chinese
   */
  name_cn?: string;

  /**
   * Building name in Traditional Chinese
   */
  name_zh?: string;

  /**
   * Building name in Japanese
   */
  name_ja?: string;

  /**
   * Building name in Korean
   */
  name_ko?: string;

  /**
   * Default adress
   */
  address_default?: Address;

  /** 
   * Adress in English
   */
  address_en?: Address;

  /**
   * Adress in Simplified Chinese
   */
  address_cn?: Address;

  /**
   * Adress in Traditional Chinese
   */
  address_zh?: Address;

  /**
   * Adress in Japanese
   */
  address_ja?: Address;

  /**
   * Adress in Korean
   */
  address_ko?: Address;

  /**
   * Building type, indicating the classification of the building, e.g. cathedral, car_park, hospital, office, retail, etc.
   */
  type?: string;

  /**
   * External rectangular area where the building is located
   */
  bbox?: Bbox;

  /**
   * Tags latitude and longitude
   */
  labelCenter?: GeoPoint;

  /**
   * All floors of the building
   */
  floors: Floor[];

  /**
   * Building ground floor
   */
  groundFloor?: string;

  /**
   * Country of residence
   */
  country?: string;

  /**
   * Region of residence
   */
  region?: string;

  /**
   * City of residence
   */
  city?: string;

  /**
   * Visual map identifiers
   */
  hasVisualMap: boolean;
}

export interface Address {
  housenumber?: string;
  street?: string;
}

export interface Bbox {
  min_latitude: number;
  min_longitude: number;
  max_latitude: number;
  max_longitude: number;
}

export interface GeoPoint {
  latitude: number;
  longitude: number;
  elevation?: number;
}

export interface Floor {
  code: string;
  floorId: string;
  ordinal: number;
  hasVisualMap: boolean;
}

export interface GeocodeSearchResult {
  building: Building;
  floor: Floor;
}

export interface PoiCategorySearchResult {
  category: Category[];
}

export interface Category {
  category: string;
  categoryId: string;
  categoryDescription: string;
  title_en: string;
  title_cn: string;
  title_zh: string;
}

export interface PoiSearchResult {
  total?: number;
  pois: Poi[];
}

export interface Poi {

  /**
   * ID of the POI
   */
  id: string;

  /**
   * ID of the building
   */
  buildingId?: string;

  /**
   * ID of the venue
   */
  venueId?: string;

  /**
   * Floor where the POI is located
   */
  floor?: string;

  /**
   * Floor id of the floor where the POI is located
   */
  floorId?: string;

  /**
   * Longitude and latitude of the POI
   */
  location?: GeoPoint;

  /**
   * POI classification
   */
  category: string[];

  /**
   * POI Description
   */
  introduction?: string;

  /**
   * POI Mailbox
   */
  email?: string;

  /**
   * Default POI Name
   */
  name_default?: string;

  /**
   * POI English Name
   */
  name_en?: string;

  /**
   * POI Simplified Chinese Name
   */
  name_cn?: string;

  /**
   * POI Traditional Chinese Name
   */
  name_zh?: string;

  /**
   * POI Japanese name
   */
  name_ja?: string;

  /**
   * POI Korean Name
   */
  name_ko?: string;

  /**
   * Default Accessibility Information
   */
  accessibilityDetail?: string;

  /**
   * English Accessibility Information
   */
  accessibilityDetail_en?: string;

  /**
   * Accessibility information in Simplified Chinese
   */
  accessibilityDetail_cn?: string;

  /**
   * Traditional Chinese Accessibility Information
   */
  accessibilityDetail_zh?: string;

  /**
   * Japanese Accessibility Information
   */
  accessibilityDetail_ja?: string;

  /**
   * Korean Accessibility Information
   */
  accessibilityDetail_ko?: string;

  /**
   * Opening times
   */
  openingHours?: string;

  /**
   * Shop Phone
   */
  phone?: string;

  /**
   * Shop URL
   */
  website?: string;

  /**
   * Distance from the centre of the request
   */
  distance?: number;

  /**
   * Clockwise angle of the phone pointing to the line connecting the POI point and the centre of the request
   */
  angle?: number;
}

export interface RouteSearchResult {

  /**
   * List of passing points
   */
  wayPointList: IndoorPoint[];

  /**
   * Queue for route `MXMPath`, different routes for different planning options
   */
  paths: Path[];
}

export interface IndoorPoint extends GeoPoint {
  buildingId: string;
  floor: string;
}

export interface Path {

  /**
   * Total distance of the route in metres (m)
   */
  distance: number;

  /**
   * Weights
   */
  weight: number;

  /**
   * Total time of the route in milliseconds (ms)
   */
  time: number;

  /**
   * Enclosing box for the route
   */
  bbox: Bbox;

  /**
   * Information on the coordinates of the route
   */
  points: Geometry;

  /**
   * Instruction information groups for routes
   */
  instructions: Instruction[];
}

export interface Geometry {

  /**
   * Types of route geometries
   */
  type: string;

  /**
   * An array of coordinates for the route
   */
  coordinates: GeoPoint[];
}

export interface Instruction {

  /**
   * Building id of the building in which this instruction is located
   */
  buildingId?: string;

  /**
   * The floor of the building where this instruction is located
   */
  floor?: string;

  /**
   * Road name
   */
  streetName?: string;

  /**
   * Distance of this instruction in metres (m)
   */
  distance: number;

  /**
   * The direction, clockwise of the northward angle is given as between 0 and 360 degrees.
   */
  heading: number;

  /**
   * Command symbols
   */
  sign: number;

  /**
   * An array containing the first and last indexes of the points of this instruction (relative to path[0].points).
   * This has the effect of specifying which part of the route the instruction matches.
   */
  interval: number[];

  /**
   * Describes what the user must do to follow the route. The language depends on the locale parameter.
   */
  text?: string;

  /**
   * Duration of this instruction in ms
   */
  time: number;

  /**
   * Connection type, only returned if sign is `MXMDownstairs` and `MXMUpstairs`, possible values are elevator_customer, 
   * elevator_good, escalator, ramp, stairs
   */
  type?: string;
}

export interface MapxusPointAnnotationViewProps {
  buildingId?: string;
  floor?: string;
  id: string;
  title?: string;
  snippet?: string;
  selected?: boolean;
  draggable?: boolean;
  coordinate: GeoJSON.Position;
  anchor?: Point;
  onSelected?: () => void;
  onDeselected?: () => void;
  onDragStart?: () => void;
  onDrag?: () => void;
  onDragEnd?: () => void;
}

export interface PointAnnotationProps {
  id: string;
  title?: string;
  snippet?: string;
  selected?: boolean;
  draggable?: boolean;
  coordinate: GeoJSON.Position;
  anchor?: Point;
  onSelected?: () => void;
  onDeselected?: () => void;
  onDragStart?: () => void;
  onDrag?: () => void;
  onDragEnd?: () => void;
}

export interface MarkerViewProps extends PointAnnotationProps {
}

export interface StyleProps {
  json: any
}

export interface CalloutProps extends Omit<ViewProps, 'style'> {
  title?: string;
  style?: StyleProp<WithExpression<ViewStyle>>;
  containerStyle?: StyleProp<WithExpression<ViewStyle>>;
  contentStyle?: StyleProp<WithExpression<ViewStyle>>;
  tipStyle?: StyleProp<WithExpression<ViewStyle>>;
  textStyle?: StyleProp<WithExpression<ViewStyle>>;
}

export interface TileSourceProps extends ViewProps {
  id: string;
  url?: string;
  tileUrlTemplates?: Array<string>;
  minZoomLevel?: number;
  maxZoomLevel?: number;
}

export interface VectorSourceProps extends TileSourceProps {
  onPress?: (event: OnPressEvent) => void;
  hitbox?: {
    width: number;
    height: number;
  };
}

export interface ShapeSourceProps extends ViewProps {
  id: string;
  url?: string;
  shape?: GeoJSON.GeometryCollection | GeoJSON.Feature | GeoJSON.FeatureCollection | GeoJSON.Geometry;
  cluster?: boolean;
  clusterRadius?: number;
  clusterMaxZoomLevel?: number;
  maxZoomLevel?: number;
  buffer?: number;
  tolerance?: number;
  images?: { assets?: string[] } & { [key: string]: ImageSourcePropType };
  onPress?: (event: OnPressEvent) => void;
  hitbox?: {
    width: number;
    height: number;
  };
}

export interface RasterSourceProps extends TileSourceProps {
  tileSize?: number;
}

export interface LayerBaseProps<T = {}> extends Omit<ViewProps, 'style'> {
  id: string;
  sourceID?: string;
  sourceLayerID?: string;
  aboveLayerID?: string;
  belowLayerID?: string;
  layerIndex?: number;
  filter?: Expression;
  minZoomLevel?: number;
  maxZoomLevel?: number;
}

export interface BackgroundLayerProps extends LayerBaseProps {
  style?: StyleProp<BackgroundLayerStyle>;
}

export interface CircleLayerProps extends LayerBaseProps {
  style?: StyleProp<CircleLayerStyle>;
}

export interface FillExtrusionLayerProps extends Omit<LayerBaseProps, 'id'> {
  id: string;
  style?: StyleProp<FillExtrusionLayerStyle>;
}

export interface FillLayerProps extends LayerBaseProps {
  style?: StyleProp<FillLayerStyle>;
}

export interface LineLayerProps extends LayerBaseProps {
  style?: StyleProp<LineLayerStyle>;
}

export interface RasterLayerProps extends LayerBaseProps {
  style?: StyleProp<RasterLayerStyle>;
}

export interface SymbolLayerProps extends LayerBaseProps {
  style?: StyleProp<SymbolLayerStyle>;
}

export interface HeatmapLayerProps extends LayerBaseProps {
  style?: StyleProp<HeatmapLayerStyle>;
}

export interface ImagesProps extends ViewProps {
  images?: { assets?: string[] } & { [key: string]: ImageSourcePropType };
}

export interface ImageSourceProps extends ViewProps {
  id: string;
  url?: number | string;
  coordinates: [
    GeoJSON.Position,
    GeoJSON.Position,
    GeoJSON.Position,
    GeoJSON.Position,
  ];
}

export interface OfflineCreatePackOptions {
  name?: string;
  styleURL?: string;
  bounds?: [GeoJSON.Position, GeoJSON.Position];
  minZoom?: number;
  maxZoom?: number;
  metadata?: any;
}

export interface SnapshotOptions {
  centerCoordinate?: GeoJSON.Position;
  width?: number;
  height?: number;
  zoomLevel?: number;
  pitch?: number;
  heading?: number;
  styleURL?: string;
  writeToDisk?: boolean;
}

export interface BuildingSearchProps {
  keywords?: string;
  offset: number;
  page: number;
}

export interface BuildingSearchGlobalProps extends BuildingSearchProps {
}

export interface BuildingSearchOnBboxProps extends BuildingSearchProps {
  bbox: Bbox;
}

export interface BuildingSearchNearbyProps extends BuildingSearchProps {
  center: GeoPoint;
  distance: number;
}

export interface BuildingSearchByIdsProps {
  buildingIds: string[];
}

export interface ReverseGeoCodeSearchProps {
  location: GeoPoint;
  ordinalFloor: number;
}

export interface POICategorySearchProps {
  buildingId: string;
  floor?: string;
}

export interface PoiSearchProps {
  keywords?: string;
  category?: string;
  offset: number;
  page: number;
}

export interface PoiSearchInIndoorSceneProps extends PoiSearchProps {
  buildingId: string;
  floor?: string;
}

export interface PoiSearchOnBboxProps extends PoiSearchProps {
  bbox: Bbox;
}

export interface PoiSearchNearbyProps extends PoiSearchProps {
  center: GeoPoint;
  meterDistance: number;
  buildingId?: string;
  ordinal?: number;
  sort?: string;
}

export interface PoiSearchByIdsProps {
  POIIds: string[];
}

export interface OrientationPoiSearchProps {
  angle: number;
  distance: number;
  distanceSearchType: string;
  buildingId: string;
  floor: string;
  center: GeoPoint;
}

export interface RouteSearchProps {
  fromBuilding?: string;
  fromFloor?: string;
  fromLon: number;
  fromLat: number;
  toBuilding?: string;
  toFloor?: string;
  toLon: number;
  toLat: number;
  vehicle?: string;
  locale: string;
  toDoor?: boolean;
}

export interface VisualSearchProps {
  buildingId: string;
  scope: number;
}

export interface PainterPathDtoProps {
  /**
   * Starting point
   */
  startPoint: IndoorPoint;

  /**
   * End point
   */
  endPoint: IndoorPoint;

  /**
   * Key in planning order, where outdoor passages are separated by indoor passages by outdoor 1, outdoor 2 
   * or buildingId-floor 1... to distinguish them.The indoor sections are grouped together by buildingId-floor.
   */
  keys: string[];

  /**
   * Details of each paragraph
   */
  paragraphs: { [key: string]: Paragraph };
}

export interface Paragraph {
  /**
   * Key in planning order, where outdoor passages are separated by indoor passages by outdoor 1, outdoor 2 
   * or buildingId-floor 1... to distinguish them.The indoor sections are grouped together by buildingId-floor.
   */
  key: string;

  /**
   * ID of the building in which the paragraph is located, nil means outside
   */
  buildingId?: string;

  /**
   * The floor where the paragraph is located, nil means outside
   */
  floor?: string;

  /**
   * Type of turning point at the beginning of a paragraph
   */
  startPointType: number;

  /**
   * Types of turning points at the end of paragraphs
   */
  endPointType: number;

  /**
   * Coordinate points contained in a paragraph
   */
  points: GeoPoint[];
}

export default MapxusSdk;
