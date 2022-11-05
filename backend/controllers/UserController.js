exports.getUsers = (req, res) => {
    const users = [
        {
            id: 1,
            name: 'John Doe'
        },
        {
            id: 2,
            name: 'Bob Williams'
        },
        {
            id: 3,
            name: 'Shannon Jackson'
        }
    ];

    return res.json(users);
};