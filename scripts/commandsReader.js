const fs = require("fs");
const dir = "./commands/";

module.exports = (prefix) =>{
    var comandos = {};

    const scripts = fs.readdirSync(dir);
    scripts.forEach(script=>{
        comandos[prefix+script.split(".")[0]] = require("../"+dir+script);
    });

    return comandos;
}