const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@assets': 'src/assets',
    '@lib': 'src/lib',
    '@root': 'src',
    '@route': 'src/route',
    '@styles': 'src/styles'
  })(config);

  return config;
};
