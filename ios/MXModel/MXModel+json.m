//
//  MXModel+json.m
//  react-native-mapxus-sdk
//
//  根据YYModel的使用规则（你可以把一个或一组 json key (key path) 映射到一个或多个属性。如果一个属性没有映射关系，那默认会使用相同属性名作为映射。
//  在 model->json 的过程中：如果一个属性对应了多个 json key (key path)，那么转换过程仅会处理第一个 json key (key path)；如果多个属性对应了同一个 json
//  key，则转换过过程会使用其中任意一个不为空的值。）解析成json通过函数覆盖重写model转出json的映射
//
//  Created by chenghao guo on 2021/6/3.
//

#import "MXModel+json.h"

@implementation MXMGeoPOI (json)
+ (NSDictionary *)modelCustomPropertyMapper {
    return @{@"identifier" : @[@"identifier", @"osm:ref"],
             @"buildingId" : @[@"buildingId", @"ref:building"],
             @"name_ja" : @[@"name_ja", @"name:ja"],
             @"name_ko" : @[@"name_ko", @"name:ko"],
             @"name_cn" : @[@"name_cn", @"name:zh-Hans"],
             @"name_en" : @[@"name_en", @"name:en"],
             @"name_zh" : @[@"name_zh", @"name:zh-Hant"],
             @"accessibilityDetail" : @[@"accessibilityDetail", @"accessibility_detail"],
             @"accessibilityDetail_en" : @[@"accessibilityDetail_en", @"accessibility_detail:en"],
             @"accessibilityDetail_cn" : @[@"accessibilityDetail_cn", @"accessibility_detail:zh-Hans"],
             @"accessibilityDetail_zh" : @[@"accessibilityDetail_zh", @"accessibility_detail:zh-Hant"],
             @"accessibilityDetail_ja" : @[@"accessibilityDetail_ja", @"accessibility_detail:ja"],
             @"accessibilityDetail_ko" : @[@"accessibilityDetail_ko", @"accessibility_detail:ko"],
    };
}
@end



@implementation MXMGeoBuilding (json)
+ (NSDictionary *)modelCustomPropertyMapper {
    return @{@"name_cn" : @[@"name_cn", @"name:zh-Hans"],
             @"name_en" : @[@"name_en", @"name:en"],
             @"name_zh" : @[@"name_zh", @"name:zh-Hant"],
             @"name_ja" : @[@"name_ja", @"name:ja"],
             @"name_ko" : @[@"name_ko", @"name:ko"],
             @"identifier" : @[@"identifier", @"id"],
             @"venueId" : @[@"venueId", @"ref:venue"],
             };
}
@end



@implementation MXMPOICategorySearchResponse (json)
+ (NSDictionary *)modelCustomPropertyMapper {
    return @{
             @"category" : @[@"category", @"result"],
             };
}
@end



@implementation MXMOrientationPOISearchResponse (json)
+ (NSDictionary *)modelCustomPropertyMapper {
    return @{
             @"pois" : @[@"pois", @"result"],
             };
}
@end

@implementation MXMCategory (json)
+ (NSDictionary *)modelCustomPropertyMapper {
    return @{@"categoryId" : @[@"categoryId", @"id"],
             @"title_en" : @[@"title_en", @"title.en"],
             @"title_cn" : @[@"title_cn", @"title.zh-Hans"],
             @"title_zh" : @[@"title_zh", @"title.zh-Hant"],
             @"categoryDescription" : @[@"categoryDescription", @"description"],
    };
}
@end

@implementation MXMGeoPoint (json)
+ (NSDictionary *)modelCustomPropertyMapper {
    return @{@"latitude" : @[@"latitude", @"lat"],
             @"longitude" : @[@"longitude", @"lon"],
             };
}
@end

@implementation MXMBoundingBox (json)
+ (NSDictionary *)modelCustomPropertyMapper {
    return @{@"min_latitude" : @[@"min_latitude", @"minLat"],
             @"min_longitude" : @[@"min_longitude", @"minLon"],
             @"max_latitude" : @[@"max_latitude", @"maxLat"],
             @"max_longitude" : @[@"max_longitude", @"maxLon"],
             };
}
@end

