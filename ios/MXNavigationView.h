//
//  MXNavigationView.h
//  react-native-mapxus-sdk
//
//  Created by chenghao guo on 2021/4/21.
//

#import <UIKit/UIKit.h>

@import Mapbox;
@import MapxusMapSDK;
@import MapxusComponentKit;


NS_ASSUME_NONNULL_BEGIN

@interface MXNavigationView : UIView

@property (nonatomic, weak) MGLMapView *mapRenderer;

@property (nonatomic, readonly) NSDictionary *reactPainterPathDto;

- (void)reactPaintRouteUsingPath:(MXMPath *)path wayPoints:(NSArray<MXMIndoorPoint *> *)list;
- (void)reactCleanRoute;
- (void)reactChangeOnBuilding:(nullable NSString *)buildingId floor:(nullable NSString *)floor;
- (void)reactFocusOnKeys:(NSArray<NSString*> *)keys edgePadding:(UIEdgeInsets)insets;

@end

NS_ASSUME_NONNULL_END
