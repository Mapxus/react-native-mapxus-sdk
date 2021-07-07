package com.mapxus.map.components.annotation

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.ThemedReactContext
import com.mapxus.map.components.AbstractEventEmitter

/**
 * Created by Edison on 2021/5/14.
 * Describe:
 */
private const val REACT_CLASS = "MXNavigationView"
private const val METHOD_PAINT_ROUTE_USING_PATH = 1
private const val METHOD_CLEAN_ROUTE = 2
private const val METHOD_CHANGE_ON = 3
private const val METHOD_FOCUS_ON = 4

class RCTMapxusNavigationViewManager (reactApplicationContext: ReactApplicationContext): AbstractEventEmitter<RCTMapxusNavigationView>(reactApplicationContext){
    override fun getName(): String = REACT_CLASS

    override fun createViewInstance(reactContext: ThemedReactContext): RCTMapxusNavigationView {
        return RCTMapxusNavigationView(reactContext, this)
    }

    override fun customEvents(): MutableMap<String, String> = MapBuilder.builder<String, String>()
        .build()

    override fun getCommandsMap(): MutableMap<String, Int> {
        return MapBuilder.builder<String, Int>()
            .put("paintRouteUsingPath", METHOD_PAINT_ROUTE_USING_PATH)
            .put("cleanRoute", METHOD_CLEAN_ROUTE)
            .put("changeOn", METHOD_CHANGE_ON)
            .put("focusOn", METHOD_FOCUS_ON)
            .build()
    }

    override fun receiveCommand(navigationView: RCTMapxusNavigationView, commandId: Int, args: ReadableArray?) {
        when (commandId) {
            METHOD_PAINT_ROUTE_USING_PATH -> navigationView.paintRouteUsingPath(args)
            METHOD_CLEAN_ROUTE -> navigationView.cleanRoute()
            METHOD_CHANGE_ON -> navigationView.changeOn(args)
            METHOD_FOCUS_ON -> navigationView.focusOn(args)
        }
    }
}