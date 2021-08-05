package com.mapxus.map.utils;

import android.graphics.PointF;
import android.graphics.RectF;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.NoSuchKeyException;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;
import com.mapxus.map.mapxusmap.api.map.model.LatLng;
import com.mapxus.map.mapxusmap.api.map.model.SelectorPosition;
import com.mapxus.map.mapxusmap.api.services.model.planning.HintDto;

import java.lang.reflect.Array;
import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.text.NumberFormat;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by nickitaliano on 8/18/17.
 */

public class ConvertUtils {
    public static final String LOG_TAG = "ConvertUtils";
    private static final Map<Class, Field[]> FILED_MAP = new HashMap<>();

    public static JsonObject toJsonObject(ReadableMap map) {
        if (map == null) return null;
        JsonObject result = new JsonObject();
        ReadableMapKeySetIterator it = map.keySetIterator();

        while (it.hasNextKey()) {
            String key = it.nextKey();
            switch (map.getType(key)) {
                case Map:
                    result.add(key, toJsonObject(map.getMap(key)));
                    break;
                case Array:
                    result.add(key, toJsonArray(map.getArray(key)));
                    break;
                case Null:
                    result.add(key, null);
                    break;
                case Number:
                    result.addProperty(key, map.getDouble(key));
                    break;
                case String:
                    result.addProperty(key, map.getString(key));
                    break;
                case Boolean:
                    result.addProperty(key, map.getBoolean(key));
                    break;
            }
        }
        return result;
    }

    public static JsonArray toJsonArray(ReadableArray array) {
        if (array == null) return null;
        JsonArray result = new JsonArray(array.size());
        for (int i = 0; i < array.size(); i++) {
            switch (array.getType(i)) {
                case Map:
                    result.add(toJsonObject(array.getMap(i)));
                    break;
                case Array:
                    result.add(toJsonArray(array.getArray(i)));
                    break;
                case Null:
                    result.add((JsonElement)null);
                    break;
                case Number:
                    result.add(array.getDouble(i));
                    break;
                case String:
                    result.add(array.getString(i));
                    break;
                case Boolean:
                    result.add(array.getBoolean(i));
                    break;
            }
        }
        return result;
    }

    public static JsonElement typedToJsonElement(ReadableMap map) {
        if (map == null) return null;

        String type = map.getString("type");

        if (type.equals(ExpressionParser.TYPE_MAP)) {
            JsonObject result = new JsonObject();

            ReadableArray keyValues = map.getArray("value");
            for (int i = 0; i < keyValues.size(); i++) {
                ReadableArray keyValue = keyValues.getArray(i);
                String key = keyValue.getMap(0).getString("value");

                result.add(key, typedToJsonElement(keyValue.getMap(1)));
            }
            return result;
        }
        else if (type.equals(ExpressionParser.TYPE_ARRAY)) {
            ReadableArray arrayValue = map.getArray("value");
            JsonArray result = new JsonArray(arrayValue.size());
            for (int i = 0; i < arrayValue.size(); i++) {
                result.add(typedToJsonElement(arrayValue.getMap(i)));
            }
            return result;
        }
        else if (type.equals(ExpressionParser.TYPE_BOOL)) {
            return new JsonPrimitive(map.getBoolean("value"));
        }
        else if (type.equals(ExpressionParser.TYPE_NUMBER)) {
            return new JsonPrimitive(map.getDouble("value"));
        }
        else if (type.equals(ExpressionParser.TYPE_STRING)) {
            return new JsonPrimitive(map.getString("value"));
        }
        else {
            throw new RuntimeException(String.format("Unrecognized type {}", map.getString("type")));
        }
    }

