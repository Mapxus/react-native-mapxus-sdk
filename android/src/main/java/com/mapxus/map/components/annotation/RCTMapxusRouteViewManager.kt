package com.mapxus.map.components.annotation

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.mapxus.map.components.AbstractEventEmitter
import com.mapxus.map.events.constants.EventKeys

/**
 * Created by Edison on 2021/5/14.
 * Describe:
 */
private const val REACT_CLASS = "MXRouteView"
private const val METHOD_PAINT_ROUTE_USING_PATH = 1
private const val METHOD_CLEAN_ROUTE = 2
private const val METHOD_CHANGE_ON = 3
private const val METHOD_FOCUS_ON = 4
private const val METHOD_GET_PAINTER_PATHDTO = 5

class RCTMapxusRouteViewManager(reactApplicationContext: ReactApplicationContext) :
    AbstractEventEmitter<RCTMapxusRouteView>(reactApplicationContext) {
    override fun getName(): String = REACT_CLASS

    override fun createViewInstance(reactContext: ThemedReactContext): RCTMapxusRouteView {
        return RCTMapxusRouteView(reactContext, this)
    }

    @ReactProp(name = "reactRouteAppearance")
    fun setRouteAppearance(rctMapxusRouteView: RCTMapxusRouteView, routeAppearance: ReadableMap) {
        rctMapxusRouteView.setRouteAppearance(routeAppearance)
    }

    override fun customEvents(): MutableMap<String, String> = MapBuilder.builder<String, String>()
        .put(EventKeys.MAP_ANDROID_CALLBACK, "onAndroidCallback")
        .build()

    override fun getCommandsMap(): MutableMap<String, Int> {
        return MapBuilder.builder<String, Int>()
            .put("paintRouteUsingPath", METHOD_PAINT_ROUTE_USING_PATH)
            .put("cleanRoute", METHOD_CLEAN_ROUTE)
            .put("changeOn", METHOD_CHANGE_ON)
            .put("focusOn", METHOD_FOCUS_ON)
            .put("getPainterPathDto", METHOD_GET_PAINTER_PATHDTO)
            .build()
    }

    override fun receiveCommand(
        routeView: RCTMapxusRouteView,
        commandId: Int,
        args: ReadableArray?
    ) {
        when (commandId) {
            METHOD_PAINT_ROUTE_USING_PATH -> routeView.paintRouteUsingPath(args)
            METHOD_CLEAN_ROUTE -> routeView.cleanRoute()
            METHOD_CHANGE_ON -> routeView.changeOn(args)
            METHOD_FOCUS_ON -> routeView.focusOn(args)
            METHOD_GET_PAINTER_PATHDTO -> routeView.getPainterPathDto(args?.getString(0), args)
        }
    }
}