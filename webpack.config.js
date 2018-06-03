const path =require('path');
const ExtractTextPlugin=require('extract-text-webpack-plugin');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const CleanWebpackPlugin=require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack=require('webpack');

// const extractPlugin=new ExtractTextPlugin({
//     filename:'main.css'
// });
const miniExtractPlugin=new MiniCssExtractPlugin({
   filename:'main.css'
});

module.exports={

    entry: {
        app: './src/js/app.js'
    },

    output:{
        path:path.resolve(__dirname,'dist'),
        publicPath:'/',
        filename:'bundle.js'
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:[
                    {
                        loader:'babel-loader',
                        options:{
                            presets:['es2015']
                        }
                    }
                ]
            },{
                test:/\.scss$/,
                use:[
                    'css-hot-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'

                ]
                // use:extractPlugin.extract({
                //     use:['css-loader','sass-loader']
                // })
            },{
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
        //extractPlugin,
        miniExtractPlugin,
        new HtmlWebpackPlugin({
          filename:'index.html',
          template:'src/index.html'
        }),
        new HtmlWebpackPlugin({
          filename:'users.html',
          template:'src/users.html',
          chunks:[]
        }),
        new CleanWebpackPlugin(['dist']),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],
    devServer:{
        contentBase:path.resolve(__dirname,"src"),
        hot:true,
        //publicPath:'/',
        //watchContentBase:true
    }
}