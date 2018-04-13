// Array of tables from feature service
var dataTables = {"1mQuadrat" : "7", "5mQuadrat": "8", "BandTransect": "10", "ARMsSizeFrequency": "9", "FishSizeFrequency": "11", "Macrocystis": "14", "Gorgonians": "13", "RPC" : "17", "Temperature": "18"};
// For initial testing using: GDB_MEDN_PyriferaMarineMap_gdb/FeatureServer
//var dataTables = {"1mQuadrat" : "8", "5mQuadrat": "9", "BandTransect": "11", "ARMsSizeFrequency": "10", "FishSizeFrequency": "12", "Macrocystis": "1", "Gorgonians": //"14", "Temperature": "5"};
    
//    { "12": "PyriferaMarineMap_FishSizeFrequency", "8": "PyriferaMarineMap_1mQuadrat", "9": "PyriferaMarineMap_5mQuadrat", "11": "PyriferaMarineMap_BandTransect", "4": "PyriferaMarineMap_RPC", "10": "PyriferaMarineMap_ARMsSizeFrequency", "14": "PyriferaMarineMap_Gorgonians", "1": "PyriferaMarineMap_Macrocystis", "5": "PyriferaMarineMap_Temperature"}; 

var queryTypes = new Array();
queryTypes[0] = "SampleSite";
queryTypes[1] = "SampleYear";
queryTypes[2] = "ARMSizeFrequency";
queryTypes[3] = "FishSizeFrequency";
queryTypes[4] = "GorgonianDistribution";
queryTypes[5] = "MacrocystisDistribution";
queryTypes[6] = "NaturalHabitatSizeFrequency";

var queryParameters = {
    "SampleSite": ["SpeciesName", "SiteName"], //speciesBySite
    "SampleYear": ["SpeciesName", "SurveyYear"], //speciesByYear
    "YearSite": ["SpeciesName", "SurveyYear"], //?? yearBySite
    "SizeFrequencySite": ["ScientificName", "SiteName"], //speciesBySiteFrequency
    "SizeFrequencyYear": ["ScientificName", "SurveyYear"], //speciesByYearFrequency
    "DistributionSite": ["ScientificName", "SiteName"], //speciesBySiteDistribution
    "orderByFields": ["SurveyYear"],
    "returnFields": ["SiteNumber", "SiteCode", "SiteName", "IslandCode", "IslandName", "CommonName", "SurveyYear"],
    "returnFieldsSelector": ["SiteName", "SpeciesName", "SurveyYear"]
    //"returnFieldsSelector": ["SiteName", "SpeciesName", "Year"]
//    // ??
//    sampleSite = ["SpeciesName", "SiteName"]; //speciesBySite
//    sampleYear = ["SpeciesName", "SurveyYear"]; //speciesByYear
//    yearSite = ["SpeciesName", "SurveyYear"];  //?? yearBySite
//    
//    orderByFields = ["SurveyYear"];
//    orderByFieldsSampleYear = ["SiteName"];
//    
//    sizeFrequencySite = ["ScientificName", "SiteName"]; //speciesBySiteFrequency
//    sizeFrequencyYear = ["ScientificName", "SurveyYear"]; //speciesByYearFrequency
//    
//    distributionSite = ["ScientificName", "SiteName"]; //speciesBySiteDistribution
//    
//    // Generic set of return (out) fields
//    returnFields = ["SiteNumber", "SiteCode", "SiteName", "IslandCode", "IslandName", "CommonName", "SurveyYear"];
}

var outputParameters = {
    "meanCountFields": ["SpeciesName", "Mean", "StandardDeviation", "StandardError", "Cases"], // for Quadrat, Transect sources 
    "meanCountFieldsRPC": ["ScientificName", "Mean", "StandardDeviation", "StandardError", "Cases"], // For RPC sources
    "armSizeFreqFields":  ["ScientificName", "NoOfIndPerARM", "MeanSize", "MinSize", "MaxSize", "NoOfARMsSampled", "TotalCount"], // for ARM Size/Frequency sources  NOTE: Missing IslandName 
    "fishSizeFreqFields": ["SurveyDate", "Count", "TotalLength_cm", "MinimumLength_cm", "MaximumLength_cm"], // for Fish Size/Frequency source
    "countSizeFields": ["SpeciesName", "NoOfInd", "Size_mm"], // for Natural Habitat Size source
    "sizeGorgoniansFields": ["Height_cm", "Width_cm", "Marker"], // for Gorgonians source
    "sizeMacrocystisFields": ["Stipe_Count", "Diameter_cm", "Marker"] // for Macrocystis source
}

