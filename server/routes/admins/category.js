const Event = require('../../models/Event');
const jwt = require('jsonwebtoken');
const DelCard = require('../../models/DelegateCard');
const Category = require('../../models/Category');
// const xl = require('excel4node');
const Team = require('../../models/Team');

const addEvent = async (req, res) => {
    console.log('Adding Event');
    console.log(req.body);
    try {
        //TODO : Add validations
        let {
            name,
            description,
            eventType,
            mode,
            participationCriteria,
            prize,
            minMembers,
            maxMembers,
            eventHeads,
            delegateCards, //List of all needed delegate card IDs
            eventDateTime, //(To be set by operations)
            eventVenue,
            tags,
            teamDelegateCard, //If team leader delegate Card is sufficient for registration
        } = req.body;

        let eventName = await Event.exists({ name });
        console.log("here1")
        if (eventName){
          console.log("same found")
          return res.status(400).send({
            success: false,
            msg: 'Event with same name is already registered',
        });
        }
            

        let ids = await Event.find({}, { eventID: 1, _id: 0 })
            .sort({ eventID: -1 })
            .limit(1);
        let eventID = 101;
        if (ids[0]) {
            eventID = ids[0].eventID + 1;
        }
        if (
            // !eventVenue ||
            // !eventDateTime ||
            !name ||
            !eventType ||
            !mode ||
            // !participationCriteria ||
            !minMembers ||
            !maxMembers
        ) {
        console.log("here2")

            return res
                .status(400)
                .send({ success: false, msg: 'Please fill required fields' });
        }
        console.log(minMembers + ',' + maxMembers);
        if (Number(minMembers) > Number(maxMembers) || Number(minMembers) < 1)
            return res.send({ success: false, msg: 'Invalid Members' });
        // let dateTime = new Date(eventDateTime);
        // eventDateTime = dateTime;
        // if (eventDateTime.toString() == 'Invalid Date') {
        //   return res.status(400).send({
        //     success: false,
        //     msg: 'Valid DataTime in IST is required',
        //   });
        // }
        // console.log('Date Time is ', eventDateTime);

        //registrationDeadline is same as event Start Time by default
        let registrationDeadline = eventDateTime;
        let delCards = [];
        if (!delegateCards) delegateCards = [];
        for (let i = 0; i < delegateCards.length; i++) {
            let validCard = await DelCard.findOne(
                { cardID: delegateCards[i] },
                { _id: 1 }
            );
            if (!validCard) {
        console.log("here3")

                return res
                    .status(400)
                    .send({ success: false, msg: 'Invalid Delegate Card' });
            }
            delCards.push(validCard._id);
        }
        // console.log("test: ",req.requestAdmin.role.categoryId)
        // console.log("Test DelCard",delCards)

        // let rounds = [{
        // roundNumber:1,
        // judges:[],
        // eventDateTime:
        // }]
        console.log("here4")

        let newEvent = new Event({
            eventID,
            name,
            category: req.requestAdmin.role.categoryId, //Change
            description,
            eventType,
            mode,
            participationCriteria,
            prize,
            minMembers,
            maxMembers,
            eventHeads,
            eventDateTime,
            eventVenue,
            registrationDeadline,
            tags,
            teamDelegateCard,
            delegateCards: delCards, //TODO: Check on delegate Cards
        });

        await newEvent.save();
        console.log("New Event Added")
        return res
            .status(200)
            .send({ success: true, msg: 'Event Added', data: newEvent });
    } catch (err) {
        console.log(err.name);
        console.log(err);
        res.status(500).send({ success: false, msg: 'Internal Server Error' });
    }
};
const getCategoryEvent = async (req, res) => {
    try {
        let category_Id = req.requestAdmin.role.categoryId;
        //console.log("catid", category_Id);
        let events = await Event.find({ category: category_Id }).populate(
            'delegateCards'
        );
        //console.log("events", events);
        return res.status(200).send({ success: true, data: events });
    } catch {
        console.log(err);
        res.status(500).send({ success: false, msg: 'Internal Server Error' });
    }
};

