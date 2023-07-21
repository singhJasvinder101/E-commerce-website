import React from 'react'
import AdminChatRoomComponent from '../../components/admin/AdminChatRoomComponent'
import AdminLinksComponent from "../../components/admin/AdminLinksComponent"
import { Col, Container, Row } from 'react-bootstrap'

const AdminChatsPage = () => {
  return (
    <div className="container-fluid">
      <Row className='container-fluid justify-content-md-center mt-5'>
        <Col md={2} xs={3}>
          <AdminLinksComponent />
        </Col>
        <Col md={10} xs={12}>
          <AdminChatRoomComponent />
        </Col>
      </Row>
    </div>
  )
}

export default AdminChatsPage
