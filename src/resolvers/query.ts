import data from '../data';
import DGTCatalunya from '../data/dgt-catalunya';
import DGTEuskadi from '../data/dgt-euskadi';
import DGTSpain from '../data/dgt-spain';
import { IStudent, ICourse } from './../interfaces';
const queryResolvers = {
    Query: {
      async all(_: object, __: object, context: { dataSources: {
        dgtEuskadi: DGTEuskadi, dgtSpain: DGTSpain, dgtCatalunya: DGTCatalunya
      }}): Promise<Array<string>> {
        const data = await context.dataSources.dgtEuskadi.getLastIncidents();
        const data_two = await context.dataSources.dgtSpain.getLastIncidents();
        const data_three= await context.dataSources.dgtCatalunya.getLastIncidents();
        console.log(data_three);
        const all = [...data, ...data_two];
        console.log(all.length);
        return all;
      },
      
      courses(): {
        status: boolean;
        message: string;
        list: Array<ICourse>
      } {
        return {
          status: true,
          message: 'Lista correctamente cargada',
          list: data.courses
        }
      },
      course(_: object, args: {id: string}): {
        status: boolean;
        message: string;
        item: ICourse | null
      } {
        const course = data.courses.filter(
          (value) => value.id === args.id
        )[0]
        return {
          status: course === undefined ? false : true,
          message: course === undefined ? 
                  `Curso ${args.id} no se ha encontrado` :
                  `Curso ${args.id} se ha encontrado`,
          item: course === undefined ? null : course,
        };
      },
    },
  };

  export default queryResolvers;
