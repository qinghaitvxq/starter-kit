const path =require('path');
const ExtractTextPlugin=require('extract-text-webpack-plugin');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const CleanWebpackPlugin=require('clean-webpack-plugin');
//const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack=require('webpack');

const extractPlugin=new ExtractTextPlugin({
    filename:'[name].css'
});
// const miniExtractPlugin=new MiniCssExtractPlugin({
//    filename:'main.css'
// });

module.exports={

    entry: {
        app: './src/js/app.js',
        asyncAwait:['babel-polyfill','./src/js/async_await.js'],
        snapshot:['./src/js/snapshot.js'],
        canvas:['./src/js/canvas.js']
    },

    output:{
        path:path.resolve(__dirname,'dist'),
        publicPath:'/',
        filename:'[name].js'
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:[
                    {
                        loader:'babel-loader',
                        options:{
                            presets:['es2015']
                        }
                    }
                ]
            },
            {
                test:/\.scss$/,
                // use:[
                //     'css-hot-loader',
                //     MiniCssExtractPlugin.loader,
                //     'css-loader',
                //     'sass-loader'
                //
                // ]

                use:['css-hot-loader'].concat(extractPlugin.extract({
                    use:['css-loader','sass-loader']
                }))
            },
            {
                test:/\.html$/,
                use:['html-loader'],
            },
            {
                test:/\.(jpeg|jpg|png)$/,
                use:[
                    {
                      loader:'file-loader',
                      options:{
                          name:'[name].[ext]',
                          outputPath:'img/',
                          publicPath:'img/'
                      }
                    }
                ]
            }
        ]
    },
    plugins:[
        new webpack.ProvidePlugin({
            $:'jquery',
            jQuery:'jquery'
        }),
        extractPlugin,
        new HtmlWebpackPlugin({
          filename:'index.html',
          template:'src/index.html',
          chunks:['app']
        }),
        new HtmlWebpackPlugin({
          filename:'users.html',
          template:'src/users.html',
          chunks:[]
        }),
        new HtmlWebpackPlugin({
            filename:'async_await.html',
            template:'src/async_await.html',
            chunks:['asyncAwait']
        }),
        new HtmlWebpackPlugin({
            filename:'snapshot.html',
            template:'src/snapshot.html',
            chunks:['snapshot']
        }),
        new HtmlWebpackPlugin({
            filename:'canvas.html',
            template:'src/canvas.html',
            chunks:['canvas']
        }),
        new CleanWebpackPlugin(['dist']),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],
    devServer:{
        contentBase:path.resolve(__dirname,"dist"),
        hot:true,
        compress:true
        //publicPath:'/',
        //watchContentBase:true
    }
}