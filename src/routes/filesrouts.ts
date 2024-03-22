import {Request, Response, Router} from 'express';
import {StandorteDBClass} from "../database/standortedbclass";
import {DebugClass} from "../debug";
import {AuthenticationClass} from "../middleware/authentication";
import {FilesDBClass} from "../database/filesdbclass";
import {ITeamsfilesstruktur} from "../datenstrukturen/teamsfilesstruktur_server";
import {FILE} from "node:dns";

export class FilesrouterClass {

  public  filesrouter: any;
  private Debug: DebugClass;
  private Database: FilesDBClass;
  private Authentication: AuthenticationClass;

  constructor() {


    this.Debug           = new DebugClass();
    this.Database        = new FilesDBClass();
    this.filesrouter     = Router();
    this.Authentication  = new AuthenticationClass();
  }

  public SetRoutes() {

    try {

      this.filesrouter.get('/',  this.Authentication.authenticate,  (req: Request, res: Response) => {

        let query= req.query;
        let Projektkey       = <string>query.projektkey;
        let Filetyp: string        = <string>query.filetype;

        this.Database.ReadFilesliste(Projektkey, Filetyp).then((liste: ITeamsfilesstruktur[]) => {

          res.status(200).send(liste);

        }).catch((error) => {

          res.status(400).send(error.message);

        });
      });

      this.filesrouter.put('/', (req: Request, res: Response) => {

        // PUT ist für Update

        console.log('Standorte PUT');

        const data = req.body;
        let Delete: boolean = data.Delete;
        let Teamsfile: ITeamsfilesstruktur = data.Teamsfile;

        console.log('Daten: ' + JSON.stringify(data));

        if(Delete === false) {

          this.Database.UpdateFiles(Teamsfile).then((result) => {

            if(result !== null) {

              res.status(200).send({ message: 'Saved: ' + data.name, data: data });
            }
            else {

              res.status(404).send({ message: 'Teamsfile not found.', data: null });
            }

          }).catch((error) => {

            res.status(400).send({ message: error.message });
          });
        }
        else {

          // Teamsfile loeschen

          this.Database.RemoveTeamsfile(Teamsfile).then((result) => {

            if(result !== null) {

              res.status(200).send({ message: 'Teamsfile wurden gelöscht' });
            }

          }).catch((error) => {

            res.status(400).send({ message: error.message });
          });
        }
      });

      this.filesrouter.post('/', (req: Request, res: Response) => {

        // POST ist für neuen Eintrag

        console.log('Files POST');

        const data = <ITeamsfilesstruktur>req.body;

        console.log('Daten: ' + JSON.stringify(data));

        this.Database.AddFiles(data).then((result) => {

          res.status(200).send({ message: 'Added: ' + data.name, data: result._doc });

        }).catch((error) => {

          res.status(400).send({ message: error.message });
        });
      });

    } catch (error) {

      this.Debug.ShowErrorMessage(error.message, error,  'FilesrouterClass', 'SetRoutes');
    }
  }
}


