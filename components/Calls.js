import React from 'react'
import { Badge, Container, Card, CardBody, CardFooter, Row } from 'reactstrap'

import { FontAwesomeIcon as FIcon } from '@fortawesome/react-fontawesome'
import {
  faPhone,
  faPhoneSquare,
  faPhoneVolume,
  faPhoneSlash
} from '@fortawesome/free-solid-svg-icons'

const callStyle = {
  paddingBottom: '.5rem'
}

const firstCallStyle = {
  paddingTop: '.5rem',
  paddingBottom: '.5rem'
}

const getCallColor = callType => ({
  'call.new': '#0be587',
  'call.standby': '#29364c',
  'call.waiting': '#c40101',
  'call.finished': '#878787'
}[callType])

const getCallIcon = callType => {
  if (callType === 'call.new') return faPhoneVolume
  if (callType === 'call.waiting') return faPhoneSquare
  if (callType === 'call.finished') return faPhoneSlash
  return faPhone
}

export default ({ calls }) => (
  <>
    {calls.map((call, pos) => (
      <Row key={call.call_id} style={pos === 0 ? firstCallStyle : callStyle}>
        <Container>
          <Card>
            <CardBody>
              <FIcon
                icon={getCallIcon(call.type)}
                color={getCallColor(call.type)}
              /> Call from: {call.their_number}
              <Badge className='float-right' pill >
                {call.type}
              </Badge>
            </CardBody>
            <CardFooter>
              <small className='text-muted'>#{call.call_id}</small>
            </CardFooter>
          </Card>
        </Container>
      </Row>
    ))}
  </>
)
