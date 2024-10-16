const Dumper = require('./source/index.js');
const bot = new Dumper();

const fetch = require('node-fetch');
const fs = require('fs');
const chalk = require('chalk');

(async () => {

    console.log(`
██╗███╗   ███╗ ██████╗       ██████╗ ██╗   ██╗███╗   ███╗██████╗ 
██║████╗ ████║██╔════╝       ██╔══██╗██║   ██║████╗ ████║██╔══██╗
██║██╔████╔██║██║  ███╗█████╗██║  ██║██║   ██║██╔████╔██║██████╔╝
██║██║╚██╔╝██║██║   ██║╚════╝██║  ██║██║   ██║██║╚██╔╝██║██╔═══╝ 
██║██║ ╚═╝ ██║╚██████╔╝      ██████╔╝╚██████╔╝██║ ╚═╝ ██║██║     
╚═╝╚═╝     ╚═╝ ╚═════╝       ╚═════╝  ╚═════╝ ╚═╝     ╚═╝╚═╝     
    By : Andhika Dwi Maulana - v1.0 \n`);

    if (!fs.existsSync('./data')) fs.mkdirSync('./data');
    
    // Dumping data
    const data = await bot.dump_data();
    for (let i = 0; i < data.length; i++) {
        
        const name = data[i].name;
        const imguri = data[i].imageUrl;

        const filename = name.replace(/\s/g, '_').replace(/[^a-zA-Z_]/g, '');

        const req = await fetch(imguri);
        if (req.status == 200) {
            await fetch(imguri)
            .then(res => {
                res.body.pipe(fs.createWriteStream(`./data/${filename}.jpg`))
            })
            console.log(chalk.green(`[+] Downloading => ${filename}.jpg`));
            
        } else {
            console.log(chalk.red(`[-] Skipping => ${filename}.jpg`));
            
        }

    }

})();