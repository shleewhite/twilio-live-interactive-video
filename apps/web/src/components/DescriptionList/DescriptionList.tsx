import React, { FC } from 'react';
import { Text, TextProps } from '@twilio-paste/core/text';
import { Box } from '@twilio-paste/core/box';

type BaseDescriptionProps = { element?: TextProps['element'] };

export const DescriptionList: FC<BaseDescriptionProps> = ({ children, element = 'DESCRIPTION_LIST' }) => {
  return (
    <Text as="dl" element={element}>
      {children}
    </Text>
  );
};

export const DescriptionItem: FC<BaseDescriptionProps> = ({ children, element = 'DESCRIPTION_ITEM' }) => {
  return (
    <Box as="div" display="flex" element={element} marginBottom="space40">
      {children}
    </Box>
  );
};

export const DescriptionTitle: FC<BaseDescriptionProps> = ({ children, element = 'DESCRIPTION_TITLE' }) => {
  return (
    <Text as="dt" color="colorTextWeak" element={element} fontWeight="fontWeightSemibold" marginRight="space40">
      {children}
    </Text>
  );
};

export const DescriptionDetail: FC<BaseDescriptionProps> = ({ children, element = 'DESCRIPTION_DETAIL' }) => {
  return (
    <Text as="dd" element={element}>
      {children}
    </Text>
  );
};
