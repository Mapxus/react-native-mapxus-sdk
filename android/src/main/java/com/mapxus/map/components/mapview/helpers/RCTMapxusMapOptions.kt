package com.mapxus.map.components.mapview.helpers

/**
 * Created by Edison on 2021/5/14.
 * Describe:
 */
data class RCTMapxusMapOptions(
    var outdoorHidden: Boolean? = null,
    var defaultStyle: Int? = null,
    var zoomLevel: Double? = null,
    var zoomInsets: Insets? = null,
    var defaultStyleName: String? = null,
    var buildingId: String? = null,
    var floor: String? = null,
    var poiId: String? = null,
    var language: String? = null,
)

data class Insets(
    var top: Int = 0,
    var left: Int = 0,
    var bottom: Int = 0,
    var right: Int = 0,
)
