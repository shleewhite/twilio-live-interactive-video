import React from 'react';

import { Heading } from '@twilio-paste/core/heading';
import { Button } from '@twilio-paste/core/button';
import { Box } from '@twilio-paste/core/box';

import { CloseIcon } from '@twilio-paste/icons/esm/CloseIcon';

import useChatContext from '../../../hooks/useChatContext/useChatContext';

export default function ChatWindowHeader() {
  const { setIsChatWindowOpen } = useChatContext();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="space50"
      borderBottomColor="colorBorderLight"
      backgroundColor="colorBackground"
      borderBottomStyle="solid"
      borderBottomWidth="borderWidth10"
    >
      <Heading as="h2" variant="heading50" marginBottom="space0">
        Chat
      </Heading>
      <Button variant="secondary_icon" onClick={() => setIsChatWindowOpen(false)} size="icon_small">
        <CloseIcon decorative={false} title="Close chat" />
      </Button>
    </Box>
  );
}
