<?php

namespace App\Http\Controllers;

use App\Http\Requests\Item\ItemStoreRequest;
use App\Http\Requests\Item\ItemUpdateRequest;
use App\Http\Resources\ItemResource;
use App\Models\Item;
use Exception;
use Illuminate\Http\Response;
use App\Helper\UploadHelper;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    protected $model;

    public function __construct(Item $model)
    {
        $this->model = $model;
    }

    public function index()
    {
        try{
            $item = $this->model->orderBy('created_at', 'desc')->paginate(10);
            $resourceItem = ItemResource::collection($item);

            // return response($resourceItem, Response::HTTP_OK);
            return $resourceItem;
        }catch(Exception $e){
            return response($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(ItemStoreRequest $request)
    {
        try{
            $imageName = UploadHelper::uploadImage('item', $request->image);
            $item = Item::create([
                'name' => $request->name,
                'image' => $imageName,
                'category_id' => $request->category_id,
                'price' => $request->price,
                'description' => $request->description,
                'item_condition' => $request->item_condition,
                'item_type' => $request->item_type,
                'publish' => $request->publish ? 1 : 0,
                'image' => $imageName,
                'owner_name' => $request->owner_name,
                'contact_number' => $request->contact_number,
                'address' => $request->address
            ]);
            $resourceItem = new ItemResource($item);

            return response($resourceItem, Response::HTTP_CREATED);
        }catch(Exception $e){
            return response($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show(Item $item)
    {
        try{
            return response(new ItemResource($item), Response::HTTP_OK);
        }catch(Exception $e){
            return response($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update(ItemUpdateRequest $request, Item $item)
    {
        try{
            $imgName = $item->image;
            $hasImage = $request->hasFile('image');
            if($hasImage){
                $imgName = UploadHelper::updateImage('item', $imgName, $request->image);
            }
            $item->name = $request->name;
            $item->category_id = $request->category_id;
            $item->price = $request->price;
            $item->description = $request->description;
            $item->item_condition = $request->item_condition;
            $item->item_type = $request->item_type;
            $item->publish = $request->publish == "true" ? 1 : 0;
            $item->image = $imgName;
            $item->owner_name = $request->owner_name;
            $item->contact_number = $request->contact_number;
            $item->address = $request->address;
            
            $item->save();

            return response(new ItemResource($item), Response::HTTP_CREATED);
        }catch(Exception $e){
            return response($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function publish(Request $request, Item $item)
    {
        try{
            $data = $item->publish == 1 ? 0 : 1;
            $item->update(['publish' => $data]);

            return response(new ItemResource($item), Response::HTTP_CREATED);
        }catch(Exception $e){
            return response($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function delete(Item $item)
    {
        try{
            UploadHelper::deleteImage('item', $item->image);
            $item->delete();

            return response(Response::HTTP_NO_CONTENT);
        }catch(Exception $e){
            return response($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
