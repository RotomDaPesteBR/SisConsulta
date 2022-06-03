import styles from '../styles/paginacao.module.css'
import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Head from 'next/head'

export default function Home(){
    const [imgUrl, setImgUrl] = useState("");
    const [page, setPage] = useState(1);
    
    

    const key = "f0ccfff3-cda6-4cf8-a3df-5bc0f465dcd5";
    var headers = new Headers();
    headers.append("x-api-key", key);
    
    var Init = { method: 'GET',
                   headers: headers,
                   mode: 'cors',
                   cache: 'default' };

    const URL_TO_FETCH = "https://api.thedogapi.com/v1/images/search?limit=1&page=";

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
        updateImgUrl();
    }, []);

    function upPage() {
        pageNumber = pageNumber + 1;
        setPage(pageNumber);
        updateImgUrl();
    }

    function downPage() {
        if (pageNumber = 1){}
        else{
        pageNumber = pageNumber - 1;
        setPage(pageNumber);
        updateImgUrl();
        }
    }

    function changePage(number) {
        pageNumber = number;
        setPage(pageNumber);
        updateImgUrl();
    }

    function updateImgUrl(){
        const url = URL_TO_FETCH + page + "&order=DESC";
        console.log(url)
        fetch(url, Init)
          .then(function (response) {
            response.json().then(function (data) {
              console.log(data);
                setImgUrl(data[0].url);
              });
          })
          .catch(function (err) {
            console.error("Erro", err);
          });
        
    }   

    return  <div className={styles.container}>
                <Head>
                    <title>Paginação</title>
                </Head>
                <div id="navbar" className={styles.navbar}></div>
                <Container fluid>
                    <Row>
                        <Col className={styles.col1}>
                            <Row>
                                <h1 className={styles.title}>
                                    Paginação
                                </h1>
                            </Row>
                            <Row className={styles.buttons}>
                                    <div className={styles.paginador}>
                                        <Row>
                                            <Col>
                                            <button onClick={()=>{if(page == 1){setPage(1)}else{setPage(page - 1)}}} className={styles.items}>
                                            {"<"}
                                            </button> 
                                            </Col>
                                            <Col>
                                            <input type="number" value={page} onChange={e=>setPage(e.target.value)} className={styles.page}></input>
                                            </Col>  
                                            <Col>
                                            <button onClick={()=>setPage(parseInt(page, 10) + 1)} className={styles.items}>
                                            {">"} 
                                            </button> 
                                            </Col> 
                                        </Row>
                                        <div className={styles.busca}>
                                        <button onClick={()=>updateImgUrl()} className={styles.items}>
                                            Ir 
                                        </button>
                                        </div>
                                    </div>
                                    
                                            
                                            
                                        
                            </Row>
                        </Col>
                        <Col className={styles.col2} style={stylesheet.img}>
                               
                            
                        </Col>
                    </Row>
                </Container>
            
            </div>


    
}
