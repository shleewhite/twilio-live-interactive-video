import React, { useCallback, useRef } from 'react';

import { Button, ButtonProps } from '@twilio-paste/core/Button';
import { VideoOffIcon } from '@twilio-paste/icons/esm/VideoOffIcon';
import { VideoOnIcon } from '@twilio-paste/icons/esm/VideoOnIcon';

import useDevices from '../../../hooks/useDevices/useDevices';
import useLocalVideoToggle from '../../../hooks/useLocalVideoToggle/useLocalVideoToggle';

export default function ToggleVideoButton({
  disabled,
  variant = 'secondary',
}: {
  disabled?: boolean;
  variant?: ButtonProps['variant'];
}) {
  const [isVideoEnabled, toggleVideoEnabled] = useLocalVideoToggle();
  const lastClickTimeRef = useRef(0);
  const { hasVideoInputDevices } = useDevices();

  const toggleVideo = useCallback(() => {
    if (Date.now() - lastClickTimeRef.current > 500) {
      lastClickTimeRef.current = Date.now();
      toggleVideoEnabled();
    }
  }, [toggleVideoEnabled]);

  return (
    <Button
      element="TOGGLE_VIDEO_BUTTON"
      variant={variant}
      fullWidth
      onClick={toggleVideo}
      disabled={!hasVideoInputDevices || disabled}
    >
      {isVideoEnabled ? <VideoOnIcon decorative /> : <VideoOffIcon decorative />}
      {!hasVideoInputDevices ? 'No Video' : isVideoEnabled ? 'Stop Video' : 'Start Video'}
    </Button>
  );
}
