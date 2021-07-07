package com.mapxus.map.components.mapview.helpers

import com.mapxus.map.mapxusmap.api.map.model.MapxusMapOptions

/**
 * Created by Edison on 4/22/21.
 * Describe:
 */
object RCTMapxusMapHelper {
    fun getMapxusMapOptions(rctMapxusMapOptions: RCTMapxusMapOptions?): MapxusMapOptions? {
        if (rctMapxusMapOptions == null) return null
        return MapxusMapOptions().apply {
            rctMapxusMapOptions.outdoorHidden?.let {
                isHiddenOutdoor = it
            }

            rctMapxusMapOptions.defaultStyle?.let {
                style = it
            }

            rctMapxusMapOptions.defaultStyleName?.let {
                customStyle = it
            }

            rctMapxusMapOptions.buildingId?.let {
                buildingId = it
            }

            rctMapxusMapOptions.floor?.let {
                floor = it
            }

            rctMapxusMapOptions.poiId?.let {
                poiId = it
            }

            rctMapxusMapOptions.language?.let {
                language = it
            }
        }
    }
}