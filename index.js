// import neccessary modules
import inquirer from "inquirer";
import chalk from "chalk";
// Implementation of the BankAccount interface
class BankAccounts {
    accountNumber;
    balance;
    // constructor to initialize the account number and balance
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // method to withdraw money from the account
    withdraw(userAmount) {
        if (this.balance >= userAmount) {
            this.balance -= userAmount;
            console.log(chalk.blueBright(`Your withdrawal amount is $${userAmount} and your remaining balance is $${this.balance}`));
        }
        else {
            console.log(`Insufficient Balance!`);
        }
    }
    // method to deposit money into the account
    deposit(userAmount) {
        if (userAmount > 100) {
            this.balance -= 1; // $1 fee charged if more than $100 is deposited
        }
        this.balance += userAmount;
        console.log(chalk.blueBright(`Deposit Amount is successful: $${userAmount}, Remaining balance is: $${this.balance}`));
    }
    // method to check the current balance of the account
    checkBalance() {
        console.log(chalk.blueBright(`Your balance is: $${this.balance}`));
    }
}
// customer class
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    // Constructor to initialize customer details and their bank account
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// Initialize bank accounts and customers
let account = [
    new BankAccounts(1222, 100), // initialize account number and balance
    new BankAccounts(1333, 200)
];
let customerManager = [
    new Customer("Areesha", "khan", "female", 17, 5785753, account[0]),
    new Customer("Waniya", "khan", "female", 20, 318368022, account[1])
];
// Function to prompt user for service options and perform actions
async function service() {
    while (true) {
        // Prompt user for account number
        const accountNumberInput = await inquirer.prompt([
            {
                name: "accountNumber",
                message: chalk.rgb(5, 182, 252)("\nEnter your account number:"),
                type: "number",
            },
        ]);
        // Find customer based on account number input
        const customer = customerManager.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(chalk.bold.rgb(5, 252, 236)(`Welcome to ${customer.firstName} ${customer.lastName} to our Bank!`));
            // Prompt user for action
            const action = await inquirer.prompt([
                {
                    name: "select",
                    message: "Select an option:",
                    type: "list",
                    choices: ["Withdraw", "Deposit", "Check Balance", "Exit"],
                },
            ]);
            // Perform action based on user selection
            switch (action.select) {
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        message: "Enter the amount to withdraw:",
                        type: "number",
                    });
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        message: "Enter the amount to deposit:",
                        type: "number",
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log(chalk.magentaBright("\nExiting Bank program!\n"));
                    console.log(chalk.magentaBright("Thank you for using our bank services!"));
                    return;
            }
        }
        else {
            console.log(chalk.redBright("Customer not found! Please enter a valid account number!"));
        }
    }
}
// Start the banking service
service();
