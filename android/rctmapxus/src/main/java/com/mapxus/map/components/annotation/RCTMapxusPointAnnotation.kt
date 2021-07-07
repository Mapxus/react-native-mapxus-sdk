package com.mapxus.map.components.annotation

import android.annotation.SuppressLint
import android.content.Context
import android.graphics.Bitmap
import android.graphics.PointF
import android.view.View
import android.view.View.OnLayoutChangeListener
import com.facebook.react.bridge.ReactContext
import com.facebook.react.views.view.ReactViewGroup
import com.mapbox.geojson.Point
import com.mapbox.mapboxsdk.geometry.LatLng
import com.mapbox.mapboxsdk.maps.MapboxMap
import com.mapbox.mapboxsdk.plugins.annotation.Symbol
import com.mapbox.mapboxsdk.plugins.annotation.SymbolOptions
import com.mapxus.map.components.MapxusMapFeature
import com.mapxus.map.components.mapview.RCTMapxusMap
import com.mapxus.map.events.MapxusPointAnnotationClickEvent
import com.mapxus.map.events.MapxusPointAnnotationDragEvent
import com.mapxus.map.events.constants.EventTypes
import com.mapxus.map.mapxusmap.api.map.MapxusMap
import com.mapxus.map.mapxusmap.api.map.model.IndoorBuilding
import com.mapxus.map.utils.BitmapUtils
import com.mapxus.map.utils.GeoJSONUtils
import java.util.*
import kotlin.concurrent.timerTask

