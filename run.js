const Dumper = require('./source/index');
const bot = new Dumper();

(async () => {

    const coba = await bot.dump_data();
    console.log(coba.length);
    

})();