module.exports = [
    {
        context: ['/api'],
        target: 'http://localhost:3000',
        secure: false,
        logLevel: 'debug'
    }
]

// {
//     "/api/*": {
//       "target": "http://localhost:3000",
//       "secure": false,
//       "logLevel": "debug",
//     //   "changeOrigin": true,
//     //   "pathRewrite": {
//     //     "^/api/settings": "/api/app/settings",
//     //     "^/api": ""
//       }
//     }
  
// ]