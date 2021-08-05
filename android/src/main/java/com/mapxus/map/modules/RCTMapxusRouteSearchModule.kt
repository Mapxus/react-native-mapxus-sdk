package com.mapxus.map.modules

import com.facebook.react.bridge.*
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.IllegalViewOperationException
import com.mapxus.map.mapxusmap.api.services.RoutePlanning
import com.mapxus.map.mapxusmap.api.services.constant.RoutePlanningLocale
import com.mapxus.map.mapxusmap.api.services.constant.RoutePlanningVehicle
import com.mapxus.map.mapxusmap.api.services.model.*
import com.mapxus.map.mapxusmap.api.services.model.planning.RoutePlanningRequest

/**
 * Created by Edison on 3/18/21.
 * Describe:
 */
private const val REACT_CLASS = "MXRouteSearchModule"

@ReactModule(name = REACT_CLASS)
class RCTMapxusRouteSearchModule(var reactContext: ReactApplicationContext?) :
    ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return REACT_CLASS
    }

    @ReactMethod
    fun routeSearch(searchOption: ReadableMap, promise: Promise) {
        val fromBuilding = searchOption.getString("fromBuilding") ?: ""
        val fromFloor = searchOption.getString("fromFloor") ?: ""
        val fromLon = searchOption.getDouble("fromLon")
        val fromLat = searchOption.getDouble("fromLat")

        val toBuilding = searchOption.getString("toBuilding") ?: ""
        val toFloor = searchOption.getString("toFloor") ?: ""
        val toLon = searchOption.getDouble("toLon")
        val toLat = searchOption.getDouble("toLat")

        RoutePlanning.newInstance().apply {
            setRoutePlanningListener {
                try {
                    if (it.status != 0) {
                        promise.reject(it.status.toString(), it.error.toString())
                        return@setRoutePlanningListener
                    }
                    if (it.routeResponseDto == null) {
                        promise.reject("route result not found.", "route result not found.")
                        return@setRoutePlanningListener
                    }
                    val apply = WritableNativeMap().apply {
                        putArray("wayPointList", WritableNativeArray().apply {
                            pushMap(WritableNativeMap().apply {
                                putString("floor", fromFloor)
                                putString("buildingId", fromBuilding)
                                putDouble("latitude", fromLat)
                                putDouble("longitude", fromLon)
                                putDouble("elevation", 0.0)
                            })
                            pushMap(WritableNativeMap().apply {
                                putString("floor", toFloor)
                                putString("buildingId", toBuilding)
                                putDouble("latitude", toLat)
                                putDouble("longitude", toLon)
                                putDouble("elevation", 0.0)
                            })
                        })
                        putArray("paths", WritableNativeArray().apply {
                            pushMap(WritableNativeMap().apply {

                                it.routeResponseDto.paths.forEach {
                                    putDouble("distance", it.distance)
                                    putDouble("weight", it.weight)
                                    putDouble("time", it.time.toDouble())
                                    putMap("bbox", WritableNativeMap().apply {
                                        putDouble("min_latitude", it.bbox[1])
                                        putDouble("min_longitude", it.bbox[0])
                                        putDouble("max_latitude", it.bbox[3])
                                        putDouble("max_longitude", it.bbox[2])
                                    })
                                    putMap("points", WritableNativeMap().apply {
                                        putString("type", it.points.type)
                                        putArray("coordinates", WritableNativeArray().apply {
                                            it.points.coordinates.forEach {
                                                pushMap(WritableNativeMap().apply {
                                                    putDouble("latitude", it[1])
                                                    putDouble("longitude", it[0])
                                                    putDouble("elevation", 0.0)
                                                })
                                            }
                                        })
                                    })
                                    putArray("instructions", WritableNativeArray().apply {
                                        it.instructions.forEach {
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
                            })
                        })
                    }
                    promise.resolve(apply)
                } catch (ex: IllegalViewOperationException) {
                    promise.reject(ex.cause.toString(), ex.message)
                }
            }
            route(RoutePlanningRequest().apply {
                this.fromBuilding = fromBuilding
                this.fromFloor = fromFloor
                this.fromLon = fromLon
                this.fromLat = fromLat

                this.toBuilding = toBuilding
                this.toFloor = toFloor
                this.toLon = toLon
                this.toLat = toLat

                toDoor = searchOption.getBoolean("toDoor")
                locale = searchOption.getString("locale") ?: RoutePlanningLocale.ZH_HK
                vehicle = searchOption.getString("vehicle") ?: RoutePlanningVehicle.FOOT
            })
        }
    }
}