import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { BiBookmark } from 'react-icons/bi';
import { apiRoute } from '../../utils/default';
import { post } from '../../services/HttpRequest';
import useLocalStorage from '../../hooks/UseLocalStorage';


const gqlRepositories = gql`
 query repoQuery($after: String) {
    viewer {
      repositories(first: 20, after: $after) {
        nodes {
          id
          name
          description
          createdAt
          owner {
            login
          }
        }
      }
    }
  }`;
const ListRepositories = function ({ favorites, setFavorites }) {
    const [token] = useLocalStorage('TokenBuild');
    const {
        loading, error, data,
    } = useQuery(gqlRepositories, {
        variables: { after: null },
    });
    
    const [loadingGraph, setLoadingGraph] = useState(false);
    if (loading) {
        if (!loadingGraph) {
            setLoadingGraph(true);
        }
        return 'Loading...'
    }

    if (error) {
        console.log(error)
        return `Error: ${error.message}`;
    }

    const repositories = data.viewer.repositories.nodes;

    const saveFavorite= async (req)=>{
        const data={
            name: req.name
        }
        const response = await post(apiRoute.saveFavorite, data, token);
        if (response.error) {
            return undefined;
        }
        await setFavorites(response.favorites);
    }
    return (
        <Container>
            <Row>
            <h1> List Repositories </h1>
                {repositories.map((x, k) => (
                    <Col key={k} xs={12} md={6} lg={4}>
                        <Card bg='info' >
                            <Card.Body>
                                <Card.Title style={{fontWeight: 'bold'}}>{x.name}</Card.Title>
                                <Card.Text>{'Owner: '} {x.owner.login}</Card.Text>
                                <Button variant="success"  onClick={() => saveFavorite(x)} > <BiBookmark/></Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

           { favorites.length>0 && <Row style={{paddingTop: '6rem'}} >
                <h1> Favorites </h1>
                {favorites.map((x, k) => (
                    <Col key={k} xs={12} md={6} lg={4}>
                        <Card bg='success' >
                            <Card.Body>
                                <Card.Title>{x}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            }
        </Container>
    );
}
export default ListRepositories;