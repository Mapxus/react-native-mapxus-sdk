package com.mapxus.map.components.location

import android.annotation.SuppressLint
import android.content.Context
import android.location.Location
import android.util.Log
import androidx.lifecycle.LifecycleOwner
import com.facebook.react.bridge.WritableNativeMap
import com.mapbox.mapboxsdk.maps.MapboxMap
import com.mapxus.map.components.annotation.RCTMapxusNavigationView
import com.mapxus.map.components.annotation.RCTMapxusNavigationViewManager
import com.mapxus.map.events.MapxusMapCommonEvent
import com.mapxus.map.events.constants.EventKeys
import com.mapxus.map.mapxusmap.api.services.model.planning.PathDto
import com.mapxus.map.mapxusmap.overlay.navi.NavigationPathDto
import com.mapxus.map.mapxusmap.overlay.navi.RouteAdsorber
import com.mapxus.map.mapxusmap.overlay.navi.RouteShortener
import com.mapxus.map.mapxusmap.positioning.ErrorInfo
import com.mapxus.map.mapxusmap.positioning.IndoorLocation
import com.mapxus.map.mapxusmap.positioning.IndoorLocationProvider
import com.mapxus.map.utils.SharedPreferencesUtil.get
import com.mapxus.positioning.positioning.api.MapxusLocation
import com.mapxus.positioning.positioning.api.MapxusPositioningClient
import com.mapxus.positioning.positioning.api.MapxusPositioningListener
import com.mapxus.positioning.positioning.api.PositioningState

/**
 * @author frank
 * @date 21/5/2020
 */
