export interface ReaderModel {
    _id?: String,
    firstName: String,
    lastName: String,
    email: String,
    dateOfBirth: Date,
    isStudent: Boolean,
    gender: String,
    rentedBooks?: [{
        book: {
            _id: String,
            name: String,
            description: String,
            author: String,
            year: Number,
            count: Number,
            rented: Number
        },
        rentedAt: Date,
        returned: Boolean
    }]
}