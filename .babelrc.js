module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-stage-0',
    '@babel/preset-react',
  ],
  ignore: ['node_modules', 'build'],
};