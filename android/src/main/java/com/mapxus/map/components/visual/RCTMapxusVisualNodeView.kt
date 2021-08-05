package com.mapxus.map.components.visual

import android.annotation.SuppressLint
import android.content.Context
import android.view.View
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.views.view.ReactViewGroup
import com.mapxus.map.components.MapxusMapFeature
import com.mapxus.map.components.mapview.RCTMapxusMap
import com.mapxus.visual.overlay.polyline.VisualPolylineOverlay

@SuppressLint("ViewConstructor")
class RCTMapxusVisualNodeView(
    private val mContext: Context,
    private val mManager: RCTMapxusVisualNodeViewManager
) : ReactViewGroup(
    mContext
), MapxusMapFeature {

    private var visualPolylineOverlay : VisualPolylineOverlay? = null

    override fun addView(childView: View, childPosition: Int) {

    }

    override fun removeView(childView: View) {

    }

    override fun addToMap(mapView: RCTMapxusMap) {

    }

    override fun removeFromMap(mapView: RCTMapxusMap) {
        visualPolylineOverlay?.removeFromMap()
    }

    override fun getMapxusChildView(): View = this

    fun renderFlagUsingNodes(args: ReadableArray?) {

    }

    fun cleanLayer() {
        visualPolylineOverlay?.removeFromMap()
    }

    fun changeOn(args: ReadableArray?) {

    }

    companion object {
    }

}