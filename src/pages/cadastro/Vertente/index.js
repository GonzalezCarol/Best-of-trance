import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';

function CadastroVertente() {
  const iniValues = {
    nome: '',
    descricao: '',
    cor: '',
  }
  const [vertentes, setVertentes] = useState([]);
  const [values, setValues] = useState(iniValues);


  function setValue(key, value) {

    setValues({
      ...values,
      [key]: value, 
    })
  }

  function handleChange(infoEvent) {
    setValue(
      infoEvent.target.getAttribute('name'),
      infoEvent.target.value
    );
  }

  // ============

  useEffect(() => {
    if(window.location.href.includes('localhost')) {
      const URL = 'http://localhost:8080/categorias'; 
      fetch(URL)
       .then(async (serverResponse) =>{
        if(serverResponse.ok) {
          const response = await serverResponse.json();
          setVertentes(response);
          return; 
        }
        throw new Error('Não foi possível pegar os dados');
       })
    }    
  }, []);

  return (
    <PageDefault>
      <h1>Cadastro de Categoria: {values.nome}</h1>

      <form onSubmit={function handleSubmit(infoEvent) {
          infoEvent.preventDefault();

          setVertentes([
            ...vertentes,
            values
          ]);

          setValues(iniValues)
      }}>

        <FormField
          label="Nome da Vertente"
          type="text"
          name="nome"
          value={values.nome}
          onChange={handleChange}
        />

        <FormField
          label="Descrição"
          type="textarea"
          name="descricao"
          value={values.descricao}
          onChange={handleChange}
        />
       

        <FormField
          label="Cor"
          type="color"
          name="cor"
          value={values.cor}
          onChange={handleChange}
        />

        <button>
          Cadastrar
        </button>
      </form>
      

      <ul>
        {vertentes.map((vertente, indice) => {
          return (
            <li key={`${vertente}${indice}`}>
              {vertente.titulo}
            </li>
          )
        })}
      </ul>

      <Link to="/">
        Ir para home
      </Link>
    </PageDefault>
  )
}

export default CadastroVertente;