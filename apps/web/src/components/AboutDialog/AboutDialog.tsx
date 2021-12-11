import React, { PropsWithChildren } from 'react';
import { Button } from '@twilio-paste/core/button';
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalFooterActions, ModalHeading } from '@twilio-paste/core/modal';
import { useUID } from '@twilio-paste/core/uid-library';

import {
  DescriptionList,
  DescriptionTitle,
  DescriptionDetail,
  DescriptionItem,
} from '../DescriptionList/DescriptionList';
import { version as appVersion } from '../../../package.json';
import Video from 'twilio-video';
import { useAppState } from '../../state';

interface AboutDialogProps {
  open: boolean;
  onClose(): void;
}

function AboutDialog({ open, onClose }: PropsWithChildren<AboutDialogProps>) {
  const { roomType } = useAppState();
  const modalID = useUID();

  return (
    <Modal isOpen={open} onDismiss={onClose} ariaLabelledby={modalID} size="default">
      <ModalHeader id={modalID}>
        <ModalHeading>About</ModalHeading>
      </ModalHeader>
      <ModalBody>
        <DescriptionList>
          <DescriptionItem>
            <DescriptionTitle>Browser supported:</DescriptionTitle>
            <DescriptionDetail>{String(Video.isSupported)}</DescriptionDetail>
          </DescriptionItem>
          <DescriptionItem>
            <DescriptionTitle>SDK Version:</DescriptionTitle>
            <DescriptionDetail>{Video.version}</DescriptionDetail>
          </DescriptionItem>
          <DescriptionItem>
            <DescriptionTitle>App Version:</DescriptionTitle>
            <DescriptionDetail>{appVersion}</DescriptionDetail>
          </DescriptionItem>
          <DescriptionItem>
            <DescriptionTitle>Deployed Tag:</DescriptionTitle>
            <DescriptionDetail>{process.env.REACT_APP_GIT_TAG || 'N/A'}</DescriptionDetail>
          </DescriptionItem>
          <DescriptionItem>
            <DescriptionTitle>Deployed Commit Hash: </DescriptionTitle>
            <DescriptionDetail>{process.env.REACT_APP_GIT_COMMIT || 'N/A'}</DescriptionDetail>
          </DescriptionItem>
          {roomType && (
            <DescriptionItem>
              <DescriptionTitle>Room Type:</DescriptionTitle>
              <DescriptionDetail>{roomType}</DescriptionDetail>
            </DescriptionItem>
          )}
        </DescriptionList>
      </ModalBody>
      <ModalFooter>
        <ModalFooterActions>
          <Button onClick={onClose} variant="primary">
            OK
          </Button>
        </ModalFooterActions>
      </ModalFooter>
    </Modal>
  );
}

export default AboutDialog;
