import express from 'express';

import MemberController from '../controller/memberController.js';

const memberRouter = express.Router();

memberRouter.get("/",                   MemberController.membersPage);
memberRouter.get("/create-member",      MemberController.createMemberPage);
memberRouter.get("/delete-member/:id",  MemberController.deleteMember);
memberRouter.get("/update-member/:id",  MemberController.updateMember);
memberRouter.post("/add",               MemberController.createMemberPost);
memberRouter.post("/update-member/:id", MemberController.updateMemberPost);

export default memberRouter;
