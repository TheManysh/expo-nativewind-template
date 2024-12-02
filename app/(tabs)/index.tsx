import { Link } from 'expo-router';
import { Button } from 'react-native';

import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
	return (
		<SafeAreaView>
			<Text className='text-blue-500'>Welcome to Expo + Nativewind!</Text>
			<Link href={'/'}>Home</Link>
		</SafeAreaView>
	);
}