@SuppressLint("ViewConstructor")
class RCTMapxusPointAnnotation(
    private val mContext: Context,
    private val mManager: RCTMapxusPointAnnotationManager
) : ReactViewGroup(
    mContext
), OnLayoutChangeListener, MapxusMapFeature, MapxusMap.OnFloorChangeListener,
    MapxusMap.OnBuildingChangeListener {
    var marker: Symbol? = null
        private set
    private var mMap: MapboxMap? = null
    private var mMapxus: RCTMapxusMap? = null
    private val mHasChildren = false
    private var mCoordinate: Point? = null
    var iD: String? = null
    private val mTitle: String? = null
    private val mSnippet: String? = null
    private var mBuildingId: String? = null
    private var mFloor: String? = null
    private var mAnchor: Array<Float>? = null
    private val mIsSelected = false
    private var mDraggable = false
    private var mChildView: View? = null
    private var mChildBitmap: Bitmap? = null
    private var mChildBitmapId: String? = null
    var calloutView: View? = null
        private set
    private var mCalloutSymbol: Symbol? = null
    private var mCalloutBitmap: Bitmap? = null
    private var mCalloutBitmapId: String? = null
    override fun addView(childView: View, childPosition: Int) {
        if (childView is RCTMGLCallout) {
            calloutView = childView
        } else {
            mChildView = childView
        }
        childView.addOnLayoutChangeListener(this)
        if (mMapxus != null) {
            mMapxus!!.offscreenAnnotationViewContainer()?.addView(childView)
        }
        Timer().schedule(timerTask {
            (mContext as ReactContext).runOnUiQueueThread {
                refresh()
            }
        }, 400)
    }

    override fun removeView(childView: View) {
        if (mChildView != null) {
            mMap!!.getStyle { style ->
                style.removeImage(mChildBitmapId!!)
                mChildView = null
                calloutView = null
                mChildBitmap = null
                mChildBitmapId = null
                updateOptions()
            }
        }
        if (mMapxus != null) {
            mMapxus!!.offscreenAnnotationViewContainer()?.removeView(childView)
        }
    }

    override fun onLayoutChange(
        v: View, left: Int, top: Int, right: Int, bottom: Int, oldLeft: Int, oldTop: Int,
        oldRight: Int, oldBottom: Int
    ) {
        if (left == 0 && top == 0 && right == 0 && bottom == 0) {
            return
        }
        if (left != oldLeft || right != oldRight || top != oldTop || bottom != oldBottom) {
            refreshBitmap(v, left, top, right, bottom)
        }
    }

    private fun refreshBitmap(
        v: View,
        left: Int = v.left,
        top: Int = v.top,
        right: Int = v.right,
        bottom: Int = v.bottom
    ) {
        val bitmap = BitmapUtils.viewToBitmap(v, left, top, right, bottom)
        val bitmapId = v.id.toString()
        addBitmapToStyle(bitmap, bitmapId)
        if (v is RCTMGLCallout) {
            mCalloutBitmap = bitmap
            mCalloutBitmapId = bitmapId
        } else {
            if (bitmap != null) {
                mChildBitmap = bitmap
                mChildBitmapId = bitmapId
                updateOptions()
            }
        }
    }

    val latLng: LatLng
        get() = GeoJSONUtils.toLatLng(mCoordinate)
    val mapboxID: Long
        get() = if (marker == null) -1 else marker!!.id

    fun setCoordinate(point: Point?) {
        mCoordinate = point
        if (marker != null) {
            marker!!.latLng = GeoJSONUtils.toLatLng(point)
            mMapxus?.symbolManager?.update(marker)
        }
        if (mCalloutSymbol != null) {
            mCalloutSymbol!!.latLng = GeoJSONUtils.toLatLng(point)
            mMapxus?.symbolManager?.update(mCalloutSymbol)
        }
    }

    fun setBuildingId(buildingId: String?) {
        mBuildingId = buildingId
    }

    fun setFloor(floor: String?) {
        mFloor = floor
        floor?.let {
            if (mMapxus != null) {
                if (mMapxus?.mMapxusMap?.currentFloor != it) {
                    mMapxus?.mMapxusMap?.switchFloor(it)
                }
                if (marker != null && !mBuildingId.isNullOrEmpty()) {

                    marker!!.iconOpacity =
                        if (mBuildingId == mMapxus?.mMapxusMap?.currentIndoorBuilding?.buildingId && it == mMapxus?.mMapxusMap?.currentFloor) 1f else 0f
                    mMapxus?.symbolManager?.update(marker)
                }
                if (mCalloutSymbol != null) {
                    mCalloutSymbol!!.iconOpacity =
                        if (mBuildingId == mMapxus?.mMapxusMap?.currentIndoorBuilding?.buildingId && it == mMapxus?.mMapxusMap?.currentFloor) 1f else 0f
                    mMapxus!!.symbolManager?.update(mCalloutSymbol)
                }
            }
        }
    }

    fun setAnchor(x: Float, y: Float) {
        mAnchor = arrayOf(x, y)
        if (marker != null) {
            updateAnchor()
            mMapxus?.symbolManager?.update(marker)
        }
    }

    fun setDraggable(draggable: Boolean) {
        mDraggable = draggable
        if (marker != null) {
            marker!!.isDraggable = draggable
            mMapxus?.symbolManager?.update(marker)
        }
    }

    fun onSelect(shouldSendEvent: Boolean) {
        if (calloutView != null) {
            makeCallout()
        }
        if (shouldSendEvent) {
            mManager.handleEvent(makeEvent(true))
        }
    }

    fun onDeselect() {
        mManager.handleEvent(makeEvent(false))
        if (mCalloutSymbol != null) {
            mMapxus?.symbolManager?.delete(mCalloutSymbol)
            mCalloutSymbol = null
        }
    }

    fun onDragStart() {
        val latLng = marker!!.latLng
        mCoordinate = Point.fromLngLat(latLng.longitude, latLng.latitude)
        mManager.handleEvent(makeDragEvent(EventTypes.ANNOTATION_DRAG_START))
    }

    fun onDrag() {
        val latLng = marker!!.latLng
        mCoordinate = Point.fromLngLat(latLng.longitude, latLng.latitude)
        mManager.handleEvent(makeDragEvent(EventTypes.ANNOTATION_DRAG))
    }

    fun onDragEnd() {
        val latLng = marker!!.latLng
        mCoordinate = Point.fromLngLat(latLng.longitude, latLng.latitude)
        mManager.handleEvent(makeDragEvent(EventTypes.ANNOTATION_DRAG_END))
    }

    fun makeMarker() {
        val options = SymbolOptions()
            .withLatLng(GeoJSONUtils.toLatLng(mCoordinate))
            .withDraggable(mDraggable)
            .withIconSize(1.0f)
            .withSymbolSortKey(10.0f)
        val symbolManager = mMapxus!!.symbolManager
        if (symbolManager != null) {
            marker = symbolManager.create(options)
            updateOptions()
        }
    }

    private fun updateOptions() {
        if (marker != null) {
            updateIconImage()
            updateAnchor()
            mMapxus?.symbolManager?.update(marker)
        }
    }

    private fun updateIconImage() {
        if (mChildView != null) {
            if (mChildBitmapId != null) {
                marker!!.iconImage = mChildBitmapId
            }
        } else {
            marker!!.iconImage = MARKER_IMAGE_ID
            marker!!.iconAnchor = "bottom"
        }
    }

    private fun updateAnchor() {
        if (mAnchor != null && mChildView != null && mChildBitmap != null) {
            var w = mChildBitmap!!.width
            var h = mChildBitmap!!.height
            val scale = resources.displayMetrics.density
            w = (w / scale).toInt()
            h = (h / scale).toInt()
            marker!!.iconAnchor = "top-left"
            marker!!.iconOffset = PointF(w * mAnchor!![0] * -1, h * mAnchor!![1] * -1)
        }
    }

    private fun makeCallout() {
        var yOffset = -28f
        if (mChildView != null) {
            if (mChildBitmap != null) {
                val scale = resources.displayMetrics.density
                var h = mChildBitmap!!.height / 2
                h = (h / scale).toInt()
                yOffset = h.toFloat() * -1
            }
        }
        val options = SymbolOptions()
            .withLatLng(GeoJSONUtils.toLatLng(mCoordinate))
            .withIconImage(mCalloutBitmapId)
            .withIconSize(1.0f)
            .withIconAnchor("bottom")
            .withIconOffset(arrayOf(0f, yOffset))
            .withSymbolSortKey(11.0f)
            .withDraggable(false)
        val symbolManager = mMapxus?.symbolManager
        if (symbolManager != null) {
            mCalloutSymbol = symbolManager.create(options)
        }
    }

    private fun addBitmapToStyle(bitmap: Bitmap?, bitmapId: String?) {
        if (mMap != null && bitmapId != null && bitmap != null) {
            mMap!!.getStyle { style -> style.addImage(bitmapId, bitmap) }
        }
    }

    private fun makeEvent(isSelect: Boolean): MapxusPointAnnotationClickEvent {
        val type =
            if (isSelect) EventTypes.ANNOTATION_SELECTED else EventTypes.ANNOTATION_DESELECTED
        val latLng = GeoJSONUtils.toLatLng(mCoordinate)
        val screenPos = getScreenPosition(latLng)
        return MapxusPointAnnotationClickEvent(this, latLng, screenPos, type)
    }

    private fun makeDragEvent(type: String): MapxusPointAnnotationDragEvent {
        val latLng = GeoJSONUtils.toLatLng(mCoordinate)
        val screenPos = getScreenPosition(latLng)
        return MapxusPointAnnotationDragEvent(this, latLng, screenPos, type)
    }

    private val displayDensity: Float
        private get() = mContext.resources.displayMetrics.density

    private fun getScreenPosition(latLng: LatLng): PointF {
        val screenPos = mMap!!.projection.toScreenLocation(latLng)
        val density = displayDensity
        screenPos.x /= density
        screenPos.y /= density
        return screenPos
    }

    fun refresh() {
        if (mChildView != null) {
            refreshBitmap(mChildView!!)
        }
    }

    override fun addToMap(mapView: RCTMapxusMap) {
        mMapxus = mapView
        mMap = mMapxus?.mMapview?.mapboxMap
        mapView.mMapxusMap?.addOnBuildingChangeListener(this)
        mapView.mMapxusMap?.addOnFloorChangeListener(this)
        makeMarker()
        if (mChildView != null) {
            if (!mChildView!!.isAttachedToWindow) {
                mMapxus!!.offscreenAnnotationViewContainer()?.addView(mChildView)
            }
            addBitmapToStyle(mChildBitmap, mChildBitmapId)
            updateOptions()
        }
        if (calloutView != null) {
            if (!calloutView!!.isAttachedToWindow && mCalloutSymbol != null) {
                mMapxus!!.offscreenAnnotationViewContainer()?.addView(calloutView)
            }
            addBitmapToStyle(mCalloutBitmap, mCalloutBitmapId)
        }
        mFloor?.let {
            if (mMapxus?.mMapxusMap?.currentFloor != it) {
                mMapxus?.mMapxusMap?.switchFloor(it)
            }
        }
    }

    override fun removeFromMap(mapView: RCTMapxusMap) {
        val map = (if (mMapxus != null) mMapxus else mapView) ?: return
        if (marker != null) {
            map.symbolManager?.delete(marker)
        }
        if (mChildView != null) {
            map.offscreenAnnotationViewContainer()?.removeView(mChildView)
        }
        if (calloutView != null) {
            map.offscreenAnnotationViewContainer()?.removeView(calloutView)
        }
    }

    override fun getMapxusChildView(): View = this

    companion object {
        private const val MARKER_IMAGE_ID = "MARKER_IMAGE_ID"
    }

    override fun onFloorChange(indoorBuilding: IndoorBuilding, floorName: String) {
        if (marker != null && !mBuildingId.isNullOrEmpty()) {

            marker!!.iconOpacity =
                if (mBuildingId == indoorBuilding.buildingId && mFloor == floorName) 1f else 0f
            mMapxus?.symbolManager?.update(marker)
        }
        if (mCalloutSymbol != null) {
            mCalloutSymbol!!.iconOpacity =
                if (mBuildingId == indoorBuilding.buildingId && mFloor == floorName) 1f else 0f
            mMapxus!!.symbolManager?.update(mCalloutSymbol)
        }
    }

    override fun onBuildingChange(indoorBuilding: IndoorBuilding?) {
        if (marker != null && !mBuildingId.isNullOrEmpty()) {
            marker!!.iconOpacity = if (indoorBuilding != null) 0f else 1f
            mMapxus!!.symbolManager?.update(marker)
        }
        if (mCalloutSymbol != null) {
            mCalloutSymbol!!.iconOpacity = if (indoorBuilding != null) 0f else 1f
            mMapxus!!.symbolManager?.update(mCalloutSymbol)
        }
    }
}