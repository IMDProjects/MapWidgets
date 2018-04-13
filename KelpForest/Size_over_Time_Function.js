function getChart (data) {
chart = new Cedar({
  "type": "bar-horizontal",
  //"type": "scatter",
  "dataset": {
      "data": data,
    "mappings": {
      //"x": {"field":parseInt("Year"),"label":"Survey Year"},
      //"y": {"field":parseFloat("avg_Size_mm"),"label":"Avg Size (mm)"}
      //"y": {"field":"Year","label":"Survey Year"},
      "y": {"field":"SurveyYear","label":"Survey Year"},
      "x": {"field":"avg_Size_mm","label":"Avg Size (mm)"}
    }
  } }).show({
  elementId: "#chart"
});
}