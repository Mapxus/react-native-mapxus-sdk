package com.mapxus.map.components.location

import android.annotation.SuppressLint
import android.view.View
import androidx.lifecycle.LifecycleOwner
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.views.view.ReactViewGroup
import com.mapxus.map.components.MapxusMapFeature
import com.mapxus.map.components.mapview.RCTMapxusMap
import com.mapxus.map.events.MapxusMapCommonEvent
import com.mapxus.map.events.constants.EventKeys
import com.mapxus.map.mapxusmap.api.map.FollowUserMode
import com.mapxus.map.mapxusmap.positioning.ErrorInfo
import com.mapxus.map.mapxusmap.positioning.IndoorLocation
import com.mapxus.map.mapxusmap.positioning.IndoorLocationProviderListener

/**
 * Created by Edison on 3/29/21.
 * Describe:
 */
@SuppressLint("ViewConstructor")
class RCTMapxusSimulateLocation(
    var mContext: ReactContext, private val mManager: RCTMapxusSimulateLocationManager,
) : ReactViewGroup(mContext), MapxusMapFeature {
    private var mMapView: RCTMapxusMap? = null
    private var mFollowUserMode: Int = FollowUserMode.FOLLOW_USER
    private var locationProvider: FakePositioningProvider? = null

    override fun addToMap(mapView: RCTMapxusMap?) {
        mMapView = mapView
        enableLocation()
    }

    override fun removeFromMap(mapView: RCTMapxusMap?) {
        mMapView = null
    }

    override fun getMapxusChildView(): View = this

    private fun enableLocation() {
        locationProvider = FakePositioningProvider(
            mContext.currentActivity as LifecycleOwner,
            mContext
        ).apply {
            addListener(object : IndoorLocationProviderListener{
                override fun onProviderStarted() {
                }

                override fun onProviderStopped() {
                }

                override fun onProviderError(errorInfo: ErrorInfo?) {
                }

                override fun onIndoorLocationChange(indoorLocation: IndoorLocation?) {
                }

                override fun onCompassChanged(angle: Float, sensorAccuracy: Int) {
                    mManager.handleEvent(
                        MapxusMapCommonEvent(
                            this@RCTMapxusSimulateLocation,
                            EventKeys.MAPXUS_USER_SIMULATE_LOCATION_UPDATE,
                        )
                    )
                }

            })
        }
    }

    fun setSimulateLocation(args: ReadableArray?) {
        val fakeLocation = args?.getMap(1)
        val lat = fakeLocation?.getDouble("latitude")
        val lon = fakeLocation?.getDouble("longitude")
        val floor = fakeLocation?.getInt("floor")
        val buildingId = fakeLocation?.getString("buildingId")
        locationProvider?.setIndoorLocation(
            IndoorLocation(
                "Fake",
                lat ?: 0.0,
                lon ?: 0.0,
                floor.toString(),
                buildingId,
                System.currentTimeMillis()
            )
        )
        mMapView?.mMapxusMap?.setLocationProvider(locationProvider)
        mMapView?.mMapxusMap?.followUserMode = mFollowUserMode
    }
}