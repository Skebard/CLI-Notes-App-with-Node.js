"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//** Packages */
var FILE_STORAGE = __dirname + '/storage/notes.json';
var chalk = require('chalk');
var fs = require('fs');
var dateFormat = require('dateformat');
//** Messages */
var error = chalk.bold.red.inverse;
var success = chalk.green.bold.inverse;
var addNote = function (title, body) {
    //if we do not care about the type
    //let notes: Array<any>= loadNotes();
    //interfaces
    var notes = loadNotes();
    var duplicateNote = notes.find(function (note) { return note.title === title; });
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body,
            date: dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT"),
        });
        saveNotes(notes);
        console.log(success('\nNote added successfully\n'));
    }
    else {
        console.log(error('\nNote could not be added because the title already exists\n'));
    }
};
var removeNote = function (title) {
    var notes = loadNotes();
    var newNotes = notes.filter(function (note) { return note.title !== title; });
    if (notes.length > newNotes.length) {
        saveNotes(newNotes);
        console.log(success('\nNote removed successfully \n'));
    }
    else {
        console.log(error('\nNote not found\n'));
    }
};
var listNotes = function (text) {
    if (text === void 0) { text = ""; }
    var notes = loadNotes();
    var matchedNotes = notes.filter(function (note) {
        if (note.title.includes(text) || note.body.includes(text)) {
            return true;
        }
        return false;
    });
    if (matchedNotes.length > 0) {
        console.log(matchedNotes);
        console.log(success('\n' + matchedNotes.length + ' note has been found :)' + '\n'));
    }
    else {
        console.log(error('\n 0 notes have been found :(\n'));
    }
};
var loadNotes = function () {
    try {
        var dataBuffer = fs.readFileSync(FILE_STORAGE);
        var dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    catch (e) {
        //if there is any error reading the file we
        //suppose it does not exist and return an empty array
        return [];
    }
};
var saveNotes = function (notes) {
    try {
        var dataSerialized = JSON.stringify(notes);
        console.log(dataSerialized);
        fs.writeFileSync(FILE_STORAGE, dataSerialized);
    }
    catch (e) {
        console.log(error('Error ocurred when writing file: ' + e.message));
    }
};
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
};
