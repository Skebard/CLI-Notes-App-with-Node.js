"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//** Packages */
var FILE_STORAGE = __dirname + '/storage/notes.json';
var chalk = require('chalk');
var fs = require('fs');
var dateFormat = require('dateformat');
var addNote = function (title, body) {
    //if we do not care about the type
    //let notes: Array<any>= loadNotes();
    //interfaces
    var notes = loadNotes();
    var duplicateNotes = notes.filter(function (note) { return note.title === title; });
    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body,
            date: dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT"),
        });
        saveNotes(notes);
        console.log('saved');
    }
    else {
        console.log('exists');
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
    }
};
module.exports = {
    addNote: addNote
};
