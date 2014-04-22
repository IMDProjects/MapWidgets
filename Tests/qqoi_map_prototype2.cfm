<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<!--- UPDATE - each page should have a unique title --->
    <title>I&amp;M Quarter Quads of Interest Example Map</title>
	
    <!--- LEAVE the following meta and link lines alone    --->
	<meta name="Description" content="National Park Service, Inventory &amp; Monitoring Program, Data Management" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="Keywords" content="National Park Service, national parks, natural resources, inventory, monitoring" />	 
	<link rel="icon" href="/im/assets/images/icons/nps/AH_small_flat_4C_12x16.png" type="image/png" />
	<link rel="stylesheet" type="text/css" href="/im/assets/css/imglobal.css" />    
    <!--[if lte IE 8]><link rel="stylesheet" type="text/css" href="/im/assets/css/IEGlobal.css" /><![endif]-->
    <!--- OPTIONAL ADD custom stylesheets below this point--->

	<!--- LEAVE the generic JQuery script alone --->
	<script type="text/javascript" src="/im/assets/scripts/JQuery/jquery-1.4.4.min.js"></script> 
	<!--- OPTIONAL ADD other scripts below this point  --->
	
        
<!--- LEAVE the lines below alone until the next "OPTIONAL UPDATE" comment below --->
</head>
<body>
    <div id="wrapper">
        <div id="page" class="clearfix">	
			<cfinclude template="/im/assets/includes/header.cfm">
			<cfset thisDiv = "IMD">
            
            <!--- OPTIONAL UPDATE - only required when this page will not be listed in the left-hand navigation.  To highlight/expand the parent folder/topic 
			page in the left-hand navigation, change the default "thisPage variable below (#CGI.script_name#) to the actual file name and path from the 
			server root of the parent page that you want highlighted/expanded in the left-hand navigation (e.g., "/im/datamgmt/index.cfm"). --->
			<cfset thisPage = #CGI.script_name#>  
			
            <div id="content" class="clearfix" >             
            <div class="hideInPrintView">
            
                	<!--- OPTIONAL UPDATE your breadcrumbs here  - suggest only two layers below I&M --->
                    <div class="breadcrumb"><a href="http://www.nps.gov">NPS</a> &raquo; 
						<a href="http://www.nature.nps.gov/index.cfm">Explore Nature</a> &raquo; <a href="/im/">I&amp;M</a> &raquo; GIS
					</div>
           </div>
             
            <!--- UPDATE the left-hand navigation for your site in the separate template include file below --->            
			<cfmodule template="/im/assets/includes/imNav.cfm" callingDiv="#thisDiv#" callingPage="#thisPage#">   
                <div class="main">
					<div class="article">           
                        
			 <!--- UPDATE - MAIN PAGE CONTENT STARTS HERE  --->
			<div class="intro">	
			<h1>Quarter Quads of Interest Map</h1>
			</div> 
            
            <p><b>Example map of quarter quads of interest with park boundaries.</b></p>
           
			<br /><br />
			<div id="example-map" style="height:600px;position:absolute;width:600px;">
    </div>
    <script>
      var NPMap = NPMap || {};
	  
	  var ptStyle = {
		radius: 8,
		color: "#0008ff"
		};
      
      NPMap.config = {
        api: 'leaflet',
        div: 'example-map',
        layers: [{
          identify: {
				content: '{{MRC_CODE}}',
				simpleTree: true,
				title: '{{QUADNAME}}'
			  },
			  layers: 'all',
			  name: 'National Park Quarter Quads of Interest',
			  opacity: 0.7,
			  tiled: false,
			  type: 'ArcGisServerRest',
			  url: 'http://irmaservices.nps.gov/arcgis/rest/services/NPSData/QuarterQuads/MapServer'
        },
		{
			identify: {
				content: '{{UNIT_CODE}}',
				simpleTree: true,
				title: '{{Full_Name}}'
			  },
			  layers: 'all',
			  name: 'National Parks',
			  opacity: 0.7,
			  tiled: false,
			  type: 'ArcGisServerRest',
			  url: 'http://irmaservices.nps.gov/arcgis/rest/services/NPSData/NPS_Boundaries_WebMercator_labelfree/MapServer'
		},
		{
			identify: {
				content: '{{NETWORK_NA}}',
				simpleTree: true,
				title: '{{NETWORK_NA}}'
			  },
			  layers: 'all',
			  name: 'Inventory and Monitoring Networks',
			  opacity: 0.7,
			  tiled: false,
			  type: 'ArcGisServerRest',
			  url: 'http://irmaservices.nps.gov/arcgis/rest/services/NPSData/Networks/MapServer'
		}
		]
      };
	   
      (function() {
        var s = document.createElement('script');
        s.src = 'http://www.nps.gov/npmap/1.0.0/bootstrap.js';
        document.body.appendChild(s);
      })();
    </script>
	<br/>
	
        
			<p class="top"><a href="#top">&uArr; To Top of Page</a></p>
                 
                     
             <!--- END of page content - NOTHING should be edited below this point --->  
            </div>
           </div>
          </div>
         </div>
		    <div class="DateLastModified">
			<cfdirectory action="list"
            	directory="#ExpandPath(".")#\"
                name="qGetLastdateModified"
                filter="#ListLast(CGI.SCRIPT_NAME, "/")#">
			<cfif qGetLastdateModified.recordCount>
				<cfoutput>Last Updated: #DateFormat(qGetLastdateModified.dateLastModified, "mmmm dd, yyyy")# </cfoutput>
			</cfif>
            <span style="margin-left: 20px;"><a href="/im/contact/contact.cfm"><strong>Contact Webmaster</strong></a></span>
            </div> 
			<cfinclude template="/im/assets/includes/footer.cfm">
		</div>
</div>
</body>
</html> 