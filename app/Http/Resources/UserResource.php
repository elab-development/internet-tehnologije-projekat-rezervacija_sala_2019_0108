<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public static $wrap = 'User';
    public function toArray($request)
    {
        //return parent::toArray($request);
        return[
            'id'=>$this->resource->id,
            'username'=>$this->resource->name,
            'email'=>$this->resource->email
        ];
    }
}