var queryAttributes = {
    "title": [{
        "SampleSite": 'Count per area (mean)',
        "SampleYear": 'Count per year (mean)'
    }],
    "subtitle": [{
        "SampleSite": "",
        "SampleYear": ""
    }], 
    "xLabel": [{
        "SampleSite": 'Survey Year',
        "SampleYear": 'Survey Site'
    }],
    "yLabel": [{
        "SampleSite": 'Density (count per area)',
        "SampleYear": 'Density (count per year)'
    }],
    "lineTooltip": [{
        "SampleSite": 'Year: <b>{point.x}</b><br/>',
        "SampleYear": 'Species: <b>{point.x}</b><br/>'
    }]
}

var renderTargets = {
    "1mQuadrat": 'chartSiteSpecies1',
    "5mQuadrat": 'chartSiteSpecies2',
    "BandTransect": 'chartSiteSpecies3',
    "RPC": 'chartSiteSpecies4'
}

function getConfig() {
	//require(["esri/IdentityManager", "esri/ServerInfo", "esri/Credential", "esri/request", "esri/tasks/query", "esri/tasks/QueryTask", "esri/tasks/StatisticDefinition", "esri/layers/FeatureLayer", "dojo/request", "dojo/DeferredList"], function (idManager, ServerInfo, Credential, esriRequest, Query, QueryTask, StatisticDefinition, FeatureLayer, request, DeferredList) {
    require(["esri/IdentityManager", "esri/ServerInfo", "esri/Credential", "esri/request", "dojo/request", "dojo/DeferredList"], function (idManager, ServerInfo, Credential, esriRequest,  request, DeferredList) {

        var newToken = "";
        var serverInfo = new ServerInfo();
            serverInfo.server = "https://nps.maps.arcgis.com/";
            serverInfo.tokenServiceUrl = "https://nps.maps.arcgis.com/sharing/generateToken";
			serverInfo.shortLivedTokenValidity = 720;
            idManager.registerServers([serverInfo]);
            esri.config.defaults.io.corsEnabledServers.push("nps.maps.arcgis.com");
            
            var userId = "IMDGISTeam";

        idManager.generateToken(serverInfo, {
            username: userId,
            password: password,
            client: "requestip",
            f: "json"
        }).then(function (response) {
            console.log(response.token);
			var creationTime = (new Date).getTime();
			var expirationTime = creationTime + (serverInfo.shortLivedTokenValidity * 60000);
			//idManager.tokenValidity = expirationTime;
			/*var idObject ={};  
            idObject.serverInfos= [serverInfo];  
            var credentials={};  
            credentials.userId = "util";  
            credentials.server = "https://nps.maps.arcgis.com/";
			credentials.token = response.token;
			credentials.expires = expirationTime;
			credentials.ssl = true;
			credentials.scope = "server";
			credentials.validity = 720;
			credentials.creationTime = creationTime;
			esri.id.intialize(idObject);*/
            idManager.registerToken({
                server: serverInfo.server,
                userId: userId,
                token: response.token,
                expires: expirationTime,//response.expires,
                ssl: response.ssl
            });
            newToken = response.token;
            return newToken;
        }),(function (err) {
            configErrorDetails(err);
            return 'ERROR: getConfig() failed!!!\n' + err;
        });
        
    });
}

function configErrorDetails(err) {
    console.error('ERROR: getConfig() failed!!!');
    console.error('\n\n ERROR DETAILS:\n' + err);
}

function getLookups(srcTable) {
    
    require(["esri/tasks/query", "esri/tasks/QueryTask", "esri/tasks/StatisticDefinition", "esri/layers/FeatureLayer", "dojo/request", "dojo/DeferredList"], function (Query, QueryTask, StatisticDefinition, FeatureLayer, request, DeferredList) {
    // Query source table(s) for use as selections
    console.log('In getLookups()');
    tempLayer = new FeatureLayer(srcTable, {});

    var query = new Query();
    //query.where = "SiteName='Arch Point' and SpeciesName='Pisaster giganteus'";
    query.outFields = ["SiteName", "SpeciesName"];

    console.log('Ready to query');
    console.log('isAdvanced?: ' + tempLayer.supportsAdvancedQueries);
    tempLayer.queryFeatures(query, queryCompleteHandler, queryErrorHandler);
    
    return tempLayer;
    })
}

function queryCompleteHandler(queryResults) {
    console.log("complete", queryResults);
    return (queryResults.toJson());
}

function queryErrorHandler(queryError) {
    console.log("error", queryError.error.details);
}


