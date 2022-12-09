const express = require("express");
const { request } = require("http");
const app = express();
const path = require("path");
const { response } = require("express");
const { info } = require("console");
app.use(express.urlencoded({
    extended : true
}))
let movieTickets = [];
function getSessionId(sessionStr) {
	let regex = new RegExp("dfMessenger-\\d+", "i");
	let match = sessionStr.match(regex);
	if (match) {
		regex = new RegExp("\\d+", "i");
		return match[0].match(regex)[0]
	}
	return "";
}
function getMovieTicketInfo(sessionId) {
	return movieTickets.find((val)=>{
		return val.sessionId === sessionId;
	})
}
function addMovieTicketInfo(sessionId) {
	movieTickets.push({
		sessionId: sessionId,
		movieName: "",
		noOfPeople: 0,
		dt: "",
		showTime: "",
		bookingReference: ""
	});
}
function updateMovieTicketInfo(sessionId, info) {
	let bookingInfo = getMovieTicketInfo(sessionId);
	if (info.movieName) {
		bookingInfo.movieName = info.movieName
	}
	if (info.noOfPeople) {
		bookingInfo.noOfPeople = info.noOfPeople
	}
	if (info.dt) {
		bookingInfo.dt = info.dt
	}
	if (info.showTime) {
		bookingInfo.showTime = info.showTime
	}	
}
function generateQuestion(obj)
{
    if(!obj.movieName)
    {
        return generatemovienamequestion();
    }
    if(!obj.noOfPeople)
    {
        return generatenoofpeoplequestion();
    }
    if(!obj.dt)
    {
        return generatedtquestion();
    }
    if(!obj.showTime)
    {
        return generateshowtimequestion();
    }
    return generatebookrefnumber()
}
    function generatebookrefnumber()
    {
        return {
            "fulfillmentMessages": [
              {
                "text": {
                  "text": [
                    "your booking reference number is 11111"
                  ]
                }
              }
            ]
          }
    }
    function generatemovienamequestion()
    {
        return {
                "fulfillmentMessages": [
                  {
                    "card": {
                      "title": "card title",
                      "subtitle": "card text",
                      "imageUri": "https://example.com/images/example.png",
                      "buttons": [
                        {
                          "text": "button text",
                          "postback": "https://example.com/path/for/end-user/to/follow"
                        }
                      ]
                    }
                  }
                ]
            }
    }
    function generatenoofpeoplequestion()
    {
        return {
            "fulfillmentMessages": [
              {
                "text": {
                  "text": [
                    "how many people would be going?"
                  ]
                }
              }
            ]
          }
    }
    function generatedtquestion()
    {
        return {
            "fulfillmentMessages": [
              {
                "text": {
                  "text": [
                    "please specify a date"
                  ]
                }
              }
            ]
          }
    }
    function generateshowtimequestion()
    {
        return {
            "fulfillmentMessages": [
              {
                "text": {
                  "text": [
                    "could you specify a showtime?"
                  ]
                }
              }
            ]
          }
    }
app.use(express.json());
const port = 3333;
app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname, "/testdf.html"))
})
app.post("/handledialogflow", (req, res) =>{
    console.log(req.body); 
    let sessionStr = req.body.session;
    let sessionId = getSessionId(sessionStr);
    let movieinfo = getMovieTicketInfo(sessionId);
    console.log(movieinfo);
    if (!movieinfo)
    {
        addMovieTicketInfo(sessionId);
    }
        let info = {}
        let parameters = req.body.queryResult.parameters;
        if(req.body.queryResult.intent.displayName == "fallback" || req.body.queryResult.intent.displayName == "number of people")
        {
            if(req.body.queryResult.queryText == "rocky 4")
            {
                info.movieName = "rocky 4"
            }
        }
        if(parameters.moviename)
        {
            info.movieName = parameters.moviename
        }
        if(parameters.nofpeople)
        {
            info.noOfPeople = parameters.nofpeople
        }
        if(parameters.showtimes)
        {
            info.showTime = parameters.showtimes
        }
        if(parameters.date)
        {
            info.dt = parameters.date
        }
    updateMovieTicketInfo(sessionId,info);
    let response = generateQuestion(getMovieTicketInfo(sessionId));
    res.send(response);
    console.log(movieTickets);
})
app.listen(port,() =>{
    console.log("server is listening on port ", port)
})