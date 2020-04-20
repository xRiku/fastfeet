module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  user: 'postgres_fastfeet',
  password: 'docker',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  }
}