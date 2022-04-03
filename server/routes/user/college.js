const College = require('../../models/College');
const getAllColleges = async (req, res) => {
    try {
        console.log('get colleges');
        let colleges = await College.find(
            {},
            { name: 1, state: 1, isMahe: 1, _id: 0 }
        );
        colleges.sort(
            (college1, college2) => {
                if (
                    college1.name.toUpperCase() ===
                    'MANIPAL INSTITUTE OF TECHNOLOGY'
                )
                    return -1;
                if (
                    college2.name.toUpperCase() ===
                    'MANIPAL INSTITUTE OF TECHNOLOGY'
                )
                    return 1;
                if (
                    (college1.isMahe && college2.isMahe) ||
                    (!college1.isMahe && !college2.isMahe)
                ) {
                    return college1.name
                        .toUpperCase()
                        .trim()
                        .localeCompare(college2.name.toUpperCase().trim());
                } else if (college1.isMahe) {
                    return -1;
                } else if (college2.isMahe) {
                    return 1;
                }
            }
            // console.log(college1.name.toUpperCase().trim().localeCompare(college2.name.toUpperCase().trim()))
            // return college1.name.toUpperCase().trim().localeCompare(college2.name.toUpperCase().trim());
        );
        return res.status(200).send({ success: true, data: colleges });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ success: false, msg: 'Internal Server Error' });
    }
};

module.exports = { getAllColleges };
