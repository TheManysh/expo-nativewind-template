import { View, ScrollView, Pressable } from 'react-native';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import APPINFO from '@/app-info';
import { Image } from 'expo-image';

interface Chapter {
	id: number;
	title: string;
	progress: number;
	isCompleted: boolean;
}

export default function ReadingScreen() {
	const router = useRouter();
	// Mock data
	const bookProgress = 45; // percentage
	const chapters: Chapter[] = [
		{
			id: 1,
			title: 'Chapter 1: The Beginning',
			progress: 100,
			isCompleted: true,
		},
		{
			id: 2,
			title:
				'Chapter 2: The Journey: A verrry verrrrrrrrrrrrrrry long chapterrrrrrrrrrr',
			progress: 75,
			isCompleted: false,
		},
		{
			id: 3,
			title: 'Chapter 3: The Challenge',
			progress: 0,
			isCompleted: false,
		},
		{
			id: 4,
			title: 'Chapter 4: The Discovery',
			progress: 0,
			isCompleted: false,
		},
	];

	return (
		<ScrollView className='flex-1 bg-white'>
			{/* Header with Progress */}
			<SafeAreaView edges={['top']} />
			<View className='px-4 py-3 bg-white shadow-sm'>
				<View className='flex-row justify-between items-center mb-3'>
					<Link href='/' className='p-2'>
						<FontAwesome name='arrow-left' size={24} />
					</Link>
					<Text className='text-lg font-bold'>{APPINFO.title}</Text>
					<FontAwesome name='bookmark-o' size={24} />
				</View>
				{/* Book Info */}
				<View className='flex-row items-center mt-4'>
					<View className='mr-4 w-20 h-28'>
						<Image
							source={APPINFO.image}
							style={{ width: '100%', height: '100%', borderRadius: 8 }}
						/>
					</View>
					<View className='flex-1'>
						<Text className='text-lg font-semibold'>{APPINFO.title}</Text>
						<Text className='text-gray-500'>{APPINFO.authorName}</Text>
					</View>
				</View>
				{/* Reading Stats */}
				<View className='p-4 mt-6 mb-8 bg-white rounded-xl drop-shadow-xl'>
					<Text className='mb-3 text-lg font-bold'>Reading Stats</Text>
					<View className='flex-row justify-between'>
						<View>
							<Text className='text-gray-500'>Time Spent</Text>
							<Text className='font-semibold'>2h 45m</Text>
						</View>
						<View>
							<Text className='text-gray-500'>Pages Read</Text>
							<Text className='font-semibold'>156/350</Text>
						</View>
						<View>
							<Text className='text-gray-500'>Chapters Done</Text>
							<Text className='font-semibold'>1/4</Text>
						</View>
					</View>
				</View>
				{/* Progress Bar */}
				<View className='my-4'>
					<View className='w-full h-2 bg-gray-200 rounded-full'>
						<View
							className='h-2 bg-blue-500 rounded-full'
							style={{ width: `${bookProgress}%` }}
						/>
					</View>
					<Text className='mt-1 text-sm text-right text-gray-600'>
						{bookProgress}% Complete
					</Text>
				</View>
			</View>

			{/* Chapter List */}
			<ScrollView className='flex-1 px-4 bg-gray-100'>
				<Text className='my-4 text-xl font-bold'>Chapters</Text>

				<View className='gap-y-4'>
					{chapters.map((chapter) => (
						<View
							key={chapter.id}
							className='flex-row items-center p-4 bg-white rounded-xl border border-gray-100'
						>
							{/* Checkbox */}
							<Pressable
								onPress={() => router.push('/reading')}
								className={`w-6 h-6 items-center justify-center rounded-full border ${
									chapter.isCompleted
										? 'bg-green-500 border-green-500'
										: 'border-gray-300'
								}`}
							>
								{chapter.isCompleted && (
									<FontAwesome name='check' size={12} color='white' />
								)}
							</Pressable>

							{/* Chapter Info */}
							<Pressable
								onPress={() => router.push('/reading')}
								className='flex-1 ml-3'
							>
								<Text className='text-base font-medium'>{chapter.title}</Text>
								<View className='flex-row items-center mt-2'>
									<View className='flex-1 h-1 bg-gray-100 rounded-full'>
										<View
											className='h-1 bg-blue-500 rounded-full'
											style={{ width: `${chapter.progress}%` }}
										/>
									</View>
									<Text className='ml-2 text-xs text-gray-500'>
										{chapter.progress}%
									</Text>
								</View>
							</Pressable>
						</View>
					))}
				</View>
			</ScrollView>
		</ScrollView>
	);
}
