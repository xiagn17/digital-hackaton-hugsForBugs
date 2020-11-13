const ADMIN = 'ADMIN';
const USER = 'USER';

class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }

    async createUser(data) {
        const userDTO = {
            ...data,
            role: USER
        };
        return this.userModel.create(userDTO);
    }

    createAdmin(data) {
        const userDTO = {
            ...data,
            role: ADMIN
        };
        return this.userModel.create(userDTO);
    }

    async findUser(id) {
        return this.userModel.findById(id);
    }

    async signIn({ fullName, groupNumber }) {
        return this.userModel.findOne({ fullName, groupNumber });
    }
}

module.exports = UserService;
