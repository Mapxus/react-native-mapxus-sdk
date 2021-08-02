//
//  MXVisualNodeView.h
//  react-native-mapxus-sdk
//
//  Created by chenghao guo on 2021/7/30.
//

#import <UIKit/UIKit.h>
#import <Mapbox/Mapbox.h>
#import <React/RCTComponent.h>

NS_ASSUME_NONNULL_BEGIN

@interface MXVisualNodeView : UIView

@property (nonatomic, weak) MGLMapView *mapRendererView;

@property (nonatomic, copy) RCTBubblingEventBlock onTappedFlag;

- (void)reactRenderFlagsUsingNodes:(NSArray<NSDictionary *> *)nodes;
- (void)reactCleanLayer;
- (void)reactChangeOnBuilding:(NSString *)buildingId floor:(NSString *)floor;

@end

NS_ASSUME_NONNULL_END
