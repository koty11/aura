const qs = require('qs');
const { 
    toLatLon, toLatitudeLongitude, headingDistanceTo, moveTo, insidePolygon 
  } = require('geolocation-utils');

// TODO: validate all entry and formats

function formatResponse(statusCode, body) {
    return {
        statusCode,
        "headers": {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
      };
};
function parseQuery(queryStringParameters) {
    return qs.parse(queryStringParameters);
};

function getFilterQuery(searchData) {
    // Validate queryString data
    if(searchData){
        
        let query = {};
        for (let keys in searchData) {
            if(searchData[keys]) {
                query[keys] = new Array(Object.values(searchData[keys])[0]);
            }
        }

        return query;
    }
    return {};
};

function filterData(data, query) {
    const filteredData = data.filter( (item) => {
        for (let key in query) {
            const dataLenght = query[key].filter(item2 => item[key].includes(item2));
            if (item[key] === undefined || !dataLenght.length > 0 ) {                
                return false;
            }
        }
        return true;
    });
    return filteredData;
};

function closetGeoLocation(searchData, dataObject){

    const location1 = {lat: 51, lon: 4}
    const location2 = {lat: 51.001, lon: 4.001 }                      
    
    const {closest:paramLocation } = searchData;
    //parseNumber
    paramLocation.latitude = parseFloat(paramLocation.latitude);
    paramLocation.longitude = parseFloat(paramLocation.longitude);
    if(!paramLocation.latitude || !paramLocation.longitude){
        throw new Error("Unknown location format, Lat and Lon are required ");
    }
    
    dataObject.map( item => {
        const locationItem = {};
        locationItem.latitude = parseFloat(item.latitude);
        locationItem.longitude = parseFloat(item.longitude);
        const { distance } = headingDistanceTo(paramLocation, locationItem)
        item.distance = distance;
    } );
    
    var minDist = dataObject.reduce(function (max, curr) {
        return (max.distance) < curr.distance ? max : curr;
      }, {});

    return minDist;
}

module.exports = {
    formatResponse,
    parseQuery,
    getFilterQuery,
    filterData,
    closetGeoLocation,
}