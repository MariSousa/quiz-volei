import React from "react";

const Radio = ({
  pergunta,
  opcoes,
  onChange,
  valorSelecionado,
  id,
  active,
}) => {
  if (active === false) return null;
  return (
    <>
      <fieldset>
        <legend>{pergunta}</legend>
        {opcoes.map((opcao, index) => (
          <label key={opcao}>
            <input
              type="radio"
              id={id}
              checked={valorSelecionado === opcao}
              value={opcao}
              onChange={onChange}
            />
            {opcao}
          </label>
        ))}
      </fieldset>
    </>
  );
};

export default Radio;