    public static WritableArray toWritableArray(JsonArray array) {
        WritableArray writableArray = Arguments.createArray();

        for (int i = 0; i < array.size(); i++) {
            JsonElement element = array.get(i);

            if (element.isJsonArray()) {
                writableArray.pushArray(toWritableArray(element.getAsJsonArray()));
            } else if (element.isJsonObject()) {
                writableArray.pushMap(toWritableMap(element.getAsJsonObject()));
            } else if (element.isJsonPrimitive()) {
                JsonPrimitive primitive = element.getAsJsonPrimitive();

                if (primitive.isBoolean()) {
                    writableArray.pushBoolean(primitive.getAsBoolean());
                } else if (primitive.isNumber()) {
                    writableArray.pushDouble(primitive.getAsDouble());
                } else {
                    writableArray.pushString(primitive.getAsString());
                }
            }
        }

        return writableArray;
    }

    public static WritableMap toWritableMap(JsonObject object) {
        WritableMap map = Arguments.createMap();

        for (Map.Entry<String, JsonElement> entry : object.entrySet()) {
            String propName = entry.getKey();
            JsonElement jsonElement = entry.getValue();

            if (jsonElement.isJsonPrimitive()) {
                JsonPrimitive primitive = jsonElement.getAsJsonPrimitive();

                if (primitive.isBoolean()) {
                    map.putBoolean(propName, primitive.getAsBoolean());
                } else if (primitive.isNumber()) {
                    map.putDouble(propName, primitive.getAsDouble());
                } else {
                    map.putString(propName, primitive.getAsString());
                }
            } else if (jsonElement.isJsonArray()) {
                map.putArray(propName, toWritableArray(jsonElement.getAsJsonArray()));
            } else if (jsonElement.isJsonObject()) {
                map.putMap(propName, toWritableMap(jsonElement.getAsJsonObject()));
            }
        }

        return map;
    }

    public static Object getObjectFromString(String str) {
        NumberFormat numberFormat = NumberFormat.getNumberInstance();

        try {
            return numberFormat.parse(str);
        } catch (ParseException e) {
            // ignore we're just figuring out what type this is
        }

        return str;
    }

    public static List<String> toStringList(ReadableArray array) {
        List<String> list = new ArrayList<>();

        if (array == null) {
            return list;
        }

        for (int i = 0; i < array.size(); i++) {
            list.add(array.getString(i));
        }

        return list;
    }

    public static PointF toPointF(ReadableArray array) {
        PointF pointF = new PointF();

        if (array == null) {
            return pointF;
        }

        pointF.set((float)array.getDouble(0), (float)array.getDouble(1));
        return pointF;
    }

    public static RectF toRectF(ReadableArray array) {
        RectF rectF = new RectF();

        if (array == null) {
            return rectF;
        }

        rectF.set((float)array.getDouble(3), (float)array.getDouble(0), (float)array.getDouble(1), (float)array.getDouble(2));
        return rectF;
    }

    public static double getDouble(String key, ReadableMap map, double defaultValue) {
        double value = defaultValue;

        try {
            value = map.getDouble(key);
        } catch (NoSuchKeyException e) {
            // key not found use default value
            Log.d(LOG_TAG, String.format("No key found for %s, using default value %f", key, defaultValue));
        }

        return value;
    }

    public static String getString(String key, ReadableMap map, String defaultValue) {
        String value = defaultValue;

        try {
            value = map.getString(key);
        } catch (NoSuchKeyException e) {
            // key not found use default value
            Log.d(LOG_TAG, String.format("No key found for %s, using default value %s", key, defaultValue));
        }

        return value;
    }

