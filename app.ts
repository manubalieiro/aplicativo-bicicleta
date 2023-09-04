import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import crypto from 'crypto'

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    findUser(email: string): User | undefined {
        return this.users.find(user => user.email === email);
    }

    registerUser(user: User): void {
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new Error('Duplicate user.');
            }
        }
        user.id = crypto.randomUUID();
        this.users.push(user);

        console.log(`User Registered:\nID: ${user.id}\nEmail: ${user.email}\n`);
    }

    registerBike(bike: Bike): void {
        this.bikes.push(bike);

        console.log(`Bike Registered:\nModel: ${bike.name}\n`);
    }

    removeUser(email: string): void {
        const index = this.users.findIndex(user => user.email === email);
        if (index !== -1) {
            const removedUser = this.users.splice(index, 1)[0];

            console.log(`User Removed:\nID: ${removedUser.id}\nEmail: ${removedUser.email}\n`);
        }
    }

    rentBike(bike: Bike, user: User, startDate: Date, endDate: Date): void {
        const canRent = Rent.canRent(this.rents, startDate, endDate);
        if (canRent) {
            const rent = Rent.create(this.rents, bike, user, startDate, endDate);
            this.rents.push(rent);

            console.log(`Bike Rented:\nModel: ${bike.name}\nUser ID: ${user.id}\nStart Date: ${startDate}\nEnd Date: ${endDate}\n`);
        } else {
            throw new Error('Overlapping dates.');
        }
    }

    returnBike(bike: Bike, user: User, returnDate: Date): void {
        const rent = this.rents.find(rent => rent.bike === bike && rent.user === user && !rent.dateReturned);
        if (rent) {
            rent.dateReturned = returnDate;

            console.log(`Bike Returned:\nModel: ${bike.name}\nUser ID: ${user.id}\nReturn Date: ${returnDate}\n`);
        } else {
            throw new Error('Rent not found or bike already returned.');
        }
    }
}