@implementation MXMFloor (json)
+ (NSDictionary *)modelCustomPropertyMapper {
    return @{@"floorId" : @[@"floorId", @"id"],
             @"hasVisualMap" : @[@"hasVisualMap", @"visualMap"]
             };
}
@end

@implementation MXMBuilding (json)
+ (NSDictionary *)modelCustomPropertyMapper {
    return @{@"name_default" : @[@"name_default", @"name.default"],
             @"name_en" : @[@"name_en", @"name.en"],
             @"name_cn" : @[@"name_cn", @"name.zh-Hans"],
             @"name_zh" : @[@"name_zh", @"name.zh-Hant"],
             @"name_ja" : @[@"name_ja", @"name.ja"],
             @"name_ko" : @[@"name_ko", @"name.ko"],
             @"venueName_default" : @[@"venueName_default", @"venueName.default"],
             @"venueName_en" : @[@"venueName_en", @"venueName.en"],
             @"venueName_cn" : @[@"venueName_cn", @"venueName.zh-Hans"],
             @"venueName_zh" : @[@"venueName_zh", @"venueName.zh-Hant"],
             @"venueName_ja" : @[@"venueName_ja", @"venueName.ja"],
             @"venueName_ko" : @[@"venueName_ko", @"venueName.ko"],
             @"address_default" : @[@"address_default", @"address.default"],
             @"address_en" : @[@"address_en", @"address.en"],
             @"address_cn" : @[@"address_cn", @"address.zh-Hans"],
             @"address_zh" : @[@"address_zh", @"address.zh-Hant"],
             @"address_ja" : @[@"address_ja", @"address.ja"],
             @"address_ko" : @[@"address_ko", @"address.ko"],
             @"buildingId" : @[@"buildingId", @"id"],
             @"hasVisualMap" : @[@"hasVisualMap", @"visualMap"]
             };
}
@end

@implementation MXMPOI (json)
+ (NSDictionary *)modelCustomPropertyMapper {
    return @{@"name_default" : @[@"name_default", @"name.default"],
             @"name_en" : @[@"name_en", @"name.en"],
             @"name_cn" : @[@"name_cn", @"name.zh-Hans"],
             @"name_zh" : @[@"name_zh", @"name.zh-Hant"],
             @"name_ja" : @[@"name_ja", @"name.ja"],
             @"name_ko" : @[@"name_ko", @"name.ko"],
             @"accessibilityDetail" : @[@"accessibilityDetail", @"accessibilityDetail.default"],
             @"accessibilityDetail_en" : @[@"accessibilityDetail_en", @"accessibilityDetail.en"],
             @"accessibilityDetail_cn" : @[@"accessibilityDetail_cn", @"accessibilityDetail.zh-Hans"],
             @"accessibilityDetail_zh" : @[@"accessibilityDetail_zh", @"accessibilityDetail.zh-Hant"],
             @"accessibilityDetail_ja" : @[@"accessibilityDetail_ja", @"accessibilityDetail.ja"],
             @"accessibilityDetail_ko" : @[@"accessibilityDetail_ko", @"accessibilityDetail.ko"],
             @"introduction" : @[@"introduction", @"description"],
             };
}
@end

@implementation MXMInstruction (json)
+ (NSDictionary *)modelCustomPropertyMapper {
    return @{
             @"buildingId" : @[@"buildingId", @"building_id"],
             @"streetName" : @[@"streetName", @"street_name"],
             };
}
@end

@implementation MXMNode (json)
+ (NSDictionary *)modelCustomPropertyMapper {
    return @{
             @"buildingId" : @[@"buildingId", @"building.id"],
             @"floor" : @"floor.code",
             @"latitude" : @[@"latitude", @"l.lat"],
             @"longitude" : @[@"longitude", @"l.lon"],
             @"bearing" : @[@"bearing", @"ca"],
             };
}

@end

@implementation MXMNodeGroup (json)
+ (NSDictionary *)modelCustomPropertyMapper {
    return @{
             @"floor" : @"floor.code",
             @"nodes" : @[@"nodes", @"images"],
             };
}

@end
