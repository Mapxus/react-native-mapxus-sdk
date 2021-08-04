//
//  MXSimulateLocation.m
//  react-native-mapxus-sdk
//
//  Created by chenghao guo on 2021/7/27.
//

#import "MXSimulateLocation.h"
#import "RCTMGLLocation.h"

@interface MXSimulateLocation () <CLLocationManagerDelegate>

@property (nonatomic, strong) CLLocationManager *innerLocationManager;
@property (nonatomic, strong) CLHeading *lastHeading;
@property (nonatomic, strong) CLLocation *lastLocation;

@end

@implementation MXSimulateLocation

@synthesize delegate = _delegate;
@synthesize mapRendererView = _mapRendererView;
@synthesize reactShowsUserHeadingIndicator = _reactShowsUserHeadingIndicator;
@synthesize onUpdate;


- (void)dealloc
{
    [self stopUpdatingLocation];
    [self stopUpdatingHeading];
}

- (void)setMapRendererView:(RCTMGLMapView *)mapRendererView {
    _mapRendererView = mapRendererView;
    if (_mapRendererView) {
        _mapRendererView.useNativeUserLocationAnnotationView = YES;
        _mapRendererView.locationManager = self;
        _mapRendererView.showsUserLocation = YES;
        _mapRendererView.showsUserHeadingIndicator = self.reactShowsUserHeadingIndicator;
    } else {
        _mapRendererView.useNativeUserLocationAnnotationView = NO;
        _mapRendererView.locationManager = nil;
        _mapRendererView.showsUserLocation = NO;
        _mapRendererView.showsUserHeadingIndicator = NO;
    }
}

- (void)reactSetSimulateLocation:(CLLocation *)location {
    self.lastLocation = location;
    
    if ([self.delegate respondsToSelector:@selector(locationManager:didUpdateLocations:)]) {
        [self.delegate locationManager:self didUpdateLocations:@[location]];
    }
    [self promptData];
}

- (void)setReactShowsUserHeadingIndicator:(BOOL)reactShowsUserHeadingIndicator {
    _reactShowsUserHeadingIndicator = reactShowsUserHeadingIndicator;
    self.mapRendererView.showsUserHeadingIndicator = reactShowsUserHeadingIndicator;
}

- (void)promptData {
    if (!self.onUpdate || !self.lastLocation || !self.lastHeading) {
        return;
    }
    
    RCTMGLLocation *userLocation = [[RCTMGLLocation alloc] init];
    userLocation.location = self.lastLocation;
    userLocation.heading = self.lastHeading;
    
    self.onUpdate([userLocation toJSON]);
}

#pragma mark - MGLLocationManager
- (void)setHeadingOrientation:(CLDeviceOrientation)headingOrientation
{
    self.innerLocationManager.headingOrientation = headingOrientation;
}

- (CLDeviceOrientation)headingOrientation
{
    return self.innerLocationManager.headingOrientation;
}

- (void)setDesiredAccuracy:(CLLocationAccuracy)desiredAccuracy {
    self.innerLocationManager.desiredAccuracy = desiredAccuracy;
}

- (CLLocationAccuracy)desiredAccuracy {
    return self.innerLocationManager.desiredAccuracy;
}

- (CLAuthorizationStatus)authorizationStatus
{
    return [CLLocationManager authorizationStatus];
}

- (void)setActivityType:(CLActivityType)activityType {
    self.innerLocationManager.activityType = activityType;
}

- (CLActivityType)activityType {
    return self.innerLocationManager.activityType;
}

- (void)requestAlwaysAuthorization
{
    [self.innerLocationManager requestAlwaysAuthorization];
}

- (void)requestWhenInUseAuthorization
{
    [self.innerLocationManager requestWhenInUseAuthorization];
}

- (void)startUpdatingHeading
{
    [self.innerLocationManager startUpdatingHeading];
}

- (void)startUpdatingLocation
{
//    [self.innerLocationManager startUpdatingLocation];
}

- (void)stopUpdatingHeading
{
    [self.innerLocationManager stopUpdatingHeading];
}

- (void)stopUpdatingLocation
{
//    [self.innerLocationManager stopUpdatingLocation];
}

- (void)dismissHeadingCalibrationDisplay
{
    [self.innerLocationManager dismissHeadingCalibrationDisplay];
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
    [self promptData];
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


#pragma mark - Lazy loading
- (CLLocationManager *)innerLocationManager {
    if (!_innerLocationManager) {
        _innerLocationManager = [[CLLocationManager alloc] init];
        _innerLocationManager.delegate = self;
    }
    return _innerLocationManager;
}

@end
 
