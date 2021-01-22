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
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
    },
    handler: function (_a) {
        var title = _a.title;
        return notes.removeNote(title);
    }
});
yargs.command({
    command: 'list',
    describe: 'List all notes or the ones that match the given string',
    builder: {
        text: {
            describe: 'Text to match in the title or body of the note',
            demandOption: false,
            type: 'string',
        }
    },
    handler: function (_a) {
        var text = _a.text;
        return notes.listNotes(text);
    }
});
yargs.parse();
