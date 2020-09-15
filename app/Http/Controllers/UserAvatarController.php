<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Storage;

class UserAvatarController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function update(Request $request)
    {
        $user = User::find(Auth::id());
        $oldPath = $user->avatar;
        $trimmedOldPath = trim(str_replace('/storage/', '', $oldPath));
        $path = '/storage/' . Storage::disk('public')->putFile("avatars", $request->file('photo'));
        $user->avatar= $path;
        $user->save();
        if (strlen($oldPath) > 20) {
            Storage::disk('public')->delete($trimmedOldPath);
        }
        return $path;
    }
}