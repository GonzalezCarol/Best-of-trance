import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useForm from '../../../hooks/useForm';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';

function CadastroVertente() {
  const iniValues = {
    nome: '',
    descricao: '',
    cor: '',
  };

  const [vertentes, setVertentes] = useState([]);

  const { handleChange, values, clearForm } = useForm(iniValues);

  // ============

  useEffect(() => {
    if (window.location.href.includes('localhost')) {
      const URL = window.location.hostname.includes('localhost')
        ? 'http://localhost:8080/vertentes'
        : 'https://bestoftrance.herokuapp.com/vertentes';
      fetch(URL)
        .then(async (serverResponse) => {
          if (serverResponse.ok) {
            const response = await serverResponse.json();
            setVertentes([
              ...response,
            ]);
            return;
          }
          throw new Error('Não foi possível pegar os dados');
        });
    }
  }, []);

  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria:
        {values.nome}
      </h1>

      <form onSubmit={function handleSubmit(infoEvent) {
        infoEvent.preventDefault();

        setVertentes([
          ...vertentes,
          values,
        ]);

        clearForm();
      }}
      >

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

        <button type="button">
          Cadastrar
        </button>
      </form>

      <ul>
        {vertentes.map((vertente) => (
          <li key={`${vertente.nome}`}>
            {vertente.titulo}
          </li>
        ))}
      </ul>

      <Link to="/">
        Ir para home
      </Link>
    </PageDefault>
  );
}

export default CadastroVertente;
