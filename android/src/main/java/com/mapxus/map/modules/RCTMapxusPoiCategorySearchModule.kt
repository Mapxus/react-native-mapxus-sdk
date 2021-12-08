package com.mapxus.map.modules

import com.facebook.react.bridge.*
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.IllegalViewOperationException
import com.mapxus.map.mapxusmap.api.services.PoiSearch
import com.mapxus.map.mapxusmap.api.services.model.PoiCategorySearchOption
import com.mapxus.map.mapxusmap.api.services.model.poi.PoiCategoryResult

/**
 * Created by Edison on 3/18/21.
 * Describe:
 */
private const val REACT_CLASS = "MXPoiCategorySearchModule"

@ReactModule(name = REACT_CLASS)
class RCTMapxusPoiCategorySearchModule(var reactContext: ReactApplicationContext?) :
    ReactContextBaseJavaModule(reactContext) {
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
                            promise.reject(
                                poiCategoryResult.status.toString(),
                                poiCategoryResult.error.toString()
                            )
                            return
                        }
                        if (poiCategoryResult.poiCategoryInfos == null || poiCategoryResult.poiCategoryInfos.isEmpty()) {
                            promise.reject("Poi category not found.", "Poi category not found.")
                            return
                        }
                        promise.resolve(WritableNativeMap().apply {
                            putArray("category", WritableNativeArray().apply {
                                poiCategoryResult.poiCategoryInfos.forEach {
                                    pushMap(WritableNativeMap().apply {
                                        putString("category", it.category)
                                        putString("categoryId", it.categoryId)
                                        putString("categoryDescription", it.categoryDescription)
                                        putString("title_en", it.titleEn)
                                        putString("title_cn", it.titleCn)
                                        putString("title_zh", it.titleZh)
                                    })
                                }
                            })
                        })
                    } catch (ex: IllegalViewOperationException) {
                        promise.reject("Category not found.", ex.message)
                    }
                }
            })
            searchPoiCategoryInBuilding(PoiCategorySearchOption().apply {
                mBuildingId = searchOption.getString("buildingId") ?: ""
                mFloor = searchOption.getString("floor") ?: ""
            })
        }
    }
}