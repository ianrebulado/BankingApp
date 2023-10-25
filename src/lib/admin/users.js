export function createUser(){

}

export function filter_users_by_name(users, name){
    const matchedUser = users.filter(user =>
        user.first_name.toLowerCase().includes(name.toLowerCase()) ||
        user.last_name.toLowerCase().includes(name.toLowerCase())
    );

    return matchedUser[0];
}