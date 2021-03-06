package com.mapxus.map.components.styles.light;

import android.content.Context;

import com.facebook.react.bridge.ReadableMap;
import com.mapbox.mapboxsdk.maps.MapboxMap;
import com.mapbox.mapboxsdk.maps.Style;
import com.mapbox.mapboxsdk.style.light.Light;
import com.mapxus.map.components.AbstractMapFeature;
import com.mapxus.map.components.mapview.RCTMGLMapView;
import com.mapxus.map.components.styles.RCTMGLStyle;
import com.mapxus.map.components.styles.RCTMGLStyleFactory;

/**
 * Created by nickitaliano on 9/26/17.
 */

public class RCTMGLLight extends AbstractMapFeature {
    private MapboxMap mMap;
    private ReadableMap mReactStyle;

    public RCTMGLLight(Context context) {
        super(context);
    }

    @Override
    public void addToMap(RCTMGLMapView mapView) {
        mMap = mapView.getMapboxMap();
        setLight();
    }

    @Override
    public void removeFromMap(RCTMGLMapView mapView) {
        // ignore there's nothing to remove just update the light style
    }

    public void setReactStyle(ReadableMap reactStyle) {
        mReactStyle = reactStyle;

        setLight();
    }

    private void setLight(Light light) {
        RCTMGLStyleFactory.setLightLayerStyle(light, new RCTMGLStyle(getContext(), mReactStyle, mMap));
    }

    private void setLight() {
        Style style = getStyle();
        if (style != null) {
            setLight(style.getLight());
        }
    }

    private Style getStyle() {
        if (mMap == null) {
            return null;
        }
        return mMap.getStyle();
    }
}
