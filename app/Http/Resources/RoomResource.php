<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RoomResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */

    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'type' => $this->type,
            'capacity' => $this->capacity,
            'location' => $this->location,
            'equipment' => $this->equipment, 
            'squareFootage' => $this->squareFootage,
            'price' => $this->price,
            'description' => $this->description,
            'imageUrl' => $this->imageUrl,
        ];
    }
}
