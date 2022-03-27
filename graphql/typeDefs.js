const { gql } = require('apollo-server');

module.exports = gql`


    type DaoUser {
        id: ID!
        walletAddress: String
        nonce: String
        lastLogin: String
        lensProfileConnected: Boolean
        lensProfile_id: Int
    }

    type DaoNonce {
        nonce: String!
        newUser: Boolean!
    }

    type DaoSigVerify {
        verified: Boolean!
        token: String
        walletAddress: String
        lensProfileConnected: Boolean
        lensProfile_id: Int
    }

    input DaoPostInput {
        daoId: String!
        daoName: String!
        body: String!
        images: [String]
        pub_id_pointed: Int
        profile_id_pointed: Int
        pub_id: Int
        profile_id: Int
        topics: [String]
    }

    type DaoPost {
        id: ID!
        daoId: String
        daoName: String
        pub_id_pointed: Int
        profile_id_pointed: Int
        pub_id: Int
        profile_id: Int
        walletAddress: String
        body: String
        images: [String]
        timestamp: String
        upVotes: [Vote]
        downVotes: [Vote]
        topics: [String]
        isPoll: Boolean
        pollOptions: [PollOption]
        pollVotes: [PollVote]
    }

    type PollOption {
        body: String
        index: Int
    }

    type PollVote {
        walletAddress: String
        timestamp: String
        optionIndex: Int
    }

    type Vote {
        walletAddress: String
        timestamp: String
    }

    type DaoPostComment {
        id: ID!
        postId: ID!
        pub_id_pointed: Int
        profile_id_pointed: Int
        body: String
        timestamp: String
        walletAddress: String
        pub_id: Int
        profile_id: Int
    }

    input DaoInput {
        daoName: String!
        daoAddress: String!
        governorAddress: String!
        daoDescription: String!
        daoOverview: String!
        daoPurpose: String!
        daoLinks: [DaoLinkInput]
        daoImg: String!
        daoCoverImg: String!
        feeFollow: Boolean
        quorumPercentage: Int
        votingPeriod: Int
        minimumDelay: Int
        daoType: String!
        profile_id: Int
        forum_pub_id: Int
        followCost: Int
        followCurrency: String
        followNFTAddress: String
        
    }

    input DaoLinkInput {
        link: String
        platform: String
    }

    type Dao {
        id: ID!
        daoName: String!
        daoAddress: String!
        governorAddress: String!
        profile_id: Int
        forum_pub_id: Int
        daoOverview: String
        daoDescription: String
        daoPurpose: String
        daoLinks: [
            DaoLinks
        ]
        daoType: String
        daoImg: String
        daoCoverImg: String
        feeFollow: Boolean
        quorumPercentage: Int
        votingPeriod: Int
        minimumDelay: Int
        members: [DaoMember]
        followCost: Int
        followCurrency: String
        followNFTAddress: String
        creator: String
    }

    type DaoLinks {
        platform: String
        link: String
    }

    type DaoMember {
        walletAddress: String
        joiningDate: String
        tokenId: Int
    }

    type Query {
        ping: String!
        serverVersion: String!

        getDaoNonce(walletAddress: String!): DaoNonce!

        getDaoPosts: [DaoPost]
        getDaoPostsOnly(daoId: ID!) : [DaoPost]
        
        getDaos: [Dao]!
        getDao(daoId: ID!): Dao!
    }

    type Mutation {
        
        verifySignatureDao(signature: String!, walletAddress: String!): DaoSigVerify!
        createDaoPost(daoPostInput: DaoPostInput!): DaoPost!
        createDao(daoInput: DaoInput!): Dao!
        joinDao(daoId: ID!, tokenId: Int!): Dao!
        profileMinted(profile_id: Int!): DaoUser!
    }
`