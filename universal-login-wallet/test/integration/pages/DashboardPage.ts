import {ReactWrapper} from 'enzyme';
import {waitForUI} from '../helpers/utils';

export default class DashboardPage {
  constructor(private wrapper : ReactWrapper) {
  }

  clickTransferButton() {
    this.wrapper.find('#transferFunds').simulate('click');
    this.wrapper.update();
  }

  disconnect() {
    this.wrapper.find('.sign-out-btn').simulate('click');
  }

  async waitForHideModal() {
    await waitForUI(this.wrapper, () => !this.wrapper.exists('.modal-wrapper'), 4000);
  }

  getWalletBalance() : string {
    return this.wrapper.find('p.universal-login-balance-amount').text();
  }

  isNotificationAlert(): boolean {
    this.wrapper.update();
    return this.wrapper.exists('.new-notifications');
  }

  async clickDevicesButton() {
    this.wrapper.find('#devicesButton').simulate('click', { button: 0 });
    await waitForUI(this.wrapper, () => this.wrapper.exists('div.devices'));
  }

  async clickManageDevicesButton() {
    this.wrapper.find('button.devices-message-button').simulate('click', { button: 0 });
    await waitForUI(this.wrapper, () => this.wrapper.exists('#emojis'));
  }

  async waitForNewNotifications() {
    await waitForUI(this.wrapper, () => this.wrapper.exists('.new-notifications'), 3000, 100);
  }
}
