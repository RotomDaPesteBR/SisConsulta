import styles from '../styles/pacientes.module.css'
import React, { useState, useEffect } from 'react';
import { Container, Col, Row, ListGroup , Button, ButtonGroup, Table, InputGroup, FormControl, Dropdown, DropdownButton } from 'react-bootstrap';
import Head from 'next/head'

function Home() {
    const [buscar, setBuscar] = useState("flex");
    const [cadastrar, setCadastrar] = useState("none");
    const [editar, setEditar] = useState("none");
    const [remover, setRemover] = useState("none");
    const [UFList, setUFList] = useState("");
    const [CidadeList, setCidadeList] = useState("");
    const [Estado, setEstado] = useState("");
    const [Cidade, setCidade] = useState("");
    const [Endereco, setEndereco] = useState("");
    const [ valorCep ,setValorCep ] = useState("");

    var headers = new Headers();
    var Init = { method: 'GET',
                   headers: headers,
                   mode: 'cors',
                   cache: 'default' };
    
    const UF_URL_TO_FETCH = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

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

        CEPInput: {
            width: "100%"
        },

        CEPButtonGroup: {
            width: "100%",
            marginTop: "5px",
            marginBottom: "5px",
        },

        CEPbutton: {
            width: "50%"
        },

    }

    useEffect(() => {
        populateUF();
    }, []);
    
    function populateUF(){
            fetch(UF_URL_TO_FETCH, Init)
              .then(function (response) {
                response.json().then(function (data) {
                  console.log(data);
                  let content = (
                  
                  data.map((element) => 
                      <option value={element.id} id={element.sigla} key={element.id}>{element.nome}</option>
                  )
                  )
                  console.log(content);
                  setUFList(content);
                  });
              })
              .catch(function (err) {
                console.error("Erro", err);
              });
            
    }

    function populateCidade(){
        let UF = document.getElementById("estado").value;
        const URL_TO_FETCH = "https://servicodados.ibge.gov.br/api/v1/localidades/estados/"+ UF +"/municipios";
        fetch(URL_TO_FETCH, Init)
          .then(function (response) {
            response.json().then(function (data) {
              console.log(data);
              let content = (
              
              data.map((element) => 
                  <option value={element.id} key={element.id}>{element.nome}</option>
              )
              )
              console.log(content);
              setCidadeList(content);
              });
          })
          .catch(function (err) {
            console.error("Erro", err);
          });
        
    }

    function buscarPorCEP() {
        let CEP = document.getElementById("cep").value;
        if (CEP.length == 9){
            const CEP_URL = "https://viacep.com.br/ws/" + CEP + "/json/";
            fetch(CEP_URL, Init)
            .then(function (response) {
                response.json().then(function (data) {
                    if(data.erro == undefined){
                        console.log(data);
                        document.getElementById("bairro").value = data.bairro;
                        document.getElementById("endereco").value = data.logradouro;
                        let UF = document.getElementById(data.uf).value;
                        document.getElementById("estado").value = UF;
                        populateCidade();
                        setTimeout(function(){document.getElementById("cidade").value = data.ibge;},100)
                    } else {

                    }
                });
            })
            .catch(function (err) {
                console.error("Erro", err);
            });
        }
    }

    function buscarCEP() {
        let estadoRef = document.getElementById("estado");
        let uf = estadoRef[estadoRef.selectedIndex].id;
        let cidadeRef = document.getElementById("cidade");
        let localidade = cidadeRef[cidadeRef.selectedIndex].innerText;
        console.log(localidade)
        let logradouro = document.getElementById("endereco").value;
        let ENDERECO_URL = "https://viacep.com.br/ws/" + uf + "/" + localidade + "/" + logradouro + "/json/";
                    console.log(ENDERECO_URL)
                    fetch(ENDERECO_URL, Init)
                    .then(function (response) {
                        response.json().then(function (data) {
                            if (data[0].cep == undefined){
                            }
                            else{
                            console.log(data);
                            setValorCep(data[0].cep);
                            setTimeout(function(){buscarPorCEP()},50)
                            }
                        });
                    })
                    .catch(function (err) {
                        console.error("Erro", err);
                    });
    }

    function CepChange(ref) {
        let value = ref.value;
        value = value.replace(/\D/g,"");
        value = value.replace(/^(\d{5})(\d)/,"$1-$2");
        setValorCep(value)
        console.log(value);
    }

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

    return  <div className={styles.container}>
                <Head>
                    <title>Relat??rios</title>
                </Head>
                <div id="navbar" className={styles.navbar}></div>
                <Container fluid>
                    <Row>
                        <Col className={styles.col1}>
                            <Row>
                                <h1 className={styles.title}>
                                    Relat??rios
                                </h1>
                            </Row>
                            
                        </Col>
                        <Col className={styles.col2}>
                                
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