@SuppressLint("LongLogTag")
class MapxusNavigationPositioningProvider(
    var lifecycleOwner: LifecycleOwner,
    private val context: Context,
    private val mManager: RCTMapxusNavigationViewManager,
    private val mView: RCTMapxusNavigationView,
) :
    IndoorLocationProvider() {
    private var positioningClient: MapxusPositioningClient? = null
    private var started = false
    private var appid = ""
    private var secret = ""
    var routeAdsorber: RouteAdsorber? = null
    var routeShortener: RouteShortener? = null
    private var mapboxMap: MapboxMap? = null
    var mAdsorbable: Boolean? = null
    var mShortenable: Boolean? = null
    var mNumberOfAllowedDrifts: Int = 3
    var mMaximumDrift: Int = 20
    var mDistanceToDestination: Double = 1.0
    var isNavigation: Boolean = false

    init {
        appid = get(context, "appid", "", "UserToken") as String
        secret = get(context, "secret", "", "UserToken") as String
    }

    override fun supportsFloor(): Boolean {
        return true
    }

    override fun start() {
        positioningClient =
            MapxusPositioningClient.getInstance(
                lifecycleOwner,
                context.applicationContext,
                appid,
                secret
            )
        positioningClient?.addPositioningListener(mapxusPositioningListener)
        positioningClient?.start()
        started = true
    }

    override fun stop() {
        if (positioningClient != null) {
            positioningClient?.stop()
        }
        started = false
    }

    override fun isStarted(): Boolean {
        return started
    }

    private val mapxusPositioningListener: MapxusPositioningListener =
        object : MapxusPositioningListener {
            override fun onStateChange(positionerState: PositioningState) {
                when (positionerState) {
                    PositioningState.STOPPED -> {
                        dispatchOnProviderStopped()
                    }
                    PositioningState.RUNNING -> {
                        dispatchOnProviderStarted()
                    }
                    else -> {
                    }
                }
            }

            override fun onError(errorInfo: com.mapxus.positioning.positioning.api.ErrorInfo) {
                Log.e(TAG, errorInfo.errorMessage)
                dispatchOnProviderError(ErrorInfo(errorInfo.errorCode, errorInfo.errorMessage))
            }

            override fun onOrientationChange(orientation: Float, sensorAccuracy: Int) {
                dispatchCompassChange(orientation, sensorAccuracy)
            }

            override fun onLocationChange(mapxusLocation: MapxusLocation?) {
                if (mapxusLocation == null) {
                    return
                }
                val location = Location("MapxusPositioning")
                location.latitude = mapxusLocation.latitude
                location.longitude = mapxusLocation.longitude
                location.time = System.currentTimeMillis()
                val floor =
                    if (mapxusLocation.mapxusFloor == null) null else mapxusLocation.mapxusFloor.code
                val building = mapxusLocation.buildingId
                val indoorLocation = IndoorLocation(location, building, floor)
                indoorLocation.accuracy = mapxusLocation.accuracy

                mManager.handleEvent(
                    MapxusMapCommonEvent(
                        mView,
                        EventKeys.NAVI_ON_UPDATE,
                        WritableNativeMap().apply {
                            putDouble("longitude", indoorLocation?.longitude ?: 0.0)
                            putDouble("latitude", indoorLocation?.latitude ?: 0.0)
                            putString("floor", indoorLocation?.floor)
                            putString("buildingId", indoorLocation?.building)
                            putDouble(
                                "accuracy",
                                indoorLocation?.accuracy?.toDouble() ?: 0.0
                            )
                            putDouble("timestamp", indoorLocation?.time?.toDouble() ?: 0.0)
                        })
                )
                val actualLocation = indoorLocation

                if (null != routeAdsorber && isNavigation) {
                    var indoorLatLon = indoorLocation

                    mAdsorbable?.let {
                        indoorLatLon = routeAdsorber!!.calculateTheAdsorptionLocationFromActual(indoorLocation)
                    }
                    mShortenable?.let {
                        routeShortener!!.cutFromTheLocationProjection(
                            indoorLatLon,
                            mapboxMap
                        )
                    }

                    indoorLocation.latitude = indoorLatLon.latitude
                    indoorLocation.longitude = indoorLatLon.longitude
                }
                dispatchIndoorLocationChange(indoorLocation)
                mManager.handleEvent(
                    MapxusMapCommonEvent(
                        mView,
                        EventKeys.NAVI_ON_REFRESH_THE_ADSORPTION_LOCATION,
                        WritableNativeMap().apply {
                            putMap("adsorptionLocation", WritableNativeMap().apply {
                                putDouble("longitude", indoorLocation?.longitude ?: 0.0)
                                putDouble("latitude", indoorLocation?.latitude ?: 0.0)
                                putString("floor", indoorLocation?.floor)
                                putString("buildingId", indoorLocation?.building)
                                putDouble(
                                    "accuracy",
                                    indoorLocation?.accuracy?.toDouble() ?: 0.0
                                )
                                putDouble("timestamp", indoorLocation?.time?.toDouble() ?: 0.0)
                            })
                            putMap("actualLocation", WritableNativeMap().apply {
                                putDouble("longitude", actualLocation?.longitude ?: 0.0)
                                putDouble("latitude", actualLocation?.latitude ?: 0.0)
                                putString("floor", actualLocation?.floor)
                                putString("buildingId", actualLocation?.building)
                                putDouble(
                                    "accuracy",
                                    actualLocation?.accuracy?.toDouble() ?: 0.0
                                )
                                putDouble("timestamp", actualLocation?.time?.toDouble() ?: 0.0)
                            })
                        }
                    )
                )
            }
        }

    fun updatePath(pathDto: PathDto, mapboxMap: MapboxMap?) {
        this.mapboxMap = mapboxMap
        val navigationPathDto = NavigationPathDto(pathDto)
        routeAdsorber = RouteAdsorber(navigationPathDto, mMaximumDrift, mNumberOfAllowedDrifts)
        routeShortener = RouteShortener(navigationPathDto, pathDto, pathDto.indoorPoints)
    }

    fun setOnReachListener(onReachListener: RouteAdsorber.OnReachListener?) {
        routeAdsorber?.setOnReachListener(onReachListener, mDistanceToDestination)
    }

    companion object {
        private const val TAG = "MapxusPositioningProvider"
    }
}