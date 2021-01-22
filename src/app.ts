//**Packages */
const yargs = require('yargs');

//**Modules */
const notes = require('./notes');

yargs.command({
    command:'add',
    describe:'Add a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption:true,
            type:'string',
        },
        body:{
            describe: 'Note body',
            demandOption: true,
            type:'string',
        }
    },

    handler: function({title,body}:{title:any,body:any}){
        console.log('Title:' +title);
        console.log('Body:' +body);
        notes.addNote(title,body);

    }
})


yargs.parse();