const dirVars = require('./base/dir-vars.config.js')

module.exports = {
  rules: [
    {
      test: /\.css$/,
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            module: true,
            getLocalIdent: (context, localIdentName, localName, options) => {
              const usePath = context._module.context
              const index = usePath.search(/\/components\//)
              return usePath.slice(index + 12) + '-' + localName
            }
          }
        }
      ]
    },
    {
      test: /\.js[x]?$/,
      include: dirVars.srcRootDir,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: [
            ['import', [{ libraryName: 'antd', style: true }]]
          ]
        }
      }
    },
    {
      test: /\.less$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader', options: { importLoaders: 1 } },
        { loader: 'less-loader' }
      ]
    },
    {
      test: /\.(png|jpg|gif)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }
      ]
    }
  ]
}
