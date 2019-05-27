import PendingMessage from './PendingMessage';
import {MessageStatus} from '@universal-login/commons';

export default interface IPendingMessagesStore {
  add: (messageHash: string, pendingMessage: PendingMessage) => void;
  get: (messageHash: string) => PendingMessage;
  isPresent: (messageHash: string) => boolean;
  remove: (messageHash: string) => PendingMessage;
  getStatus: (messageHash: string) => Promise<MessageStatus>;
  addSignature: (messageHash: string, signature: string) => void;
  updateTransactionHash: (messageHash: string, transactionHash: string) => void;
}
