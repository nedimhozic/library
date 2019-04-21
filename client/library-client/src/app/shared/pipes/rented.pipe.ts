import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'rented' })
export class RentedBooksPipe implements PipeTransform {
    transform(books: any[]) {
        if (books && books.length > 0) {
            return books.filter(book => !book.returned).length;
        }
        return 0;
    }
}