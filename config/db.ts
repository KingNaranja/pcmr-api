// mongodb base name
const mongooseName: string = 'pcmr-api';

// create mongodb uri for development and test
const database = {
  development: `mongodb://localhost/${mongooseName}-development`,
  test: `mongodb://localhost/${mongooseName}-test`
}

// Identify if development environment is test or development
const localDb:string = process.env.TESTENV ? database.test : database.development

const currentDb = process.env.MONGODB_URI || localDb

export { currentDb }
