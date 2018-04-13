/**
 * Helper functions for NPS MEDN Kelp Forest Story Map.
 * 
 * Created by:  NPS Inventory and Monitoring Division GIS Staff
 * Credits: 
 */
 
 /**
 * Initialize select lists for site, island (where) and species, year (what)
 * 
 * @param {string} target Target document element (id)
 * @param {string} targetURL URL of target service From configDataReview dataTables object
 * @param {string} whereClause Where clause for query  
 * @param {boolean} returnDistinctValues 
 * @returns {Object} esri.Query() object
 */
function initializeSelections(whereClause, returnDistinctValues = true) {
    require(["esri/tasks/query", "esri/tasks/QueryTask"], function (Query, QueryTask) {
        querySet.query = new Query();
        querySet.query.where = whereClause;  
        querySet.query.outFields = queryParameters.returnFieldsSelector;
        querySet.query.returnGeometry = false;
        querySet.returnDistinctValues = returnDistinctValues;
    })
}

/**
 * Configure items and initialize events for select lists for site, island (where)
 * 
 * @param {string} targetWhere Target document element (id) for where (site, island)
 * @param {string} targetWhat Target document element (id) for what (species, year) 
 */            
function updateWhere(targetWhere, targetWhat) {
    dom.byId(targetWhere).addEventListener("change", getSpecies, false);
    dom.byId(targetWhat).addEventListener("change", makeChart, false);
    dom.byId(targetWhat).addEventListener("onkeyup", makeChart, false);
    whereList.forEach(function (item) {
        whereOption = document.createElement("option");
        whereOption.text = item;
        whereOption.value = item;
        dom.byId(targetWhere).appendChild(whereOption);
    });
}  

/**
 * Configure items and initialize events for select lists for species, year (what)
 * 
 * @param {string} targetWhat Target document element (id) for what (species, year) 
 */
    
function getWhat(targetWhat) {
    selWhatValue = this.value;

    var whatList = [];
    whatList0 = kfmWhat.filter(function (item) {
        return item.id === selWhereValue
    });
    for (i = 0; i < whatList0.length; i++) {
        if (whatList.indexOf(whatList0[i].name) === -1) {
            whatList.push(whatList0[i].name);
        }
    }

    while (document.getElementById(targetWhat).length > 0) {
        document.getElementById(targetWhat).remove(0);
    }
    whatList.sort();
    whatList.forEach(function (item) {
        whatOption = document.createElement("option");
        whatOption.text = item;
        whatOption.value = item;
        document.getElementById(targetWhat).appendChild(spOption);
    })
}
            
/**
 * Configures query for graph data response
 *
 * For Quadrat or Transect or RPC sources
 * @param {Array} paramKeys From configDataReview queryParameters object
 * @param {Array} paramValues Select list selected value (kfmWhere and kfmWhat)
 * @param {string} queryType From configDataReview queryTypes object
 */ 
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
        // 
        createQuery(whereClause, queryType); 
}

// For Size/Frequency sources
function getRangeData(param1, param2, target) {
}

// For Giant Kelp and Gorgonian sources
function getDistributionData(param1, target) {
}

/**
 * Configures query for site, island (where) and species, year (what) requests
 * Used to populate data object consumed by graphs for Quadrat or Transect or RPC sources
 *
 * @param {Array} paramKeys From configDataReview queryParameters object
 * @param {Array} paramValues Select list selected value (kfmWhere and kfmWhat)
 * @param {string} queryType From configDataReview queryTypes object
 */
function createQuery(whereClause, queryType) {
    require(["esri/tasks/query", "esri/tasks/QueryTask"], function (Query, QueryTask) {

        querySet.query = new Query();
        //var query = new Query();
        outFields = queryParameters.returnFields; // global variable
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
        querySet.query.returnGeometry = false;
        querySet.query.orderByFields = orderBy;
    
    });
}

    
function renderGraph() {
    selWhatValue = this.value;
    getGraphData();
}