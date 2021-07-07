import {NativeModules, Platform} from 'react-native';

const languages: any = {
	'zh-Hans': 'zh-Hans',
	'zh-Hant': 'zh-Hant',
	'en': 'en',
	'ja': 'ja',
	'ko-Kore': 'ko',
};

const deviceLanguage = Platform.OS === 'ios'
	? NativeModules.SettingsManager.settings.AppleLocale ||
	NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
	: NativeModules.I18nManager.localeIdentifier;

let tag: string = '';

if (Platform.OS === 'ios') {
	tag = deviceLanguage.split('_')[0];
} else {
	const [first, second, third] = deviceLanguage.split('_');

	if (first + third === 'zh#Hans') {
		tag = 'zh-Hans';
	} else if (first + third === 'zh#Hant') {
		tag = 'zh-Hant';
	} else {
		tag = first;
	}
}

const language: string = languages[tag] || 'en';

export default language;
