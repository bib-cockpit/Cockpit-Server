import mongoose from "mongoose";

interface IAufgabenpersonenfilterstruktur  {

  Projektkey:      string;
  PersonenlisteID: string[];
};

const Aufgabenpersonenfiltershema = new mongoose.Schema({

  Projektkey:       {type:  String,  required: false},
  PersonenlisteID:  {type: [String], required: false},

}, {_id: false});

export { IAufgabenpersonenfilterstruktur, Aufgabenpersonenfiltershema };
