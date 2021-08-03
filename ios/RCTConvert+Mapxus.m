//
//  RCTConvert+Mapxus.m
//  react-native-mapxus-sdk
//
//  Created by chenghao guo on 2021/5/10.
//

#import "RCTConvert+Mapxus.h"

@implementation RCTConvert (Mapxus)

+ (MXMConfiguration *)MXMConfiguration:(id)json {
    json = [self NSDictionary:json];
    MXMConfiguration *conf = [[MXMConfiguration alloc] init];
    conf.outdoorHidden = [json[@"outdoorHidden"] boolValue];
    conf.defaultStyle = [json[@"defaultStyle"] unsignedIntegerValue];
    conf.defaultStyleName = json[@"defaultStyleName"];
    conf.buildingId = json[@"buildingId"];
    conf.floor = json[@"floor"];
    conf.zoomInsets = [self UIEdgeInsets:json[@"zoomInsets"]];
    conf.poiId = json[@"poiId"];
    conf.zoomLevel = [json[@"zoomLevel"] floatValue];
    return conf;
}

+ (MXMBuildingSearchRequest *)MXMBuildingSearchRequest:(id)json {
    json = [self NSDictionary:json];
    MXMBuildingSearchRequest *req = [[MXMBuildingSearchRequest alloc] init];
    req.keywords = json[@"keywords"];
    req.bbox = [self MXMBoundingBox:json[@"bbox"]];
    req.center = [self MXMGeoPoint:json[@"center"]];
    req.distance = [json[@"distance"] doubleValue];
    req.offset = [json[@"offset"] unsignedIntegerValue];
    req.page = [json[@"page"] unsignedIntegerValue];
    req.buildingIds = json[@"buildingIds"];
    return req;
}

+ (MXMBoundingBox *)MXMBoundingBox:(id)json {
    if (json) {
        json = [self NSDictionary:json];
        MXMBoundingBox *box = [[MXMBoundingBox alloc] init];
        box.min_latitude = [json[@"min_latitude"] floatValue];
        box.min_longitude = [json[@"min_longitude"] floatValue];
        box.max_latitude = [json[@"max_latitude"] floatValue];
        box.max_longitude = [json[@"max_longitude"] floatValue];
        return box;
    } else {
        return nil;
    }
}

+ (MXMGeoPoint *)MXMGeoPoint:(id)json {
    if (json) {
        json = [self NSDictionary:json];
        MXMGeoPoint *point = [[MXMGeoPoint alloc] init];
        point.latitude = [json[@"latitude"] floatValue];
        point.longitude = [json[@"longitude"] floatValue];
        point.elevation = [json[@"elevation"] floatValue];
        return point;
    } else {
        return nil;
    }
}

+ (MXMReverseGeoCodeSearchOption *)MXMReverseGeoCodeSearchOption:(id)json {
    json = [self NSDictionary:json];
    MXMGeoPoint *p = [self MXMGeoPoint:json[@"location"]];
    MXMReverseGeoCodeSearchOption *req = [[MXMReverseGeoCodeSearchOption alloc] init];
    req.location = CLLocationCoordinate2DMake(p.latitude, p.longitude);
    req.ordinalFloor = json[@"ordinalFloor"];
    return req;
}

+ (MXMPOICategorySearchRequest *)MXMPOICategorySearchRequest:(id)json {
    json = [self NSDictionary:json];
    MXMPOICategorySearchRequest *req = [[MXMPOICategorySearchRequest alloc] init];
    req.buildingId = json[@"buildingId"];
    req.floor = json[@"floor"];
    return req;
}

+ (MXMPOISearchRequest *)MXMPOISearchRequest:(id)json {
    json = [self NSDictionary:json];
    MXMPOISearchRequest *req = [[MXMPOISearchRequest alloc] init];
    req.keywords = json[@"keywords"];
    req.buildingId = json[@"buildingId"];
    req.floor = json[@"floor"];
    req.bbox = [self MXMBoundingBox:json[@"bbox"]];
    req.center = [self MXMGeoPoint:json[@"center"]];
    req.meterDistance = [json[@"meterDistance"] unsignedIntegerValue];
    req.offset = [json[@"offset"] unsignedIntegerValue];
    req.page = [json[@"page"] unsignedIntegerValue];
    req.category = json[@"category"];
    req.sort = json[@"sort"];
    req.ordinal = [json[@"ordinal"] integerValue];
    req.POIIds = json[@"POIIds"];
    return req;
}

+ (MXMOrientationPOISearchRequest *)MXMOrientationPOISearchRequest:(id)json {
    json = [self NSDictionary:json];
    MXMOrientationPOISearchRequest *req = [[MXMOrientationPOISearchRequest alloc] init];
    req.angle = [json[@"angle"] unsignedIntegerValue];
    req.distanceSearchType = json[@"distanceSearchType"];
    req.buildingId = json[@"buildingId"];
    req.floor = json[@"floor"];
    req.center = [self MXMGeoPoint:json[@"center"]];
    req.distance = [json[@"distance"] unsignedIntegerValue];
    return req;
}

+ (MXMRouteSearchRequest *)MXMRouteSearchRequest:(id)json {
    json = [self NSDictionary:json];
    MXMRouteSearchRequest *req = [[MXMRouteSearchRequest alloc] init];
    req.fromBuilding = json[@"fromBuilding"];
    req.fromFloor = json[@"fromFloor"];
    req.fromLon = [json[@"fromLon"] doubleValue];
    req.fromLat = [json[@"fromLat"] doubleValue];
    req.toBuilding = json[@"toBuilding"];
    req.toFloor = json[@"toFloor"];
    req.toLon = [json[@"toLon"] doubleValue];
    req.toLat = [json[@"toLat"] doubleValue];
    req.vehicle = json[@"vehicle"];
    req.locale = json[@"locale"];
    req.toDoor = [json[@"toDoor"] boolValue];
    return req;
}

+ (MXMVisualBuildingSearchOption *)MXMVisualBuildingSearchOption:(id)json {
    json = [self NSDictionary:json];
    MXMVisualBuildingSearchOption *req = [[MXMVisualBuildingSearchOption alloc] init];
    req.buildingId = json[@"buildingId"];
    req.scope = [json[@"scope"] unsignedIntegerValue];
    return req;
}

@end
