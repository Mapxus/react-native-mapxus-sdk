declare module '@mapxus/react-native-mapxus-sdk';

import {
  Component,
} from 'react';

import {
  ViewProps,
  StyleProp,
  Insets
} from 'react-native';

import * as MapRenderer  from './maprenderer/index';
export {
  MapRenderer
};

declare namespace MapxusSdk {

  function registerWithApiKey(apiKey: string, secret: string): void;

  /**
   * Modules
   */
  const buildingSearchManager: BuildingSearchManager;
  const poiSearchManager: PoiSearchManager;
  const poiCategorySearchManager: PoiCategorySearchManager;
  const routeSearchManager: RouteSearchManager;
  const visualSearchManager: VisualSearchManager;
  const geocodeSearchManager: GeocodeSearchManager;

  class BuildingSearchManager {
    buildingSearchGlobal(params: BuildingSearchGlobalProps): Promise<BuildingSearchResult>;
    buildingSearchOnBbox(params: BuildingSearchOnBboxProps): Promise<BuildingSearchResult>;
    buildingSearchNearbyCenter(params: BuildingSearchNearbyProps): Promise<BuildingSearchResult>;
    buildingSearchByIds(params: BuildingSearchByIdsProps): Promise<BuildingSearchResult>;
  }

  class PoiSearchManager {
    poiSearchInIndoorScene(params: PoiSearchInIndoorSceneProps): Promise<PoiSearchResult>;
    poiSearchOnBbox(params: PoiSearchOnBboxProps): Promise<PoiSearchResult>;
    poiSearchNearbyCenter(params: PoiSearchNearbyProps): Promise<PoiSearchResult>;
    poiSearchByIds(params: PoiSearchByIdsProps): Promise<PoiSearchResult>;
    orientationPoiSearch(params: OrientationPoiSearchProps): Promise<PoiSearchResult>;
  }

  class PoiCategorySearchManager {
    poiCategorySearch(params: POICategorySearchProps): Promise<PoiCategorySearchResult>;
  }

  class RouteSearchManager {
    routeSearch(params: RouteSearchProps): Promise<RouteSearchResult>;
  }

  class VisualSearchManager {
    searchVisualDataInBuilding(params: VisualSearchProps): Promise<VisualNodeGroup[]>;
  }

  class GeocodeSearchManager {
    reverseGeoCode(params: ReverseGeoCodeSearchProps): Promise<GeocodeSearchResult>;
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

  class VisualNodeView extends Component<VisualNodeViewProps> {
    /**
     * Pass in rendering data
     * @param nodes use VisualNode[] in ios , use VisualNodeGroup[] in Android
     */
    renderFlagUsingNodes(nodes: VisualNode[] | VisualNodeGroup[]): void;
    cleanLayer(): void;
    changeOn(buildingId: string, floor: string): void;
    /** Just in Android */
    updateMarkerRotate(angle: number): void;
    /** Just in Android */
    setMapMarker(imgKey: string): void;
  }

  class VisualView extends Component<VisualViewProps> {
    loadVisualViewWithFirstImg(imageId: string): void;
    unloadVisualView(): void;
    moveToKey(key: string): void;
    moveCloseTo(buildingId: string, floor: string, latitude: number, longitude: number): void;
    resize(): void;
    getBearing(): Promise<number>;
    setBearing(bearing: number): void;
    getVisualCenter(): Promise<VisualCoordinate2D>;
    setVisualCenter(center: VisualCoordinate2D): void;
    getZoom(): Promise<number>;
    setZoom(zoom: number): void;
    activateBearing(): void;
    deactivateBearing(): void;
  }

  class RouteView extends Component<RouteViewProps> {
    getPainterPathDto(): Promise<PainterPathDtoProps>;
    paintRouteUsingPath(path: Path, points: IndoorPoint[]): void;
    cleanRoute(): void;
    changeOn(buildingId: string, floor: string): void;
    focusOn(keys: string[], insets: Insets): void;
  }

  class NavigationView extends Component<NavigationViewProps> {
    updatePath(path: Path, points: IndoorPoint[]): void;
    start(): void;
    stop(): void;
  }

  class SimulateLocationManager extends Component<SimulateLocationManagerProps> {
    setSimulateLocation(location: InputLocation | AndroidInputLocation): void;
  }

