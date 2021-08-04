package com.mapxus.map.components.annotation

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.mapxus.map.components.AbstractEventEmitter
import com.mapxus.map.events.constants.EventKeys

/**
 * Created by Edison on 2021/5/14.
 * Describe:
 */
private const val REACT_CLASS = "MXNavigationView"
private const val METHOD_UPDATE_PATH = 1
private const val METHOD_START = 2
private const val METHOD_STOP = 3

class RCTMapxusNavigationViewManager (reactApplicationContext: ReactApplicationContext): AbstractEventEmitter<RCTMapxusNavigationView>(reactApplicationContext){
    override fun getName(): String = REACT_CLASS

    @ReactProp(name = "adsorbable")
    fun setAdsorbable(navigationView: RCTMapxusNavigationView, adsorbable: Boolean?) {
        navigationView.setAdsorbable(adsorbable)
    }

    @ReactProp(name = "shortenable")
    fun setShortenable(navigationView: RCTMapxusNavigationView, shortenable: Boolean?) {
        navigationView.setShortenable(shortenable)
    }

    @ReactProp(name = "numberOfAllowedDrifts")
    fun setNumberOfAllowedDrifts(navigationView: RCTMapxusNavigationView, numberOfAllowedDrifts: Int?) {
        navigationView.setNumberOfAllowedDrifts(numberOfAllowedDrifts)
    }

    @ReactProp(name = "maximumDrift")
    fun setMaximumDrift(navigationView: RCTMapxusNavigationView, maximumDrift: Int?) {
        navigationView.setMaximumDrift(maximumDrift)
    }

    @ReactProp(name = "distanceToDestination")
    fun setDistanceToDestination(navigationView: RCTMapxusNavigationView, distanceToDestination: Int?) {
        navigationView.setDistanceToDestination(distanceToDestination)
    }

    override fun createViewInstance(reactContext: ThemedReactContext): RCTMapxusNavigationView {
        return RCTMapxusNavigationView(reactContext, this)
    }

    override fun customEvents(): MutableMap<String, String> = MapBuilder.builder<String, String>()
        .put(EventKeys.NAVI_ON_ARRIVAL_AT_DESTINATION, "onArrivalAtDestination")
        .put(EventKeys.NAVI_ON_EXCESSIVE_DRIFT, "onExcessiveDrift")
        .put(EventKeys.NAVI_ON_REFRESH_THE_ADSORPTION_LOCATION, "onRefreshTheAdsorptionLocation")
        .put(EventKeys.NAVI_ON_GET_NEWPATH, "onGetNewPath")
        .build()

    override fun getCommandsMap(): MutableMap<String, Int> {
        return MapBuilder.builder<String, Int>()
            .put("updatePath", METHOD_UPDATE_PATH)
            .put("start", METHOD_START)
            .put("stop", METHOD_STOP)
            .build()
    }

    override fun receiveCommand(navigationView: RCTMapxusNavigationView, commandId: Int, args: ReadableArray?) {
        when (commandId) {
            METHOD_UPDATE_PATH -> navigationView.updatePath(args)
            METHOD_START -> navigationView.start()
            METHOD_STOP -> navigationView.stop()
        }
    }
}