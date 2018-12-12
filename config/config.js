var config = {
    PORT : '3300',
    SECRET: '35625&*^%%67$%hjh%^',
    DBURL: 'mongodb://brajesh:brajesh123@ds127944.mlab.com:27944/addressbook',
    DOMAIN: '@inmar.com',
    NODE_ENV: 'DEV'
}

const Initialize = function() {
    console.log('Initializing configuration values.');
    ['PORT', 'SECRET', 'DBURL', 'DOMAIN', 'NODE_ENV'].forEach(param => {
        if(process.env[param]) {
            config[param] = process.env[param]
            console.log('config:',param, config[param])
        }
    })
    return config;
}

module.exports = { Initialize, config }