import fieldValidator, { dateValidator } from './validator';

describe('Field Validator', () => {
  it('fieldValidator checks relevant fields and fails for others', () => {
    expect(fieldValidator('checkbox', true)).toEqual({
      valid: false,
      message: 'Invalid field name',
    });
    expect(fieldValidator('email', '')).not.toEqual({
      valid: false,
      message: 'Invalid field name',
    });
    expect(fieldValidator('username', '')).not.toEqual({
      valid: false,
      message: 'Invalid field name',
    });
    expect(fieldValidator('password', '')).not.toEqual({
      valid: false,
      message: 'Invalid field name',
    });
    expect(fieldValidator('firstName', '')).not.toEqual({
      valid: false,
      message: 'Invalid field name',
    });
    expect(fieldValidator('lastName', '')).not.toEqual({
      valid: false,
      message: 'Invalid field name',
    });
  });

  it('first name is at least 2 characters and only letters', () => {
    expect(fieldValidator('firstName', 'h')).toEqual({
      valid: false,
      message: 'Name must be at least two characters and only letters.',
    });
    expect(fieldValidator('firstName', 'h1')).toEqual({
      valid: false,
      message: 'Name must be at least two characters and only letters.',
    });
    expect(fieldValidator('firstName', 'ha ')).toEqual({
      valid: false,
      message: 'Name must be at least two characters and only letters.',
    });
    expect(fieldValidator('firstName', 'h_ffff ')).toEqual({
      valid: false,
      message: 'Name must be at least two characters and only letters.',
    });
    expect(fieldValidator('firstName', 'Pal')).toEqual({
      valid: true,
      message: '',
    });
  });

  it('last name is at least 2 characters and only letters', () => {
    expect(fieldValidator('lastName', 'h')).toEqual({
      valid: false,
      message: 'Name must be at least two characters and only letters.',
    });
    expect(fieldValidator('lastName', 'h1')).toEqual({
      valid: false,
      message: 'Name must be at least two characters and only letters.',
    });
    expect(fieldValidator('lastName', 'ha ')).toEqual({
      valid: false,
      message: 'Name must be at least two characters and only letters.',
    });
    expect(fieldValidator('lastName', 'h_ffff ')).toEqual({
      valid: false,
      message: 'Name must be at least two characters and only letters.',
    });
    expect(fieldValidator('lastName', 'Pal')).toEqual({
      valid: true,
      message: '',
    });
  });

  it('username may not contain any spaces or special character', () => {
    expect(fieldValidator('username', '')).toEqual({
      valid: false,
      message: 'Username may not contain any spaces or special character.',
    });
    expect(fieldValidator('username', 'h1')).toEqual({
      valid: true,
      message: '',
    });
    expect(fieldValidator('username', 'ha ')).toEqual({
      valid: false,
      message: 'Username may not contain any spaces or special character.',
    });
    expect(fieldValidator('username', 'h_ffff$')).toEqual({
      valid: false,
      message: 'Username may not contain any spaces or special character.',
    });
    expect(fieldValidator('username', 'Pal')).toEqual({
      valid: true,
      message: '',
    });
  });

  it('password more than 8 characters', () => {
    expect(fieldValidator('password', '')).toEqual({
      valid: false,
      message: 'Password must be at least 8 characters.',
    });
    expect(fieldValidator('password', 'h_ffff$3')).toEqual({
      valid: true,
      message: '',
    });
    expect(fieldValidator('password', 'Pal')).toEqual({
      valid: false,
      message: 'Password must be at least 8 characters.',
    });
    expect(fieldValidator('password', '        ')).toEqual({
      valid: false,
      message: 'Password must be at least 8 characters.',
    });
  });

  it('email validates correctly', () => {
    expect(fieldValidator('email', 'test@testmail')).toEqual({
      valid: false,
      message: 'Not a valid email address.',
    });
    expect(fieldValidator('email', 'test@testmail.com')).toEqual({
      valid: true,
      message: '',
    });
    expect(fieldValidator('email', 'testtestmail.com')).toEqual({
      valid: false,
      message: 'Not a valid email address.',
    });
    expect(fieldValidator('email', 't@t.c')).toEqual({
      valid: false,
      message: 'Not a valid email address.',
    });
    expect(fieldValidator('email', '        ')).toEqual({
      valid: false,
      message: 'Not a valid email address.',
    });
  });
});

describe('Date Validator', () => {
  it('date validator fails with invalid dates', () => {
    expect(dateValidator('hi', 'bye')).toEqual({
      valid: false,
      message: 'Dates are invalid.',
    });

    expect(dateValidator('hi', 1)).toEqual({
      valid: false,
      message: 'Dates are invalid.',
    });
  });

  it('date validator fails when second date comes before first', () => {
    expect(dateValidator('2019-07-16T22:50:05.539Z', '2019-07-15T22:50:05.539Z')).toEqual({
      valid: false,
      message: 'End date must come after start date.',
    });
  });

  it('date validator succeeds when second date comes after first', () => {
    expect(dateValidator('2019-07-16T22:50:05.539Z', '2019-07-17T22:50:05.539Z')).toEqual({
      valid: true,
      message: '',
    });
  });
});
