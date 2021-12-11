import React from 'react';

import { Box } from '@twilio-paste/core/box';

import ChatWindowHeader from './ChatWindowHeader/ChatWindowHeader';
import ChatInput from './ChatInput/ChatInput';
import MessageList from './MessageList/MessageList';
import useChatContext from '../../hooks/useChatContext/useChatContext';

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     chatWindowContainer: {
//       background: '#FFFFFF',
//       zIndex: 9,
//       display: 'flex',
//       flexDirection: 'column',
//       borderLeft: '1px solid #E4E7E9',
//       [theme.breakpoints.down('sm')]: {
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         bottom: 0,
//         right: 0,
//         zIndex: 100,
//       },
//     },
//     hide: {
//       display: 'none',
//     },
//   })
// );

// In this component, we are toggling the visibility of the ChatWindow with CSS instead of
// conditionally rendering the component in the DOM. This is done so that the ChatWindow is
// not unmounted while a file upload is in progress.

export default function ChatWindow() {
  const { isChatWindowOpen, messages, conversation } = useChatContext();

  return (
    <Box
      as="aside"
      backgroundColor="colorBackgroundBody"
      flexDirection="column"
      borderLeftStyle="solid"
      borderLeftWidth="borderWidth10"
      borderLeftColor="colorBorderLight"
      display={isChatWindowOpen ? 'flex' : 'none'}
    >
      <ChatWindowHeader />
      <MessageList messages={messages} />
      <ChatInput conversation={conversation!} isChatWindowOpen={isChatWindowOpen} />
    </Box>
  );
}
