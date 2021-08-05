package com.mapxus.map.components.location

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.ThemedReactContext
import com.mapxus.map.components.AbstractEventEmitter

/**
 * Created by Edison on 3/29/21.
 * Describe:
 */
private const val REACT_CLASS = "MXSimulateLocation"
private const val METHOD_SET_SIMULATE_LOCATION = 1

class RCTMapxusSimulateLocationManager(reactApplicationContext: ReactApplicationContext) :
    AbstractEventEmitter<RCTMapxusSimulateLocation>(reactApplicationContext) {
    override fun getName(): String = REACT_CLASS

    override fun createViewInstance(reactContext: ThemedReactContext): RCTMapxusSimulateLocation {
        return RCTMapxusSimulateLocation(reactContext, this)
    }

    override fun customEvents(): MutableMap<String, String> = MapBuilder.builder<String, String>()
        .build()

    override fun getCommandsMap(): MutableMap<String, Int> {
        return MapBuilder.builder<String, Int>()
            .put("setSimulateLocation", METHOD_SET_SIMULATE_LOCATION)
            .build()
    }

    override fun receiveCommand(
        mapxusSimulateLocation: RCTMapxusSimulateLocation,
        commandId: Int,
        args: ReadableArray?
    ) {
        when (commandId) {
            METHOD_SET_SIMULATE_LOCATION -> mapxusSimulateLocation.setSimulateLocation(args)
        }
    }
}