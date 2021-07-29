package com.mapxus.map.components.visual

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.ThemedReactContext
import com.mapxus.map.components.AbstractEventEmitter

/**
 * Created by nickitaliano on 9/27/17.
 */
class RCTMapxusVisualMapManager(reactApplicationContext: ReactApplicationContext?) :
    AbstractEventEmitter<RCTMapxusVisualMap?>(reactApplicationContext) {
    override fun customEvents(): Map<String, String>? {
        return MapBuilder.builder<String, String>()
            .build()
    }

    override fun getCommandsMap(): Map<String, Int>? {
        return MapBuilder.builder<String, Int>()
            .build()
    }

    override fun getName(): String {
        return REACT_CLASS
    }

    override fun createViewInstance(reactContext: ThemedReactContext): RCTMapxusVisualMap {
        return RCTMapxusVisualMap(reactContext, this)
    }

    override fun receiveCommand(
        rctMapxusPointAnnotation: RCTMapxusVisualMap,
        commandID: Int,
        args: ReadableArray?
    ) {
    }

    companion object {
        const val REACT_CLASS = "MXVisualMapView"
    }
}