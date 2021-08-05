package com.mapxus.map.modules

import com.facebook.react.bridge.*
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.IllegalViewOperationException
import com.mapxus.map.mapxusmap.api.map.model.LatLng
import com.mapxus.map.mapxusmap.api.services.BuildingSearch
import com.mapxus.map.mapxusmap.api.services.model.BoundSearchOption
import com.mapxus.map.mapxusmap.api.services.model.DetailSearchOption
import com.mapxus.map.mapxusmap.api.services.model.GlobalSearchOption
import com.mapxus.map.mapxusmap.api.services.model.NearbySearchOption
import com.mapxus.map.mapxusmap.api.services.model.building.BuildingDetailResult
import com.mapxus.map.mapxusmap.api.services.model.building.BuildingResult
import com.mapxus.map.mapxusmap.api.services.model.building.IndoorBuildingInfo

/**
 * Created by Edison on 3/18/21.
 * Describe:
 */
private const val REACT_CLASS = "MXBuildingSearchModule"

@ReactModule(name = REACT_CLASS)
class RCTMapxusBuildlingSearchModule(var reactContext: ReactApplicationContext?) :
    ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return REACT_CLASS
    }

    private fun getBuildingCommonListener(promise: Promise): BuildingSearch.BuildingSearchResultListenerAdapter {
        return object : BuildingSearch.BuildingSearchResultListenerAdapter() {
            override fun onGetBuildingResult(buildingResult: BuildingResult) {
                try {
                    if (buildingResult.status != 0) {
                        promise.reject(
                            buildingResult.status.toString(),
                            buildingResult.error.toString()
                        )
                        return
                    }
                    if (buildingResult.indoorBuildingList.isNullOrEmpty()) {
                        promise.reject("Building not found.", buildingResult.error.toString())
                        return
                    }

                    promise.resolve(
                        converBuildingResult(
                            buildingResult.totalNum,
                            buildingResult.indoorBuildingList
                        )
                    )
                } catch (ex: IllegalViewOperationException) {
                    promise.reject(ex.cause.toString(), ex.message)
                }
            }
        }
    }

    private fun converBuildingResult(
        totalNum: Int,
        indoorBuildingList: List<IndoorBuildingInfo>
    ) = WritableNativeMap().apply {
        putInt("total", totalNum)
        putArray("buildings", WritableNativeArray().apply {
            indoorBuildingList.forEach { indoorBuilding ->
                pushMap(WritableNativeMap().apply {
                    putString("buildingId", indoorBuilding.buildingId)
                    putString("venueId", indoorBuilding.venueId)
                    putString("venueName_default", indoorBuilding.venueName["default"])
                    putString("venueName_en", indoorBuilding.venueName["en"])
                    putString("venueName_cn", indoorBuilding.venueName["zh-Hans"])
                    putString("venueName_zh", indoorBuilding.venueName["zh-Hant"])
                    putString("venueName_ja", indoorBuilding.venueName["ja"])
                    putString("venueName_ko", indoorBuilding.venueName["ko"])

                    putString("name_default", indoorBuilding.name["default"])
                    putString("name_en", indoorBuilding.name["en"])
                    putString("name_cn", indoorBuilding.name["cn"])
                    putString("name_zh", indoorBuilding.name["zh"])
                    putString("name_ja", indoorBuilding.name["ja"])
                    putString("name_ko", indoorBuilding.name["ko"])

                    putMap("address_default", WritableNativeMap().apply {
                        putString("housenumber", indoorBuilding.address["default"]?.housenumber)
                        putString("street", indoorBuilding.address["default"]?.street)
                    })
                    putMap("address_en", WritableNativeMap().apply {
                        putString("housenumber", indoorBuilding.address["en"]?.housenumber)
                        putString("street", indoorBuilding.address["en"]?.street)
                    })
                    putMap("address_cn", WritableNativeMap().apply {
                        putString("housenumber", indoorBuilding.address["zh-Hans"]?.housenumber)
                        putString("street", indoorBuilding.address["zh-Hans"]?.street)
                    })
                    putMap("address_zh", WritableNativeMap().apply {
                        putString("housenumber", indoorBuilding.address["zh-Hant"]?.housenumber)
                        putString("street", indoorBuilding.address["zh-Hant"]?.street)
                    })
                    putMap("address_ja", WritableNativeMap().apply {
                        putString("housenumber", indoorBuilding.address["ja"]?.housenumber)
                        putString("street", indoorBuilding.address["ja"]?.street)
                    })
                    putMap("address_ko", WritableNativeMap().apply {
                        putString("housenumber", indoorBuilding.address["ko"]?.housenumber)
                        putString("street", indoorBuilding.address["ko"]?.street)
                    })

                    putString("type", indoorBuilding.type)
                    putMap("bbox", WritableNativeMap().apply {
                        putDouble("min_latitude", indoorBuilding.bbox.minLat)
                        putDouble("min_longitude", indoorBuilding.bbox.minLon)
                        putDouble("max_latitude", indoorBuilding.bbox.maxLat)
                        putDouble("max_longitude", indoorBuilding.bbox.maxLon)
                    })

                    putMap("labelCenter", WritableNativeMap().apply {
                        putDouble("latitude", indoorBuilding.labelCenter.lat)
                        putDouble("longitude", indoorBuilding.labelCenter.lon)
                        putDouble("elevation", 0.0)
                    })

                    putArray("floors", WritableNativeArray().apply {
                        indoorBuilding.floors.forEach {
                            pushMap(WritableNativeMap().apply {
                                putString("code", it.code)
                                putString("floorId", it.id)
                                putInt("ordinal", it.sequence)
                                putBoolean("hasVisualMap", it.isVisualMap)
                            })
                        }
                    })

                    putString("groundFloor", indoorBuilding.groundFloor)
                    putString("country", indoorBuilding.region)
                    putString("region", indoorBuilding.region)
                    putString("city", indoorBuilding.region)
                    putBoolean("hasVisualMap", indoorBuilding.isVisualMap)

                })
            }
        })
    }

    @ReactMethod
    fun buildingSearchGlobal(
        searchOption: ReadableMap,
        promise: Promise
    ) {
        BuildingSearch.newInstance().apply {
            setBuildingSearchResultListener(getBuildingCommonListener(promise))
            searchInGlobal(GlobalSearchOption().apply {
                mKeyword = searchOption.getString("keywords") ?: ""
                mPageCapacity = searchOption.getInt("offset")
                mPageNum = searchOption.getInt("page")
            })
        }
    }

    @ReactMethod
    fun buildingSearchNearbyCenter(
        searchOption: ReadableMap,
        promise: Promise
    ) {
        BuildingSearch.newInstance().apply {
            setBuildingSearchResultListener(getBuildingCommonListener(promise))
            searchNearby(NearbySearchOption().apply {
                mRadius = searchOption.getInt("distance")
                mLocation = LatLng(
                    searchOption.getMap("center")?.getDouble("latitude") ?: 0.0,
                    searchOption.getMap("center")?.getDouble("longitude") ?: 0.0
                )
                mKeyword = searchOption.getString("keywords") ?: ""
                mPageCapacity = searchOption.getInt("offset")
                mPageNum = searchOption.getInt("page")
            })
        }
    }

    @ReactMethod
    fun buildingSearchOnBbox(
        searchOption: ReadableMap,
        promise: Promise
    ) {
        BuildingSearch.newInstance().apply {
            setBuildingSearchResultListener(getBuildingCommonListener(promise))
            searchInBound(BoundSearchOption().apply {
                mBound = com.mapxus.map.mapxusmap.api.map.model.LatLngBounds(
                    LatLng(
                        searchOption.getMap("bbox")!!.getDouble("min_latitude"),
                        searchOption.getMap("bbox")!!.getDouble("min_longitude")
                    ),
                    LatLng(
                        searchOption.getMap("bbox")!!.getDouble("max_latitude"),
                        searchOption.getMap("bbox")!!.getDouble("max_longitude")
                    ),
                )
                mKeyword = searchOption.getString("keywords") ?: ""
                mPageCapacity = searchOption.getInt("offset")
                mPageNum = searchOption.getInt("page")
            })
        }
    }

    @ReactMethod
    fun buildingSearchByIds(
        searchOption: ReadableMap,
        promise: Promise
    ) {
        BuildingSearch.newInstance().apply {
            setBuildingSearchResultListener(object :
                BuildingSearch.BuildingSearchResultListenerAdapter() {
                override fun onGetBuildingDetailResult(buildingDetailResult: BuildingDetailResult) {
                    try {
                        if (buildingDetailResult.status != 0) {
                            promise.reject(
                                buildingDetailResult.status.toString(),
                                buildingDetailResult.error.toString()
                            )
                            return
                        }
                        if (buildingDetailResult.indoorBuildingList.isNullOrEmpty()) {
                            promise.reject(
                                "Building not found.",
                                buildingDetailResult.error.toString()
                            )
                            return
                        }

                        promise.resolve(
                            converBuildingResult(
                                buildingDetailResult.indoorBuildingList.size,
                                buildingDetailResult.indoorBuildingList
                            )
                        )
                    } catch (ex: IllegalViewOperationException) {
                        promise.reject(ex.cause.toString(), ex.message)
                    }
                }
            })
            val array = searchOption.getArray("buildingIds")
            searchBuildingDetail(DetailSearchOption().apply {
                ids = array?.toArrayList()?.map {
                    it.toString()
                }
            })
        }
    }

}