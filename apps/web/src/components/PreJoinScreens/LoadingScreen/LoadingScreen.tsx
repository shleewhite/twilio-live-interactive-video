import React from 'react';

import { Box } from '@twilio-paste/core/box';
import { Heading } from '@twilio-paste/core/heading';
import { Spinner } from '@twilio-paste/core/spinner';

import { appStateTypes } from '../../../state/appState/appReducer';

export function LoadingScreen({ state }: { state: appStateTypes }) {
  const statusText = state.participantType === 'host' ? 'Going Live' : 'Joining Live Event';

  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" rowGap="space50">
      <Spinner decorative title={statusText} size="sizeIcon80" />
      <Heading as="h1" variant="heading30" marginBottom="space0">
        {statusText}
      </Heading>
    </Box>
  );
}
