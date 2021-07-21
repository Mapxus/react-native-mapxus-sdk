# @mapxus/react-native-mapxus-sdk

An official React Native library for package MapxusMap SDKs, both for Android and iOS.

## Getting started

* npm
`$ npm install @mapxus/react-native-mapxus-sdk --save`

* yarn
`$ yarn add @mapxus/react-native-mapxus-sdk`

## iOS Installation

### React-Native > `0.60.0`

If you are using autolinking feature introduced in React-Native `0.60.0`, you just need `npm install @mapxus/react-native-mapxus-sdk`, 

Add the following to your `ios/Podfile`:

```ruby
  pre_install do |installer|
      $RNMapxus.pre_install(installer)
      ... other pre install hooks
  end
```

```ruby
  post_install do |installer|
    $RNMapxus.post_install(installer)
    ... other post install hooks
  end
```

followed by `pod install` from the `ios` directory. Please also add the pre/post install cocoapods hooks.

### Using CocoaPods without autolink

To install with CocoaPods, add the following to your `Podfile`:

```ruby
  # Mapxus
  pod 'react-native-mapxus-sdk', :path => '../node_modules/@mapxus/react-native-mapxus-sdk'

```

Then run `pod install` and rebuild your project.

## Android Installation

### React-Native > `0.60.0` 
If you are using autolinking feature introduced in React-Native 0.60.0 you do not need any additional steps.

Add Kotlin support under dependencies in your  `android/build.gradle`

```groovy
...
buildscript {
//...
dependencies {
    // ... 
    classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:1.4.32")
    classpath("com.android.tools.build:gradle:4.1.3")
    // ...
				}
//...
} 
...
```

Add project under dependencies in your  `android/app/build.gradle`

```groovy
...
dependencies {
    // ... 
    implementation project(':mapxus_react-native-mapxus-sdk')
    // ...
} 
...
```

Include project, so gradle knows where to find the project

Add the following to your `android/settings.gradle`

```groovy
...
include ':mapxus_react-native-mapxus-sdk'
project(':mapxus_react-native-mapxus-sdk').projectDir = new File(rootProject.projectDir, '../node_modules/@mapxus/react-native-mapxus-sdk/android/rctmapxus')
...
```

Also you can overwrite Mapxus dependencies within your `android/app/build.gradle`

```groovy
dependencies {
    // ... 
    implementation("com.mapxus.map:mapxusmap:4.2.3")
    implementation ("com.mapxus.positioning:positioning:2.0.9")    
    // ...
    }
```

Don't forget add mavenCentral repo to your `android/build.gradle`

```groovy
...
allprojects {
    repositories {
    ...
        mavenCentral()
    ...
    				}
       	 }
...
```

Check the current version of the SDK [here](https://map-service.mapxus.com/dpw/digitalMapAndroid).

## Usage
```javascript
import MapxusSdk from '@mapxus/react-native-mapxus-sdk';

// TODO: What to do with the module?
MapxusSdk;
```

For more usage, please click [this link](https://map-service.mapxus.com/dpw/digitalMapRN).