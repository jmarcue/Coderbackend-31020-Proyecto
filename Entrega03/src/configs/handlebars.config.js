import { __dirname, __dirJoin } from '../utils/helper.util.js';

export const handlebar = {
  extname: ".hbs",
  defaultLayout: "index",
  layoutsDir: __dirJoin(__dirname, '../../public/views/layouts'),
  partialsDir: __dirJoin(__dirname, '../../public/views')
}