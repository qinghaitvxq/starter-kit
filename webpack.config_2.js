var webpack=require('webpack');
var path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');

module.exports={
    entry:'./src/js/test.js',
    output:{
        path:path.resolve(__dirname,'test'),
        filename:'bundle.js'
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:'babel-loader'
            },{
                test:/\.html$/,
                use:['html-loader'],
            },
        ]
    },
    devServer:{
        contentBase:path.join(__dirname,'test'),
        compress:true,
        hot:true,
        open:true
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'users.html',
            template:'src/users.html',
           // chunks:[]
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
}