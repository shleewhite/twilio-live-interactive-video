import React, { FC, useState } from 'react';
import { Box } from '@twilio-paste/core/box';
import { ChevronDownIcon } from '@twilio-paste/icons/esm/ChevronDownIcon';
import { MoreIcon } from '@twilio-paste/icons/esm/MoreIcon';
import { ProductSettingsIcon } from '@twilio-paste/icons/esm/ProductSettingsIcon';
import { InformationIcon } from '@twilio-paste/icons/esm/InformationIcon';
import { Menu as MenuContainer, MenuButton, MenuButtonProps, MenuItem, useMenuState } from '@twilio-paste/core/menu';
import { isSupported } from '@twilio/video-processors';

import AboutDialog from '../../AboutDialog/AboutDialog';
import BackgroundIcon from '../../../icons/BackgroundIcon';
import DeviceSelectionDialog from '../../DeviceSelectionDialog/DeviceSelectionDialog';
import StartRecordingIcon from '../../../icons/StartRecordingIcon';
import StopRecordingIcon from '../../../icons/StopRecordingIcon';

import { useAppState } from '../../../state';
import useChatContext from '../../../hooks/useChatContext/useChatContext';
import useIsRecording from '../../../hooks/useIsRecording/useIsRecording';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import FlipCameraIcon from '../../../icons/FlipCameraIcon';
import useFlipCameraToggle from '../../../hooks/useFlipCameraToggle/useFlipCameraToggle';

const MenuItemContainer: FC = ({ children }) => {
  return (
    <Box as="div" display="flex" alignItems="center" flexDirection="row" columnGap="space40">
      {children}
    </Box>
  );
};

export default function Menu({ buttonVariant = 'reset' }: { buttonVariant?: MenuButtonProps['variant'] }) {
  const menuState = useMenuState({ placement: 'top-end' });

  const [aboutOpen, setAboutOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const { isFetching, updateRecordingRules, roomType, appDispatch } = useAppState();
  const { setIsChatWindowOpen } = useChatContext();
  const isRecording = useIsRecording();
  const { room, setIsBackgroundSelectionOpen } = useVideoContext();

  const { flipCameraDisabled, toggleFacingMode, flipCameraSupported } = useFlipCameraToggle();

  return (
    <>
      <MenuButton
        {...menuState}
        variant={buttonVariant}
        size={buttonVariant === 'reset' ? 'reset' : 'icon_small'}
        data-cy-more-button
      >
        <MoreIcon display={['block', 'block', 'none']} decorative={false} title="more options" />
        <Box display={['none', 'none', 'flex']} columnGap="space20">
          More <ChevronDownIcon decorative />
        </Box>
      </MenuButton>
      <MenuContainer {...menuState} aria-label="More options">
        {roomType !== 'peer-to-peer' && roomType !== 'go' && (
          <MenuItem
            {...menuState}
            disabled={isFetching}
            onClick={() => {
              if (isRecording) {
                updateRecordingRules(room!.sid, [{ type: 'exclude', all: true }]);
              } else {
                updateRecordingRules(room!.sid, [{ type: 'include', all: true }]);
              }
            }}
            data-cy-recording-button
          >
            <MenuItemContainer>
              {isRecording ? <StopRecordingIcon /> : <StartRecordingIcon />}
              {isRecording ? 'Stop' : 'Start'} Recording
            </MenuItemContainer>
          </MenuItem>
        )}
        {flipCameraSupported && (
          <MenuItem {...menuState} disabled={flipCameraDisabled} onClick={toggleFacingMode}>
            <MenuItemContainer>
              <FlipCameraIcon />
              Flip Camera
            </MenuItemContainer>
          </MenuItem>
        )}

        <MenuItem {...menuState} onClick={() => setSettingsOpen(true)}>
          <MenuItemContainer>
            <ProductSettingsIcon decorative />
            Audio and Video Settings
          </MenuItemContainer>
        </MenuItem>

        {isSupported && (
          <MenuItem
            {...menuState}
            onClick={() => {
              setIsBackgroundSelectionOpen(true);
              setIsChatWindowOpen(false);
              appDispatch({
                type: 'set-is-participant-window-open',
                isParticipantWindowOpen: false,
              });
            }}
          >
            <MenuItemContainer>
              <BackgroundIcon />
              Backgrounds
            </MenuItemContainer>
          </MenuItem>
        )}

        <MenuItem {...menuState} onClick={() => setAboutOpen(true)}>
          <MenuItemContainer>
            <InformationIcon decorative />
            About
          </MenuItemContainer>
        </MenuItem>
      </MenuContainer>

      <AboutDialog
        open={aboutOpen}
        onClose={() => {
          setAboutOpen(false);
        }}
      />
      <DeviceSelectionDialog
        open={settingsOpen}
        onClose={() => {
          setSettingsOpen(false);
        }}
      />
    </>
  );
}
