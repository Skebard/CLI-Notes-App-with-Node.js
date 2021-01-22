//** Packages */
const FILE_STORAGE: string = __dirname+'/storage/notes.json';
const chalk = require('chalk');
const fs = require('fs');
const dateFormat = require('dateformat');

//*Interfaces */
import {Note} from './types';

const addNote = function(title:any,body:any): void{
    //if we do not care about the type
    //let notes: Array<any>= loadNotes();
    //interfaces
    let notes: Note[] = loadNotes();
    const duplicateNotes = notes.filter(note=>note.title===title);
    if(duplicateNotes.length === 0){
        notes.push({
            title:title,
            body:body,
            date: dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT"),
        });
        saveNotes(notes);
        console.log('saved');
    }else{
        console.log('exists');
    }

}

const removeNote = function(title:any): void{
    let notes: Note[] = loadNotes();
    let newNotes: Note[] = notes.filter(note=>note.title!==title);
    if(notes.length < newNotes.length){
        console.log('note removed');
    }else{
        console.log("note not found");
    }
}

const loadNotes = function(): Note[]{
    try{
        const dataBuffer = fs.readFileSync(FILE_STORAGE);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }catch(e){
        //if there is any error reading the file we
        //suppose it does not exist and return an empty array
        return [];
    }
}
const saveNotes = function(notes:object): void{
    try{
        const dataSerialized: string = JSON.stringify(notes);
        console.log(dataSerialized);
        fs.writeFileSync(FILE_STORAGE,dataSerialized);
    }catch(e){
    }
}

module.exports = {
    addNote:addNote
}