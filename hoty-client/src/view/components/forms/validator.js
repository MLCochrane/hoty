import Dayjs from 'dayjs';

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
      const usernameValid = value.match(/^[a-zA-Z0-9_]{2,}$/i);
      result.valid = !!usernameValid;
      result.message = usernameValid ? '' : 'Username may not contain any spaces or special character.';
      break;
    }
    case 'password':
    {
      const passValid = value.match(/^([^\s]){8,}$/);
      result.valid = !!passValid;
      result.message = passValid ? '' : 'Password must be at least 8 characters.';
      break;
    }
    default:
      result.valid = false;
      result.message = 'Invalid field name';
      break;
  }

  return result;
};

export function dateValidator(dateOne, dateTwo) {
  const djOne = Dayjs(dateOne);
  const djTwo = Dayjs(dateTwo);

  if (!djOne.isValid() || !djTwo.isValid()) {
    return {
      valid: false,
      message: 'Dates are invalid.',
    };
  }

  const res = djOne.isBefore(djTwo);

  return {
    valid: res,
    message: res ? '' : 'End date must come after start date.',
  };
}
