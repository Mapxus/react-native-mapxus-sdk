package com.mapxus.map.modules

import com.facebook.react.bridge.*
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.IllegalViewOperationException
import com.mapxus.map.mapxusmap.api.map.model.LatLng
import com.mapxus.map.mapxusmap.api.services.PoiSearch
import com.mapxus.map.mapxusmap.api.services.model.*
import com.mapxus.map.mapxusmap.api.services.model.poi.PoiDetailResult
import com.mapxus.map.mapxusmap.api.services.model.poi.PoiInfo
import com.mapxus.map.mapxusmap.api.services.model.poi.PoiOrientationResult
import com.mapxus.map.mapxusmap.api.services.model.poi.PoiResult

/**
 * Created by Edison on 3/18/21.
 * Describe:
 */
private const val REACT_CLASS = "MXPoiSearchModule"

@ReactModule(name = REACT_CLASS)
class RCTMapxusPoiSearchModule(var reactContext: ReactApplicationContext?) :
    ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return REACT_CLASS
    }

    private fun getPoiCommonListener(promise: Promise): PoiSearch.PoiSearchResultListenerAdapter {
        return object : PoiSearch.PoiSearchResultListenerAdapter() {
            override fun onGetPoiResult(poiResult: PoiResult) {
                try {
                    if (poiResult.status != 0) {
                        promise.reject(poiResult.status.toString(), poiResult.error.toString())
                        return
                    }
                    if (poiResult.allPoi == null || poiResult.allPoi.isEmpty()) {
                        promise.reject("Poi not found.", "Poi not found.")
                        return
                    }
                    promise.resolve(converPoi(poiResult.totalNum, poiResult.allPoi))
                } catch (ex: IllegalViewOperationException) {
                    promise.reject("Poi not found.", ex.message)
                }
            }

            override fun onGetPoiByOrientationResult(poiOrientationResult: PoiOrientationResult) {
                try {
                    if (poiOrientationResult.status != 0) {
                        promise.reject(
                            poiOrientationResult.status.toString(),
                            poiOrientationResult.error.toString()
                        )
                        return
                    }
                    if (poiOrientationResult.poiOrientationInfos == null || poiOrientationResult.poiOrientationInfos.isEmpty()) {
                        promise.reject("Poi not found.", "Poi not found.")
                        return
                    }
                    promise.resolve(WritableNativeMap().apply {
                        putInt("total", poiOrientationResult.poiOrientationInfos.size)
                        putArray("pois", WritableNativeArray().apply {
                            poiOrientationResult.poiOrientationInfos.forEach {
                                pushMap(WritableNativeMap().apply {
                                    putString("id", it.poiId)
                                    putString("buildingId", it.buildingId)
                                    putString("venueId", it.buildingId)
                                    putString("floor", it.floor)
                                    putMap("location", WritableNativeMap().apply {
                                        putDouble("latitude", it.location.lat)
                                        putDouble("longitude", it.location.lon)
                                        putDouble("elevation", 0.0)
                                    })
                                    putArray("category", WritableNativeArray().apply {
                                        it.category.forEach {
                                            pushString(it)
                                        }
                                    })
                                    putString("introduction", it.description)
                                    putString("email", it.email)
                                    putString("name_default", it.nameDefault)
                                    putString("name_en", it.nameEn)
                                    putString("name_cn", it.nameCn)
                                    putString("name_zh", it.nameZh)
                                    putString("name_ja", it.nameJa)
                                    putString("name_ko", it.nameKo)
                                    putString("accessibilityDetail", it.accessibilityDetailDefault)
                                    putString("accessibilityDetail_en", it.accessibilityDetailEn)
                                    putString("accessibilityDetail_cn", it.accessibilityDetailCn)
                                    putString("accessibilityDetail_zh", it.accessibilityDetailZh)
                                    putString("accessibilityDetail_ja", it.accessibilityDetailJa)
                                    putString("accessibilityDetail_ko", it.accessibilityDetailKo)
                                    putString("openingHours", it.openingHours)
                                    putString("phone", it.phone)
                                    putString("website", it.website)
                                    putDouble("distance", it.distance)
                                    putDouble("angle", it.angle)
                                })
                            }
                        })
                    })
                } catch (ex: IllegalViewOperationException) {
                    promise.reject("Poi not found.", ex.message)
                }
            }

            override fun onGetPoiDetailResult(poiDetailResult: PoiDetailResult) {
                try {
                    if (poiDetailResult.status != 0) {
                        promise.reject(
                            poiDetailResult.status.toString(),
                            poiDetailResult.error.toString()
                        )
                        return
                    }
                    if (poiDetailResult.poiInfo == null) {
                        promise.reject("Poi not found.", "Poi not found.")
                        return
                    }
                    promise.resolve(
                        converPoi(
                            poiDetailResult.poiList.size,
                            poiDetailResult.poiList
                        )
                    )
                } catch (ex: IllegalViewOperationException) {
                    promise.reject("Poi not found.", ex.message)
                }
            }
        }
    }

    private fun converPoi(totalNum: Int, poi: List<PoiInfo>) = WritableNativeMap().apply {
        putInt("total", totalNum)
        putArray("pois", WritableNativeArray().apply {
            poi.forEach {
                pushMap(WritableNativeMap().apply {
                    putString("id", it.poiId)
                    putString("buildingId", it.buildingId)
                    putString("venueId", it.venueId)
                    putString("floor", it.floor)
                    putString("floorId", it.floorId)
                    putMap("location", WritableNativeMap().apply {
                        putDouble("latitude", it.location.lat)
                        putDouble("longitude", it.location.lon)
                        putDouble("elevation", 0.0)
                    })
                    putArray("category", WritableNativeArray().apply {
                        it.category.forEach {
                            pushString(it)
                        }
                    })
                    putString("introduction", it.description)
                    putString("email", it.email)
                    putString("name_default", it.nameDefault)
                    putString("name_en", it.nameEn)
                    putString("name_cn", it.nameCn)
                    putString("name_zh", it.nameZh)
                    putString("name_ja", it.nameJa)
                    putString("name_ko", it.nameKo)
                    putString("accessibilityDetail", it.accessibilityDetailDefault)
                    putString("accessibilityDetail_en", it.accessibilityDetailEn)
                    putString("accessibilityDetail_cn", it.accessibilityDetailCn)
                    putString("accessibilityDetail_zh", it.accessibilityDetailZh)
                    putString("accessibilityDetail_ja", it.accessibilityDetailJa)
                    putString("accessibilityDetail_ko", it.accessibilityDetailKo)
                    putString("openingHours", it.openingHours)
                    putString("phone", it.phone)
                    putString("website", it.website)
                    putDouble("distance", it.distance ?: 0.0)
                    putInt("angle", 0)
                })
            }
        })
    }

    @ReactMethod
    fun poiSearchInIndoorScene(searchOption: ReadableMap, promise: Promise) {
        PoiSearch.newInstance().apply {
            setPoiSearchResultListener(getPoiCommonListener(promise))
            searchInBuilding(PoiInBuildingSearchOption().apply {
                mBuildingId = searchOption.getString("buildingId") ?: ""
                mFloor = searchOption.getString("floor") ?: ""
                mCategory = searchOption.getString("category") ?: ""
                mKeyword = searchOption.getString("keywords") ?: ""
                mPageCapacity = searchOption.getInt("offset")
                mPageNum = searchOption.getInt("page")
            })
        }
    }

    @ReactMethod
    fun poiSearchNearbyCenter(searchOption: ReadableMap, promise: Promise) {
        PoiSearch.newInstance().apply {
            setPoiSearchResultListener(getPoiCommonListener(promise))
            searchNearby(PoiNearbySearchOption().apply {
                mBuildingId = searchOption.getString("buildingId") ?: ""
                mSort = searchOption.getString("sort") ?: "AbsoluteDistance"
                mOrdinal = searchOption.getInt("ordinal")
                mCategory = searchOption.getString("category") ?: ""
                mMeterRadius = searchOption.getInt("meterDistance")
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
    fun poiSearchOnBbox(searchOption: ReadableMap, promise: Promise) {
        PoiSearch.newInstance().apply {
            setPoiSearchResultListener(getPoiCommonListener(promise))
            searchInBound(PoiBoundSearchOption().apply {
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
                mCategory = searchOption.getString("category") ?: ""
                mKeyword = searchOption.getString("keywords") ?: ""
                mPageCapacity = searchOption.getInt("offset")
                mPageNum = searchOption.getInt("page")
            })
        }
    }

    @ReactMethod
    fun orientationPoiSearch(searchOption: ReadableMap, promise: Promise) {
        PoiSearch.newInstance().apply {
            setPoiSearchResultListener(getPoiCommonListener(promise))
            searchPoiByOrientation(PoiOrientationSearchOption().apply {
                mIndoorLatLng = IndoorLatLng(
                    searchOption.getMap("center")?.getDouble("latitude") ?: 0.0,
                    searchOption.getMap("center")?.getDouble("longitude") ?: 0.0,
                    searchOption.getString("floor") ?: "",
                    searchOption.getString("buildingId") ?: ""
                )
                mOrientation = searchOption.getInt("angle")
                mMeterRadius = searchOption.getInt("distance")
                mSearchType = searchOption.getString("distanceSearchType") ?: "Point"
            })
        }
    }

    @ReactMethod
    fun poiSearchByIds(searchOption: ReadableMap, promise: Promise) {
        PoiSearch.newInstance().apply {
            setPoiSearchResultListener(getPoiCommonListener(promise))
            val array = searchOption.getArray("POIIds")
            searchPoiDetail(DetailSearchOption().apply {
                ids = array?.toArrayList()?.map {
                    it.toString()
                }
            })
        }
    }
}