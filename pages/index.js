import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import io from 'socket.io-client'
import { Container } from 'reactstrap'

import 'bootstrap/dist/css/bootstrap.min.css'

import Head from '../components/Head'
import Header from '../components/Header'
import Calls from '../components/Calls'

const { API_URL } = process.env

class Index extends Component {
  static async getInitialProps () {
    const { data } = await axios.get(`http://${API_URL}/calls`)
    return { calls: data }
  }

  static defaultProps = {
    calls: []
  }

  static propTypes = {
    calls: PropTypes.array
  }

  state = {
    calls: this.props.calls
  }

  componentDidMount () {
    this.socket = io()
    this.socket.on('call:new', this.addCall)
    this.socket.on('call:update', this.updateCall)
  }

  componentWillUnmount () {
    this.socket.off('call:now', this.handleCall)
    this.socket.off('call:update', this.updateCall)
    this.socket.close()
  }

  addCall = call => this.setState(state => ({
    calls: state.calls.concat(call)
  }))

  updateCall = call => this.setState(state => ({
    calls: state.calls
      .filter(c => c.call_id !== call.call_id)
      .concat(call)
  }))

  render () {
    const { calls } = this.state
    return (
      <>
        <Head />
        <Header />
        <Container>
          <Calls calls={calls} />
        </Container>
      </>
    )
  }
}
export default Index
