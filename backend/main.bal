import ballerina/http;
import ballerina/io;
import ballerina/uuid;
import ballerinax/mongodb;

// Define a record type for the MongoDB document (User)
type User record {
    string name;
    string email;
    string password;
    string age;
    string gender;
    string address;
    string mobile;
    string profilePhoto;
};

// Define the Album record for frontend interaction (Sign-Up Request)
type Album readonly & record {
    string username;
    string email;
    string password;
    string confirm_password;
    string age;
    string gender;
    string address;
    string mobile;
     string profilePhoto;
};

// Define the LoginRequest type for user sign-in (Login Request)
type LoginRequest record {
    string email;
    string password;
};

// Define the UserData type to be returned to the frontend
type UserData readonly & record {
    string name;
    string email;
    string age;
    string gender;
    string address;
    string mobile;
    string profilePhoto;

};


type CartItem record {
    string image;
    string name;
    string description;
    string category;
    string gender;
    string weight;
    string address;


};

// Define the Post and Chat records
type Post record {
    string postId;
    string title;
    string description;
    string image;
    string postedBy;  // User who created the post
};

type Chat record {
    string chatId;
    string fromUser;
    string toUser;
    string message;
    string postId;
};

// MongoDB client setup
// mongodb:Client mongoClient = checkpanic new (connection = <connection string obtained from the MongoDB server>);

mongodb:Client mongoClient = checkpanic new (connection = "mongodb://localhost:27017");


// CORS configuration for frontend-backend communication
@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:5173"],
        allowCredentials: true,
        allowHeaders: ["Content-Type", "Authorization"],
        exposeHeaders: ["X-CUSTOM-HEADER"],
        maxAge: 3600
    }
}
service /crossOriginService on new http:Listener(9092) {

//     // POST method for user sign-in
    resource function post signin(LoginRequest loginRequest) returns UserData|error? {

    // Access MongoDB database and collection
    mongodb:Database userDb = check mongoClient->getDatabase("user");
    mongodb:Collection usersCollection = check userDb->getCollection("users");

    // Create the BSON filter to search by username
    map<string> filter = { "email": loginRequest.email };

    // Find the user in the MongoDB collection by username
    User? user = check usersCollection->findOne(filter, {}); // Fetching User type

    if user is () {
        // Return null if no user is found with the given username
        io:println("User not found in MongoDB");
        return null;
    }

    // Compare the provided password with the one stored in the database
    if user.password == loginRequest.password {
        io:println("Password match successful");

        // Return the UserData object with user details on successful login
        UserData userData = {
            name: user.name,
            email: user.email,
            age: user.age,
            gender: user.gender,
            address: user.address,
            mobile: user.mobile,
            profilePhoto: user.profilePhoto
        };
        return userData;
    } else {
        io:println("Password mismatch");
        return null;
    }
}



resource function post signup(Album album) returns Album|error {
    // Connect to the MongoDB database
    mongodb:Database userDb = check mongoClient->getDatabase("user");
    mongodb:Collection usersCollection = check userDb->getCollection("users");

    // Check if the username already exists
    map<string> filter = { "name": album.username };
    User? existingUser = check usersCollection->findOne(filter, {});

    if existingUser is User {
        // If the user exists, return an error indicating that the username is not unique
        return error("Username already exists");
    }

    // Proceed to insert the new user if the username is unique
    User user = {
        name: album.username,
        email: album.email,
        password: album.password,
        age: album.age,
        gender: album.gender,
        address: album.address,
        mobile: album.mobile,
        profilePhoto: album.profilePhoto
    };

    // Insert the document (user record) into the MongoDB collection
    checkpanic usersCollection->insertOne(user);

    io:println("User inserted successfully into MongoDB");

    // Return the inserted album as the response
    return album;
}

 // POST method for adding an item to the cart
    resource function post addItem(CartItem cartItem) returns CartItem|error {
        // Access MongoDB database and collection
        mongodb:Database cartDb = check mongoClient->getDatabase("cartdb");
        mongodb:Collection cartCollection = check cartDb->getCollection("cartItems");

        // Insert the cart item into MongoDB
        checkpanic cartCollection->insertOne(cartItem);

        io:println("Cart item added successfully into MongoDB");

        // Return the inserted cart item as the response
        return cartItem;
    }

    // GET method to fetch all cart items
    resource function get items() returns CartItem[]|error {
        // Access MongoDB database and collection
        mongodb:Database cartDb = check mongoClient->getDatabase("cartdb");
        mongodb:Collection cartCollection = check cartDb->getCollection("cartItems");

        // Find all cart items in the MongoDB collection
        stream<CartItem, error?> cartStream = check cartCollection->find({}, {});

        CartItem[] cartList = [];

        // Collect cart items from the stream
        check from CartItem cartItem in cartStream
            do {
                cartList.push(cartItem);
            };

        // Return the list of cart items
        return cartList;
    }



     // POST method to create a new post
    resource function post createPost(Post post, string userId) returns Post|error {
        mongodb:Database postDb = check mongoClient->getDatabase("strayPosts");
        mongodb:Collection postCollection = check postDb->getCollection("posts");

        // Add the post and set the poster's userId
        post.postId = uuid:createType1AsString();
        post.postedBy = userId; // Associate post with the logged-in user

        checkpanic postCollection->insertOne(post);
        io:println("Post added by:", post.postedBy);

        return post;
    }

    // GET method to fetch posts, filter out the "Volunteer" button for posts created by the logged-in user
    resource function get posts(string userId) returns Post[]|error {
        mongodb:Database postDb = check mongoClient->getDatabase("strayPosts");
        mongodb:Collection postCollection = check postDb->getCollection("posts");

        // Fetch all posts
        stream<Post, error?> postStream = check postCollection->find({}, {});

        Post[] postList = [];

        check from Post post in postStream
            do {
                // Only push posts not created by the current logged-in user
                if (post.postedBy != userId) {
                    postList.push(post);
                }
            };

        return postList;
    }

 
}

