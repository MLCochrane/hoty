export default (name, value) => {
  const result = {
    valid: '',
    message: '',
  };
  switch (name) {
    case 'email':
    {
      const emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      result.valid = !!emailValid;
      result.message = emailValid ? '' : 'Not a valid email address.';
      break;
    }
    case 'firstName':
    {
      const firstNameValid = value.match(/^[a-zA-z]{2,}$/);
      result.valid = !!firstNameValid;
      result.message = firstNameValid ? '' : 'Name must be at least two characters and only letters.';
      break;
    }
    case 'lastName':
    {
      const lastNameValid = value.match(/^[a-zA-z]{2,}$/);
      result.valid = !!lastNameValid;
      result.message = lastNameValid ? '' : 'Name must be at least two characters and only letters.';
      break;
    }
    case 'username':
    {
      const usernameValid = value.match(/^[a-zA-Z0-9_]*$/i);
      result.valid = !!usernameValid;
      result.message = usernameValid ? '' : 'Username may not contain any spaces or special character.';
      break;
    }
    case 'password':
    {
      const passValid = value.match(/(.){8,}/);
      result.valid = !!passValid;
      result.message = passValid ? '' : 'Username may not contain any spaces or special character.';
      break;
    }
    default:
      result.valid = true;
      break;
  }

  return result;
};
