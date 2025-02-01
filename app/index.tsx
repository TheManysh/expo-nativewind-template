import { View, Pressable } from 'react-native';
import { Text } from 'react-native';
import { Image } from 'expo-image';
import APPINFO from '@/app-info';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
	return (
		<View className='flex-1'>
			<Image
				source={APPINFO.image}
				style={{ width: '100%', height: '100%', position: 'absolute' }}
				blurRadius={100}
			/>
			<SafeAreaView className='flex-1'>
				<View className='flex-1 justify-between px-8 mt-16 mb-8'>
					{/* Header */}
					<View className='items-center'>
						<Image
							source={APPINFO.image}
							className='w-48 h-72 rounded-lg shadow-lg'
							style={{ width: 192, height: 288 }}
						/>
						<Text className='mt-4 text-3xl font-bold text-white'>
							{APPINFO.title}
						</Text>
						<Text className='mt-2 text-gray-300'>{APPINFO.authorName}</Text>
					</View>

					{/* Action Buttons */}
					<View className='gap-y-4'>
						<Link href={'/book'} className='p-4 bg-blue-500 rounded-full'>
							<Text className='text-lg font-semibold text-center text-white'>
								📖{'   '}Start Reading
							</Text>
						</Link>

						<Pressable className='p-4 bg-white rounded-full'>
							<Text className='text-lg font-semibold text-center'>
								🎧{'   '}Listen to Audiobook
							</Text>
						</Pressable>

						<Pressable className='p-4 bg-white rounded-full'>
							<Text className='text-lg font-semibold text-center'>
								💬{'   '}Quotes
							</Text>
						</Pressable>

						<Pressable className='p-4 bg-white rounded-full'>
							<Text className='text-lg font-semibold text-center'>
								🗒️{'   '}Highlights
							</Text>
						</Pressable>

						<Link href={'/more'} className='p-4 bg-white rounded-full'>
							<Text className='text-lg font-semibold text-center'>
								📚{'   '}More
							</Text>
						</Link>
					</View>
				</View>
			</SafeAreaView>
		</View>
	);
}
