// write some tests
const { matchUserId, findUser, fetchIdFromPath } = require('./users');

describe('users', () => {

    test('should match users by their id', () => {
        const matchedUser = matchUserId(1);

        expect(matchedUser.id).toBe(1);
    });

    test('should not match match users with an invalid id', () => {
        const nullUser = matchUserId(null);
        const wrongIdUser = matchUserId(90);
        const stringUser = matchUserId('90');

        expect(nullUser).toBe(undefined);
        expect(wrongIdUser).toBe(undefined);
        expect(stringUser).toBe(undefined);
    });

    test('should fetch user from mock db', async () => {
        const result = await findUser(1);

        expect(result).toMatchObject({"id": 1, "email": 'readycoder1@gmail.com'});
    });

    test('should get the userid from the url path', () => {
        expect(fetchIdFromPath('/user/4')).toBe(4);
    });
});
