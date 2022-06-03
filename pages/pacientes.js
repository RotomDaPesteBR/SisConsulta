import styles from '../styles/index.module.css'
import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Head from 'next/head'
import Image from 'next/image'
import icon from '../assets/icon.svg'

function Home() {
    const [buscar, setBuscar] = useState("flex");
    const [cadastrar, setCadastrar] = useState("none");
    const [editar, setEditar] = useState("none");
    const [remover, setRemover] = useState("none");
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

        topbutton: {
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px"
        },

        bottombutton: {
            borderBottomLeftRadius: "5px",
            borderBottomRightRadius: "5px"
        },

        buscar: {
            display: buscar,
        },

        cadastrar: {
            display: cadastrar,
        },
        editar: {
            display: editar,
        },

        remover: {
            display: remover,
        },
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

    function showBuscar() {
        setBuscar("flex");
        setCadastrar("none");
        setEditar("none");
        setRemover("none");
    }

    function showCadastrar() {
        setBuscar("none");
        setCadastrar("flex");
        setEditar("none");
        setRemover("none");
    }

    function showEditar() {
        setBuscar("none");
        setCadastrar("none");
        setEditar("flex");
        setRemover("none");
    }

    function showRemover() {
        setBuscar("none");
        setCadastrar("none");
        setEditar("none");
        setRemover("flex");
    }

    console.log(icon)
    return  <div className={styles.container}>
                <Head>
                    <title>Pacientes</title>
                </Head>
                <div id="navbar" className={styles.navbar}></div>
                <Container fluid>
                    <Row>
                        <Col className={styles.col1}>
                            <Row>
                                <h1 className={styles.title}>
                                    Pacientes
                                </h1>
                            </Row>
                            <Row className={styles.buttons}>
                                    <ul className={styles.list}>
                                        <li>
                                            <button onClick={()=>showBuscar()} className={styles.items} style={stylesheet.topbutton}>
                                                Buscar
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={()=>showCadastrar()} className={styles.items}>
                                                Cadastrar
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={()=>showEditar()} className={styles.items}>
                                                Editar
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={()=>showRemover()} className={styles.items} style={stylesheet.bottombutton}>
                                                Remover
                                            </button>
                                        </li>
                                    </ul>
                            </Row>
                        </Col>
                        <Col className={styles.col2} style={stylesheet.img}>
                            <Row>
                                <h1 style={stylesheet.buscar}>Buscar</h1>
                                <h1 style={stylesheet.cadastrar}>Cadastrar</h1>
                                <h1 style={stylesheet.editar}>Editar</h1>
                                <h1 style={stylesheet.remover}>Remover</h1>
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