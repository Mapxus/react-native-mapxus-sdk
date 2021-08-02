package com.mapxus.map.components.location

import android.content.Context
import android.util.Log
import androidx.lifecycle.LifecycleOwner
import com.mapxus.map.mapxusmap.positioning.ErrorInfo
import com.mapxus.map.mapxusmap.positioning.IndoorLocation
import com.mapxus.map.mapxusmap.positioning.IndoorLocationProvider
import com.mapxus.map.utils.SharedPreferencesUtil
import com.mapxus.positioning.positioning.api.MapxusLocation
import com.mapxus.positioning.positioning.api.MapxusPositioningClient
import com.mapxus.positioning.positioning.api.MapxusPositioningListener
import com.mapxus.positioning.positioning.api.PositioningState

class FakePositioningProvider(
    private val lifecycleOwner: LifecycleOwner,
    private val context: Context
) : IndoorLocationProvider() {
    private var positioningClient: MapxusPositioningClient? = null
    private var started = false
    private var indoorLocation: IndoorLocation? = null
    private var appid = ""
    private var secret = ""

    init {
        appid = SharedPreferencesUtil.get(context, "appid", "", "UserToken") as String
        secret = SharedPreferencesUtil.get(context, "secret", "", "UserToken") as String
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
        positioningClient?.stop()
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

            override fun onLocationChange(mapxusLocation: MapxusLocation) {
                if (indoorLocation != null) {
                    dispatchIndoorLocationChange(indoorLocation)
                }
            }
        }

    fun setIndoorLocation(indoorLocation: IndoorLocation?) {
        this.indoorLocation = indoorLocation
    }

    companion object {
        private const val TAG = "FakePositioningProvider"
    }
}