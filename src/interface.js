import React from "react";
import Radio from "./componentes/Form/Radio";
import dados from "./componentes/json/perguntas.json";
import "./componentes/Interface.css";

const Interface = () => {
  //Guardar a resposta do usuário dentro de um id para depois fazer a comparação com as respostas certas
  const [respostas, setRespostas] = React.useState(
    dados.reduce((acumulador, atual) => {
      acumulador[atual.id] = atual.id;
      return acumulador;
    }, {})
  );
  const [slide, setSlide] = React.useState(0);
  const [resultadoFinal, setResultadoFinal] = React.useState(null);

  function handleChange({ target }) {
    setRespostas({
      ...respostas,
      [target.id]: target.value,
    });
  }

  function resultado() {
    const corretas = dados.filter(
      ({ id, resposta }) => respostas[id] === resposta
    );
    const incorretas = dados.filter(
      ({ id, resposta }) => respostas[id] !== resposta
    );
    setResultadoFinal({ corretas, incorretas });
  }

  function proximoSlide() {
    if (slide < dados.length - 1) {
      setSlide(slide + 1);
    } else {
      setSlide(slide + 1);
      resultado();
    }
  }

  function anteriorSlide() {
    if (slide > 0 && slide <= dados.length) {
      setSlide(slide - 1);
    }
  }

  function handleStart() {
    setSlide(0);
    setResultadoFinal(null);
    setRespostas({});
  }

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      {dados.map((pergunta, index) => (
        <Radio
          active={slide === index}
          key={pergunta.id}
          {...pergunta}
          onChange={handleChange}
          valorSelecionado={respostas[pergunta.id]}
        />
      ))}
      {resultadoFinal ? (
        <div className="resultadoFinal">
          <h3>Perguntas corretas:</h3>
          {resultadoFinal.corretas.map(({ id, pergunta, resposta }) => (
            <ul key={id} className="grupoCorreto">
              <li className="corretas"> {pergunta}</li>
              <li className="corretas"> {resposta}</li>
            </ul>
          ))}

          <h3>Perguntas incorretas:</h3>
          {resultadoFinal.incorretas.map(({ id, pergunta, resposta }) => (
            <ul key={id} className="grupoErrado">
              <li className="incorretas pergunta">{pergunta}</li>
              <li className="incorretas">{respostas[id]}</li>
              <li className="respostaCerta">Resposta certa: {resposta}</li>
            </ul>
          ))}

          <button onClick={handleStart} className="botaoInicio">
            Início
          </button>
        </div>
      ) : (
        <>
          <button onClick={anteriorSlide} className="botaoAnterior">
            {" "}
            Anterior{" "}
          </button>
          <button onClick={proximoSlide} className="botaoProximo">
            {" "}
            Próximo{" "}
          </button>
        </>
      )}
    </form>
  );
};

export default Interface;
