package com.mapxus.map.components.location

import android.annotation.SuppressLint
import android.view.View
import androidx.lifecycle.LifecycleOwner
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.views.view.ReactViewGroup
import com.mapxus.map.components.MapxusMapFeature
import com.mapxus.map.components.mapview.RCTMapxusMap
import com.mapxus.map.mapxusmap.api.map.FollowUserMode
import com.mapxus.map.mapxusmap.positioning.IndoorLocation

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
        )
    }

    fun setSimulateLocation(args: ReadableArray?) {
        val fakeLocation = args?.getMap(1)
        val lat = fakeLocation?.getDouble("latitude")
        val lon = fakeLocation?.getDouble("longitude")
        val floor = fakeLocation?.getString("altitude")
        val buildingId = fakeLocation?.getString("buildingId")
        locationProvider?.setIndoorLocation(
            IndoorLocation(
                "Fake",
                lat ?: 0.0,
                lon ?: 0.0,
                floor,
                buildingId,
                System.currentTimeMillis()
            )
        )
        mMapView?.mMapxusMap?.setLocationProvider(locationProvider)
        mMapView?.mMapxusMap?.followUserMode = mFollowUserMode
    }
}