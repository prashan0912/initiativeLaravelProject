<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    // table name - kyunki aapne 'course' rakha hai (plural nahi)
    protected $table = 'course';


    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }
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

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
}
