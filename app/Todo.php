<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    protected $casts = [
        'completed'=>'boolean',
    ];

    protected $dates = ['created_at', 'updated_at', 'begin_at', 'will_end_at', 'completed_at'];
    protected $hidden = ['user_id'];

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

    public function getBeginAtAttribute($value)
    {
        if (!is_null($value)) {
            return Carbon::create($value)->toIso8601ZuluString();
        }
    }

    public function getWillEndAtAttribute($value)
    {
        if (!is_null($value)) {
            return Carbon::create($value)->toIso8601ZuluString();
        }
    }

    public function getCompletedAtAttribute($value)
    {
        if (!is_null($value)) {
            return Carbon::create($value)->toIso8601ZuluString();
        }
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function tags()
    {
        return $this->belongsToMany('App\Tag');
    }

    public function notes()
    {
        return $this->belongsToMany('App\Note');
    }
}