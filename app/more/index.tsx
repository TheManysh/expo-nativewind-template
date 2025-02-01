import { View, TextInput, ScrollView, Pressable } from 'react-native';
import { Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import GoBackButton from '@/components/GoBackButton';

export default function MoreScreen() {
	const [rating, setRating] = useState(0);
	const [feedback, setFeedback] = useState('');
	const router = useRouter();

	const otherApps = [
		{ id: 1, name: 'Book Tracker', icon: 'book', downloads: '10K+' },
		{ id: 2, name: 'Daily Quotes', icon: 'quote-left', downloads: '5K+' },
		{ id: 3, name: 'Audio Stories', icon: 'headphones', downloads: '8K+' },
	];

	return (
		<SafeAreaView className='flex-1 bg-gray-50'>
			<GoBackButton />
			<ScrollView className='flex-1 px-4'>
				{/* Rating Section */}
				<View className='p-6 mt-4 bg-white rounded-xl shadow-sm'>
					<Text className='mb-4 text-xl font-bold text-center'>
						Rate Your Experience
					</Text>

					<View className='flex-row justify-center mb-4 space-x-2'>
						{[1, 2, 3, 4, 5].map((star) => (
							<Pressable
								key={star}
								className='mr-4'
								onPress={() => setRating(star)}
							>
								<FontAwesome
									name={star <= rating ? 'star' : 'star-o'}
									size={32}
									color={star <= rating ? '#FFD700' : '#BEC5D1'}
								/>
							</Pressable>
						))}
					</View>

					<TextInput
						className='p-4 bg-gray-100 rounded-lg'
						placeholder='Tell us what you think...'
						multiline
						numberOfLines={4}
						value={feedback}
						onChangeText={setFeedback}
					/>

					<Link href={'/'} className='p-4 mt-4 bg-blue-500 rounded-full'>
						<Text className='font-semibold text-center text-white'>
							Submit Feedback
						</Text>
					</Link>
				</View>

				{/* More Apps Section */}
				<View className='mt-6'>
					<Text className='mb-4 text-xl font-bold'>More Apps by Us</Text>

					{otherApps.map((app) => (
						<View
							key={app.id}
							className='flex-row items-center p-4 mb-3 bg-white rounded-xl shadow-sm'
						>
							<View className='p-3 bg-blue-100 rounded-full'>
								{/* @ts-ignore */}
								<FontAwesome name={app.icon} size={24} color='#3B82F6' />
							</View>
							<View className='flex-1 ml-4'>
								<Text className='text-lg font-semibold'>{app.name}</Text>
								<Text className='text-gray-500'>{app.downloads} downloads</Text>
							</View>
							<FontAwesome
								name='chevron-right'
								size={20}
								color='#BEC5D1'
								className='ml-auto'
							/>
						</View>
					))}
				</View>

				{/* Social Share */}
				<View className='flex-row gap-4 justify-center my-8'>
					<Link href={'https://twitter.com'}>
						<FontAwesome name='twitter' size={28} color='#1DA1F2' />
					</Link>
					<Link href={'https://facebook.com'}>
						<FontAwesome name='facebook' size={28} color='#4267B2' />
					</Link>
					<Link href={'https://instagram.com'}>
						<FontAwesome name='instagram' size={28} color='#C13584' />
					</Link>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
