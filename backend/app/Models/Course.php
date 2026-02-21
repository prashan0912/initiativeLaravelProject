<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    // table name - kyunki aapne 'course' rakha hai (plural nahi)
    protected $table = 'course';

    // jo fields fillable hain (mass assignment)
    protected $fillable = [
        'photo',
        'title',
        'teacher_name',
        'teacher_info',
        'rating',
        'rating_count',
        'price',
    ];
}
