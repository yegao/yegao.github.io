const webpack = require('webpack')
const path =  require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const resolve = (uri)=>{
  return path.resolve(__dirname,uri)
}
module.exports = {
  entry:resolve('src/index.js'),
  mode:"development",
  output:{
    path:resolve('dist'),
    filename:"[name].bundle.js"
  },
  devtool:"inline-source-map",
  module:{
    rules:[
      {
        test:/\.js$/,
        use:['babel-loader']
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
      {
        test:/\.scss$/,
        use:['style-loader','css-loader','sass-loader']
      }
    ]
  },
  resolve:{
    modules:[
      'node_modules',
      resolve('src')
    ],
    alias:{
      jquery:resolve("libs/jquery.3.2.1.js")
    }
  },
  // externals:{
  //   $:"jQuery"
  // },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template:resolve('src/index.html'),
      // title: '计算器',
      // filename: resolve('dist/index.html')'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      React:"react"
    })
  ],
  devServer: {
    contentBase: resolve("dist"),
    compress: true,
    port: 9100,
    open:true,//自动打开浏览器
    hot: true
  }
}