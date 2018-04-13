//function getLookups(srcTable) {
//    // Query source table(s) for use as selections
//    console.log('In getLookups()');
////    tempLayer = new FeatureLayer(srcTable, {});
////
////    var query = new Query();
////    //query.where = "SiteName='Arch Point' and SpeciesName='Pisaster giganteus'";
////    query.outFields = ["SiteName", "SpeciesName"];
////
////    console.log('Ready to query');
////    tempLayer.queryFeatures(query, queryCompleteHandler, queryErrorHandler);
//}
//

// Create query object
function createQuery(whereClause, queryType) {
    require(["esri/tasks/query", "esri/tasks/QueryTask"], function (Query, QueryTask) {

        querySet.query = new Query();
        //var query = new Query();
        outFields = queryParameters.returnFields; // outFieldsSampling; // global variable
        orderBy = queryParameters.orderByFields;

        if (queryType === 'SampleSite' || queryType === 'SampleYear') {
            outFields = outFields.concat(outputParameters.meanCountFields);
            if (queryType === 'SampleYear') {
                orderBy = queryParameters.orderByFieldsSampleYear;
            }
        }
        else if (queryType === 'ARMSizeFrequency') {
            outFields = outFields.concat(outputParameters.armSizeFreqFields);
            outFields.remove("IslandName");
            //orderBy = pp;
        }
        else if (queryType === 'FishSizeFrequency') {
            outFields = outFields.concat(outputParameters.fishSizeFreqFields);
            //orderBy = gg;
        }
        else if (queryType === 'NaturalHabitatSizeFrequency') {
            outFields = outFields.concat(outputParameters.countSizeFields);
            //orderBy = gg;
        }
        else if (queryType === 'GorgonianDistribution') {
            outFields = outFields.concat(outputParameters.sizeGorgoniansFields);
            //orderBy = gg;
        }
        else if (queryType === 'MacrocystisDistribution') {
            outFields = outFields.concat(outputParameters.sizeMacrocystisFields);
            //orderBy = gg;
        }

        querySet.query.where = whereClause;  
        querySet.query.outFields = outFields; 
        querySet.query.orderByFields = orderBy;
    
    });
}

// Site or survey year data
// For Quadrat or Transect or RPC sources
function getTimeSeriesData (paramKeys, paramValues, queryType) {
        // Create where clause
        if (typeof paramValues[0] === 'number') { // SurveyYear
            whereClause = paramKeys[0] + "='" + paramValues[0] + "' and " + paramKeys[1] + "=" + paramValues[1]; 
            //whereClause = param1Key + "='" + param1Value + "' and " + param2Key + "=" + param2Value; 
        }
        else {
            whereClause = paramKeys[0] + "='" + paramValues[0] + "' and " + paramKeys[1] + "='" + paramValues[1].replace("'","''") + "'";
            //whereClause = param1Key + "='" + param1Value + "' and " + param2Key + "='" + param2Value + "'";
        }

        createQuery(whereClause, queryType); 
}

// For Size/Frequency sources
function getRangeData(param1, param2, target) {
}

// For Giant Kelp and Gorgonian sources
function getDistributionData(param1, target) {
}

// All sites data
// functions TBD


function getGraphData() {

    require(["esri/tasks/query", "esri/tasks/QueryTask", "esri/layers/FeatureLayer", "dojo/dom"], function (Query, QueryTask, FeatureLayer, dom) {
    
    getTimeSeriesData(queryParameters.SampleSite, [selSpeciesValue, selSiteValue], queryTypes[0]);
    queryTarget = targetURL + "/" + dataTables["1mQuadrat"];

    function queryTaskExecuteCompleteHandler(queryResults){
        console.log("complete", queryResults);
        //alert(queryResults.length);
        if (queryResults.toJson().hasOwnProperty('features')) {
            getHCScatterplot(queryResults.toJson());
        }
        else {
          document.getElementById("chart").innerHTML = '<b>No data available</b>';  
        }
        //getScatterplot(queryResults.toJson());
        //getChart(queryResults.toJson());
    }

    function queryTaskErrorHandler(queryError){
        alert("ERROR:\n" + queryError);
        console.log("error", queryError.error.details);
    }    

    tempLayer = new FeatureLayer(queryTarget,{});
    tempLayer.queryFeatures(querySet.query, queryTaskExecuteCompleteHandler, queryTaskErrorHandler);
    });
}