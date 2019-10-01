import React from 'react';
import {ProgressBar} from '@universal-login/react';
import AvatarPending1x from './../../assets/illustrations/avatatPending@1x.png';
import AvatarPending2x from './../../assets/illustrations/avatatPending@2x.png';
import {getEtherscanUrl} from '../../../core/utils/getEtherscanUrl';
import {utils} from 'ethers';

interface ModalWaitingForProps {
  action: string;
  message: string;
  chainName: string;
}

const ModalWaitingFor = ({action, chainName, message}: ModalWaitingForProps) => {
  return (
    <>
      <div className="box-header">
        <h1 className="box-title">{action}</h1>
      </div>
      <div className="box-content modal-pending-content">
        <h3 className="modal-section-title transaction-status-title">Transaction status: pending</h3>
        <img
          className="modal-avatar-pending"
          src={AvatarPending1x}
          srcSet={AvatarPending2x}
          alt="pending"
        />
        <div className="modal-pending-section">
          <ProgressBar className="modal-pending-loader"/>
          <h3 className="modal-section-title transaction-hash-title">Transaction hash</h3>
          <p className="txn-hash-text">
            {utils.isHexString(message)
              ? <a href={getEtherscanUrl(chainName, message)} target="_blank">{message}</a>
              : message}
          </p>
        </div>
        <p className="info-text">It takes time to register your username and deploy your wallet. In order to do so, we need to create a transaction and wait until the Ethereum blockchain validates it...</p>
      </div>
    </>
  );
};

export default ModalWaitingFor;
