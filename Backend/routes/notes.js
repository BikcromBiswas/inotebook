const express = require('express')
const router = express.Router()
const fetchUser = require('../middleware/fetchUser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');


// ************************​‌‍‌⁡⁢⁣⁢⁡⁢⁣⁢𝙍𝙊𝙐𝙏𝙀 𝟭 : ⁡⁣⁢⁢GET NOTES ​‌‍‌OF USER​​ ⁡********************************************************
//Route 1 : Get all the notes of user using : get "/api/auth/fetchallnotes" 
router.get('/fetchallnotes', fetchUser, async (req, res) => {
     try {
          const id = req.id;
          console.log(id)
          const notes = await Notes.find({
               user: id
          });
          console.log(notes)
          res.json(notes)
     }
     catch (err) {
          res.status(500).send({ error: "So sorry error occured on our side" })
     }
})


// ************************​‌‍‌⁡⁢⁣⁢⁡⁢⁣⁢⁡⁣⁣⁢𝙍𝙊𝙐𝙏𝙀 𝟮 : TO ADD A NOTES OF USER⁡​​ ⁡********************************************************
//Route 2 : Add a new Note using  : POST "/api/auth/addnote" 
router.post('/addnote', fetchUser, [
     body('title', 'Enter a valid title').isLength({ min: 3 }),
     body('description', 'Description must be atleast 5 charachter').isLength({ min: 3 })
], async (req, res) => {
     try {
          const { title, description, tag } = req.body;
          console.log(req.body);
          const errors = validationResult(req);
          //If on creating user some errors ,return Bad Request and the errors
          if (!errors.isEmpty()) {
               return res.status(400).json({ errors: errors.array() });
          }
          const note = await Notes.create({
               title: title,
               description: description,
               tag: tag,
               user: req.id
          })
          res.json(note)
     }
     catch (err) {
          console.error(err);
          res.status(500).send({ error: "So sorry error occured on our side" })
     }
})
// ************************​‌‍‌⁡⁢⁣⁢⁡⁢⁣⁢⁡⁣⁣⁢𝙍𝙊𝙐𝙏𝙀 𝟯 : 𝗧𝗢 𝗨𝗣𝗗𝗔𝗧𝗘 𝗔 𝗡𝗢𝗧𝗘𝗦 𝗢𝗙 𝗨𝗦𝗘𝗥⁡​​ ⁡********************************************************
// Route 3: Update an existing Note using : POST "/api/notes/updatenote" .Login required    
router.put('/updatenote/:id', fetchUser, async (req, res) => {
     const { title, description, tag } = req.body;
     try {
          //​‌‍​‌‍‌⁡⁢⁢⁢𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗻𝗲𝘄 𝗡𝗼𝘁‍𝗲⁡​​​
          const newNote = {};
          if (title) { newNote.title = title; }
          if (description) { newNote.description = description; }
          if (tag) { newNote.tag = tag; }
          const noteid = req.params.id;
          console.log("Note id " + noteid);
          //​‌‍⁡⁢⁣⁢‌Find the Note to be updated and update it​⁡
          let note = await Notes.findById(noteid);
          console.log("Note " + note)
          if (!note) { return res.status(404).json({ error: 'Not found' }) }
          //⁡⁢⁣⁢𝗖𝗵𝗲𝗰𝗸 𝗶𝗳 𝘁𝗵𝗲 𝗻𝗼𝘁𝗲 𝘁𝗼 𝗯𝗲 𝘂𝗽𝗱𝗮𝘁𝗲𝗱 𝗯𝗲𝗹𝗼𝗻𝗴𝘀 𝘁𝗼 𝘀𝗮𝗺𝗲 𝘂𝘀𝗲𝗿 𝘄𝗵𝗼 𝗹𝗼𝗴𝗴𝗲𝗱 𝗶𝗻⁡
          if (note.user.toString() !== req.id) { return res.status(401).json({ erro: 'Not allowed' }) }
          note = await Notes.findByIdAndUpdate(noteid, { $set: newNote }, { new: true })
          res.json(note)
     }
     catch (err) {
          console.error(err);
          res.status(500).send({ error: "So sorry error occured on our side" })
     }
})
// ************************​‌‍‌⁡⁢⁣⁢⁡⁢⁣⁢⁡⁣⁣⁢𝙍𝙊𝙐𝙏𝙀 4 : ⁡⁣⁣⁢𝗧𝗢 𝗗𝗘𝗟𝗘𝗧𝗘 𝗔 𝗡𝗢𝗧𝗘𝗦 𝗢𝗙 𝗨𝗦𝗘𝗥⁡⁡​​ ⁡********************************************************
// Route 4: Delete  an existing Note using : DELETE "/api/notes/deletenote" .Login required    
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
     //⁡​​​
     try {
          const noteid = req.params.id;
          console.log("Note id " + noteid);
          //⁡⁢⁣⁢​‌‍‌Find the Note to be deleted and delete it​⁡
          let note = await Notes.findById(noteid);
          console.log("Note " + note)
          if (!note) { return res.status(404).json({ error: 'Not found' }) }
          //⁡⁢⁣⁢⁡⁢⁣⁢​‌‍‌𝗖𝗵𝗲𝗰𝗸 𝗶𝗳 𝘁𝗵𝗲 𝗻𝗼𝘁𝗲 𝘁𝗼 𝗯𝗲 𝗱𝗲𝗹𝗲𝘁𝗲𝗱 𝗯𝗲𝗹𝗼𝗻𝗴𝘀 𝘁𝗼 𝘀𝗮𝗺𝗲 𝘂𝘀𝗲𝗿 𝘄𝗵𝗼 𝗹𝗼𝗴𝗴𝗲𝗱 𝗶𝗻⁡​
          if (note.user.toString() !== req.id) { return res.status(401).json({ erro: 'Not allowed' }) }
          note = await Notes.findByIdAndDelete(noteid);
          res.json({ success: "node has been deleted" })
     }
     catch (err) {
          console.error(err);
          res.status(500).send({ error: "So sorry error occured on our side" })
     }
})
module.exports = router 