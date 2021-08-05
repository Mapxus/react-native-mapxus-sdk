//
//  MXNavigationView.m
//  react-native-mapxus-sdk
//
//  Created by chenghao guo on 2021/4/21.
//

#import <YYModel/YYModel.h>
#import "MXNavigationView.h"
#import "RCTMGLLocation.h"


@interface MXNavigationView () <CLLocationManagerDelegate, MXMRouteAdsorberDelegate, MXMRouteShortenerDelegate>

/** Virtual positioning function  */
@property (nonatomic, assign) NSInteger index;
@property (nonatomic, strong) NSTimer *locationUpdateTimer;
@property (nonatomic, strong) NSArray *acoordinates;
/** Virtual positioning function */

@property (nonatomic, assign) BOOL isNavigation;
@property (nonatomic, strong) CLLocation *lastActualLocation;
@property (nonatomic, strong) CLHeading *lastHeading;

@property (nonatomic, strong) CLLocationManager *innerLocationManager;
@property (nonatomic, strong) MXMRouteAdsorber *adsorber;
@property (nonatomic, strong) MXMRouteShortener *shortener;

@end

@implementation MXNavigationView

@synthesize delegate = _delegate;
@synthesize mapRendererView = _mapRendererView;
@synthesize reactShowsUserHeadingIndicator = _reactShowsUserHeadingIndicator;
@synthesize onUpdate;

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

- (void)setReactShowsUserHeadingIndicator:(BOOL)reactShowsUserHeadingIndicator {
    _reactShowsUserHeadingIndicator = reactShowsUserHeadingIndicator;
    self.mapRendererView.showsUserHeadingIndicator = reactShowsUserHeadingIndicator;
}

- (void)setReactNumberOfAllowedDrifts:(NSUInteger)reactNumberOfAllowedDrifts {
    _reactNumberOfAllowedDrifts = reactNumberOfAllowedDrifts;
    self.adsorber.numberOfAllowedDrifts = reactNumberOfAllowedDrifts;
}

- (void)setReactMaximumDrift:(float)reactMaximumDrift {
    _reactMaximumDrift = reactMaximumDrift;
    self.adsorber.maximumDrift = reactMaximumDrift;
}

- (void)updatePath:(MXMPath *)path wayPoints:(NSArray<MXMIndoorPoint *> *)wayPoints {
    MXMNavigationPathDTO *pathDTO = [[MXMNavigationPathDTO alloc] initWithPath:path];
    [self.adsorber updateNavigationPathDTO:pathDTO];
    [self.shortener inputSourceWithOriginalPath:path originalWayPoints:wayPoints andNavigationPathDTO:pathDTO];
}

- (void)start {
    self.isNavigation = YES;
}

- (void)stop {
    self.isNavigation = NO;
}



