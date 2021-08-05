package com.mapxus.map.components.visual

import android.annotation.SuppressLint
import android.content.Context
import android.view.View
import com.facebook.react.bridge.ReadableArray
import com.mapxus.map.components.MapxusMapFeature
import com.mapxus.map.components.mapview.RCTMapxusMap
import com.mapxus.visual.MapxusVisual

@SuppressLint("ViewConstructor")
class RCTMapxusVisualView(
    private val mContext: Context,
    private val mManager: RCTMapxusVisualViewManager
) : MapxusVisual(
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

    fun loadVisualViewWithFirstImg(args: ReadableArray?) {

    }

    fun unloadVisualView(args: ReadableArray?) {

    }

    fun moveToKey(args: ReadableArray?) {

    }

    fun moveCloseTo(args: ReadableArray?) {

    }

    fun resize(args: ReadableArray?) {

    }

    fun getBearing(args: ReadableArray?) {

    }

    fun setBearing(args: ReadableArray?) {

    }

    fun getVisualCenter(args: ReadableArray?) {

    }

    fun setVisualCenter(args: ReadableArray?) {

    }

    fun getZoom(args: ReadableArray?) {

    }

    fun setZoom(args: ReadableArray?) {

    }

    fun activateBearing(args: ReadableArray?) {

    }

    fun deactivateBearing(args: ReadableArray?) {

    }

    companion object {
    }

}