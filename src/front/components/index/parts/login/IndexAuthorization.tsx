import { useState } from 'react';

import { IndexLoginAuth } from './IndexLoginAuth';
import { IndexTelegramAuth } from './IndexTelegramAuth';

export default function IndexAuthorization() {
  const [isLoginAuth] = useState(false);

  return <>{isLoginAuth ? <IndexLoginAuth /> : <IndexTelegramAuth />}</>;
}
