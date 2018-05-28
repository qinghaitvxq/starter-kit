const path =require('path');

module.exports={

    entry:[
        path.resolve(__dirname,'src/index')
    ],
    output:{
        path:path.resolve(__dirname,'src/dist'),
        filename:'bundle.js'
    },
    devServer:{
        contentBase:path.resolve(__dirname,"src"),
        publicPath:'/dist/',
        watchContentBase:true
    }
}