import React from 'react';
import { Box } from '@twilio-paste/core/box';
import { Text } from '@twilio-paste/core/text';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import Menu from '../MenuBar/Menu/Menu';
import { layoutDimensions } from '../../constants';

export default function MobileTopMenuBar() {
  const { room } = useVideoContext();

  return (
    <Box
      element="MOBILE_TOP_BAR"
      backgroundColor="colorBackgroundBody"
      display={['flex', 'flex', 'none']}
      alignItems="center"
      justifyContent="space-between"
      height={layoutDimensions.MOBILE_TOP_BAR_HEIGHT}
      paddingX="space40"
    >
      <Text as="span" fontSize="fontSize40">
        {room!.name}
      </Text>
      <Menu buttonVariant="secondary" />
    </Box>
  );
}
