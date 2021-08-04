//
//  MXSimulateLocation.h
//  react-native-mapxus-sdk
//
//  Created by chenghao guo on 2021/7/27.
//

#import <UIKit/UIKit.h>
#import "RCTMXUserLocationProtocol.h"

NS_ASSUME_NONNULL_BEGIN

@interface MXSimulateLocation : UIView <RCTMXUserLocationProtocol>

- (void)reactSetSimulateLocation:(CLLocation *)location;

@end

NS_ASSUME_NONNULL_END
