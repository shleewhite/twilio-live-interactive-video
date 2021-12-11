import React from 'react';
import { useUID } from '@twilio-paste/core/uid-library';
import { Text } from '@twilio-paste/core/text';
import { Paragraph } from '@twilio-paste/core/paragraph';
import { Label } from '@twilio-paste/core/label';
import { Select, Option } from '@twilio-paste/core/select';
import { useAppState } from '../../../state';
import useDevices from '../../../hooks/useDevices/useDevices';

export default function AudioOutputList() {
  const { audioOutputDevices } = useDevices();
  const { activeSinkId, setActiveSinkId } = useAppState();
  const audioOutputId = useUID();

  const activeOutputLabel = audioOutputDevices.find(device => device.deviceId === activeSinkId)?.label;

  if (audioOutputDevices.length > 1) {
    return (
      <>
        <Label htmlFor={audioOutputId}>Audio Output</Label>
        <Select id={audioOutputId} onChange={e => setActiveSinkId(e.target.value as string)} value={activeSinkId}>
          {audioOutputDevices.map(device => (
            <Option value={device.deviceId} key={device.deviceId}>
              {device.label}
            </Option>
          ))}
        </Select>
      </>
    );
  }
  return (
    <>
      <Text as="div" fontWeight="fontWeightBold">
        Audio Output
      </Text>
      <Paragraph>{activeOutputLabel || 'System Default Audio Output'}</Paragraph>
    </>
  );
}
