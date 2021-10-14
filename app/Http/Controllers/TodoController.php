<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;
use App\Todo;

class TodoController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $user = User::find(Auth::id());
        return $user->todos;
    }

    public function create(Request $request)
    {
        $user = User::find(Auth::id());
        $todo = new Todo;
        $todo->body = $request->todoData['body'];
        $todo->begin_at = $request->todoData['begin_at'];
        $todo->will_end_at = $request->todoData['will_end_at'];
        $todo->user_id = $user->id;
        $todo->save();

        return $user->todos;
    }

    public function setBody(Request $request)
    {
        $user = User::find(Auth::id());
        $todo = Todo::find($request->todoData['id']);
        $todo->body = $request->todoData['body'];
        $todo->save();
        return $user->todos;
    }

    public function complete(Request $request)
    {
        $user = User::find(Auth::id());
        $todo = Todo::find($request->todoData['id']);
        $todo->completed = true;
        $todo->completed_at = Carbon::now();
        $todo->save();
        return $user->todos;
    }

    public function restore(Request $request)
    {
        $user = User::find(Auth::id());
        $todo = Todo::find($request->todoData['id']);
        $todo->completed = false;
        $todo->completed_at = null;
        $todo->save();
        return $user->todos;
    }

    public function delete(Request $request)
    {
        $user = User::find(Auth::id());
        $todo = Todo::find($request->todoData['id']);
        $todo->delete();
        return $user->todos;
    }
}