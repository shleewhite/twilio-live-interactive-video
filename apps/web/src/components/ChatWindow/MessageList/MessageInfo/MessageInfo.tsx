import React from 'react';

import { Text } from '@twilio-paste/core/text';
import { Box } from '@twilio-paste/core/box';

interface MessageInfoProps {
  author: string;
  dateCreated: string;
  isLocalParticipant: boolean;
}

export default function MessageInfo({ author, dateCreated, isLocalParticipant }: MessageInfoProps) {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" marginTop="space60">
      <Text as="span" fontSize="fontSize20" lineHeight="lineHeight20" color="colorTextWeak">
        {isLocalParticipant ? `${author} (You)` : author}
      </Text>
      <Text as="span" fontSize="fontSize20" lineHeight="lineHeight20" color="colorTextWeak">
        {dateCreated}
      </Text>
    </Box>
  );
}
