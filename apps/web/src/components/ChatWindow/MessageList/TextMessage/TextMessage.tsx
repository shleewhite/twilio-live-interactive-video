import React from 'react';

import { Anchor } from '@twilio-paste/core/anchor';
import { Box } from '@twilio-paste/core/box';

import linkify from 'linkify-it';

interface TextMessageProps {
  body: string;
  isLocalParticipant: boolean;
}

function addLinks(text: string) {
  const matches = linkify().match(text);
  if (!matches) return text;

  const results = [];
  let lastIndex = 0;

  matches.forEach((match, i) => {
    results.push(text.slice(lastIndex, match.index));
    results.push(
      <Anchor target="_blank" rel="noreferrer" href={match.url} key={i}>
        {match.text}
      </Anchor>
    );
    lastIndex = match.lastIndex;
  });

  results.push(text.slice(lastIndex, text.length));

  return results;
}

export default function TextMessage({ body, isLocalParticipant }: TextMessageProps) {
  return (
    <Box
      element={isLocalParticipant ? 'TEXT_MESSAGE_LOCAL' : 'TEXT_MESSAGE'}
      backgroundColor={isLocalParticipant ? 'colorBackgroundPrimaryWeakest' : 'colorBackground'}
      whiteSpace="pre-wrap"
      wordBreak="break-word"
      display="flex"
      alignItems="center"
      marginTop="space20"
      paddingY="space30"
      paddingX="space40"
      borderRadius="borderRadius30"
      width="max-content"
    >
      {addLinks(body)}
    </Box>
  );
}
