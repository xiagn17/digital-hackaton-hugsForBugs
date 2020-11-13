
class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }

    async createUser(data) {
        const userDTO = {
            ...data,
            role: config.default.roles.USER
        };
        return this.userModel.create(userDTO);
    }

    createAdmin(data) {
        const userDTO = {
            ...data,
            role: config.default.roles.ADMIN
        };
        return this.userModel.create(userDTO);
    }

    async findUser(id) {
        return this.userModel.findById(id);
    }

    async signIn({ fullName, groupId }) {
        return this.userModel.findOne({ fullName, groupId });
    }
}

module.exports = UserService;
