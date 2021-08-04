//
//  RCTConvert+Mapxus.h
//  react-native-mapxus-sdk
//
//  Created by chenghao guo on 2021/5/10.
//

#import <React/RCTConvert.h>
#import <MapxusMapSDK/MapxusMapSDK.h>
#import <MapxusVisualSDK/MapxusVisualSDK.h>


NS_ASSUME_NONNULL_BEGIN

@interface RCTConvert (Mapxus)

+ (MXMConfiguration *)MXMConfiguration:(id)json;

+ (MXMBuildingSearchRequest *)MXMBuildingSearchRequest:(id)json;

+ (MXMBoundingBox *)MXMBoundingBox:(id)json;

+ (MXMGeoPoint *)MXMGeoPoint:(id)json;

+ (MXMReverseGeoCodeSearchOption *)MXMReverseGeoCodeSearchOption:(id)json;

+ (MXMPOICategorySearchRequest *)MXMPOICategorySearchRequest:(id)json;

+ (MXMPOISearchRequest *)MXMPOISearchRequest:(id)json;

+ (MXMOrientationPOISearchRequest *)MXMOrientationPOISearchRequest:(id)json;

+ (MXMRouteSearchRequest *)MXMRouteSearchRequest:(id)json;

+ (MXMVisualBuildingSearchOption *)MXMVisualBuildingSearchOption:(id)json;

+ (MXMVisualCoordinate2D)MXMVisualCoordinate2D:(id)json;

@end

NS_ASSUME_NONNULL_END
