package com.mapxus.map.modules

import com.facebook.react.bridge.*
import com.facebook.react.module.annotations.ReactModule
import com.mapxus.visual.models.BuildingImage
import com.mapxus.visual.repository.image.VisualImageRepository

/**
 * Created by Edison on 3/18/21.
 * Describe:
 */
private const val REACT_CLASS = "MXVisualSearchModule"

@ReactModule(name = REACT_CLASS)
class RCTMapxusVisualSearchModule(var reactContext: ReactApplicationContext?) :
    ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return REACT_CLASS
    }

    @ReactMethod
    fun searchVisualDataInBuilding(searchOption: ReadableMap, promise: Promise) {
        VisualImageRepository(reactContext).queryImages(searchOption.getString("buildingId"),
            object : VisualImageRepository.VisualMapImageQueryListener {
                override fun onQueryImageSucceeded(buildingImage: BuildingImage?) {
                    val apply = WritableNativeArray().apply {
                        buildingImage?.floorImages?.forEach {
                            pushMap(WritableNativeMap().apply {
                                putString("floor", it.floor)
                                putArray("nodes", WritableNativeArray().apply {
                                    it.sequenceImages.forEach { it ->
                                        pushMap(WritableNativeMap().apply {
                                            putString("sequenceId", it.sequenceId)
                                            putArray("nodes", WritableNativeArray().apply {
                                                it.images.forEach {
                                                    pushMap(WritableNativeMap().apply {
                                                        putString("key", it.key)
                                                        putString("buildingId", it.buildingId)
                                                        putString("floor", it.floorName)
                                                        putDouble("latitude", it.location.lat)
                                                        putDouble("longitude", it.location.lon)
                                                        putDouble("bearing", it.ca)
                                                    })
                                                }
                                            })
                                        })
                                    }
                                })
                            })
                        }
                    }
                    promise.resolve(apply)
                }

                override fun onQueryImageFailed(error: String?) {
                    promise.reject("visual data not found", error.toString())
                }
            })
    }
}