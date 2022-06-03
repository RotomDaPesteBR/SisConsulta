import styles from '../styles/index.module.css'
import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Image from 'next/image'
import icon from '../assets/icon.svg'

function Home() {
    /*const [imgUrl, setImgUrl] = useState("");
    const key = "f0ccfff3-cda6-4cf8-a3df-5bc0f465dcd5";
    var headers = new Headers();
    headers.append("x-api-key", key);
    
    var Init = { method: 'GET',
                   headers: headers,
                   mode: 'cors',
                   cache: 'default' };

    const URL_TO_FETCH = "https://api.thedogapi.com/v1/images/search";*/

    const stylesheet = {
        img: {
            objectPosition: "center center",
            width: "100%",
            height: "100%",
            backgroundRepeat: "no-repeat",
            objectFit: "contain",
            backgroundSize: "cover",
            //backgroundImage: "URL(" + icon.src + ")",
        },

        topbutton: {
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px"
        },

        bottombutton: {
            borderBottomLeftRadius: "5px",
            borderBottomRightRadius: "5px"
        }
    }

    /*useEffect(() => {
        updateImgUrl();
    }, []);
    
    function updateImgUrl(){
            fetch(URL_TO_FETCH, Init)
              .then(function (response) {
                response.json().then(function (data) {
                  console.log(data);
                    setImgUrl(data["0"].url);
                  });
              })
              .catch(function (err) {
                console.error("Erro", err);
              });
            
    }*/

    console.log(icon)
    return  <div className={styles.container}>
                <div id="navbar" className={styles.navbar}></div>
                <Container fluid>
                    <Row>
                        <Col className={styles.col1}>
                            <Row>
                                <h1 className={styles.title}>
                                    SisConsulta
                                </h1>
                            </Row>
                            <Row className={styles.buttons}>
                                    <ul className={styles.list}>
                                        <li><a href='./consultas' className={styles.itemstext}><button className={styles.items} style={stylesheet.topbutton}>Consultas</button></a></li>
                                        <li><a href='./pacientes' className={styles.itemstext}><button className={styles.items}>Pacientes</button></a></li>
                                        <li><a href='./medicos' className={styles.itemstext}><button className={styles.items}>Médicos</button></a></li>
                                        <li><a href='./convenios' className={styles.itemstext}><button className={styles.items}>Convênios</button></a></li>
                                        <li><a href='./relatorios' className={styles.itemstext}><button className={styles.items} style={stylesheet.bottombutton}>Relatórios</button></a></li>
                                    </ul>
                            </Row>
                        </Col>
                        <Col className={styles.col2} style={stylesheet.img}>
                            <Row className={styles.iconSpace}>

                            </Row>
                            <Row className={styles.iconContainer}>
                                <Image src={icon} className={styles.icon}></Image>
                            </Row>
                            <Row className={styles.iconSpace}>

                            </Row>
                        </Col>
                    </Row>
                </Container>
                
                
            </div>
}

export default Home

/*
                                        <li>
                                            <button onClick={()=>updateImgUrl()} className={styles.items} style={stylesheet.topbutton}>
                                                Medicos
                                            </button>
                                        </li> */