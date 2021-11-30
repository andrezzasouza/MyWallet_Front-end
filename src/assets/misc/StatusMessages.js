const check = 'Verifique e tente novamente.';

function ifNoError(err) {
  if (!err.response) {
    return 'Algo deu errado. Por favor, tente novamente.';
  }
}

function messageConfig(err) {
  const { status } = err.response;
  const { message } = err.response.data;
  const serverMessage = '';
  const displayMessage = '';
  return { status, serverMessage, message, displayMessage };
}

const signUpErr = (err) => {
  ifNoError(err);
  let { displayMessage, serverMessage } = messageConfig(err);
  const { status, message } = messageConfig(err);

  if (status === 400) {
    if (message?.includes('email')) {
      displayMessage = `E-mail inválido. ${check}`;
    } else if (message?.includes('repeatPassword')) {
      displayMessage = `A confirmação da senha deve ser igual à senha. ${check}`;
    } else if (message?.includes('password')) {
      displayMessage = `A senha deve ter pelo menos 6 caracteres. ${check}`;
    } else if (message?.includes('name')) {
      displayMessage = `O nome deve conter pelo menos 2 letras. ${check}`;
    }
    serverMessage = displayMessage;
  }
  if (status === 409 || status === 500) {
    serverMessage = message;
  }
  return serverMessage;
};

const loginErr = (err) => {
  ifNoError(err);
  let { displayMessage, serverMessage } = messageConfig(err);
  const { status, message } = messageConfig(err);

  if (status === 400) {
    if (message?.includes('email')) {
      displayMessage = `E-mail inválido. ${check}`;
    } else if (message?.includes('password')) {
      displayMessage = `A senha deve ter pelo menos 6 caracteres. ${check}`;
    }
    serverMessage = displayMessage;
  }
  if (status === 401 || status === 500 || status === 404) {
    serverMessage = message;
  }
  return serverMessage;
};

const homeErr = (err) => {
  ifNoError();
  let { serverMessage } = messageConfig(err);
  const { status, message } = messageConfig(err);
  if (status === 401 || status === 500 || status === 403) {
    serverMessage = message;
  }
  return serverMessage;
};

const entryErr = (err) => {
  ifNoError(err);
  let { displayMessage, serverMessage } = messageConfig(err);
  const { status, message } = messageConfig(err);

  if (status === 400) {
    if (message?.includes('description')) {
      displayMessage = 'A descrição deve ter pelo menos 2 caracteres.';
    } else if (message?.includes('value')) {
      displayMessage = 'O valor mínimo deve ser de pelo menos R$ 0,01.';
    }
    serverMessage = displayMessage;
  }

  if (status === 401 || status === 500 || status === 403) {
    serverMessage = message;
  }
  return serverMessage;
};

export { signUpErr, loginErr, entryErr, homeErr };
