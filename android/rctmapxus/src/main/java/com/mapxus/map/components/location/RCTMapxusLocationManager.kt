package com.mapxus.map.components.location

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.mapxus.map.components.AbstractEventEmitter
import com.mapxus.map.events.constants.EventKeys
import com.mapxus.map.location.UserTrackingMode
import com.mapxus.map.mapxusmap.api.map.FollowUserMode

/**
 * Created by Edison on 3/29/21.
 * Describe:
 */
private const val REACT_CLASS = "RCTMapxusLocation"

class RCTMapxusLocationManager (reactApplicationContext: ReactApplicationContext): AbstractEventEmitter<RCTMapxusLocation>(reactApplicationContext){
    override fun getName(): String = REACT_CLASS

    override fun createViewInstance(reactContext: ThemedReactContext): RCTMapxusLocation {
        return RCTMapxusLocation(reactContext, this)
    }

    @ReactProp(name = "followUserMode")
    fun setFollowUserMode(location: RCTMapxusLocation, followUserMode: Int) {
        location.setFollowUserMode(when(followUserMode){
            UserTrackingMode.NONE -> FollowUserMode.NONE
            UserTrackingMode.FOLLOW -> FollowUserMode.FOLLOW_USER
            UserTrackingMode.FollowWithHeading -> FollowUserMode.FOLLOW_USER_AND_HEADING
            else -> FollowUserMode.FOLLOW_USER
        })

    }

    override fun customEvents(): MutableMap<String, String> = MapBuilder.builder<String, String>()
            .put(EventKeys.MAPXUS_USER_LOCATION_UPDATE, "onUserLocationChange")
            .build()
}