    public static <T> T convert(ReadableMap readableMap, Class<T> targetClass) {
        if (readableMap == null) {
            return null;
        }
        if (!FILED_MAP.containsKey(targetClass)) {
            FILED_MAP.put(targetClass, concat(targetClass.getDeclaredFields(), targetClass.getFields()));
        }
        try {
            T target = targetClass.newInstance();
            Field[] fields = FILED_MAP.get(targetClass);
            for (Field field : fields) {
                if (readableMap.hasKey(field.getName())) {
                    field.setAccessible(true);
                    field.set(target, getValue(readableMap, field));
                }
                if (field.getName().equals("buildingId")) {
                    field.setAccessible(true);
                    field.set(target, readableMap.getString("buildingId") == null ? readableMap.getString("building_id") : readableMap.getString("buildingId"));
                }
                if (field.getName().equals("streetName")) {
                    field.setAccessible(true);
                    field.set(target, readableMap.getString("streetName") == null ? readableMap.getString("street_name") : readableMap.getString("streetName"));
                }
            }
            return target;
        } catch (Exception e) {
            Log.e(LOG_TAG, e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    public static Field[] concat(Field[] a, Field[] b) {
        Field[] c = new Field[a.length + b.length];
        System.arraycopy(a, 0, c, 0, a.length);
        System.arraycopy(b, 0, c, a.length, b.length);
        return c;
    }

    private static Object getValue(ReadableMap readableMa, Field field) {
        if (field.getType().equals(Integer.class) || field.getType().equals(int.class)) {
            return readableMa.getInt(field.getName());
        }
        if (field.getType().equals(Long.class)) {
            return (long) readableMa.getInt(field.getName());
        }
        if (field.getType().equals(Double.class)) {
            return readableMa.getDouble(field.getName());
        }
        if (field.getType().equals(String.class)) {
            return readableMa.getString(field.getName());
        }
        if (field.getType().equals(Boolean.class) || field.getType().equals(boolean.class)) {
            return readableMa.getBoolean(field.getName());
        }
        if (field.getType().equals(LatLng.class)) {
            ReadableMap latlng = readableMa.getMap(field.getName());
            return new LatLng(latlng.getDouble("latitude"), latlng.getDouble("longitude"));
        }
        if (field.getType().equals(HintDto.class)) {
            ReadableMap hints = readableMa.getMap(field.getName());
            HintDto hintDto = new HintDto();
            hintDto.setAverage(hints.getString("visited_nodes.average"));
            hintDto.setSum(hints.getString("visited_nodes.sum"));
            return hintDto;
        }
        if (field.getType().equals(List.class)) {
            List result = new ArrayList();
            ReadableArray array = readableMa.getArray(field.getName());
            for (int i = 0; i < array.size(); i++) {
                result.add(convert(array.getMap(i), (Class<?>) (((ParameterizedType) field.getGenericType()).getActualTypeArguments())[0]));
            }
            return result;
        }
        if (field.getType().isArray()) {
            ReadableArray array = readableMa.getArray(field.getName());
            if (field.getType().equals(Integer[].class)) {
                Integer[] resultArr = new Integer[array.size()];
                for (int i = 0; i < array.size(); i++) {
                    Array.set(resultArr, i, array.getInt(i));
                }
                return resultArr;
            } else if (field.getType().equals(Double[].class)) {
                Double[] resultArr = new Double[array.size()];
                for (int i = 0; i < array.size(); i++) {
                    Array.set(resultArr, i, array.getDouble(i));
                }
                return resultArr;
            } else if (field.getType().equals(double[][].class)) {
                double[][] resultArr = new double[array.size()][2];
                for (int i = 0; i < array.size(); i++) {
                    resultArr[i][0] = array.getArray(i).getDouble(0);
                    resultArr[i][1] = array.getArray(i).getDouble(1);
                }
                return resultArr;
            }

            return null;
        }

        if (field.getType() instanceof Object) {
            return convert(readableMa.getMap(field.getName()), field.getType());
        }
        return null;
    }

    public static int getMapxusPosition(int postiion) {
        switch (postiion){
            case 1:
                return SelectorPosition.CENTER_RIGHT;
            case 2:
                return SelectorPosition.BOTTOM_LEFT;
            case 3:
                return SelectorPosition.BOTTOM_RIGHT;
            case 4:
                return SelectorPosition.TOP_LEFT;
            case 5:
                return SelectorPosition.TOP_RIGHT;
            default:
            case 0:
                return SelectorPosition.CENTER_LEFT;
        }
    }
}
