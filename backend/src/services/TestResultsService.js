
class TestResultsService {
    constructor(userModel) {
        this.testResultsModel = userModel;
    }

    async create(results, user) {
        await this.testResultsModel.deleteMany({ user: user._id });
        console.log(results);
        const dto = {
            results,
            user: user._id
        }
        return this.testResultsModel.create(dto);
    }

    async getByUser(user) {
        return this.testResultsModel.findOne({ user: user._id }).populate('user');
    }

}

module.exports = TestResultsService;
