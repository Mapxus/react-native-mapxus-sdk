package com.mapxus.map.modules

import com.facebook.react.bridge.*
import com.facebook.react.common.MapBuilder
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.IllegalViewOperationException
import com.google.gson.Gson
import com.google.gson.JsonParser
import com.mapxus.map.utils.ConvertUtils
import com.mapxus.map.mapxusmap.api.services.BuildingSearch
import com.mapxus.map.mapxusmap.api.services.PoiSearch
import com.mapxus.map.mapxusmap.api.services.RoutePlanning
import com.mapxus.map.mapxusmap.api.services.model.*
import com.mapxus.map.mapxusmap.api.services.model.building.BuildingResult
import com.mapxus.map.mapxusmap.api.services.model.planning.RoutePlanningRequest
import com.mapxus.map.mapxusmap.api.services.model.poi.PoiCategoryResult
import com.mapxus.map.mapxusmap.api.services.model.poi.PoiResult

/**
 * Created by Edison on 3/18/21.
 * Describe:
 */
private const val REACT_CLASS = "RCTMapxusSearchModule"

@ReactModule(name = REACT_CLASS)
class RCTMapxusSearchModule(var reactContext: ReactApplicationContext?) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return REACT_CLASS
    }

    override fun getConstants(): MutableMap<String, Any> {

        // camera modes
        val poiNearbySearchMode: Map<String, String> = mapOf(
                "ActualDistance" to PoiSearchSortWay.ACTUAL_DISTANCE,
                "AbsoluteDistance" to PoiSearchSortWay.ABSOLUTE_DISTANCE,
        )

        return MapBuilder.builder<String, Any>()
                .put("PoiNearbySearchMode", poiNearbySearchMode)
                .build()
    }

    private fun getBuildingCommonListener(errorCallback: Callback, successCallback: Callback): BuildingSearch.BuildingSearchResultListenerAdapter {
        return object : BuildingSearch.BuildingSearchResultListenerAdapter() {
            override fun onGetBuildingResult(buildingResult: BuildingResult) {
                try {
                    if (buildingResult.status != 0) {
                        errorCallback.invoke(buildingResult.error.toString())
                        return
                    }
                    if (buildingResult.indoorBuildingList.isNullOrEmpty()) {
                        errorCallback.invoke("Building not found.")
                        return
                    }

                    val indoorBuildingInfoList = ConvertUtils.toWritableArray(JsonParser.parseString(Gson().toJson(buildingResult.indoorBuildingList)).asJsonArray)

                    successCallback.invoke(indoorBuildingInfoList)
                } catch (ex: IllegalViewOperationException) {
                    errorCallback.invoke(ex.message)

                }
            }
        }
    }

    private fun getPoiCommonListener(errorCallback: Callback, successCallback: Callback): PoiSearch.PoiSearchResultListenerAdapter {
        return object : PoiSearch.PoiSearchResultListenerAdapter() {
            override fun onGetPoiResult(poiResult: PoiResult) {
                if (poiResult.status != 0) {
                    errorCallback.invoke(poiResult.error.toString())
                    return
                }
                if (poiResult.allPoi == null || poiResult.allPoi.isEmpty()) {
                    errorCallback.invoke("Poi not found.")
                    return
                }
                successCallback.invoke(ConvertUtils.toWritableArray(JsonParser.parseString(Gson().toJson(poiResult.allPoi)).asJsonArray))
            }
        }
    }

    @ReactMethod
    fun searchBuildingInGlobal(searchOption: ReadableMap, errorCallback: Callback, successCallback: Callback) {
        BuildingSearch.newInstance().apply {
            setBuildingSearchResultListener(getBuildingCommonListener(errorCallback, successCallback))
            searchInGlobal(ConvertUtils.convert(searchOption, GlobalSearchOption::class.java))
        }
    }

    @ReactMethod
    fun searchBuildingNearBy(searchOption: ReadableMap, errorCallback: Callback, successCallback: Callback) {
        BuildingSearch.newInstance().apply {
            setBuildingSearchResultListener(getBuildingCommonListener(errorCallback, successCallback))
            searchNearby(ConvertUtils.convert(searchOption, NearbySearchOption::class.java))
        }
    }

    @ReactMethod
    fun searchPoiCategoryInBuilding(searchOption: ReadableMap, errorCallback: Callback, successCallback: Callback) {
        PoiSearch.newInstance().apply {
            setPoiSearchResultListener(object : PoiSearch.PoiSearchResultListenerAdapter() {
                override fun onPoiCategoriesResult(poiCategoryResult: PoiCategoryResult) {
                    if (poiCategoryResult.status != 0) {
                        errorCallback.invoke(poiCategoryResult.error.toString())
                        return
                    }
                    if (poiCategoryResult.result == null || poiCategoryResult.result.isEmpty()) {
                        errorCallback.invoke("Poi category not found.")
                        return
                    }
                    successCallback.invoke(ConvertUtils.toWritableArray(JsonParser.parseString(Gson().toJson(poiCategoryResult.result)).asJsonArray))
                }
            })
            searchPoiCategoryInBuilding(ConvertUtils.convert(searchOption, PoiCategorySearchOption::class.java))
        }
    }

    @ReactMethod
    fun searchPoiInBuilding(searchOption: ReadableMap, errorCallback: Callback, successCallback: Callback) {
        PoiSearch.newInstance().apply {
            setPoiSearchResultListener(getPoiCommonListener(errorCallback, successCallback))
            searchInBuilding(ConvertUtils.convert(searchOption, PoiInBuildingSearchOption::class.java))
        }
    }

    @ReactMethod
    fun searchPoiNearby(searchOption: ReadableMap, errorCallback: Callback, successCallback: Callback) {
        PoiSearch.newInstance().apply {
            setPoiSearchResultListener(getPoiCommonListener(errorCallback, successCallback))
            searchNearby(ConvertUtils.convert(searchOption, PoiNearbySearchOption::class.java))
        }
    }

    @ReactMethod
    fun routePlanning(searchOption: ReadableMap, errorCallback: Callback, successCallback: Callback) {
        RoutePlanning.newInstance().apply {
            setRoutePlanningListener {
                if (it.status != 0) {
                    errorCallback.invoke(it.error.toString())
                    return@setRoutePlanningListener
                }
                if (it.routeResponseDto == null) {
                    errorCallback.invoke("route result not found.")
                    return@setRoutePlanningListener
                }
                successCallback.invoke(ConvertUtils.toWritableMap(JsonParser.parseString(Gson().toJson(it.routeResponseDto)).asJsonObject))
            }
            route(ConvertUtils.convert(searchOption, RoutePlanningRequest::class.java))
        }
    }
}