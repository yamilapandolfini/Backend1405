const SqLOption = {
    client:'sqlite3',
    connection: {
      filename: "./models/db/ecommerce.sqlite"
    },
    useNullAsDefault: true
}
  
module.exports = SqLOption;