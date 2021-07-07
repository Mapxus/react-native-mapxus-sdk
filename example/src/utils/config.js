// eslint-disable-next-line import/no-unresolved
import envIos from '../../env.ios';
import envAndroid from '../../env.android';
import {Platform} from 'react-native';

class Config {
	get(key) {
		return Platform.OS === 'android' ? envAndroid[key] : envIos[key];
	}
}

const config = new Config();
export default config;
