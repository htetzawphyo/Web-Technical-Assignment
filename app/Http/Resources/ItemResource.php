<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'category_id' => $this->category_id,
            'category_name' => optional($this->category)->name ?? 'Unknown Category',
            'price' => $this->price,
            'description' => $this->description,
            'item_condition' => $this->item_condition,
            'item_type' => $this->item_type,
            'publish' => $this->publish,
            'image' => $this->image ? asset('storage/item/' . $this->image) : null,
            'owner_name' => $this->owner_name,
            'contact_number' => $this->contact_number,
            'address' => $this->address
        ];
    }
}
