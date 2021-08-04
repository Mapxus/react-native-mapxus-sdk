package com.mapxus.map.components.annotation

import android.annotation.SuppressLint
import android.view.View
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.views.view.ReactViewGroup
import com.mapxus.map.components.MapxusMapFeature
import com.mapxus.map.components.mapview.RCTMapxusMap
import com.mapxus.map.mapxusmap.api.services.model.planning.PathDto

/**
 * Created by Edison on 2021/5/14.
 * Describe:
 */

@SuppressLint("ViewConstructor")
class RCTMapxusNavigationView(
    var mContext: ReactContext, private val mManager: RCTMapxusNavigationViewManager,
) : ReactViewGroup(mContext), MapxusMapFeature {
    private var mMapView: RCTMapxusMap? = null
    private var mAdsorbable: Boolean? = null
    private var mShortenable: Boolean? = null
    private var mNumberOfAllowedDrifts: Int? = null
    private var mMaximumDrift: Int? = null
    private var mDistanceToDestination: Int? = null
    private var mPathDto: PathDto? = null

    override fun addToMap(mapView: RCTMapxusMap?) {
        mMapView = mapView
    }

    override fun removeFromMap(mapView: RCTMapxusMap?) {
        mMapView = null
    }

    fun updatePath(args: ReadableArray?) {
        //todo
    }

    fun start() {
        //todo
    }

    fun stop() {
        //todo
    }

    override fun getMapxusChildView(): View = this
    fun setAdsorbable(adsorbable: Boolean?) {
        mAdsorbable = adsorbable
    }

    fun setShortenable(shortenable: Boolean?) {
        mShortenable = shortenable
    }

    fun setNumberOfAllowedDrifts(numberOfAllowedDrifts: Int?) {
        mNumberOfAllowedDrifts = numberOfAllowedDrifts
    }

    fun setMaximumDrift(maximumDrift: Int?) {
        mMaximumDrift = maximumDrift
    }

    fun setDistanceToDestination(distanceToDestination: Int?) {
        mDistanceToDestination = distanceToDestination
    }


}