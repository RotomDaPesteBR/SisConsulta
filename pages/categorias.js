import styles from '../styles/categorias.module.css'
import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Head from 'next/head'

export default function Home(){
    const [imgUrl, setImgUrl] = useState("");
    const [listItems, setListItems] = useState();
    

    const key = "f0ccfff3-cda6-4cf8-a3df-5bc0f465dcd5";
    var headers = new Headers();
    headers.append("x-api-key", key);
    
    var Init = { method: 'GET',
                   headers: headers,
                   mode: 'cors',
                   cache: 'default' };

    const URL_TO_FETCH = "https://api.thedogapi.com/v1/categories";
    const IMAGE_URL_TO_FETCH = "https://api.thedogapi.com/v1/images/search?category_ids=";

    const stylesheet = {
        img: {
            objectPosition: "center center",
            width: "100%",
            height: "100%",
            backgroundRepeat: "no-repeat",
            objectFit: "contain",
            backgroundSize: "cover",
            backgroundImage: "URL(" + imgUrl + ")"
        }
    }

    useEffect(() => {
        populateList()
        updateImgUrl(1);
    }, []);
    
    function populateList(){
            fetch(URL_TO_FETCH, Init)
              .then(function (response) {
                response.json().then(function (data) {
                    console.log(data);
                        let content = 
                        <div>
                        {data.map((element) => 
                            <il>
                                <button onClick={()=>updateImgUrl(element.id)} className={styles.items}>
                                    {element.name} 
                                </button>   
                            </il>
                        )}
                        </div>
                        console.log(content);
                        setListItems(content);
                });
              })
              .catch(function (err) {
                console.error("Erro", err);
              });
    }

    function updateImgUrl(id){
        const url = IMAGE_URL_TO_FETCH + id;
        fetch(url, Init)
          .then(function (response) {
            response.json().then(function (data) {
              console.log(data);
                //setImgUrl(data[0].url);
              });
          })
          .catch(function (err) {
            console.error("Erro", err);
          });
        
    }   

    return  <div className={styles.container}>
                <Head>
                    <title>Categorias</title>
                </Head>
                <div id="navbar" className={styles.navbar}></div>
                <Container fluid>
                    <Row>
                        <Col className={styles.col1}>
                            <Row>
                                <h1 className={styles.title}>
                                    Categorias
                                </h1>
                            </Row>
                            <Row className={styles.buttons}>
                                    <ul className={styles.list} id="lista">
                                        {listItems}
                                    </ul>
                            </Row>
                        </Col>
                        <Col className={styles.col2} style={stylesheet.img}>
                               
                            
                        </Col>
                    </Row>
                </Container>
            
            </div>


    
}