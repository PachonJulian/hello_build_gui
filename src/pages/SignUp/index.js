import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import Image from 'react-bootstrap/Image'
import { Link, useHistory } from 'react-router-dom';
import { post } from '../../services/HttpRequest';
import { apiRoute } from '../../utils/default';
import Swal from 'sweetalert2';
import './styles.css';
import deafultLogo from '../../assets/img/defaultLogo.png';

const SignUp = function () {
    const [fullName, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history= useHistory();
    const signUp = async (e) => {
        e.preventDefault();

        const response = await post(apiRoute.signUp, {
            fullName,
            email,
            password
        });
        if (response.error) {
            return undefined;
        }
        Swal.fire({
            title: 'Success!',
            text: 'SignUp Success',
            icon: 'success',
            confirmButtonText: 'Ok'
        });
        history.push('/login')
    }
    
    return (
        <div className="col-md-12 d-flex justify-content-center align-items-center" >
            <Container >
                <Row style={{ marginTop: '6rem' }}>
                    <Col md={{ span: 4, offset: 1 }} >
                        <Image src={deafultLogo} fluid />
                    </Col>
                    <Col md={{ span: 4, offset: 1 }} >
                        <div className='' >
                            <Card border="success">
                                <Card.Body>
                                    <Form className="col-md-12" onSubmit={(e) => signUp(e)}>
                                        <h2 style={{ margin: 'auto', marginBottom: '4rem', marginTop: '2rem' }} >Sign Up</h2>
                                        <Form.Group className="mb-3" controlId="formfullName">
                                            <Form.Label className="textLabel" >Full Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Full Name"
                                                onChange={(e) => setFullname(e.target.value)}
                                                value={fullName}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className="textLabel">Email address</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter email"
                                                onChange={(e) => setEmail(e.target.value)}
                                                value={email}
                                                required
                                            />

                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label className="textLabel" >Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Password"
                                                onChange={(e) => setPassword(e.target.value)}
                                                value={password}
                                                required
                                            />
                                        </Form.Group>

                                        <Container>
                                            <Row className="signUpRow">
                                                <Col>
                                                    <Button variant="primary" type="submit">
                                                        Submit
                                                    </Button>
                                                </Col>
                                                <Col>
                                                    <Link to="/login" className="align-self-end" style={{ color: 'green' }}>
                                                        Log In
                                                    </Link>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Form>
                                </Card.Body>
                            </Card>

                        </div>
                    </Col>
                </Row>
            </Container>

        </div>

    )
}

export default SignUp;