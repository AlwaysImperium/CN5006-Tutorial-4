
    const mongoose = require("mongoose");

    mongoose.connect("mongodb://127.0.0.1:27017/PeopleDB")
    .then(() => {
        console.log("Connected to MongoDB successfully!");
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
    });


    const PersonSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    city: String
});


    const Person = mongoose.model("Person", PersonSchema);

    async function insertOne() {
    const person = new Person({
        name: "Alex",
        age: 25,
        gender: "Male"
    });

    const result = await person.save();
    console.log("Person inserted successfully:", result);
}

    mongoose.connection.once("open", async () => {
    try {
        await findPeopleByCity();
    } catch (error) {
        console.error("Insertion failed:", error);
    } finally {
        await mongoose.disconnect();
    }
});

    async function insertMany() {
    const people = [
        { name: "Emma", age: 28, gender: "Female" },
        { name: "James", age: 32, gender: "Male" },
        { name: "Sophie", age: 24, gender: "Female" }
    ];

    const result = await Person.insertMany(people);
    console.log("Multiple people inserted successfully:", result);
}

    async function findAll() {
    const people = await Person.find().limit(5);
    console.log("Retrieved people:", people);
}

    async function findFemalesOver30() {
    const people = await Person.find({
        gender: "Female",
        age: { $gt: 30 }
    });

    console.log("Females over 30:", people);
}

    async function countPersons() {
    const count = await Person.countDocuments();
    console.log("Total number of people:", count);
}

    async function deleteManyPersons() {
    const result = await Person.deleteMany({
        name: "Sophie",
        age: 24,
        gender: "Female"
    });

    console.log("Documents deleted:", result.deletedCount);
}

    async function updateManyPersons() {
    const result = await Person.updateMany(
        { name: "Emma", age: 28, gender: "Female" },
        { $set: { age: 29 } }
    );

    console.log("Documents matched:", result.matchedCount);
    console.log("Documents modified:", result.modifiedCount);
}

    async function addCityToPersons() {
    const updates = [
        { name: "Alex", age: 25, city: "London" },
        { name: "Emma", age: 29, city: "London" },
        { name: "James", age: 32, city: "Manchester" }
    ];

    for (const person of updates) {
        const result = await Person.updateOne(
            { name: person.name, age: person.age },
            { $set: { city: person.city } }
        );

        console.log(
            `${person.name}: matched ${result.matchedCount}, modified ${result.modifiedCount}`
        );
    }
}

    async function findPeopleByCity() {
    const people = await Person.find({ city: "London" });

    console.log("People living in London:", people);
}
