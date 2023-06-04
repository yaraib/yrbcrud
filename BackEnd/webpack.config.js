let path = require('path');
module.exports={
    entry:{main:'./server.js'},
    output: {
        
        path: path.join(__dirname, 'dev-build'),
        publicPath:'/',
        filename: 'main.js',
        clean:true

    },
    mode:'development',
    target:'node',

    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node-modules/,
                loader:"babel-loader",
            }
        ]
    }
}