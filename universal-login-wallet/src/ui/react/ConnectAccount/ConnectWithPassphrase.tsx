import React, {useState} from 'react';
import {Spinner, InputLabel} from '@universal-login/react';
import {CustomInput} from '../common/CustomInput';
import {useServices, useRouter} from '../../hooks';

interface ConnectWithPassphraseProps {
  name: string;
}

export const ConnectWithPassphrase = ({name}: ConnectWithPassphraseProps) => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const {walletService} = useServices();
  const {history} = useRouter();

  const onRecoveryClick = async () => {
    setIsLoading(true);
    try {
      await walletService.recover(name, code);
      history.push('/');
    } catch (e) {
      setIsLoading(false);
      setErrorMessage(e.message);
    }
  };

  return (
    <div className="main-bg">
      <div className="box-wrapper">
        <div className="box">
          <div className="box-header">
            <h1 className="box-title">Connect with passphrase</h1>
          </div>
          <div className="box-content connect-passphrase-content">
            <div className="connect-passphrase-section">
              <p className="box-text connect-passphrase-text">Write your passphrase to recover the access to your account</p>
              <InputLabel htmlFor="">Backup codes</InputLabel>
              <CustomInput
                id="passphrase-input"
                value={code}
                onChange={event => setCode(event.target.value)}
              />
              {(errorMessage && !isLoading) && <div className="hint">{errorMessage}</div>}
              </div>
              <button onClick={onRecoveryClick} className="button-primary connect-passphrase-btn" disabled={!code || isLoading}><Spinner className="connect-spinner" dotClassName="connect-spinner-dot" /></button>
          </div>
        </div>
      </div>
    </div>
  );
};
