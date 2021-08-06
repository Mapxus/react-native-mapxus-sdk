package com.mapxus.map.components.visual

import android.annotation.SuppressLint
import android.content.Context
import android.view.View
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.views.view.ReactViewGroup
import com.mapxus.map.components.MapxusMapFeature
import com.mapxus.map.components.mapview.RCTMapxusMap
import com.mapxus.map.events.MapxusMapVisualNodeEvent
import com.mapxus.map.events.constants.EventKeys
import com.mapxus.visual.models.*
import com.mapxus.visual.overlay.polyline.VisualPolylineOverlay

@SuppressLint("ViewConstructor")
class RCTMapxusVisualNodeView(
    private val mContext: Context,
    private val mManager: RCTMapxusVisualNodeViewManager
) : ReactViewGroup(
    mContext
), MapxusMapFeature {

    private var visualPolylineOverlay: VisualPolylineOverlay? = null
    private var mMapView: RCTMapxusMap? = null
    private var buildingImage: BuildingImage? = null

    override fun addView(childView: View, childPosition: Int) {

    }

    override fun removeView(childView: View) {

    }

    override fun addToMap(mapView: RCTMapxusMap) {
        mMapView = mapView
    }

    override fun removeFromMap(mapView: RCTMapxusMap) {
        visualPolylineOverlay?.removeFromMap()
        mMapView = null
    }

    override fun getMapxusChildView(): View = this

    fun renderFlagUsingNodes(args: ReadableArray?) {
        val buildingImageJson = args?.getArray(1)
        buildingImage = BuildingImage().apply {
            buildingId = mMapView?.mMapxusMap?.currentIndoorBuilding?.buildingId
            floorImages = mutableListOf<FloorImage>().apply {
                buildingImageJson?.toArrayList()?.forEach {
                    add(FloorImage().apply {
                        (it as HashMap<*, *>)["floor"]?.let {
                            floor = it as String
                        }
                        it["nodes"]?.let {
                            sequenceImages = mutableListOf<SequenceImage>().apply {
                                (it as ArrayList<*>).forEach {
                                    add(SequenceImage().apply {
                                        (it as HashMap<*, *>)["sequenceId"]?.let {
                                            sequenceId = it as String
                                        }
                                        it["nodes"]?.let {
                                            images = mutableListOf<VisualImage>().apply {
                                                (it as ArrayList<*>).forEach {
                                                    add(VisualImage().apply {
                                                        (it as HashMap<*, *>)["key"]?.let {
                                                            key = it as String
                                                        }
                                                        it["buildingId"]?.let {
                                                            buildingId = it as String
                                                        }
                                                        it["floor"]?.let {
                                                            floorName = it as String
                                                        }
                                                        it["bearing"]?.let {
                                                            ca = it as Double
                                                        }
                                                        location = LatLng().apply {
                                                            it["latitude"]?.let {
                                                                lat = it as Double
                                                            }
                                                            it["longitude"]?.let {
                                                                lon = it as Double
                                                            }
                                                        }
                                                    })
                                                }
                                            }
                                        }
                                    })
                                }
                            }
                        }
                    })
                }
            }
        }
        visualPolylineOverlay = VisualPolylineOverlay(
            mContext,
            mMapView?.mMapview?.mapboxMap,
            mMapView?.mMapxusMap,
            buildingImage
        )
        visualPolylineOverlay?.addToMap()
        visualPolylineOverlay?.setOnPolylineClickListener { imageKey ->
            buildingImage?.floorImages?.filter { it.floor == mMapView?.mMapxusMap?.currentFloor }
                ?.forEach {
                    it.sequenceImages.forEach {
                        it.images.filter { imageKey == it.key }.forEach {
                            mManager.handleEvent(MapxusMapVisualNodeEvent(
                                this,
                                EventKeys.VISUAL_ON_TAPPED_FLAG,
                                WritableNativeMap().apply {
                                    putString("key", it.key)
                                    putString("buildingId", it.buildingId)
                                    putString("floor", it.floorName)
                                    putDouble("latitude", it.location.lat)
                                    putDouble("longitude", it.location.lon)
                                    putDouble("bearing", it.ca)
                                }
                            ))
                        }
                    }
                }
            visualPolylineOverlay?.setMapMarker(imageKey)
        }
    }

    fun cleanLayer() {
        visualPolylineOverlay?.removeFromMap()
        buildingImage = null
    }

    fun changeOn(args: ReadableArray?) {

    }

    companion object {
    }

}