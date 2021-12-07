import React from 'react';

import { Box } from '@twilio-paste/core/box';
import { Text } from '@twilio-paste/core/text';

import { ProductLiveIcon } from '@twilio-paste/icons/esm/ProductLiveIcon';
import { LogoTwilioIcon } from '@twilio-paste/icons/esm/LogoTwilioIcon';

import Swoosh from './swoosh';
import { useAppState } from '../../state';
import UserMenu from './UserMenu/UserMenu';
import { useLocation } from 'react-router-dom';

interface IntroContainerProps {
  children: React.ReactNode;
  transparentBackground?: boolean;
}

const IntroContainer = (props: IntroContainerProps) => {
  const { user } = useAppState();
  const location = useLocation();
  const { transparentBackground } = props;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      backgroundColor="colorBackgroundBodyInverse"
      position={transparentBackground ? 'fixed' : undefined}
      top={transparentBackground ? 0 : undefined}
      left={transparentBackground ? 0 : undefined}
      right={transparentBackground ? 0 : undefined}
      bottom={transparentBackground ? 'space190' : undefined}
      zIndex={transparentBackground ? 'zIndex90' : undefined}
    >
      <Box padding="space60" display="flex" justifyContent="space-between" width="100%" position="absolute" top={0}>
        <Box display={props.transparentBackground ? 'none' : 'block'} color="colorTextIconBrandHighlight">
          <LogoTwilioIcon decorative={false} title="Twilio" size="sizeIcon60" />
        </Box>

        {user && location.pathname !== '/login' && <UserMenu />}
      </Box>

      <Box
        display="flex"
        flexDirection={['column', 'row']}
        borderRadius="borderRadius30"
        boxShadow="shadow"
        overflow="hidden"
        margin="space100"
        width={['auto', null, 'size90']}
      >
        <Box
          display="flex"
          flexDirection={['row', 'column']}
          backgroundImage={Swoosh}
          justifyContent="center"
          alignItems="center"
          height={['size10', 'auto']}
          minHeight={['unset', 'size40']}
          width={['100%', 'size30']}
          rowGap="space40"
          columnGap="space40"
        >
          <Box color="colorTextIconBrandInverse">
            <ProductLiveIcon decorative={true} size="sizeIcon100" />
          </Box>
          <Text
            textAlign="center"
            as="p"
            color="colorTextInverse"
            fontWeight="fontWeightBold"
            fontSize={['fontSize50', 'fontSize60']}
          >
            Twilio Live Video
          </Text>
        </Box>
        <Box
          backgroundColor="colorBackgroundBody"
          width="100%"
          paddingTop="space90"
          paddingBottom="space90"
          paddingLeft={['space90', 'space170']}
          paddingRight={['space90', 'space170']}
          display="flex"
          flexDirection="column"
          height="100%"
          justifyContent="center"
        >
          {props.children}
        </Box>
      </Box>
    </Box>
  );
};

export default IntroContainer;
