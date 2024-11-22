import { useFocusEffect } from "@react-navigation/native"
import { useCallback, useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAudioFiles } from "../../Redux/actions/audio-action"
import Orientation from "react-native-orientation-locker"
import { Alert, AppState, BackHandler } from "react-native"
import { navigate } from "../../navigation/navigation_service"
import TrackPlayer, { AppKilledPlaybackBehavior, Capability } from "react-native-track-player"
import { postAudioState } from "../../Redux/action"

export default ({ id }) => {
    const dispatch = useDispatch()

    const { login, audio } = useSelector(state => state.user)
    const { loading, audio_files } = useSelector(state => state.audio)

    const [refreshing, setRefreshing] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false);
    const [title, setTitle] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const appState = useRef(AppState.currentState);


    const setupAudio = async () => {
        const buffer = 0.5;
        await TrackPlayer.updateOptions({
            android: {
                appKilledPlaybackBehavior:
                    AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
            },
            playBuffer: buffer,
            minBuffer: buffer * 2,
            maxBuffer: buffer * 2,
            waitForBuffer: true,

            // This flag is now deprecated. Please use the above to define playback mode.
            // stoppingAppPausesPlayback: true,
            capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                Capability.SeekTo,
            ],
            compactCapabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
            ],
            progressUpdateEventInterval: 2,
        });
    };

    const endAudio = () => {
        dispatch(postAudioState(login?.data?.id, 'end'))
    };

    const handleBackButton = () => {
        endAudio();
        return false;
    };

    const handleAppStateChange = (nextAppState) => {
        if (nextAppState === 'background') {
            dispatch(postAudioState(login?.data?.id, 'kill'))
        }
        appState.current = nextAppState;
    };

    const getAudioData = () => {
        const apiData = {
            studentId: login?.data?.id,
            id,
        }
        dispatch(getAudioFiles(apiData))
    }

    useFocusEffect(useCallback(() => { Orientation.lockToPortrait() }, []))

    useEffect(() => {
        setupAudio()
        getAudioData()
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);

        return () => {
            backHandler.remove();
            appStateSubscription.remove();
            TrackPlayer.reset();
        };
    }, []);

    const onPlayButton = async () => {
        if (isPlaying) {
            await TrackPlayer.pause();
            dispatch(postAudioState(login?.data?.id, 'pause'))
        } else {
            await TrackPlayer.play();
            dispatch(postAudioState(login?.data?.id, 'start'))
        }
        setIsPlaying(!isPlaying);
    };

    const onBackwardButton = async () => {
        const progress = await TrackPlayer.getProgress();
        await TrackPlayer.seekTo(progress.position > 5 ? progress.position - 5 : 0);
    };

    const onForwardButton = async () => {
        const progress = await TrackPlayer.getProgress();
        await TrackPlayer.seekTo(progress.position + 5);
    };

    const getTitle = (id) => {
        const track = audio_files?.find((item) => item.id === id);
        setTitle(track ? track.title : '');
    };

    const setupPlayer = async (index) => {
        let updatedArray = audio_files?.map(item => ({
            ...item,
            url: item.url.replace("/audio/", "/audios/"),
        }));

        await TrackPlayer.reset();
        await TrackPlayer.seekTo(0);
        let tempArray = updatedArray?.slice(index);
        await TrackPlayer.add(tempArray);
        await TrackPlayer.play();

        TrackPlayer.addEventListener('playback-active-track-changed', (event) => {
            getTitle(event?.track?.id);
        });

        TrackPlayer.addEventListener('playback-queue-ended', async () => {
            await TrackPlayer.seekTo(0);
            await TrackPlayer.pause();
            setIsPlaying(false);
            dispatch(postAudioState(login?.data?.id, 'end'))
        });

        TrackPlayer.addEventListener('remote-play', async () => {
            await TrackPlayer.play();
            setIsPlaying(true);
            dispatch(postAudioState(login?.data?.id, 'start'))
        });

        TrackPlayer.addEventListener('remote-pause', async () => {
            await TrackPlayer.pause();
            setIsPlaying(false);
            dispatch(postAudioState(login?.data?.id, 'end'))
        });
    };

    const onRefresh = async () => {
        setRefreshing(true)
        await getAudioData()
        setRefreshing(false)
    }

    const onPressTab = (index) => {
        setupPlayer(index);
        setCurrentIndex(index)
        setIsPlaying(true)
        TrackPlayer.getPlayWhenReady();
        dispatch(postAudioState(login?.data?.id, 'start'))
    }


    return {
        loading,
        audio_files,
        refreshing,
        onRefresh,
        onPressTab,
        title,
        onForwardButton,
        onBackwardButton,
        onPlayButton,
        isPlaying,
        setupPlayer

    }

}