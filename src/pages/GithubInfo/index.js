import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Card, Image } from "react-bootstrap";
import { useLocation } from 'react-router-dom';
import useLocalStorage from '../../hooks/UseLocalStorage';
import { apiRoute } from '../../utils/default';
import ListRepositories from '../../components/ListRepositories';
import { get } from '../../services/HttpRequest';
import './styles.css';
import build from '../../assets/img/build.png';

const GithubInfo = function () {

    const [favorites, setFavorites] = useState([]);
    const [token] = useLocalStorage('TokenBuild');
    const [gitToken, setgitToken] = useLocalStorage('gitAuth', null);
    const [gitCode, setGitCode] = useState(null);

    const queryParams = new URLSearchParams(useLocation().search);
    const code = queryParams.get('code');

    

    const getgitToken = async () => {
        if (code && !gitToken) {
            setGitCode(code);
            const url = `/access_token?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}&code=${code}`;
            const response = await fetch(url, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    Accept: 'application/json',
                },
            });
            const data = await response.json();
            setgitToken(data.access_token);
        }
    };
    const logOut = () => {
        localStorage.removeItem('TokenBuild');
        localStorage.removeItem('gitAuth');
        window.location = '/sign-up';
    }
    useEffect(async () => {
        
        if (!gitToken) {
            await getgitToken();
            
        }
    }, [gitCode, setgitToken, gitToken]);
    return (
        <div className="justify-content-center align-items-center">
            <Container >

                <Row className="githubInfoRow">
                    <Col md={{ span: 4, offset: 8 }}>
                        <Button variant="outline-danger" style={{ marginTop: '4rem' }} onClick={() => logOut()}>Log Out</Button>
                    </Col>
                    <Col md={{ span: 1 }}>
                        <Image className="logoImg" src={build} />
                    </Col>
                </Row>
                {/*  */}
                <Row className="githubInfoRow justify-content-center align-items-center">
                    {gitToken && <ListRepositories favorites={favorites} setFavorites={setFavorites} />}
                </Row>
            </Container>
        </div>
    );
}

export default GithubInfo;