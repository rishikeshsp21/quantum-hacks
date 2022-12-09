const express = require("express");
const { request } = require("http");
const app = express();
const path = require("path");
const { response } = require("express");
const { info } = require("console");
const dfff = require("dialogflow-fulfillment");
const { platform } = require("os");
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
  if(info.bookingReference)
  {
    bookingInfo.bookingReference = bookref
  }
}
const min = 100000;
const max = 999999;
function generatebookref(min, max){
  return Math.floor(
    Math.random() * (max - min) + min)
}
app.use(express.json());
const port = 3333;
app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname, "/testdfinal.html"))
})
app.listen(port,() =>{
    console.log("server is listening on port ", port)
})
app.post("/handledialogflow",express.json(), (req, res) =>
{
  const agent = new dfff.WebhookClient({
    request : req,
    response : res
});
    console.log(req.body);
    let sessionStr = req.body.session;
    let sessionId = getSessionId(sessionStr);
    console.log(sessionId)
    let movieinfo = getMovieTicketInfo(sessionId);
    
    if (!movieinfo)
    {
        addMovieTicketInfo(sessionId);
    }

    let info = {}
    let parameters = req.body.queryResult.parameters;
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
    let obj = {};
    /*function generateQuestion(obj)
    {
    if(!obj.movieName)
    {
        gmn(agent);
        return
    }
    if(!obj.noOfPeople)
    {
      getnofpeople(agent);
      return
    }
    if(!obj.dt)
    {
      getdate(agent);
      return
    }
    if(!obj.showTime)
    {
      getshowtime(agent);
      return
    }
    if(!obj.bookingReference)
    {
      obj.bookingReference = bookref;
    }
}*/
updateMovieTicketInfo(sessionId,info);
  /*generateQuestion(obj);*/
    console.log(movieinfo);
    const bookref = generatebookref(min, max);
    console.log(bookref);
    function gmn(agent)
    {
        var payloaddata = 
        {
            "richContent": [
              [
                {
                  "type": "chips",
                  "options": [
                    {
                      "text": "rocky 4",
                      "image": {
                        "src": {
                          "rawUrl": ""
                        }
                      },
                      "link": ""
                    },
                    {
                      "text": "rocky 5",
                      "image": {
                        "src": {
                          "rawUrl": ""
                        }
                      },
                      "link": ""
                    },
                    {
                      "text": "rocky balboa",
                      "image": {
                        "src": {
                          "rawUrl": ""
                        }
                      },
                      "link": ""
                    }
                  ]
                }
              ]
            ]
        }
        agent.add(new dfff.Payload(agent.UNSPECIFIED, payloaddata,{
            sendAsMessage: true, rawPayload: true}))
    }
    function bookaticket(agent)
    {
        agent.add("I can definitely help you with that");
    }
    function getnofpeople(agent)
    {
        agent.add("how many people are going?");
    }
    function getshowtime(agent)
    {
        agent.add("what showtime would you like to watch the movie?");
    }
    function getdate(agent)
    {
        agent.add("For what date should I book the tickets?");
    }
    function getconfirmation(agent)
    {
      agent.add("your booking has been confirmed and your reference number is " + bookref);
      obj.bookingReference = bookref;
    }
    var intentmap = new Map();
    intentmap.set("book a ticket", bookaticket);
    intentmap.set("get movie name", gmn);
    intentmap.set("get date", getdate);
    intentmap.set("get showtime", getshowtime);
    intentmap.set("get number of people", getnofpeople);
    intentmap.set("get confirmation", getconfirmation);
    agent.handleRequest(intentmap);
})