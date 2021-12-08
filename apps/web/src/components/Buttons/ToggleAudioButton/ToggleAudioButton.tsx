import React from 'react';

import { Button, ButtonProps } from '@twilio-paste/core/button';
import { MicrophoneOnIcon } from '@twilio-paste/icons/esm/MicrophoneOnIcon';
import { MicrophoneOffIcon } from '@twilio-paste/icons/esm/MicrophoneOffIcon';

import useLocalAudioToggle from '../../../hooks/useLocalAudioToggle/useLocalAudioToggle';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';

export default function ToggleAudioButton({
  disabled,
  variant = 'secondary',
}: {
  disabled?: boolean;
  variant?: ButtonProps['variant'];
}) {
  const [isAudioEnabled, toggleAudioEnabled] = useLocalAudioToggle();
  const { localTracks } = useVideoContext();
  const hasAudioTrack = localTracks.some(track => track.kind === 'audio');

  return (
    <Button
      variant={variant}
      element="TOGGLE_AUDIO_BUTTON"
      fullWidth
      onClick={toggleAudioEnabled}
      disabled={!hasAudioTrack || disabled}
      data-cy-audio-toggle
    >
      {isAudioEnabled ? <MicrophoneOnIcon decorative /> : <MicrophoneOffIcon decorative />}
      {!hasAudioTrack ? 'No Audio' : isAudioEnabled ? 'Mute' : 'Unmute'}
    </Button>
  );
}
