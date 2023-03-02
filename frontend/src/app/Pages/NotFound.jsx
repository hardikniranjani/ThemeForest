import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function NotFound() {
    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md="6">
                    <h1 className="text-center">404 Not Found</h1>
                    <p className="text-center">
                        The page you are looking for does not exist or has been removed.
                    </p>
                    <div className="d-flex justify-content-center">
                        <Button variant="primary" href="/">Go Home</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}