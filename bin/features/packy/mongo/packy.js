"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user_1 = require("./user");
const PackySchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    repoOwner: String,
    repoName: String,
    clonedAt: Date,
    lastCommitWhenCloned: String,
});
class PackyClass extends mongoose_1.Model {
    static async setCloned(email, owner, name, lastCommit) {
        const user = await user_1.UserModel().findOne({ email: email });
        if (user) {
            const packy = await this.findOne({ userId: user._id, repoOwner: owner, repoName: name });
            packy.clonedAt = new Date();
            packy.lastCommitWhenCloned = lastCommit;
            if (packy) {
                const updated = await this.updateOne({
                    userId: user._id,
                    repoOwner: owner,
                    repoName: name,
                    clonedAt: new Date(),
                    lastCommitWhenCloned: lastCommit,
                }, packy);
            }
            else {
                const created = await this.create({
                    userId: user._id,
                    repoOwner: owner,
                    repoName: name,
                    clonedAt: new Date(),
                    lastCommitWhenCloned: lastCommit,
                });
            }
        }
    }
}
PackySchema.loadClass(PackyClass);
let packyModel;
function PackyModel() {
    return packyModel;
}
exports.PackyModel = PackyModel;
exports.PackyModelBuilder = {
    buildModel: () => {
        packyModel = mongoose_1.model("Packy", PackySchema);
    }
};
//# sourceMappingURL=packy.js.map