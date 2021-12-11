import React, { FC } from 'react';
import { ScreenShareIcon } from '@twilio-paste/icons/esm/ScreenShareIcon';
import { Box } from '@twilio-paste/core/box';
import { Button, ButtonProps } from '@twilio-paste/core/button';
import { Tooltip } from '@twilio-paste/core/tooltip';

import useScreenShareParticipant from '../../../hooks/useScreenShareParticipant/useScreenShareParticipant';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';

export const SCREEN_SHARE_TEXT = 'Share Screen';
export const STOP_SCREEN_SHARE_TEXT = 'Stop Sharing Screen';
export const SHARE_IN_PROGRESS_TEXT = 'Cannot share screen when another user is sharing';
export const SHARE_NOT_SUPPORTED_TEXT = 'Screen sharing is not supported with this browser';

const ShareScreenButton: FC<Omit<ButtonProps, 'variant'>> = ({ children, ...props }) => {
  return (
    <Button {...props} variant="reset">
      <ScreenShareIcon decorative /> {children}
    </Button>
  );
};

export default function ToggleScreenShareButton(props: { disabled?: boolean }) {
  const screenShareParticipant = useScreenShareParticipant();
  const { toggleScreenShare } = useVideoContext();
  const disableScreenShareButton = Boolean(screenShareParticipant);
  const isScreenShareSupported = navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia;
  const isDisabled = props.disabled || disableScreenShareButton || !isScreenShareSupported;

  let tooltipMessage = '';

  if (disableScreenShareButton) {
    tooltipMessage = SHARE_IN_PROGRESS_TEXT;
  }

  if (!isScreenShareSupported) {
    tooltipMessage = SHARE_NOT_SUPPORTED_TEXT;
  }

  if (tooltipMessage !== '') {
    return (
      <Tooltip text={tooltipMessage} placement="top">
        <Box as="div" display="flex">
          {/* The span element is needed because a disabled button will not emit hover events and we want to display
        a tooltip when screen sharing is disabled */}
          <ShareScreenButton onClick={toggleScreenShare} disabled={isDisabled} data-cy-share-screen>
            {SCREEN_SHARE_TEXT}
          </ShareScreenButton>
        </Box>
      </Tooltip>
    );
  }

  return (
    <ShareScreenButton onClick={toggleScreenShare} disabled={isDisabled} data-cy-share-screen>
      {SCREEN_SHARE_TEXT}
    </ShareScreenButton>
  );
}