/** Virtual positioning function  */
- (void)loadRouteCoordinates {
    self.acoordinates = @[@[@(114.17434634578406), @(22.294415525409875), @(-1)],
                          @[@(114.17434930729888), @(22.294416210695720), @(-1)],
                          @[@(114.17434924232869), @(22.294416974054414), @(-1)],
                          @[@(114.17434916680120), @(22.294417426921136), @(-1)],
                          @[@(114.17435041568386), @(22.294417354535636), @(-1)],
                          @[@(114.17434963195260), @(22.294417192109140), @(-1)],
                          @[@(114.17434938661647), @(22.294417018136812), @(-1)],
                          @[@(114.17434867413125), @(22.294416540278082), @(-1)],
                          @[@(114.17434652959473), @(22.294415246391750), @(-1)],
                          @[@(114.17434858402919), @(22.294413772794194), @(-1)],
                          @[@(114.17434874889439), @(22.294412206425662), @(-1)],
                          @[@(114.17435178273466), @(22.294409461053476), @(-1)],
                          @[@(114.17435738436181), @(22.294407535422570), @(-1)],
                          @[@(114.17436458866787), @(22.294406001266356), @(-1)],
                          @[@(114.17437684836291), @(22.294405475441433), @(-1)],
                          @[@(114.17438084696980), @(22.294422372222350), @(-1)],
                          @[@(114.17438702344678), @(22.294431074559533), @(-1)],
                          @[@(114.17438842364939), @(22.294436109946492), @(-1)],
                          @[@(114.17438867621867), @(22.294440281834480), @(-1)],
                          @[@(114.17438988431338), @(22.294443715283762), @(-1)],
                          @[@(114.17439073800276), @(22.294446732053370), @(-1)],
                          @[@(114.17439111378143), @(22.294447901667215), @(-1)],
                          @[@(114.17439473735374), @(22.294450137946427), @(-1)],
                          @[@(114.17439768365644), @(22.294451794860066), @(-1)],
                          @[@(114.17440148792522), @(22.294452648784560), @(-1)],
                          @[@(114.17440279943494), @(22.294453185797686), @(-1)],
                          @[@(114.17440623989508), @(22.294452868053373), @(-1)],
                          @[@(114.17440826016103), @(22.294452808330590), @(-1)],
                          @[@(114.17441700868521), @(22.294451962384727), @(-1)],
                          @[@(114.17442728231494), @(22.294450002380874), @(-1)],
                          @[@(114.17443101214887), @(22.294448775025412), @(-1)],
                          @[@(114.17443056354506), @(22.294448320753794), @(-1)],
                          @[@(114.17443224914592), @(22.294447678796587), @(-1)],
                          @[@(114.17443304765084), @(22.294447152052280), @(-1)],
                          @[@(114.17444302222990), @(22.294443826248010), @(-1)],
                          @[@(114.17443417099909), @(22.294446577322528), @(-1)],
                          @[@(114.17443112445018), @(22.294447715239418), @(-1)],
                          @[@(114.17442981614010), @(22.294447795456720), @(-1)],
                          @[@(114.17442794080313), @(22.294441198079067), @(-3)],
                          @[@(114.17443196145034), @(22.294449695826483), @(-3)],
                          @[@(114.17443954138113), @(22.294455339576448), @(-3)],
                          @[@(114.17444787702613), @(22.294460665648458), @(-3)],
                          @[@(114.17453458629890), @(22.294425541644088), @(-3)],
                          @[@(114.17454564693699), @(22.294423623440185), @(-3)],
                          @[@(114.17455688579045), @(22.294415941909460), @(-3)],
                          @[@(114.17456927590140), @(22.294417999649470), @(-3)],
                          @[@(114.17458412752298), @(22.294417175195380), @(-3)],
                          @[@(114.17459799944632), @(22.294416825932450), @(-3)],
                          @[@(114.17461078088596), @(22.294419945516780), @(-3)],
                          @[@(114.17462248954179), @(22.294420587403570), @(-3)],
                          @[@(114.17463309047079), @(22.294418127143995), @(-3)],
                          @[@(114.17463896961686), @(22.294416701397427), @(-3)],
                          @[@(114.17464249596955), @(22.294409257696362), @(-3)],
                          @[@(114.17464629981662), @(22.294400222742162), @(-3)],
                          @[@(114.17464567952025), @(22.294392897703364), @(-3)],
                          @[@(114.17465449249775), @(22.294386710338433), @(-3)],
                          @[@(114.17466625258861), @(22.294383807817706), @(-3)],
                          @[@(114.17468059782652), @(22.294383292623298), @(-3)],
                          @[@(114.17469564211500), @(22.294384164189957), @(-3)],
                          @[@(114.17471041734136), @(22.294382700725365), @(-3)],
                          @[@(114.17472071841189), @(22.294382371916168), @(-3)],
                          @[@(114.17472638039702), @(22.294376320457050), @(-3)],
                          @[@(114.17474479887228), @(22.294381624391020), @(-3)],
                          @[@(114.17472820669029), @(22.294359733792156), @(-3)],
                          @[@(114.17472498520539), @(22.294361890275006), @(-3)],
                          @[@(114.17472880002379), @(22.294369441206065), @(-3)],
                          @[@(114.17473068860123), @(22.294375920679713), @(-3)],
                          @[@(114.17473462688154), @(22.294379956071648), @(-3)],
                          @[@(114.17475968749368), @(22.294388228348947), @(-3)],
                          @[@(114.17477228871743), @(22.294389636599632), @(-3)],
                          @[@(114.17478350619345), @(22.294389589144988), @(-3)],
                          @[@(114.17479564272509), @(22.294389625508373), @(-3)],
                          @[@(114.17481947043947), @(22.294379930925057), @(-3)],
                          @[@(114.17483394759321), @(22.294376076215176), @(-3)],
                          @[@(114.17484210611734), @(22.294378876243640), @(-3)],
                          @[@(114.17485004991707), @(22.294378242816860), @(-3)],
                          @[@(114.17486159400298), @(22.294380939448560), @(-3)],
                          @[@(114.17487096148457), @(22.294382307427817), @(-3)],
                          @[@(114.17488390345785), @(22.294386464132305), @(-3)],
                          @[@(114.17488782633562), @(22.294388826823514), @(-3)],
                          @[@(114.17489252458428), @(22.294389993512755), @(-3)],
                          @[@(114.17490204020400), @(22.294391648531864), @(-3)],
                          @[@(114.17491395791806), @(22.294393378169087), @(-3)],
                          @[@(114.17492204855246), @(22.294397468778950), @(-3)],
                          @[@(114.17493045738135), @(22.294399743658440), @(-3)],
                          @[@(114.17492620087916), @(22.294401117717168), @(-3)],
                          @[@(114.17493303723428), @(22.294400927152324), @(-3)],
                          @[@(114.17492774381564), @(22.294401117708766), @(-3)],
                          @[@(114.17494774381564), @(22.294451117708766), @(-3)],
                          @[@(114.17493510030337), @(22.294399544988227), @(-3)],];
}

