import {Document, DocumentQuery, model, Model} from "mongoose";
import {DebugClass} from "../debug";
import {Constclass} from "../constclass";
import * as mongoose from "mongoose";
import {ITeamsfilesstruktur, Teamsfileshema} from "../datenstrukturen/teamsfilesstruktur_server";
import {Projektpunktshema} from "../datenstrukturen/projektpunktestruktur_server";

export class FilesDBClass {

  private Debug: DebugClass;
  private Const: Constclass;

  constructor() {

    this.Debug = new DebugClass();
    this.Const = new Constclass();
  }

  public RemoveTeamsfile(teamsfile: ITeamsfilesstruktur) {

    try {

      let FilesmodelClass: mongoose.Model<mongoose.Document>;

      return new Promise((resolve, reject) => {

        FilesmodelClass = model(this.Const.FilescollectionName, Teamsfileshema);

        FilesmodelClass.deleteOne({_id: teamsfile._id} ).then(() => {

          resolve(true);

        }).catch((error) => {

          reject(error);
        });

      });

    } catch (error) {

      this.Debug.ShowErrorMessage(error.message, error,  'FilesDBClass', 'RemoveTeamsfile');
    }

  }

  public ReadFilesliste(projektkey: string, filetype: string): Promise<any> {

    try {

      let FilesmodelClass: mongoose.Model<mongoose.Document>;
      let Liste: ITeamsfilesstruktur[] = [];
      let Filter: any;

      if(filetype === 'Any') {

        Filter = { Projektkey: projektkey };
      }
      else {

        Filter = { Filetyp: filetype };
      }

      return new Promise((resolve, reject) => {

        FilesmodelClass = model(this.Const.FilescollectionName, Teamsfileshema);

        FilesmodelClass.find(Filter).then((data: any) => {

          data.forEach((teamsfile) => {

            Liste.push(teamsfile._doc);
          });

          resolve(Liste);

          console.log('');

        }).catch((error: any) => {

          reject(error);
        });

      });

    } catch (error) {

      this.Debug.ShowErrorMessage(error.message, error,  'FilesDBClass', 'ReadFileliste');
    }
  }

  public AddFiles(data: ITeamsfilesstruktur):Promise<any> {

    try {

      let Filesmodel: mongoose.Document;

      return new Promise<any>((resolve, reject) => {

        delete data._id;

        Filesmodel = this.GetFilesModel(data);

        Filesmodel.save().then((result: Document<any>) => {

          resolve(result);

        }).catch((error) => {

          reject(error);
        });
      });

    } catch (error) {

      this.Debug.ShowErrorMessage(error.message, error,  'FilesDBClass', 'AddFile');
    }
  }

  public UpdateFiles(data: ITeamsfilesstruktur):Promise<any> {

    try {

      let FilesmodelClass: mongoose.Model<mongoose.Document>;

      return new Promise<any>((resolve, reject) => {

        FilesmodelClass = model(this.Const.FilescollectionName, Teamsfileshema);

        FilesmodelClass.findById(data._id).then((standort: mongoose.Document) => {

          if(standort) {

            standort.set(data);
            standort.save().then((result: Document) => {

              resolve(result);

            }).catch((error) => {

              reject(error);
            });
          }
          else {

            resolve(null);
          }
        }).catch((error) => {

          reject(error);
        });
      });

    } catch (error) {

      this.Debug.ShowErrorMessage(error.message, error,  'FilesDBClass', 'UpdateFile');
    }
  }

  public GetFilesModel(data: ITeamsfilesstruktur): mongoose.Document {

    try {

      const FilesmodelClass = model(this.Const.FilescollectionName, Teamsfileshema);
      const Filesmodel: mongoose.Document = new FilesmodelClass(data);

      return Filesmodel;
    }
    catch (error) {

      this.Debug.ShowErrorMessage(error.message, error,  'FilesDBClass', 'GetStandortModel');
    }
  }
}
