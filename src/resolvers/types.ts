import data from "./../data";

const typesResolver = {
  Data: {
    __resolveType(obj: {name: string, title: string}){
        if(obj.name){
          return 'Student';
        }
        if(obj.title){
          return 'Course';
        }
        return null; // GraphQLError is thrown
      },
  },
  Student: {
    /** root, args, context, info*/
    courses: (root: { courses: Array<string> }) => {
      return data.courses.filter(
        (course) => root.courses.indexOf(course.id) > -1
      );
    },
  },
  Course: {
    path: (root: { path: string }) => `https://udemy.com/course${root.path}`,
    students: (root: { id: string }) => {
      return data.students.filter(
        (student) => student.courses.indexOf(root.id) > -1
      );
    },
  },
  IncidentTraffic: {
    /**
     * type: String!
  autonomy: String!
  carRegistration: String!
  town: String!
  initDatatime: String!
  level: String!
  road: String!
  startPointKm: String!
  finishPointKm: String!
  orientation: String!
  location: Location!
     */
    town: (root: {poblacion: string}) => {
      if (root.poblacion !== undefined && root.poblacion.length == 1 &&
        root.poblacion[0] !== '') {
        return root.poblacion[0][0].toUpperCase().concat(root.poblacion[0].substring(1).toLowerCase())
      }
      return ''
    },
    province: (root: {provincia: string}) => {
      if (root.provincia !== undefined && root.provincia.length == 1 &&
        root.provincia[0] !== '') {
        return root.provincia[0][0].toUpperCase().concat(root.provincia[0].substring(1).toLowerCase())
      }
      return ''
    },
    autonomy: (root: {autonomia: string}) => {
      if (root.autonomia !== undefined && root.autonomia.length == 1 &&
        root.autonomia[0] !== '') {
        return root.autonomia[0][0].toUpperCase().concat(root.autonomia[0].substring(1).toLowerCase())
      }
      return ''
    },
    location: (root: {x: string, y: string, 
      longitude: string, latitude: string}) => {
        console.log(root.longitude, root.latitude, root.x, root.y)
        return {
          lon: '',
          lat: ''
        }
      }
  }
};

export default typesResolver;
