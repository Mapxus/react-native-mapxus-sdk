//
//  MXRouteView.h
//  react-native-mapxus-sdk
//
//  Created by chenghao guo on 2021/7/29.
//

#import <UIKit/UIKit.h>
#import <MapxusMapSDK/MapxusMapSDK.h>


NS_ASSUME_NONNULL_BEGIN

@interface MXRouteView : UIView

@property (nonatomic, weak) MGLMapView *mapRendererView;

@property (nonatomic, strong) NSDictionary *reactRouteAppearance;
@property (nonatomic, readonly) NSDictionary *reactPainterPathDto;

- (void)reactPaintRouteUsingPath:(MXMPath *)path wayPoints:(NSArray<MXMIndoorPoint *> *)list;
- (void)reactCleanRoute;
- (void)reactChangeOnBuilding:(nullable NSString *)buildingId floor:(nullable NSString *)floor;
- (void)reactFocusOnKeys:(NSArray<NSString*> *)keys edgePadding:(UIEdgeInsets)insets;

@end

NS_ASSUME_NONNULL_END
