import { useState } from 'react';
import { IndexLoginAuth } from './IndexLoginAuth';
import { IndexTelegramAuth } from './IndexTelegramAuth';

export default function IndexAuthorization() {
  const [isLoginAuth, setIsLoginAuth] = useState(false);

  return <>{isLoginAuth ? <IndexLoginAuth /> : <IndexTelegramAuth onLoginAuth={() => setIsLoginAuth(true)} />}</>;
}
