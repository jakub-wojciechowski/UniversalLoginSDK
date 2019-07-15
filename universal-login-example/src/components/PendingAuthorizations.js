import React, {Component} from 'react';
import HeaderView from '../views/HeaderView';
import RequestsBadge from './RequestsBadge';
import BackBtn from './BackBtn';
import PendingAuthorizationsView from '../views/PendingAuthorizationsView';
import PropTypes from 'prop-types';
import Profile from './Profile';
import {tokenContractAddress} from '../../config/config';
import DEFAULT_PAYMENT_OPTIONS from '../../config/defaultPaymentOptions';

class PendingAuthorizations extends Component {
  constructor(props) {
    super(props);
    this.walletContractService = this.props.services.walletContractService;
    this.sdk = this.props.services.sdk;
    this.state = {
      authorisations: this.sdk.relayerObserver.lastAuthorisations
    };
  }

  componentDidMount() {
    const {address, privateKey} = this.walletContractService.walletContract;
    this.setState({
      authorisations: this.sdk.relayerObserver.lastAuthorisations
    });
    this.unsubscribe = this.sdk.subscribeAuthorisations(address, privateKey,this.onAuthorisationChanged.bind(this));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onAuthorisationChanged(authorisations) {
    const {emitter} = this.props.services;

    this.setState({authorisations});

    if (authorisations.length === 0) {
      emitter.emit('setView', 'MainScreen');
    }
  }

  async onAcceptClick(publicKey) {
    const {walletContractService} = this.props.services;
    const to = walletContractService.walletContract.address;
    const {privateKey} = walletContractService.walletContract;
    const {sdk} = walletContractService;
    const addKeyPaymentOptions = {
      ...DEFAULT_PAYMENT_OPTIONS,
      gasToken: tokenContractAddress
    };
    const {waitToBeMined} = await sdk.addKey(to, publicKey, privateKey, addKeyPaymentOptions);
    await waitToBeMined();
  }

  async onDenyClick(publicKey) {
    const {walletContractService} = this.props.services;
    const walletContractAddress = walletContractService.walletContract.address;
    const {sdk} = walletContractService;
    await sdk.denyRequest(walletContractAddress, walletContractService.privateKey, publicKey);
  }

  render() {
    return (
      <div>
        <HeaderView>
          <Profile
            type="walletContractHeader"
            walletContractService={this.props.services.walletContractService}
          />
          <RequestsBadge
            setView={this.props.setView}
            services={this.props.services}
          />
          <BackBtn setView={this.props.setView} />
        </HeaderView>
        <PendingAuthorizationsView
          setView={this.props.setView}
          authorisations={this.state.authorisations}
          onAcceptClick={this.onAcceptClick.bind(this)}
          onDenyClick={this.onDenyClick.bind(this)}
        />
      </div>
    );
  }
}

PendingAuthorizations.propTypes = {
  setView: PropTypes.func,
  services: PropTypes.object
};

export default PendingAuthorizations;
