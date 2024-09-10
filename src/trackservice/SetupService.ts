import { Platform } from 'react-native';
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
} from 'react-native-track-player';

export const SetupService = async (): Promise<boolean> => {
  let isSetup = false;
  try {
    // this method will only reject if player has not been setup yet
    await TrackPlayer.getActiveTrack();
    isSetup = true;
  } catch {
    const iosOptions = { iosCategory: 'playback', iosCategoryMode: 'default', iosCategoryOptions: ['allowBluetooth', 'allowAirPlay', 'duckOthers'] }
    let options = {
      minBuffer: 200,
      maxBuffer: 600,
      playBuffer: 100,
      maxCacheSize: 1000,
    }
    if (Platform.OS === 'ios') options = { ...options, ...iosOptions }

    await TrackPlayer.setupPlayer(options).then(() => {
      console.log('ready to be used');
    });
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
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

    isSetup = true;
  } finally {
    // eslint-disable-next-line no-unsafe-finally
    return isSetup;
  }
};