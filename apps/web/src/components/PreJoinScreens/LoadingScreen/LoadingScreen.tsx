import React from 'react';

import { Box } from '@twilio-paste/core/box';
import { Text } from '@twilio-paste/core/text';
import { Spinner } from '@twilio-paste/core/spinner';

import { appStateTypes } from '../../../state/appState/appReducer';

export function LoadingScreen({ state }: { state: appStateTypes }) {
  const statusText = state.participantType === 'host' ? 'Going Live' : 'Joining Live Event';

  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" rowGap="space50">
      <Spinner decorative title={statusText} size="sizeIcon80" />
      <Text as="p" fontWeight="fontWeightBold" fontSize="fontSize50">
        {statusText}
      </Text>
    </Box>
  );
}
