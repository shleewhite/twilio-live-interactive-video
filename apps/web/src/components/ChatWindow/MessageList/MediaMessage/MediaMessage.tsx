import React from 'react';

import { Box } from '@twilio-paste/core/box';
import { Text } from '@twilio-paste/core/text';

import FileDownloadIcon from '../../../../icons/FileDownloadIcon';
import { Media } from '@twilio/conversations/lib/media';

interface MediaMessageProps {
  media: Media;
}

export function formatFileSize(bytes: number, suffixIndex = 0): string {
  const suffixes = ['bytes', 'KB', 'MB', 'GB'];
  if (bytes < 1000) return +bytes.toFixed(2) + ' ' + suffixes[suffixIndex];
  return formatFileSize(bytes / 1024, suffixIndex + 1);
}

export default function FileMessage({ media }: MediaMessageProps) {
  const handleClick = () => {
    media.getContentTemporaryUrl().then(url => {
      const anchorEl = document.createElement('a');

      anchorEl.href = url;
      anchorEl.target = '_blank';
      anchorEl.rel = 'noopener';

      // setTimeout is needed in order to open files in iOS Safari.
      setTimeout(() => {
        anchorEl.click();
      });
    });
  };

  return (
    <Box
      element="MEDIA_MESSAGE"
      as="button"
      onClick={handleClick}
      display="flex"
      borderRadius="borderRadius20"
      cursor="pointer"
      paddingX="space70"
      paddingY="space50"
      columnGap="space70"
      marginY="space30"
      backgroundColor="transparent"
      borderStyle="solid"
      borderWidth="borderWidth10"
      borderColor="colorBorder"
      _focus={{
        boxShadow: 'shadowFocus',
      }}
    >
      <Box display="flex" alignItems="center">
        <FileDownloadIcon />
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Text as="span" textAlign="left" fontSize="fontSize20" lineHeight="lineHeight20" fontWeight="fontWeightBold">
          {media.filename}
        </Text>
        <Text as="span" textAlign="left" fontSize="fontSize20" lineHeight="lineHeight20">
          {formatFileSize(media.size)} - Click to open
        </Text>
      </Box>
    </Box>
  );
}
