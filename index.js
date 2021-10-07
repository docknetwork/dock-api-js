const dotenv = require('dotenv');
dotenv.config();

const createDID = require( './examples/dock-did');

const main = async () => {
    try{
    const didData = await createDID();
    }catch (err){
        
    }
    //console.log(didData);
}

main();