const updateEvent = async (req, res) => {
    try {
        console.log('Event update');
        let {
            eventID,
            name,
            description,
            eventType,
            mode,
            participationCriteria,
            prize,
            minMembers,
            maxMembers,
            eventHeads,
            teamDelegateCard,
            delegateCards, //List of Delegate CardIDs
            eventDateTime,
            registrationDeadline,
            eventVenue,
            tags,
        } = req.body;
        console.log('tags', tags);
        let event = await Event.exists({ eventID });
        console.log(event);
        if (!event)
            return res.status(400).send({
                success: false,
                msg: 'Invalid Event ID',
            });
        if (name) {
            let event = await Event.findOne({ name }, { name, eventID });
            if (event) {
                if (event.name == name && event.eventID != eventID)
                    return res.status(400).send({
                        success: false,
                        msg: 'Event with same name is already registered',
                    });
            }
        }
        if (Number(minMembers) > Number(maxMembers) || Number(minMembers) < 1)
            return res.send({ success: false, msg: 'Invalid Members' });
        if (eventDateTime) {
            let dateTime = new Date(eventDateTime);
            eventDateTime = dateTime;
            let dateTimeDead = new Date(registrationDeadline);
            registrationDeadline = dateTimeDead;

            if (eventDateTime.toString() == 'Invalid Date') {
                return res.status(400).send({
                    success: false,
                    msg: 'Valid DataTime in IST is required',
                });
            }
        }

        //Check for more validations
        let newDelegateCards = [];
        for (let i = 0; delegateCards && i < delegateCards.length; i++) {
            let card = await DelCard.findOne({
                cardID: delegateCards[i].cardID,
            });
            if (!card)
                return res
                    .status(400)
                    .send({ success: false, msg: 'Invalid Delegate Card' });
            newDelegateCards.push(card._id);
        }

        console.log('Sending ', newDelegateCards);

        await Event.findOneAndUpdate(
            { eventID },
            {
                name,
                description,
                eventType,
                mode,
                participationCriteria,
                prize,
                minMembers,
                maxMembers,
                eventHeads,
                eventDateTime,
                eventVenue,
                registrationDeadline,
                tags,
                delegateCards: newDelegateCards,
                teamDelegateCard,
            }
        );
        return res.status(200).send({ success: true, msg: 'Event Updated' });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ success: false, msg: 'Internal Server Error' });
    }
};

const deleteEvent = async (req, res) => {
    try {
        console.log('Event delete');
        let eventID = req.body.eventID;
        let event = await Event.findOneAndDelete({ eventID });
        if (!event)
            return res
                .status(400)
                .send({ success: false, msg: 'Event Not Found' });
        return res.status(200).send({ success: true, msg: 'Event Deleted' });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ success: false, msg: 'Internal Server Error' });
    }
};
const getCategory = async (req, res) => {
    try {
        let category_Id = req.requestAdmin.role.categoryId;
        //console.log("catid", category_Id);
        let category = await Category.findById(category_Id);
        //console.log("category", category);
        return res.status(200).send({ success: true, data: category });
    } catch {
        console.log(err);
        res.status(500).send({ success: false, msg: 'Internal Server Error' });
    }
};
const getAllCategories = async (req, res) => {
    try {
        let categories = await Category.find();
        return res.send({ data: categories, success: true });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ success: false, msg: 'Internal Server Error' });
    }
};

// const addRound = async(req,res) =>{
//   try
//   {
//      let {judgeEmail,eventID,roundDateTime,roundVenue} = req.body
//      let judgeEmail = judgeEmail.toString().toLowerCase()
//      if(!judgeEmail.endsWith('@manipal.edu'))
//       return res.send({msg:'Invalid Judge',success:false});

//   }
//   catch(err)
//   {
//     console.log(err)
//     return res.status(500).send({success:false,msg:'Internal Server Error'})
//   }
// }

// deleteRound
//  - lastRound Can be deleted
// updateRound

// Get all users of category by eventID
// const createSheet = async (response,event) => {
//   // console.log(response);
//   return new Promise(async (resolve) => {
//     var wb = new xl.Workbook();
//     var ws = wb.addWorksheet("Sheet");
//     // Add headers as per events
//     let memberHeader = "Member";
//     let memberHeaders = []
//     for(let i = 0;i<event.maxMembers;i++)
//     {
//       memberHeaders.push((String("Member_"+(i+1).toString()))
//     }

