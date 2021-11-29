function failureConfig(setHeader, setButtons, setRedirect, setShowModal) {
  setHeader('Algo deu errado!');
  setButtons(1);
  setRedirect(false);
  setShowModal(true);
}

function prepareBody(value, description, typeName) {
  const formatValue = Number(value?.replace('R$ ', '').replace(',', ''));
  const body = {
    description,
    value: formatValue,
    type: typeName
  };
  return body;
}

export { failureConfig, prepareBody };
