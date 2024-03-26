<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'capacity',
        'location',
        'equipment', 
        'squareFootage',
        'price',
        'description',
        'imageUrl',
    ];

    // Odnosi
    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
    
    // Za serijalizaciju i deserijalizaciju niza
    protected $casts = [
        'equipment' => 'array',
    ];
}
