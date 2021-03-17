const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@assets': 'src/assets',
    '@components': 'src/components',
    '@ks': 'src/screens/ks',
    '@lib': 'src/lib',
    '@nsevp': 'src/screens/nsevp',
    '@root': 'src',
    '@route': 'src/route',
    '@shared': 'src/screens/shared',
    '@styles': 'src/styles'
  })(config);

  return config;
};
