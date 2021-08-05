package com.mapxus.map.components.styles.layers;

import android.content.Context;

import com.mapbox.mapboxsdk.style.expressions.Expression;
import com.mapbox.mapboxsdk.style.layers.CircleLayer;
import com.mapxus.map.components.mapview.RCTMGLMapView;
import com.mapxus.map.components.styles.RCTMGLStyle;
import com.mapxus.map.components.styles.RCTMGLStyleFactory;

/**
 * Created by nickitaliano on 9/18/17.
 */

public class RCTMGLCircleLayer extends RCTLayer<CircleLayer> {
    private String mSourceLayerID;

    public RCTMGLCircleLayer(Context context) {
        super(context);
    }

    @Override
    protected void updateFilter(Expression expression) {
        mLayer.setFilter(expression);
    }

    @Override
    public void addToMap(RCTMGLMapView mapView) {
        super.addToMap(mapView);
    }

    @Override
    public CircleLayer makeLayer() {
        CircleLayer layer = new CircleLayer(mID, mSourceID);

        if (mSourceLayerID != null) {
            layer.setSourceLayer(mSourceLayerID);
        }

        return layer;
    }

    @Override
    public void addStyles() {
        RCTMGLStyleFactory.setCircleLayerStyle(mLayer, new RCTMGLStyle(getContext(), mReactStyle, mMap));
    }

    public void setSourceLayerID(String sourceLayerID) {
        mSourceLayerID = sourceLayerID;

        if (mLayer != null) {
            mLayer.setSourceLayer(sourceLayerID);
        }
    }
}