  class MapxusPointAnnotationView extends Component<MapxusPointAnnotationViewProps> {
    refresh(): void;
  }

  class MapxusMapLocation extends Component<MapxusMapLocationProps> { }

  /**
   * Constants
   */
  enum MapxusMapStyle {
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
    /** 不缩放 */
    DISABLE,
    /** 通过动画缩放 */
    ANIMATED,
    /** 无动画缩放 */
    DIRECT,
  }

  enum MapxusVisualSearchScopeType {
    SIMPLE,
    DETAIL,
  }
}







export interface MapxusMapProps extends ViewProps {
  mapOption?: Configuration;
  selectFontColor?: string | number;
  selectBoxColor?: string | number;
  fontColor?: string | number;
  indoorControllerAlwaysHidden?: boolean;
  selectorPosition?: MapxusSdk.MapxusSelectorPosition;
  selectorPositionCustom?: MapRenderer.Point;
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

export interface VisualNodeViewProps extends ViewProps {
  onTappedFlag?: (feature: VisualNode) => void;
}

export interface VisualViewProps extends ViewProps {
  onLoadFail?: (error: VisualViewError) => void;
  onRenderComplete?: () => void;
  onLoadingChanged?: (feature: VisualViewLoadingChangeObject) => void;
  onBearingChanged?: (feature: BearingChangeObject) => void;
  onNodeChanged?: (feature: NodeChangeObject) => void;
}

export interface NavigationViewProps extends ViewProps {
  adsorbable?: boolean;
  shortenable?: boolean;
  numberOfAllowedDrifts?: number;
  maximumDrift?: number;
  distanceToDestination?: number;
  showsUserHeadingIndicator?: boolean;
  onArrivalAtDestination?: () => void;
  onExcessiveDrift?: () => void;
  onRefreshTheAdsorptionLocation?: (feature: AdsorptionLocationObject | AdsorptionAndroidLocationObject) => void;
  onGetNewPath?: (feature: NavigationNewPathObject) => void;
  onUpdate?: (feature: MapRenderer.MapboxGL.Location | AndroidLocation) => void;
}

export interface SimulateLocationManagerProps extends ViewProps {
  showsUserHeadingIndicator?: boolean;
  onUpdate?: (feature: MapRenderer.MapboxGL.Location | AndroidSimulateLocation) => void;
}

export interface RouteViewProps extends ViewProps {
  routeAppearance?: StyleProp<Appearance>;
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
  anchor?: MapRenderer.Point;
  onSelected?: () => void;
  onDeselected?: () => void;
  onDragStart?: () => void;
  onDrag?: () => void;
  onDragEnd?: () => void;
}

export interface MapxusMapLocationProps extends ViewProps {
  followUserMode?: number;
  onLocationStarted?: () => void;
  onLocationStopped?: () => void;
  onLocationError?: (feature: AndroidLocationErronInfo) => void;
  onLocationChange?: (feature: AndroidLocation) => void;
  onCompassChange?: (feature: AndroidCompass) => void;
}

export interface InputLocation {
  latitude?: number;
  longitude?: number;
  altitude?: number;
  horizontalAccuracy?: number;
  verticalAccuracy?: number;
  course?: number;
  courseAccuracy?: number;
  speed?: number;
  speedAccuracy?: number;
  ordinal?: number;
  timestamp?: number;
}

export interface AndroidInputLocation {
  latitude?: number;
  longitude?: number;
  buildingId?: string;
  floor?: string;
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

export interface AndroidSimulateLocation {
  longitude: number;
  latitude: number;
  buildingId?: string;
  floor?: string;
  orientation: number;
}

export interface AndroidCompass {
  orientation: number;
  sensorAccuracy: number;
}

export interface Appearance {
  isAddStartDash?: boolean;
  isAddEndDash?: boolean;
  hiddenTranslucentPaths?: boolean;
  indoorLineColor?: string | number;
  outdoorLineColor?: string | number;
  dashLineColor?: string | number;
  arrowSymbolSpacing?: number;
  arrowIcon?: number;
  startIcon?: number;
  endIcon?: number;
  elevatorUpIcon?: number;
  elevatorDownIcon?: number;
  escalatorUpIcon?: number;
  escalatorDownIcon?: number;
  rampUpIcon?: number;
  rampDownIcon?: number;
  stairsUpIcon?: number;
  stairsDownIcon?: number;
  buildingGateIcon?: number;
}

export interface AdsorptionLocationObject {
  adsorptionLocation: MapRenderer.MapboxGL.Location;
  actualLocation: MapRenderer.MapboxGL.Location;
  buildingId?: string;
  floor?: string;
}

export interface AdsorptionAndroidLocationObject {
  adsorptionLocation: AndroidLocation;
  actualLocation: AndroidLocation;
}

export interface NavigationNewPathObject {
  newPath: Path;
  originalPath: Path;
  fromInstructionIndex: number;
  originalWayPoints: IndoorPoint[];
}

export interface VisualCoordinate2D {
  x: number;
  y: number;
}

export interface VisualViewError {
  code: number;
  message: string;
}

export interface GeoPoi {
  identifier: string;
  buildingId: string;
  floor: Floor;
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
  groundFloor: string;
  type: string;
}

export interface Paragraph {
  /**
   * Key in planning order, where outdoor passages are separated by indoor passages by outdoor 1, outdoor 2
   * or buildingId-floor 1... to distinguish them.The indoor sections are grouped together by buildingId-floor.
   */
  key: string;
  /** ID of the building in which the paragraph is located, nil means outside */
  buildingId?: string;
  /** The floor where the paragraph is located, nil means outside */
  floor?: string;
  /** Type of turning point at the beginning of a paragraph */
  startPointType: number;
  /** Types of turning points at the end of paragraphs */
  endPointType: number;
  /** Coordinate points contained in a paragraph */
  points: GeoPoint[];
}

export interface PainterPathDtoProps {
  /** Starting point */ 
  startPoint: IndoorPoint;
  /** End point */ 
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

export interface VisualViewLoadingChangeObject {
  isLoading: boolean;
}

export interface BearingChangeObject {
  bearing: number;
}

export interface NodeChangeObject {
  node: VisualNode;
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
  scope: MapxusSdk.MapxusVisualSearchScopeType;
}

export interface BuildingSearchResult {
  total: number;
  buildings: Building[];
}

export interface GeocodeSearchResult {
  building: Building;
  floor: Floor;
}

export interface PoiCategorySearchResult {
  category: Category[];
}

export interface PoiSearchResult {
  total?: number;
  pois: Poi[];
}

export interface RouteSearchResult {
  /** List of passing points */
  wayPointList: IndoorPoint[];
  /** Queue for route `MXMPath`, different routes for different planning options */
  paths: Path[];
}

/**
 * Objects
 */
export interface Poi {
  /** ID of the POI */
  poiId: string;
  /** ID of the building */
  buildingId?: string;
  /** ID of the venue */
  venueId?: string;
  /** Floor where the POI is located */
  floor?: Floor;
  /** Longitude and latitude of the POI */
  location?: GeoPoint;
  /** POI classification */
  category: string[];
  /** POI Description */
  introduction?: string;
  /** POI Mailbox */
  email?: string;
  /** Default POI Name */
  name_default?: string;
  /** POI English Name */
  name_en?: string;
  /** * POI Simplified Chinese Name */
  name_cn?: string;
  /** POI Traditional Chinese Name */
  name_zh?: string;
  /** POI Japanese name */
  name_ja?: string;
  /** POI Korean Name */
  name_ko?: string;
  /** Default Accessibility Information */
  accessibilityDetail?: string;
  /** English Accessibility Information */
  accessibilityDetail_en?: string;
  /** Accessibility information in Simplified Chinese */
  accessibilityDetail_cn?: string;
  /** Traditional Chinese Accessibility Information */
  accessibilityDetail_zh?: string;
  /** Japanese Accessibility Information */
  accessibilityDetail_ja?: string;
  /** Korean Accessibility Information */
  accessibilityDetail_ko?: string;
  /** Opening times */
  openingHours?: string;
  /** Shop Phone */
  phone?: string;
  /** Shop URL */
  website?: string;
  /** Distance from the centre of the request */
  distance?: number;
  /** Clockwise angle of the phone pointing to the line connecting the POI point and the centre of the request */
  angle?: number;
}

export interface Category {
  category: string;
  categoryId: string;
  categoryDescription: string;
  title_en: string;
  title_cn: string;
  title_zh: string;
}

export interface Building {
  /** ID of the building */
  buildingId: string;
  /** ID of the venue */
  venueId?: string;
  /** Default venue name */
  venueName_default?: string;
  /** Name of venue in English */
  venueName_en?: string;
  /** Name of venue in Simplified Chinese */
  venueName_cn?: string;
  /** Name of venue in Traditional Chinese */
  venueName_zh?: string;
  /** Name of venue in Japanese */
  venueName_ja?: string;
  /** Name of venue in Korean */
  venueName_ko?: string;
  /** Default building name */
  name_default?: string;
  /** Building name in English */
  name_en?: string;
  /** Building name in Simplified Chinese */
  name_cn?: string;
  /** Building name in Traditional Chinese */
  name_zh?: string;
  /** Building name in Japanese */
  name_ja?: string;
  /** Building name in Korean */
  name_ko?: string;
  /** Default adress */
  address_default?: Address;
  /** Adress in English */
  address_en?: Address;
  /** Adress in Simplified Chinese */
  address_cn?: Address;
  /** Adress in Traditional Chinese */
  address_zh?: Address;
  /** Adress in Japanese */
  address_ja?: Address;
  /** Adress in Korean */
  address_ko?: Address;
  /** Building type, indicating the classification of the building, e.g. cathedral, car_park, hospital, office, retail, etc. */
  type?: string;
  /** External rectangular area where the building is located */
  bbox?: Bbox;
  /** Tags latitude and longitude */
  labelCenter?: GeoPoint;
  /** All floors of the building */
  floors: FloorInfo[];
  /** Building ground floor */
  groundFloor?: string;
  /** Country of residence */
  country?: string;
  /** Region of residence */
  region?: string;
  /** City of residence */
  city?: string;
  /** Visual map identifiers */
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

export interface IndoorPoint extends GeoPoint {
  buildingId: string;
  floor: string;
}

export interface Ordinal {
  level: number;
}

export interface Floor {
  code: string;
  floorId: string;
  ordinal?: Ordinal;
}

export interface FloorInfo {
  floor: Floor;
  hasVisualMap: boolean;
}

export interface VisualNodeGroup {
  floor: string;
  /** iOS use VisualNode[], and Android use VisualSequenceImage[] */
  nodes: VisualNode[] | VisualSequenceImage[];
}

/** Only for Android */
export interface VisualSequenceImage {
  sequenceId: string;
  nodes: VisualNode[]
}

export interface VisualNode {
  key: string;
  buildingId: string;
  floor: string;
  latitude: number;
  longitude: number;
  bearing: number;
}

export interface Path {
  /** Total distance of the route in metres (m) */
  distance: number;
  /** Weights */
  weight: number;
  /** Total time of the route in milliseconds (ms) */
  time: number;
  /** Enclosing box for the route */
  bbox: Bbox;
  /** Information on the coordinates of the route */
  points: Geometry;
  /** Instruction information groups for routes */
  instructions: Instruction[];
}

export interface Geometry {
  /** Types of route geometries */
  type: string;
  /** An array of coordinates for the route */
  coordinates: GeoPoint[];
}

export interface Instruction {
  /** Building id of the building in which this instruction is located */
  buildingId?: string;
  /** The floor of the building where this instruction is located */
  floor?: string;
  /** Road name */
  streetName?: string;
  /** Distance of this instruction in metres (m) */
  distance: number;
  /** The direction, clockwise of the northward angle is given as between 0 and 360 degrees. */
  heading: number;
  /** Command symbols */
  sign: number;
  /**
   * An array containing the first and last indexes of the points of this instruction (relative to path[0].points).
   * This has the effect of specifying which part of the route the instruction matches.
   */
  interval: number[];
  /** Describes what the user must do to follow the route. The language depends on the locale parameter. */
  text?: string;
  /** Duration of this instruction in ms */
  time: number;
  /**
   * Connection type, only returned if sign is `MXMDownstairs` and `MXMUpstairs`, possible values are elevator_customer,
   * elevator_good, escalator, ramp, stairs
   */
  type?: string;
}

export default MapxusSdk;