export const getMatchedUser = (users, currentUser) => {
    const newUsers = { ...users }
    delete newUsers[currentUser]

    const [id, user] = Object.entries(newUsers).flat()

    return { id, ...user}
}