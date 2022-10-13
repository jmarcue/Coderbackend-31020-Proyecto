import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync();
const hash = (password) => {
  return bcrypt.hashSync(password, salt);
};

const unhash = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

export { hash, unhash }
