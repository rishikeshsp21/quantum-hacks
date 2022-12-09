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
app.use(express.json());
const port = 6969;
app.get("/", (requ, resp)=>{
    resp.sendFile(path.join(__dirname, "/iframe.html"))
})
app.listen(port,() =>
{
    console.log("server is listening on port ", port)
});
app.post("/hdf",express.json(), (req, res) =>{
    const agent = new dfff.WebhookClient
    ({
        request : req,
        response : res
    })
    console.log(req.body);
    console.log(req.body.queryResult.intent.displayName);
    function gethelp(agent)
    {
        agent.add("I'll try to help you with the best of my abilities. To begin, could you tell me the code that you were assigned?")
    }
    function getcode(agent)
    {
        agent.add("Aight, let's get started! How is your day going today?")
    }
    function goodday(agent)
    {
        agent.add("great to hear that, hope the rest of your day goes well.")
    }
    function goodbye(agent)
    {
        agent.add("Aight, I'mma head out.")
    }
    function cancel(agent)
    {
        var payloaddata = 
        {
            "richContent": [
              [
                {
                  "type": "chips",
                  "options": [
                    {
                      "text": "yes, I'd like to cancel.",
                      "image": {
                        "src": {
                          "rawUrl": ""
                        }
                      },
                      "link": ""
                    },
                    {
                      "text": "no",
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
    function yes(agent)
    {
        agent.add("Aight, I'mma head out.")
    }
    function dfv(agent)
    {
        agent.add("The way people respond to your thoughts or existence is a representation of their own inner psyche and it isn't related to something you did. You're doing amazing.")
    }
    function sad(agent)
    {
        agent.add("That's no good fam, ")
    }
    function hecday(agent)
    {
        agent.add("give yourself a pat on the back and reward yourself with an icecream. You deserve it!");
    }
    function wp(agent)
    {
        agent.add("His actions are not a reaction to your actions but a response aimed at someone else directed at you");
    }
    function moddep(agent)
    {
        agent.add("Everyone does things at their own pace and all you have to do is believe in yourself");
    }
    function heavydep(agent)
    {
        agent.add("Food, sleep and staying hydrated are 3 things that can elevate your headspace.");
    }
    function bullied(agent)
    {
        agent.add("Please talk to someone you're comfortable with and trust. If that doesn't work out, try contacting: 1800-180-5522");
    }
    function fake(agent)
    {
        agent.add("we're sorry to see that you percieve mental health that way, why don't you try giving us a shot");
    }
    function finances(agent)
    {
        agent.add("If you think that you've hit rock bottom, the only way is UP UP AND AWAY");
    }
    function loss(agent)
    {
        agent.add("I'm extremely sorry to hear that, what I'd do is I'd try to journal and open up to someone I trust and feel close to");
    }
    function selfharm(agent)
    {
        agent.add("Each person deals with their issues in their own way, they have their own coping mechanisms, if i were you i would talk to a loved one and find a healthy coping mechanism to deal with it.");
    }
    function selfworth(agent)
    {
        agent.add("Life is too short to waste any amount of time on wondering what other people think about you. In the first place, if they had better things going on in their lives, they wouldn't have the time to sit around and talk about you. What's important to you is not others' opinions of you, but what's important to you is your opinion of yourself.");
    }
    function suicidal(agent)
    {
        agent.add("Giving up is not a solution, think of how it would effect people who care about you.Please talk to your loved ones and if it is not possible, contact: 9152987821");
    }
    var intentmap = new Map();
    intentmap.set("get help", gethelp);
    intentmap.set("get code", getcode);
    intentmap.set("good day", goodday);
    intentmap.set("goodbye", goodbye);
    intentmap.set("cancel", cancel);
    intentmap.set("yes cancel", yes);
    intentmap.set("don't feel valued", dfv);
    intentmap.set("hectic day", hecday);
    intentmap.set("workplace", wp);
    intentmap.set("sad",sad);
    intentmap.set("moderately depressed",moddep);
    intentmap.set("heavily depressed",heavydep);
    intentmap.set("bullied",bullied);
    intentmap.set("fake",fake);
    intentmap.set("finances",finances);
    intentmap.set("loss",loss);
    intentmap.set("self harm",selfharm);
    intentmap.set("self worth",selfworth);
    intentmap.set("suicidal",suicidal);
    agent.handleRequest(intentmap);
});