import { RESTDataSource } from "apollo-datasource-rest";
import { URLS } from "./constants";
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

class DGTEuskadi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = URLS.EUSKADI;
  }

  // an example making an HTTP POST request
  async getLastIncidents() {
    const data = await this.get("");
    let dataInfo = '';
    await parser.parseString(data, function(_: any, result: any) {
        console.log('FINISHED', /*err, result*/);
        console.log(JSON.stringify(result['raiz']['incidenciaGeolocalizada'], null, 2));
        dataInfo = result['raiz']['incidenciaGeolocalizada'];
    });
    return dataInfo;
  }
}

export default DGTEuskadi;
