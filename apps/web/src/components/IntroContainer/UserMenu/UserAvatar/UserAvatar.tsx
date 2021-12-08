import React from 'react';

import { Avatar as PasteAvatar } from '@twilio-paste/core/avatar';
import { UserIcon } from '@twilio-paste/icons/esm/UserIcon';

import { StateContextType } from '../../../../state';

export default function UserAvatar({ user }: { user: StateContextType['user'] }) {
  const { displayName, photoURL } = user!;
  const hasDisplayName = displayName && displayName !== null;

  if (photoURL && photoURL !== null) {
    <PasteAvatar name={displayName as string} src={photoURL} />;
  }

  return <PasteAvatar name={displayName as string} icon={!hasDisplayName ? UserIcon : undefined} />;
}
