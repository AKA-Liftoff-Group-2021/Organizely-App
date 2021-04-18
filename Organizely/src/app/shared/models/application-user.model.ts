export class ApplicationUser {
    public username: string;    
    public email: string;
    public password: string; 
    public confirmPassword: string;
    public firstName?: string;
    public lastName?: string;
    
    constructor(username: string, email: string, password: string, confirmPassword: string, firstName?: string, lastName?: string) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}


