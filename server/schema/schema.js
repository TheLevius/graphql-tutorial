const {GraphQLString, GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLList} = require('graphql');
const {GraphQLSchema} = require('graphql');
const Movies = require('../models/movie');
const Directors = require('../models/director');

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        directorId: {
            type: DirectorType,
            resolve(parent, args) {
                return Directors.findById(parent.directorId);
            }
        }
    }),
})
const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return Movies.find({directorId: parent.id})
            }
        }
    }),
})

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movie: {
            type: MovieType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Movies.findById(args.id);
            },
        },
        director: {
            type: DirectorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                // return directors[directors.findIndex(director => director.id === args.id)];
                return Directors.findById(args.id);
            },
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return Movies.find({});
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve(parent, args) {
                return Directors.find({});
            }
        }
    },
})
// const movies = [
//     {id: '1', name: 'Pulp Fiction', genre: 'Crime', directorId: '1'},
//     {id: '2', name: '1984', genre: 'Sci-Fi', directorId: '2'},
//     {id: '3', name: 'V for vendetta', genre: 'Sci-Fi-Triller', directorId: '3'},
//     {id: '4', name: 'Snatch', genre: 'Crime-Comedy', directorId: '4'},
//     {id: '5', name: 'Reservoir Dogs', genre: 'Crime', directorId: '1'},
//     {id: '6', name: 'The Hateful Eight', genre: 'Crime', directorId: '1'},
//     {id: '7', name: 'Lock, Stock and Two Smoking Barrels', genre: 'Crime-Comedy', directorId: '4'},
//
// ];
// const directors = [
//     {id: '1', name: 'Quentin Tarantino', age: 55},
//     {id: '2', name: 'Michael Radford', age: 72},
//     {id: '3', name: 'James McTeigue', age: 51},
//     {id: '4', name: 'Guy Ritchie', age: 50},
// ];

module.exports = new GraphQLSchema({
    query: Query,
})