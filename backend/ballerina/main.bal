import ballerina/http;

service /donations on new http:Listener(8080) {
    resource function post createDonation(http:Caller caller, json donation) returns error? {
        // Extract data from donation JSON
        string firstName = donation.first_name.toString();
        string lastName = donation.last_name.toString();
        decimal amount = donation.amount.toDecimal();
        string email = donation.email.toString();

        // Here you can connect to MongoDB and save the donation details
        // For simplicity, let's return a response
        json response = { "message": "Donation received!", "first_name": firstName, "last_name": lastName };
        check caller->respond(response);
    }
}
