module.exports = {
  mysql: {
    master: {
      connectionLimit: 10,
      waitForConnections: false,
      host: '',
      port: '',
      user: '',
      password: '',
      database: ''
    },
    write: {
      connectionLimit: 10,
      waitForConnections: true,
      host: '',
      port: '',
      user: '',
      password: '',
      database: ''
    }
  }
}
