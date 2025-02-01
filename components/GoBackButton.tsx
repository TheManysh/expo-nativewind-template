import { Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function GoBackButton() {
	const router = useRouter();
	return (
		<Pressable
			onPress={() => router.back()}
			className='flex justify-center items-center ml-4 w-10 h-10 bg-gray-200 rounded-full'
		>
			<Feather name='arrow-left' size={20} color='black' />
		</Pressable>
	);
}
