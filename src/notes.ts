//** Packages */
const FILE_STORAGE: string = __dirname+'/storage/notes.json';
const chalk = require('chalk');
const fs = require('fs');
const dateFormat = require('dateformat');

//** Interfaces */
import {Note} from './types';

//** Messages */
const error = chalk.bold.red.inverse;
const success = chalk.green.bold.inverse;

const addNote = function(title:string,body:string): void{
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
        console.log(success('\nNote added successfully\n'));
    }else{
        console.log(error('\nNote could not be added because the title already exists\n'));
    }

}

const removeNote = function(title:string): void{
    let notes: Note[] = loadNotes();
    let newNotes: Note[] = notes.filter(note=>note.title!==title);
    if(notes.length > newNotes.length){
        saveNotes(newNotes);
        console.log(success('\nNote removed successfully \n'));
    }else{
        console.log(error('\nNote not found\n'));
    }
}


const listNotes = function(text:string=""){
    const notes: Note[] = loadNotes();
    let matchedNotes = notes.filter(note=>{
        if(note.title.includes(text) || note.body.includes(text)){
            return true;
        }
        return false;
    });
    if(matchedNotes.length>0){
        console.log(matchedNotes);
        console.log(success('\n'+matchedNotes.length+ ' note has been found :)'+'\n'));

    }else{
        console.log(error('\n 0 notes have been found :(\n'))
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
        console.log(error('Error ocurred when writing file: '+e.message))
    }
}

module.exports = {
    addNote:addNote,
    removeNote:removeNote,
    listNotes:listNotes,
}