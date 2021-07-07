package com.mapxus.map.events;

import com.facebook.react.bridge.WritableMap;

/**
 * Created by nickitaliano on 10/24/17.
 */

public class OfflineEvent extends AbstractEvent {
    private String mEventKey;
    private WritableMap mPayload;

    public OfflineEvent(String eventKey, String eventType, WritableMap payload) {
        super(eventType);
        mEventKey = eventKey;
        mPayload = payload;
    }

    @Override
    public String getKey() {
        return mEventKey;
    }

    @Override
    public WritableMap getPayload() {
        return mPayload;
    }
}
