import { RESTDataSource } from "apollo-datasource-rest";
import { URLS } from "./constants";
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

class DGTSpain extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = URLS.SPAIN;
  }

  // an example making an HTTP POST request
  async getLastIncidents() {
    const data = await this.get("incidenciasXY.xml");
    // console.log(data);
    let dataInfo = '';
    await parser.parseString(data, function(_: any, result: any) {
        dataInfo = result['raiz']['incidencia'];
    });
    return dataInfo;
  }
}

export default DGTSpain;
