"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        index: true,
        unique: true,
    },
    nickname: String,
    social_user_id: String,
    createdAt: Date,
    lastAccess: Date,
    packies: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Packy' }]
});
class UserClass extends mongoose_1.Model {
    static async list({ offset = 0, limit = 10 } = {}) {
        const users = await this.find({})
            .sort({ createdAt: -1 })
            .skip(offset)
            .limit(limit);
        return { users };
    }
    static async setAccess(email, nickname, social_user_id) {
        const user = await this.findOne({ email: email });
        if (user) {
            user.lastAccess = new Date();
        }
        else {
            const created = await this.create({
                email: email,
                nickname: nickname,
                social_user_id: social_user_id,
                createdAt: new Date(),
                lastAccess: new Date(),
                packies: []
            });
        }
    }
}
UserSchema.loadClass(UserClass);
let userModel;
function UserModel() {
    return userModel;
}
exports.UserModel = UserModel;
exports.UserModelBuilder = {
    buildModel: () => {
        userModel = mongoose_1.model("User", UserSchema);
    }
};
//# sourceMappingURL=user.js.map