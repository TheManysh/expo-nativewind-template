import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import {
	ReaderProvider,
	Reader,
	useReader,
	Themes,
	Annotation,
} from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/expo-file-system';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '@/components/epub/Header';
import { Footer } from '@/components/epub/Footer';
import {
	MAX_FONT_SIZE,
	MIN_FONT_SIZE,
	availableFonts,
	themes,
} from '@/components/epub/utils';
import { BookmarksList } from '@/components/epub/Bookmarks/BookmarksList';
import { SearchList } from '@/components/epub/Search/SearchList';
import { TableOfContents } from '@/components/epub/TableOfContents/TableOfContents';
import { COLORS } from '@/components/epub/Annotations/AnnotationForm';
import { AnnotationsList } from '@/components/epub/Annotations/AnnotationList';
import * as FileSystem from 'expo-file-system';
import { View, Text } from 'react-native';
import { useEffect } from 'react';

function Component() {
	const { width, height } = useWindowDimensions();
	const insets = useSafeAreaInsets();

	const {
		theme,
		annotations,
		changeFontSize,
		changeFontFamily,
		changeTheme,
		goToLocation,
		addAnnotation,
		removeAnnotation,
	} = useReader();

	const bookmarksListRef = React.useRef<BottomSheetModal>(null);
	const searchListRef = React.useRef<BottomSheetModal>(null);
	const tableOfContentsRef = React.useRef<BottomSheetModal>(null);
	const annotationsListRef = React.useRef<BottomSheetModal>(null);

	const [isFullScreen, setIsFullScreen] = useState(false);
	const [currentFontSize, setCurrentFontSize] = useState(14);
	const [currentFontFamily, setCurrentFontFamily] = useState(availableFonts[0]);
	const [tempMark, setTempMark] = React.useState<Annotation | null>(null);
	const [selection, setSelection] = React.useState<{
		cfiRange: string;
		text: string;
	} | null>(null);
	const [selectedAnnotation, setSelectedAnnotation] = React.useState<
		Annotation | undefined
	>(undefined);

	const increaseFontSize = () => {
		if (currentFontSize < MAX_FONT_SIZE) {
			setCurrentFontSize(currentFontSize + 1);
			changeFontSize(`${currentFontSize + 1}px`);
		}
	};

	const decreaseFontSize = () => {
		if (currentFontSize > MIN_FONT_SIZE) {
			setCurrentFontSize(currentFontSize - 1);
			changeFontSize(`${currentFontSize - 1}px`);
		}
	};

	const switchTheme = () => {
		const index = Object.values(themes).indexOf(theme);
		const nextTheme =
			Object.values(themes)[(index + 1) % Object.values(themes).length];

		changeTheme(nextTheme);
	};

	const switchFontFamily = () => {
		const index = availableFonts.indexOf(currentFontFamily);
		const nextFontFamily = availableFonts[(index + 1) % availableFonts.length];

		setCurrentFontFamily(nextFontFamily);
		changeFontFamily(nextFontFamily);
	};

	// store book in local storage
	const [bookUri, setBookUri] = useState<string | null>(null);
	const [isDownloading, setIsDownloading] = useState(false);
	const [downloadProgress, setDownloadProgress] = useState(0);

	const BOOK_URL =
		'https://res.cloudinary.com/dslffheh7/raw/upload/v1/bookism-epub/the-48-laws-of-power.epub';
	const LOCAL_URI = `${FileSystem.documentDirectory}the-48-laws-of-power.epub`;

	useEffect(() => {
		async function downloadAndSaveBook() {
			try {
				// Check if file already exists
				const fileInfo = await FileSystem.getInfoAsync(LOCAL_URI);
				if (fileInfo.exists) {
					console.log('Book already downloaded:', LOCAL_URI);
					setBookUri(LOCAL_URI);
					return;
				}

				setIsDownloading(true);

				// Download file
				const downloadResumable = FileSystem.createDownloadResumable(
					BOOK_URL,
					LOCAL_URI,
					{},
					(downloadProgress) => {
						const progress =
							downloadProgress.totalBytesWritten /
							downloadProgress.totalBytesExpectedToWrite;
						setDownloadProgress(progress * 100);
					}
				);

				const result = await downloadResumable.downloadAsync();
				if (result) {
					console.log('Downloaded book:', result.uri);
					setBookUri(result.uri);
				}
			} catch (error) {
				console.error('Error downloading book:', error);
			} finally {
				setIsDownloading(false);
			}
		}

		downloadAndSaveBook();
	}, []);

	return (
		<GestureHandlerRootView
			style={{
				flex: 1,
				paddingTop: insets.top,
				paddingBottom: insets.bottom,
				paddingLeft: insets.left,
				paddingRight: insets.right,
				backgroundColor: theme.body.background,
			}}
		>
			{!isFullScreen && (
				<Header
					currentFontSize={currentFontSize}
					increaseFontSize={increaseFontSize}
					decreaseFontSize={decreaseFontSize}
					switchTheme={switchTheme}
					switchFontFamily={switchFontFamily}
					onPressSearch={() => searchListRef.current?.present()}
					onOpenBookmarksList={() => bookmarksListRef.current?.present()}
					onOpenTableOfContents={() => tableOfContentsRef.current?.present()}
					onOpenAnnotationsList={() => annotationsListRef.current?.present()}
				/>
			)}
			{isDownloading ? (
				<View className='flex-1 justify-center items-center'>
					<Text>Downloading book... {downloadProgress.toFixed(0)}%</Text>
				</View>
			) : (
				<Reader
					src={bookUri || ''}
					width={width}
					height={!isFullScreen ? height * 0.75 : height}
					// @ts-ignore
					fileSystem={useFileSystem}
					defaultTheme={Themes.LIGHT}
					waitForLocationsReady
					initialLocation='introduction_001.xhtml'
					initialAnnotations={[
						// Chapter 1
						{
							cfiRange: 'epubcfi(/6/10!/4/2/4,/1:0,/1:319)',
							data: {},
							sectionIndex: 4,
							styles: { color: '#23CE6B' },
							cfiRangeText:
								'The pale Usher—threadbare in coat, heart, body, and brain; I see him now. He was ever dusting his old lexicons and grammars, with a queer handkerchief, mockingly embellished with all the gay flags of all the known nations of the world. He loved to dust his old grammars; it somehow mildly reminded him of his mortality.',
							type: 'highlight',
						},
						// Chapter 5
						{
							cfiRange: 'epubcfi(/6/22!/4/2/4,/1:80,/1:88)',
							data: {},
							sectionIndex: 3,
							styles: { color: '#CBA135' },
							cfiRangeText: 'landlord',
							type: 'highlight',
						},
					]}
					onAddAnnotation={(annotation) => {
						if (annotation.type === 'highlight' && annotation.data?.isTemp) {
							setTempMark(annotation);
						}
					}}
					onPressAnnotation={(annotation) => {
						setSelectedAnnotation(annotation);
						annotationsListRef.current?.present();
					}}
					menuItems={[
						{
							label: '🟡',
							action: (cfiRange) => {
								addAnnotation('highlight', cfiRange, undefined, {
									color: COLORS[2],
								});
								return true;
							},
						},
						{
							label: '🔴',
							action: (cfiRange) => {
								addAnnotation('highlight', cfiRange, undefined, {
									color: COLORS[0],
								});
								return true;
							},
						},
						{
							label: '🟢',
							action: (cfiRange) => {
								addAnnotation('highlight', cfiRange, undefined, {
									color: COLORS[3],
								});
								return true;
							},
						},
						{
							label: 'Add Note',
							action: (cfiRange, text) => {
								setSelection({ cfiRange, text });
								addAnnotation('highlight', cfiRange, { isTemp: true });
								annotationsListRef.current?.present();
								return true;
							},
						},
					]}
					onDoublePress={() => setIsFullScreen((oldState) => !oldState)}
				/>
			)}
			<BookmarksList
				ref={bookmarksListRef}
				onClose={() => bookmarksListRef.current?.dismiss()}
			/>

			<SearchList
				ref={searchListRef}
				onClose={() => searchListRef.current?.dismiss()}
			/>

			<TableOfContents
				ref={tableOfContentsRef}
				onClose={() => tableOfContentsRef.current?.dismiss()}
				onPressSection={(selectedSection) => {
					console.log('selectedSection', selectedSection);
					goToLocation(selectedSection.href);
					tableOfContentsRef.current?.dismiss();
				}}
			/>

			<AnnotationsList
				ref={annotationsListRef}
				selection={selection}
				selectedAnnotation={selectedAnnotation}
				annotations={annotations}
				onClose={() => {
					setTempMark(null);
					setSelection(null);
					setSelectedAnnotation(undefined);
					if (tempMark) removeAnnotation(tempMark);
					annotationsListRef.current?.dismiss();
				}}
			/>

			{!isFullScreen && <Footer />}
		</GestureHandlerRootView>
	);
}

export default function ReadingPage() {
	return (
		<ReaderProvider>
			<Component />
		</ReaderProvider>
	);
}
