import React from 'react';
import PropTypes, { number } from 'prop-types';
import { requireNativeComponent } from 'react-native';
import NativeBridgeComponent from '../../maprenderer/components/NativeBridgeComponent';
import { ViewPropTypes } from '../../maprenderer/utils';

const NATIVE_MODULE_NAME = 'MXMap'

/**
 * MapxusMap provides control and listening to indoor maps.
 */
class MapxusMap extends NativeBridgeComponent(React.Component) {
  static propTypes = {
    ...ViewPropTypes,

    /**
     * Initialization parameters, setting them before rendering the map.
     */
    mapOption: PropTypes.shape({
      outdoorHidden: PropTypes.bool,
      defaultStyle: PropTypes.number,
      defaultStyleName: PropTypes.string,
      buildingId: PropTypes.string,
      floor: PropTypes.string,
      zoomInsets: PropTypes.shape({
        top: PropTypes.number,
        left: PropTypes.number,
        bottom: PropTypes.number,
        right: PropTypes.number,
      }),
      poiId: PropTypes.string,
      zoomLevel: PropTypes.number,
      // 仅Android
      language: PropTypes.string,
    }),

    /**
     * Colour of selected font for floor selector bar.
     */
    selectFontColor: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]),

    /**
     * Colour of selected box for floor selector bar.
     */
    selectBoxColor: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]),

    /**
     * Colour of unselected font for floor selector bar.
     */
    fontColor: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]),

    /**
     * Set floor selector bar always hidden.
     */
    indoorControllerAlwaysHidden: PropTypes.bool,

    /**
     * Set the position of the indoor map control, it is a enum MapxusSelectorPosition, the default is CENTER_LEFT.
     */
    selectorPosition: PropTypes.number,

    /**
     * Control the margin between the floor selector bar and the mapview, which is related to the setting of `selectorPosition`,
     * such as selectorPosition is CENTER_LEFT, x represents the distance of left, y represents the distance of top.
     */
    selectorPositionCustom: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),

    /**
     * Set the margin of the 'Mapxus logo' from the bottom of the mapView, you can only pass 0 or a positive number, passing 
     * a negative number will reset it to 0
     */
    logoBottomMargin: PropTypes.number,

    /**
     * Set the margin of the 'Open Street Source' from the bottom of the mapView, you can only pass in 0 or a positive number, 
     * passing in a negative number will reset it to 0.
     */
    openStreetSourceBottomMargin: PropTypes.number,

    /**
     * Set whether to display outdoor map.
     */
    outdoorHidden: PropTypes.bool,

    /**
     * Click on the map to switch the building, the default status is YES.
     */
    gestureSwitchingBuilding: PropTypes.bool,

    /**
     * The default state is YES. when auto switch mode is on and the building is moved to the centre of the view,
     * the building could be automatically selected to show its internal structure.
     */
    autoChangeBuilding: PropTypes.bool,

    /**
     * This event is triggered when poi is clicked.
     */
    onTappedOnPoi: PropTypes.func,

    /**
     * This event is triggered when blank of the map is clicked.
     */
    onTappedOnBlank: PropTypes.func,

    /**
		 * Map long press listener, gets called when a user long presses the map.
     */
    onLongPressed: PropTypes.func,

    /**
     * This event is triggered when indoor scene is change.
     */
    onIndoorSceneChange: PropTypes.func,

    /**
     * This event is triggered when indoor status is change.
     */
    onIndoorStatusChange: PropTypes.func,
  };

  constructor(props) {
    super(props, NATIVE_MODULE_NAME);
    this._onTappedOnPoi = this._onTappedOnPoi.bind(this);
    this._onTappedOnBlank = this._onTappedOnBlank.bind(this);
    this._onLongPressed = this._onLongPressed.bind(this);
    this._onIndoorSceneChange = this._onIndoorSceneChange.bind(this);
    this._onIndoorStatusChange = this._onIndoorStatusChange.bind(this);
  }

  _onTappedOnPoi(event) {
    if (!this.props.onTappedOnPoi) {
      return;
    }
    // process raw event...
    this.props.onTappedOnPoi(event.nativeEvent);
  }

  _onTappedOnBlank(event) {
    if (!this.props.onTappedOnBlank) {
      return;
    }
    // process raw event...
    this.props.onTappedOnBlank(event.nativeEvent);
  }

  _onLongPressed(event) {
    if (!this.props.onLongPressed) {
      return;
    }
    // process raw event...
    this.props.onLongPressed(event.nativeEvent);
  }

  _onIndoorSceneChange(event) {
    if (!this.props.onIndoorSceneChange) {
      return;
    }
    // process raw event...
    this.props.onIndoorSceneChange(event.nativeEvent);
  }

  _onIndoorStatusChange(event) {
    if (!this.props.onIndoorStatusChange) {
      return;
    }
    // process raw event...
    this.props.onIndoorStatusChange(event.nativeEvent);
  }

  /**
   * Setting the general map appearance.
   * @param {MapxusMapStyle} style style enum value.
   */
  setMapxusStyle(style) {
    this._runNativeCommand('setMapxusStyle', this._nativeRef, [
      style,
    ]);
  }

  /**
   * Set up custom map appearance, you can contact us for map appearance customization.
   * @param {String} name the style name we provide.
   */
  setMapxusStyleWithString(name) {
    this._runNativeCommand('setMapxusStyleWithString', this._nativeRef, [
      name,
    ]);
  }

  /**
   * Setting the map language.
   * @param {String} name map language with options for en, zh-Hant, zh-Hans, ja, ko, default.
   */
  setMapLanguage(name) {
    this._runNativeCommand('setMapLanguage', this._nativeRef, [
      name,
    ]);
  }

  /**
   * Select the building and the floor of that building by code.
   * @param {MapxusZoomMode} zoomMode Zoom method
   * @param {Insets} insets zoom to fit the margins, if zoomMode is MXMZoomDisable, the value passed in is invalid
   * @param {String} buildingId id of the building to be selected
   * @param {String} floor name of the floor to be selected
   */
  selectIndoorScene(zoomMode, insets, buildingId, floor) {
    this._runNativeCommand('selectIndoorScene', this._nativeRef, [
      buildingId,
      floor,
      zoomMode,
      insets
    ]);
  }

  _setNativeRef(nativeRef) {
    this._nativeRef = nativeRef;
    super._runPendingNativeCommands(nativeRef);
  }

  render() {
    const callbacks = {
      ref: (nativeRef) => this._setNativeRef(nativeRef),
      onTappedOnPoi: this._onTappedOnPoi,
      onTappedOnBlank: this._onTappedOnBlank,
      onLongPressed: this._onLongPressed,
      onIndoorSceneChange: this._onIndoorSceneChange,
      onIndoorStatusChange: this._onIndoorStatusChange,
    };

    return <RNMap {...this.props} {...callbacks} style={{ flex: 1 }}>{this.props.children}</RNMap>;
  }
}

const RNMap = requireNativeComponent(NATIVE_MODULE_NAME, MapxusMap);

export default MapxusMap;