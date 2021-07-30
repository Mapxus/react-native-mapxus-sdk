//
//  MXSimulateLocation.m
//  react-native-mapxus-sdk
//
//  Created by chenghao guo on 2021/7/27.
//

#import "MXSimulateLocation.h"
#import "RCTMGLLocation.h"

@interface MXSimulateLocation () <CLLocationManagerDelegate>

@property (nonatomic) CLLocationManager *locationManager;
@property (nonatomic, strong) CLHeading *lastHeading;

@end

@implementation MXSimulateLocation

@synthesize delegate;
@synthesize mapRendererView = _mapRendererView;
@synthesize onUpdate;
@synthesize reactShowsUserHeadingIndicator = _reactShowsUserHeadingIndicator;

- (instancetype)init
{
    if (self = [super init]) {
        _locationManager = [[CLLocationManager alloc] init];
        _locationManager.delegate = self;
    }
    return self;
}

- (void)dealloc
{
    [self.locationManager stopUpdatingLocation];
    [self.locationManager stopUpdatingHeading];
    self.delegate = nil;
}

- (void)setMapRendererView:(RCTMGLMapView *)mapRendererView {
    _mapRendererView = mapRendererView;
    if (mapRendererView) {
        mapRendererView.useNativeUserLocationAnnotationView = YES;
        mapRendererView.locationManager = self;
        mapRendererView.showsUserLocation = YES;
        mapRendererView.showsUserHeadingIndicator = self.reactShowsUserHeadingIndicator;
    } else {
        mapRendererView.useNativeUserLocationAnnotationView = NO;
        mapRendererView.locationManager = nil;
        mapRendererView.showsUserLocation = NO;
        mapRendererView.showsUserHeadingIndicator = NO;
    }
}

- (void)setSimulateLocation:(CLLocation *)location {
    if ([self.delegate respondsToSelector:@selector(locationManager:didUpdateLocations:)]) {
        [self.delegate locationManager:self didUpdateLocations:@[location]];
    }
    
    if (!self.onUpdate) {
        return;
    }
    
    RCTMGLLocation *userLocation = [[RCTMGLLocation alloc] init];
    userLocation.location = location;
    userLocation.heading = self.lastHeading;
    
    self.onUpdate([userLocation toJSON]);
    
}

- (void)setReactShowsUserHeadingIndicator:(BOOL)reactShowsUserHeadingIndicator {
    _reactShowsUserHeadingIndicator = reactShowsUserHeadingIndicator;
    self.mapRendererView.showsUserHeadingIndicator = reactShowsUserHeadingIndicator;
}


#pragma mark - MGLLocationManager
- (void)setHeadingOrientation:(CLDeviceOrientation)headingOrientation
{
    self.locationManager.headingOrientation = headingOrientation;
}

- (CLDeviceOrientation)headingOrientation
{
    return self.locationManager.headingOrientation;
}

- (void)setDesiredAccuracy:(CLLocationAccuracy)desiredAccuracy {
    self.locationManager.desiredAccuracy = desiredAccuracy;
}

- (CLLocationAccuracy)desiredAccuracy {
    return self.locationManager.desiredAccuracy;
}

- (CLAuthorizationStatus)authorizationStatus
{
    return [CLLocationManager authorizationStatus];
}

- (void)setActivityType:(CLActivityType)activityType {
    self.locationManager.activityType = activityType;
}

- (CLActivityType)activityType {
    return self.locationManager.activityType;
}

- (void)requestAlwaysAuthorization
{
    [self.locationManager requestAlwaysAuthorization];
}

- (void)requestWhenInUseAuthorization
{
    [self.locationManager requestWhenInUseAuthorization];
}

- (void)startUpdatingHeading
{
    [self.locationManager startUpdatingHeading];
}

- (void)startUpdatingLocation
{
//    [self.locationManager startUpdatingLocation];
}

- (void)stopUpdatingHeading
{
    [self.locationManager stopUpdatingHeading];
}

- (void)stopUpdatingLocation
{
    [self.locationManager stopUpdatingLocation];
}

- (void)dismissHeadingCalibrationDisplay
{
    [self.locationManager dismissHeadingCalibrationDisplay];
}


#pragma mark - CLLocationManagerDelegate
- (void)locationManager:(CLLocationManager *)manager didUpdateLocations:(NSArray<CLLocation *> *)locations
{
//    if ([self.delegate respondsToSelector:@selector(locationManager:didUpdateLocations:)]) {
//        [self.delegate locationManager:self didUpdateLocations:locations];
//    }
}

- (void)locationManager:(CLLocationManager *)manager didUpdateHeading:(CLHeading *)newHeading
{
    self.lastHeading = newHeading;
    if ([self.delegate respondsToSelector:@selector(locationManager:didUpdateHeading:)]) {
        [self.delegate locationManager:self didUpdateHeading:newHeading];
    }
}

- (BOOL)locationManagerShouldDisplayHeadingCalibration:(CLLocationManager *)manager
{
    if ([self.delegate respondsToSelector:@selector(locationManagerShouldDisplayHeadingCalibration:)]) {
        return [self.delegate locationManagerShouldDisplayHeadingCalibration:self];
    }
    
    return NO;
}

- (void)locationManager:(CLLocationManager *)locationManager didFailWithError:(nonnull NSError *)error {
    if ([self.delegate respondsToSelector:@selector(locationManager:didFailWithError:)]) {
        [self.delegate locationManager:self didFailWithError:error];
    }
}

@end
 
