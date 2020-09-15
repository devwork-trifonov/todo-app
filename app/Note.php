<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Note extends Model
{
    protected $hidden = ['laravel_through_key'];

    public function getCreatedAtAttribute($value)
    {
        if (!is_null($value)) {
            return Carbon::create($value)->toIso8601ZuluString();
        }
    }

    public function getUpdatedAtAttribute($value)
    {
        if (!is_null($value)) {
            return Carbon::create($value)->toIso8601ZuluString();
        }
    }
}