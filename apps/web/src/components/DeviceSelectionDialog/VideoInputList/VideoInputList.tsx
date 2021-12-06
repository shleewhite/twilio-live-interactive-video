import React, { useState } from 'react';
import { Text } from '@twilio-paste/core/text';
import { Box } from '@twilio-paste/core/box';
import { AspectRatio } from '@twilio-paste/core/aspect-ratio';
import { Paragraph } from '@twilio-paste/core/paragraph';
import { Label } from '@twilio-paste/core/label';
import { Select, Option } from '@twilio-paste/core/select';
import { useUID } from '@twilio-paste/core/uid-library';
import { LocalVideoTrack } from 'twilio-video';

import { DEFAULT_VIDEO_CONSTRAINTS, SELECTED_VIDEO_INPUT_KEY } from '../../../constants';
import VideoTrack from '../../VideoTrack/VideoTrack';
import useDevices from '../../../hooks/useDevices/useDevices';
import useMediaStreamTrack from '../../../hooks/useMediaStreamTrack/useMediaStreamTrack';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';

export default function VideoInputList() {
  const { videoInputDevices } = useDevices();
  const { localTracks } = useVideoContext();
  const videoSelectInputID = useUID();

  const localVideoTrack = localTracks.find(track => track.kind === 'video') as LocalVideoTrack | undefined;
  const mediaStreamTrack = useMediaStreamTrack(localVideoTrack);
  const [storedLocalVideoDeviceId, setStoredLocalVideoDeviceId] = useState(
    window.localStorage.getItem(SELECTED_VIDEO_INPUT_KEY)
  );
  const localVideoInputDeviceId = mediaStreamTrack?.getSettings().deviceId || storedLocalVideoDeviceId;

  function replaceTrack(newDeviceId: string) {
    // Here we store the device ID in the component state. This is so we can re-render this component display
    // to display the name of the selected device when it is changed while the users camera is off.
    setStoredLocalVideoDeviceId(newDeviceId);
    window.localStorage.setItem(SELECTED_VIDEO_INPUT_KEY, newDeviceId);
    localVideoTrack?.restart({
      ...(DEFAULT_VIDEO_CONSTRAINTS as {}),
      deviceId: { exact: newDeviceId },
    });
  }

  return (
    <div>
      {localVideoTrack && (
        <Box width="300px" marginX="auto">
          <AspectRatio ratio="16:9">
            <VideoTrack isLocal track={localVideoTrack} />
          </AspectRatio>
        </Box>
      )}
      {videoInputDevices.length > 1 ? (
        <>
          <Label htmlFor={videoSelectInputID}>Video Input</Label>
          <Select
            id={videoSelectInputID}
            onChange={e => replaceTrack(e.target.value as string)}
            value={localVideoInputDeviceId || ''}
          >
            {videoInputDevices.map(device => (
              <Option value={device.deviceId} key={device.deviceId}>
                {device.label}
              </Option>
            ))}
          </Select>
        </>
      ) : (
        <>
          <Text as="div" fontWeight="fontWeightBold" marginBottom="space20">
            Video Input
          </Text>
          <Paragraph>{localVideoTrack?.mediaStreamTrack.label || 'No Local Video'}</Paragraph>
        </>
      )}
    </div>
  );
}
