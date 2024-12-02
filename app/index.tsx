import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
	return (
		<SafeAreaView>
			<Text className='text-blue-500'>Welcome to Expo + Nativewind!</Text>
		</SafeAreaView>
	);
}
