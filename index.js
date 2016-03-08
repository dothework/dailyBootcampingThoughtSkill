/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Daily Bootcampimg for a thought"
 *  Alexa: "Here's your thought for the day: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.echo-sdk-ams.app.bcbe62c4-8015-445c-a93e-ca0cb2547015"; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing space facts.
 */
var AFFIRMATIONS = [
    "Ship Code.",
    "This Shit is Not Random.",
    "It always seems impossible until it's done.",
    "Big goals get big results. No goals get no results or someone else's results.",
    "Cancel the goal. Then get it done.",
    "You practice and you get better. It's very simple.",
    "Show up, sit down and do the work",
    "What one does is what counts. Not what one had the intention of doing.",
    "I don't control life, but I can control how I react to it.",
    "Your first 10,000 lines of code are your worst.",
    "If it gets easy, it gets less intersting.",
    "There is no reason not to follow your heart.",
    "To dare is to lose one's footing momentarily. Not to dare is to lose oneself.",
    "The only real stumbling block is fear of failure. In bootcamping you've got to have a what-the-hell attitude.",
    "Adversity has a way of introducing a man to himself.",
    "Forget past mistakes. Forget failures. Forget everything excpet what you're going to do now and do it.",
    "Start over.",
    "The minute you're not learning. You're dead.",
    "You're not a tree. If you don't like where you are, move.",
    "Character consists of what you do on the third and foruth tries.",
    "You must do the thing that you think you cannot do.",
    "Never quit. Never quit. Never quit.",
	"Clarity, strategy and execution. Know, plan and do.",
    "The first rule of holes. Stop digging.",
    "Use every resource you can. If it's not enough, get more.",
    "The best developers write the least code.",
    "There is unlikely to be anything that can be identified as perfect code.",
    "Do what it takes to be great. Do it now.",
    "Honor your decsiion to do this work by doing your very best.",
    "You can only ever do your best. That's all you have to do.",
    "The cave you fear to enter holds the treasure you seek.",
    "Hack your mind, ask your questions out loud.",
    "Thank you for doing this honorable work.",
    "You are creating a vastly better version of yourself. True true."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * DailyAffirmations is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var DailyBootcamping = function() {
	AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
DailyBootcamping.prototype = Object.create(AlexaSkill.prototype);
DailyBootcamping.prototype.constructor = DailyBootcamping;

DailyBootcamping.prototype.eventHandlers.onSessionStarted = function(sessionStartedRequest, session) {
	console.log("DailyBootcamping onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
	// any initialization logic goes here
};

DailyBootcamping.prototype.eventHandlers.onLaunch = function(launchRequest, session, response) {
	console.log("DailyBootcamping onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
	handleNewAffirmationRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
DailyBootcamping.prototype.eventHandlers.onSessionEnded = function(sessionEndedRequest, session) {
	console.log("DailyBootcamping onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
	// any cleanup logic goes here
};

DailyBootcamping.prototype.intentHandlers = {
	"BootcampingIntent": function(intent, session, response) {
		handleNewAffirmationRequest(response);
	},
	"DefineBootcampingIntent": function(intent, session, response) {
		handleDefineAffirmationRequest(response);
	},
	"HelpIntent": function(intent, session, response) {
		response.ask("You can ask Daily Bootcamping for a thought, or, you can say exit... What can I help you with?", "What can I help you with?");
	}
 /**   "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
	 */
};
/**
 * Gets the definition of Affirmation and returns to the user.
 */

function handleDefineAffirmationRequest(response) {

	// Create speech output
	var speechOutput = "Bootcamping Thoughts are short but powerful ideas that help you keep motivted and pressing towards the goal of completing your bootcamp.";

	response.tellWithCard(speechOutput, "Daily Bootcamping", speechOutput);
};
/**
 * Gets a random affirmation from the list and returns to the user.
 */

function handleNewAffirmationRequest(response) {
	// Get a random affirmation from the affirmations list
	var affirmationIndex = Math.floor(Math.random() * AFFIRMATIONS.length);
	var affirmation = AFFIRMATIONS[affirmationIndex];

	// Create speech output
	var speechOutput = "Here is Your Thought for today. " + affirmation;

	response.tellWithCard(speechOutput, "Here's Your Daily Bootcamping Thought, ", speechOutput);
};

// Create the handler that responds to the Alexa Request.
exports.handler = function(event, context) {
	// Create an instance of the DailyBootcamping skill.
	var dailyBootcamping = new DailyBootcamping();
	dailyBootcamping.execute(event, context);
};
