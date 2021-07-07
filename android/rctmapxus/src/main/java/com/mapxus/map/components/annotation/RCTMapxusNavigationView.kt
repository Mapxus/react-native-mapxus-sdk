package com.mapxus.map.components.annotation

import android.annotation.SuppressLint
import android.view.View
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.views.view.ReactViewGroup
import com.mapxus.map.components.MapxusMapFeature
import com.mapxus.map.components.mapview.RCTMapxusMap
import com.mapxus.map.mapxusmap.api.services.model.IndoorLatLng
import com.mapxus.map.mapxusmap.api.services.model.planning.*
import com.mapxus.map.mapxusmap.overlay.route.WalkRouteOverlay

/**
 * Created by Edison on 2021/5/14.
 * Describe:
 */

@SuppressLint("ViewConstructor")
class RCTMapxusNavigationView(
    var mContext: ReactContext, private val mManager: RCTMapxusNavigationViewManager,
) : ReactViewGroup(mContext), MapxusMapFeature {
    private var mMapView: RCTMapxusMap? = null
    private var walkRouteOverlay: WalkRouteOverlay? = null

    override fun addToMap(mapView: RCTMapxusMap?) {
        mMapView = mapView
    }

    override fun removeFromMap(mapView: RCTMapxusMap?) {
        mMapView = null
    }

    override fun getMapxusChildView(): View = this

    fun paintRouteUsingPath(args: ReadableArray?) {
        mMapView?.symbolManager?.deleteAll()
        val routedata = args?.getMap(1)

        val route = RouteResponseDto().apply {
            hints = HintDto()
            info = InfoDto()
            paths = mutableListOf(PathDto().apply {
                distance = routedata?.getDouble("distance")
                weight = routedata?.getDouble("weight")
                time = routedata?.getDouble("time")?.toLong()
                bbox = arrayOf(
                    routedata?.getMap("bbox")?.getDouble("min_latitude"),
                    routedata?.getMap("bbox")?.getDouble("min_longitude"),
                    routedata?.getMap("bbox")?.getDouble("max_latitude"),
                    routedata?.getMap("bbox")?.getDouble("max_longitude")
                )
                points = LineString().apply {
                    type = routedata?.getMap("points")?.getString("type")
                    routedata?.getMap("points")?.getArray("coordinates")?.let {
                        val resultArr = Array(it.size()) { DoubleArray(2) }
                        for (i in 0 until it.size()) {
                            resultArr[i][0] = it.getMap(i).getDouble("longitude")
                            resultArr[i][1] = it.getMap(i).getDouble("latitude")
                        }
                        coordinates = resultArr
                    }
                }
                instructions = mutableListOf<InstructionDto>().apply {
                    routedata?.getArray("instructions")?.toArrayList()?.forEach {
                        add(InstructionDto().apply {
                            (it as HashMap<*, *>)["buildingId"]?.let {
                                buildingId = it as String
                            }

                            distance = it["distance"] as Double
                            heading = it["heading"] as Double
                            sign = (it["sign"] as Double).toInt()
                            it["interval"]?.let {
                                interval = arrayOf(
                                    ((it as ArrayList<*>)[0] as Double).toInt(),
                                    ((it)[1] as Double).toInt()
                                )
                            }
                            text = it["text"] as String
                            time = (it["time"] as Double).toLong()
                            it["floor"]?.let {
                                floor = it as String
                            }
                            it["type"]?.let {
                                type = it as String
                            }
                            streetName = it["streetName"] as String

                        })
                    }
                }
                val pathCoordinates: Array<DoubleArray> = points.coordinates
                val pathIndoorPoints: MutableList<IndoorLatLng> = java.util.ArrayList()

                for (instructionDto in instructions) {
                    val buildingId = instructionDto.buildingId
                    val floor = instructionDto.floor
                    val instructionIndoorPoints: MutableList<IndoorLatLng> = java.util.ArrayList()
                    val intervals = instructionDto.interval
                    for (j in intervals[0]..intervals[1]) {
                        val instructionPointCoordinate = pathCoordinates[j]
                        val indoorLatLng = IndoorLatLng(
                            instructionPointCoordinate[1],
                            instructionPointCoordinate[0], floor, buildingId
                        )
                        instructionIndoorPoints.add(indoorLatLng)
                    }
                    instructionDto.indoorPoints = instructionIndoorPoints

                    //取每个instruction的第一个点作为拐点
                    val instructionPointCoordinate = pathCoordinates[intervals[0]]
                    pathIndoorPoints.add(
                        IndoorLatLng(
                            instructionPointCoordinate[1],
                            instructionPointCoordinate[0], floor, buildingId
                        )
                    )
                }
                indoorPoints = pathIndoorPoints
            })
        }
        val origin = RoutePlanningPoint().apply {
            buildingId = args?.getArray(2)?.getMap(0)?.getString("buildingId")
            floor = args?.getArray(2)?.getMap(0)?.getString("floor")
            lat = args?.getArray(2)?.getMap(0)?.getDouble("latitude")
            lon = args?.getArray(2)?.getMap(0)?.getDouble("longitude")
        }
        val destination = RoutePlanningPoint().apply {
            buildingId = args?.getArray(2)?.getMap(1)?.getString("buildingId")
            floor = args?.getArray(2)?.getMap(1)?.getString("floor")
            lat = args?.getArray(2)?.getMap(1)?.getDouble("latitude")
            lon = args?.getArray(2)?.getMap(1)?.getDouble("longitude")
        }
        walkRouteOverlay = WalkRouteOverlay(
            mContext,
            mMapView?.mMapview?.mapboxMap,
            mMapView?.mMapxusMap,
            route,
            origin,
            destination,
            true
        ).apply {
            addToMap()
        }
    }

    fun cleanRoute() {
        walkRouteOverlay?.removeFromMap()
        walkRouteOverlay = null
    }

    fun changeOn(args: ReadableArray?) {
        //todo
    }

    fun focusOn(args: ReadableArray?) {
        //todo
    }
}