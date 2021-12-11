import React, { FC } from 'react';
import { Box } from '@twilio-paste/core/box';
import { Text } from '@twilio-paste/core/text';
import { Button } from '@twilio-paste/core/button';

import EndEventButton from '../Buttons/EndEventButton/EndEventButton';
import LeaveEventButton from '../Buttons/LeaveEventButton/LeaveEventButton';
import { isMobile } from '../../utils';
import Menu from './Menu/Menu';
import useRoomState from '../../hooks/useRoomState/useRoomState';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import ToggleAudioButton from '../Buttons/ToggleAudioButton/ToggleAudioButton';
import ToggleChatButton from '../Buttons/ToggleChatButton/ToggleChatButton';
import ToggleVideoButton from '../Buttons/ToggleVideoButton/ToggleVideoButton';
import ToggleScreenShareButton from '../Buttons/ToggleScreenShareButton/ToggleScreenShareButton';
import ToggleParticipantWindowButton from '../Buttons/ToggleParticipantWindow/ToggleParticipantWindowButton';
import { useAppState } from '../../state';
import { layoutDimensions } from '../../constants';

const MenuBarFooter: FC = ({ children }) => {
  return (
    <Box
      as="footer"
      backgroundColor="colorBackgroundBody"
      element="MENU_BAR"
      bottom="0"
      left="0"
      right="0"
      height={[
        layoutDimensions.MOBILE_FOOTER_HEIGHT,
        layoutDimensions.MOBILE_FOOTER_HEIGHT,
        layoutDimensions.FOOTER_HEIGHT,
      ]}
      position="fixed"
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      width="100%"
      paddingX={['space0', 'space0', 'space70']}
      zIndex="zIndex10"
    >
      {children}
    </Box>
  );
};
const ScreenShareBanner: FC = ({ children }) => {
  return (
    <Box
      as="div"
      position="fixed"
      zIndex="zIndex20"
      bottom={layoutDimensions.FOOTER_HEIGHT}
      left="0"
      right="0"
      backgroundColor="colorBackgroundOverlay"
      justifyContent="center"
      alignItems="center"
      display="flex"
      columnGap="space70"
      padding="space40"
    >
      {children}
    </Box>
  );
};

export default function MenuBar() {
  const { isSharingScreen, toggleScreenShare } = useVideoContext();
  const roomState = useRoomState();
  const isReconnecting = roomState === 'reconnecting';
  const { room } = useVideoContext();
  const { appState } = useAppState();

  return (
    <>
      {isSharingScreen && (
        <ScreenShareBanner>
          <Text as="div" color="colorTextWeakest" fontWeight="fontWeightBold" fontSize="fontSize40">
            You are sharing your screen
          </Text>
          <Button variant="destructive_secondary" onClick={() => toggleScreenShare()}>
            Stop Sharing
          </Button>
        </ScreenShareBanner>
      )}
      <MenuBarFooter>
        <Box display={['none', 'none', 'flex']} flex={1}>
          <Text as="span">{room!.name}</Text>
        </Box>
        <Box display="flex" flexDirection="row" columnGap="space60" justifyContent="center">
          <ToggleAudioButton variant="reset" disabled={isReconnecting} />
          <ToggleVideoButton variant="reset" disabled={isReconnecting} />
          <ToggleParticipantWindowButton />
          {!isSharingScreen && !isMobile && <ToggleScreenShareButton disabled={isReconnecting} />}
          {process.env.REACT_APP_DISABLE_TWILIO_CONVERSATIONS !== 'true' && <ToggleChatButton />}
          <Menu />
        </Box>
        <Box display={['none', 'none', 'flex']} flex={1} justifyContent="flex-end">
          {appState.participantType === 'host' ? <EndEventButton /> : <LeaveEventButton />}
        </Box>
      </MenuBarFooter>
    </>
  );
}
