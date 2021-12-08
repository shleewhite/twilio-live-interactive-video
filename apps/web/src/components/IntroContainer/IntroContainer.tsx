import React from 'react';

import { Box } from '@twilio-paste/core/box';
import { Text } from '@twilio-paste/core/text';

import { LogoTwilioIcon } from '@twilio-paste/icons/esm/LogoTwilioIcon';

import Swoosh from './swoosh';
import VideoLogo from './VideoLogo';
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
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Box
        backgroundColor="colorBackgroundBodyInverse"
        opacity={transparentBackground ? '80%' : undefined}
        width="100%"
        height={transparentBackground ? 'auto' : '100%'}
        position="fixed"
        top={0}
        bottom={transparentBackground ? 'space190' : undefined}
      />
      <Box
        padding="space60"
        display="flex"
        justifyContent="space-between"
        width="100%"
        position="absolute"
        top={0}
        zIndex="zIndex90"
      >
        <Box display={props.transparentBackground ? 'none' : 'block'} color="colorTextIconBrandHighlight">
          <LogoTwilioIcon decorative={false} title="Twilio" size="sizeIcon60" />
        </Box>

        {user && location.pathname !== '/login' && <UserMenu />}
      </Box>

      <Box
        display="flex"
        flexDirection={['column', 'column', 'row']}
        borderRadius="borderRadius30"
        boxShadow="shadow"
        overflow="hidden"
        margin="space100"
        maxWidth="size90"
        zIndex="zIndex90"
      >
        <Box
          display="flex"
          flexDirection={['row', 'row', 'column']}
          backgroundImage={Swoosh}
          justifyContent="center"
          alignItems="center"
          minHeight={['size10', 'size10', 'size40']}
          minWidth={['100%', '100%', '30%']}
          rowGap="space40"
          columnGap="space40"
        >
          <Box color="colorTextIconBrandInverse" maxWidth={['sizeIcon110', 'sizeIcon110', '50%']}>
            <VideoLogo aria-hidden="true" />
          </Box>
          <Text
            textAlign="center"
            as="p"
            color="colorTextInverse"
            fontWeight="fontWeightBold"
            fontSize={['fontSize50', 'fontSize50', 'fontSize60']}
          >
            Twilio Live Video
          </Text>
        </Box>
        <Box
          backgroundColor="colorBackgroundBody"
          width="100%"
          paddingTop="space90"
          paddingBottom="space90"
          paddingLeft={['space90', 'space90', 'space170']}
          paddingRight={['space90', 'space90', 'space170']}
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
