const { ApolloServer, gql } = require('apollo-server');

const planets = [
    {
        id: 1,
        name: 'Mercury',
        moons: []
    },
    {
        id: 2,
        name: 'Venus',
        moons: []
    },
    {
        id: 3,
        name: 'Earth',
        moons: [1]
    },
    {
        id: 4,
        name: 'Mars',
        moons: [2, 3]
    }
];

const moons = [
    {
        id: 1,
        name: 'Moon'
    },
    {
        id: 2,
        name: 'Phobos'
    },
    {
        id: 3,
        name: 'Deimos'
    }
];

const typeDefs = gql`
    type Query {
        planets: [Planet]
    }

    type Planet {
        id: Int
        name: String
        moons: [Moon]
    }

    type Moon {
        id: Int
        name: String
    }
`;

const resolvers = {
    Query: {
        planets: () => planets,
    },
    Planet: {
        moons: (parent, args, context, info) => moons.filter(moon => parent.moons.includes(moon.id))
    }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`Server is ready at ${url}`)
});