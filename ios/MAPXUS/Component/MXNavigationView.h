//
//  MXNavigationView.h
//  react-native-mapxus-sdk
//
//  Created by chenghao guo on 2021/4/21.
//

#import <UIKit/UIKit.h>
#import <MapxusMapSDK/MapxusMapSDK.h>
#import <MapxusComponentKit/MapxusComponentKit.h>
#import "RCTMGLMapView.h"
#import "RCTMXUserLocationProtocol.h"


NS_ASSUME_NONNULL_BEGIN

@interface MXNavigationView : UIView <RCTMXUserLocationProtocol>

@property (nonatomic, assign) BOOL reactAdsorbable;
@property (nonatomic, assign) BOOL reactShortenable;
@property (nonatomic, assign) NSUInteger reactNumberOfAllowedDrifts;
@property (nonatomic, assign) float reactMaximumDrift;
@property (nonatomic, assign) float reactDistanceToDestination;
@property (nonatomic, copy) RCTBubblingEventBlock onArrivalAtDestination;
@property (nonatomic, copy) RCTBubblingEventBlock onExcessiveDrift;
@property (nonatomic, copy) RCTBubblingEventBlock onRefreshTheAdsorptionLocation;
@property (nonatomic, copy) RCTBubblingEventBlock onGetNewPath;

- (void)updatePath:(MXMPath *)path wayPoints:(NSArray<MXMIndoorPoint *> *)wayPoints;
- (void)start;
- (void)stop;

@end

NS_ASSUME_NONNULL_END