//     const headingColumnNames = [
//       "id",
//       "Type",
//       "Name",
//       "Email",
//       "Phone Number",
//       "Registration Number",
//       "Branch",
//       "CGPA",
//       "Pref_1",
//       //   "Slot_1",
//       "Status_1",
//       "Pref_2",
//       //   "Slot_2",
//       "Status_2",
//       "Experience",
//     ];
//     let headingColumnIndex = 1;
//     headingColumnNames.forEach((heading) => {
//       ws.cell(1, headingColumnIndex++).string(heading);
//     });
//     let rowIndex = 2;
//     response.forEach((resp) => {
//       let columnIndex = 1;
//       ws.cell(rowIndex, columnIndex++).string(resp.id.toString());
//       ws.cell(rowIndex, columnIndex++).string(
//         resp.type == 1 ? "Supporting/Sports" : "Cultural"
//       );
//       ws.cell(rowIndex, columnIndex++).string(resp.name.toString());
//       ws.cell(rowIndex, columnIndex++).string(resp.email.toString());
//       ws.cell(rowIndex, columnIndex++).string(resp.phone.toString());
//       ws.cell(rowIndex, columnIndex++).string(resp.registration_no.toString());
//       ws.cell(rowIndex, columnIndex++).string(resp.branch.toString());
//       ws.cell(rowIndex, columnIndex++).string(resp.cgpa.toString());
//       ws.cell(rowIndex, columnIndex++).string(resp.pref_1.category.toString());
//       //   ws.cell(rowIndex, columnIndex++).string(resp.pref_1.slot.toString());
//       ws.cell(rowIndex, columnIndex++).string(
//         resp.pref_1.status.toString() == "0"
//           ? "Not Reviewed"
//           : resp.pref_1.status.toString() == "1"
//           ? "Selected"
//           : resp.pref_1.status.toString() == "2"
//           ? "Rejected"
//           : resp.pref_1.status.toString() == "3"
//           ? "Mail Sent (Selected)"
//           : "Mail Sent (Rejected)"
//       );
//       ws.cell(rowIndex, columnIndex++).string(resp.pref_2.category.toString());
//       //   ws.cell(rowIndex, columnIndex++).string(resp.pref_2.slot.toString());
//       ws.cell(rowIndex, columnIndex++).string(
//         resp.pref_2.status.toString() == "0"
//           ? "Not Reviewed"
//           : resp.pref_2.status.toString() == "1"
//           ? "Selected"
//           : resp.pref_2.status.toString() == "2"
//           ? "Rejected"
//           : resp.pref_2.status.toString() == "3"
//           ? "Mail Sent (Selected)"
//           : "Mail Sent (Rejected)"
//       );
//       ws.cell(rowIndex, columnIndex++).string(resp.experience.toString());
//       rowIndex++;
//     });
//     resolve(wb);
//   });
// };

// JSON TEAMID,MEMBERS NAME, DELID

const getTeamByCategory = async (req, res) => {
    try {
        let { type } = req.body;
        let currentCategory = await Category.find({ type });
        let finaldata =[];  
        for (let k = 0; k < currentCategory.length; k++) {
            // console.log('category ', currentCategory);
            let type, events;
            let data = {
                category: currentCategory[k].category,
                type: currentCategory[k].type,
                events: [],
            };
            console.log('Current', currentCategory);
            // if (!currentCategory)
                // return res
                    // .status(400)
                    // .send({ success: false, msg: 'No Category Found' });
            // data.category= category.category;
            // data.type = category.type
            console.log('Id ', currentCategory[k].category);
            events = await Event.find({ category: currentCategory[k]._id });
            console.log(events);
            for (let i = 0; i < events.length; i++) {
                // console.log('events', events[i]);
                let name, teams;
                let eventData = {
                    name,
                    teams: [],
                };
                teams = await Team.find(
                    { event: events[i]._id },
                    { teamID: 1, _id: 0 }
                ).populate({
                    path: 'members.user',
                    select: { userID: 1, name: 1, _id: 0,email:1,mobileNumber:1 },
                });
                (eventData.name = events[i].name), (eventData.teams = teams);
                data.events.push(eventData);
            }
            finaldata.push(data);
        }

        return res.send(finaldata);
    } catch (err) {
        console.log(err);
        return res.status(500);
    }
};

module.exports = {
    addEvent,
    getCategoryEvent,
    updateEvent,
    deleteEvent,
    getCategory,
    getAllCategories,
    getTeamByCategory,
};
