import {NativeModules, Platform} from 'react-native';
import {Theme} from '@ant-design/react-native/lib/style';

const {StatusBarManager} = NativeModules;

async function getStatusBarHeight(): Promise<number> {
	return new Promise(resolve => {
		if (Platform.OS === 'ios') {
			const setHeight: any = (theme: Theme) => resolve(theme['height']);
			StatusBarManager.getHeight(setHeight);
		}
	});
}

export default getStatusBarHeight;
