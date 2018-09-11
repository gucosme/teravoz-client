import React from 'react'
import { Container, Navbar, NavbarBrand } from 'reactstrap'

const style = {
  padding: 0,
  backgroundColor: '#212121',
  color: '#fff'
}

export default () => (
  <Navbar expand='xg' style={style}>
    <Container>
      <NavbarBrand>calls</NavbarBrand>
    </Container>
  </Navbar>
)
