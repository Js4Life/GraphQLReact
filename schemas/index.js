const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLSchema } = require("graphql");
const userData =require('../MOCK_DATA.json');
const UserType = require("./TypeDefs/UserType");

//get All User
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getAllUser: {
            type: new GraphQLList(UserType),
            args: {
                id: {
                    type: GraphQLInt
                }
            },
            resolve(parent, args) {
                return userData
            }
        }
    }
})

// CreateUser Mutation
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            resolve(parent, args) {
                console.log('aprent',parent)
                userData.push({ id: userData.length + 1, firstName: args.firstName, lastName: args.lastName, email: args.email, password: args.password })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
})