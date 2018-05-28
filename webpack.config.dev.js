import path from 'path';

export default{
    devtool:'inline-source-map',
    entry:[
        path.resolve(__dirname,'src/index')
    ],
    target:'web',
    output:{
        path:path.resolve(__dirname,'src'),
        publicPath:'/',
        filename:'bundle.js'
    },
    plugins:[],
    module:{
        rules:[
            {test:/\.js$/,exclude:/node_modules/,loaders:['babel-loader']},
            {test:/\.css$/,exclude:/node_modules/,loaders:['style-loader','css-loader']},
        ]
    },
    devServer:{
        contentBase:path.resolve(__dirname,"app")
    }
}