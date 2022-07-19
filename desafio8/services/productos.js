const knexLib = require('knex')

module.exports = class ProductosDB {
  constructor(config) {
    this.knex = knexLib(config)
  }

  async crearTabla() {
    try {
      const tableExist = await this.knex.schema.hasTable('productos')
      if (tableExist) return

      await this.knex.schema.createTable('productos', table => {
        table.increments('id').primary();
        table.string('title', 50).notNullable();
        table.float('price');
        table.string('thumbnail', 100).notNullable();
      })
      
    } catch (error){
      console.log(error)
    }
  }

  async selectProductos() {
    return this.knex('productos').select()
  }

  async inserProductos({title, price, thumbnail}) {
    await this.knex('productos').insert({
        title,
        price,
        thumbnail,
    })
  }

}
