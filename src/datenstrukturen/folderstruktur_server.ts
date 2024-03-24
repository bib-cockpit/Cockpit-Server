import mongoose from "mongoose";

interface IFolderstruktur  {

  FolderID:       string;
  ParentfolderID: string;
  Name:           string;
  Beschreibung:   string;
  Zeitstempel:    number;
  Zeitstring:     string;
};

const Foldershema = new mongoose.Schema({

  FolderID:       {type: String, required: false},
  ParentfolderID: {type: String, required: false},
  Name:           {type: String, required: false},
  Beschreibung:   {type: String, required: false},
  Zeitstempel:    {type: Number, required: false},
  Zeitstring:     {type: String, required: false},

}, {_id: false});

export { IFolderstruktur, Foldershema }
