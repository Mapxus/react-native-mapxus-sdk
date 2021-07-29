package com.mapxus.map.components.location

import android.annotation.SuppressLint
import android.view.View
import androidx.lifecycle.LifecycleOwner
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.views.view.ReactViewGroup
import com.mapxus.map.components.MapxusMapFeature
import com.mapxus.map.components.mapview.RCTMapxusMap
import com.mapxus.map.events.MapxusMapLocationEvent
import com.mapxus.map.events.constants.EventTypes
import com.mapxus.map.mapxusmap.api.map.FollowUserMode
import com.mapxus.map.mapxusmap.positioning.ErrorInfo
import com.mapxus.map.mapxusmap.positioning.IndoorLocation
import com.mapxus.map.mapxusmap.positioning.IndoorLocationProviderListener

/**
 * Created by Edison on 3/29/21.
 * Describe:
 */
@SuppressLint("ViewConstructor")
class RCTMapxusLocation(
    var mContext: ReactContext, private val mManager: RCTMapxusLocationManager,
) : ReactViewGroup(mContext), MapxusMapFeature {
    private var mMapView: RCTMapxusMap? = null
    private var mFollowUserMode: Int = FollowUserMode.FOLLOW_USER
    private var isError = false

    override fun addToMap(mapView: RCTMapxusMap?) {
        mMapView = mapView
        enableLocation()
    }

    override fun removeFromMap(mapView: RCTMapxusMap?) {
        mMapView = null
    }

    override fun getMapxusChildView(): View = this

    private fun enableLocation() {
        mMapView?.mMapxusMap?.setLocationProvider(
            MapxusPositioningProvider(
                mContext.currentActivity as LifecycleOwner,
                mContext
            ).apply {
                addListener(object : IndoorLocationProviderListener {
                    override fun onProviderStarted() {
                        mManager.handleEvent(
                            MapxusMapLocationEvent(
                                this@RCTMapxusLocation,
                                EventTypes.MAP_ON_LOCATION_STARTED,
                                WritableNativeMap()
                            )
                        )
                    }

                    override fun onProviderStopped() {
                        mManager.handleEvent(
                            MapxusMapLocationEvent(
                                this@RCTMapxusLocation,
                                EventTypes.MAP_ON_LOCATION_STOPPED,
                            )
                        )
                    }

                    override fun onProviderError(errorInfo: ErrorInfo) {
                        isError = true
                        val errorInfoWN: WritableMap = WritableNativeMap().apply {
                            putInt("errorCode", errorInfo.errorCode)
                            putString("errorMessage", errorInfo.errorMessage)
                        }
                        mManager.handleEvent(
                            MapxusMapLocationEvent(
                                this@RCTMapxusLocation,
                                EventTypes.MAP_ON_LOCATION_ERROR,
                                errorInfoWN
                            )
                        )
                    }

                    override fun onIndoorLocationChange(indoorLocation: IndoorLocation?) {
                        if (isError) {
                            isError = false
                        }
                        mManager.handleEvent(
                            MapxusMapLocationEvent(
                                this@RCTMapxusLocation,
                                EventTypes.MAP_ON_LOCATION_CHANGE,
                                WritableNativeMap().apply {
                                    putDouble("longitude", indoorLocation?.longitude ?: 0.0)
                                    putDouble("latitude", indoorLocation?.latitude ?: 0.0)
                                    putString("floor", indoorLocation?.floor)
                                    putString("buildingId", indoorLocation?.building)
                                    putDouble(
                                        "accuracy",
                                        indoorLocation?.accuracy?.toDouble() ?: 0.0
                                    )
                                    putDouble("timestamp", indoorLocation?.time?.toDouble() ?: 0.0)
                                })
                        )
                    }

                    override fun onCompassChanged(orientation: Float, sensorAccuracy: Int) {
                        mManager.handleEvent(
                            MapxusMapLocationEvent(
                                this@RCTMapxusLocation,
                                EventTypes.MAP_ON_LOCATION_COMPASS_CHANGE,
                                WritableNativeMap().apply {
                                    putDouble("orientation", orientation.toDouble())
                                    putInt("sensorAccuracy", sensorAccuracy)
                                }
                            )
                        )
                    }

                })
            })
        mMapView?.mMapxusMap?.followUserMode = mFollowUserMode
    }

    fun setFollowUserMode(followUserMode: Int) {
        if (isError) {
            enableLocation()
        }
        mFollowUserMode = followUserMode
        mMapView?.mMapxusMap?.followUserMode = mFollowUserMode
    }
}