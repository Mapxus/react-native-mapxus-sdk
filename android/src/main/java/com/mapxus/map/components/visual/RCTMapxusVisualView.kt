package com.mapxus.map.components.visual

import android.annotation.SuppressLint
import android.content.Context
import android.view.View
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.WritableNativeMap
import com.mapxus.map.events.AndroidCallbackEvent
import com.mapxus.map.events.MapxusMapVisualNodeEvent
import com.mapxus.map.events.constants.EventKeys
import com.mapxus.visual.MapxusVisual
import com.mapxus.visual.VisualEventListener
import com.mapxus.visual.models.IndoorLatLng
import com.mapxus.visual.models.Node

@SuppressLint("ViewConstructor")
class RCTMapxusVisualView(
    private val mContext: Context,
    private val mManager: RCTMapxusVisualViewManager
) : MapxusVisual(
    mContext
) {

    init {
        addEventListener(object : VisualEventListener {
            override fun bearingChanged(p0: Double) {
                mManager.handleEvent(MapxusMapVisualNodeEvent(
                    this@RCTMapxusVisualView,
                    EventKeys.VISUAL_ON_BEARING_CHANGED,
                    WritableNativeMap().apply {
                        putDouble("bearing", p0)
                    }
                ))
            }

            override fun loadingChanged() {
                mManager.handleEvent(MapxusMapVisualNodeEvent(
                    this@RCTMapxusVisualView,
                    EventKeys.VISUAL_ON_LOADING_CHANGED,
                    WritableNativeMap().apply {
                        putBoolean("isLoading", false)
                    }
                ))
            }

            override fun nodeChanged(p0: Node?) {
                mManager.handleEvent(MapxusMapVisualNodeEvent(
                    this@RCTMapxusVisualView,
                    EventKeys.VISUAL_ON_NODE_CHANGED,
                    WritableNativeMap().apply {
                        putString("key", p0?.key)
                        putString("buildingId", p0?.buildingId)
                        putString("floor", p0?.floor)
                        putDouble("latitude", p0?.lat ?: 0.0)
                        putDouble("longitude", p0?.lnt ?: 0.0)
                        putDouble("bearing", p0?.ca ?: 0.0)
                    }
                ))
            }

        })
    }

    fun diposeView() {
        clearEventListener()
    }

    fun loadVisualViewWithFirstImg(args: ReadableArray?) {
        this.visibility = View.VISIBLE
        moveToKey(args?.getString(1))
    }

    fun unloadVisualView(args: ReadableArray?) {
        this.visibility = View.GONE
    }

    fun moveToKey(args: ReadableArray?) {
        moveToKey(args?.getString(1))
    }

    fun moveCloseTo(args: ReadableArray?) {
        moveCloseTo(IndoorLatLng().apply {
            lat = 0.0
            lon = 0.0
            buildingId = args?.getString(1)
            floor = args?.getString(2)
        })
    }

    fun resize(args: ReadableArray?) {
        resize()
    }

    fun getBearing(args: ReadableArray?) {
        mManager.handleEvent(
            AndroidCallbackEvent(
                this,
                args?.getString(0),
                WritableNativeMap().apply {
                    putDouble("bearing", bearing)
                })
        )
    }

    fun setBearing(args: ReadableArray?) {
        bearing = args?.getDouble(1) ?: 0.0
    }

    fun getVisualCenter(args: ReadableArray?) {

    }

    fun setVisualCenter(args: ReadableArray?) {

    }

    fun getZoom(args: ReadableArray?) {
        mManager.handleEvent(
            AndroidCallbackEvent(
                this,
                args?.getString(0),
                WritableNativeMap().apply {
                    putDouble("zoom", zoom)
                })
        )
    }

    fun setZoom(args: ReadableArray?) {
        zoom = args?.getDouble(1) ?: 0.0
    }

    fun activateBearing(args: ReadableArray?) {

    }

    fun deactivateBearing(args: ReadableArray?) {

    }

    companion object {
    }
}