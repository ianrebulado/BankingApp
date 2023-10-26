export function createUser(){

}

export function filterUsersByName(users, name){
    const matchedUser = users.filter(user =>
        user.first_name.toLowerCase().includes(name.toLowerCase()) ||
        user.last_name.toLowerCase().includes(name.toLowerCase())
    );

    return matchedUser[0];
}