import { App } from "./app";
import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";

const app = new App();

const user = new User('Maria', 'maria@mail.com', '1234');
const bike = new Bike('mountain bike', 'mountain', 123, 500, 100.5, 'desc', 5, []);

// Registrar usuário
app.registerUser(user);

// Registrar bicicleta
app.registerBike(bike);

// Alugar bicicleta
const today = new Date();
const twoDaysFromToday = new Date(today);
twoDaysFromToday.setDate(twoDaysFromToday.getDate() + 2);

app.rentBike(bike, user, today, twoDaysFromToday);

// Devolver bicicleta
const returnDate = new Date();
app.returnBike(bike, user, returnDate);

// Remover usuário
app.removeUser('maria@mail.com');
