import {IVerfasserstruktur, Verfassershema} from "./verfasserstruktur_server";
import mongoose from "mongoose";


interface ITeamsfilesstruktur  {

  _id:    string;
  id:     string;
  name:   string;
  webUrl: string;
  size:   number;
  ProjektID:      string;
  Projektkey:     string;
  ProjektpunktID: string;
  Filetyp:        string;
  Leistungsphase: string;
  Zeitstempel:    number;
  Zeitsting:      string;
  MimeType:       string;
  DirectoryID:    string;
  Beschreibung:   string;
  Verfasser:      IVerfasserstruktur;
};

const Teamsfileshema = new mongoose.Schema({

  id:              {type: String,  required: false},
  name:            {type: String,  required: false},
  webUrl:          {type: String,  required: false},
  size:            {type: Number,  required: false},
  ProjektID:       {type: String,  required: false},
  Projektkey:      {type: String, required: false},
  ProjektpunktID:  {type: String, required: false},
  Filetyp:         {type: String, required: false},
  Leistungsphase:  {type: String, required: false},
  Zeitstempel:     {type: Number, required: false},
  Zeitsting:       {type: String, required: false},
  MimeType:        {type: String, required: false},
  DirectoryID:     {type: String, required: false},
  Beschreibung:    {type: String, required: false},
  Verfasser:       Verfassershema
});

export { ITeamsfilesstruktur, Teamsfileshema };




