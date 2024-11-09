import Member from '../model/member.js';

class MemberController {
  static async createMemberPage(_req, res) {
    res.render('createMemberPage');
  }

  static async createMemberPost(req, res) {
    try {
      const {name, email, age} = req.body;
      const newMember = new Member({name, email, age});
      await newMember.save();
      res.redirect('/members');
    } catch(error) {
      res.status(500).json({'message': error.message});
    }
  }

  static async membersPage(_req, res) {
    try {
      const members = await Member.find();
      res.render('members', {'members': members});
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async deleteMember(req, res) {
    try {
      const {id} = req.params;
      await Member.findByIdAndDelete(id);
      res.redirect('/members');
    } catch(error) {
      res.status(500).send(error.message);
    }
  }

  static async updateMember(req, res) {
    try {
      const {id} = req.params;
      const member = await Member.findById(id);
      console.log(member);
      res.render("update", {member});
    } catch (error) {
      res.status(404).send(error.message);
    }
  }

  static async updateMemberPost(req, res) {
    try {
      const {id} = req.params;
      const { name, email, age } = req.body;
      await Member.findByIdAndUpdate(id, {name, email, age});
      res.redirect("/members");
    } catch(error) {
      res.status(500).send(error.message);
    }
  }
}

export default MemberController;

