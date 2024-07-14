import Parse from 'parse';

export const getCurrentRole = async () => {
    const user = Parse.User.current();
    return await new Parse.Query(Parse.Role).equalTo('users', user).find()
}