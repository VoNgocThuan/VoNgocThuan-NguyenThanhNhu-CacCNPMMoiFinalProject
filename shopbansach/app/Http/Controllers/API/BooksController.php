<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\repositories\BookRepository;
use Illuminate\Http\Request;

class BooksController extends Controller
{
    public $bookRepository;

    public function __construct(BookRepository $bookRepository) {
        $this->bookRepository = $bookRepository;
    }

    public function index()
    {
        $books = $this->bookRepository->getAll();
        return response()->json([
            'success' => true,
            'message' => 'Book List',
            'data'    => $books
        ]);
    }

    public function show($id)
    {
        $books = $this->bookRepository->findById($id);
        if(is_null($books))
        {
            return response()->json([
                'success' => false,
                'message' => 'Book Details',
                'data'    => null
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => 'Book Details',
            'data'    => $books
        ]);
    }

    public function store(Request $request)
    {
        $formData = $request->all();
        $validator = \Validator::make($formData, [
            'name' => 'required',
            'description' => 'required',
            'originalPrice' => 'required',
            'price' => 'required',
            'quantity' => 'required',
            'ratings' => 'required',
            'image' => 'required',
            'status' => 'required',
            'category_id' => 'required'
        ], [
            'name.required' => 'Please give book name',
            'description.required' => 'Please give book description',
            'originalPrice' => 'Please give book originalPrice',
            'price.required' => 'Please give book price',
            'quantity.required' => 'Please give book quantity',
            'ratings.required' => 'Please give book ratings',
            'image.required' => 'Please give book image',
            'status.required' => 'Please give book status',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }

        $books = $this->bookRepository->create($request);
        return response()->json([
            'success' => true,
            'message' => 'Book Stored',
            'data'    => $books
        ]);
    }

    public function update(Request $request, $id)
    {
        $books = $this->bookRepository->findById($id);
        if (is_null($books)) {
            return response()->json([
                'success' => false,
                'message' => 'Book Not found',
                'data' => null,
            ]);
        }

        $formData = $request->all();
        $validator = \Validator::make($formData, [
            'name' => 'required',
            'description' => 'required',
            'originalPrice' => 'required',
            'price' => 'required',
            'quantity' => 'required',
            'ratings' => 'required',
            'image' => 'required',
            'status' => 'required',
            'category_id' => 'required'
        ], [
            'name.required' => 'Please give book name',
            'description.required' => 'Please give book description',
            'originalPrice' => 'Please give book originalPrice',
            'price.required' => 'Please give book price',
            'quantity.required' => 'Please give book quantity',
            'ratings.required' => 'Please give book ratings',
            'image.required' => 'Please give book image',
            'status.required' => 'Please give book status',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }

        $books = $this->bookRepository->edit($request, $id);
        return response()->json([
            'success' => true,
            'message' => 'Book Updated',
            'data'    => $books
        ]);
    }

    public function destroy($id)
    {
        $books = $this->bookRepository->findById($id);
        if (is_null($books)) {
            return response()->json([
                'success' => false,
                'message' => 'Book Not found',
                'data' => null,
            ]);
        }

        $books = $this->bookRepository->delete($id);
        return response()->json([
            'success' => true,
            'message' => 'Book Deleted',
            'data'    => $books
        ]);
    }
}
