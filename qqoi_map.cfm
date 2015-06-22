<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
	<!--- UPDATE - each page should have a unique title --->
    <title>I&amp;M Quarter Quads of Interest </title>
	
    <!--- LEAVE the following meta and link lines alone    --->
	<meta name="Description" content="National Park Service, Inventory &amp; Monitoring Program, Data Management" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="Keywords" content="National Park Service, national parks, natural resources, inventory, monitoring" />	 
	<link rel="icon" href="/im/assets/images/icons/nps/AH_small_flat_4C_12x16.png" type="image/png" />
	<link rel="stylesheet" type="text/css" href="/im/assets/css/imglobal.css" />    
    <!--[if lte IE 8]><link rel="stylesheet" type="text/css" href="/im/assets/css/IEGlobal.css" /><![endif]-->
    <!--- OPTIONAL ADD custom stylesheets below this point--->

	<!-- LEAVE the two script lines below alone - Jquery library - drop-down menu driver -->
	<script type="text/javascript" src="/im/assets/scripts/JQuery/jquery-1.9.1.min.js"></script> 
    <cfinclude template="/im/assets/includes/imBrowserForDropDownMenus.cfm" />
	<!-- OPTIONAL ADD other scripts below this point  -->
	
        
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
            <p>Select your network and zoom to an area of interest within it. Click on a quarter quad feature to view quad name and note/copy the name to a temporary text file. If additional quads are desired, click on a another point, note/copy the new quad name. When all quads have been identified, click the Email Quad Request link and paste in the list of quad names you want added. </p>
			<div>
				<select id="networks" onChange="javascript:updateMap()">
					<option value="-78.7563248915812,38.1178979702527,34.9869637837146,-85.4858382343991">Appalachian Highlands Network</option>
					<option value="-145.4,71.3,58.5,-174">Arctic Network</option>
					<option value="-138.64165979668,70.0584770014666,59.3119041698086,-154.776426348926">Central Alaska Network</option>
					<option value="-99.0821634278,34.38763477672,28.6921092734647,-108.201985939386">Chihuahuan Desert Network</option>
					<option value="-79.25545581197,39.146522867577,33.4370465279844,-89.7900709944988">Cumberland Piedmont Network</option>
					<option value="-74.4199683769803,43.525791903221,37.201382820178,-82.6428140958851">Eastern Rivers and Mountains Network</option>
					<option value="-82.4128097063918,49.3846850237442,41.113168582835,-97.2372933322295">Great Lakes Network</option>
					<option value="-107.387797883135,46.1875360177346,42.5411754715842,-112.083184066674">Greater Yellowstone Network</option>
					<option value="-81.215705472137,36.3803316351714,25.836886013416,-100.508148831318">Gulf Coast Network</option>
					<option value="-80.5190081219607,45.0921573117721,32.9172813055575,-99.2754449439726">Heartland Network</option>
					<option value="-119.666474220237,45.0340542793037,38.5332520073989,-124.585271414522">Klamath Network</option>
					<option value="-116.559875394702,36.8688893846847,32.5340868454919,-120.899331051055">Mediterranean Coast Network</option>
					<option value="-75.2509998447767,40.6318422713448,36.2957911839403,-79.8828392052346">Mid-Atlantic Network</option>
					<option value="-113.142585245576,39.5975400214375,32.5808173165151,-118.41113251193">Mojave Desert Network</option>
					<option value="-76.2,40,38.25,-80">National Capital Region Network</option>
					<option value="-119.576696626211,49.0023889889908,45.0340542506398,-124.761484940329">North Coast and Cascades Network</option>
					<option value="-69.930610695897,42.0821812780159,36.5501850887777,-77.3220300798455">Northeast Coastal and Barrier Network</option>
					<option value="-66.9498031100687,47.4594875756156,40.2253546060365,-76.3825088852339">Northeast Temperate Network</option>
					<option value="-106.456155776978,43.1315307617188,36.5839443206787,-114.316297531128">Northern Colorado Plateau Network</option>
					<option value="-96.148813687636,49.0004845605927,39.1353478254623,-105.615619460221">Northern Great Plains Network</option>
					<option value="-152,24,-16,-173">Pacific Islands Network</option>
					<option value="-103.49741897366,49.0008888024695,37.2531437467533,-116.048590268541">Rocky Mountain Network</option>
					<option value="-120.806445296821,39.1208041010395,35.4413765693425,-123.742472016527">San Francisco Bay Area Network</option>
					<option value="-116.997094425824,41.3884573011419,34.9317173938434,-121.646145507093">Sierra Nevada Network</option>
					<option value="-107.419310783243,35.1413751976143,31.3321860233664,-114.813074378517">Sonoran Desert Network</option>					
					<option value="-64.5625,28.3110,17.6766,-82.8514">South Florida Caribbean Network</option>
					<option value="-130.025010624255,59.7871400619188,54.6780257918927,-139.150034374472">Southeast Alaska Network</option>
					<option value="-75.4611068061895,36.6323719539687,27.7109065143522,-86.1619189159982">Southeast Coast Network</option>
					<option value="-104.875838858818,38.5536886800746,33.3451668408943,-113.979204234427">Southern Colorado Plateau Network</option>
					<option value="-94.4341094764932,39.8288741729739,29.4183881961744,-105.955110771765">Southern Plains Network</option>
					<option value="-149.023392874452,62.6140125870353,52.0111522971165,-175.052686585908">Southwest Alaska Network</option>
					<option value="-111.522770077718,49.0008888024695,38.6102196608008,-120.934284544668">Upper Columbia Basin Network</option>
				</select>
				<p><br/><a href="mailto:mike_story@nps.gov">Email Quad Request</a></p>
			</div>
			<div id="example-map" style="height:500px;position:absolute;width:500px;">
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
				content: '{{MRC_CODE}}',
				simpleTree: true,
				title: '{{QUADNAME}}'
			  },
			  layers: 0,
			  name: 'Nationwide Quarter Quads',
			  opacity: 0.4,
			  tiled: false,
			  type: 'ArcGisServerRest',
			  url: 'http://irmaservices.nps.gov/arcgis/rest/services/NPSData/QuarterQuads_FullExtent/MapServer'
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
			  url: 'http://irmaservices.nps.gov/arcgis/rest/services/NPSData/networks/MapServer'
		}
		]
      };
	   
      (function() {
        var s = document.createElement('script');
        s.src = 'http://www.nps.gov/npmap/1.0.0/bootstrap.js';
        document.body.appendChild(s);
      })();
	  
	  function updateMap() {
		var bounds = $("#networks").val();
		//alert(bounds);
		var zoomBounds = new Object();
		//alert(bounds.split(","));
		tt = bounds.split(",");
		zoomBounds.e = tt[0];
		zoomBounds.n = tt[1];
		zoomBounds.s = tt[2];
		zoomBounds.w = tt[3];
		NPMap.Map.toBounds(zoomBounds);
	  }
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