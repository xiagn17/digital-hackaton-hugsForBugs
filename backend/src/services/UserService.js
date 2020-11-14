
class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }

    async createUser(data) {
        if (await this.userModel.findOne(data)) return null;
        const userDTO = {
            ...data,
            role: config.default.roles.USER
        };
        return this.userModel.create(userDTO);
    }

    async createAdmin(data) {
        if (await this.userModel.findOne(data)) return null;
        const userDTO = {
            ...data,
            role: config.default.roles.ADMIN
        };
        return this.userModel.create(userDTO);
    }

    async getAll() {
        return this.userModel.find({role: 'USER'});
    }

    async findUser(id) {
        return this.userModel.findById(id);
    }

    async signIn({ fullName, groupId }) {
        return this.userModel.findOne({ fullName, groupId });
    }
}

module.exports = UserService;
