'use strict'
var React = require('react')
var style = require('./basicStyles')

module.exports = React.createClass({
  contextTypes: {
    web3: React.PropTypes.object
  },

  propTypes: {
    onNewTxRequested: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    return {blockNumber: '1000110', txNumber: '0x50a420e75151e7f04a014019598764102675e0c6c8979f1089690c594cbe871c', from: '', to: '', hash: ''}
  },

  // creation 0xa9619e1d0a35b2c1d686f5b661b3abd87f998d2844e8e9cc905edb57fc9ce349
  // invokation 0x71a6d583d16d142c5c3e8903060e8a4ee5a5016348a9448df6c3e63b68076ec4

  submit: function () {
    var tx
    if (this.state.txNumber.indexOf('0x') !== -1) {
      tx = this.context.web3.eth.getTransaction(this.state.txNumber)
    } else {
      tx = this.context.web3.eth.getTransactionFromBlock(this.state.blockNumber, this.state.txNumber)
    }
    if (tx) {
      if (!tx.to) {
        tx.to = '(Contract Creation Code)'
      }
      this.setState({from: tx.from, to: tx.to, hash: tx.hash})
      this.props.onNewTxRequested(this.state.blockNumber, parseInt(this.state.txNumber), tx)
    } else {
      console.log('cannot find ' + this.state.blockNumber + ' ' + this.state.txNumber)
    }
  },

  updateTxhash: function (ev) {
    this.state.hash = ev.target.value
  },

  updateBlockN: function (ev) {
    this.state.blockNumber = ev.target.value
  },

  updateTxN: function (ev) {
    this.state.txNumber = ev.target.value
  },

  render: function () {
    return (
      <div style={style.container}>
        <input onChange={this.updateBlockN} type='text' placeholder={'Block number (default 1000110)' + this.state.blockNumber}></input>
        <input onChange={this.updateTxN} type='text' placeholder={'Transaction Number or hash (default 2) ' + this.state.txNumber}></input>
        <button onClick={this.submit}>
          Get
        </button>
        <div style={style.transactionInfo}>
          <table>
            <tbody>
              <tr>
                <td>
                  Hash:
                </td>
                <td>
                  {this.state.hash}
                </td>
              </tr>
              <tr>
                <td>
                  From:
                </td>
                <td>
                  {this.state.from}
                </td>
              </tr>
              <tr>
                <td>
                  To:
                </td>
                <td>
                  {this.state.to}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
})
