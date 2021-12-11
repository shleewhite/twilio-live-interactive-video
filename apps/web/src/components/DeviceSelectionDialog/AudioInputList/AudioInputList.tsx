import React from 'react';
import { useUID } from '@twilio-paste/core/uid-library';
import { Box } from '@twilio-paste/core/box';
import { Paragraph } from '@twilio-paste/core/paragraph';
import { Label } from '@twilio-paste/core/label';
import { Select, Option } from '@twilio-paste/core/select';
import { LocalAudioTrack } from 'twilio-video';

import AudioLevelIndicator from '../../AudioLevelIndicator/AudioLevelIndicator';
import { SELECTED_AUDIO_INPUT_KEY } from '../../../constants';
import useDevices from '../../../hooks/useDevices/useDevices';
import useMediaStreamTrack from '../../../hooks/useMediaStreamTrack/useMediaStreamTrack';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';

export default function AudioInputList() {
  const { audioInputDevices } = useDevices();
  const { localTracks } = useVideoContext();
  const audioInputSelectId = useUID();

  const localAudioTrack = localTracks.find(track => track.kind === 'audio') as LocalAudioTrack;
  const mediaStreamTrack = useMediaStreamTrack(localAudioTrack);
  const localAudioInputDeviceId = mediaStreamTrack?.getSettings().deviceId;

  function replaceTrack(newDeviceId: string) {
    window.localStorage.setItem(SELECTED_AUDIO_INPUT_KEY, newDeviceId);
    localAudioTrack?.restart({ deviceId: { exact: newDeviceId } });
  }

  return (
    <>
      <Label htmlFor={audioInputSelectId}>Audio Input</Label>
      <Box display="flex" alignItems="center" justifyContent="space-between" columnGap="space40">
        {audioInputDevices.length > 1 ? (
          <Select
            id={audioInputSelectId}
            onChange={e => replaceTrack(e.target.value as string)}
            value={localAudioInputDeviceId || ''}
          >
            {audioInputDevices.map(device => (
              <Option value={device.deviceId} key={device.deviceId}>
                {device.label}
              </Option>
            ))}
          </Select>
        ) : (
          <Paragraph>{localAudioTrack?.mediaStreamTrack.label || 'No Local Audio'}</Paragraph>
        )}
        <AudioLevelIndicator audioTrack={localAudioTrack} color="black" />
      </Box>
    </>
  );
}
