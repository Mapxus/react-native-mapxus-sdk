import React from 'react';
import PropTypes from 'prop-types';
import {isAndroid} from '../utils';
//import headingIconAndroid from '../assets/heading.android.png';
import headingIconIos from '../assets/heading.ios.png';

import SymbolLayer from './SymbolLayer';

const style = {
	iconImage: headingIconIos,
	iconAllowOverlap: true,
	iconPitchAlignment: 'map',
	iconRotationAlignment: 'map',
};

const HeadingIndicator = (heading) => (
	<SymbolLayer
		key="mapboxUserLocationHeadingIndicator"
		id="mapboxUserLocationHeadingIndicator"
		belowLayerID="mapboxUserLocationWhiteCircle"
		style={{
			iconRotate: heading,
			...style,
		}}
	/>
);

HeadingIndicator.propTypes = {
	heading: PropTypes.number,
};

export default HeadingIndicator;
