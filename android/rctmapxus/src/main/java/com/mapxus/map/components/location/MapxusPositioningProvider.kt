package com.mapxus.map.components.location

import android.annotation.SuppressLint
import android.content.Context
import android.location.Location
import android.util.Log
import androidx.lifecycle.LifecycleOwner
import com.mapxus.map.mapxusmap.positioning.ErrorInfo
import com.mapxus.map.mapxusmap.positioning.IndoorLocation
import com.mapxus.map.mapxusmap.positioning.IndoorLocationProvider
import com.mapxus.map.utils.SharedPreferencesUtil.get
import com.mapxus.positioning.positioning.api.MapxusLocation
import com.mapxus.positioning.positioning.api.MapxusPositioningClient
import com.mapxus.positioning.positioning.api.MapxusPositioningListener
import com.mapxus.positioning.positioning.api.PositioningState

/**
 * @author frank
 * @date 21/5/2020
 */
@SuppressLint("LongLogTag")
class MapxusPositioningProvider(var lifecycleOwner: LifecycleOwner, private val context: Context) :
    IndoorLocationProvider() {
    private var positioningClient: MapxusPositioningClient? = null
    private var started = false
    private var appid = ""
    private var secret = ""

    init {
        appid = get(context, "appid", "", "UserToken") as String
        secret = get(context, "secret", "", "UserToken") as String
    }

    override fun supportsFloor(): Boolean {
        return true
    }

    override fun start() {
        positioningClient =
            MapxusPositioningClient.getInstance(
                lifecycleOwner,
                context.applicationContext,
                appid,
                secret
            )
        positioningClient?.addPositioningListener(mapxusPositioningListener)
        positioningClient?.start()
        started = true
    }

    override fun stop() {
        if (positioningClient != null) {
            positioningClient?.stop()
        }
        started = false
    }

    override fun isStarted(): Boolean {
        return started
    }

    private val mapxusPositioningListener: MapxusPositioningListener =
        object : MapxusPositioningListener {
            override fun onStateChange(positionerState: PositioningState) {
                when (positionerState) {
                    PositioningState.STOPPED -> {
                        dispatchOnProviderStopped()
                    }
                    PositioningState.RUNNING -> {
                        dispatchOnProviderStarted()
                    }
                    else -> {
                    }
                }
            }

            override fun onError(errorInfo: com.mapxus.positioning.positioning.api.ErrorInfo) {
                Log.e(TAG, errorInfo.errorMessage)
                dispatchOnProviderError(ErrorInfo(errorInfo.errorCode, errorInfo.errorMessage))
            }

            override fun onOrientationChange(orientation: Float, sensorAccuracy: Int) {
                dispatchCompassChange(orientation, sensorAccuracy)
            }

            override fun onLocationChange(mapxusLocation: MapxusLocation?) {
                if (mapxusLocation == null) {
                    return
                }
                val location = Location("MapxusPositioning")
                location.latitude = mapxusLocation.latitude
                location.longitude = mapxusLocation.longitude
                location.time = System.currentTimeMillis()
                val floor =
                    if (mapxusLocation.mapxusFloor == null) null else mapxusLocation.mapxusFloor.code
                val building = mapxusLocation.buildingId
                val indoorLocation = IndoorLocation(location, building, floor)
                indoorLocation.accuracy = mapxusLocation.accuracy
                dispatchIndoorLocationChange(indoorLocation)
            }
        }

    companion object {
        private const val TAG = "MapxusPositioningProvider"
    }
}