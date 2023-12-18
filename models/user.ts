interface User {
    id: number
    fname: string
    lname: string
    email: string
    country_code: string
    mobile_no: string
    birthdate: string
    nationality: string
    gender: string
    created_at: string
    account_type: number
    last_login: string
    status: number
}

class User {

    /**
     * Check if user is active
     */
    isActive() {
        return this.status === 1
    }

    /**
     * Check if user is an admin
     */
    isAdmin(){
        return this.account_type !==  1
    }

    /**
     * Check if user is a guest
     */
    isGuest(){
        return this.account_type ===  1
    }
}

export default User