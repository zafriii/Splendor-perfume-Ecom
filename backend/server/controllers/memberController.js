const Member = require('../models/memberModel');

exports.createMember = async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    const member = new Member({
      userId : req.user.id,
      name,
      phone, 
      email
    });

    await  member.save();

    res.status(201).json({ message: 'Member created successfully',  member });
  } catch (error) {
    res.status(500).json({ message: 'Error creating member', error: error.message });
  }
};


exports.getMember = async (req, res) => {
    try {
      const member = await Member.findOne({ userId: req.user.id }); // Find by userId
  
      if (!member) {
        return res.status(404).json({ message: 'No membership found for this user.' });
      }
  
      res.status(200).json({ member });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching member data', error: error.message });
    }
  };
  