package com.mapxus.map.components.visual

import android.annotation.SuppressLint
import android.content.Context
import android.view.View
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.views.view.ReactViewGroup
import com.mapxus.map.components.MapxusMapFeature
import com.mapxus.map.components.mapview.RCTMapxusMap
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
        val buildingImage = BuildingImage().apply {
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
    }

    fun cleanLayer() {
        visualPolylineOverlay?.removeFromMap()
    }

    fun changeOn(args: ReadableArray?) {

    }

    companion object {
    }

}