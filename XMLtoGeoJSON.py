#-------------------------------------------------------------------------------
#
#   XMLtoGeoJSON.py
#
#   Given REST URLs for Climate Database Station Locations,
#   iterate the XML nodes to produce GeoJSON-format text files
#   for consumption by map widgets.
#
#
#   Prerequisites/Inputs:
#       REST service for Climate Database
#       Output Folder/Workspace
#
#   DOM of example feature from REST response:
#
#   <StationInventory>
#		<CDBCode>CDB_S_38179</CDBCode>
#		<SourceCode>USGS</SourceCode>
#		<SourceName>USGS</SourceName>
#		<StationCode>01389500</StationCode>
#		<StationName>Passaic River at Little Falls NJ</StationName>
#		<VersionCount>0</VersionCount>
#		<RequestStatus>Can Request</RequestStatus>
#		<StartDate>1897-08-16</StartDate>
#		<EndDate>2004-09-30</EndDate>
#		<StationID>38179</StationID>
#		<LocationInfo>
#			<Location>
#				<CDBCode>CDB_S_38179</CDBCode>
#				<Latitude>40.88446</Latitude>
#				<Longitude>-74.2255554</Longitude>
#				<StateName>New Jersey</StateName>
#				<Shape>POINT (-74.225555 40.88446)</Shape>
#			</Location>
#		</LocationInfo>
#		<VersionInfo/>
#	</StationInventory>
#
#   Outputs:
#       Text files in GeoJSON format for each station type
#
#   Created by:  NPS Inventory and Monitoring Division Monitoring, Modeling, Analysis, and Synthesis group
#   Update date: 20140417
#
#-------------------------------------------------------------------------------

import urllib2, xml.dom.minidom, os

docURLInit = "http://irmaservices.nps.gov/v3/rest/climate/stationInventory?showLocation=True&format=XML&sourceCode="
#docURL = r'http://irmaservices.nps.gov/v3/rest/climate/stationInventory?showLocation=True' # Too slow
#docURL = r'http://irmaservices.nps.gov/v3/rest/climate/stationInventory?startDate=1890-01-01&endDate=1899-01-01&showLocation=True&format=XML'
#docURL = r'http://irmaservices.nps.gov/v3/rest/climate/stationInventory?sourceCode=RAWS&startDate=2010-01-01&endDate=2014-01-01&showLocation=True&format=XML'
#docURL = r'http://irmaservices.nps.gov/v3/rest/climate/stationInventory?sourceCode=GHCN&showLocation=True&format=XML'
#docURL = r'http://irmaservices.nps.gov/v3/rest/climate/stationInventory?sourceCode=SNOTEL&showLocation=True&format=XML'
#docURL = r'http://irmaservices.nps.gov/v3/rest/climate/stationInventory?sourceCode=SNOWCOURSE&showLocation=True&format=XML'

outputFolder = r'D:\Project_Workspace\AppDev\GitHub\MapWidgets\Data'
#outputFileName = r'climateStationsSNOWCOURSE.txt'

stationTypes = ["SNOTEL","SNOWCOURSE","GHCN","RAWS","CDIAC","USGS","USCRN"]
#stationTypes = ["USGS"]
#stationTypes = ["RAWS","CDIAC","USGS","USCRN"]

gjInit = "{\"type\":\"FeatureCollection\",\"features\": ["
gjFeatureFragment = "{\"type\": \"Feature\", \"id\":%s, \"properties\": {\"%s\":\"%s\"},\"geometry\": { \"type\": \"Point\",\"coordinates\": [%s,%s]}"
gjFeatureClose = "}" #need , after each feature
gjClose = "]}"

outputGeoJSON = ""

def getText(nodelist):
    rc = []
    for node in nodelist:
        if node.nodeType == node.TEXT_NODE:
            rc.append(node.data)
    return ''.join(rc)

def outputGeoFile(gjText,sTypeName):
    outputFileName = "climateStations" +sTypeName+ ".txt"
    fileName = os.path.join(outputFolder, outputFileName)
    with open(fileName,"w") as logFile:
        logFile.write(gjText)
        logFile.close()

def readXML(xmlData,sType):
    i = 0
    # Walk the DOM tree to extract elements from REST response
    stations = xmlData.getElementsByTagName("StationInventory")
    for station in stations:
        errorFlag = 0
        if i == 0:
            outputGeoJSON = gjInit

        #Get details from each station - becomes a GeoJSON Feature in the FeatureCollection
        stationName = station.getElementsByTagName("StationName")[0]
        stationCode = station.getElementsByTagName("StationCode")[0]
        sourceCode = station.getElementsByTagName("SourceCode")[0]
        stationID = station.getElementsByTagName("StationID")[0]
        CDBCode = station.getElementsByTagName("CDBCode")[0]
        locationsInfo = station.getElementsByTagName("LocationInfo")[0]
        locations = locationsInfo.getElementsByTagName("Location")[0]
        try:
            longitude = locations.getElementsByTagName("Longitude")[0]
            latitude = locations.getElementsByTagName("Latitude")[0]
            stateName = locations.getElementsByTagName("StateName")[0]
        except:
            errorFlag = 1

        # If location elements have data, write GeoJSON feature string
        if errorFlag < 1:
            if i>0:
                outputGeoJSON += ","
            outputGeoJSON += "{\"type\": \"Feature\", \"id\":%s, \"properties\": {\"%s\":\"%s\",\"%s\":\"%s\",\"%s\":\"%s\",\"%s\":\"%s\",\"%s\":\"%s\",\"%s\":\"%s\"},\"geometry\": { \"type\": \"Point\",\"coordinates\": [%s,%s]}" % (str(i), "SourceCode", getText(sourceCode.childNodes),"StationName", getText(stationName.childNodes), "StationCode", getText(stationCode.childNodes),"StationID", getText(stationID.childNodes),"CDBCode", getText(CDBCode.childNodes), "StateName", getText(stateName.childNodes), getText(longitude.childNodes), getText(latitude.childNodes))
            outputGeoJSON += gjFeatureClose
            i = i + 1

        errorFlag = 0

    outputGeoJSON += gjClose
    print sType #outputGeoJSON
    outputGeoFile(outputGeoJSON,sType)

def main():
    for stationType in stationTypes:
        docURL = docURLInit + stationType
        xmlFile = urllib2.urlopen(docURL)
        xmlData = xmlFile.read()
        dom = xml.dom.minidom.parseString(xmlData)
        readXML(dom,stationType)
    #outputGeoFile()

if __name__ == '__main__':
    main()
