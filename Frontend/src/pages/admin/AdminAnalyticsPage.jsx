import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import AdminLinksComponent from "../../components/admin/AdminLinksComponent"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminAnalyticsPage = () => {
  const data = [
    { name: 'Jan', "2022 year": 4000, "2023 year": 3000 },
    { name: 'Feb', "2022 year": 5000, "2023 year": 2000 },
    { name: 'Mar', "2022 year": 1000, "2023 year": 3000 },
    // ...
  ];

  return (
    <div className="container-fluid">
      <Row className='container-fluid mt-5'>
        <Col md={2}>
          <AdminLinksComponent />
        </Col>
        <Col md={10}>
          <h2>Black Friday cumulative revenue 2/26/2022 vs 2/27/2023</h2>

          <Row>
            <Col md={6}>
              <Form.Group controlId='firstDateToCompare' className='my-2'>
                <Form.Label> Select First Date To Compare </Form.Label>
                <Form.Control
                  type='date'
                  name='firstDateToCompare'
                  placeholder='First Date To Compare' />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId='secondDateToCompare' className='my-2'>
                <Form.Label> Select Second Date To Compare </Form.Label>
                <Form.Control
                  type='date'
                  name='secondDateToCompare'
                  placeholder='Second Date To Compare' />
              </Form.Group>
            </Col>
          </Row>

          <div style={{ height: '400px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  label={{
                    value: 'TIME',
                    offSet: 50,
                    position: 'insideBottomRight',
                  }}
                  allowDuplicatedCategory={false} />
                <YAxis
                  label={{
                    value: 'revenue $',
                    angle: '-90',
                    position: 'insideLeft'
                  }} />
                <Tooltip />
                <Legend verticalAlign='top' height={26} />
                <Line
                  type="monotone"
                  dataKey="2022 year"
                  stroke="#8884d8"
                  strokeWidth={3}
                  activeDot={{ r: 4 }} />
                <Line
                  strokeWidth={3}
                  type="monotone"
                  dataKey="2023 year"
                  stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default AdminAnalyticsPage
