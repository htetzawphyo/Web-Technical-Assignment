<?php

namespace App\Http\Controllers;

use App\Http\Requests\Category\CategoryStoreRequest;
use App\Http\Requests\Category\CategoryUpdateRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Exception;
use App\Helper\UploadHelper;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CategoryController extends Controller
{
    protected $model;

    public function __construct(Category $model) {
        $this->model = $model;
    }

    public function index()
    {
        try{
            $category = $this->model->paginate(10);
            $resourceCategory = CategoryResource::collection($category);

            // return response($resourceCategory, Response::HTTP_OK);
            return $resourceCategory;
        }catch(Exception $e){
            return response($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(CategoryStoreRequest $request)
    {
        try{
            $imageName = UploadHelper::uploadImage('category', $request->image);
            $category = Category::create([
                'name' => $request->name,
                'image' => $imageName,
                'publish' => $request->publish ? 1 : 0
            ]);
            $resourceCategory = new CategoryResource($category);

            return response($resourceCategory, Response::HTTP_CREATED);
        }catch(Exception $e){
            return response($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show(Category $category)
    {
        try{
            return response(new CategoryResource($category), Response::HTTP_OK);
        }catch(Exception $e){
            return response($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update(CategoryUpdateRequest $request, Category $category)
    {
        try{
            $imgName = $category->image;
            $hasImage = $request->hasFile('image');
            if($hasImage){
                $imgName = UploadHelper::updateImage('category', $imgName, $request->image);
            }
            $category->name = $request->name;
            $category->image = $imgName;
            $category->publish = $request->publish == "true" ? 1 : 0;
            $category->save();

            return response(new CategoryResource($category), Response::HTTP_CREATED);
        }catch(Exception $e){
            return response($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function publish(Request $request, Category $category)
    {
        try{
            $data = $category->publish == 1 ? 0 : 1;
            $category->update(['publish' => $data]);

            return response(new CategoryResource($category), Response::HTTP_CREATED);
        }catch(Exception $e){
            return response($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function delete(Category $category)
    {
        try{
            UploadHelper::deleteImage('category', $category->image);
            $category->delete();

            return response(Response::HTTP_NO_CONTENT);
        }catch(Exception $e){
            return response($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