- (void)updateLocation {
    if (self.index >= self.acoordinates.count) {
        self.index = 0;
        self.acoordinates = [self.acoordinates reverseObjectEnumerator].allObjects;
    }
    NSArray *loc = self.acoordinates[self.index];
    NSNumber *latitube = loc[1];
    NSNumber *longitube = loc[0];
    NSNumber *f = loc[2];
    CLFloor *floor = [CLFloor createFloorWihtLevel:f.integerValue];
    CLLocation *location = [[CLLocation alloc] initWithCoordinate:CLLocationCoordinate2DMake(latitube.doubleValue, longitube.doubleValue) altitude:50 horizontalAccuracy:0.0 verticalAccuracy:0.0 timestamp:[NSDate date]];
    location.myFloor = floor;
    self.index++;
    [self locationManager:self.innerLocationManager didUpdateLocations:@[location]];
}
/** Virtual positioning function */



#pragma mark - MXMRouteAdsorberDelegate
- (void)refreshTheAdsorptionLocation:(CLLocation *)location buildingID:(NSString *)buildingID floor:(NSString *)floor state:(MXMAdsorptionState)state fromActual:(CLLocation *)actual {
    // Discard obsolete data
    if (actual.timestamp.timeIntervalSince1970 < self.lastActualLocation.timestamp.timeIntervalSince1970) {
        return;
    }
    switch (state) {
        case MXMAdsorptionStateDefault:
        case MXMAdsorptionStateDrifting:
            // In general, calculate the route after interception
            [self.shortener cutFromTheLocationProjection:location buildingID:buildingID andFloor:floor];
            break;
        case MXMAdsorptionStateDriftsNumberExceeded:
            // Initiate a callback after the number of drifts exceeds the limit
        {
            if (self.onExcessiveDrift) {
                self.onExcessiveDrift(@{});
            }
        }
            break;
        default:
            break;
    }
    self.lastActualLocation = actual;

    // Provide UI to show follow
    if (self.onRefreshTheAdsorptionLocation && self.reactAdsorbable) {
        NSMutableDictionary *dic = [NSMutableDictionary dictionary];
        
        RCTMGLLocation *adsorptionLocation = [[RCTMGLLocation alloc] init];
        adsorptionLocation.location = location;
        adsorptionLocation.heading = self.lastHeading;
        
        RCTMGLLocation *actualLocation = [[RCTMGLLocation alloc] init];
        actualLocation.location = actual;
        actualLocation.heading = self.lastHeading;
        
        dic[@"adsorptionLocation"] = [adsorptionLocation toJSON];
        dic[@"actualLocation"] = [actualLocation toJSON];
        dic[@"buildingId"] = buildingID;
        dic[@"floor"] = floor;
        self.onRefreshTheAdsorptionLocation(dic);
    }
    
    // Send the locations to mapbox view.
    CLLocation *showLocation;
    if (self.reactAdsorbable) {
        showLocation = location;
    } else {
        showLocation = actual;
    }
    [self.delegate locationManager:self didUpdateLocations:@[showLocation]];
    if (self.onUpdate) {
        RCTMGLLocation *userLocation = [[RCTMGLLocation alloc] init];
        userLocation.location = showLocation;
        userLocation.heading = self.lastHeading;
        self.onUpdate([userLocation toJSON]);
    }
}



