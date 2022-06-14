import styles from '../styles/pacientes.module.css'
import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Head from 'next/head'
import Image from 'next/image'

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
    /*const [imgUrl, setImgUrl] = useState("");
    const key = "f0ccfff3-cda6-4cf8-a3df-5bc0f465dcd5";
    
    headers.append("x-api-key", key);
    */

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
                        setTimeout(function(){document.getElementById("cidade").value = data.ibge;},50)
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
                                <h1 style={stylesheet.buscar}>Buscar</h1>
                                <div className={styles.cadastrar} style={stylesheet.cadastrar}>
                                    <label>Nome: </label>
                                    <input type="text" id="name" name="name" required />

                                    <label>Sexo: </label>
                                    <select name="sexo" id="sexo">
                                        <option value="masculino">Masculino</option>
                                        <option value="feminino">Feminino</option>
                                        <option value="outros">Outros</option>
                                    </select>

                                    <label>Data de Nascimento: </label>
                                    <input type="text" id="name" name="name" required />

                                    <label>Telefone: </label>
                                    <input type="text" id="name" name="name" />

                                    <label>Celular: </label>
                                    <input type="text" id="name" name="name" required />

                                    <label>Responsavel: </label>
                                    <input type="text" id="name" name="name" required />

                                    <label>CEP: </label>
                                    <input type="text" id="cep" name="cep" maxLength="9" value={valorCep} onChange={e => CepChange(e.target) }/>
                                    <br></br>
                                    <button onClick={()=>buscarPorCEP()}>Buscar por CEP</button>
                                    <br></br>
                                    <button onClick={()=>buscarCEP()}>Buscar CEP</button>

                                    <label>Estado: </label>
                                    <select name="estado" id="estado" onChange={()=>populateCidade()}>
                                        <option value=""></option>
                                        {UFList}
                                    </select>

                                    <label>Cidade: </label>
                                    <select name="cidade" id="cidade">
                                        <option value=""></option>
                                        {CidadeList}
                                    </select>
                                    
                                    <label>Bairro: </label>
                                    <input type="text" id="bairro" name="bairro" required />

                                    <label>Endereço: </label>
                                    <input type="text" id="endereco" name="endereco" required />

                                    <label>Convênio: </label>
                                    <select name="convenio" id="convenio">
                                        <option value="iamspe">Iamspe</option>
                                    </select>
                                </div>
                                <h1 style={stylesheet.editar}>Editar</h1>
                                <h1 style={stylesheet.remover}>Remover</h1>
                                
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