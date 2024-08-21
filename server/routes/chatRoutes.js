import express from "express"
import protect from "../middlewares/authMiddleware.js"
import {accessChat,fetchChats,createGroupChat,renameGroup,addtogroup,removeFromGroup} from "../controllers/chatController.js";

const router=express.Router();


router.route("/").post(protect,accessChat);//to create a chat
router.route("/").get(protect,fetchChats);
router.route("/group").post(protect,createGroupChat);
router.route("/rename").put(protect,renameGroup);
router.route("/groupadd").put(protect,addtogroup);
router.route("/groupremove").put(protect,removeFromGroup);

export default router;