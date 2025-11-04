module.exports = {
  HOST: "ep-spring-base-ahhmkwgn-pooler.c-3.us-east-1.aws.neon.tech",
  USER: "neondb_owner",
  PASSWORD: "npg_OBpt3NZwC8MP",
  DB: "neondb",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};