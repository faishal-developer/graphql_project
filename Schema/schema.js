const graphql=require('graphql');
var _=require('lodash');
const User=require("../model/user");
const Hobby=require("../model/hobby");
const Post=require("../model/post");

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLList
} =graphql

const UserType = new GraphQLObjectType({
    name:'User',
    description:'Documentation for user.',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:graphql.GraphQLString},
        age:{type:graphql.GraphQLInt},

        hobbies:{
            type: new GraphQLList(HobbyType),
            resolve(parent,args){
                return _.filter(hobbiesData,{userId:parent.id})
            }
        },
        posts:{
            type: new GraphQLList(PostType),
            resolve(parent,args){
                return _.filter(postsData,{userId:parent.id})
            }
        }
    })
})

const HobbyType = new GraphQLObjectType({
    name:'Hobby',
    description:"Hobby description",
    fields:()=>({
        id:{type:GraphQLID},
        title:{type:graphql.GraphQLString},
        description:{type:graphql.GraphQLString},
        user:{
            type:UserType,
            resolve(parent,args){
                return _.find(usersData,{id:parent.userId})
            }
        }
    })
})

const PostType = new GraphQLObjectType({
    name:'Post',
    description:'Post description',
    fields:()=>({
        id:{type:GraphQLID},
        comment:{type:graphql.GraphQLString},
        user:{
            type:UserType,
            resolve(parent,args){
                console.log(parent);
                return _.find(usersData,{id:parent.userId})
            }
        }
    })
})

// rootquery
const RootQuery=new GraphQLObjectType({
    name:'RootQueryType',
    description:'Description',
    fields:{
        user:{
            type:UserType,
            args:{id:{type:graphql.GraphQLString}},

            resolve(parent,args){
                return _.find(usersData,{id:args.id})
            }
        },
        users:{
            type:new GraphQLList(UserType),
            resolve(parent,args){
                return usersData
            }
        },
        hobbies:{
            type:new GraphQLList(HobbyType),
            resolve(parent,args){
                return hobbiesData
            }
        },
        posts:{
            type:new GraphQLList(PostType),
            resolve(parent,args){
                return postsData;
            }
        },
        hobby:{
            type:HobbyType,
            args:{id:{type:GraphQLID}},

            resolve(parent,args){
                return _.find(hobbiesData,{id:args.id})
            }
        },
        post:{
            type:PostType,
            args:{id:{type:GraphQLID}},

            resolve(parent,args){
                return _.find(postsData,{id:args.id}) 
            }
        }
    }
})

const Mutation=new GraphQLObjectType({
    name:'Mutation',
    fields:{
        createUser:{
            type:UserType,
            args:{
                name:{type:graphql.GraphQLString},
                age:{type:graphql.GraphQLInt},
                profession:{type:graphql.GraphQLString}
            },
            resolve(parent,args){
                let user=User({
                    name:args.name,
                    age:args.age,
                    profession:args.profession,
                })
                return user.save();
            }
        },

        createPost:{
            type:PostType,
            args:{
                comment:{type:graphql.GraphQLString},
                userId:{type:GraphQLID}
            },
            resolve(parent,args){
                let post={
                    comment:args.comment,
                    userId:args.userId
                }

                return post;
            }
        },
        
        createHobby:{
            type:HobbyType,
            args:{
                title:{type:graphql.GraphQLString},
                description:{type:graphql.GraphQLString},
                userId:{type:GraphQLID}
            },
            resolve(parent,args){
                let hobby={
                    title:args.title,
                    description:args.description,
                    userId:args.userId
                }
                return hobby;
            }
        }
    }
})

module.exports = new graphql.GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})