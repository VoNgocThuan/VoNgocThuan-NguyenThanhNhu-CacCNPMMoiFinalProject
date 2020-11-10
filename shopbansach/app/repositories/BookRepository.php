<?php

namespace App\repositories;
use App\interfaces\CrudInterface;
use App\Models\Book;
use Illuminate\Http\Request;

class BookRepository implements CrudInterface{
    public function getAll(){
        $books = Book::orderBy('bookId','desc')->get();
        return $books;
    }
    public function findById($id){
        $books = Book::with('category')
            ->find($id);
        return $books;
    }
    public function create(Request $request){
        $books = new Book();
        $books->name=$request->name;
        $books->description=$request->description;
        $books->originalPrice=$request->originalPrice;
        $books->price=$request->price;
        $books->quantity=$request->quantity;
        $books->ratings=$request->ratings;
        $books->image=$request->image;
        $books->status=$request->status;
        $books->category_id=$request->category_id;
        $books->save();
        return $books;
    }
    public function edit(Request $request, $id){
        $books = $this->findById($id);
        $books->name=$request->name;
        $books->description=$request->description;
        $books->originalPrice=$request->originalPrice;
        $books->price=$request->price;
        $books->quantity=$request->quantity;
        $books->ratings=$request->ratings;
        $books->image=$request->image;
        $books->status=$request->status;
        $books->category_id=$request->category_id;
        $books->save();
        return $books;
    }
    public function delete($id){
        $books = $this->findById($id);
        $books->delete();
        return $books;
    }
}
