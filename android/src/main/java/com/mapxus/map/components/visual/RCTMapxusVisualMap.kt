package com.mapxus.map.components.visual

import android.annotation.SuppressLint
import android.content.Context
import android.view.View
import com.facebook.react.views.view.ReactViewGroup
import com.mapxus.map.components.MapxusMapFeature
import com.mapxus.map.components.mapview.RCTMapxusMap

@SuppressLint("ViewConstructor")
class RCTMapxusVisualMap(
    private val mContext: Context,
    private val mManager: RCTMapxusVisualMapManager
) : ReactViewGroup(
    mContext
), MapxusMapFeature {

    override fun addView(childView: View, childPosition: Int) {
    }

    override fun removeView(childView: View) {

    }

    override fun addToMap(mapView: RCTMapxusMap) {

    }

    override fun removeFromMap(mapView: RCTMapxusMap) {

    }

    override fun getMapxusChildView(): View = this

    companion object {
    }

}