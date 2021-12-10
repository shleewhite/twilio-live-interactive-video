import React, { useEffect, useRef, useState } from 'react';

import { Box } from '@twilio-paste/core/box';
import { Button } from '@twilio-paste/core/button';
import { TextArea } from '@twilio-paste/core/textarea';

import { AttachIcon } from '@twilio-paste/icons/esm/AttachIcon';

import { Conversation } from '@twilio/conversations/lib/conversation';
import { isMobile } from '../../../utils';
import SendMessageIcon from '../../../icons/SendMessageIcon';
import Snackbar from '../../Snackbar/Snackbar';
interface ChatInputProps {
  conversation: Conversation;
  isChatWindowOpen: boolean;
}

const ALLOWED_FILE_TYPES =
  'audio/*, image/*, text/*, video/*, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document .xslx, .ppt, .pdf, .key, .svg, .csv';

export default function ChatInput({ conversation, isChatWindowOpen }: ChatInputProps) {
  const [messageBody, setMessageBody] = useState('');
  const [isSendingFile, setIsSendingFile] = useState(false);
  const [fileSendError, setFileSendError] = useState<string | null>(null);
  const isValidMessage = /\S/.test(messageBody);
  const textInputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isChatWindowOpen) {
      // When the chat window is opened, we will focus on the text input.
      // This is so the user doesn't have to click on it to begin typing a message.
      textInputRef.current?.focus();
    }
  }, [isChatWindowOpen]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageBody(event.target.value);
  };

  // ensures pressing enter + shift creates a new line, so that enter on its own only sends the message:
  const handleReturnKeyPress = (event: React.KeyboardEvent) => {
    if (!isMobile && event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage(messageBody);
    }
  };

  const handleSendMessage = (message: string) => {
    if (isValidMessage) {
      conversation.sendMessage(message.trim());
      setMessageBody('');
    }
  };

  const handleSendFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      var formData = new FormData();
      formData.append('userfile', file);
      setIsSendingFile(true);
      setFileSendError(null);
      conversation
        .sendMessage(formData)
        .catch(e => {
          if (e.code === 413) {
            setFileSendError('File size is too large. Maximum file size is 150MB.');
          } else {
            setFileSendError('There was a problem uploading the file. Please try again.');
          }
          console.log('Problem sending file: ', e);
        })
        .finally(() => {
          setIsSendingFile(false);
        });
    }
  };

  return (
    <Box
      paddingY="space50"
      paddingX="space60"
      borderTopStyle="solid"
      borderTopWidth="borderWidth10"
      borderTopColor="colorBorderLight"
      borderBottomStyle="solid"
      borderBottomWidth="borderWidth10"
      borderBottomColor="colorBorderLight"
    >
      <Snackbar
        open={Boolean(fileSendError)}
        headline="Error"
        message={fileSendError || ''}
        variant="error"
        handleClose={() => setFileSendError(null)}
      />
      <TextArea
        aria-label="Message"
        placeholder="Write a message..."
        value={messageBody}
        onKeyPress={handleReturnKeyPress}
        onChange={handleChange}
        data-cy-chat-input
        ref={textInputRef}
      />

      {/* Since the file input element is invisible, we can hardcode an empty string as its value.
        This allows users to upload the same file multiple times. */}
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleSendFile}
        value={''}
        accept={ALLOWED_FILE_TYPES}
      />
      <Box display="flex" marginTop="space50" columnGap="space50" justifyContent="flex-end">
        <Button
          variant="secondary_icon"
          size="icon_small"
          loading={isSendingFile}
          onClick={() => fileInputRef.current?.click()}
        >
          <AttachIcon decorative={false} title="Send file" />
        </Button>

        <Button
          aria-label="Send chat"
          variant="primary"
          size="icon_small"
          onClick={() => handleSendMessage(messageBody)}
          disabled={!isValidMessage}
          data-cy-send-message-button
        >
          <Box as="span" width="sizeIcon20" height="sizeIcon20">
            <SendMessageIcon />
          </Box>
        </Button>
      </Box>
    </Box>
  );
}
