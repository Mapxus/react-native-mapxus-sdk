package com.mapxus.map.components.annotation

import android.annotation.SuppressLint
import android.view.View
import androidx.lifecycle.LifecycleOwner
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.WritableNativeArray
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.views.view.ReactViewGroup
import com.mapxus.map.components.MapxusMapFeature
import com.mapxus.map.components.location.MapxusNavigationPositioningProvider
import com.mapxus.map.components.mapview.RCTMapxusMap
import com.mapxus.map.events.MapxusMapCommonEvent
import com.mapxus.map.events.constants.EventKeys
import com.mapxus.map.mapxusmap.api.map.FollowUserMode
import com.mapxus.map.mapxusmap.api.services.model.IndoorLatLng
import com.mapxus.map.mapxusmap.api.services.model.planning.InstructionDto
import com.mapxus.map.mapxusmap.api.services.model.planning.LineString
import com.mapxus.map.mapxusmap.api.services.model.planning.PathDto
import com.mapxus.map.mapxusmap.positioning.ErrorInfo
import com.mapxus.map.mapxusmap.positioning.IndoorLocation
import com.mapxus.map.mapxusmap.positioning.IndoorLocationProviderListener

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
    private var mDistanceToDestination: Double? = null
    private var mPathDto: PathDto = PathDto()
    private var isNavigation: Boolean? = null
    private var mapxusPositioningProvider: MapxusNavigationPositioningProvider? = null

    override fun addToMap(mapView: RCTMapxusMap?) {
        mMapView = mapView
        mapxusPositioningProvider = MapxusNavigationPositioningProvider(
            mContext.currentActivity as LifecycleOwner,
            mContext,
            mManager, this
        )
        mMapView?.mMapxusMap?.setLocationProvider(mapxusPositioningProvider)
    }

    override fun removeFromMap(mapView: RCTMapxusMap?) {
        mMapView = null
        mapxusPositioningProvider = null
        mapxusPositioningProvider?.setOnReachListener(null)
        mapxusPositioningProvider?.navigation?.setOnDriftsNumberExceededListener(null)
        mapxusPositioningProvider?.routeShortener?.setOnPathChangeListener(null)
    }

    fun updatePath(args: ReadableArray?) {
        mapxusPositioningProvider?.setOnReachListener {
            mManager.handleEvent(
                MapxusMapCommonEvent(
                    this@RCTMapxusNavigationView,
                    EventKeys.NAVI_ON_ARRIVAL_AT_DESTINATION,
                )
            )
        }
        mapxusPositioningProvider?.navigation?.setOnDriftsNumberExceededListener {
            mManager.handleEvent(
                MapxusMapCommonEvent(
                    this@RCTMapxusNavigationView,
                    EventKeys.NAVI_ON_EXCESSIVE_DRIFT,
                )
            )
        }
        mapxusPositioningProvider?.routeShortener?.setOnPathChangeListener { pathDto ->
            mManager.handleEvent(
                MapxusMapCommonEvent(
                    this@RCTMapxusNavigationView,
                    EventKeys.NAVI_ON_GET_NEWPATH,

                    WritableNativeMap().apply {
                        putDouble("distance", pathDto?.distance ?: 0.0)
                        putDouble("weight", pathDto?.weight ?: 0.0)
                        putDouble("time", pathDto?.time?.toDouble() ?: 0.0)
                        putMap("bbox", WritableNativeMap().apply {
                            putDouble("min_latitude", pathDto?.bbox!![1])
                            putDouble("min_longitude", pathDto.bbox[0])
                            putDouble("max_latitude", pathDto.bbox[3])
                            putDouble("max_longitude", pathDto.bbox[2])
                        })
                        putMap("points", WritableNativeMap().apply {
                            putString("type", pathDto?.points?.type)
                            putArray("coordinates", WritableNativeArray().apply {
                                pathDto?.points?.coordinates?.forEach {
                                    pushMap(WritableNativeMap().apply {
                                        putDouble("latitude", it[1])
                                        putDouble("longitude", it[0])
                                        putDouble("elevation", 0.0)
                                    })
                                }
                            })
                        })
                        putArray("instructions", WritableNativeArray().apply {
                            pathDto?.instructions?.forEach {
                                pushMap(WritableNativeMap().apply {
                                    putString("floor", it.floor)
                                    putString("buildingId", it.buildingId)
                                    putString("streetName", it.streetName)
                                    putDouble("distance", it.distance)
                                    putDouble("heading", it.heading)
                                    putInt("sign", it.sign)
                                    putArray("interval", WritableNativeArray().apply {
                                        it.interval.forEach {
                                            pushInt(it)
                                        }
                                    })
                                    putString("text", it.text)
                                    putDouble("time", it.time.toDouble())
                                    putString("type", it.type)

                                })
                            }
                        })
                    }
                ))
        }

        mAdsorbable?.let { mapxusPositioningProvider?.mAdsorbable = it }
        mShortenable?.let { mapxusPositioningProvider?.mShortenable = it }
        mNumberOfAllowedDrifts?.let { mapxusPositioningProvider?.mNumberOfAllowedDrifts = it }
        mMaximumDrift?.let { mapxusPositioningProvider?.mMaximumDrift = it }
        mDistanceToDestination?.let { mapxusPositioningProvider?.mDistanceToDestination = it }
        val routedata = args?.getMap(1)
        mPathDto = PathDto().apply {
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
                        resultArr[i][0] = it.getMap(i)!!.getDouble("longitude")
                        resultArr[i][1] = it.getMap(i)!!.getDouble("latitude")
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
        }
        mapxusPositioningProvider?.updatePath(mPathDto, mMapView?.mMapview?.mapboxMap)
    }

    fun start() {
        isNavigation = true
        mapxusPositioningProvider?.isNavigation = true
        mMapView?.mMapxusMap?.followUserMode = FollowUserMode.FOLLOW_USER_AND_HEADING
    }

    fun stop() {
        isNavigation = false
        mapxusPositioningProvider?.isNavigation = false
        mMapView?.mMapxusMap?.followUserMode = FollowUserMode.NONE
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

    fun setDistanceToDestination(distanceToDestination: Double?) {
        mDistanceToDestination = distanceToDestination
    }


}