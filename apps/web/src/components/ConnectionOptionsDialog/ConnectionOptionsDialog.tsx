import React, { useCallback } from 'react';
import { Button } from '@twilio-paste/core/button';
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalFooterActions, ModalHeading } from '@twilio-paste/core/modal';
import { Grid, Column } from '@twilio-paste/core/grid';
import { useUID } from '@twilio-paste/core/uid-library';
import { Stack } from '@twilio-paste/core/stack';
import { Paragraph } from '@twilio-paste/core/paragraph';
import { Label } from '@twilio-paste/core/label';
import { Input } from '@twilio-paste/core/input';
import { Select, Option } from '@twilio-paste/core/select';
import { inputLabels, Settings } from '../../state/settings/settingsReducer';
import { useAppState } from '../../state';
import useRoomState from '../../hooks/useRoomState/useRoomState';

const withDefault = (val?: string) => (typeof val === 'undefined' ? 'default' : val);

export default function ConnectionOptionsDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { settings, dispatchSetting } = useAppState();
  const roomState = useRoomState();
  const modalId = useUID();
  const isDisabled = roomState !== 'disconnected';

  const handleChange = useCallback(
    (e: React.ChangeEvent<{ value: unknown; name?: string }>) => {
      dispatchSetting({ name: e.target.name as keyof Settings, value: e.target.value as string });
    },
    [dispatchSetting]
  );

  const handleNumberChange = useCallback(
    (e: React.ChangeEvent<{ value: unknown; name?: string }>) => {
      if (!/[^\d]/.test(e.target.value as string)) handleChange(e);
    },
    [handleChange]
  );

  return (
    <Modal ariaLabelledby={modalId} isOpen={open} onDismiss={onClose} size="default">
      <ModalHeader id={modalId}>
        <ModalHeading>Connection Settings</ModalHeading>
      </ModalHeader>
      <ModalBody>
        <Grid gutter="space40">
          <Column span={12}>
            <Paragraph hidden={!isDisabled}>These settings cannot be changed when connected to a room.</Paragraph>
          </Column>

          <Column span={[12, 12, 6]}>
            <Stack orientation="vertical" spacing="space70">
              <>
                <Label htmlFor={inputLabels.dominantSpeakerPriority}>Dominant Speaker Priority:</Label>
                <Select
                  disabled={isDisabled}
                  name={inputLabels.dominantSpeakerPriority}
                  id={inputLabels.dominantSpeakerPriority}
                  value={withDefault(settings.dominantSpeakerPriority)}
                  onChange={handleChange}
                >
                  <Option value="low">Low</Option>
                  <Option value="standard">Standard</Option>
                  <Option value="high">High</Option>
                  <Option value="default">Server Default</Option>
                </Select>
              </>

              <>
                <Label htmlFor={inputLabels.trackSwitchOffMode}>Track Switch Off Mode:</Label>
                <Select
                  disabled={isDisabled}
                  name={inputLabels.trackSwitchOffMode}
                  id={inputLabels.trackSwitchOffMode}
                  value={withDefault(settings.trackSwitchOffMode)}
                  onChange={handleChange}
                >
                  <Option value="predicted">Predicted</Option>
                  <Option value="detected">Detected</Option>
                  <Option value="disabled">Disabled</Option>
                  <Option value="default">Server Default</Option>
                </Select>
              </>

              <>
                <Label htmlFor={inputLabels.bandwidthProfileMode}>Mode:</Label>
                <Select
                  disabled={isDisabled}
                  name={inputLabels.bandwidthProfileMode}
                  id={inputLabels.bandwidthProfileMode}
                  value={withDefault(settings.bandwidthProfileMode)}
                  onChange={handleChange}
                >
                  <Option value="grid">Grid</Option>
                  <Option value="collaboration">Collaboration</Option>
                  <Option value="presentation">Presentation</Option>
                  <Option value="default">Server Default</Option>
                </Select>
              </>
            </Stack>
          </Column>
          <Column span={[12, 12, 6]}>
            <Stack orientation="vertical" spacing="space70">
              <>
                <Label htmlFor={inputLabels.clientTrackSwitchOffControl}>Client Track Switch Off Control:</Label>
                <Select
                  disabled={isDisabled}
                  name={inputLabels.clientTrackSwitchOffControl}
                  id={inputLabels.clientTrackSwitchOffControl}
                  value={withDefault(settings.clientTrackSwitchOffControl)}
                  onChange={handleChange}
                >
                  <Option value="auto">Auto</Option>
                  <Option value="manual">Manual</Option>
                  <Option value="default">Default</Option>
                </Select>
              </>

              <>
                <Label htmlFor={inputLabels.contentPreferencesMode}>Content Preferences Mode:</Label>
                <Select
                  disabled={isDisabled}
                  name={inputLabels.contentPreferencesMode}
                  id={inputLabels.contentPreferencesMode}
                  value={withDefault(settings.contentPreferencesMode)}
                  onChange={handleChange}
                >
                  <Option value="auto">Auto</Option>
                  <Option value="manual">Manual</Option>
                  <Option value="default">Default</Option>
                </Select>
              </>

              <>
                <Label htmlFor={inputLabels.maxAudioBitrate}>Max Audio Bitrate:</Label>
                <Input
                  disabled={isDisabled}
                  type="text"
                  id={inputLabels.maxAudioBitrate}
                  placeholder="Leave blank for no limit"
                  name={inputLabels.maxAudioBitrate}
                  value={withDefault(settings.maxAudioBitrate)}
                  onChange={handleNumberChange}
                />
              </>
            </Stack>
          </Column>
        </Grid>
      </ModalBody>
      <ModalFooter>
        <ModalFooterActions>
          <Button variant="primary" onClick={onClose}>
            Done
          </Button>
        </ModalFooterActions>
      </ModalFooter>
    </Modal>
  );
}
