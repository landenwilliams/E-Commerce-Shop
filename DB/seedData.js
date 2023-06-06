const { client } = require('./index');

const {
    createUser,
    getAllUsers,
    getUser,
    getUserById,
    getUserByUsername
} = require("./users");

const {
    createProduct,
    getAllProducts,
    getProductById
} = require("./products");

const {
    createCart,
    getCartByUserId
} = require("./cart");

const {
    createCartItem,
    getAllCartItemsByCartId,
    deleteCartItemById
} = require("./cartItems");

const {
    createOrder,
    getOrderById,
    getAllOrdersByUserId
} = require("./orders");

const {
    getAllOrderItemsByOrderId
} = require("./orderItems");

const dropTables = async () => {
    try {
        console.log("Dropping All Tables...");

        await client.query(`
            DROP TABLE IF EXISTS users cascade;
            DROP TABLE IF EXISTS products cascade;
            DROP TABLE IF EXISTS orders cascade;
            DROP TABLE IF EXISTS order_items cascade;
            DROP TABLE IF EXISTS cart_items cascade;
            DROP TABLE IF EXISTS cart cascade;

        `);

    } catch (error) {
        console.log("error dropping tables")
        throw error;
    }
}

const createTables = async () => {
    try {
        console.log("Starting to build tables...");

        await client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username varchar(255) UNIQUE NOT NULL,
                password varchar(255) NOT NULL,
                "isAdmin" BOOLEAN DEFAULT false
            );

            CREATE TABLE products (
                id SERIAL PRIMARY KEY,
                name varchar(255) UNIQUE NOT NULL,
                description varchar(400) NOT NULL,
                "imageURL" varchar(255) NOT NULL,
                price float NOT NULL
            );

            CREATE TABLE orders (
                id SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users(id),
                total float NOT NULL,
                "orderedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE order_items (
                id SERIAL PRIMARY KEY,
                "orderId" INTEGER REFERENCES orders(id),
                "productId" INTEGER REFERENCES products(id)
            );

            CREATE TABLE cart (
                id SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users(id),
                UNIQUE ("userId")
            );

            CREATE TABLE cart_items (
                id SERIAL PRIMARY KEY,
                "productId" INTEGER REFERENCES products(id),
                "cartId" INTEGER REFERENCES cart(id),
                quantity INTEGER NOT NULL
            );

          `);

    } catch (error) {
        console.log("error creating tables");
        throw error;
    }
}

const createInitialUsers = async () => {
    try {
        console.log('Creating initial users...');
        await createUser({
            username: "bob",
            password: "password",
            isAdmin: false
        });
        await createUser({
            username: "lassy",
            password: "password",
            isAdmin: false
        });
        await createUser({
            username: "phillis",
            password: "password",
            isAdmin: false
        });
        await createUser({
            username: "admin",
            password: "password",
            isAdmin: true
        });

        console.log('Finished creating initial users...');
    } catch (error) {
        console.log('error creating initial user');
        throw error;
    }

}

const createInitialProducts = async () => {
    try {
        console.log('Creating initial products...')
        await createProduct({
            name: "Beanie",
            description: "Your pet rock will be cozy and stylish in this hand-knitted beanie hat! The colorful yarn creates a playful look while keeping your rock's head warm. Your pet rock will look so cute, you'll want to snap a selfie with it and post it on Instagram. Who knows, it might even go viral!",
            imageURL: "/StoneCapImages/Beanie.jpg",
            price: 20.32
        });
        await createProduct({
            name: "Big Guy Hat",
            description: "A hat for big guys!",
            imageURL: "/StoneCapImages/BigGuyHat.jpg",
            price: 19.07
        });
        await createProduct({
            name: "Bowl Cut",
            description: "Give your pet rock the ultimate '90s throwback with this hilarious bowlcut wig. Perfect for a retro party or just a silly day at home, your rock will look like they just stepped out of a time machine. With this wig on, your rock will be the coolest kid on the block (or the coolest pet rock in the jar).",
            imageURL: "/StoneCapImages/BowlCut.jpg",
            price: 11.38
        });
        await createProduct({
            name: "Bucket Hat",
            description: "Keep your pet rock cool and stylish with this classic bucket hat. Whether they're lounging by the pool or just soaking up the sun, this hat will keep your rock looking and feeling cool. Plus, with its simple and timeless design, this hat is sure to never go out of style.",
            imageURL: "/StoneCapImages/BucketHat.jpg",
            price: 5.00
        });
        await createProduct({
            name: "Chicken Hat",
            description: "Is your pet rock feeling a little cooped up? Give them the gift of clucking joy with this hilarious chicken hat. Your rock can now strut around the house like a barnyard superstar, complete with feathers and a beak. It's the perfect way to add a little poultry pizzazz to your rock's day.",
            imageURL: "/StoneCapImages/ChickenHat.jpg",
            price: 20.32
        });
        await createProduct({
            name: "Cowboy Hat",
            description: "Giddy up, partner! Your pet rock can now channel their inner cowboy with this stylish cowboy hat. Whether they're rustling up some cattle or just relaxing on the range, this hat will make your rock feel like they're living their best wild west life. Yeehaw!",
            imageURL: "/StoneCapImages/CowboyHat.jpg",
            price: 19.07
        });
        await createProduct({
            name: "Crown",
            description: "Bow down to the royalty of the pet rock world! This regal crown will give your pet rock the ultimate power and prestige. Perfect for ruling over their kingdom (i.e., your bookshelf), this crown will make your rock feel like a true king or queen. So, give your pet rock the gift of majesty and let them reign supreme with this stunning crown.",
            imageURL: "/StoneCapImages/Crown.jpg",
            price: 11.38
        });
        await createProduct({
            name: "Fancy Hat",
            description: "Time to dress up your pet rock's look with a touch of sophistication! This fancy hat will add a touch of class to your rock's wardrobe. Perfect for high tea, garden parties or just lounging in the living room, your rock will surely turn heads with this elegant headpiece.",
            imageURL: "/StoneCapImages/FancyHat.jpg",
            price: 5.00
        });
        await createProduct({
            name: "Founders",
            description: "a hat for someone who can't hit a lazer",
            imageURL: "/StoneCapImages/founders.jpg",
            price: 11.38
        });
        await createProduct({
            name: "Hero Mask",
            description: "Is your pet rock ready to save the day? With this hero mask, they'll feel like they can take on any challenge that comes their way. Whether they're fighting crime or just pretending to be a superhero, this mask will give your rock the courage and confidence they need to be a true champion.",
            imageURL: "/StoneCapImages/HeroMask.jpg",
            price: 5.00
        });
        await createProduct({
            name: "Iron Man Mask",
            description: "Suit up your pet rock in this high-tech Iron Man mask and watch them become the ultimate superhero. With its sleek design and glowing eyes, this mask will make your rock feel like they're ready to take on any villain that comes their way. Whether they're fighting for justice or just showing off their cool new gear, your pet rock is sure to love this awesome Iron Man mask.",
            imageURL: "/StoneCapImages/IronManMask.jpg",
            price: 20.32
        });
        await createProduct({
            name: "Knitted Beanie",
            description: "Keep your pet rock extra cozy and stylish with this handmade beanie. Each one is unique, and the craftsmanship will make your rock stand out from the crowd. Perfect for cold winter days or just lounging around the house, this beanie is the ultimate accessory for the fashion-forward pet rock.",
            imageURL: "/StoneCapImages/KnittedBeanie.jpg",
            price: 19.07
        });
        await createProduct({
            name: "McDonalds Hat",
            description: "I'm lovin' it! Now your pet rock can work the drive-thru or grill up some burgers in style with this classic McDonald's hat. Complete with the iconic golden arches, this hat will make your rock the envy of every fast-food fan. Just make sure they don't try to eat it!",
            imageURL: "/StoneCapImages/McDonaldsHat.jpg",
            price: 11.38
        });
        await createProduct({
            name: "Military Hat",
            description: "At ease, soldier! Your pet rock can now command their own army with this sleek and sturdy military hat. Whether they're leading the charge or just hanging out in the barracks, this hat will make your rock feel like a true general. So, give your rock the gift of leadership and discipline with this military-inspired headwear.",
            imageURL: "/StoneCapImages/MilitaryHat.jpg",
            price: 11.38
        });
        await createProduct({
            name: "Mouse Ears",
            description: "Who says only cartoon mice get to have fun? Your pet rock can now channel their inner Disney with these iconic mouse ears. Perfect for a day at the theme park or just lounging around the house, these ears will make your rock the talk of the town (or the talk of the pet rock community, at least).",
            imageURL: "/StoneCapImages/MouseEars.jpg",
            price: 11.38
        });
        await createProduct({
            name: "Yankee Hat",
            description: "Because even your pet rock deserves to be a Bronx Bomber. Now your rock can root for the Yankees with all the fervor of a die-hard fan, without ever having to worry about actually leaving the house.",
            imageURL: "/StoneCapImages/NYHat.jpg",
            price: 5.00
        });
        await createProduct({
            name: "Old Timey Bonnet",
            description: "Give your pet rock a touch of vintage charm with this adorable old timey bonnet. Modeled after the headwear popularized in the 19th century, this bonnet will make your rock look like they just stepped out of a time machine. Perfect for a costume party or just for a fun addition to their wardrobe, this bonnet is sure to make your pet rock the talk of the town.",
            imageURL: "/StoneCapImages/OldTimeyBonnet.jpg",
            price: 20.32
        });
        await createProduct({
            name: "Pirate Hat",
            description: "Ahoy, matey! Your pet rock can now be the most feared and stylish swashbuckler on the seven seas. Whether it's plundering treasure or just lounging on the couch, this hat is sure to make your rock feel like a true captain of the ship.",
            imageURL: "/StoneCapImages/PirateHat.jpg",
            price: 19.07
        });
        await createProduct({
            name: "Pope Hat",
            description: "Bless your pet rock with this divine Pope hat. Modeled after the iconic headwear of the leader of the Catholic Church, this hat will give your pet rock a sense of piety and authority. Perfect for leading their own congregation of pet rocks or just for a humorous addition to their wardrobe, this hat is sure to inspire reverence in all who see it.",
            imageURL: "/StoneCapImages/PopeHat.jpg",
            price: 19.07
        });
        await createProduct({
            name: "SciFiHat",
            description: "Blast off into outer space with this futuristic sci-fi helmet! Your pet rock will be ready to explore new galaxies and meet alien lifeforms with this sleek and high-tech helmet. Whether they're battling against the dark forces of the universe or just pretending to be an astronaut, this helmet is the perfect accessory for any space-loving pet rock.",
            imageURL: "/StoneCapImages/SciFiHat.jpg",
            price: 11.38
        });
        await createProduct({
            name: "Dr Seuss Hat",
            description: "Oh, the places your pet rock will go! With this iconic red and white striped hat, your rock can now explore the fantastical worlds of Dr. Seuss in style. From Who-ville to the Circus McGurkus, this hat is the perfect accessory for any adventurous rock looking to add a little whimsy to their day.",
            imageURL: "/StoneCapImages/SeussHat.jpg",
            price: 5.00
        });
        await createProduct({
            name: "Snorkle Mask",
            description: "Take your pet rock on an underwater adventure with this snorkel mask. Whether they're exploring the depths of your fish tank or just pretending to be a deep-sea diver, this mask will give your rock a whole new perspective on the world. With its comfortable fit and functional design, your rock will be able to breathe easy and enjoy the wonders of the underwater world.",
            imageURL: "/StoneCapImages/SnorkleMask.jpg",
            price: 11.38
        });
        await createProduct({
            name: "Storm Trooper Helmet",
            description: "Prepare your pet rock for battle with this iconic Stormtrooper helmet. Modeled after the famous headgear worn by the soldiers of the Galactic Empire, this helmet will give your pet rock a sense of power and purpose. Whether they're fighting for the Dark Side or just pretending to be a part of the Star Wars universe, this helmet is sure to be a hit with any sci-fi-loving pet rock.",
            imageURL: "/StoneCapImages/StormTrooperHelmet.jpg",
            price: 5.00
        });
        await createProduct({
            name: "Straw Hat",
            description: "Add some rustic charm to your pet rock's wardrobe with this classic straw hat. Perfect for a day at the beach or just lounging in the sun, this hat will keep your rock cool and stylish. With its simple yet timeless design, this hat is sure to be a favorite of your pet rock's for years to come.",
            imageURL: "/StoneCapImages/StrawHat.jpg",
            price: 5.00
        });
        await createProduct({
            name: "Witch Hat",
            description: "Add some magic to your pet rock's life with this enchanting witch hat. With its pointed design and iconic look, your pet rock will be ready to cast spells and brew potions in no time. Whether they're getting into the Halloween spirit or just showing off their mystical side, this witch hat is the perfect accessory for any spell-casting pet rock.",
            imageURL: "/StoneCapImages/WitchHat.jpg",
            price: 5.00
        });
        console.log('Finished creating initial products...')
    } catch (error) {
        console.log("error creating initial product");
        throw error;
    }
}

const createInitialCarts = async () => {
    try {
        console.log("Creating carts for all users...");
        await createCart(1);
        await createCart(2);
        await createCart(3);
        console.log("Finished creating carts for all users...");
    } catch (error) {
        console.log('error creating initial carts');
        throw error;
    }
}

const createInitialCartItems = async () => {
    try {
        console.log("Creating cart items for bob and lassy's carts...");
        //bob's cart
        await createCartItem(1, 1, 1);
        await createCartItem(2, 1, 1);
        await createCartItem(3, 1, 1);
        //lassy's cart
        await createCartItem(3, 2, 1);
        await createCartItem(4, 2, 1);
        await createCartItem(5, 2, 1);
        console.log("Finished creating cart items for bob and lassy's carts...");
    } catch (error) {
        console.log('error creating initial cart items');
        throw error;
    }
}

const createInitialOrders = async () => {
    console.log("Creating Order For Bob...");
    const newOrder = await createOrder(1);
    console.log("Finished Creating Order For Bob...");
        return newOrder;

}

const rebuildDB = async () => {
    try {
        client.connect();

        await dropTables();
        await createTables();
        await createInitialUsers();
        await createInitialProducts();
        await createInitialCartItems();
        await createInitialOrders();

    } catch (error) {
        console.log("error rebuilding database");
        throw error;
    }
}

const testDB = async () => {
    try {

        console.log("Starting to test database...");

    //getAllUser Test

        // console.log("Calling getAllUsers...");
        // const users = await getAllUsers();
        // console.log("Users Result:", users);

    //getUser Test

        // console.log("Calling getUser...");
        // const user = await getUser("bob", "password");
        // console.log("User bob returned:", user);

    //getUserById Test

        // console.log("Calling getUserById...");
        // const userById = await getUserById('2');
        // console.log("User lassy returned:", userById);

    //getUserByUsername Test

        // console.log("Calling getUserByUsername for phillis...");
        // const userByUsername = await getUserByUsername('phillis');
        // console.log("User phillis returned:", userByUsername);

    //getCartByUserId Test

        // console.log("Calling getCartByUserId for bob...");
        // const cartByUserId = await getCartByUserId('1');
        // console.log("Bob's Cart Returned: ", cartByUserId);

    // getAllCartItemsByCartId Test

        // console.log("Calling getAllCartItemsByCartId for lassy...");
        // const cartItemsByCartId = await getAllCartItemsByCartId('2');
        // console.log("All items in lassy's Cart Returned: ", cartItemsByCartId);

        // console.log("Calling getAllCartItemsByCartId for bob...");
        // const cartItemsByCartIdTwo = await getAllCartItemsByCartId('1');
        // console.log("bob's Empty Cart Returned: ", cartItemsByCartIdTwo);

    //getOrderById Test

        // console.log("Calling getOrderById...");
        // const order = await getOrderById(1);
        // console.log("OrderById returned: ", order);

    //getAllOrdersByUserId Test

        // console.log("Calling getAllOrdersByUserId...");
        // const orders = await getAllOrdersByUserId(1);
        // console.log("All Users Orders Returned: ", orders);

    //getAllOrderItemsByOrderId Test

        // console.log("Calling getAllOrderItemsByOrderId...");
        // const orderItems = await getAllOrderItemsByOrderId(1);
        // console.log("All items in Bob's order returned: ", orderItems);

    //deleteCartItemsById Test

        // console.log("Called deleteCartItemById...");
        // console.log("Deleting first item in bob's cart (id: 1)...");
        // const deletedCartItem = await deleteCartItemById(1);
        // console.log("Item deleted: ", deletedCartItem);
        // console.log("Calling getAllCartItemsByCartId for bob once more...");
        // const cartItemsByCartIdTwo = await getAllCartItemsByCartId('1');
        // console.log("All items in Bob's Cart Returned: ", cartItemsByCartIdTwo);

    //getAllProducts Test

        // console.log("calling getAllProducts...");
        // const products = await getAllProducts();
        // console.log("Products Result:",  products);

    //getProductsById Test

        // console.log("Calling getProductById...");
        // const productById = await getProductById('1');
        // console.log("Product 1 returned:", productById);›

        console.log("Finished database tests!");
        console.log("Disconnecting from the matrix...");
        client.end();
        console.log("Matrix disconneted!");

    } catch (error) {
        console.log("Error during testDB");
        throw error;
    }
}

rebuildDB()
    .then(testDB);
