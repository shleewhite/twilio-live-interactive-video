import React from 'react';

import { Box } from '@twilio-paste/core/box';
import { Text } from '@twilio-paste/core/text';

import { ProductLiveIcon } from '@twilio-paste/icons/esm/ProductLiveIcon';
import { LogoTwilioIcon } from '@twilio-paste/icons/esm/LogoTwilioIcon';

import { makeStyles, Theme } from '@material-ui/core';
import Swoosh from './swoosh';
import VideoLogo from './VideoLogo';
import { useAppState } from '../../state';
import UserMenu from './UserMenu/UserMenu';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  innerContainer: {
    display: 'flex',
    width: '888px',
    height: '400px',
    borderRadius: '8px',
    boxShadow: '0px 2px 4px 0px rgba(40, 42, 43, 0.3)',
    overflow: 'hidden',
    position: 'relative',
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      height: 'auto',
      width: 'calc(100% - 40px)',
      margin: 'auto',
      maxWidth: '400px',
    },
  },
  swooshContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: Swoosh,
    backgroundSize: 'cover',
    width: '296px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '100px',
      backgroundPositionY: '140px',
    },
  },
  logoContainer: {
    position: 'absolute',
    width: '210px',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      alignItems: 'center',
      width: '90%',
      textAlign: 'initial',
      '& svg': {
        height: '64px',
      },
    },
  },
}));

interface IntroContainerProps {
  children: React.ReactNode;
  transparentBackground?: boolean;
}

const IntroContainer = (props: IntroContainerProps) => {
  const classes = useStyles();
  const { user } = useAppState();
  const location = useLocation();
  const { transparentBackground } = props;

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      backgroundColor="colorBackgroundBodyInverse"
      height={transparentBackground ? 'auto' : '100%'}
      position={transparentBackground ? 'fixed' : undefined}
      top={transparentBackground ? 0 : undefined}
      left={transparentBackground ? 0 : undefined}
      right={transparentBackground ? 0 : undefined}
      bottom={transparentBackground ? 'space190' : undefined}
      zIndex={transparentBackground ? 'zIndex90' : undefined}
    >
      <Box
        display={props.transparentBackground ? 'none' : 'block'}
        position="absolute"
        top={0}
        left={0}
        margin="space60"
        color="colorTextIconBrandHighlight"
      >
        <LogoTwilioIcon decorative={false} title="Twilio" size="sizeIcon60" />
      </Box>

      {user && location.pathname !== '/login' && <UserMenu />}
      <Box flex={1}>
        {/* <Box
          display={['block', 'flex']}
          flexDirection={['row', 'column']}
          borderRadius="borderRadius30"
          overflow="hidden"
          position="relative"
          margin="auto"
          height={['auto', 'size40']}
          width={['calc(100% - 40px)', 'size80']}
          maxWidth={['size40', 'unset']}
          boxShadow="shadow"
        > */}
        <div className={classes.innerContainer}>
          {/*   swooshContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: Swoosh,
    backgroundSize: 'cover',
    width: '296px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '100px',
      backgroundPositionY: '140px',
    },
  }, */}
          {/* <Box
            position="relative"
            display="flex"
            alignItems="center"
            justifyContent="center"
            backgroundImage={Swoosh}
            backgroundSize="cover"
            width={['100%', 'size30']}
            height={['100%', 'auto']}
            // backgroundPositionY=''
          > */}
          <div className={classes.swooshContainer}>
            <Box
              position="absolute"
              display="flex"
              alignItems="center"
              width={['90%', 'size20']}
              flexDirection={['row', 'column']}
            >
              {/* <div className={classes.logoContainer}> */}
              <VideoLogo />
              {/* <Box
                color="colorTextIconBrandInverse"
                backgroundColor="colorBackgroundBrandHighlight"
                borderRadius="borderRadius30"
                width="size10"
                height="size10"
                // padding="space20"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <ProductLiveIcon decorative={true} size="sizeIcon100" />
              </Box> */}
              <Text
                textAlign="center"
                as="p"
                color="colorTextInverse"
                fontWeight="fontWeightBold"
                fontSize={['fontSize50', 'fontSize60']}
              >
                Twilio Live Video
              </Text>
              {/* </div> */}
            </Box>
          </div>
          {/* </Box> */}
          <Box
            backgroundColor="colorBackgroundBody"
            width="100%"
            paddingTop="space90"
            paddingBottom="space90"
            paddingLeft={['space90', 'space170']}
            paddingRight={['space90', 'space170']}
            flex={1}
            display="flex"
            flexDirection="column"
            height="100%"
            justifyContent="center"
          >
            {props.children}
          </Box>
        </div>
        {/* </Box> */}
      </Box>
    </Box>
  );
};

export default IntroContainer;
