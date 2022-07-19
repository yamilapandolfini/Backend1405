const knexLib = require('knex')

module.exports = class MensajesDB {
    constructor(config) {
      this.knex = knexLib(config)
    }
  
    async crearTabla() {
      try {
        const tableExist = await this.knex.schema.hasTable('mensajes')
        if (tableExist) return
  
        await this.knex.schema.createTable('mensajes', table => {
          table.increments('id').primary();
          table.string('username', 100).notNullable();
          table.string('mensaje', 200).notNullable();
          table.string('date', 100).notNullable();
          table.string('time', 100).notNullable();
        })
        
      } catch (error){
        console.log(error)
      }
    }
  
    async selectMensajes() {
      return this.knex('mensajes').select()
    }
  
    async inserMensajes({username, mensaje, date, time}) {
      await this.knex('mensajes').insert({
          username,
          mensaje,
          date,
          time
      })
    }
  
  }