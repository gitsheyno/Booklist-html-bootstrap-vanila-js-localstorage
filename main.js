class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author
        this.isbn = isbn
    }
}

class UI {
    static displayBook() {

        const book = StoreBook.getBook();

        book.forEach(book => {
            UI.addToList(book)
        })
    }

    static addToList(book) {
        let row = document.createElement('tr')

        row.innerHTML =
            `<tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        </tr>
        `

        let tBody = document.querySelector('#book-list')
        tBody.append(row)
    }

    static showAlert(msg, className_) {
        const div = document.createElement('div')
        div.className = `alert alert-${className_}`

        div.innerHTML = msg

        const form = document.querySelector('#book-form');
        const container = document.querySelector('.container')

        container.insertBefore(div, form)

        setTimeout(() => {
            UI.deleteAlert()
        }, 3000)
    }

    static deleteAlert() {
        document.querySelector('.alert').remove()
    }

    static resetFiled() {
        document.querySelector('#title').value = ''
        document.querySelector('#author').value = ''
        document.querySelector('#isbn').value = ''
    }
}

class StoreBook {
    static getBook() {
        let book;

        if (localStorage.getItem('book') == null) {
            book = []
        }
        else {
            book = JSON.parse(localStorage.getItem('book'))
        }

        return book
    }

    static saveBook(book_) {
        const book = StoreBook.getBook()

        book.push(book_)

        localStorage.setItem('book', JSON.stringify(book))
    }

    static removeBook(isbn_) {
        const books = StoreBook.getBook()

        books.forEach((book, index) => {
            if (book.isbn === isbn_) {
                books.splice(index, 1)
            }
        })

        localStorage.setItem('book', JSON.stringify(books))
    }
}

document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault()

    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let isbn = document.querySelector('#isbn').value;

    if (title == '' || author == '' || isbn == '') {

        UI.showAlert('please fill in all the fields', 'danger')
    }
    else {
        const book = new Book(title, author, isbn)

        UI.addToList(book)

        UI.showAlert('new book added to list', 'success')

        StoreBook.saveBook(book)
    }

    UI.resetFiled()

})

document.querySelector('DOMContentLoaded', UI.displayBook())
document.querySelector('#book-list').addEventListener('click', (e) => {

    if (e.target.classList.contains('delete')) {
        console.log(e.target)
        UI.showAlert(`${e.target.parentElement.parentElement.children[0].innerHTML} deleted`, 'danger')
        e.target.parentElement.parentElement.remove()
        StoreBook.removeBook(e.target.parentElement.parentElement.children[2].innerHTML)
    }

})