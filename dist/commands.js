"use strict";
//**Packages */
var yargs = require('yargs');
//**Modules */
var notes = require('./notes');
yargs.command({
    command: 'add',
    describe: 'Add a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string',
        }
    },
    handler: function (_a) {
        var title = _a.title, body = _a.body;
        console.log('Title:' + title);
        console.log('Body:' + body);
        notes.addNote(title, body);
    }
});
