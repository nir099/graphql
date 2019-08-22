const axios = require('axios');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
} = require('graphql');

// const customers = [ 
//     { id: '1' , name: 'john' , email: 'xyt@gm.co' , age: 23},
//     { id: '2' , name: 'johne' , email: 'xys@gm.co' , age: 25},
//     { id: '3' , name: 'johna' , email: 'xy@vgm.co' , age: 27},
//     { id: '4' , name: 'johni' , email: 'xyg@gm.co' , age: 21},
//     { id: '5' , name: 'johny' , email: 'xyq@gm.co' , age: 20},
// ]

const CustomerType = new GraphQLObjectType({
    name:'Customer',
    fields:() => ({
        id: {type:GraphQLString},
        name: {type:GraphQLString},
        email: {type:GraphQLString},
        age: {type:GraphQLInt}
    })
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        customer:{
            type:CustomerType,
            args:{
                id:{type:GraphQLString}
            },
            resolve(parentvalue, args) {
                // return customers.find( cus => cus.id === args.id );
                return axios.get('http://localhost:3000/customers/' + args.id)
                .then(res => res.data);
            }
        },
        customers:{
            type: new GraphQLList(CustomerType),
            resolve(_,args) {
                return axios.get('http://localhost:3000/customers')
                .then(res => res.data);
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addCustomer:{
            type:CustomerType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            }, 
            resolve(_ , args) {
                return axios.post('http://localhost:3000/customers', {
                    name:args.name,
                    email:args.email,
                    age:args.age,
                }).then(res => res.data);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});