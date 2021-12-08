import React from 'react';

import { Heading } from '@twilio-paste/core/heading';
import { Text } from '@twilio-paste/core/text';
import { Button } from '@twilio-paste/core/button';
import { Box } from '@twilio-paste/core/box';

import { ArrowBackIcon } from '@twilio-paste/icons/esm/ArrowBackIcon';
import { ArrowForwardIcon } from '@twilio-paste/icons/esm/ArrowForwardIcon';

import { appActionTypes, ActiveScreen, appStateTypes } from '../../../state/appState/appReducer';
import CreateEventIcon from '../../../icons/CreateEventIcon';
import JoinEventIcon from '../../../icons/JoinEventIcon';

interface CreateOrJoinScreenProps {
  state: appStateTypes;
  dispatch: React.Dispatch<appActionTypes>;
}

export const CalloutButton: React.FC<{ children: React.ReactNode; onClick: () => void }> = ({ children, onClick }) => (
  <Box
    element="CALLOUT_BUTTON"
    as="button"
    onClick={onClick}
    height={['auto', 'size10']}
    width="100%"
    display="flex"
    flexDirection={['column', 'row']}
    alignItems="center"
    columnGap="space50"
    rowGap="space50"
    backgroundColor="colorBackgroundBody"
    border="none"
    boxShadow="shadow"
    borderRadius="borderRadius20"
    cursor="pointer"
    paddingLeft="space50"
    paddingRight="space50"
    paddingTop={['space10', 'space0']}
    paddingBottom={['space10', 'space0']}
    transition="background-color 0.2s linear"
    _focus={{
      boxShadow: 'shadowFocus',
    }}
    _hover={{
      backgroundColor: 'colorBackground',
    }}
  >
    {children}
  </Box>
);

export default function CreateOrJoinScreen({ state, dispatch }: CreateOrJoinScreenProps) {
  return (
    <>
      <Heading as="h1" variant="heading20">
        Create or join?
      </Heading>
      <Text as="p" fontWeight="fontWeightBold" color="colorTextWeak">
        Create your own event or join one that's already happening.
      </Text>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-evenly"
        marginTop="space60"
        marginBottom="space60"
        rowGap="space40"
      >
        <CalloutButton onClick={() => dispatch({ type: 'set-participant-type', participantType: 'host' })}>
          <CreateEventIcon />
          <Box display="flex" flexGrow={1}>
            <Text as="span" fontWeight="fontWeightBold" color="colorTextWeak" textAlign={['center', 'left']}>
              Create a new event
            </Text>
          </Box>
          <Box>
            <ArrowForwardIcon decorative={true} size="sizeIcon80" color="colorTextIcon" />
          </Box>
        </CalloutButton>

        <CalloutButton onClick={() => dispatch({ type: 'set-participant-type', participantType: null })}>
          <JoinEventIcon />
          <Box display="flex" flexGrow={1}>
            <Text as="span" fontWeight="fontWeightBold" color="colorTextWeak" textAlign={['center', 'left']}>
              Join an event
            </Text>
          </Box>
          <Box>
            <ArrowForwardIcon decorative={true} size="sizeIcon80" color="colorTextIcon" />
          </Box>
        </CalloutButton>
      </Box>
      <Box>
        <Button
          variant="secondary"
          onClick={() => dispatch({ type: 'set-active-screen', activeScreen: ActiveScreen.ParticipantNameScreen })}
          size="small"
        >
          <ArrowBackIcon decorative={true} />
          Go back
        </Button>
      </Box>
    </>
  );
}
