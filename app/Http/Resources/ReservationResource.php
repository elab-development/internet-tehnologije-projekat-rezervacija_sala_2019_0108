<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ReservationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */

    public function toArray($request)
    {
        //return parent::toArray($request);
        return [
            'id' => $this->id,
            'user' => new UserResource($this->user),
            'room' => new RoomResource($this->room),
            'date' => $this->reserved_date
        ];
    }
}
