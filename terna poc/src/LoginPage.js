import React from 'react';
import {Button, Container, Form} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";

export const LoginPage = () => {
    const navigateFunction = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        navigateFunction('/misuratore')
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
            <Form onSubmit={handleLogin} style={{width: '300px'}}>
                <h2 className="text-center">Login</h2>
                <div className='pb-4'/>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Nome utente</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="inserisci il tuo nome utente"
                        value='admin'
                    />
                </Form.Group>

                <div className='pb-4'/>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value='admin'
                    />
                </Form.Group>
                <div className='pb-4'/>

                <Button variant="primary" type="submit" className="w-100">
                    Login
                </Button>
            </Form>
        </Container>
    );
};

