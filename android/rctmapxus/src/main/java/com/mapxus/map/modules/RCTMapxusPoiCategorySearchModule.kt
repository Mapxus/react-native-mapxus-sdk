package com.mapxus.map.modules

import com.facebook.react.bridge.*
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.IllegalViewOperationException
import com.google.gson.Gson
import com.google.gson.JsonParser
import com.mapxus.map.mapxusmap.api.services.PoiSearch
import com.mapxus.map.mapxusmap.api.services.model.PoiCategorySearchOption
import com.mapxus.map.mapxusmap.api.services.model.poi.PoiCategoryResult
import com.mapxus.map.utils.ConvertUtils

/**
 * Created by Edison on 3/18/21.
 * Describe:
 */
private const val REACT_CLASS = "MXPoiCategorySearchModule"

@ReactModule(name = REACT_CLASS)
class RCTMapxusPoiCategorySearchModule(var reactContext: ReactApplicationContext?) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return REACT_CLASS
    }

    @ReactMethod
    fun poiCategorySearch(searchOption: ReadableMap, promise: Promise) {
        PoiSearch.newInstance().apply {
            setPoiSearchResultListener(object : PoiSearch.PoiSearchResultListenerAdapter() {
                override fun onPoiCategoriesResult(poiCategoryResult: PoiCategoryResult) {
                    try {
                        if (poiCategoryResult.status != 0) {
                            promise.reject(poiCategoryResult.status.toString(),poiCategoryResult.error.toString())
                            return
                        }
                        if (poiCategoryResult.result == null || poiCategoryResult.result.isEmpty()) {
                            promise.reject("Poi category not found.","Poi category not found.")
                            return
                        }
                        promise.resolve(WritableNativeMap().apply {
                            putArray("category", WritableNativeArray().apply {
                                poiCategoryResult.result.forEach {
                                    pushMap(WritableNativeMap().apply {
                                        putString("category", it.category)
                                        putString("categoryId", it.id)
                                        putString("categoryDescription", it.description)
                                        putString("title_en", it.title["en"])
                                        putString("title_cn", it.title["zh-Hans"])
                                        putString("title_zh", it.title["zh-Hant"])
                                    })
                                }
                            })
                        })
                    } catch (ex: IllegalViewOperationException){
                        promise.reject("Category not found.",ex.message)
                    }
                }
            })
            searchPoiCategoryInBuilding(PoiCategorySearchOption().apply {
                mBuildingId = searchOption.getString("buildingId")?:""
                mFloor = searchOption.getString("floor")?:""
            })
        }
    }
}