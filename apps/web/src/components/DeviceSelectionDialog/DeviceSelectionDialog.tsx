import React from 'react';
import { Button } from '@twilio-paste/core/button';
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalFooterActions, ModalHeading } from '@twilio-paste/core/modal';
import { Heading } from '@twilio-paste/core/heading';
import { Separator } from '@twilio-paste/core/separator';
import { Stack } from '@twilio-paste/core/stack';
import { useUID } from '@twilio-paste/core/uid-library';

import AudioInputList from './AudioInputList/AudioInputList';
import AudioOutputList from './AudioOutputList/AudioOutputList';
import VideoInputList from './VideoInputList/VideoInputList';

export default function DeviceSelectionDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const modalId = useUID();

  return (
    <Modal ariaLabelledby={modalId} isOpen={open} onDismiss={onClose} size="default">
      <ModalHeader id={modalId}>
        <ModalHeading>Audio and Video Settings</ModalHeading>
      </ModalHeader>
      <ModalBody>
        <Heading as="h2" variant="heading30">
          Video
        </Heading>
        <VideoInputList />
        <Separator orientation="horizontal" verticalSpacing="space70" />
        <Heading as="h2" variant="heading30">
          Audio
        </Heading>
        <Stack orientation="vertical" spacing="space70">
          <AudioInputList />
          <AudioOutputList />
        </Stack>
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
