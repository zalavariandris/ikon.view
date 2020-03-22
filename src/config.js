export default {
	servicePath: process.env.NODE_ENV === 'production'
    ? 'https://ikon-api.herokuapp.com/api'
    : 'http://localhost:3000/api'
}