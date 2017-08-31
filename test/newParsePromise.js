const ParseString = require('xml2js').parseString
var xml = "<root>Hello xml2js!</root>"

function resolveXml() {
    return new Promise((resolve, reject) => {
        ParseString(xml, (err, result) => {
            if (result) {
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
}

Promise.resolve(44)
    .then(() => resolveXml())
    .then(result => {
        console.log('result: ', result);
    })