#pragma mark - MXMRouteShortenerDelegate
- (void)routeShortener:(MXMRouteShortener *)shortener redrawingNewPath:(MXMPath *)path fromInstructionIndex:(NSUInteger)index {
    
        if (path.distance < self.reactDistanceToDestination) {
            
            if (!self.onArrivalAtDestination) { return; }
            self.onArrivalAtDestination(@{});
            
        } else {
            
            if (!self.onGetNewPath || !self.reactShortenable) { return; }
            NSMutableDictionary *dic = [NSMutableDictionary dictionary];
            dic[@"newPath"] = [path yy_modelToJSONObject];
            dic[@"originalPath"] = [shortener.originalPath yy_modelToJSONObject];
            dic[@"fromInstructionIndex"] = @(index);
            dic[@"originalWayPoints"] = [shortener.originalWayPoints yy_modelToJSONObject];
            self.onGetNewPath(dic);
            
        }
    
    

}


#pragma mark - MGLLocationManager

- (CLActivityType)activityType {
    return self.innerLocationManager.activityType;
}

- (void)setActivityType:(CLActivityType)activityType {
    self.innerLocationManager.activityType = activityType;
}

- (CLDeviceOrientation)headingOrientation {
    return self.innerLocationManager.headingOrientation;
}

- (void)setHeadingOrientation:(CLDeviceOrientation)headingOrientation {
    self.innerLocationManager.headingOrientation = headingOrientation;
}

- (CLAuthorizationStatus)authorizationStatus {
    return [CLLocationManager authorizationStatus];
}

- (void)dismissHeadingCalibrationDisplay {
    [self.innerLocationManager dismissHeadingCalibrationDisplay];
}

- (void)requestAlwaysAuthorization {
    [self.innerLocationManager requestAlwaysAuthorization];
}

- (void)requestWhenInUseAuthorization {
    [self.innerLocationManager requestWhenInUseAuthorization];
}

- (void)startUpdatingHeading {
    [self.innerLocationManager startUpdatingHeading];
}

- (void)startUpdatingLocation {
//    [self.innerLocationManager startUpdatingLocation];
    /** Virtual positioning function  */
    [self loadRouteCoordinates];
    self.locationUpdateTimer = [NSTimer scheduledTimerWithTimeInterval:0.9 target:self selector:@selector(updateLocation) userInfo:nil repeats:YES];
    /** Virtual positioning function */
}

- (void)stopUpdatingHeading {
    [self.innerLocationManager stopUpdatingHeading];
}

- (void)stopUpdatingLocation {
    [self.innerLocationManager stopUpdatingLocation];
}


#pragma mark - CLLocationManagerDelegate
- (void)locationManager:(CLLocationManager *)manager didUpdateLocations:(NSArray<CLLocation *> *)locations {
    if (self.isNavigation && (self.reactAdsorbable || self.reactShortenable)) {
        [self.adsorber calculateTheAdsorptionLocationFromActual:locations.lastObject];
    } else {
        [self.delegate locationManager:self didUpdateLocations:@[locations.lastObject]];
        if (self.onUpdate) {
            RCTMGLLocation *userLocation = [[RCTMGLLocation alloc] init];
            userLocation.location = locations.lastObject;
            userLocation.heading = self.lastHeading;
            self.onUpdate([userLocation toJSON]);
        }
    }
}

- (void)locationManager:(CLLocationManager *)manager didUpdateHeading:(CLHeading *)newHeading {
    self.lastHeading = newHeading;
    [self.delegate locationManager:self didUpdateHeading:newHeading];
}

- (void)locationManager:(CLLocationManager *)manager didFailWithError:(NSError *)error {
    [self.delegate locationManager:self didFailWithError:error];
}

- (BOOL)locationManagerShouldDisplayHeadingCalibration:(CLLocationManager *)manager {
    return [self.delegate locationManagerShouldDisplayHeadingCalibration:self];
}




#pragma mark - Lazy loading
- (CLLocationManager *)innerLocationManager {
    if (!_innerLocationManager) {
        _innerLocationManager = [[CLLocationManager alloc] init];
        _innerLocationManager.delegate = self;
    }
    return _innerLocationManager;
}

- (MXMRouteAdsorber *)adsorber {
    if (!_adsorber) {
        _adsorber = [[MXMRouteAdsorber alloc] init];
        _adsorber.delegate = self;
    }
    return _adsorber;
}

- (MXMRouteShortener *)shortener {
    if (!_shortener) {
        _shortener = [[MXMRouteShortener alloc] init];
        _shortener.delegate = self;
    }
    return _shortener;
}

@end
