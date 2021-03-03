const {
  formatResponse,
  parseQuery,
  getFilterQuery,
  filterData,
  closetGeoLocation,
 } =  require('./helper');
const dataObject = require('./data.json');

// lambda-like handler function

module.exports.handler = async event => {
  try {
    const { queryStringParameters = false } = event;
    const searchData = parseQuery(queryStringParameters);
    
    const { closest = null } = searchData;
    let data = {};
    
    if(!closest){
      const filterQuery = getFilterQuery(searchData);
      data = filterData(dataObject, filterQuery);
    }else{
      data = closetGeoLocation(searchData, dataObject);
    }
        
    return formatResponse(200, data);
  } catch (error) {
    console.log(error)
    return formatResponse(500, error);
  }
  
};
