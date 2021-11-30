//
//  MXPointAnnotationView.h
//  react-native-mapxus-sdk
//
//  Created by chenghao guo on 2021/4/16.
//

#import "RCTMGLPointAnnotation.h"
#import "MXRNPointAnnotation.h"

@class MXMap;

NS_ASSUME_NONNULL_BEGIN

@interface MXPointAnnotationView : RCTMGLPointAnnotation

// 重写部分
@property (nonatomic, weak) MGLMapView *map;
@property (nonatomic, copy) NSString *reactCoordinate;

@property (nonatomic, weak) MXMap *mapxusMap;

@property (nonatomic, strong) MXRNPointAnnotation *relatedAnnotation;

@property (nonatomic, strong, nullable) NSString *reactFloor;
@property (nonatomic, strong, nullable) NSString *reactBuildingId;


@end

NS_ASSUME_NONNULL_END
