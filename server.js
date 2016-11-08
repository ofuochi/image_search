var app = require("express")();
var request = require("request");

app.get("/api/imagesearch/:query", (req, res) => {
   var query = req.params.query;
   var parameters = req.query;
   var link = "https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=" + query + "&count=10&mkt=en-us&safeSearch=Moderate";


   if (parameters.offset) link += "&offset=" + parameters.offset;

   var options = {
      url: link,
      headers: {
         'User-Agent': 'request',
         'Ocp-Apim-Subscription-Key': '00bddc581c194444a44449fe2a514584'
      }
   };

   function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
         var info = JSON.parse(body);
         res.send(info);
      }
   }
   request(options, callback);

});
app.listen(8080);