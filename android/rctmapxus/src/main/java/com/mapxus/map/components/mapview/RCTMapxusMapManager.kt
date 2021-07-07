package com.mapxus.map.components.mapview

import android.view.View
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.mapxus.map.components.AbstractEventEmitter
import com.mapxus.map.events.constants.EventKeys

/**
 * Created by Edison on 3/11/21.
 * Describe:
 */
private const val REACT_CLASS = "MXMap"
private const val METHOD_SET_MAPXUS_STYLE = 1
private const val METHOD_SET_MAPXUS_STYLE_WITH_STRING = 2
private const val METHOD_SET_MAP_LANGUAGE = 3
private const val METHOD_SELECT_INDOORSCENE = 4

class RCTMapxusMapManager(reactApplicationContext: ReactApplicationContext) :
    AbstractEventEmitter<RCTMapxusMap>(reactApplicationContext) {
    var mViews: MutableMap<Int, RCTMapxusMap> = hashMapOf()

    override fun getName(): String {
        return REACT_CLASS
    }

    override fun addView(mapView: RCTMapxusMap?, child: View, index: Int) {
        mapView?.addFeature(child, index)
    }

    override fun getChildCount(parent: RCTMapxusMap): Int {
        return parent.features().size
    }

    override fun getChildAt(parent: RCTMapxusMap, index: Int): View {
        return parent.features()[index].mapxusChildView
    }

    override fun removeViewAt(mapView: RCTMapxusMap, index: Int) {
        mapView.removeFeature(index)
    }

    override fun removeAllViews(parent: RCTMapxusMap?) {
        parent?.dispose()
    }

    @ReactProp(name = "mapOption")
    fun setMapOption(mapView: RCTMapxusMap, mapOption: ReadableMap?) {
        mapView.setMapOption(mapOption)
    }

    @ReactProp(name = "selectFontColor")
    fun setSelectFontColor(mapView: RCTMapxusMap, color: String) {
        mapView.setSelectFontColor(color)
    }

    @ReactProp(name = "selectBoxColor")
    fun setSelectBoxColor(mapView: RCTMapxusMap, color: String) {
        mapView.setSelectBoxColor(color)
    }

    @ReactProp(name = "fontColor")
    fun setFontColor(mapView: RCTMapxusMap, color: String) {
        mapView.setFontColor(color)
    }

    @ReactProp(name = "selectorPosition")
    fun setSelectorPosition(mapView: RCTMapxusMap, position: Int) {
        mapView.setSelectorPosition(position)
    }

    @ReactProp(name = "selectorPositionCustom")
    fun setSelectorPositionCustom(mapView: RCTMapxusMap, position: ReadableMap) {
        mapView.setSelectorPositionCustom(position)
    }

    @ReactProp(name = "logoBottomMargin")
    fun setLogoBottomMargin(mapView: RCTMapxusMap, margin: Int) {
        mapView.setLogoBottomMargin(margin)
    }

    @ReactProp(name = "openStreetSourceBottomMargin")
    fun setOpenStreetSourceBottomMargin(mapView: RCTMapxusMap, margin: Int) {
        mapView.setOpenStreetSourceBottomMargin(margin)
    }

    @ReactProp(name = "gestureSwitchingBuilding")
    fun setGestureSwitchingBuilding(mapView: RCTMapxusMap, enabled: Boolean) {
        mapView.setGestureSwitchingBuilding(enabled)
    }

    @ReactProp(name = "autoChangeBuilding")
    fun setAutoChangeBuilding(mapView: RCTMapxusMap, enabled: Boolean) {
        mapView.setAutoChangeBuilding(enabled)
    }

    @ReactProp(name = "indoorControllerAlwaysHidden")
    fun setIndoorControllerAlwaysHidden(mapView: RCTMapxusMap, enabled: Boolean) {
        mapView.setIndoorControllerAlwaysHidden(enabled)
    }

    @ReactProp(name = "outdoorHidden")
    fun setOutdoorHidden(mapView: RCTMapxusMap, enabled: Boolean) {
        mapView.setOutdoorHidden(enabled)
    }

    override fun createViewInstance(reactContext: ThemedReactContext): RCTMapxusMap {
        return RCTMapxusMap(reactContext, this)
    }

    override fun getCommandsMap(): MutableMap<String, Int> {
        return MapBuilder.builder<String, Int>()
            .put("setMapxusStyle", METHOD_SET_MAPXUS_STYLE)
            .put("setMapxusStyleWithString", METHOD_SET_MAPXUS_STYLE_WITH_STRING)
            .put("setMapLanguage", METHOD_SET_MAP_LANGUAGE)
            .put("selectIndoorScene", METHOD_SELECT_INDOORSCENE)
            .build()
    }

    override fun receiveCommand(mapView: RCTMapxusMap, commandId: Int, args: ReadableArray?) {
        // allows method calls to work with componentDidMount
        if (mapView.mMapxusMap == null) {
            return
        }

        when (commandId) {
            METHOD_SET_MAPXUS_STYLE -> mapView.setMapxusStyle(args)
            METHOD_SET_MAPXUS_STYLE_WITH_STRING -> mapView.setMapxusStyleWithString(args)
            METHOD_SET_MAP_LANGUAGE -> mapView.setMapLanguage(args)
            METHOD_SELECT_INDOORSCENE -> mapView.selectIndoorScene(args)
        }
    }

    override fun customEvents(): MutableMap<String, String> = MapBuilder.builder<String, String>()
        .put(EventKeys.MAPXUS_CLICK, "onTappedOnBlank")
        .put(EventKeys.MAPXUS_LONG_CLICK, "onLongPressed")
        .put(EventKeys.MAP_POI_CLICK, "onTappedOnPoi")
        .put(EventKeys.MAP_BUILDING_CHANGE, "onIndoorStatusChange")
        .put(EventKeys.MAP_FLOOR_CHANGE, "onIndoorSceneChange")
        .build()

}