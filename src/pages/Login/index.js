import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import { post } from '../../services/HttpRequest';
import { apiRoute } from '../../utils/default';
import Swal from 'sweetalert2';
import './styles.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import useLocalStorage from '../../hooks/UseLocalStorage';

const Login = function () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [, setToken] = useLocalStorage('TokenBuild', null);

    const login = async (e) => {
        e.preventDefault();
        const response = await post(apiRoute.login, {
            email,
            password
        });
        if (response.error) {
            return undefined;
        }
        Swal.fire({
            title: 'Success!',
            text: 'Log In Success',
            icon: 'success',
            confirmButtonText: 'Ok'
        });

        const {token= null}= response;
        if(token)
        {
            localStorage.removeItem('TokenBuild');
            setToken(token);
            window.location = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`;
        }
        
    }
    return (
        <div className='d-flex flex-row justify-content-center align-items-center'>
            <Card border="success" style={{justifyContent: 'center' }}>
                
                <Card.Img className="loginImg" src={logo} style={{borderRadius: '50%', backgroundColor: 'black', marginLeft: '20%', marginTop: '10%'}}>
                </Card.Img>
                <Card.Body>
                    <Form onSubmit={(e) => login(e)}>
                        <h2 style={{ margin: 'auto', marginBottom: '4rem', marginTop: '3rem' }} >Login</h2>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="textLabel">Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                                error={'hi'}
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
                                        Log In
                                    </Button>
                                </Col>
                                <Col>
                                    <Link to="/sign-up" className="align-self-end" style={{ color: 'green' }}>
                                        Sign Up
                                    </Link>
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                </Card.Body>
            </Card>

        </div>
    );

};

export default Login