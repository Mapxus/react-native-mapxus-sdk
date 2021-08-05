package com.mapxus.map.components.styles.layers;

import android.content.Context;

import com.mapbox.mapboxsdk.style.layers.RasterLayer;
import com.mapxus.map.components.styles.RCTMGLStyle;
import com.mapxus.map.components.styles.RCTMGLStyleFactory;

/**
 * Created by nickitaliano on 9/25/17.
 */

public class RCTMGLRasterLayer extends RCTLayer<RasterLayer> {
    public RCTMGLRasterLayer(Context context) {
        super(context);
    }

    @Override
    public RasterLayer makeLayer() {
        return new RasterLayer(mID, mSourceID);
    }

    @Override
    public void addStyles() {
        RCTMGLStyleFactory.setRasterLayerStyle(mLayer, new RCTMGLStyle(getContext(), mReactStyle, mMap));
    }
}
